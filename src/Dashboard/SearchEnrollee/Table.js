import React from 'react'
import './Table.css'

// function Table({ apiData, searchInput, searchEmployee }) {
//   console.log(searchInput)
//   console.log(searchEmployee)
//   return (
//     <>
//       {(searchInput.length >= 2 || searchEmployee) && apiData
//         ? apiData.map((name, index) => {
//             return (

function Table({ apiData, searchInput, searchEmployee }) {
  console.log(searchInput)
  console.log(searchEmployee)
  return (
    <>
      <div className='enroleeTableWrapper'>
        <table className='submittedListStyledTable'>
          {apiData
            ? apiData.map((name, index) => {
                return (
                  <>
                    <thead>
                      <tr key={index}>
                        <th>Surname</th>
                        <th>FullName</th>
                        <th>EmployeeNo.</th>
                        <th>Id Policy</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                      </tr>
                    </thead>
                    <tbody className='size'>
                      <tr>
                        <td>{name.surname}</td>
                        <td>{name.fullName || name.name}</td>
                        <td>{name.employeeNo}</td>
                        <td>{name.currentIdPolicy}</td>
                        <td>{name.email}</td>
                        <td>{name.phoneNo}</td>
                      </tr>
                    </tbody>
                  </>
                )
              })
            : ''}
        </table>
      </div>
    </>
  )
}

export default Table
