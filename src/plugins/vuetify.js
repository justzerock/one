import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.base,
    secondary: colors.orange.base,
    accent: colors.blue.base,
    error: colors.red.base,
    warning: colors.amber.base,
    info: colors.cyan.base,
    success: colors.green.base
  },
  options: {
    customProperties: true
  },
  iconfont: 'fa',
  lang: {
    locales: { zhHans, en },
    current: 'zh-Hans'
  }
})
