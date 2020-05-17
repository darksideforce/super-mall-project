<template>
  <div v-if='Object.keys(detailInfo).length !== 0' class='goods-info'>
    <!--其实可以不要的，一个判断是否渲染的if-->
    <div class="info-desc clear-fix"> 
      <div class = 'start'></div>
      <!--定义一个伪类元素，用于在图像前添加一个图像-->
      <div class = 'desc'>{{detailInfo.desc}}</div>
      <div class ='end'></div>
      <!--定义一个伪类元素用于在元素后添加一个图像-->
    </div>  
      <div  class = 'info-key'>
      {{detailInfo.detailImage[0].key}}
    </div>
    <div class = 'info-list'>
      <img v-for = 'item in detailInfo.detailImage[0].list' :key = item.index :src='item' alt='' @load = 'detailgoodsload'> 
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailGoodsInfo",
  props:{
    detailInfo:{
      type:Object
    }
  },
  methods:{
    detailgoodsload(){
      this.$emit('detailgoodsload')
    }
  }
}
</script>

<style scoped>
.goods-info{
  padding:20px 0;
  border-bottom:5px solid #f2f5f8;
  background-color: #fff;
}
.start{
  float:left;
}
.end{
  float:right;
  
}
.info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc{
    padding: 0 15px;
  }
    .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  
  .info-desc .end::after {
    right: 0;
  }
.desc{
  padding:15px 0;
  font-size: 14px;
}
.info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

.info-list img {
    width: 100%;
  }
</style>