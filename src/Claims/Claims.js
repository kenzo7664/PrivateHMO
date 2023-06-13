import React, { useState } from 'react'
import axios from 'axios'
import './claims.css'
import { useForm } from 'react-hook-form'
import { DebounceInput } from 'react-debounce-input'
import '../Claims/authorization/authorization.css'
import '../Claims/Medicals/medical.css'
import '../Claims/details/details.css'
import toast, { Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router'
import NumberFormat from 'react-number-format'
import Navbar from '../sidebar/Navbar'

function Claims() {
  let navigate = useHistory()
  let claims = []
  let date = new Date().getFullYear()
  const [option, setOption] = useState([])
  const [desc, setDesc] = useState('')
  const [options, setOptions] = useState(0)
  const [content, setContent] = useState('')
  const [apiDataMedical, setApiDataMedical] = useState([])
  const [searchInput, setSearchInput] = useState({})
  const [searchEmployee, setSearchEmployee] = useState('')
  const [apiData, setApiData] = useState([])
  const [amountCalc, setAmountCalc] = useState(0)
  const [apiDataAuthor, setApiDataAuthor] = useState([])
  const [codes, setCodes] = useState('')
  const [type, setType] = useState('')
  const [proType] = useState('str')
  const [dates, setDates] = useState('')
  const [claimsList, setClaimsList] = useState([])
  const [day, setDay] = useState(0)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(0)
  const providerId = Number(sessionStorage.getItem('id'))

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    axios
      .get(
        `https://portal.lifeworthhmoportal.com/api/Employee?IdProvider=${providerId}&FullName=${searchValue}`
      )
      .then((response) => {
        setApiData(response.data)
        setType('Principal')
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
          setType('Dependant')
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
          setType('Principal')
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

  const handleSelect = (event) => {
    setContent(event.target.value)
    if (content.includes('~')) {
      axios
        .get(
          `https://portal.lifeworthhmoportal.com/api/Dependant?idProvider=${providerId}&DependantNumber=${content}`
        )
        .then((response) => {
          setOption(...response.data)
          setType('Dependant')
        })
    } else if (content) {
      axios
        .get(
          `https://portal.lifeworthhmoportal.com/api/Employee?IdProvider=${providerId}&EmployeeNumber=${content}`
        )
        .then((response) => {
          setType('Principal')
          setOption(...response.data)
        })
    }
  }

  const Medical = () => {
    axios
      .get(`https://portal.lifeworthhmoportal.com/api/Classification`)
      .then((response) => {
        setApiDataMedical(response.data)
        console.log(response.data)
        if (apiDataMedical) {
          toast('Classifications Fetched Succesfully', {
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

  const Diagnosis = (e) => {
    axios
      .get(`https://portal.lifeworthhmoportal.com/api/Diagnosis`)
      .then((response) => {
        console.log(response.data)
        setApiDataAuthor(response.data)
        // if(apiDataAuthor){
        //  toast("Diagnosis Fetched Succesfully", {
        //     duration: 4000,
        //     style: {
        //     borderRadius: '10px',
        //     background: '#F8A370',
        //     color: '#fff',
        //  },
        //   },
        //   )
        // }
      })
      .then(() => {
        setDesc(e.target.value)
        Medical()
      })
      .catch((error) => {
        console.error(error)
      })
    console.log(e.target.value)
  }

  const Description = (e) => {
    console.log('hhh', apiDataMedical, e.target.value)
    if (desc === '') {
      alert('Select a Diagnosis')
    } else {
      const price = apiDataMedical
        .filter((data) => data.description === e.target.value)
        .map((data) => data.price)
      console.log(price)
      setOptions(...price)
      if (options) {
        toast('Unit Price Fetched Succesfully', {
          style: {
            borderRadius: '10px',
            background: '#F8A370',
            color: '#fff',
          },
        })
      }
    }
  }

  const chargesApproved = () => {
    const value = Number(document.getElementById('charges').value)
    const calcAmount = value * options
    setAmountCalc(calcAmount)
  }
  const getDate = () => {
    const dateNew = new Date()
    const day = dateNew.getDate()
    const month = dateNew.getMonth() + 1
    const year = dateNew.getFullYear()
    setDay(day)
    setMonth(month)
    setYear(year)
  }

  const getDateConsul = (e) => {
    getDate()
    if (e.target.value !== '') {
      console.log(e.target.value)
      const dateConvert = e.target.value
      const dateStr = new Date(dateConvert)

      const iso = dateStr.toISOString()

      setDates(iso)
    }
  }

  const backClick = () => {
    navigate.push('./dash')
  }

  const reload = () => {
    window.location.reload(false)
  }

  const getAuthorCode = (e) => {
    console.log(e.target.value)
    setCodes(e.target.value)
  }
  const defaultValues = {
    chargesSent: amountCalc,
    authorcode: codes,
    consultancyDate: '',
    qty: 0,
    diagnosis: '',
    details: '',
    idProvider: providerId,
    type: type,
    protype: proType,
    TreatmentDate: dates,
    Day: day,
    Month: month,
    unitPrice: options,
  }
  const { register, handleSubmit, reset } = useForm({ defaultValues })

  const addUp = (data) => {
    data.classification = data.diagnosis
    data.type = type
    data.chargesSent = amountCalc
    data.chargesApproved = amountCalc
    data.idProvider = providerId
    data.idCompany = providerId
    data.employeeNo = option.employeeNo
    data.employeeName = option.surname + ' ' + (option.fullName || option.name)
    data.employeeSurname = option.surname
    data.consultancyDate = dates
    data.TreatmentDate = dates
    data.Day = day
    data.Month = month
    data.year = year
    data.unitPrice = options
    data.approvedQty = data.qty

    const dataInfo = {
      day: data.Day,
      description: data.Description,
      month: data.Month,
      treatmentDate: data.TreatmentDate,
      authDate: data.authdate,
      authorcode: data.authorcode,
      chargesSent: data.chargesSent,
      chargesApproved: data.chargesSent,
      classification: data.diagnosis,
      consultancyDate: data.consultancyDate,
      details: data.details,
      diagnosis: data.diagnosis,
      employeeName: data.employeeName,
      employeeSurname: data.employeeSurname,
      employeeNo: data.employeeNo,
      idCompany: data.idCompany,
      idProvider: data.idProvider,
      proType: data.protype,
      qty: data.qty,
      approvedQty: data.qty,
      type: data.type,
      unitPrice: data.unitPrice,
      year: data.year,
    }

    claims.push(dataInfo)
    toast('Treatment Added Succesfully', {
      duration: 2000,
      style: {
        borderRadius: '10px',
        background: '#F8A370',
        color: '#fff',
      },
    })
    setClaimsList((prev) => prev.concat(dataInfo))
    console.log(claims)
    console.log(dataInfo)
    console.log(claimsList)
    //  setClaimsList((prevstate)=>{...prevstate, claims})

    //  if (claims.length >= 0){
    //   //  onSubmit()
    //  }
    setApiDataMedical(null)
    setAmountCalc('')
    setOptions('')
    reset(defaultValues)
  }
  console.log(claimsList)
  const onSubmit = () => {
    let answer = window.confirm(
      `You are about to submit the Claims treatment for ${option.surname} ${
        option.fullName || option.name
      }`
    )
    if (answer) {
      axios
        .post('https://portal.lifeworthhmoportal.com/api/Claims', claimsList, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          console.log(response)
        })
        .then(() => {
          reload()
        })
        .then(() => {
          toast('Claims Submitted Succesfully', {
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#F8A370',
              color: '#fff',
            },
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  console.log(claimsList)
  const totalBilled = claimsList.map((data) => data.chargesSent)
  console.log(totalBilled)
  const totalBilledAmount = totalBilled.reduce((a, b) => a + b, 0)
  console.log(totalBilledAmount)
  // const code = claimsList.map((data)=>data.authorcode)
  // console.log(code);

  return (
    <>
      <div className='addClaimsWrapper'>
        <Navbar />
        <section className='claims-wrapper'>
          <div className='heading'>
            <h1>Input Claims</h1>
            <div>
              <button onClick={backClick} className='addClaimsReloadBack'>
                Back to Dashboard
              </button>
              <button onClick={reload} className='addClaimsReload'>
                Reload
              </button>
              <Toaster position='top-center' reverseOrder={false} />
            </div>
          </div>
          <form onSubmit={handleSubmit(addUp)}>
            <div className=''>
              <div className=''>
                <label htmlFor=''>EnroleeNumber:</label>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={1000}
                  onChange={(e) => searchEmployeeNumber(e.target.value)}
                />
                <label htmlFor=''>FullName:</label>
                <DebounceInput
                  minLength={2}
                  debounceTimeout={1000}
                  onChange={(e) => searchItems(e.target.value)}
                />
              </div>
              <div className='enrolee'>
                <label htmlFor='enrolee'>Select Enrollee</label>

                <select className='prov' id='' onClick={handleSelect}>
                  {searchInput || searchEmployee
                    ? apiData.map((data, index, arr) => (
                        <option key={index} value={data.employeeNo}>{`${
                          data.fullName || data.name
                        }[ ${data.employeeNo}] `}</option>
                      ))
                    : ''}
                </select>
              </div>
              <div className='details'>
                <div className='status'>
                  <label htmlFor='status'>Surname:</label>
                  <input
                    type='text'
                    className='stat'
                    value={option.surname || option.name}
                    {...register('employeeSurname')}
                    disabled
                  />
                </div>
                <div className='code-name'>
                  <label for='Enn code'>Enn Code:</label>
                  <input
                    type='text'
                    className='Name-input'
                    value={option.employeeNo}
                    {...register('employeeNo')}
                    disabled
                  />
                  <label htmlFor='Name'>Name:</label>
                  <input
                    type='text'
                    className='Name-input'
                    value={option.fullName || option.name}
                    {...register('employeeName')}
                    disabled
                  />
                </div>
                <div className='age-date'>
                  <label htmlFor='birthday'>Birthday:</label>
                  <input
                    type='text'
                    className='age'
                    value={`${
                      (option.dateOfBrith
                        ? option.dateOfBrith.substring(0, 10)
                        : '') ||
                      (option.birthDate
                        ? option.birthDate.substring(0, 10)
                        : '')
                    } `}
                    disabled
                  />
                  <label htmlFor='age'>Age:</label>
                  <input
                    type='text'
                    className='get-form'
                    value={`${
                      (option.dateOfBrith
                        ? date - Number(option.dateOfBrith.substring(0, 4))
                        : '') ||
                      (option.birthDate
                        ? date - Number(option.birthDate.substring(0, 4))
                        : '')
                    }`}
                    disabled
                  />
                  <label htmlFor='sex'>Sex: </label>
                  <input
                    type='text'
                    className='age'
                    value={option.sex === 'M' ? 'Male' : 'Female'}
                    disabled
                  />
                </div>
                <div className='status'>
                  <label htmlFor='status'>Status</label>
                  <input
                    type='text'
                    className='stat'
                    value={option.notes}
                    disabled
                  />
                </div>
                <div className='Company'>
                  <label htmlFor='company'> Address: </label>
                  <input
                    type='text'
                    className='comp'
                    value={option.address01}
                    disabled
                  />
                </div>
                <div className='Company'>
                  <label htmlFor='company'> State: </label>
                  <input
                    type='text'
                    className='stat'
                    value={option.address02}
                    disabled
                  />
                </div>
              </div>
              <div className='authorization'>
                <div className='Company'>
                  <label htmlFor='company'>Authorization Code/Date</label>
                  <input
                    type='text'
                    className='author'
                    {...register('authorcode')}
                    onChange={getAuthorCode}
                  />
                  <input
                    type='text'
                    className='author'
                    value={new Date().toISOString()}
                    {...register('authdate')}
                  />
                </div>
                <div className='headin'>
                  <div className='diagnosis'>
                    <label htmlFor='diagnosis'>Diagnosis</label>
                    <select
                      name=''
                      className='diag'
                      onClick={Diagnosis}
                      {...register('diagnosis')}
                      id='diag'
                    >
                      {!apiDataAuthor ? (
                        <option value=''>--select--</option>
                      ) : (
                        apiDataAuthor.map((data, index) => (
                          <option
                            key={index}
                            value={data.diagnosis}
                          >{`${data.diagnosis}`}</option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className='detailS'>
                    <label htmlFor='diagnosis'>Details</label>
                    <input type='text' className='' {...register('details')} />
                  </div>

                  {/* <div className='ICD-code'>
            <label htmlFor='diagnosis' >ICD Code</label>
            <input type='text' className='' value={diagnosisCode}    />
          </div> */}

                  <div className='Consultation-date'>
                    <label htmlFor='diagnosis'>Encounter Date</label>
                    <input
                      type='date'
                      className=''
                      onSelect={(e) => getDateConsul(e)}
                      {...register('consultancyDate')}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='Medicals'>
                <div className='medicals'>
                  <div className='section-1'>
                    <div className='classification-desc'>
                      <label htmlFor=''>Description : </label>
                      <select
                        name=''
                        id=''
                        className='description'
                        onClick={Description}
                        {...register('Description')}
                        required
                      >
                        {!apiDataMedical ? (
                          <option value=''>--select--</option>
                        ) : (
                          apiDataMedical.map((data, index) => (
                            <option
                              key={index}
                              value={data.description}
                            >{`${data.description}`}</option>
                          ))
                        )}
                      </select>
                      {/* <label htmlFor=''>Description</label>
              <select name='' id='' className='charges-approved' onClick={Description} {...register("Description")} required>
               {!apiDataMedical ? <option value=''>--select--</option>
             : apiDataMedical.map((data,index)=>{
               return  <><option key={index} value={data.description}>{`${data.description}`}</option><input type='text' className='charges-approved' /></>
               })}
              </select> */}
                    </div>
                    <div className='approved'>
                      <label htmlFor=''>No of days/Qty:</label>
                      <input
                        type='number'
                        className='charges-approved'
                        id='charges'
                        min={0}
                        {...register('qty', { valueAsNumber: true })}
                        onChange={chargesApproved}
                      />
                      <label htmlFor=''>Unit price:</label>
                      <NumberFormat
                        thousandSeparator={true}
                        prefix={'N'}
                        className='charges-approved'
                        value={options}
                        disabled
                      />
                    </div>
                    <div className='amount'>
                      <label htmlFor=''>Charges Sent:</label>
                      <NumberFormat
                        thousandSeparator={true}
                        prefix={'N'}
                        className='charges'
                        id='approved-charges'
                        {...register('chargesSent')}
                        value={amountCalc}
                        disabled
                      />
                    </div>
                    <div className='comment'>
                      <label htmlFor=''>Comment</label>
                      <input
                        type='text'
                        className='charges'
                        {...register('Comment')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button type='submit' className='btnn1'>
                Add Up
              </button>
            </div>
          </form>
          <div className='small-table'>
            <h2>
              Claims Treatment For:{' '}
              {option
                ? option.surname ||
                  option.name ||
                  option.fullName ||
                  option.name
                : ''}
            </h2>
            <h2>EnroleeNumber: {option.employeeNo}</h2>
            <h2>
              Total Amount Billed:{' '}
              <NumberFormat
                value={totalBilledAmount}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'NGN'}
              />
            </h2>
          </div>
          <div className='claimsTableWrapper'>
            <table className='submittedListStyledTable'>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Diagnosis</th>
                  <th>Consultancy Date</th>
                  <th>Details</th>
                  <th>Authorcode</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              {claimsList.map((data, index) => (
                <tbody className='size'>
                  <tr key={index}>
                    <td>{data.description}</td>
                    <td>{data.diagnosis}</td>
                    <td>{data.consultancyDate.substring(0, 10)}</td>
                    <td>{data.details}</td>
                    <td>{data.authorcode}</td>
                    <td>{data.unitPrice}</td>
                    <td>{data.qty}</td>
                    <td>{data.chargesSent}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <button type='submit' onClick={onSubmit} className='btnn1'>
            Submit
          </button>
        </section>
      </div>
    </>
  )
}

export default Claims
