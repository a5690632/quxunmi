import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import "../src/assets/css/reset.css"
import "font-awesome/css/font-awesome.min.css"
import zh from "./common/lang/zh.js"
import en from "./common/lang/en.js"
Vue.use(MintUI)

import VueI18n from 'vue-i18n'
import axios from 'axios';
Vue.prototype.$http = axios
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  messages: {
    'zh-CN': zh,   // 中文语言包
    'en-US': en    // 英文语言包
  }
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
