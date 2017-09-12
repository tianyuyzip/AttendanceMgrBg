var formidable = require("formidable");
var path = require("path");
var db = require("../model/dbutils.js");

var getStuByNo = function (req,res) {
    var username = req.params;
    // console.log(username);
    db.query("student",username,1,1,{},function (err,result) {
        console.log(result);
        if(err){
            console.log("err result");
            res.json({"result":1});
        }else{
            console.log(result[0]);
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
            console.log(result);
            res.json({"result":result});
        }

    });
};

var loadTodayCourses = function (req,res) {

    var date = req.params;

    db.query("course",date,4,1,{begintime:1},function (err,result) {

        if(err){
            res.json({"result":1});
        }else{
            console.log(result);
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

          }
      }
  })
};

function getDocByStatus(status,result){
    var doc = null;
    if(status === "待签到"){
        var normalcnt = parseInt(result.normalcnt)+1
        doc = {"normalcnt":normalcnt};
    }
    else if(status === "迟到"){
        var latecnt = parseInt(result.latecnt)+1
        doc = {"latecnt":latecnt};
    }
    else if(status === "缺勤"){
        var absencecnt = parseInt(result.absencecnt)+1
        doc = {"absentcnt":absencecnt};
    }

    return doc;
}

exports.getStuByNo = getStuByNo;
exports.loadAllAttHistory = loadAllAttHistory;
exports.loadTodayCourses = loadTodayCourses;
exports.updateSignCnt = updateSignCnt;

