// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-default/index.css'
import './style.less'
import App from './App'
import router from './router'

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
