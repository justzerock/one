let setThemeColor = function (timeHex) {
  let meta = document.getElementsByTagName('meta')
  //let timeHex = formatDate(new Date(), 'time')
  meta["theme-color"].setAttribute('content', timeHex)
}

export { setThemeColor }
