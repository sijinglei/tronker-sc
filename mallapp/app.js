var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var compression = require("compression");
//node接口路由配置
var routes = require("./routes");

var app = express();
//session 30分钟
app.use(
    session({
        secret: "mallapp",
        cookie: {
            maxAge: 1000 * 60 * 30
        },
        resave: true,
        saveUninitialized: true,
        secure: false,
        rolling: true
    })
);
app.use(favicon(__dirname + "/static/favicon.ico"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
//添加gzip压缩
app.use(compression());
// app.use(express.static(path.join(__dirname, "public")));

console.log(1);
app.use("/", routes);

console.log(3);
module.exports = app;