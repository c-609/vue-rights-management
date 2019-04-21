import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Login from '@/components/Login'
import Role from '@/components/pages/home/home-main/Role'
import User from '@/components/pages/home/home-main/User'
import Menu from '@/components/pages/home/home-main/Menu'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[{
        path:'/upms/user',
        name:'User',
        component:User,
        },
        {
          path: '/upms/role',
          name: 'Role',
          component: Role
        },
        {
          path: '/upms/menu',
          name: 'Menu',
          component: Menu
        }
      ]
    }
  ]
})
