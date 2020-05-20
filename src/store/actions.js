export default{
  addCart(context,payload){
    //let oldProduct = null;
    //for(let item of context.state.cartList){
      //if(item.iid === payload.iid){
        //oldProduct = item 
        //如果传入的数据在cartlist内已有储存，则oldProduct加一
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        console.log(oldProduct)
        //}
    //}
    if(oldProduct){
      context.commit('addCounter',oldProduct)
      //调用mutations内的方法进行操作
    }else {
      payload.count = 1
      context.commit('addTocart',payload)
    //另一个判断，如果oldproduct已经有值，则让oldproduct加一，如果没有值，则payload加一
    }
  },
}