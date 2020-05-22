<template>
  <div class ='bottom-menu'>
    <div class = 'checked' >
      <check-button 
              :ischecked ='isSelectAll'  
              class="check-button" 
              @click.native ='checkclick'></check-button>
      <span>全选</span>
    </div>
    <div class = 'selectall'>
      合计{{counterAll}}
    </div>
    <div class ='calculcate'>
      去计算（{{checked}}）
    </div>
  </div>
</template>

<script>
import CheckButton from '../childComps/CheckButton'
export default {
  name:'CartBottomBar',
  components:{
    CheckButton,
  },
  computed:{
    cartList() {
        return this.$store.getters.cartList
    },
    counterAll(){
      return this.$store.state.cartList.filter((item)=>{
        return item.checked
      }).reduce((prevalue,item)=>{
        return prevalue + item.price * item.count
      },0).toFixed(2)
      //通过filter和reduce来计算总体价格
    },
    checked(){
      return this.$store.state.cartList.filter((item)=>{
        return item.checked
      }).length
    },
    isSelectAll() {
      if(this.cartList.length === 0)return false
      return !this.cartList.find(item => !item.checked)
    },
  },
    methods: {
      checkclick(){
        if (this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
          //全部没有被选中的情况
        }else{
          this.cartList.forEach(item => item.checked = true)
          //部分没有被选中
        }
      }
  },
}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: relative;
    bottom:40px;
    line-height:40px;
    display: flex;
    font-size: 14px;
  }
  .checked{
    display:flex;
    align-items: center;
    font-size: 10px;
    width:70px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px ;
    margin-right: 5px;
  }
  .selectall{
    margin-left: 20px;
    flex:1;
  }
  .calculcate{
    width:90px;
    background-color: red;
    color:#fff;
    text-align: center;
  
  }
</style>