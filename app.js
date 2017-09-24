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
    res.header("X-Powered-By",' 3.2.1');
    next();
});
app.get("/v1/stu/:stuno",router.getStuByNo);    //通过学号获取学生信息
app.get("/v1/stu/signin/:stuno/:stuname",router.loadAllAttHistory);    //根据学号，学生姓名获取全部签到记录数
app.get("/v1/stu/course/:date",router.loadTodayCourses);      //加载今天所有课程信息
app.get("/v1/stu/signCnt/:stuno/:status",router.updateSignCnt);  //更新签到数 并返回签到记录
app.post("/v1/stu/signinfo/info",router.addSigninfo);    //添加签到记录到记录表
app.get("/v1/stu/signinfo/:stuno/:courseno/:date/:begintime",router.getSignedinfo);   //通过学号，课程号，时间，课程开始时间获取签到记录
app.get("/v1/stu/signinfo/:stuno",router.loadAllSignedRecord);    //通过学号加载所有此学生的签到信息
app.get("/v1/stu/signinfo/:stuno/:pageNo/:pageSize",router.loadScopedSignedRecord);    //分页加载签到记录
app.post("/v1/stu/signinfo/course",router.loadCourseSignedInfo);    //通过课程号加载此课程的所有签到信息
app.get("/v1/stu/:stuno/:password",router.setNewPassword);    //设置新密码

app.listen(80,function(){
  console.log("student pic books is running at port 80 ok!");
});