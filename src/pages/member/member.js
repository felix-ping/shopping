import Vue from 'vue';
import './member.css';
import router from './router/index.js';
import './components/member.css'
import './components/member_base.css'
import store from './vuex/index.js';

new Vue({
  el:'#app',
  router,
  store,
})