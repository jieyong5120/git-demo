import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugiins/vant.js'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$http = axios

// 在全局里面挂载一个过滤器，在list里面使用了
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)
  const yyyy = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${yyyy}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
