import React , {useState} from 'react'
import "./Register.scss";
import Loginbg from '../Assets/Login.jpg'
import {Link , useNavigate } from 'react-router-dom'
import { FaChevronRight, FaSpinner } from "react-icons/fa";
import {useForm} from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import  axios  from 'axios';
const Register = () => {

  const [inputError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate()

  let schema = yup.object().shape({
    first_name : yup.string().required('First Name is Requierd'),
    last_name : yup.string().required('Last Name is Requierd'),
    email : yup.string().email('This is not a correct email format').required('Email is Requierd'),
    age : yup.number().typeError('Your Age is Requierd').positive().moreThan(13 , 'You must be 14 years old or above to register').required('Your Age is Requierd'),
    password : yup.string().min(6, 'Password must be atleast 6 charcters').max(16, 'Password must not excseed 16 charcters').required('Password is Requierd')
  })

  const {register , handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })


  async function submitForm(userData: any){
    setLoading(true);
    let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup", userData)
    if(data.message == 'success'){
      setLoading(false);
      navigate("/login");
    }else{
      setError(data.errors.email.message);
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
        <div className="register-form p-5 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className='text-gray fw-bold fs-3 py-3'>Create My Account!</h2>
          {inputError.length > 0 ? (
          <div className="alert alert-danger w-100 text-center" role="alert">
            <strong>{"This " + inputError}</strong>
          </div>
        ) : (
          ""
        )}
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="row gy-3">
              <div className="col-xl-6 col-12">
                
                <input {...register('first_name', )} type="text" className='form-control' name='first_name' placeholder='First Name' />
                <ErrorMessage
                  errors={errors}
                  name="first_name"
                  render={({ message }) => <div className="alert alert-danger p-2 mt-2 mb-0" role="alert"><strong>{message}</strong></div>}
                  />
              </div>
              <div className="col-xl-6 col-12">
                
                <input {...register('last_name', )} type="text" className='form-control' name='last_name' placeholder='Last Name' />
                <ErrorMessage
                  errors={errors}
                  name="last_name"
                  render={({ message }) =><div className="alert alert-danger p-2 mt-2 mb-0" role="alert"><strong>{message}</strong></div>}
                  />
              </div>
              <div className="col-12">
                
                <input {...register('email', )} type="email" className='form-control' name='email' placeholder='Email Address' />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <div className="alert alert-danger p-2 mt-2 mb-0" role="alert"><strong>{message}</strong></div>}
                  />
              </div>
              <div className="col-12">
                
                <input {...register('age', )} type="number" className='form-control' name='age' placeholder='Age'/>
                <ErrorMessage
                  errors={errors}
                  name="age"
                  render={({ message }) => <div className="alert alert-danger p-2 mt-2 mb-0" role="alert"><strong>{message}</strong></div>}
                  />
              </div>
              <div className="col-12">
                
                <input {...register('password', )} type="password" className='form-control' name='password' placeholder='Password' />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <div className="alert alert-danger p-2 mt-2 mb-0" role="alert"><strong>{message}</strong></div>}
                  />
              </div>
            </div>
            <button type='submit'  className="btn btn-secondary w-100 my-3">{loading ? <FaSpinner className="icon-spin" /> : 'Create Account'}</button>
            <div className="text-muted small text-center mb-3">This site is protected by reCAPTCHA and the Google <a  href="https://policies.google.com/privacy" className="text-secondary text-decoration-underline">Privacy Policy</a> and <a  href="https://policies.google.com/terms" className="text-secondary text-decoration-underline">Terms of Service</a> apply.</div>
          </form>
          <div className="line"></div>
          <p className='text-muted py-3'>Already a member?<Link to='/login' className='text-primary'> Log In<FaChevronRight /></Link> </p>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Register