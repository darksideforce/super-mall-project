import {request} from './request';

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

//新建一个网络请求。形参是2个变量
export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    params:{
      type,page
    }
  })
}