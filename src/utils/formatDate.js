let padDate = function (value) {
  return value < 10 ? '0' + value : value
}

let formatDate = function (value, type) {
  let date = new Date(value)
  let years = date.getFullYear()
  let months = date.toDateString().split(' ')[1].substring(0, 3) + '.'
  let days = padDate(date.getDate())
  let hours = padDate(date.getHours())
  let minutes = padDate(date.getMinutes())
  let seconds = padDate(date.getSeconds())
  switch (type) {
    case 'time':
      return '#' + hours + minutes + seconds
    case 'year':
      return years
    case 'month':
      return months
    case 'day':
      return days
  }
}

export { formatDate }
