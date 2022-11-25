import {createContext , useState} from 'react'
import jwt_decode from 'jwt-decode'
import {Navigate} from 'react-router-dom'

export let FunctionsContext = createContext()

export function FunctionsContextProvieder(props){
    const [token, setToken] = useState(null)
    function saveUserData() {
        let token = localStorage.getItem('token')
        let savedUser = jwt_decode(token)
        setToken(savedUser)
      }

      function logOut(){
        localStorage.removeItem('token')
        setToken(null)
        return <Navigate to='/login' />
      }

    return <FunctionsContext.Provider value={{token:token , saveUserData , logOut}}>
        {props.children}
    </FunctionsContext.Provider>
}