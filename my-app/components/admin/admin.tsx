import axios from "axios";
import { useRouter } from "next/router";
import React,{useEffect, useState} from "react";
import MyImage from "../image"; 
 import client from "../client";


//dejkw

const Admin = () => {


  const [users, setUsers] = useState([]);
  
  
useEffect(()=>{
  const fetchUsers = async ()=>{
    const res = await client.get('users');
    try{

    
      
    if (res.status == 200) {
     
      const users = await res.data;
      
      setUsers(users);  }
    } catch (error) {}
};
fetchUsers();
}, []);


    return <div>
    <MyImage/>
    <h1>Admin!</h1>
    {users.map((val, index) => {
      return <div key={index}>{val.username}</div>
    })}
    </div>
    
};

export default Admin;