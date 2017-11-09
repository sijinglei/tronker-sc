<style>

</style>
<template>
<section class="page f-bg clearfix">
<div class="page-swip" style="height: 12.7rem;text-align: center;">
<mt-swipe :auto="4500">
<mt-swipe-item class="slide" v-for="d in homeimgelist">
<a :href="d.href">
<img :src="d.imagename" width="100%" />
</a>
</mt-swipe-item>
</mt-swipe>
</div>
<!--点击下载-->
<!-- <download></download> -->
<!--end-->
<!--底部导航-->
<foot :active="1"></foot>
<!--end-->
</section>
</template>
<script>
import download from "../../components/download.vue";
import footer from "../../components/footer.vue";
import mockFun from "../../util/mock";

var wechatObj;

export default {
  data() {
    return {
      homeimgelist: {},
      homehotmerchant: {},
      formData: {
        GID: ""
      },
      merchPath: config.merchPath, //商户图片前缀
      // bannerPath: config.bannerPath,//网站广告图前缀
      wxconfig: {
        debug: true, //开启 debug 模式
        appId: "",
        timestamp: "",
        nonceStr: "",
        signature: "",
        jsApiList: ["scanQRCode", "getLocation"],
        location: ""
      }
    };
  },

  mounted() {
    var vm = this;
    vm.gethomeimagelist();
    vm.gethotmerchant();
    vm.getFloorList();
  },
  methods: {
    getFloorList() {
      axios
        .get("http://test5.tronker.com/api/mall/v1.0/index")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gethomeimagelist() {
      //获取首页广告图
      var vm = this;
      vm.formData.GID = usages.api.index.homepageimage;
      // vm.$http.post(usages.domain, vm.formData).then(function (res) {
      // console.log(res.body);
      // var dataList = res.body;
      // if (dataList.issuccess) {
      // this.homeimgelist = dataList.result.imagelist; //.forEach(a=>a.imagename='url('+a.imagename+')');
      // } else {
      // vm.errMsg(dataList.rtnmessage);
      // }
      // });
      vm.$http.get("http://homelist").then(res => {
        console.log("mockjs-data");
        console.log(res);
        var dataList = res.body.data;
        if (res.ok) {
          this.homeimgelist = dataList;
        } else {
          vm.errMsg(res.statusText);
        }
      });
    },
    gethotmerchant() {
      //获取热门商户
      var vm = this;
      vm.formData.GID = usages.api.index.homehotmerchant;
      // vm.$http.post(usages.domain, vm.formData).then(function (res) {
      vm.$http.get("http://homehotmerchant").then(res => {
        console.log("homehotmerchant");
        console.log(res.body);
        var dataList = res.body;
        if (res.ok) {
          this.homehotmerchant = dataList.data;
        } else {
          vm.errMsg(dataList.rtnmessage);
        }
      });
    },
    errMsg(msg) {
      MintUI.MessageBox("", msg);
    }
  },
  components: {
    download: download,
    foot: footer
  }
};
</script>