import moment from 'moment-timezone'
moment.tz(Date.now(), 'America/Los_Angeles')

export {
  isNumber,
  checkLastModified,
  validateEmail
}

const isNumber = (type) => {
  const input = document.getElementById(type)
  const regex = /[^0-9|\n\r]/g
  input.value = input.value.split(regex).join('')
}

const checkLastModified = (data) => {
  
  let dates = data.sort((a, b) => a.added_at > b.added_at ? 1 : -1)

  return moment(dates[dates.length - 1].added_at).format('MM/DD/YYYY HH:mm:ss')
  
}

const validateEmail = (type) => {
  const input = document.getElementById(type)
  const regex = /^@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
  
  if(regex.test(input.value)){
    return true
  }else{
    return false
  }
  // return !regex.test(input.value) ? 'true' : 'false'
}