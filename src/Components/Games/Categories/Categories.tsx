import React, { useState , useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import ReactTooltip from "react-tooltip";
import {FaChevronRight,FaRegPlusSquare,FaWindows,FaRegWindowMaximize} from 'react-icons/fa'
import "./Categories.scss";
const Categories = () => {

  let {categorey} = useParams()

  const [categories, setCategories] = useState([])
  const[loading, setLoadiing] = useState(true)
  const [limit, setLimit] = useState(20);

  function moreGames() {
    setLimit(limit + 20);
  }


const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: {category: categorey},
  headers: {
    'X-RapidAPI-Key': '078b7912d3mshc016039f8e10ce5p124545jsn29ae81ee0327',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};



useEffect(() =>{
  axios.request(options).then(function (response) {
    setCategories(response.data.slice(0,limit))
    setLoadiing(false);
  })
  
}, [categorey, limit])

useEffect(() => {
  setLoadiing(true)
  setLimit(20)
}, [categorey])

  return (
    <div className="container my-5 py-5">
        <div className="row gy-4">

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

          {categories.map((el: any, i) => (
              <div key={i} className="col-12 col-md-3">
                <ReactTooltip
                  id={"gameTip" + i}
                  place="top"
                  effect="float"
                  delayShow={500}
                  padding="1px"
                  className="border"
                  arrowColor="transperant"
                >
                  {el.platform == "Web Browser"
                    ? "Available on Browser"
                    : "Available on Windows"}
                </ReactTooltip>
                <Link to={'/games/game-details/' + el.id}>
                <div
                  className="card grow shadow"
                  data-delay-show="500"
                  data-tip
                  data-for={"gameTip" + i}
                >
                  <img src={el.thumbnail} className="card-img-top" alt="..." />
                  <div className="card-body rounded-bottom text-break p-3 bg-gray p-2 ">
                    <div className="title d-flex justify-content-between align-items-center">
                      <h5 className="text-gray fs-4 text-truncate">
                        {el.title}
                      </h5>
                      <span className="badge bg-info">FREE</span>
                    </div>
                    <p className="text-muted">
                      {el.short_description.slice(0, 22) + "..."}
                    </p>

                    <div className="fotter text-gray d-flex justify-content-between align-items-center">
                      <FaRegPlusSquare />
                      <div className="platform">
                        <span className="badge text-bg-secondary">
                          {el.genre}{" "}
                          {el.platform == "Web Browser" ? (
                            <FaRegWindowMaximize />
                          ) : (
                            <FaWindows />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>

              </div>
          ))}
        </div>
        <div className="more-games text-center my-5">
          <button className="btn btn-outline-secondary"  onClick={moreGames}>
            More Games <FaChevronRight />
          </button>
        </div>
      </div>
  )
}

export default Categories