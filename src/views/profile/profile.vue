<template>
    <div id='profile'>
      <nav-bar class='bar'>
        <div slot='center'>商城</div>
      </nav-bar>
      <login></login>
      <account :user='user'></account>
      <choice-list :choice='choice1'></choice-list>
      <choice-list :choice='choice2'></choice-list>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Login from './ChildProfile/login'
import account from './ChildProfile/account'
import ChoiceList from './ChildProfile/choicelist'

export default {
    name:'profile',
    components:{
      NavBar,
      Login,
      account,
      ChoiceList,
    },
    data(){
      return{
        user:{
          'ticket':0,
          'money':0.00,
          'point':0,
        },
        choice1:[
          {img: 'message.svg',title:'我的消息'},
          {img: 'pointer.svg',title:'积分商城'},
          {img: 'vip.svg',title:'会员卡'},
        ],
        choice2:[
          {img: 'cart.svg', title:'我的购物车'},
          {img: 'shopping.svg',title:'下载购物APP'},
        ]
      }
    }

}
</script>

<style scoped>
#profile{
  background-color: #f2f2f2;
}
.bar{
  background-color: rgba(255,98,123);
  color:#fff;
}
</style>