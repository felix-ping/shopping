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
        cartList:null,
        total:0,
        counter:0,
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
        selectGood(shop,good){
            good.checked=!good.checked
            shop.checked=shop.goodsList.every(good=>{
                return good.checked
            })
        },
        selectShop(shop){
            shop.checked=!shop.checked
            shop.goodsList.forEach(good=>{
                good.checked=shop.checked
            })
        },
        selectEvery(){
            this.selectAll=!this.selectAll
        }
    },
    mixins:[mixin],
    computed:{
        selectAll: {
            get(){
                if(this.cartList&&this.cartList.length){
                    return this.cartList.every(shop=>{
                        return shop.checked
                    })
                }
              
            },
            set(newVal){
                this.cartList.forEach(shop=>{
                    shop.checked=newVal
                    shop.goodsList.forEach(good=>{
                        good.checked=newVal
                    })
                })
            }
        },
        selectCounter(){
            if(this.cartList&&this.cartList.length){
                let arr=[];
                let total=0;
                this.cartList.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            total+=good.price*good.number
                            arr.push(good) 
                        }                        
                    })
                })
                this.total=total
                this.counter=arr.length
                return arr
            }
            return []
        }

    }
})
//为什么必须点击devtool才会显示商品的总价,computed属性到底什么时候会被调用?