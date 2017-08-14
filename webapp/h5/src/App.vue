<template>
  <div id="app">
    <mt-header fixed title="固定在顶部"></mt-header>
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="首页">
        <img slot="icon" :src="img1">
        首页
      </mt-tab-item>
      <mt-tab-item id="投融">
        <img slot="icon" :src="img2">
        投融
      </mt-tab-item>
      <mt-tab-item id="理财">
        <img slot="icon" :src="img3">
        理财
      </mt-tab-item>
       <mt-tab-item id="商城">
        <img slot="icon" :src="img4">
        商城
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" :src="img5">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: 'app',
  data(){
    return {
      selected:true,
      img1:Mock.mock('@image("","#FF6600")'),
      img2:Mock.mock('@image("","#ee6600")'),
      img3:Mock.mock('@image("","#aaff00")'),
      img4:Mock.mock('@image("","#bbff00")'),
      img5:Mock.mock('@image("","#ccff00")')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
