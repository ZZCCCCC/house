import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 引入全局样式文件
import normal from '/src/css/normalize.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
