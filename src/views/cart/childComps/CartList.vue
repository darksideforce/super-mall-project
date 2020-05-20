<template>
  <div class ='cartlist'>
    <scroll  class ='content' ref = 'scroll'>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info = "item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll'
  import CartListItem from './CartListItem'

  import { mapGetters} from 'vuex'

	export default {
		name: "CartList",
    components: {
        Scroll,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.scroll.refresh()
    } 
	}
</script>

<style scoped>
.cartlist {
  height: calc(100% - 44px - 49px)
}
.content {
  height: 100% ;
  overflow : hidden;
}
</style>
