import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

let routes = [{
  path: '/',
  //这里遇到template or render function not defined问题,下面是两种解决方法.
  //https://zhuanlan.zhihu.com/p/25486761  附带一篇相关文章
  component: () => import('../components/member.vue'),
  // component: require('../components/member.vue').default
},{
  path: '/address',
  component:() => import('../components/address.vue') ,
  children:[{
    path:'',
    redirect:'all'
  },{
    path:'all',
    name:'all',
    component:()=>import('../components/all.vue')
  },{
    path:'form',
    name:'form',
    component:()=>import('../components/form.vue')
  }]
}]

let router = new Router({
  routes
})


export default router;