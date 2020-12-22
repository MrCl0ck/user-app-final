const crypto = require('crypto');//criptografa as ids criados.
const table = require('../database/connection');//arquivo de conexão do banco, com knex

module.exports = {
    async list(req, res){
        //OK - O MÉTODO MOSTRA OS USUÁRIOS CADASTRADOS QUE TEM O MESMO ID NA TABELA USERS
        //E O MESMO ID NA TABELA CONTA.
        // CASO NÃO ENCONTRE NADA ELE RETORNA QUE NÃO TEM NENHUM USUÁRIO CADASTRADO, POIS É UMA LISTA...
        const users = await table('conta').innerJoin('users', 'users.id', 'conta.user').select(
            'users.id',
            'users.name',
            'users.email',
            'users.idade',
            'users.empresa',
            'conta.agencia',
            'conta.banco',
            'conta.saldo'
        );

        if (users == '') {
            res.status(404).send("Nenhum usuário cadastrado!");
        }

        return res.json(users);
    },
    async show(req, res){
        //OK - O MÉTODO MOSTRA O ÚNICO USUÁRIO COM AQUELE ID E OS DADOS DO SELECT.
        // CASO NÃO ENCONTRE NADA ELE RETORNA QUE NÃO TEM NENHUM USUÁRIO CADASTRADO COM AQUELE ID.
        const {id} = req.params;
        //mostra o único usuário que existe nas duas tabelas... 
        const user = await table('conta').where('conta.id',id).innerJoin('users', 'users.id', 'conta.user').select(
            'users.id',
            'users.name',
            'users.email',
            'users.idade',
            'users.empresa',
            'conta.id',
            'conta.nome_user',
            'conta.agencia',
            'conta.banco',
            'conta.saldo'            
        );

        if (user == '') {
            return res.status(404).send("Usuário não encontrado!");//busca por id
        }

        return res.json(user);
    },
    async create(req, res){
        //inserção correta, assim que é inserido foi conferido no método 'show' e ele mostra todos os dados cadastrados, nenhum campo vazio...
        //O MÉTODO RETORNA O ID DO USUÁRIO CRIADO
        //cria parametros para a primeira tabela e também para a segunda...
        const {name, email, idade, empresa, agencia, banco, saldo} = req.body;
        const id = crypto.randomBytes(4).toString('hex');
        await table('users').insert({
            'id':id,
            'name':name,
            'email':email,
            'idade':idade,
            'empresa': empresa
        });
        await table('conta').insert({
            'id':id,
            'user':id,
            'nome_user':name,
            'agencia':agencia,
            'banco':banco,
            'saldo':saldo
        })
        return res.json("O usuário criado tem id: " + id);
    },
    async update(req, res){
        //MÉTODO OK, ATUALIZAÇÃO FEITA COM SUCESSO, ATUALIZA TODOS OS DADOS PASSADOS
        //CASO A ATUALIZAÇÃO NÃO SEJA FEITA COM SUCESSO
        //RECEBE A MENSAGEM QUE A atualização foi mal sucedida
        //O ÚNICO CAMPO QUE VAI RECEBER ATUALIZAÇÃO É O CAMPO 'SALDO'
        const {id} = req.params;
        const {saldo} = req.body;

        //atualiza das duas tabelas, somente se atualização tiver sucesso nas duas queries...
        if(
            await table('conta').where('id', id).update({
                'saldo':saldo
            })            
        )
        {
            return res.status(200).send("Atualização feita com sucesso!");
        }

        return res.status(404).send("Atualização Mal-Sucedida!");//busca por id
        
    }, 
    async delete(req, res){//ok -  fazendo a exclusão nas duas tabelas e pegando a confirmação das duas...
        const {id} = req.params;
        //deleta das duas tabelas...
        if(await table('users').where('id', id).delete() && await table.from('conta').where('conta.user', id).delete()){
            return res.status(200).send("Usuário deletado com sucesso!");
        }
        return res.status(404).send("Usuário não encontrado!");
    }
}