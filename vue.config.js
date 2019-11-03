module.exports = {
  devServer: {
    port: 3000
  },

  pwa: {
    themeColor: '#41555D',
    backgroundColor: '#41555D',
    workboxOptions: {
      skipWaiting: true
    }
  },

  productionSourceMap: false,

  css: {
    extract: false
  }
}
