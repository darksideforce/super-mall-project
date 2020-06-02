<template>
  <div class='choicelist'>
    <div v-for='item in choice' :key=item.index>
      <div class='itemlist'>
        
        <img :src='iconURL(item)' class='itemimg'>
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ChoiceList',
  props:{
    choice:{
      type:Array,
      default(){
        return []
      }
    }
  },
    methods: {
			iconURL(item) {
				return require('assets/img/profile/'+item.img)
      }
    }
}
</script>

<style scoped>
.choicelist{
  margin-top:15px;
  width:100%;
  font-size:15px;
  background-color: #fff;
  color: #333;
}
.itemlist{
  width:100%;
  display:flex;
  height:44px;
  padding-left: 15px;
  margin-bottom: 1px;
  line-height: 44px;
}
.itemlist img{
  width:20px;
  height:20px;
  margin:auto 0;
}
.itemlist p{
  width:100%;
  padding-left: 8px;
  border-bottom:1px solid rgba(100, 100, 100, .1);

}
</style>