import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line no-unused-vars
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'

Vue.prototype.$axios = axios
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'development') {
// mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

const errorHandler = (error) => {
  console.error('抛出全局异常')
  console.error(error)
  this.$message.error({
    message: error.response.data.message,
    showClose: true,
    duration: 5 * 1000
  })
}
Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)
new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
