import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import router from './router';
import qs from 'qs'
Vue.prototype.qs = qs //全局加载,必须应用
    // 导入axios
import axios from 'axios';
Vue.prototype.$http = axios;
// 配置基础地址
axios.defaults.baseURL = 'http://124.222.93.17:8080/admin/'

Vue.config.productionTip = false

// Vue.prototype.axios = axios.create({
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     transformRequest: [function(data) {
//         return qs.stringify({
//             ...data
//         })
//     }]
// });


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')