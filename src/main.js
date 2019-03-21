import Vue from 'vue'
import App from './App'
import $ from 'jquery';

Vue.config.productionTip = false

import router from './router'
import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
require('mint-ui/lib/style.css')
Vue.use(MintUI);
require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
// 生产环境
//    Vue.prototype.$prefix = "http://omc.urskongjian.com:81"//图片前缀
//    Vue.prototype.$api = "http://omc.urskongjian.com" //api地址

// 新的生产环境
//Vue.prototype.$prefix = "http://47.92.6.78:81"//图片前缀
//Vue.prototype.$api = "http://47.92.6.78" //api地址

//测试ip
Vue.prototype.$prefix = "http://116.62.68.26:80" //图片前缀
Vue.prototype.$api = "http://116.62.68.26:8080" //api地址116的地址


/* eslint-disable no-new */
//钩子 登录拦截
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
