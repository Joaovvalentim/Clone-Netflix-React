import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'
// eslint-disable-next-line
export default () => {

  const [movieList, setMoiveList] = useState([])


  useEffect(() => {  //quando minha tela for carregada, esta função será executada
    const loadAll = async () => {
      //Pegando a lista dos filmes
      let list = await Tmdb.getHomeList()
      setMoiveList(list)
    }
    loadAll()
  }, []);

  return (
    <div className="page">
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