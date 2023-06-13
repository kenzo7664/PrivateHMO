import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import {
  handleFilterByStatus,
  handleFilterClaimList,
  handleMonthChange,
  handleSelectedMonth,
  handleSelectedStatus,
  handleYearChange,
  setShowMonthsList,
  setShowStatusList,
} from '../../functions/FilterFunctions'
import { statusList } from '../../misc/StatusList'
import { calendarMonths } from '../../months/Months'
import Navbar from '../../sidebar/Navbar'
import './list.css'

function List() {
  let navigate = useHistory()
  const [claimsList, setClaimsList] = useState([])
  const [filteredClaimsList, setFilteredClaimsList] = useState([])
  const [status, setStatus] = useState(null)
  const [showStatus, setShowStatus] = useState(false)
  const [filteredMonths, setFilteredMonths] = useState([])
  const [filterCriteria, setFilterCriteria] = useState([])
  const [showMonth, setShowMonth] = useState(false)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(2022)
  const [tryFiltered, settryFiltered] = useState(false)
  let filtered

  const providerId = Number(sessionStorage.getItem('id'))
  const backClick = () => {
    navigate.push('./dash')
  }

  console.log(filteredClaimsList)

  useEffect(() => {
    axios
      .get(
        `https://portal.lifeworthhmoportal.com/api/Claims?IdProvider=${providerId}&pageNumber=1&pageSize=10`
      )
      .then((response) => {
        setClaimsList(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [providerId])
  useEffect(() => {}, [status])

  useEffect(() => {
    handleFilterClaimList(
      year,
      month,
      status,
      claimsList,
      setFilteredClaimsList,
      setFilterCriteria,
      filterCriteria,
      settryFiltered
    )
  }, [
    year,
    month,
    status,
    claimsList,
    setFilteredClaimsList,
    setFilterCriteria,
    filterCriteria,
  ])

  return (
    <>
      <div className='claimsHistoryWrapper'>
        <Navbar />
        <div className='submittedListRight'>
          <div className='submittedListFilterWrapper'>
            <div onClick={backClick} className='backToPending'>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className='claimsStatusFilter'>
              <input
                type='text'
                className='claimsStatusFilterInput'
                placeholder='Filter by status'
                onClick={() => setShowStatusList(setShowStatus, showStatus)}
                // onChange={(e) =>
                //   handleChange(
                //     e,
                //     filtered,
                //     allList,
                //     setFilteredList,
                //     setSelectedProvider,
                //     filterList,
                //     setFilterList
                //   )
                // }
                value={status}
              />
              <span>
                <FontAwesomeIcon icon={faFilter} />
              </span>
            </div>
            {showStatus && (
              <div className='FilteredProviderList'>
                {statusList.map((singleStatus, index) => {
                  return (
                    <div
                      className='FilteredProviderListItem'
                      key={index}
                      onClick={(e) =>
                        handleSelectedStatus(
                          e,
                          setStatus,
                          setShowStatus,
                          settryFiltered
                        )
                      }
                    >
                      {singleStatus}
                    </div>
                  )
                })}
              </div>
            )}
            <div className='monthsFilterWrapper'>
              <div className='monthsFilter'>
                <input
                  onClick={(e) => setShowMonthsList(setShowMonth, showMonth)}
                  placeholder='Month'
                  type='text'
                  className='monthsFilterInput'
                  onChange={(e) =>
                    handleMonthChange(
                      e,
                      filtered,
                      calendarMonths,
                      setFilteredMonths,
                      setShowMonth,
                      showMonth,
                      setMonth,
                      settryFiltered
                    )
                  }
                  value={month?.name}
                />
              </div>
              {showMonth && (
                <div className='monthsList'>
                  {
                    (filteredMonths.length > 0
                      ? filteredMonths
                      : calendarMonths
                    ).map((singleMonth, index) => {
                      return (
                        <div
                          className='monthsListItem'
                          key={index}
                          onClick={(e) =>
                            handleSelectedMonth(
                              e,
                              setMonth,
                              setShowMonth,
                              calendarMonths,
                              settryFiltered
                            )
                          }
                        >
                          {singleMonth.name}
                        </div>
                      )
                    })
                    // {calen}
                  }
                </div>
              )}
            </div>
            <div className='yearInputWrapper'>
              <input
                type='number'
                className='yearInput'
                placeholder='Year'
                value={year ? year : ''}
                onChange={(e) => handleYearChange(e, setYear, settryFiltered)}
              />
            </div>
            <div
              className='showAll'
              onClick={() => {
                settryFiltered(false)
              }}
            >
              Show all claims
            </div>
          </div>
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
              {filteredClaimsList?.length === 0 && claimsList?.length === 0 && (
                <div className='noClaims'>No Claims Available</div>
              )}
              {claimsList
                ? (tryFiltered ? filteredClaimsList : claimsList)?.map(
                    (data, index) => {
                      return (
                        <tbody className='size' key={index}>
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
                      )
                    }
                  )
                : 'Loading List ...'}
            </table>
          </div>
        </div>
        {/* <button onClick={backClick} className='bck'>
          Back to Dashboard
        </button> */}
      </div>
    </>
  )
}

export default List
