<template>
<div id="home" class = 'wrapper'>
    <nav-bar class="home-nav">
    <!--设置了一个div包含档前的slot  -->
        <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
                  :titles = "['流行','新款','精选']" 
                  @tabclick = 'tabClick'
                  ref = 'TabControl1'
                  class = 'tabcontrol'
                  v-show = 'isTabFixed'></tab-control>
                  <!--复制一个tabcontrol，用于显示滚动后的导航栏 -->
    <scroll class='content' ref ='scrolls' :probe-type = '3' @scrollP = 'contentscroll' :pull-up-load = 'true' @pulling = 'contentpulling'><!--使用滚动scroll的组件-->
      <home-swiper :banners='banners' @swiperImageLoad = 'swiperimageload'></home-swiper><!--这是一个轮播图 -->
      <recommend-view :recommends = 'recommends'></recommend-view><!--这是一个推荐页面-->
      <feature-view></feature-view><!--这是一个feature-->
      <tab-control 
                  :titles = "['流行','新款','精选']" 
                  @tabclick = 'tabClick'
                  ref = 'TabControl2'></tab-control><!--这是tab- bar -->
      <goods-list 
                  :goods = "goods[currentType].list"
      ></goods-list><!--这是商品页面  -->
    </scroll>
    <back-top @click.native = 'backclick'  v-show = 'backtopshow'></back-top>
    
    
    

</div>
</template>

<script>
import NavBar from "./../../components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwipers'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeattureView'
import { getHomeMultidata,
        getHomeGoods
        } from "network/home";
import  BackTop from 'components/content/backTop/BackTop'


import TabControl from '../../components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import scroll from 'components/common/scroll/scroll'
import {backTopMixin} from'@/common/mixin'

export default {
name: "Home",
components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    scroll,
    BackTop
},
mixins:[backTopMixin],
data() {
    return {
    banners: [],
    recommends: [],
    currentType:'pop',
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
      //每当当前页面往下刷新时，page记录当前用户加载到第几页，
      //而list储存的是当前加载了的所有数据
    },
    tabOffsetTop:0,
    isTabFixed:false,
    saveY:0,
    itemimgListener:null
    };
},
created(){
    //在页面创建的时候来得到网络请求的数据
    this.getHomeMultidata(),
    //写上this以免混淆,这是请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
},
mounted(){
  let refresh = this.debounce(this.$refs.scrolls.refresh,500)
  //监听事件总线上的事件，重新刷新scroll的长度
    this.itemimgListener = ()=>{
      refresh()
    }
    //对我们监听的事件进行保存
    this.$bus.$on('detailItemImgLoad',this.itemimgListener)
},
activated() {
  this.$refs.scrolls.scrollTo(0,this.saveY,10)
  //此处传入的第三个参数time值不能为0，否则会触发bug
  this.$refs.scrolls.refresh()
  //console.log('重新进入页面的Y值是',this.saveY)
},
//跳转到离开时，scroll记载的滚动位置
deactivated() {
  this.saveY = this.$refs.scrolls.getscrolly()
  //console.log('离开页面的Y值是',this.saveY)
  //在离开时，记录滚动的位置
},
destroyed(){
    this.$bus.$off('detailItemImgLoad',this.itemImgListener)
  },

methods:{
  /**
   * 事件监听相关方法
   *   
   */
  debounce(func,delay){
    let timer = null
    //创建一个变量储存计时器
    return function(...args){
      if(timer)clearTimeout(timer)
      //如果有计时器，则清空
      timer = setTimeout(()=>{
        func.apply(this,args)
      },delay)
      //创建一个节流器
    }
  },
  //节流器
  tabClick(index){
    switch(index){
      case 0:
        this.currentType = 'pop'
        break
      case 1:
        this.currentType = 'new'
        break
      case 2:
        this.currentType = 'sell'
        break
    }
    this.$refs.TabControl1.CurrentIndex = index
    this.$refs.TabControl2.CurrentIndex = index
  },
  //根据点击判断当前选择的tab
  contentscroll(position){
    //1.根据position来动态显示，方法在mixin中
    this.listenShowBackTop(position)
    //2.根据offsettop的值来决定tabcontorl是否吸顶
    this.isTabFixed = (-position.y) > this.tabOffsetTop
  },
  //点击回到首页已经被整合进mixin中的方法里
  //滚动到一定页面时隐藏插件
  contentpulling(){
    this.getHomeGoods(this.currentType)
  },
  //获取下拉数据
  swiperimageload(){
    this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
  },
  //当轮播图加载完毕后，获取到tabcontrol2的offsettop值
  /**
   *网络请求相关代码 
   * */
  getHomeMultidata(){
    getHomeMultidata().then(res => {
      //这是获取轮播图和推荐页面数据的函数
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      //由于这是在函数作用域内，函数执行完毕会被回收变量，所以将变量赋值给上级作用域下的变量
    })
  },
  getHomeGoods(type){
    //调用这个函数的时候需要传入type,这是动态接受商品数据数组的函数
    const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list),
          this.goods[type].page += 1
          //使用三点运算符将then回调函数接受到的list挨个传入goods对象下的type数组内
          this.$refs.scrolls.finishPullUp()
    })
  }
}
};
</script>

<style scoped>
#home{
  height:100vh;
  position:relative;
}
.home-nav {
    background-color: #ff8198;
    color: white;
}
.tabcontrol {
  position:relative;
  z-index: 9;
}
.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0
}
</style>