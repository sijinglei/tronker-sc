// var OAuthHelp = require("../common/AuthorizationHelp");

var qs = require("querystring");
var client = require("../common/HttpClient");

//登录
exports.loginIn = function(req, res) {
    console.log("=======请求开始=======");
    var reqData = {
        username: req.query.username,
        userpwd: req.query.userpwd,
        appKey: "100001",
        method: "user.login",
        v: "1.0",
        format: "json",
        loginType: "3",
        sign: "F5E9DBBED15A7DE844D2F522028740809B9CD183"
    };
    //url传值用qs,  body传值使用json
    var data = qs.stringify(reqData);
    client.GetByClientId("/router/user.login?" + data, (headers, chunk) => {
        var obj = JSON.parse(chunk);
        console.log("------------保存session---------------");
        req.session.loginHeaders = headers;
        console.log(obj);
        //最终过期时间
        // var expire_time = new Date();
        // expire_time.setHours(expire_time.getHours() + 2);
        // req.session.expire_time = expire_time.toLocaleString();

        res.json(obj);
    });
};