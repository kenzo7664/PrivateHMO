export const setShowStatusList = (setShowStatus, showStatus) => {
  setShowStatus(!showStatus)
}
export const setShowMonthsList = (setShowMonth, showMonth) => {
  setShowMonth(!showMonth)
}
export const handleSelectedStatus = (
  e,
  setStatus,
  setShowStatus,
  settryFiltered
) => {
  settryFiltered(true)
  setStatus(e.target.textContent)
  setShowStatus(false)
}
export const handleSelectedMonth = (
  e,
  setMonth,
  setShowMonth,
  calendarMonths,
  settryFiltered
) => {
  settryFiltered(true)
  calendarMonths.map((singleMonth) => {
    if (singleMonth.name === e.target.textContent) {
      return setMonth(singleMonth)
    }
  })
  setShowMonth(false)
}
export const handleMonthChange = (
  e,
  filtered,
  calendarMonths,
  setFilteredMonths,
  setShowMonth,
  showMonth,
  setMonth,
  settryFiltered
) => {
  if (!showMonth) {
    setShowMonth(true)
  }

  filtered = calendarMonths.filter((listItem) =>
    listItem.name.includes(`${e.currentTarget.value.toLocaleUpperCase()}`)
  )
  setMonth(e.currentTarget.value.toLocaleUpperCase())

  setFilteredMonths(filtered)
}
export const handleYearChange = (e, setYear, settryFiltered) => {
  settryFiltered(true)
  setYear(e.target.value)
}

export const handleFilterClaimList = (
  year,
  month,
  status,
  claimsList,
  setFilteredClaimsList,
  setFilterCriteria,
  filterCriteria
) => {
  // console.log(claimsList)
  if (month !== null) {
    if (!filterCriteria.includes('month')) {
      setFilterCriteria([...filterCriteria, 'month'])
    }
  }
  if (year !== null) {
    if (!filterCriteria.includes('year')) {
      setFilterCriteria([...filterCriteria, 'year'])
    }
  }
  if (status !== null) {
    if (!filterCriteria.includes('status')) {
      setFilterCriteria([...filterCriteria, 'status'])
    }
  }
  let filtered
  if (claimsList.length > 0) {
    filtered = claimsList.filter((claim) => {
      if (status && month && year) {
        return (
          status === claim.claimsStatus &&
          month.id === claim.month &&
          Number(year) === claim.year
        )
      }
      if (status && year) {
        return status === claim.claimsStatus && Number(year) === claim.year
      }
      if (month && year) {
        return month.id === claim.month && Number(year) === claim.year
      }

      // for (let index = 0; index < filterCriteria.length; index++) {
      //   if (filterCriteria[index] === 'month') {
      //     return claim.month === month.id
      //   }
      //   if (filterCriteria[index] === 'year') {
      //     return claim.year === year
      //   }
      //   if (filterCriteria[index] === 'status') {
      //     return claim.claimsStatus === status
      //   }
      // }
    })
    console.log(filtered)
  }
  setFilteredClaimsList(filtered)
}
