// import React, {useEffect, useState} from "react";
// import "./authorization.css";
// import axios from 'axios';
// import { useForm } from "react-hook-form";



// function Authorization({onSubmit}) {
//   const[apiDataAuthor,  setApiDataAuthor] = useState([])
//   const [diagnosisCode,  setDiagnosisCode] = useState('')
//   const { register, handleSubmit } = useForm({});
//   const Diagnosis = (e) => {
//        axios.get(`http://lifeworthhmo.herokuapp.com/api/Diagnosis`)
//     .then((response) => {
//       setApiDataAuthor(response.data)
//       console.log(response);
      
//     })
//     setDiagnosisCode(e.target.value)
//   }



//   return (
//     <>
//      <form onSubmit={handleSubmit(onSubmit)}>
//       <div className='authorization'>
//         <div className='Company'>
//           <label htmlFor='company'>Authorization Code/Date</label>
//           <input type='text' className='author' {...register("code")}/>
//           <input type='text' className='get-form' {...register("date")} />
//         </div>
//         <div className='headin'>
//           <div className='diagnosis'>
//             <label htmlFor='diagnosis'>Diagnosis</label>
//             <select name='' className='diag' onClick={Diagnosis} {...register("diagonsis")}>
//              {!apiDataAuthor ? <option value=''>--select--</option>
//              : apiData.map((data,index)=>(
//                 <option key = {index} value={data.diagnosisCode}>{`${data.diagnosis}`}</option>))}
//             </select>
//           </div>
//           <div className='detailS'>
//             <label htmlFor='diagnosis'>Details</label>
//             <input type='text' className='get-form' />
//           </div>
//           <div className='ICD-code'>
//             <label htmlFor='diagnosis'>ICD Code</label>
//             <input type='text' className='get-form' value={diagnosisCode} />
//           </div>
//           <div className='Consultation-date'>
//             <label htmlFor='diagnosis'>Consultation Date</label>
//             <input type='date' className='get-date' />
//           </div>
//         </div>
//       </div>
//       </form>
//     </>
//   );
// }

// export default Authorization;
