import axios from "axios";
import { useRouter } from "next/router";
import React,{useEffect, useState} from "react";
import MyImage from "../image"; 
 import client from "../client";


//dejkw

const Admin = () => {


  const [users, setUsers] = useState([]);
  
  
useEffect(()=>{
  const getAdminData = async ()=>{
    const res = await client.get('users');
      
    if (res.status == 400) {

      console.log('Kunde inte hämta användare');

    } else if (res.status == 200) {
     
      const users = await res.data;
      console.log('Nåt händer här!',users);
      setUsers(users);
    } else if (res.status == 403) {
      console.log('Något gick fel här');
    }
  };

  getAdminData ()
},[])

    return <div>
    <MyImage/>
    <h1>Admin!</h1>
    {users.map((val, index) => {
      return <div key={index}>{val.username}</div>
    })}
    </div>
    
};

export default Admin;