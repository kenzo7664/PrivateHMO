import React, {useEffect, useState} from "react";
import "./medical.css";
import axios from 'axios';

function Medicals() {
   const [option,setOption] = useState()
   const [amount, setAmount] = useState(0)
  const handleClick = () => {
    var bu = document.querySelector(".medicals");
    var clone = bu.cloneNode(true);
    clone.id = "elem2";
    bu.after(clone);
    setAmount(0)
    setOption()
  };
  const removeClick = () =>{
    var bu = document.querySelector(".medicals");
    var clone = bu.cloneNode(true);
    clone.id = "elem3";
    bu.remove(clone.id);
    
  }
  const chargesApproved =()=>{
    const value = Number(document.getElementById('charges').value)
    const calcAmount = value * option
    setAmount(calcAmount);
  }

  const[apiData,  setApiData] = useState([])
  const Medical = (event) => {
       axios.get(`http://lifeworthhmo.herokuapp.com/api/Classification`)
    .then((response) => {
      setApiData(response.data)
      console.log(response);
      
    })
     
    setOption(event.target.value)
    console.log(option);
  }
 
  return (
    <>
      <div className='Medicals'>
        <div className='medicals'>
          <div className='section-1'>
            <div className='classification-desc'>
              <label htmlFor=''>Classification</label>
              <select name='' id='' className='charges-approved' onClick={Medical}>
               {!apiData ? <option value=''>--select--</option>
             : apiData.map((data,index)=>(
                <option key = {index} value=''>{`${data.classification}`}</option>))}
              </select>
              <label htmlFor=''>Description</label>
              <select name='' id='' className='charges-approved' onClick={Medical}>
               {!apiData ? <option value=''>--select--</option>
             : apiData.map((data,index)=>(
                <option key = {index} value={data.price}>{`${data.description}`}</option>))}
              </select>
            </div>
            <div className='approved'>
              <label htmlFor=''>No of days/Qty:</label>
              <input type='text' className='charges-approved' id="charges"  onChange={chargesApproved}/>
              <label htmlFor=''>Unit price:</label>
              <input type='text' className='charges-approved' value={option} disabled />
            
            </div>
            <div className="amount">
              <label htmlFor=''>Charges Approved:</label>
              <input type='text' className='charges-approved' value={amount} disabled/>
            </div>
            <div className='comment'>
              <label htmlFor=''>Amount Sent</label>
              <input type='text' className='charges-approved' />
              <label htmlFor=''>Comment</label>
              <input type='text' className='charges-approved' />
            </div>
          </div>
        </div>
        <div>
          <button type='button' className='btnn1' onClick = {handleClick}>
            Add Field
          </button>
          <button type='button' className='btnn1' onClick = {removeClick}>
            Remove Field
          </button>
         
        </div>
      </div>
    </>
  );
}

export default Medicals;
