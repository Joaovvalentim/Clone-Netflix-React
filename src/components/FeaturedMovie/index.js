import React from 'react';
import './FeaturedMovie.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ item }) => {
    let firstDate = new Date(item.first_air_date)
    let genres = []
    for (let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    let description = item.overview
    if(description.length > 200){
        description = description.substring(0, 75)+"..."
    }


    return (
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>

            <div className='feature--vertical'>
                <div className='feature--horizontal'>
                    <div className='feature--name'> {item.original_name} </div>
                    <div className='feature--info'>
                        <div className='feature--points'>{item.vote_average.toFixed(1)} pontos</div>
                        <div className='feature--year'>{firstDate.getFullYear()}</div>
                        <div className='feature--seasons'> {item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className='feature--description'> {description} </div>
                    <div className='feature--buttons'>
                        <a href={`/watch/${item.id}`} className="feature--watchbutton">▶ Assistir </a>
                        <a href={`/list/add/${item.id}`} className="feature--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className='feature--genres'><strong>Gêneros:</strong> {genres.join(', ')} </div>
                </div>
            </div>
        </section >
    )
}