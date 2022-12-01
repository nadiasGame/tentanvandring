
import React,{useEffect, useState} from "react";
import { useRouter } from "next/router";
import client from "./client";




useEffect(()=>{
  const [users, setUsers] = useState([]);
  const router = useRouter();

    const getAdminLoggin = async ()=>{
        try {
          router.push('/');
        const res = await client.get("users",);
        console.log(res.data);
     
  
        setUsers(users);
        
  
      } catch (error) {
        
      }
      }
    getAdminLoggin ()
  },[])
  
const adminLogin = () => {
    

    <div>hej</div>

    
    return <div>
  <h1>hi</h1>
      </div>
    };

    export default adminLogin;