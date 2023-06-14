import React, { useState } from 'react'
import styles from './Login.module.css'
import {   useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function Login({saveUserData }) {

  let navigate =useNavigate()
  
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
 async function handleLogin(values){
  setLoading(true) 
   let { data }= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((errr)=>{
    console.log(errr);
     setLoading(false)
    setmessageError(`${errr.response.data.message}`)
   })
   
    if (data.message === 'success')
    {
      // console.log(data.user.role);
      localStorage.setItem('userToken',data.token)
      saveUserData()
      setLoading(false)
      
      navigate('/')
    }
  }
  let validationSchema=Yup.object({
   
    email:Yup.string().required('Email is required').email('Email is invaled'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,"password must start with uppercase"),
   
  })
  let formik = useFormik({ 
    initialValues:
    {
    
    email:'',
    password:''
    
  },validationSchema,
  onSubmit:handleLogin
  })
  return<>
  <div className='w-75 mx-auto py-4'>
    <h3>Login Now : </h3>
    {messageError.length>0?<div className='alert alert-danger'>
      {messageError}
    </div>:null}
    
    <form onSubmit={formik.handleSubmit} >
      
      <label htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
      {formik.errors.email && formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
      
      <label htmlFor="password">password</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
      {formik.errors.password && formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
      
       {isLoading?<button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Ligin</button>}
       
       
   
   
   
   
   
    </form>
  </div>
  </>
}
