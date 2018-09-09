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
        editingShop:null,
        editingShopIndex:-1,


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
                    shop.removeChecked=false
                    shop.editing=false
                    shop.editingMsg='编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked=true
                        good.removeChecked=false
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
        },
        edit(shop,shopIndex){
            shop.editing=!shop.editing
            shop.editingMsg=shop.editing?'完成':'编辑'
            this.cartList.forEach((item,edtIndex)=>{
                if(shopIndex!==edtIndex){
                    item.editing=false
                    item.editingMsg='编辑'
                }
            })
            this.editingShop=shop.editing?shop:null
            this.editingShopIndex=shop.editing?shopIndex:-1
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
        },
        removeLists(){

        }

    }
})
//为什么必须点击devtool才会显示商品的总价,computed属性到底什么时候会被调用?