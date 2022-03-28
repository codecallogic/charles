export {
  isNumber
}

const isNumber = (type) => {
  const input = document.getElementById(type)
  const regex = /[^0-9|\n\r]/g
  input.value = input.value.split(regex).join('')
}