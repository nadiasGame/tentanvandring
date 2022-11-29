import React from "react"
import Link from "next/link";
import router from "next/router";
import client from "../client";





const Navbar = () => {
  const handleSubmit = async()=>{
  
   

   try {

    await client.get('logout');
       
   } 
   finally{
    router.push('/');
   }
};

    return <div id="navigation-bar">
    <nav>
      
      <ul> 

      <li><a onClick={(e)=>{handleSubmit()}}>Logout</a></li>
      <li><a href="/register">Register</a></li>
      <li><a href="/login">Login</a></li>
        <li><a href="/admin">Admin</a></li>
        <li><a href="/welcome">Welcome</a></li>
       
        <a href="#" id="menu-icon"></a>

      </ul>

    </nav>
  </div>

  };

export default Navbar;