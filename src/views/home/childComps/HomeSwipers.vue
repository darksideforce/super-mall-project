
<template>
<div>
  <swiper>
    <!--使用swiper组件，利用v-for循环展示接受到的图片-->
        <swiper-item v-for="(item,key) in banners" :key="key">
          <!--现在v-for必须指定key       -->
            <a :href="item.link">
                <img :src="item.image" alt />
            </a>
        </swiper-item>
    </swiper>
</div>
</template>


<script>
import { Swiper, SwiperItem } from "components/common/swiper";
//将轮播逻辑抽出，放置一个单独的文件内，构成组件树，接受外部传进来的值
export default {
  name:'HomeSwiper',
  //外部父组件传值进入
  props:{
    banners:{
      type:Array,
      default(){
        return[]
        //props接受的对象default必须是一个函数
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>