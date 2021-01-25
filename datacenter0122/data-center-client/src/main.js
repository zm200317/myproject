import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.scss'
import Plugin from 'v-fit-columns'
import './fiters'// 加载日期过滤器
// Vue.config.productionTip = false
import axios from 'axios'
import './assets/icon/iconfont.css'
// axios.defaults.withCredentials = true */
Vue.use(Plugin)
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.use(ElementUI)
// axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: c => c(App)
})
