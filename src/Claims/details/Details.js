import React from "react";
import "./details.css";

function Details({option}) {
  // console.log(Number((option.dateOfBrith).substring(0,4)));
  let date = (new Date().getFullYear());
  return (
    <div className='details'>
      <div className='status'>
        <label htmlFor='status'>Surname:</label>
        <input type='text' className='stat' value={option.surname} disabled/>
      </div>
      <div className='code-name'>
        <label for='Enn code'>Enn Code:</label>
       <input type='text' className='Name-input' value={option.employeeNo} disabled/>
        <label htmlFor='Name'>Name:</label>
        <input type='text' className='Name-input' value={option.fullName || option.name} disabled/>
      </div>
      <div className='age-date'>
        <label htmlFor='birthday'>Birthday:</label>
        <input type='text' className='age' value={`${(option.dateOfBrith ? option.dateOfBrith.substring(0,10)  : "") || (option.birthDate ? option.birthDate.substring(0,10):"")} `} disabled/>
        <label htmlFor='age'>Age:</label>
        <input type='text' className='get-form' value={`${(option.dateOfBrith ? date - Number((option.dateOfBrith).substring(0,4)) : "") || (option.birthDate ? date - Number((option.birthDate).substring(0,4)) : "")}`} disabled/>
        <label htmlFor='sex'>Sex: </label>
        <input type='text' className='age' value={option.sex === "M"? "Male":"Female"} disabled />
        
      </div>
      <div className='status'>
        <label htmlFor='status'>Status</label>
        <input type='text' className='stat' value={option.notes} disabled/>
      </div>
      <div className='Company'>
        <label htmlFor='company'> Address: </label>
        <input type='text' className='comp' value={option.address01} disabled/>
      </div>
      <div className='Company'>
        <label htmlFor='company'> State: </label>
        <input type='text' className='stat' value={option.address02} disabled />
      </div>
    </div>
  );
}

export default Details;
