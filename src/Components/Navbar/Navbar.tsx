import React, { useContext } from 'react'
import "./Navbar.scss";
import {Link} from 'react-router-dom'
import Logo  from '../Assets/logoGame.png'
import { FunctionsContext } from '../store';
const Navbar = () => {

  let {token, logOut} = useContext(FunctionsContext)

  

  return (<>
  <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top">
    <div className="container">
      <Link className="navbar-brand" to='/'><img src={Logo} className='logo' alt="logo" /><span>Game Over</span></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
        {token != null ? <>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/home' className="nav-link" aria-current="page" >Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/games/all' className="nav-link" >All</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Platforms
              </a>
              <ul className="dropdown-menu">
                {['pc', 'browser'].map((el) =>
                  <li key={el}><Link to={'/games/platforms/' + el} className="dropdown-item">{el}</Link></li>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by
              </a>
              <ul className="dropdown-menu">
              {['release-date', 'popularity', 'alphabetical', 'relevance'].map((el) =>
                  <li key={el}><Link to={'/games/sortby/' + el} className="dropdown-item">{el}</Link></li>
                )}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu">
                {['racing','sports','social','shooter','open-world','zombie','fantasy','action-rpg','action','flight','battle-royale'].map((el) =>
                  <li key={el}><Link to={'games/categories/' + el} className="dropdown-item">{el}</Link></li>
                )}
              </ul>
            </li>
          </ul>

          <ul className='navbar-nav ms-auto d-flex align-items-center'>
            <li className='nav-item mx-2'>
              <p className='text-muted m-0'>Hello! <span className='fw-bold text-white'>{token.first_name + ' ' +token.last_name}</span></p>
            </li>
            <li className="nav-item mx-2">
              <span onClick={() => logOut() } className="nav-link btn btn-outline-danger  p-1 px-2" aria-current="page" >Logout</span>
            </li>
          </ul>
          </>

            :
// Not logged in Navbar // Not logged in Navbar // Not logged in Navbar // Not logged in Navbar // Not logged in Navbar // Not logged in Navbar // Not logged in Navbar // Not logged in Navbar
            <ul className='navbar-nav ms-auto d-flex align-items-center'>
            <li className="nav-item mx-2">
              <Link to='/login' className="nav-link" aria-current="page" >Login</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to='/register' className="nav-link btn btn-outline-info p-1 px-2" aria-current="page" >Join Free</Link>
            </li>
          </ul>

      }

    

        
      </div>
    </div>
  </nav>
    </>)
}

export default Navbar