import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";


// eslint-disable-next-line
export default () => {

  const [movieList, setMoiveList] = useState([])
  const [featureData, setFeatureData] = useState(null)

  useEffect(() => {  //quando minha tela for carregada, esta função será executada
    const loadAll = async () => {
      //Pegando a lista dos filmes
      let list = await Tmdb.getHomeList()
      setMoiveList(list)

      //pegando filme em destaque
       let originals = list.filter(i=>i.slug==='originals')
       let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length -1))
       let chosen = originals[0].items.results[randomChosen]
       let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv') 
       setFeatureData(chosenInfo)
    }
    loadAll()
  }, []);

  return (
    <div className="page">

      {featureData && 
      <FeaturedMovie item ={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>
    </div>
  );
}