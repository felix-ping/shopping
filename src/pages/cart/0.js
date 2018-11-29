import './cart_base.css';
import './cart_trade.css';
import './cart.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin.js';
import Velocity from 'velocity-animate';
import Cart from 'js/cartService'
import VueResource from 'vue-resource'
Vue.use(VueResource)

new Vue({
  el: '#app',
  data: {
    cartList: null,
    total: 0,
    counter: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopUp:false,
    removeData:null,
  


  },
  created() {
    this.getListCart()
  },
  methods: {
    getListCart() {
      this.$http.get('static/data.json').then(res => {
          let lists = res.data.cart.list.cartList
          lists.forEach(shop => {
            shop.checked = true
            shop.removeChecked = false
            shop.editing = false
            shop.editingMsg = '编辑'
            shop.goodsList.forEach(good => {
              good.checked = true
              good.removeChecked = false
            })
          });
          this.cartList = lists
        }

      )

    },
    selectGood(shop, good) {
      let attr=this.editingShop?'removeChecked':'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selectShop(shop) {
      let attr=this.editingShop?'removeChecked':'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectEvery() {
      let attr=this.editingShop?'allRemoveSelected':'selectAll';
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.cartList.forEach((item, edtIndex) => {
        if (shopIndex !== edtIndex) {
          item.editing = false
          item.editingMsg = '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    add(good){
      // axios.post(url.addCart,{
      //   id:good.id,
      //   number:1
      // }).then(res=>{
      //   good.number++
      // })
      Cart.add(good.id).then(res=>{
        good.number++
      })
    },
    reduce(good){
      if(good.number===1){return}
      // axios.post(url.reduceCart,{
      //   id:good.id,
      //   number:1
      // }).then(res=>{
      //   good.number--
      // })
      Cart.reduce(good.id).then(res=>{
        good.number--
      })
    },
    removeSingle(shop,shopIndex,good,goodIndex){
      this.removePopUp=true;
      this.removeData={shop,shopIndex,good,goodIndex}
    },
    removeConfirm(){
      let {shop,shopIndex,good,goodIndex}=this.removeData
      this.$http.get('static/data.json').then(res=>{
        shop.goodsList.splice(goodIndex,1)
        this.removePopUp=false
        if(!shop.goodsList.length){
          this.cartList.splice(shopIndex,1)
          this.removeShop()
        }
        
      })
    },
    removeCancle(){
      this.removePopUp=false
    },
    removeShop(){
      this.editingShop=null
      this.editingShopIndex=-1
      //还原店铺的初始状态
      this.cartList.forEach(shop=>{
        shop.editing=false
        shop.editingMsg='编辑'
      })
    },
    end(e,shopIndex,good,goodIndex){
      let endX=e.changedTouches[0].clientX
      let left='0px'
      if(good.startX-endX>100){
        left='-60px'
      }
      if(endX-good.startX>100){
        left='0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{
        left
      })
      //这里没有处理在完成页时,商品的删除动作,动画没有弹动的效果.
    },
    start(e,good){
      good.startX=e.changedTouches[0].clientX
    }
  },
  mixins: [mixin],
  computed: {
    selectAll: {
      get() {
        if (this.cartList && this.cartList.length) {
          return this.cartList.every(shop => {
            return shop.checked
          })
        }

      },
      set(newVal) {
        this.cartList.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    allRemoveSelected:{
      get(){
        if(this.editingShop){
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal){
        if(this.editingShop){
          this.editingShop.removeChecked=newVal
          this.editingShop.goodsList.forEach(good=>{
            good.removeChecked=newVal
          })
        }

      }
    },
    selectCounter() {
      if (this.cartList && this.cartList.length) {
        let arr = [];
        let total = 0;
        this.cartList.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              total += good.price * good.number
              arr.push(good)
            }
          })
        })
        this.total = total
        this.counter = arr.length
        return arr
      }
      return []
    },
    removeLists() {
      if(this.editingShop){
        let arr=[]
        this.editingShop.goodsList.forEach(good=>{
          if(good.removeChecked){
            arr.push(good)
          }
        })
        return arr 
      }
      return []
    }

  }
})
//为什么必须点击devtool才会显示商品的总价,computed属性到底什么时候会被调用?