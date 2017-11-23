var express = require("express");

var account = require("./server/controllers/account");
var goods = require("./server/controllers/goods");

var router = express.Router();
router.get("/", function() {
    console.log(account);
});
var islogin = false;
//登录
router.get("/api/account/loginIn", account.loginIn);

router.get("/api/goods/test", goods.goodList);

module.exports = router;