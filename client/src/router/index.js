/**
 * Define all paths for app routes.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import AccountRecovery from '@/components/pages/AccountRecovery'
import CreateQuiz from '@/components/pages/CreateQuiz/Index'
import EditProfile from '@/components/pages/EditProfile/Index'
import Inbox from '@/components/pages/Inbox'
import PageNotFound from '@/components/pages/PageNotFound'
import Profile from '@/components/pages/Profile/Index'
import Quiz from '@/components/pages/Quiz/Index'
import QuizSubmitted from '@/components/pages/QuizSubmitted'
import Quizzes from '@/components/pages/Quizzes'
import Stats from '@/components/pages/Stats'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    },
    {
      path: '*',
      name: 'page-not-found',
      component: PageNotFound
    },
    {
      path: '/about',
      name: 'about',
      component: About
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
      path: '/quizzes',
      name: 'quizzes',
      component: Quizzes
    },
    {
      path: '/quizzes/create',
      name: 'quizzes-create',
      component: CreateQuiz
    },
    {
      path: '/quizzes/:quizId',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: Inbox
    },
    {
      path: '/quiz-submitted',
      name: 'quiz-submitted',
      component: QuizSubmitted
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    }
  ]
})
