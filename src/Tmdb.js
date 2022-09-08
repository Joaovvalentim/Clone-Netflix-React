const API_KEY = 'b595d184d9ac69ebec79fb1855af6cb3';
const API_BASE = 'https://api.themoviedb.org/3';

/* 
    Catalogos
originais da netflix
recomendados (trending)
originais da (top rated)
ação
comédia
terror
romance
documentários
*/

const basicFetch = async (endpoint) => { // manda uma endpoint
    const req = await fetch(`${API_BASE}${endpoint}`);// Faz a requisição na api
    const json = await req.json() // pega o json da requisição 
    return json // retorna o json 
}


export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_reted?&language=pt-BR&api_key=${API_KEY}`)
            }, {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&&language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    }
}