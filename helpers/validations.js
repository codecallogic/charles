import moment from 'moment-timezone'
moment.tz(Date.now(), 'America/Los_Angeles')

export {
  isNumber,
  checkLastModified
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