import './goods_common.css';
import './goods_custom.css';
import './goods.css';
import './goods_theme.css';
import './goods_mars.css';
import './goods_sku.css';
import './goods_transition.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin.js';
import qs from 'qs';
import Swiper from 'components/Swiper.vue';

let {id}=qs.parse(location.search.substr(1))
new Vue({
    el:'#app',
    data:{
        id,
        detailsList:null,
        tabIndex:0,
        tabDetails:['商品详情','本店成交'],
        deal:null,
        bannerLists:null,
        skuType:1,
        showSku:false,
        skuNum:1,
        totalSku:10,
        isAddCart:false,
        showAddMessage:false,

    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id}).then(res=>{
                this.detailsList=res.data.data
                this.bannerLists=[]
                this.detailsList.imgs.forEach(item=>{
                    this.bannerLists.push({
                        clickUrl:'',
                        img:item,
                    })
                })
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
        },
        chooseSku(type){
            this.skuType=type
            this.showSku=true
        },
        changeSkuNum(num){
            if(num<0&&this.skuNum===1){
                this.skuNum=1
            }else{
                this.skuNum+=num
                if(this.skuNum>this.totalSku){
                    this.skuNum=this.totalSku
                }
            }
            
            
        },
        addCart(){
            axios.post(url.addCart,{
                id,
                number:this.skuNum
            }).then(res=>{
                if(res.data.status===200){
                    this.showSku=false
                    this.isAddCart=true
                    this.showAddMessage=true
                    setTimeout(() =>{   
                        this.showAddMessage=false
                     },1000)
                }
            })
        }
    },
    watch:{
        showSku(val,oldVal){
           
            if(val){
                document.body.style.overflow='hidden'
                document.querySelector('html').style.overflow='hidden'
                document.body.style.height='100%'
                document.querySelector('html').style.height='100%'

            }else{
                document.body.style.overflow='auto';
                document.querySelector('html').style.overflow='auto';
                document.body.style.height='auto';
                document.querySelector('html').style.height='auto';
            }
        }
    },
    components:{
        Swiper,
    },
    mixins:[mixin],
})