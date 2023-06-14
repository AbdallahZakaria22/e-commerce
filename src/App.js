import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Products from './Component/Products/Products';
import Categoris from './Component/Categoris/Categoris';
import Cart from './Component/Cart/Cart';
import Brands from './Component/Brands/Brands';
import NotFound from './Component/NotFound/NotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';



function App() {
  const [userData,setUerData]=useState([null])
  function saveUserData(){
  let encodedToken = localStorage.getItem('userToken');
  let decodedToken= jwtDecode(encodedToken);
  setUerData(decodedToken)
  }
  

  let router =createBrowserRouter([
    {
      path:'',element:<Layout setUerData={setUerData} userData={userData}/>,children:[
      {index:true,element:<Home/>},
      {path:'Cart',element:<Cart/>},
      {path:'Products',element:<Products/>},
      {path:'Categoris',element:<Categoris  />},
      {path:'Brands',element:<Brands/>},
      {path:'Login',element:<Login saveUserData={saveUserData}/>},
      {path:'Register',element:<Register/>},
      {path:'*',element:<NotFound/>},
    
      ]}
  ])
  return <>
    <RouterProvider router={router}></RouterProvider>
  </>
}

export default App;
