import Vue from 'vue'
let dateFilter = new Vue()
let DDMMYYYY = new Vue()

let monthStr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
Vue.filter('date', function (value) {
  if (value === 'N/A') {
    return value
  }

  let date = new Date(value)

  if (isNaN(date)) {
    return ' '
  }

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  day = day.toString().length < 2 ? '0' + day : day
  hours = hours.toString().length < 2 ? '0' + hours : hours
  minutes = minutes.toString().length < 2 ? '0' + minutes : minutes
  return day + monthStr[month] + year + ' ' + hours + ':' + minutes
})

Vue.filter('DDMMYYYY', function (value) {
  if (value === 'N/A') {
    return value
  }

  let date = new Date(value)

  if (isNaN(date)) {
    return ' '
  }

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  day = day.toString().length < 2 ? '0' + day : day
  return day + monthStr[month] + year
})
export default {
  dateFilter: dateFilter,
  DDMMYYYY: DDMMYYYY
}
