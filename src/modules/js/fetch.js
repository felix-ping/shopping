import axios from 'axios';


function fetch(url,data) {
    return new Promise((resolve,rejects)=>{
      axios.post(url,data).then(res=>{
        let status=res.data.status
        if(status===200){
          resolve(res)
        }else if(status===300){
          location.href='login.html'
          resolve(res)
        }
        // rejects(res)
      }).catch(e=>{
        rejects(e)
      })
    })
}
export default fetch ;