import './cart_base.css';
import './cart_trade.css';
import './cart.css';

import Vue from 'vue';
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
    el:'#app',
    data:{
        cartList:null
    },
    created(){
        this.getListCart()
    },
    methods:{
        getListCart(){
            axios.post(url.listCart).then(res=>{
                let lists=res.data.cartList
                lists.forEach(shop => {
                    shop.checked=true
                    shop.goodsList.forEach(good=>{
                        good.checked=true
                    })
                });
                    this.cartList=lists
                }
                
            )
            
        },
        selectGood(good){
            good.checked=!good.checked
        }
    },
    mixins:[mixin],
    computed:{}
})