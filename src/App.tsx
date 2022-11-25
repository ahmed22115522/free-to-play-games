import React, { useContext, useEffect } from 'react';
import './App.css';
import { All , Categories , Platforms, SortBy , GameDetails} from "./Components/Games";
import { Home , Layout , Login, Register} from "./Components";
import {createBrowserRouter, RouterProvider , Navigate} from 'react-router-dom'
import { FunctionsContext } from './Components/store';

function App() {

  let {saveUserData} = useContext(FunctionsContext)

  function PrtoectRoutes(props: any){
    if(localStorage.getItem('token') == null){
      return <Navigate to='/login'/>
    }
    else {
      return props.children
    }
  }
  
    useEffect(() => {
      if(localStorage.getItem('token') !=null){
        saveUserData()
      }
      
  },[])


  let routes = createBrowserRouter([
    {path:'/', element: <Layout /> , children: [
      {path:'home',index: true, element:<PrtoectRoutes><Home /></PrtoectRoutes>},
      {path:'/', element:<PrtoectRoutes><Home /></PrtoectRoutes> },
      {path:'login',  element: <Login />},
      {path:'register', element: <Register />},
      {path:'games/all', element: <PrtoectRoutes><All /></PrtoectRoutes>},
      {path:'games/platforms/:platform', element: <PrtoectRoutes><Platforms /></PrtoectRoutes>},
      {path:'games/categories/:categorey', element: <PrtoectRoutes><Categories /></PrtoectRoutes>},
      {path:'games/sortby/:sort', element: <PrtoectRoutes><SortBy /></PrtoectRoutes>},
      {path:'games/game-details/:id', element: <PrtoectRoutes><GameDetails /></PrtoectRoutes>}
    ]}
  ])

  return (
    
      <RouterProvider router={routes} />

  );
}

export default App;
