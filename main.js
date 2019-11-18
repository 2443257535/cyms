import Vue from 'vue'
import App from './App'
import store from './store'
import until from '@/untils/until.js';


Vue.config.productionTip = false;
Vue.prototype.debounce = until.debounce;
Vue.prototype.hehe = until.hehe;
Vue.prototype.$store = store;


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
