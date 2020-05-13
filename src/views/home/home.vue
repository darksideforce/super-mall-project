<template>
<div id="home" class = 'wrapper'>
    <nav-bar class="home-nav">
    <!--设置了一个div包含档前的slot  -->
        <div slot="center">购物街</div>
    </nav-bar>
    <scroll class='content' ref ='scrolls' :probe-type = '3' @scrollP = 'contentscroll' :pull-up-load = 'true' @pulling = 'contentpulling'><!--使用滚动scroll的组件-->
      <home-swiper :banners='banners'></home-swiper><!--这是一个轮播图 -->
      <recommend-view :recommends = 'recommends'></recommend-view><!--这是一个推荐页面-->
      <feature-view></feature-view><!--这是一个feature-->
      <tab-control 
                  :titles = "['流行','新款','精选']" class = 'tabcontrol'
                  @tabclick = 'tabClick'></tab-control><!--这是tab- bar -->
      <goods-list 
                  :goods = "goods[currentType].list"
      ></goods-list><!--这是商品页面  -->
    </scroll>
    <back-top 
    @click.native = 'backclick' 
    v-show = 'backtopshow'></back-top>
    
    
    

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
    backtopshow:false
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
  const refresh = this.debounce(this.$refs.scrolls.refresh,500)
  //监听事件总线上的事件，重新刷新scroll的长度
    this.$bus.$on('ItemImageLoad',()=>{
          refresh()
        })
},
methods:{
  /**
   * 事件监听相关方法
   *   
   */
  debounce(func,delay){
    let timer = null
    return function(args){
      if(timer)clearTimeout(timer)
      timer = setTimeout(()=>{
        func.apply(this,args)
      },delay)
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
  },
  //根据点击判断当前选择的tab
  backclick(){
    this.$refs.scrolls.scrollTo(0,0,500)
  },
  //点击回到首页
  contentscroll(position){
    this.backtopshow = (-position.y)>1000
  },
  //滚动到一定页面时隐藏插件
  contentpulling(){
    this.getHomeGoods(this.currentType)
  },

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
  padding-top:44px;
  height:100vh;
}
.home-nav {
    background-color: #ff8198;
    color: white;
    position: fixed;
    left:0px;
    right:0px;
    top:0px;
    z-index:99;
}

.tabcontrol{
  position:sticky;
  top:44px;
  z-index: 99;
}
.content{
  overflow:hidden;
  position: absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0
}
</style>