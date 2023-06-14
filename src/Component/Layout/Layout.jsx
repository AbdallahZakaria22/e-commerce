import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({userData,setUerData}) {

  let navigate =useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setUerData(null)
    navigate('/Login')
  }
  return<>
  
  <Navbar logout={logout} userData={userData} />
 <div className='container'>
  <Outlet></Outlet>
 </div>

  <Footer/>
  </>
}
