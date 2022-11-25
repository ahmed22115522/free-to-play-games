import React ,{useState , useEffect} from 'react'
import './GameDetails.scss'
import {useParams, Link} from 'react-router-dom'
import image from '../../Assets/Login.jpg'
import { FaSignOutAlt, FaWindows, FaWindowMaximize } from "react-icons/fa";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { games } from './gameInterface';
import axios from "axios";
const GameDetails = () => {

  let {id} = useParams()

  const [gameData, setGameData] = useState<games | null>(null)
  const[loading, setLoadiing] = useState(true)

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: id},
    headers: {
      'X-RapidAPI-Key': '078b7912d3mshc016039f8e10ce5p124545jsn29ae81ee0327',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  


  useEffect(() => {
    axios.request(options).then(function (response) {
      setGameData(response.data)
      setLoadiing(false)
    })

  }, [])

  return ( <>
    {gameData != null ?
      <div className='container my-5 py-5'>

              {loading ?           <div className="loader d-flex justify-content-center align-items-center">
            <div className="content">
              <div className="planet">
                <div className="ring"></div>
                <div className="cover-ring"></div>
                <div className="spots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <p>Loading</p>
            </div>
          </div> : ''}

      <div className="row">
        <div className="col-md-4">
          <div className="game-image">
            <img src={gameData.thumbnail} alt="" className='w-100 rounded'/>
            <div className="row my-3 text-center">
              <div className="col-3 col-md-4">
                <div className="btn btn-secondary w-100">
                  Free
                </div>
              </div>
              <div className="col-9 col-md-8">
                  <a className="btn btn-info w-100 text-white" href={gameData.game_url} target='_blank' >Play Now <FaSignOutAlt/></a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="game-info">
            <h2 className='text-gray fs-1'>{gameData.title}</h2>
            <h3 className='text-gray fs-4'>About {gameData.title}</h3>
            <p className='text-muted'>{gameData.description}</p>
            {gameData.minimum_system_requirements != undefined ? <>
            <h3 className='text-gray fs-4'>Minimum System Requirements</h3>
            <p className='text-gray'>Graphics : <span className='text-muted'>{gameData.minimum_system_requirements.graphics}</span></p>
            <p className='text-gray'>Memory : <span className='text-muted'>{gameData.minimum_system_requirements.memory}</span></p>
            <p className='text-gray'>OS : <span className='text-muted'>{gameData.minimum_system_requirements.os}</span></p>
            <p className='text-gray'>Processor : <span className='text-muted'>{gameData.minimum_system_requirements.processor}</span></p>
            <p className='text-gray'>Storage  : <span className='text-muted'>{gameData.minimum_system_requirements.storage}</span></p>
            </>:
            ''
             }  
            <h3 className='text-gray fs-4'>{gameData.title} Screenshots</h3>
            <OwlCarousel className='owl-theme' items={1} loop={true} margin={10} autoplay={true} dots={false} autoplayTimeout={1500}>
            {gameData.screenshots.map((images, i) => 
              <div key={i} className='item'>
              <img src={images.image} alt="screenShoot" className='w-100'/>
              </div>
            )}
            </OwlCarousel>

            <h3 className='text-gray fs-4 mt-3'>Additional Information</h3>  
            <div className="row">
              <div className="col-6 col-sm-4">
                <p className='text-muted m-0 mb-1'>Title</p>
                <p className='text-gray'>{gameData.title}</p>
              </div>
              <div className="col-6 col-sm-4">
                <p className='text-muted m-0 mb-1'>Developer</p>
                <p className='text-gray'>{gameData.developer}</p>
              </div>
              <div className="col-6 col-sm-4">
                <p className='text-muted m-0 mb-1'>Publisher</p>
                <p className='text-gray'>{gameData.publisher}</p>
              </div>
              <div className="col-6 col-sm-4">
                <p className='text-muted m-0 mb-1'>Release Date</p>
                <p className='text-gray'>{gameData.release_date}</p>
              </div>
              <div className="col-6 col-sm-4">
                <p className='text-muted m-0 mb-1'>Genre</p>
                <p className='text-gray'>{gameData.genre}</p>
              </div>
              <div className="col-6 col-sm-4">
                <p className='text-muted m-0 mb-1'>Platform</p>
                <p className='text-gray'>{gameData.platform == "Windows" ? <span>Windows <FaWindows/></span> : <span>Web Browser <FaWindowMaximize/></span>}</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
    :
    ''
    }

</>)
}

export default GameDetails