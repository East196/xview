// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import App from './App'
import router from './router'
import resource from './resource'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
// import '@/mock'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(Vuetable)
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
// Vue.http.options.credientials = true;
// Vue.http.options.crossOrigin = true;
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  resource,
  i18n,
  store,
  render: h => h(App)
})
