// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import bootstrap from './bootstrap'

import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VDistpicker from 'v-distpicker'
import VueQuillEditor from 'vue-quill-editor'
import vRegion from 'v-region';
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueCookies from 'vue-cookies'


Vue.use(VueCookies)
Vue.use(vRegion);
Vue.use(VueQuillEditor)
Vue.component('v-distpicker', VDistpicker)
Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(router);
// 首先对拦截器的请求进行设置，并在方法中return config，此处为固定格式
axios.interceptors.request.use(config => {
  // 表示在配置中的设置头消息的字段Authorization为从本地获取的token值
  config.headers.token = window.sessionStorage.getItem('token')
  // config.headers.token = "123123"
  return config
})
axios.defaults.baseURL="http://localhost:8081/"
// Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
