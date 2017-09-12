import Vue from 'vue'
import Router from 'vue-router'
// @ 是webpack.base.conf.js中resolve->alias进行配置的，src的别名
import Login from '@/components/Login'
import Element from '@/components/Element' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/element',
      name: 'Element',
      component: Element
    }
  ]
})
