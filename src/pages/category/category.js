import 'css/common.css'
import './category.css'
import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
// import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

new Vue({
    el:'#app',
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
        },
        toSearch(list){
            location.href=`search.html?keyword=${list.name}&${list.id}`
        }
    },
    mixins:[mixin]
    // components:{
    //     Foot 
    // },
    // filters:{
    //     adjust(price){
    //         let oldVal=new Number(price)
    //         if(oldVal||oldVal===0){
    //             let newVal=(price).toFixed(2)
    //             return newVal
    //         }
    //     }
    // }
})