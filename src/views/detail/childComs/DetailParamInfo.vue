<template>
  <div  class = 'param-info' v-if='Object.keys(detailparams).length !== 0'>
    <table v-for = "(table,index) in detailparams.sizes" :key ='index'
          class = 'info-size'>
    <!--table是一个含有数个数组的对象-->
      <tr v-for = "(tr,indey) in table" :key = 'indey'>
      <!--tr是一个数组，含有数个字符串,数组是储存纵列的数据-->
        <td v-for = "(td,indez) in tr" :key = 'indez'>{{td}}</td>
        <!--td是一个个字符串，按照纵列排序-->
      </tr>
    </table>
    <table class = 'info-param'>
      <tr v-for ='(info,index) in detailparams.info' :key='index'>
        <td class = 'info-param-key'>{{info.key}}</td>
        <td class ='param-value'>{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="detailparams.image.length !== 0">
      <img :src="detailparams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailParamInfo',
  props:{
    detailparams:{
      type:Object,
      default:{}
    }
  }
}
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
    background-color: #fff;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr {
    height: 42px;
  }
  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }
  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }
  .param-value {
    color: #eb4868
  }
  .info-img img {
    width: 100%;
  }
</style>