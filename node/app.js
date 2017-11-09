var http = require("http");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var router = express.Router();
// 创建http服务
var app = http.createServer(function(req, res) {
    // 使用了superagent来发起请求
    var superagent = require("superagent");
    // 查询本机ip，这里需要根据实际情况选择get还是post
    var sreq = superagent
        .get("http://192.168.1.104:8122/router/user.login")
        .query({
            appKey: "100001"
        })
        .query({
            method: "user.login"
        })
        .query({
            v: "1.0"
        })
        .query({
            format: "json"
        })
        .query({
            loginType: 3
        })
        .query({
            username: "wench"
        })
        .query({
            userpwd: "w111111"
        })
        .query({
            sign: "F5E9DBBED15A7DE844D2F522028740809B9CD183"
        })
        .end(function(req, res) {
            console.log(res.header);
            console.log("================set-cookie====================");
            console.log(res.header["set-cookie"]);
            // app.use(
            //     session({
            //         secret: "keyboard cat",
            //         resave: false,
            //         saveUninitialized: true,
            //           cookie: { secure: true }
            //     })
            // );
            console.log(res.body);
        });
});
router.use(function(req, res, next) {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
});
//修改router/users.js，判断用户是否登陆。
router.get("/getall", function(req, res, next) {
    var sreq = superagent
        .get("http://test5.tronker.com/api/mall/v1.0/index")
        .end(function(req, res) {
            console.log(res.header);
            console.log("================set-cookie====================");
            console.log(res.header["set-cookie"]);
            app.use(
                session({
                    secret: "keyboard cat",
                    resave: false,
                    saveUninitialized: true,
                    cookie: {
                        secure: true
                    }
                })
            );
            console.log(res.body);
        });
    next();
});

// 访问127.0.0.1:3001查看效果
app.listen(3001);
console.log("server started on 127.0.0.1:3001");