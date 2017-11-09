<style>
  @import "../../../assets/css/view/payment.css";
  body .card-page {
    background: #f1f3f5;
  }
</style>
<template>
  <section class="page card-page">
    <div class="card-top-wrap">
      <mt-navbar v-model="selected">
        <mt-tab-item id="yfk">预付卡</mt-tab-item>
        <mt-tab-item id="dzj">电子券</mt-tab-item>
      </mt-navbar>
    </div>
    <div class="tab-content">
      <div v-show="cardList.length>0">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="yfk">
            <router-link v-for="key in tickList" :to="{ name : 'cardDetail' , params : { id : key.cardid}}">
              <div class="yfk-item clearfix">
                <div class="img fl"></div>
                <div class="card-name fl">{{key.title}}</div>
                <div class="icon fr"></div>
              </div>
            </router-link>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div v-show="tickList.length>0">
        <mt-tab-container>
          <mt-tab-container-item id="dzj">
            <div class="dzj-item">
              <div class="nei">
                <div class="topinfo clearfix">
                  <div class="info-title fl">中粮集团端午节套装兑换券</div>
                  <div class="number fr">共2张</div>
                </div>
                <div class="botinfo">有效期至2017-05-01</div>
              </div>

            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div class="no-datalist">
        <img src="Resources/h5/dist/images/empty.png">
        <p>
          <router-link :to="{name:'consumption',params:{type:0}}">立即购买</router-link>
        </p>
      </div>
    </div>
    <!--<div class="footer">
            <p>
                <router-link to="/">
                    查看历史卡券
                </router-link>
            </p>
        </div>-->
  </section>
</template>

<script>
  export default {
    data() {
      return {
        selected: "yfk",
        currentView: "yfk",
        tickList: [],
        cardList: [],
        formData: {
          GID: "",
          userid: _com.getSession("userid")
        }
      };
    },
    components: {},
    created() {
      MintUI.Indicator.open();
    },
    mounted() {
      //隐藏加载动画
      var vm = this;
      vm.querycardbatchlist();
      vm.queryticketbatchlist();
    },
    methods: {
      queryticketbatchlist() {
        //个人电子券列表
        var vm = this;
        vm.formData.GID = usages.api.user.queryticketbatchlist;
        vm.$http.post(usages.domain, vm.formData).then(function (res) {
          console.log(res);
          if (res.body.issuccess) {
            vm.tickList = res.body.result.ticketlist;
          } else {
            vm.errMsg(res.body.rtnmessage);
          }
        });
        MintUI.Indicator.close();
      },
      querycardbatchlist() {
        //预付卡
        var vm = this;
        vm.formData.GID = usages.api.user.querycardbatchlist;
        vm.$http.post(usages.domain, vm.formData).then(function (res) {
          console.log(res);
          if (res.body.issuccess) {
            vm.cardlist = res.body.result.cardlist;
          } else {
            vm.errMsg(res.body.rtnmessage);
          }
        });
      },
      errMsg(msg) {
        MintUI.MessageBox("提示", msg);
      }
    }
  };
</script>