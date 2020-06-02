<template>
  <div class='account'>
    <div class='account-item'>
      <span class='each'>{{user.money}}</span>
      <span>元</span>
      <p>我的余额</p>
    </div>
    <div class='account-item'>  
      <span class='each'>{{user.ticket}}</span>
      <span>个</span>
      <p>我的优惠</p>
    </div>
    <div class='account-item'>
      <span class='each'>{{user.point}}</span>
      <span>分</span>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'account',
  props:{
    user:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.account{
  height: 95px;
  width:100%;
  display: flex;
  margin-bottom:10px;
}
.account-item{
  background-color: #fff;
  flex:1;
  width:100%;
  margin-right:1px;
  text-align: center;
}
.account-item:last-of-type{
  margin-right:0;
}
.account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
  .each{
    color:#ff5f3e;
    font-weight: 700;
    font-size:24px;
  }
  .account-item p{
    margin-top:10px
  }
</style>