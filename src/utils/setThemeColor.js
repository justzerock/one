import {formatDate} from './formatDate'

let setThemeColor = function () {
  let meta = document.getElementsByTagName('meta')
  let timeHex = formatDate(new Date(), 'time')
  meta["theme-color"].setAttribute('content', timeHex)
}

let colorTimer = setInterval(function () {
  setThemeColor()
}, 1000)
