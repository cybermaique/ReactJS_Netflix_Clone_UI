import React, { useState } from 'react';
import './style.css'; //Movie Row = Lista de Vídeos
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'; //Seta anterior - site material-ui.com
import NavigateNextIcon from '@material-ui/icons/NavigateNext'; //Seta próximo- site material-ui.com

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(-400); //Const usada para controlar rolagem da lista de séries, começa com 0 para que a lista de série fique na posição 0. Const será usada abaixo.

    const handleLeftArrow = () => { //const pra criar rolagem left
        let x = scrollX + Math.round(window.innerWidth / 2); //Math.Round arredonda pra n ficar numero quebrado e o window.innerWidth captura o tamanho da largura da tela do usuário em px.
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => { //const pra criar rolagem right. 
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150; //var e if abaixo criados para não deixar espaço vazio na lista de série, parar na última série.
        if((window.innerWidth - listW) > x){ 
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2> 
                <div className="movieRow--left" onClick={handleLeftArrow}> {/*onClick = rolar lista de séries ao apertar seta before*/}
                    <NavigateBeforeIcon style={{fontSize: 50}} /> {/*Aumentando tamanho do icone seta anterior*/}
                </div>

                <div className="movieRow--right" onClick={handleRightArrow}> {/*onClick = rolar lista de séries ao apertar seta next*/}
                <NavigateNextIcon style={{fontSize: 50}} /> {/*Aumentando tamanho do icone próxima seta*/}
                </div>



            <div className="movieRow--listarea"> {/*responsável pela área total*/}
                <div className="movieRow--list" style={{
                    marginLeft: scrollX, //puxando const definida acima para controlar rolagem da lista de séries
                    width: items.results.length * 150 //a largura será o tamanho da qtd de séries da lista * 150px (largura do pôster)
                }}> {/*responsável por ter todos os itens, fazendo ir pro lado e pro outro a lista de vídeos*/}
                    {items.results.length > 0 && items.results.map((item, key)=>( 
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    );
}