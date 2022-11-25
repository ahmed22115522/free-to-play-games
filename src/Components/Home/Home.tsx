import React, { useEffect, useState } from 'react'
import "./Home.scss";
import {FaRobot} from 'react-icons/fa'
import axios from 'axios';
import {Link} from 'react-router-dom'
const Home = () => {

  const [homeGames, setHomeGames] = useState([])


  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'X-RapidAPI-Key': '078b7912d3mshc016039f8e10ce5p124545jsn29ae81ee0327',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setHomeGames(response.data.slice(8,11))
    })
  }, [])
  
  
  return (<>
    <div className="home-layout">
      <div className="home-content text-center">
        <h2 className='fs-1 text-gray fw-bold'>Find & Track the best <span className='text-info'>free-to-play</span>  games!</h2>
        <h3 className='text-muted fs-5 lead'>Track what you've played and search for what to play next! Plus get free premium loot!</h3>
        <Link to='/games/all' className='btn btn-outline-secondary my-3'>Browse Games</Link>
      </div>
    </div>

      <div className="container my-5">
        <h2 className='fw-bold text-gray'> <FaRobot className='fs-1' /> Personalized Recommendations</h2>
        <div className="row gy-5">
          {homeGames.map((el: any,i) => 
            <div key={i} className="col-md-4">
              <Link to={'/games/game-details/' + el.id}>
                <div className="card grow shadow text-nowrap">
                  <img src={el.thumbnail} className="card-img-top" alt="..." />
                  <div className="card-body rounded-bottom bg-gray p-4 d-flex justify-content-between align-items-center">
                    <h5 className="text-gray fs-6">{el.title}</h5>
                    <span className='badge bg-info'>FREE</span>
                  </div>
                </div>
              </Link>

            </div>
            )}

        </div>
      </div>

    </>)
}

export default Home