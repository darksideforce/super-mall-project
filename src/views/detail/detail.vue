<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComs/detailnavbar'
export default {
  name:'Detail',
  components:{
    DetailNavBar
  },
  data(){
    return{
      detailId:0
    }
  },
  created(){
    this.detailId = this.$route.params.iid
  }
  //拿到动态路由带来的数据
}
</script>

<style>

</style>