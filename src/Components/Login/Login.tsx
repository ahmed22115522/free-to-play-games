import React, {useState , useContext} from 'react'
import "./Login.scss";
import Loginbg from '../Assets/Login.jpg'
import logo from '../Assets/logoGame.png'
import {Link , useNavigate} from 'react-router-dom'
import { FaChevronRight, FaSpinner } from "react-icons/fa";
import {useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import  axios  from 'axios';
import { FunctionsContext } from '../store';
const Login = () => {

  let { saveUserData } = useContext(FunctionsContext)

  const [inputError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  let schema = yup.object().shape({
    email : yup.string().email('This is not a correct email format').required('Email is Requierd'),
    password : yup.string().min(6, 'Password must be atleast 6 charcters').max(16, 'Password must not excseed 16 charcters').required('Password is Requierd')
  })

  const {register , handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  async function submitForm(userData: any){
    setLoading(true);
    let {data} = await  axios.post('https://route-egypt-api.herokuapp.com/signin', userData )
    console.log(data);
    
    if(data.message == 'success'){
      setLoading(false);
      navigate("/home");
      localStorage.setItem('token' , data.token)
      saveUserData()
    }else{
      setError(data.message);
      setLoading(false);
    }
    
  }

  return (
    <div className="container">
      <div className="row my-5 pt-5 g-0">
      <div className="col-lg-6">
        <img src={Loginbg} alt="background" className='w-100 h-100' />
      </div>
      <div className="col-lg-6 login">
        <div className="login-form h-100 d-flex flex-column justify-content-center align-items-center">
          <img src={logo} alt="" className='logo' />
          <h1 className='text-gray fw-bold fs-2'>Log into Game Over</h1>

          {inputError.length > 0 ? (
          <div className="alert p-2 alert-danger w-75 text-center" role="alert">
            <strong>{inputError}</strong>
          </div>
        ) : (
          ""
        )}

          <form onSubmit={handleSubmit(submitForm)} className='w-75' >

            <input {...register('email')} className='form-control mt-2' type="email" placeholder='Email' />
            <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <div className="alert alert-danger p-2 mb-3 mt-1 mb-0" role="alert"><strong>{message}</strong></div>}
                  />

            <input {...register('password')} className='form-control mt-2' type="password"  placeholder='Passowrd' />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <div className="alert alert-danger p-2 mb-3 mt-1 mb-0" role="alert"><strong>{message}</strong></div>}
                  />
            <button type='submit' className="btn btn-secondary mt-2 w-100 mb-3">{loading ? <FaSpinner className="icon-spin" /> : 'Login'}</button>
          </form>

          <div className="line">

          </div>
          <p className='text-muted py-3'>Not a member yet? <Link to='/register' className='text-primary'>Create Account<FaChevronRight /></Link> </p>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Login