import fetch from 'js/fetch.js';
import url from 'js/api.js'
import { deflate } from 'zlib';

class Cart{
  static  add (id){
    return fetch(url.addCart,{
      id,
      number:1
    })
  }
  static reduce(id){
    return fetch(url.reduceCart,{
      id,
      number:1
    })
  }
}
export default Cart