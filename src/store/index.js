import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList:[]
    //购物车的商品数据详情
  },
  mutations,
  actions,
  getters
  //内部的代码已按照vuex的结构分割
})


export default store
