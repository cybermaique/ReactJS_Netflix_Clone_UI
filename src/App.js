/*Para este projeto, foi necessário instalar duas bibliotecas de ícones (setas utilizadas):
npm install @material-ui/core
npm install @material-ui/icons */

import React, {useEffect, useState} from 'react'; //função useEffect faz executar essa função quando carregar a tela
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false); //constante utilizada para deixar o cabeçalho dinâmico, propriedade blackHeader será enviado para o Header abaixo
  //useState(false) = começa com false

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista total de filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Após pegar a lista de todos os filmes, vamos pegar o featured (filme principal):

      let originals = list.filter(i=>i.slug === 'originals'); //Pega o item do array que tiver o slug originals, para pegar apenas os filmes originais Netflix
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); //Gera um número aleatório entre 0 e o número final da lista de filmes através do cmd Math.random. Se tiver 20 filmes: Gera um número de 0 a 19 (por isso tem o -1) 
      //Math.floor   = retorna valor de x arredondado para baixo
      //Math.random()   = gera número aleatório entre 0 e 1.. Exemplo: 0.1099549484848
      //(originals[0].items.results.length)   = número total de itens
      let chosen = originals[0].items.results[randomChosen]; //Pega número gerado na função anterior e aplica no vetor dos filmes originals para pegar o filme escolhido
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv'); //Função pra pegar informações adicionais do filme escolhido pra ser o principal
      setFeaturedData(chosenInfo); //Pega informações e joga no FeaturedData

    }

    loadAll();
  }, []);
  
  useEffect(() =>{
    const scrollListener = () => { //Monitora evento do scroll, caso acontecer, irá executar o script abaixo
      if(window.scrollY > 10) { //window.scrollY detecta posição do scroll no eixo Y
        setBlackHeader(true);
      } 

      else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener); //Se mexer no scroll, o scrollListener

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
}, []);

  return (
    <div className="page">

      <Header black={blackHeader} /> {/*Define/envia para a pasta Header o black como a const blackHeader*/}

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />

        ))}
      </section>

      <footer>
        UI developed by: <span role="img" aria-label="programador">👨‍💻</span> Maique Doglas Moraes da Silva
        | All rights reserved to: Netflix {/*quando for por uma imagem direto no react, colocar dentro do span com esses dois atríbutos*/}
        | Tool: React JS
      </footer>

        {movieList.length <= 0 && //se a lista de filme for menor ou igual a 0, exibir loading
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" Alt="Carregando"/>
        </div>
        }
    </div>
  );

}