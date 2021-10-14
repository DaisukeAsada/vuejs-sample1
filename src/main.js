// 起動時最初に実行されるスクリプト
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// ブラウザの開発者ツールでヒントを非表示にする。
Vue.config.productionTip = false

// App.vueのVueインスタンスを生成し、#appのhtml要素にマウントする
new Vue({
  // VueRouter
  router,
  // Vuex
  store,
  // Vuetify
  vuetify,
  // App.vueをhtmlに描画する
  render: h => h(App)
}).$mount('#app')
