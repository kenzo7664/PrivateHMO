import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import './list.css'
import NumberFormat from 'react-number-format'
import Navbar from '../../sidebar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function SubmittedList() {
  let navigate = useHistory()
  const [claimsList, setClaimsList] = useState([])
  const providerId = Number(sessionStorage.getItem('id'))
  const backClick = () => {
    navigate.push('./dash')
  }

  useEffect(() => {
    axios
      .get(
        `https://portal.lifeworthhmoportal.com/api/Claims/daily/all/${providerId}`
      )
      .then((response) => {
        setClaimsList(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [providerId])

  const amount = claimsList.map((data) => data.chargesSent)
  const totalAmount = amount.reduce((a, b) => a + b, 0)

  return (
    <>
      <div className='submittedListWrapper'>
        <Navbar />
        <div className='submittedListRight'>
          <div className='submittedListTop'>
            <div onClick={backClick} className='backToPending'>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <h2>
              Total Charges Sent :{' '}
              <NumberFormat
                value={totalAmount}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'NGN'}
              />
            </h2>
          </div>
          {/* <div className='back'> */}
          {/* <button onClick={backClick} className='bck'>
              Back to Dashboard
            </button> */}
          {/* <h2>
              Total Charges Sent :{' '}
              <NumberFormat
                value={totalAmount}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'NGN'}
              />
            </h2> */}
          {/* </div> */}
          <div className='styledTableWrapper'>
            <table className='submittedListStyledTable'>
              <thead>
                <tr>
                  <th>FullName</th>
                  <th>EmployeeNo.</th>
                  <th>Diagnosis</th>
                  <th>Treatment Date</th>
                  <th>Description</th>

                  <th>Charges Sent</th>
                  <th>Status</th>
                </tr>
              </thead>
              {claimsList.length > 0 ? (
                claimsList.map((data, index) => (
                  <tbody className='size'>
                    <tr key={index}>
                      <td>{data.employeeName}</td>
                      <td>{data.employeeNo}</td>
                      <td>{data.diagnosis}</td>
                      <td>{data.treatmentDate.substring(0, 10)}</td>
                      <td>{data.description}</td>

                      <td>{data.chargesSent}</td>
                      <td>
                        {data.claimsStatus === 'SUBMITTED'
                          ? 'SUBMITTED'
                          : 'APPROVED'}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <div className='noClaimsYet'> No claims yet</div>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmittedList
