import 'css/common.css'
import './category.css'
import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import Foot from 'components/Foot.vue'

new Vue({
    el:'#app',
    components:{
        Foot 
    },
    data:{
        topLists:null,
        topIndex:0,
        listData:null,
        rankData:null,

    },
    created(){
        this.getTopLists()
        this.getSubList(0)
    },
    methods:{
        getTopLists(){
            axios.post(url.topList).then(res=>{
                this.topLists=res.data.lists
            }).catch(err=>{console.log(err)})
        },
        getSubList(index,id){
            this.topIndex=index
            if(index===0){
                this.getRank()
            }else{
               axios.post(url.subList,{id}).then(res=>{
                    this.listData=res.data.data   
                }).catch(err=>{222,console.log(err)})
            }            
        },
        getRank(){
            axios.post(url.rank).then(res=>{
                this.rankData=res.data.data
            }).catch(err=>{console.log(err)})
        }
    },
    filters:{
        adjust(price){
            let oldVal=new Number(price)
            if(oldVal||oldVal===0){
                let newVal=(price).toFixed(2)
                return newVal
            }
        }
    }
})