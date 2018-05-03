// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import Hello from './components/Hello'
import router from './router'
//import VueBus from 'vue-bus'

Vue.use(Element)
//Vue.use(VueBus)

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<Hello/>',
  components: { Hello }
})

