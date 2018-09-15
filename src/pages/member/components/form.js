import Address from 'js/addressService.js';
import { parse } from 'querystring';

export default{
  data(){
    return {
      name:'',
      tel:'',
      provinceValue:'-1',
      cityValue:'-1',
      districtValue:'-1',
      address:'',
      id:'',
      type:'',
      instance:'',
      addressData:require('js/address.json'),
      cityList:null,
      districtList:null,

    }
  },
  //路由切换时,是加载相应的组件,加载中会调用生命周期created,列表是在生命周期中获取,所以会再次调取列表.go(-1)会再次加载,会将新增的添加进来.
  created(){
    let query=this.$route.query;
    this.type=query.type;
    this.instance=query.instance;
    if(this.type==='edit'){
      let addr=this.instance;
      this.provinceValue=parseInt(addr.provinceValue);
      this.name=addr.name;
      this.id=addr.id;
      this.tel=addr.tel;
      this.address=addr.address;
    }
  },
  computed:{
    lists(){
      return this.$store.state.lists
    }
  },
  methods:{
    //这里需要进行非空和合法性校验
    save(){
      let {name,tel,provinceValue,cityValue,districtValue,address}=this
      let data={name,tel,provinceValue,cityValue,districtValue,address}
      if(this.type==='add'){
        // Address.add(data).then(res=>{
        //   this.$router.go(-1)})
        this.$store.dispatch('addAction',data)
        
      }
      if(this.type==='edit'){
        //这里容易遗漏
        data.id=this.id 
        console.log(data.id)
        // Address.update(data).then(res=>{
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('updateAction',data)
      }
    },
    //这里应该trick.
    remove(){
      if(window.confirm('是否删除?')){
        // Address.remove(this.id).then(res=>{
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('removeAction',this.id)
      }
    },
    setDefault(){
      // Address.setdefault(this.id).then(res=>{
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('setDefaultAction',this.id)
    },
  },
  watch:{
    lists:{
      handler(){
        this.$router.go(-1)
      },
      deep:true,
      
    },
    provinceValue(val){
      if(val==='-1'){
        console.log(-1,val)
        return
      }
      console.log(typeof val)
      console.log(val,11111)
      let list=this.addressData.list
      let index=list.findIndex(item=>{
        return item.value===val
      })
      this.cityList=list[index].children
      this.cityValue=-1
      this.districtValue=-1;

      if(this.type==='edit'){
        this.cityValue=parseInt(this.instance.cityValue);
        
        this.districtValue=-1
      }
    },
    cityValue(val){
      if(val==='-1'){return}
      let list=this.cityList;
      let index=list.findIndex(item=>{
        return item.value===val
      })
      this.districtList=list[index].children
      this.districtValue=-1
      if(this.type==='edit'){
        this.districtValue=parseInt(this.instance.districtValue)
      }
    },
  }
  
}