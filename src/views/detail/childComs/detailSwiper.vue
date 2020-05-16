<template>
  <div class = 'detail-swiper'>
    <swiper class = 'detailS'>
      <swiper-item v-for = 'item in topImages' :key = item.index>
        <img :src='item'>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.detailS{
  height:300px;
  
}
</style scoped >