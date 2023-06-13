import React, { useState } from "react";
import "./verification.css";
import * as FaIcons from "react-icons/fa";
import axios from 'axios';
import {useHistory} from "react-router-dom"

function Verification() {
  let history = useHistory()
  const [emailAddress, setEmailAddress] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
 
  
  const checkInputs = () => {
    const passWord1 = document.getElementById("email");
    const passWord2 = document.getElementById("password");
    const passWord3 = document.getElementById("confirmPassword")
    const token = document.getElementById("confirmToken")
    const passwordValue = passWord1.value.trim();
    const password2Value = passWord2.value.trim();
    const codeValue = token.value.trim();
    const password3Value = passWord3.value.trim()

    if (passwordValue === "") {
      setErrorFor(passWord1, "Field can't be empty");

    } else{
      setSuccessFor(passWord1, "Checked")
    }
    if (password2Value === ""){
      setErrorFor(passWord2, "Field can't be empty");
    }else{
      setSuccessFor(passWord2, "Checked")
    }
    if(password3Value === ""){
      setErrorFor(passWord3, "Field can't be empty");
    } else if(password2Value !== password3Value){
      setErrorFor(passWord3, "Passwords do not match");  
    }else{
      setSuccessFor(passWord3, "Checked")
    }
    if(codeValue ===""){
      setErrorFor(token, "Field can't be empty"); 
    }else{
      setSuccessFor(token, "Checked")
    }
    if (codeValue !== "" && password2Value !== "" && password3Value !== "" && password2Value === password3Value){
      // window.location.href = "/"
    }
   
  };
 function resetPassword(){
    
    let item = 
    {"emailAddress" : emailAddress.trim(),
      "code": code.trim(),
      "password": password.trim()
    }
   let gu = JSON.stringify(item)
   axios.post(`http://15.237.160.238:50/api/Account/ResetPassword` ,gu , 
   { headers: { 'Content-Type': 'application/json' }})
   .then((response)=>{console.debug(response)})
   
  
  }

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  };

  const setSuccessFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control success";
    small.innerText = message;
  };

  

  const handleSubmit = (e) => {
    e.preventDefault()
    checkInputs();
    
    resetPassword()
    history.push("/")
  };

  return (
    <>
      <article>
        <form className='forrm' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='firstName'>Email : </label>
            <input
              type= "email"
              id='email'
              name='email'
              onChange={(e)=> setEmailAddress(e.target.value)}
              
            />
            <small>Error message</small>
            
          </div>
          <div className='form-control'>
            <label htmlFor='firstName'>Password : </label>
            <input
              type={passwordShown ? "text" : "password"}
              id='password'
              name='password'
              
              onChange={(e)=> setPassword(e.target.value)}
            />
            <FaIcons.FaRegEyeSlash
              onClick={togglePassword}
              className='eye-slash'
            />
            <small>Error message</small>
          </div>
          <div className='form-control'>
            <label htmlFor='firstName'> Confirm Password : </label>
            <input
              type={passwordShown ? "text" : "password"}
              id='confirmPassword'
              name='password'
              
              onChange={(e)=> setPassword(e.target.value)}
            />
            <FaIcons.FaRegEyeSlash
              onClick={togglePassword}
              className='eye-slash'
            />
            <small>Error message</small>
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Code : </label>
            <input
              
              id='confirmToken'
              name='confirmToken'
              onChange={(e)=> setCode(e.target.value)}
              
            />
           <small>Error message</small>
          </div>

          <button type='submit' onClick={handleSubmit} className='form-btn'>
            Create Password
          </button>
        </form>
      </article>
    </>
  );
}

export default Verification;
