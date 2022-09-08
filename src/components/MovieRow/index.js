import React, { useState } from "react";
import './MovieRow.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// eslint-disable-next-line
export default ({ title, items }) => {
    const [scrollX, srtScrollX] = useState(-400)
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth/2);//aumenta o valor do scrollX da lista baseado no tamanho da tela do usuario
        if (x > 0) {
            x = 0
        }
        srtScrollX(x)
    }
    const handleRigthArrow = () => {
        let x = scrollX - Math.round(window.innerWidth/2);//aumenta o valor do scrollX da lista baseado no tamanho da tela do usuario
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x) { // tamanho da tela -  tamanho da lista = se for maior que o que eu quero ir tenho que voltar 60px 
            x=(window.innerWidth - listW) - 60
        }
        srtScrollX(x)
    }
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movieRow--rigth" onClick={handleRigthArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150 //faz com que o movierow tenha o tamanho especifico da quantidade de itens( 0 150 sao os 150 pixels) 
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}