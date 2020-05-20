export default{
  addCounter(state,payload){
    payload.count ++
  },
  addTocart(state,payload){
    payload.checked = false
    state.cartList.push(payload)
  },
}