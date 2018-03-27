import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      component:resolve => require(['components/recommend/recommend.vue'],resolve)
    },
    {
      path:'/rank',
      component:resolve => require(['components/rank/rank.vue'],resolve)
    },
    {
      path:'/singer',
      component:resolve => require(['components/singer/singer.vue'],resolve)
    },
    {
      path:'/search',
      component:resolve => require(['components/search/search.vue'],resolve)
    }
  ]
})