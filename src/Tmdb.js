const API_KEY = 'a99acd14788dbc4183c3480c39b2f6d3'; //Chave pra acessar APY KEY
const API_BASE = 'https://api.themoviedb.org/3'; //Filtrar filmes

/*
- filmes originais da netflix
- filmes recomendados (em destaque/trending)
- filmes em alta (top rated)
- lista de filmes de ação
- lista de filmes de comédia
- lista de filmes de terror
- lista de filmes de romance
- lista de documentários

Movie = Filme, TV = Série
*/

//Da fetch na URL que eu quero pegar. Pegando o result (json) e retornar. Pq irei repetir essa função em todos os objetos da outra função abaixo.
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); //Faz a requisição (Enviando o endpoint) e espera resposta
    const json = await req.json(); //Pegar o resultado e enviar pra gente //await = faça essa requisição, espere a resposta e após isso vai pra próxima
    return json;
}

//HomeList = Lista do index netflix // Essa função vai coletar as informações, colocar no devido lugar e retornar para a aplicação
export default {
    getHomeList: async() => { 
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`) //await = faça essa requisição, espere a resposta e após isso preencha em items. após isso, vá pra próxima requisição.
            
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)

            },

            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)

            },

            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)

            },

        ];
    },
    getMovieInfo: async(movieId, type) => { //Função para solicitar mais informações da API, para dessa forma coletar número de temporadas, gênero, etc.
        //async é função assincrona que retorna uma objeto.
        //async(movieId, type)  = Nesse caso enviamos duas informações, uma é o ID e o outro é o tipo, para verificar se é um filme ou série. 
        //Movie = Filme, TV = Série
        let info = {}; //váriavel com as informações

        if(movieId){ //Verifica se enviou o ID, após da switch no type para enviar uma requisição se for filme ou outra requisição diferente se for série.
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                default:
                    info = null;
                break;                    
            }
        }

        return info;
    }
}

