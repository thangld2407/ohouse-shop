import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPages from '../views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    meta: {
      title: 'Login',
      icon: ''
    },
    name: 'Login',
    component: LoginPages
  },
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/about',
    name: 'about',
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior: () => ({y: 0}),
})

export default router
