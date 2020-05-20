import {debounce} from '@/common/utils'
import  BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted(){
    let newRefresh = debounce(this.$refs.scrolls.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('detailItemImgLoad',this.itemImgListener)
    //监听传过来的函数，通过事件总线
    //mixin内的函数是混合对象，可以和外部对接
  } 
} 

export const backTopMixin = {
  //把点击回到顶部封装在这里
  components: {
    BackTop
  },
  data(){
    return {
      backtopshow:false
    }
  },
  methods:{
    backclick(){
      this.$refs.scrolls.scrollTo(0,0,300)
    },
    listenShowBackTop(position){
      this.backtopshow =  ( -position.y ) >1000
    }
  }
}