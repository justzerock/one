import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#123456',
    secondary: colors.orange.base,
    accent: colors.blue.base,
    error: '#FB5E5B',
    warning: colors.amber.base,
    info: colors.cyan.base,
    success: colors.green.base
  },
  iconfont: 'fa'
})
