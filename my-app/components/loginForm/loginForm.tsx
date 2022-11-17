import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import client from "../client";






const LoginForm = () => {
    const router = useRouter()

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    router.push('/');
  const {email,password}= document.forms[0]
  const res = await client.post("login", {

    "email": email.value,
    "password": password.value
})
console.log(res.data);



    

}



    return <div>
    
    <div className="container">
  <div className="brand-logo"></div>
  <div className="brand-title">Vandraren</div>

  <form onSubmit={handleSubmit} className="inputs">
  

    <label>EMAIL</label>
    <input name="email" type="email" placeholder="example@test.com" />
    <label>PASSWORD</label>
    <input name="password" type="password" placeholder="Min 6 charaters long" />
    <button type="submit">LOGIN</button>
  </form>
 
</div>
 











    </div>
    
};

export default LoginForm;