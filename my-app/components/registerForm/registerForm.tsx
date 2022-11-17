import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import client from "../client";





const registerForm = () => {
    const router = useRouter()

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
try {
    router.push('/');
    const {username,email,password}= document.forms[0]
    const res = await client.post("register", {
        "username": username.value,
        "email": email.value,
        "password": password.value
    }, )
    console.log(res.data);
} catch (error) {}
    
  
};



    return <div>
    
    <div className="container">
  <div className="brand-logo"></div>
  <div className="brand-title">Registera Vandrare</div>

  <form onSubmit={handleSubmit} className="inputs">

  <label htmlFor="username">NAME</label>
    <input id="username" name="username" type="text" placeholder="name" required/>


    <label htmlFor="email">EMAIL</label>
    <input id="email" type="email" name="email" placeholder="example@test.com" required/>

    <label htmlFor="password">PASSWORD</label>
    <input id="password" type="password" name="password" placeholder="Min 8 charaters long" minLength={8} required/>

    <button type="submit">REGISTER</button>
  </form>
 
</div>
 











    </div>
    
};

export default registerForm;