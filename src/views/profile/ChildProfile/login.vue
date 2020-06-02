<template>
  <div class='login'>
    <div class='userpic'>
      <img src = '~assets/img/profile/user.png' class='pic'>
    </div>
    <div class='useinfo'>
      <p>登录/注册</p>
      <div class='phone'> 
        <img src='../../../assets/img/profile/myphone.png'>
        <span>暂未绑定手机号</span>
      </div>
      
    </div>
    <div class='arrow'>
      <img src='~assets/img/profile/arrow_right.png'>
    </div>

  </div>
</template>

<script>
export default {
  name:'Login'
}
</script>

<style scoped>
.login{
  position: relative;
  display:flex;
  height:85px;
  width:100%;
  padding:6px 15px;
  background-color: rgba(255,98,123);
}
.pic{
  height:70px;
  width:70px;
  text-align: center;
  padding:2px
}
.useinfo{
  padding-left:15px;
  flex:1;
  color:#fff;
  padding-top:15px
}
.phone{
  padding-top:5px;
  height:35px
}
.phone span{
  font-size:13px;

}
.phone img{
  width:15px;
  height:15px;
  vertical-align: middle;
}
.arrow{
  line-height: 85px;
}
</style>