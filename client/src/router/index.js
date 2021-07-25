import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Quiz from '@/components/Quiz'
import Profile from '@/components/Profile'
import AccountRecovery from '@/components/AccountRecovery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/account-recovery',
      name: 'account-recovery',
      component: AccountRecovery
    }
  ]
})
