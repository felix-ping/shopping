import './goods_common.css';
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin.js'
import qs from 'qs';

let {id}=qs.parse(location.search.substr(1))
new Vue({
    el:'#app',
    data:{
        detailsList:null,
        tabIndex:0,
        tabDetails:['商品详情','本店成交'],
        deal:null,
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id}).then(res=>{
                this.detailsList=res.data.data
            })
        },
        changeTab(index){
            this.tabIndex=index
            if(index){
                this.getDeal()
            }
        },
        getDeal(){
            axios.post(url.deal).then(res=>{
                this.deal=res.data.data.lists
            })
        }
    },
    mixins:[mixin],
})