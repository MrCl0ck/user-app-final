import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import './style.css';
import api from '../../services/api';

function Profile(){
    const {id} = useParams();
    const history = useHistory();
    const initUser = {
        name:'',
        email:'',
        idade:0,
        empresa:'',
        banco:'',
        agencia:'',
        saldo:0
    }
    
    function onSubmit(ev){
        ev.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/users/${id}` : 'users';
        api.post("users",user).then(response=>{
            alert("Usuário Cadastrado com sucesso!");
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
            <h1>Cadastro de Usuário</h1>
            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input onChange={onChange} placeholder="Insira seu nome..." name="name" required></input>
                <strong>E-mail:</strong>
                <input onChange={onChange} placeholder="ex: abcdefgh@gmail.com" type="email" name="email" required></input>
                <strong>Idade:</strong>
                <input onChange={onChange} placeholder="0" min="18" max="120" type="number" name="idade" required></input>
                <strong>Empresa:</strong>
                <input onChange={onChange} placeholder="ex: Universidade Estadual do Sudoeste da Bahia" name="empresa" required></input>
                <strong>Banco:</strong>
                <input onChange={onChange} placeholder="ex: Banco do Brasil" name="banco" required></input>
                <strong>Agência:</strong>
                <input onChange={onChange} placeholder="ex: 0060-4" name="agencia" required></input>
                <strong>Saldo:</strong>
                <input onChange={onChange} placeholder="ex: 989898.58" type="number" name="saldo" required></input>
                <div className="actions">
                    <button className="button" onClick={()=>history.push('/')}>Voltar</button>
                    <button className="button" type="submit">Salvar</button>
                </div>
            </form>

        </div>
    );
}

export default Profile;