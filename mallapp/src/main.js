import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App";
import router from "./router";
import axios from "axios";
Vue.prototype.$axios = axios;
Vue.use(MintUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    render: h => h(App)
});