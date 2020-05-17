<template>
  <div v-if = 'Object.keys(commentInfo).length !== 0' class = 'comment-info'>
    <div class= 'header'>
      <div class ='header-user'>用户评价</div>
      <div class = 'header-more'>
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class = 'user'>
      <img :src = 'commentInfo.user.avatar' alt=''>
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class = 'info-detail'>
      <div class = 'detail-comment'>
        <p>{{commentInfo.content}}</p>
        <div class = 'other'>
          <span class = 'date'>{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key= index>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import {formatDate} from "@/common/utils";
export default {
  name:'DetailCommentInfo',
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate:function(value){
      let date = new Date(value*1000)
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment-info {
    padding: 5px 12px;
    color:#333;
    border-bottom: 5px solid #f2f5f8;
  }

.header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.header-user{
  float:left;
  font-size: 15px;
}
.header-more{
  float:right;
  font-size:13px ;
}
.user{
  padding:10px 0  5px;

}
.user img{
  width:42px;
  height:42px;
  border-radius:50%;
}
.user span{
  position:relative;
  font-size:15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
    padding: 0 5px 15px;
}
.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .other{
  font-size:12px;
  color:#999;
  margin-top:10px;
}
.other .date{
  margin-right:8px;
}
.info-imgs{
  margin-top:18px;
}
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>