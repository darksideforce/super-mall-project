<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav'></detail-nav-bar>
    <scroll class = 'content'>
      <detail-swiper :topImages ='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComs/detailnavbar'
import {getDetail,goods,shop} from 'network/detail'
import DetailSwiper from './childComs/detailSwiper' 
import DetailBaseInfo from './childComs/DetailBaseinfo'
import DetailShopInfo from './childComs/DetailShopInfo'

import scroll from 'components/common/scroll/scroll'


export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    scroll
  },
  data(){
    return{
      detailId:0,
      topImages:[],
      res:null,
      goods:{},
      shop:{},
      detailInfo:{}
    }
  },
  created() {
    this.detailId = this.$route.params.iid
    //获取iid
    getDetail(this.detailId).then(res => {
      //通过iid来调用axios
      const data = res.result;
      console.log(res.result)
      this.topImages = data.itemInfo.topImages
      //1.获取到轮播图的数据
      this.goods = new goods(data.itemInfo,data.columns,data.shopInfo.services)
      //2.获取到商品信息
      this.shop = new shop(data.shopInfo)
      //3.获取到店铺信息
      this.detailInfo = data.detailInfo
    })
  }
  //拿到动态路由带来的数据
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index:9;
  background-color: #fff;
  height:100vh;
}
.content{
  height: calc(100% - 44px)
}
.detail-nav{
  position: relative;
  z-index: 9;
  background:#fff
}
</style scoped>