import Vue from 'vue'
import App from './App'
import router from './router'
import _com from './common/common'
import fastclick from 'fastclick' //取消三秒延迟

import axios from 'axios'
global.axios = axios
Vue.use(global)
Vue.config.productionTip = false





//路由请求前处理
router.beforeEach((to, from, next) => {
    var islogin = (localStorage.getItem('is_login') | 0); //获取登录信息
    if (to.meta) document.title = to.meta.title || '创选商城'; //设置每个路由的标题
    if (to.meta.auth && !islogin) next('/login'); //未登录
    else next();
});
fastclick.attach(document.body)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})