import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import VueSocketio from 'vue-socket.io';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueSocketio, process.env.SOCKET_URL);
Vue.use(ElementUI, { locale });
Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  sockets: {
    connect: function() {
      console.log('socket connected')
    }
  }
})
