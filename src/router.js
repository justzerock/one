import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Favorite from './views/Favorite.vue'
import About from './views/About.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '亦言'
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
      meta: {
        title: '收藏·亦言'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: '关于·亦言'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
