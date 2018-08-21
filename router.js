import Vue from 'vue'
import Router from 'vue-router'

import Index from './components/Index'
import CategoryIndex from './components/category/index'
import CategoryAdd from './components/category/add'
import CategoryEdit from './components/category/edit'

import LngIndex from './components/language/index'
import LngAdd from './components/language/add'
import LngEdit from './components/language/edit'

import Login from './components/Auth/login'
import Register from './components/Auth/register'

import Dashboard from './components/Auth/dashboard'
import About from './components/About'

Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/category',
      name: 'category-index',
      component: CategoryIndex
    },
    {
      path: '/category/add',
      name: 'category-add',
      component: CategoryAdd
    },
     {
      path: '/category/edit/:cat_id',
      name: 'category-edit',
      component: CategoryEdit
    },
      {
      path: '/language',
      name: 'language-index',
      component: LngIndex
    },
    {
      path: '/language/add',
      name: 'language-add',
      component: LngAdd
    },
     {
      path: '/language/edit/:lng_id',
      name: 'language-edit',
      component: LngEdit
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
     {
      path: '/register',
      name: 'register',
      component: Register,
      meta :{
        auth:false
      }
    },
     {
      path: '/login',
      name: 'login',
      component: Login,
      meta :{
        auth:false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta :{
        auth:true
      }
    }
  ]
})



