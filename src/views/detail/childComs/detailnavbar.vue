<template>
  <nav-bar>
    <div slot = 'left' class = 'black' @click ='backclick'>
      <img src = '~assets/img/common/back.svg' alt=''>
    </div>
    <div slot = 'center' class = 'detail'>
      <div v-for ='(item,index) in titles' 
      :key= 'item.index'  
      class = 'detail-item'
      :class = '{active: index === currentindex}'
      @click = 'detailclick(index)'>
      <!--循环遍历title并输出，点击后动态绑定样式-->
      {{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  components:{
    NavBar
    },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentindex:0,
    }
  },
  methods:{
    detailclick(index){
      this.currentindex = index
      //点击后动态改变index，从而改变样式
      this.$emit('titleclick',index)
    },
    backclick(){
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
.detail{
  display:flex;
  font-size:13px;
}
.detail-item{
  flex:1
}
.active{
  color:rgb(255, 0, 0);
}
.black{
  margin-top:5px;
}
</style scoped>