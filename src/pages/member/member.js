import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [{
  path: '/',
  //这里遇到template or render function not defined问题,下面是两种解决方法.
  //https://zhuanlan.zhihu.com/p/25486761  附带一篇相关文章
  component: () => import('./components/member.vue'),
  // component: require('./components/member.vue').default
},{
  path: '/address',
  component: require('./components/address.vue').default,
  children:[{
    path:'',
    redirect:'all'
  },{
    path:'all',
    component:()=>import('./components/all.vue')
  },{
    path:'form',
    component:()=>import('./components/form.vue')
  }]
}]

let router = new Router({
  routes
})


new Vue({
  el:'#app',
  router,
})