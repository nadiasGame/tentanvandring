import axios from "axios";
import { useRouter } from "next/router";
import React,{useEffect, useState} from "react";
import MyImage from "../image"; 
 import client from "../client";


//dejkw

const Admin = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
useEffect(()=>{
  const getAdminData = async ()=>{
      try {
      const res = await client.get("users",);
      console.log(res.data);

      setUsers(res.data);

    } catch (error) {
      
    }
    }
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