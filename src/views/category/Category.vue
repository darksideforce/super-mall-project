<template>
    <div class='category'>
      <nav-bar class='navbar'>
        <div slot='center'>商品分类</div>
      </nav-bar>
      <div class='titles'>
        <tab-menu :categories='categories' @selectindex = 'selectindex'></tab-menu>
      </div>
      <scroll class='items'>
        <scroll class='content' ref='scrolls'>
          <tab-items  :categorylistdata="showcategories" ></tab-items>
          <tab-control :titles = "['流行','新款','精选']" @tabclick='tabclick'></tab-control>
          <good-list :goods='showdetail'></good-list>
        </scroll>  
      </scroll>
    </div>
</template>



<script>
import NavBar from 'components/common/navbar/NavBar'
import BScroll from 'better-scroll'
import scroll from 'components/common/scroll/scroll'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodList from 'components/content/goods/GoodsList'

import TabMenu from './childcate/TabMenu'
import TabItems from './childcate/TabItems'


import {getCategorylistname,
        getSubcategory,
        getCategoryDetail
        } from 'network/category';
import {debounce} from '@/common/utils'

export default {
    name:'Category',
    components:{
      NavBar,
      TabMenu,
      TabItems,
      scroll,
      TabControl,
      GoodList
    },
    data(){
      return{
        scroll:null,
        categories:[],
        //分类名
        categorylistdata:{},
        //分类内的商品
        currentindex:-1,
        //侧边栏的index
        categorylistdetail:[],
        //商品下的精品数据等
        currenttype:'pop',
        itemimglistener:null,
        dates:null,
      }
    },
    created(){
      this._getcartgory()
      this.dates = new Date()
    },
    mounted(){
      
    },
    computed:{
      showcategories(){
        if (this.currentindex === -1) return {}
        return this.categorylistdata[this.currentindex].subcategories
      },
      showdetail(){
        if (this.currentindex === -1) return []
        //用来避免第一次进入页面时报错。可能是因为请求速度慢于创建速度 
        return this.categorylistdata[this.currentindex].categoryDetail[this.currenttype]
        //用于传入储存了数据的数组
      }
    },
    methods:{
      /**
       * 网络请求
       */
      _getcartgory(){
        //请求侧边栏的标题和初始化一个数组
        getCategorylistname().then(res=>{
          this.categories = res.data.category.list
          //console.log(this.categories);
          //这个数组是用来接受分类名的，但是分类名还是需要内容，所以在下面初始化
          for(let i=0 ; i < this.categories.length ; i++ ){
            this.categorylistdata[i] = {
              subcategories: {},
              categoryDetail:{
                'pop':[],
                'new':[],
                'sell':[],
                //初始化对象，创建出一个有着与categories同样长度的数组，每个成员都有3个小数组
              }
            }
          }
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentindex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categorylistdata[index].subcategories = res.data
          this.categorylistdata = {...this.categorylistdata}
          this.getSubcategoriesdetail('pop')
          this.getSubcategoriesdetail('new')
          this.getSubcategoriesdetail('sell')
        })
      },
      getSubcategoriesdetail(type){
        const miniWallkey = this.categories[this.currentindex].miniWallkey
        getCategoryDetail(miniWallkey,type).then( res=>{
          this.categorylistdata[this.currentindex].categoryDetail[type] = res
        })
      },
      /**
       * 点击事件
       */
      selectindex(index){
        this.getSubcategories(index)
      },
      tabclick(index){
        const tlist =['pop','new','sell'];
        this.currenttype = tlist[index]
        this.getSubcategoriesdetail(this.currenttype)
      },
    }

}
</script>
<style scoped>
.category{
  width:100%;
  height:100%;
}
.navbar{
  overflow: hidden;
  background-color: #ff8198;
  color: #fff;
}
.tltle{
  position: relative;
  top:44px
}
.items{
  position:fixed;
  top:44px;
  left:100px;
  bottom:49px;
  overflow: hidden;
}
</style scoped>