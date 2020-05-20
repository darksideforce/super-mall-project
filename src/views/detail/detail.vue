<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav' @titleclick = 'titleclick' ref = 'nav'></detail-nav-bar>
    <scroll class = 'content' ref = 'scrolls' 
        :probe-type ='3'
        @scrollP = 'scrolling'
        > 
      <detail-swiper :topImages ='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo = 'detailInfo' @detailgoodsload = 'detailgoodsLoad'></detail-goods-info>
      <detail-param-info :detailparams = 'detailparams' ref='params'></detail-param-info>
      <detail-comment-info :commentInfo ='commentInfo' ref='comment'></detail-comment-info>
      <goods-list :goods='recommends' class = 'recommends' ref='recommends'></goods-list>
    </scroll>
    <back-top @click.native = 'backclick' v-show = 'backtopshow'></back-top>
    <detail-bottom-bar @addToCart = 'addToCart'></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComs/detailnavbar'
import {getDetail,goods,shop,goodsparam,getRecommend} from 'network/detail'
import DetailSwiper from './childComs/detailSwiper' 
import DetailBaseInfo from './childComs/DetailBaseinfo'
import DetailShopInfo from './childComs/DetailShopInfo'
import DetailGoodsInfo from './childComs/DetailGoodsInfo'
import DetailParamInfo from './childComs/DetailParamInfo'
import DetailCommentInfo from './childComs/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComs/DetailBottomBar'
import  BackTop from 'components/content/backTop/BackTop'

import scroll from 'components/common/scroll/scroll'

import {debounce} from '@/common/utils'
import {itemListenerMixin,backTopMixin} from'@/common/mixin'

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
    GoodsList,
    scroll,
    DetailBottomBar,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      detailId:0,
      topImages:[],
      res:{},
      goods:{},
      shop:{},
      detailInfo:{},
      detailparams:{},
      commentInfo:{},
      recommends:[],
      itemImgListener:null,
      //注意变量名后的大括号或者小括号，容易引起props的变量类型错误
      themeTopYs:[],
      //用于储存跳转位置的数组
      getthemeTopYs:null,
      currentindex:0,
    }
  },
  created(){
    
    this.detailId = this.$route.params.iid
    //获取iid
    getDetail(this.detailId).then(res => {
      //通过iid来调用axios
      const data = res.result;
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

      this.getthemeTopYs = debounce(()=>{
          this.$nextTick(()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
          console.log(this.themeTopYs)
        },200)//把请求各个组件的position值的方法传给debounce，并赋值给一个函数
      }) 
    }),
    //拿到动态路由带来的详情数据
    getRecommend().then(res =>{
      this.recommends = res.data.list
    },300)
    //请求推荐数据
  },
  mounted(){
  },
  updated(){
  },
  destroyed(){
    this.$bus.$off('detailItemImgLoad',this.itemImgListener)
  },

  methods:{
    detailgoodsLoad(){
      debounce(this.$refs.scrolls.refresh,500)
      this.getthemeTopYs()
      //监听到事件完成过后不断发送事件，经过节流器处理
    },
    titleclick(index){
      //监听到detailnavbar传来的事件
      console.log(index)
      this.$refs.scrolls.scrollTo(0 , -this.themeTopYs[index] , 0)
      console.log(this.themeTopYs[index])
    },
    scrolling(position){
      const cposition = -position.y
      let length = this.themeTopYs.length
      for(let i = 0;i < length ; i++){
        if (this.currentindex !== i &&(i < length - 1 && cposition > this.themeTopYs[i] 
        && cposition < this.themeTopYs[i+1] 
        || (i === length -1 && cposition >= this.themeTopYs[i]))){
          this.currentindex = i
          this.$refs.nav.currentindex = this.currentindex
        }
      }
      //循环判断当前的i是否等于或者超出或者小于offsettop值
      this.listenShowBackTop(position)
    },
    addToCart(){
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.detailId
      //获取当前页面的商品数据并储存在一个对象内，注意iid一定要传过去
      this.$store.dispatch('addCart',product)
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
  height: calc(100% - 44px - 58px)
}
.detail-nav{
  position: relative;
  z-index: 9;
  background:#fff
}
</style>