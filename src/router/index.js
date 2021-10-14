// VueRouterの設定スクリプト
import Vue from 'vue'
import VueRouter from 'vue-router'

// コンポーネントをインポート
import Current from '../views/Current.vue'
import Details from '../views/Details.vue'
import Minutely from '../views/details/Minutely.vue'
import Hourly from '../views/details/Hourly.vue'
import Daily from '../views/details/Daily.vue'

Vue.use(VueRouter)

// URLのパスと表示するコンポーネントを紐づける
const routes = [
  {
    // 現在の情報
    path: '/',
    name: 'Current',
    component: Current
  },
  {
    // 詳細情報
    path: '/details',
    name: 'Details',
    component: Details,
    children: [
          {
            // １分ごと
            path: 'minutely',
            name: 'Minutely',
            component: Minutely
          },
          {
            // １時間ごと
            path: 'hourly',
            name: 'Hourly',
            component: Hourly
          },
          {
            // １日ごと
            path: 'daily',
            name: 'Daily',
            component: Daily
          },
        ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
