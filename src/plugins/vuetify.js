import Vue from 'vue'
import Vuetify, {
  VToolbar,
  VNavigationDrawer,
  VCard,
  VBtn,
  VBottomNav,
  VDialog,
  VList,
  VLayout,
  VFlex,
  VIcon,
  VSnackbar,
  VApp,
  VContent,
  VContainer
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VToolbar,
    VNavigationDrawer,
    VCard,
    VBtn,
    VBottomNav,
    VDialog,
    VList,
    VLayout,
    VFlex,
    VIcon,
    VSnackbar,
    VApp,
    VContent,
    VContainer
  },
  theme: {
    primary: '#41555D',
    secondary: colors.orange.base,
    accent: colors.blue.base,
    error: '#FB5E5B',
    warning: colors.amber.base,
    info: colors.cyan.base,
    success: colors.green.base
  },
  iconfont: 'if',
  directives: {
    Ripple
  }
})
