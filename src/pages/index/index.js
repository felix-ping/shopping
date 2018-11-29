import 'css/common.css';
import './index.css';
import Vue from 'vue';
import url from 'js/api.js';
import axios from 'axios';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

// import Foot from 'components/Foot.vue';
import Swiper from 'components/Swiper.vue';
import mixin from 'js/mixin.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)

let app=new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false,
        bannerLists:null,
    },
    created(){
        this.getLists()
        this.getBanner()
    },  
    methods:{
        getLists(){
            if(this.allLoaded)return
            //是否在加载中
            this.loading=true
            this.$http.get('static/data.json').then((res) => {
                let curLists=res.data.index.hotLists.lists
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
                this.loading=false
                this.pageNum++
            }).catch((err) => {});
        },
        getBanner(){
            this.$http.get('static/data.json').then(res=>{
                this.bannerLists=res.data.index.banner.lists 
            })
        }
    },
    components:{
        // Foot,
        Swiper,
    },
    mixins:[mixin]
    
})