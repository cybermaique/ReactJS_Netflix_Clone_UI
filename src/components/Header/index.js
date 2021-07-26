//Esse arquivo possui a função de fazer com que a imagem do background mude, igual a netflix original.

import React from 'react';
import './style.css';

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}> {/*Se black tiver ok, inserir black aqui, caso contrário, deixar em branco.*/}
            <div className="header--logo"> {/*Logo da Netflix do cabeçalho*/}
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix"/>
                </a>
             </div>
            <div className="header--user"> {/*Ícone user do cabeçalho*/}
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuário"/>
                </a>

            </div>

        </header>
    );
}