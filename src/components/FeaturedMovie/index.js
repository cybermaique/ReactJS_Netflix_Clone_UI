//Esse arquivo é referente a série em destaque no index.

import React from 'react';
import './style.css';

export default ({item}) => { //

    let firstDate = new Date(item.first_air_date); //Pega a data da API e joga dentro do Date do JS para formatar
    let genres = [];
    for(let i in item.genres){ //loop para percorrer cada um dos gêneros da série
        genres.push (item.genres[i].name); //adiciona gêneros dentro do array genrs
    }

    let description = item.overview; //overview = descrição
    if(description.length > 200) {
        description = description.substring(0, 200) + '...';
    }

    return(
           <section className="featured" style={{
               backgroundSize: 'cover', //Aparecer o máximo da imagem, adaptando-se ao tamanho do monitor do usuário.
               backgroundPosition: 'center',
               backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` //Aplica imagem da série no background   
               //original = tamanho original da imagem
               //backdrop = imagem de trás
               //$ = concatena
           }}>
               <div className="featured--vertical"> {/*transparência vertical da imagem do background da série*/}
                   <div className="featured--horizontal">
                       <div className="featured--name"> {/*Puxa nome do seriado em destaque*/}
                           {item.original_name}</div>

                   <div className="featured--info"> {/*Puxar sequência de informações da série em destaque:*/}
                       <div className="featured--points">
                           {item.vote_average} pontos</div>

                        <div className="featured--year"> {/*Pega o ano apenas e exibe*/}
                            {firstDate.getFullYear()}</div> 
                        

                        <div className="featured--seasons"> {/*Caso o número de temporadas seja diferente de 1, colocar o s, caso contrário, não colocar nada.*/}
                            {item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div> 
                    </div>

                        <div className="featured--description">{/*Colocar a descrição da série*/}
                            {description} </div> 
                        
                        <div className="featured--bottons">
                            <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>

                            <a href={`/list/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                        </div>

                        <div className="featured--genres">
                            <strong>Gêneros:</strong> {genres.join(', ')} </div>           

                   </div> 
               </div>
        </section>
    )
}