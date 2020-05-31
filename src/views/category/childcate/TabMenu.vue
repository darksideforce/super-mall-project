<template>
  <div class='tabmenu'>
    <div class='tabitem' 
        v-for='(item,index) in categories' :key ='item.index' 
        :class="{active: index===currentindex}"
        @click = 'clickitem(index)'>
      {{item.title}}
    </div>
  </div>
</template>

<script>
export default {
  name:'TabMenu',
  props:{
    categories:Array
  },
  data(){
    return{
      currentindex: 0
    }
  },
  methods:{
    clickitem(index){
      this.currentindex = index
      this.$emit('selectindex',index)
      
    }
  }
}
</script>

<style scoped>
.tabmenu{
  width:100px;
  background-color: #f6f6f6;
  height:calc(100vh - 44px - 49px);
  overflow: hidden;
  transition: all .4s;
}
.tabitem{
  width:100%;
  height:45px;
  line-height: 45px;
  text-align: center;
}
.tabitem.active{
  font-weight: 700;
  color:var(--color-high-text);
  background-color: #fff;
  border-left:3px solid var(--color-high-text);
}
</style>