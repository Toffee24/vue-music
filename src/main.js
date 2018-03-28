// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'
import router from './router/index'
import store from './store/index'
import instance from './api/axiosAjaxRequest'
import VueLazyload from 'vue-lazyload'
import fastclick from "fastclick"

fastclick.attach(document.body)
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.prototype.ajaxRequest = instance
Vue.use(VueLazyload,{
  loading:require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render:h=>h(App)
})
