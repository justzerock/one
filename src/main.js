import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/setThemeColor'
import './registerServiceWorker'
import 'normalize.css'
import 'material-design-icons-iconfont'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './plugins/clipboard'
import './plugins/axios'
import './plugins/localStorage'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
