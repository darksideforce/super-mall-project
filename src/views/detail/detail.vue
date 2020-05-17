<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav'></detail-nav-bar>
    <scroll class = 'content' ref = 'scrolls'>
      <detail-swiper :topImages ='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo = 'detailInfo' @detailgoodsload = 'detailgoodsLoad'></detail-goods-info>
      <detail-param-info :detailparams = 'detailparams'></detail-param-info>
      <detail-comment-info :commentInfo ='commentInfo'></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComs/detailnavbar'
import {getDetail,goods,shop,goodsparam} from 'network/detail'
import DetailSwiper from './childComs/detailSwiper' 
import DetailBaseInfo from './childComs/DetailBaseinfo'
import DetailShopInfo from './childComs/DetailShopInfo'
import DetailGoodsInfo from './childComs/DetailGoodsInfo'
import DetailParamInfo from './childComs/DetailParamInfo'
import DetailCommentInfo from './childComs/DetailCommentInfo'


import scroll from 'components/common/scroll/scroll'


export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    scroll
  },
  data(){
    return{
      detailId:0,
      topImages:[],
      res:{},
      goods:{},
      shop:{},
      detailInfo:{},
      detailparams:{},
      commentInfo:{}
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
      //获取商品的详情
      this.detailparams = new goodsparam(data.itemParams.info,data.itemParams.rule)
      //获取商品的参数信息
      if (data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      //拿到商品的评论信息
    
    })
    //拿到动态路由带来的数据
  },
  mounted(){
const refresh = this.debounce(this.$refs.scrolls.refresh,500)


  },
  methods:{
    debounce(func,delay){
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this, args)
        },delay)
      }
    },
    detailgoodsLoad(){
      this.debounce(this.$refs.scrolls.refresh,500)
    }
  },

}
</script>

<style scoped>
#detail{
  position: relative;
  z-index:90;
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