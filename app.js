var express = require("express");
var path = require("path");
var app = express();
var router = require("./controller/router.js");

// 显示欢迎首页
app.all('*', function(req, res, next) {
    // console.log("access control here!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});
app.get("/v1/stu/:stuno",router.getStuByNo);
app.get("/v1/stu/signin/:stuno",router.loadAllAttHistory);
app.get("/v1/stu/course/:date",router.loadTodayCourses);
app.get("/v1/stu/signCnt/:stuno/:status",router.updateSignCnt);
app.post("/v1/stu/signinfo/info",router.addSigninfo);
app.get("/v1/stu/signinfo/:stuno/:courseno/:date/:begintime",router.getSignedinfo);
app.get("/v1/stu/signinfo/:stuno",router.loadAllSignedRecord);
app.get("/v1/stu/signinfo/:stuno/:pageNo/:pageSize",router.loadScopedSignedRecord);

app.listen(80,function(){
  //console.log(__dirname);
  //C:\360disk\course-ware\nodejs-example\upload
  //console.log(path.join(__dirname,"/../upload"));
  console.log("student pic books is running at port 80 ok!");
});

// __dirname是当前文件的绝对路径
// . 是node命令执行时所在的目录。
