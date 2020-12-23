import React,{useState,useEffect} from 'react';
import './style.css';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';

function User(){
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        api.get('users').then(response => {
            setUsers(response.data);
        })
    },[])
    
    async function hDelete(id){
        try{
            await api.delete(`/users/${id}`);
            alert("usuario deletado com sucesso");
            history.go(0);//usado para re-renderizar a página
        }
        catch(err){
            alert("Erro ao deletar: " + err);
        }
    }

    const history = useHistory();
    
    return(
        <div id="user-container">
            <h1>Lista de Usuários</h1>
            <button className="button" id="create" onClick={()=>history.push('/profile')}>CRIAR NOVO USUÁRIO</button>
            <ul className="user-list">
                {users.map(user=>(
                    <li key={user.id}>
                        <strong>Nome:</strong>
                        <p>{user.name}</p>
                        <strong>Email:</strong>
                        <p>{user.email}</p>
                        <strong>Idade:</strong>
                        <p>{user.idade}</p>
                        <strong>Empresa:</strong>
                        <p>{user.empresa}</p>
                        <strong>Banco:</strong>
                        <p>{user.banco}</p>
                        <strong>Agência:</strong>
                        <p>{user.agencia}</p>
                        <strong>Saldo:</strong>
                        <p>{user.saldo}</p>
                        <div className="actions">
                            <button className="button" onClick={()=>hDelete(user.id)}> Deletar</button>
                            <button className="button" onClick={()=>history.push(`/update/${user.id}`)}>Acessar</button>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    );

}
export default User;