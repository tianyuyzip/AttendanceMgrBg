var formidable = require("formidable");
var path = require("path");
var db = require("../model/dbutils.js");

var getStuByNo = function (req,res) {
    var username = req.params;
    // console.log(username);
    db.query("student",username,1,1,{},function (err,result) {
        // console.log(result);
        if(err){
            // console.log("err result");
            res.json({"result":1});
        }else{
            // console.log(result[0]);
            res.json({"result":result[0]});
        }
    });
};

var loadAllAttHistory = function (req,res) {
    var username = req.params;

    db.query("signCnt",username,1,1,{},function (err,result) {

        if(err){
            res.json({"result":1});
        }else{
            // console.log(result);
            res.json({"result":result});
        }

    });
};

var loadTodayCourses = function (req,res) {

    var date = req.params;

    db.query("course",date,5,1,{begintime:1},function (err,result) {

        if(err){
            res.json({"result":1});
        }else{
            // console.log(result);
            res.json({"result":result});
        }
    })
};

var updateSignCnt = function (req,res) {
  var stuno = req.params.stuno;
  var status = req.params.status;

  db.query("signCnt",{stuno:stuno},1,1,{},function (err,result) {
      if(err){
          res.json({"result":1});
      }else{
          if(result){
              db.update("signCnt",{stuno:stuno},{$set:getDocByStatus(status,result[0])},function (n) {
                  // console.log("signincnt成功更新" + n + "条记录");
                  db.query("signCnt",{stuno:stuno},1,1,{},function (err,result) {
                      if(err){
                          res.json({"result":1});
                      }else{
                          res.json({"result":result});
                      }
                  })
              })
          }
      }
  })
};

function getDocByStatus(status,result){
    var doc = null;
    if(status === "待签到"){
        var normalcnt = parseInt(result.normalcnt)+1;
        doc = {"normalcnt":normalcnt};
    }
    else if(status === "迟到"){
        var latecnt = parseInt(result.latecnt)+1;
        doc = {"latecnt":latecnt};
    }
    else if(status === "缺勤"){
        var absentcnt = parseInt(result.absentcnt)+1;
        doc = {"absentcnt":absentcnt};
    }

    return doc;
};

var addSigninfo = function (req,res) {

    var info = JSON.parse(req.query.info);
    db.insertOne("signinfo",info,function (err) {
        if(err)
            res.json({"result":1});
        else
            res.json({"result":"success"});
    })
};

var getSignedinfo = function (req,res) {
    var stuno = req.params.stuno;
    var courseno = req.params.courseno;
    var date = req.params.date;
    var begintime = req.params.begintime;

    // console.log(stuno+courseno+date+begintime);
    db.query("signinfo",{stuno:stuno,courseno:courseno,signdate:date,begintime:begintime},1,1,{},function (err,result) {
        if(result.length!=0) {
            // console.log(result);
            res.json({"result": result});
        }else{
            res.json({"result":1});
        }
    })
};

var loadAllSignedRecord = function (req,res) {
    db.query("signinfo",req.params,0,1,{"signdate":1,"signtime":1},function (err,result) {
        if(err){
            res.json({"result":1});
        }else{
            res.json({"result":result});
        }
    })
};

var loadScopedSignedRecord = function (req,res) {
    var stuno = req.params.stuno;
    var pageNo = parseInt(req.params.pageNo);
    var pageSize = parseInt(req.params.pageSize);
    db.query("signinfo",{stuno:stuno},pageSize,pageNo,{"signdate":1,"signtime":1},function (err,result) {
        if(err){
            res.json({"result":1});
        }else{
            res.json({"result":result});
        }
    })
}

exports.getStuByNo = getStuByNo;
exports.loadAllAttHistory = loadAllAttHistory;
exports.loadTodayCourses = loadTodayCourses;
exports.updateSignCnt = updateSignCnt;
exports.addSigninfo = addSigninfo;
exports.getSignedinfo = getSignedinfo;
exports.loadAllSignedRecord = loadAllSignedRecord;
exports.loadScopedSignedRecord = loadScopedSignedRecord;

