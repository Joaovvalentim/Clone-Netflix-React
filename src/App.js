import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

// eslint-disable-next-line
export default () => {

  const [movieList, setMoiveList] = useState([])
  const [featureData, setFeatureData] = useState(null)//
  const [blackHeader, setBlackHeader] = useState(false)//Verifica se o scroll foi usado para ativar a classe css black no header

  useEffect(() => {  //quando minha tela for carregada, esta função será executada
    const loadAll = async () => {
      //Pegando a lista dos filmes
      let list = await Tmdb.getHomeList()
      setMoiveList(list)

      //pegando filme em destaque
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo)
    }
    loadAll()
  }, []);

  useEffect(() => { //monitorar o scroll da pagina para ativar ou nao o css da navbar
    const scrollListner = () => {
      if (window.scrollY > 10) { //caso o scroll ja tenha sido rolado, seta true e ativa a clase Css
        setBlackHeader(true)
      } else {
        setBlackHeader(false)// Caso ainda nao, mantem a classe Css como False
      }
    }
    window.addEventListener('scroll', scrollListner)

    return () => {
      window.removeEventListener('scroll', scrollListner)
    }
  }, []);
  return (
    <div className="page">

      <Header
        black={blackHeader}
      />

      {featureData &&
        <FeaturedMovie item={featureData} />
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
      <footer>
        Feito por João victor Valentim, Front-End Developer<br />
        Dados consumidos da API Themoviedb.org

      </footer>
      {movieList.length <= 0 && //Verifica se a lista de filmes ja apareceu, caso nao, mostra a tela de loading ate os filmes carregarem
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
        </div>
      }
    </div>
  );
}