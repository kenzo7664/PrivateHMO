import React, { useEffect, useState } from 'react'
import './SearchEnrollee.css'
import { DebounceInput } from 'react-debounce-input'
import axios from 'axios'
import Table from './Table'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router'
import Navbar from '../../sidebar/Navbar'

function SearchEnrollee() {
  const [searchInput, setSearchInput] = useState({})
  const [searchValue, setSearchValue] = useState(null)
  const [searchId, setSearchId] = useState(null)

  const [searchEmployee, setSearchEmployee] = useState('')
  const [apiData, setApiData] = useState([])

  let navigate = useHistory()
  const providerId = Number(sessionStorage.getItem('id'))

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
    setSearchId(e.target.dataset.name)
    // console.log(e)
    // setSearchValue(e)
  }
  const handleSearch = (searchId) => {
    if (searchId === 'surname') {
      searchItems(searchValue)
    }
    if (searchId === 'employeeNumber') {
      searchEmployeeNumber(searchValue)
    }
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    axios
      .get(
        `https://portal.lifeworthhmoportal.com/api/Employee?IdProvider=${providerId}&FullName=${searchValue}`
      )
      .then((response) => {
        setApiData(response.data)
        if (response.data.length >= 1) {
          toast('Patient(s) Fetched Succesfully', {
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#F8A370',
              color: '#fff',
            },
          })
        } else {
          toast('Patient(s) NOT FOUND', {
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#F8A370',
              color: '#fff',
            },
          })
        }
      })
  }
  console.log(apiData)

  const searchName = (searchValue) => {
    setSearchInput(searchValue)
    axios
      .get(
        `https://portal.lifeworthhmoportal.com/api/Employee?IdProvider=${providerId}&Surname=${searchValue}`
      )
      .then((response) => {
        setApiData(response.data)
        if (response.data.length >= 1) {
          toast('Patient(s) Fetched Succesfully', {
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#F8A370',
              color: '#fff',
            },
          })
        } else {
          toast('Patient(s) NOT FOUND', {
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#F8A370',
              color: '#fff',
            },
          })
        }
      })
  }

  const searchEmployeeNumber = (searchId) => {
    setSearchEmployee(searchId)
    if (searchId.includes('~')) {
      axios
        .get(
          `https://portal.lifeworthhmoportal.com/api/Dependant?idProvider=${providerId}&DependantNumber=${searchId}`
        )
        .then((response) => {
          setApiData(response.data)
          if (response.data.length >= 1) {
            toast('Patient(s) Fetched Succesfully', {
              duration: 4000,
              style: {
                borderRadius: '10px',
                background: '#F8A370',
                color: '#fff',
              },
            })
          } else {
            toast('Patient(s) NOT FOUND', {
              duration: 4000,
              style: {
                borderRadius: '10px',
                background: '#F8A370',
                color: '#fff',
              },
            })
          }
        })
    } else {
      axios
        .get(
          `https://portal.lifeworthhmoportal.com/api/Employee?IdProvider=${providerId}&EmployeeNumber=${searchId}`
        )
        .then((response) => {
          setApiData(response.data)
          if (response.data.length >= 1) {
            toast('Patient(s) Fetched Succesfully', {
              duration: 4000,
              style: {
                borderRadius: '10px',
                background: '#F8A370',
                color: '#fff',
              },
            })
          } else {
            toast('Patient(s) NOT FOUND', {
              duration: 4000,
              style: {
                borderRadius: '10px',
                background: '#F8A370',
                color: '#fff',
              },
            })
          }
        })
    }
  }
  const backClick = () => {
    navigate.push('./dash')
  }

  return (
    <>
      <div className='searchEnroleeWrapper'>
        <Navbar />
        <section className='background'>
          <section className='claims-wrapperr'>
            <div className='heading'>
              <h1>Search Enrollee</h1>
              <button onClick={backClick} className='enroleeBack'>
                Back to Dashboard
              </button>
              <Toaster position='top-center' reverseOrder={false} />
            </div>
            <div className='' id='enroleecontent'>
              <div className='enroleeInfo'>
                Kindly input employee number or surname to search
              </div>
              <form className='enrole'>
                <div className=''>
                  <label htmlFor=''>EmployeeNumber:</label>
                  <input
                    // minLength={2}
                    // debounceTimeout={1000}
                    onChange={(e) => handleSearchValue(e)}
                    className='dbInput'
                    data-name='employeeNumber'
                  />
                  {/* <label htmlFor=''>FULLNAME:</label>
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={1000}
                    onChange={(e) => searchItems(e.target.value)}
                  /> */}

                  <label htmlFor=''>Surname:</label>
                  <div className='surnameInput'>
                    <input
                      className='dbInput'
                      onChange={(e) => handleSearchValue(e)}
                      data-name='surname'
                    />
                  </div>
                  <div
                    className='inputdiv'
                    onClick={() => handleSearch(searchId)}
                  >
                    Search
                  </div>
                </div>
                <div className='dependant'></div>
              </form>

              <Table
                apiData={apiData}
                searchInput={searchInput}
                searchEmployee={searchEmployee}
              />
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export default SearchEnrollee
