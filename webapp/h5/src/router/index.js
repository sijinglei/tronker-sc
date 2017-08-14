import Vue from 'vue'
import Router from 'vue-router'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'

import Index from '../pages/index'

Vue.use(MintUi);
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        meta: {
            title: '首页' //路由标题
        },
        component: Index
    }]
})