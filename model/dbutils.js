var connURL = "mongodb://localhost:27017/brsc";
var MongoClient = require('mongodb').MongoClient;

// 获得数据库连接
function connDB(callback){
    MongoClient.connect(connURL,function(err,db){
        if(err){
          console.log("connDB():db connect fail!");
          callback("数据库服务器连接失败，请检查!",null);
        }
        else
          callback(null,db);
    });
}

//插入单条数据
exports.insertOne = function(collectionName,doc,callback){
    connDB(function(err,db){
      if(err){
          callback(err);
          return;
      }

      db.collection(collectionName)
         .insertOne(doc,function(err,result){
            db.close();
            if(err){
              console.log("insertOne(): err insert!");
              callback("往"+collectionName+"数据集中插入数据失败,请检查! "+result);
            }
            else
              callback(null);
         })
    });
}

// 插入多条数据
exports.insertMany = function(collectionName,doc,callback){
    connDB(function(err,db){
       db.collection(collectionName)
         .insertMany(doc,function(err,result){
            db.close();
            callback();
         })
    });
}

//删除多条记录
exports.delete = function(collectionName,filter,callback){
    connDB(function(err,db){
       db.collection(collectionName)
         .deleteMany(filter,function(err,result){
            db.close();
            callback(result.result.n);
         })
    });
}

// 更新数据
exports.update = function(collectionName,filter,doc,callback){
    connDB(function(err,db){
       db.collection(collectionName)
         .updateMany(filter,doc,function(err,result){
            db.close();
            callback(result.result.n);
         })
    });
}

//filter:查询条件
//pagesize:每页规模
//pageno:第几页
//sort 排序规则
exports.query = function(collectionName,filter,pageSize,pageNo,sort,callback){
    connDB(function(err,db){

        var result = [];

        var cursor = db.collection(collectionName)
          .find(filter)
          .sort(sort)
          .skip((pageNo-1)*pageSize)
          .limit(pageSize);

        //console.log(cursor);
        cursor.each(function(err,doc){
          if (err) {
              callback(err, null);
              db.close(); //关闭数据库
              return;
          }
          if (doc != null) {
              result.push(doc);   //放入结果数组
              // console.log(doc);
          } else {
              //遍历结束，没有更多的文档了
              // console.log(result);
              callback(null, result);
              db.close(); //关闭数据库
          }
        });

    })
}
