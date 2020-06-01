import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Index from '../components/index/Index.vue'
import NewsList from '../components/newslist/NewsList.vue'
import NewsDetail from '../components/newslist/NewsDetail.vue'
import PhotoList from '../components/photolist/PhotoList.vue'
import PhotoDetail from '../components/photolist/PhotoDetail.vue'
import GoodsList from '../components/goodslist/GoodsList.vue'
import GoodsDetail from '../components/goodslist/GoodsDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Index
      }, {
        path: '/newslist',
        component: NewsList
      }, {
        path: '/news/detail/:id',
        component: NewsDetail
      }, {
        path: '/photo/list',
        component: PhotoList
      }, {
        path: '/photo/Info/:id',
        component: PhotoDetail
      },
      {
        path: '/goods/list',
        component: GoodsList
      },
      {
        path: '/detail/:id',
        component: GoodsDetail
      }]
  }
]

const router = new VueRouter({
  routes
})

export default router
