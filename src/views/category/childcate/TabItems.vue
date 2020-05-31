<template>
  <div class='content'>
    <div class='item' v-for='(item,index) in categorylistdata.list' :key = index>
      <a :href="item.link" class='link'>
          <img class="item-img" :src="item.image" alt="">
      </a>
      <p class="item-text">{{item.title}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name:'TabItem',
  props:{
    categorylistdata:{
      type:Object,
      default(){
        return [] 
      }
    }
  }
}
</script>

<style scoped>
.content{
 display:flex;
 flex-wrap:wrap;
 padding:10px

}
.item{
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  height:100px;
  margin-bottom:10px;
  justify-content: center;
}
.item img{
  width:65px;
  margin-bottom: 7px;

}

.item p{
  font-size: 14px;
}
</style>