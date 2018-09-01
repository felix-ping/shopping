import 'css/common.css'
import './search.css'
import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import qs from 'qs';
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate';

let {keyword , id}=qs.parse(location.search.substr(1))
new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword,
        isShow:false,
    },
    created(){
        this.getSearchLists() 
    },
    methods:{
        getSearchLists(){
            axios.post(url.searchList,{keyword,id}).then(res=>{
                this.searchList=res.data.lists
            })
        },
        moveEvent(){
            if(document.documentElement.scrollTop>100){
                this.isShow=true
            }else{
                this.isShow=false
            }
        },
        goToTop(){
            //Velocity 库的使用
            window.scrollTo(0,0)
        }
    },
    mixins:[mixin]
    
})