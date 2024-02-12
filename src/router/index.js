import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/user/Profile.vue'
import ChangePassword from'../views/user/ChangePassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requireAuth:false
   }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requireAuth:false
   }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{
           requireAuth:true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta:{
           requireAuth:true
      }
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword,
      meta:{
           requireAuth:true
      }
    },
  ]
})

router.beforeEach((to,from) =>{
  if(to.meta.requireAuth && !localStorage.getItem('token')){
    return { name: 'login'}
  }
  if(to.meta.requireAuth == false && localStorage.getItem('token')){
    return {name: 'dashboard'}
  }

})

export default router
