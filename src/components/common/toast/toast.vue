<template>
  <div v-show='isToastShow' class='toast'>
    {{message}}
  </div>

</template>

<script>
export default {
  name:'Toast',
  props:{
    message:{
      type:String,
      default:'',
    },
    isToastShow:{
      typr:Boolean,
      default:false,
    }
  }
}
</script>

<style>
.toast{
  position:fixed;
  width: 150px;
  height:50px;
  background-color:rgba(0, 0, 0, .8);
  left:50%;
  right:50%;
  top:50%;
  bottom:50%;
  z-index: 99;
  text-align: center;
  line-height: 50px;
  transform:translateX(-75px);
  font-size: 15px;
  border-radius: 15px;
  color:#fff;
}
</style>