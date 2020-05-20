<template>
    <div id ='cart'>
      <!--顶部栏-->
      <nav-bar class = 'nav-bar'><div slot='center'>购物车({{cartCount}})</div></nav-bar>
      <!--商品汇总-->
      <cart-list></cart-list>
      <!--底部汇总-->
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>



<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters} from 'vuex'

export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //...mapGetters(['cartLength','cartList'])
      //mapgetter映射 
      cartList() {
        return this.$store.getters.cartList
      },
      cartCount() {
        return this.$store.getters.cartLength
      }

    },
    
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }


</style>