import React, { useState } from 'react'
import styles from './Register.module.css'
import {   useFormik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  let navigate =useNavigate()
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
 async function handleRegister(values){
  setLoading(true) 
   let { data }= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((errr)=>{
    console.log(errr);
  setLoading(false)
  setmessageError(`${errr.response.data.message}`)
   })
   console.log(data);
    if (data.message === 'success')
    {
      setLoading(false)
      navigate('/Login')
    }
  }
  let validationSchema=Yup.object({
    name:Yup.string().required('Name is required').min(3,'Name minLenth 3').max(10,'Name maxLenth 10'),
    email:Yup.string().required('Email is required').email('Email is invaled'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,"password must start with uppercase"),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],"password and rePassword dosent match"),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,"phone is valid")
  })
  let formik = useFormik({ 
    initialValues:
    {
    name: '',
    email:'',
    password:'',
    rePassword:'',
    phone:''
  },validationSchema,
  onSubmit:handleRegister
  })
  return<>
  <div className='w-75 mx-auto py-4'>
    <h3>Register Now : </h3>
    {messageError.length>0?<div className='alert alert-danger'>
      {messageError}
    </div>:null}
    
    <form onSubmit={formik.handleSubmit} >
      <label htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange}/>
      {formik.errors.name && formik.touched.name ?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
      
      <label htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
      {formik.errors.email && formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
      
      <label htmlFor="password">password</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
      {formik.errors.password && formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
      
      <label htmlFor="rePassword">rePassword</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="password" name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange}/>
      {formik.errors.rePassword && formik.touched.rePassword ?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}
      
      <label htmlFor="phone">phone</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange}/>
      {formik.errors.phone && formik.touched.phone ?<div className='alert alert-danger'>{formik.errors.phone}</div>:null}

       {isLoading?<button className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
       
       
   
   
   
   
   
    </form>
  </div>
  </>
}
