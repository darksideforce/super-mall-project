<template>
  <div class= 'wrapper' ref ='wrapper'><!-- 使用ref来定位scroll-->
    <div class = 'content'> 
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
//封装一个滚动组件
  name:'scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    //创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scrollP',position)
    }),
    //监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pulling')
      
    })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
      //定义一个scroll方法，调用当前作用域下的scroll对象。执行他的方法，并传入相关参数
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll&&this.scroll.refresh()
    },
    getscrolly(){
      return this.scroll ? tshi.scroll.y :0
      //意思是，如果scroll无值，则返回0，如果有值，则返回y值
    }
  }
}
</script>

<style>

</style>