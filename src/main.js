import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from "./utils/currency"


Vue.config.productionTip = false

Vue.use(VueLazyLoad,function () {
  loading:'@/static/loading-svg/loading-bars.svg'
})
//加载更多
Vue.use(infiniteScroll)
Vue.filter('currency',currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
