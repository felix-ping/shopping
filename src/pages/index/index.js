import 'css/common.css';
import './index.css';
import Vue from 'vue';
import url from 'js/api.js';
import axios from 'axios';

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from 'components/Foot.vue';



let app=new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false,
    },
    created(){
        this.getLists()
    },  
    methods:{
        getLists(){
            if(this.allLoaded)return
            //是否在加载中
            this.loading=true
            axios.post(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }).then((res) => {
                let curLists=res.data.lists
                if(curLists.length<this.pageSize){
                    //判断所有数据是否加载完毕
                    this.allLoaded=true
                }
                if(this.lists){
                    this.lists=this.lists.concat(curLists)
                }else{
                    //第一次请求数据
                    this.lists = curLists    
                }
                
                console.log(res, this.lists)
                this.loading=false
                this.pageNum++
            }).catch((err) => {});
        }
    },
    components:{
        Foot
    }
    
})