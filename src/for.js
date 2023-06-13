import React, { Component, useState } from "react";
import Modal from './modal/Modal'
import medi from "./medicalimg.jpg";
import "./login.css";

function Page (){
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")

  

  async function Login(){
    
    let item = {"emailAddress" : emailAddress.trim(),
                 "password": password.trim()
    }
   let gu = JSON.stringify(item)
   console.log(gu);
   
   let result = await fetch("https://lifeworthhmo.herokuapp.com/api/Login",{
    method:'POST',
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:gu
    


   })
   
   console.log(result);
  
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    Login()
  }
  
  
  
    return (
      <section className='form'>
        <Images />
        <div className='formm'>
          <form
            // onSubmit={this.handleSubmit}
            // action='https://www.youtube.com/results'
          >
            <h2>Email</h2>
            <label htmlFor='email'></label>
            <input
              type='email'
              placeholder='Email'
              className=''
              onChange={(e)=> setEmailAddress(e.target.value)}
              
            />
            <h2>PASSWORD</h2>
            <label htmlFor='password'></label>
            <input
              type='password'
              placeholder='Password'
              className=''
              onChange={(e)=> setPassword(e.target.value)}
              
            />
            

            <button type='submit' className='btn1' onClick={handleSubmit}>Login</button>
            <p className='desc'>
              Dont have an account yet ?
              <Modal />
            </p>
          </form>
        </div>
      </section>
    );
  
}
const Images = () => {
  return <img src={medi} alt='' className='img' />;
};

export default Page;
