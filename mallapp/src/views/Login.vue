<template>
  <div class="m-login">
    <h1>{{title}}</h1>

    <mt-field label="用户名" placeholder="请输入用户名" v-model="userInfo.username" value="wench"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userInfo.userpwd" value="w111111"></mt-field>
    <div class="m-help">
      <router-link to="/about">忘记密码？</router-link>
      <router-link to="/about">注册</router-link>
    </div>
    <mt-button type="primary" size="large" @click.native="login">登录</mt-button>
    <hr>
    <mt-button type="primary" size="large" @click.native="getGoodsList">产品列表</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { GetJsonpData } from "../api/jsonpData";
export default {
  data() {
    return {
      title: "登陆",
      userInfo: {
        username: "wench",
        userpwd: "w111111"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    login() {
      var that = this;
      console.log("======请求开始=======");
      that.$axios
        .get("/api/account/loginIn", {
          params: that.userInfo
        })
        .then(function(res) {
          console.log("请求成功！！！！");
          console.log(res);
          Toast({
            message: "操作成功"
          });
          if (res.data.code == "999") {
            that.$router.push({
              path: "/home"
            });
          } else {
          }
        })
        .catch(function(error) {
          console.log("请求异常");
          console.log(error);
        });
    },
    //测试用
    getList() {
      //通过jsonp获取第三方接口数据
      GetJsonpData().then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/login-register";
</style>
