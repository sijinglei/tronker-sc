<template>
  <div class="main-content">
      <h1>商品详情</h1>
  </div>
</template>

<script>
import mockfunc from '../mock/mock'
export default {
  name: 'hello',
  data () {
    return {
      value:'',
      rangeValue:20,
      msg: 'Welcome to Your Vue.js App',
      result:[]
    }
  },
  mounted(){
 this.getList();
  },
  methods:{
    getList(){
      var params={
         keyWords:''
      }
      var res=axios.get('http://getlist').then((res)=>{
         console.log('success');
        console.log(res);

      }).catch((err)=>{
        console.log('err');
      })
    }
  }
}
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
 @import "~public/stylus/variable"
.main-content
  color:$color-theme

</style>
