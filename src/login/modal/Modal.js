 import React, { useState } from "react";
import "./modal.css";
import * as FaIcons from "react-icons/fa";
import {useHistory} from "react-router-dom"


function Modal() {
  let history = useHistory()
  const [emailAddress, setEmailAddress] = useState("")
  const [modal, setModal] = useState(false);
  const toggleModal = (e) => {
    setModal(!modal);
    e.preventDefault()
    
  };
  
  async function sendInfo(e){
     e.preventDefault()
     history.push("/verification")
     let item = {"emailAddress" : emailAddress.trim()}
    let gu = JSON.stringify(item)
    console.log(gu);
    
    await fetch("https://portal.lifeworthhmoportal.com/api/Account/RequestToken",{
     method:'POST',
     headers:{
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body:gu
    })
    .then((res)=>{
      console.log(res.request);
    })
  }

  return (
    <>
      <button onClick={toggleModal} className='spn'>
        Set password
      </button>
      

      {modal && (
        <div className='modal'>
          <div className='overlay' onClick={toggleModal}></div>
          <div className='modal-content'>
            <label>Input Email address to Receive Password Link </label>
            <input type="email" id="email" onChange = {(e)=> setEmailAddress(e.target.value)} />
              <button onClick={sendInfo} className ="snd" >
                Send <FaIcons.FaLocationArrow /> 
              </button>
            
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
