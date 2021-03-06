import Vue from 'vue';
import App from './App.vue';
import './plugins/element.js';
import router from './router';
// 导入全局样式
import './styles/global.css'
// 导入axios
import axios from 'axios';
Vue.prototype.$http = axios;
// 配置基础地址
axios.defaults.baseURL = 'http://124.222.93.17:8080'

Vue.config.productionTip = false



new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
    // Vue.prototype.$message = message;