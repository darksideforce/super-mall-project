<template>
<div id="home">
    <nav-bar class="home-nav">
    <!--设置了一个div包含档前的slot  -->
        <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <!--这是一个轮播图 -->
    <recommend-view :recommends = 'recommends'></recommend-view>
    <!--这是一个推荐页面-->
    <feature-view></feature-view>
    <!--这是一个feature-->
    <tab-control :titles = "['流行','新款','精选']" class = 'tabcontrol'></tab-control>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>

    
    

</div>
</template>

<script>
import NavBar from "./../../components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwipers'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeattureView'
import { getHomeMultidata } from "network/home";

import TabControl from '../../components/content/tabcontrol/TabControl'

export default {
name: "Home",
components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
},
data() {
    return {
    banners: [],
    recommends: [],
    goods:{
      'pop':{page:0,list:[]},
      'news':{page:0,list:[]},
      'sell':{page:0,list:[]},
      //每当当前页面往下刷新时，page记录当前用户加载到第几页，
      //而list储存的是当前加载了的所有数据
    }
    };
},
created() {
    //在页面创建的时候来得到网络请求的数据
    getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      //由于这是在函数作用域内，函数执行完毕会被回收变量，所以将变量赋值给上级作用域下的变量
    });
}
};
</script>

<style>
#home{
  padding-top: 44px;
}
.home-nav {
    background-color: #ff8198;
    color: white;

    position: fixed;
    left:0px;
    right:0px;
    top:0px;
    z-index:9;
}

.tabcontrol{
  position:sticky;
  top:44px;
}
</style>