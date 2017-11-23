<template>
  <div class="m-home">
    <h1>{{msg}}</h1>
    <t-header></t-header>
  </div>
</template>
<script>
import tHeader from "@/components/common/m-header";
export default {
  data() {
    return {
      msg: "首页"
    };
  },
  components: {
    tHeader
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$axios
        .get("/api/goods/test")
        .then(function(data) {
          console.log("获取列表成功！！！！");
          console.log(data.data);
          if (data.data.code != "999") {
            this.msg = data.data.message;
          } else {
          }
        })
        .catch(function(error) {
          console.log("请求异常");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">

</style>