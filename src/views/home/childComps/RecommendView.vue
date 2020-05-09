<template>
  <div class='recommend'>
    <div v-for='(item,key) in recommends' :key='key' class= 'recommend-item'>
      <a :href="item.link">
        <img :src = "item.image" alt='' class='recommend-image'>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend{
    display:flex;
    width:100%;
    text-align: center;
    font-size: 12px;
    padding:15px 0 20px;
    border-bottom:8px solid #eee
  }
  .recommend-item{
    flex:1;
  }
  .recommend-image{
    width:90%;
    height:80%;
    margin-bottom:10px;
  }
</style>