import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Quiz from '@/components/Quiz'
import Profile from '@/components/Profile'
import AccountRecovery from '@/components/AccountRecovery'
import Modal from '@/components/Modal'
import Quizzes from '@/components/Quizzes'
import CreateQuiz from '@/components/CreateQuiz'
import EditProfile from '@/components/EditProfile'

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
      path: '/users/:userId',
      name: 'user',
      component: Profile
    },
    {
      path: '/users/:userId/edit',
      name: 'user-edit',
      component: EditProfile
    },
    {
      path: '/account-recovery',
      name: 'account-recovery',
      component: AccountRecovery
    },
    {
      path: '/modal',
      name: 'modal',
      component: Modal
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: Quizzes
    },
    {
      path: '/quizzes/create',
      name: 'quizzes-create',
      component: CreateQuiz
    }
  ]
})
