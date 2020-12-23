import React from 'react';
import './style.css';

function Header(propriedades){
    return (
        <header id="main-header">
            <h1>{propriedades.title}</h1>

        </header>

    );
}

export default Header;