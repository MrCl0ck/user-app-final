import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './style.css';
import api from '../../services/api';

function Edit(){
    const {id} = useParams();
    const history = useHistory();
    const initUser = {
        name:'',
        email:'',
        idade:0,
        empresa:'',
        banco:'',
        agencia:'',
        saldo:''
    }
    
    function onSubmit(ev){
        ev.preventDefault();
        api.put(`/users/${id}`,user).then(response=>{
            alert("Usuário Atualizado com sucesso!");
            history.push("/");
        })
    }

    function onChange(ev){
        const {name,value} = ev.target;
        setUser({...user,[name]:value});
        console.log(user);
    }

    const [user, setUser] = useState(initUser);

    useEffect(()=>{
        if(id){
            api.get(`/users/${id}`).then(response=>{
                console.log(response.data);
                setUser(...response.data);
            })
        }
    },[]);
    return(
        <div id="profile-container">
            <h1>Alteração de Cadastro</h1>
            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input value={user.name} name="name" required disabled></input>
                <strong>E-mail:</strong>
                <input  value={user.email} type="email" name="email" required disabled></input>
                <strong>Idade:</strong>
                <input value={user.idade} min="18" max="120" type="number" name="idade" required disabled></input>
                <strong>Empresa:</strong>
                <input value={user.empresa} name="empresa" required disabled></input>
                <strong>Banco:</strong>
                <input value={user.banco} name="banco" required disabled></input>
                <strong>Agência:</strong>
                <input value={user.agencia} name="agencia" required disabled></input>
                <strong>Saldo:</strong>
                <input onChange={onChange} value={user.saldo} type="number" name="saldo" required></input>
                <div className="actions">
                    <button className="button" onClick={()=>history.push('/')}>Voltar</button>
                    <button className="button" type="submit">Salvar</button>
                </div>
            </form>

        </div>
    );
}

export default Edit;