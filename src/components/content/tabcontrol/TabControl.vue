<template>
  <div class='tabcontrol'>
    <!--接受父组件传来的数组，使用v-for而不是使用slot来进行显示-->
    <div v-for = "(item,index) in titles" :key = 'item.count'
    class ='tab-control-item'
    :class="{active: index === CurrentIndex }"
    @click ='itemclick(index)'>
    <!--动态绑定样式 -->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data: function(){
    return{
      CurrentIndex:0
    }
  },
  methods:{ 
    //注意点击追踪循环的元素时，需要向事件内部传递index值
    itemclick(index){
      this.CurrentIndex = index;
      this.$emit('tabclick',index)
      //向外部传递自定义点击事件，为切换商品页面准备
    }
  }
}
</script>

<style>
.tabcontrol{
  display: flex;
  text-align: center;
  font-size: 15px;
  height:40px;
  line-height: 40px;
  background-color: white;
}
.tab-control-item{
  flex:1;
}
.tab-control-item span {
  padding:5px;
}
.active{
  color:#ff8198;
} 
.active span{
  border-bottom:3px solid  #ff8198;

}
</style>