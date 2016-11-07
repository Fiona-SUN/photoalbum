/**
 * Created by FIONA on 2016/11/5/005.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require("assert");
var connectUrl = 'mongodb://localhost:27017/example';


function connect(cb){
    MongoClient.connect(connectUrl,function(err,db){
        if(err){
            console.log("connect fail");
            var msg = "数据库连接失败";
            cb(msg,db);
        }else{
            cb(null,db);
        }

    });
}

exports.insertOne = function(collectionName,doc,cb){

    connect(function(err,db){
        if(err){
            cb(err);
            return;
        }
        db.collection(collectionName).insertOne(doc,function(err,result){
            db.close();
            if(err){
                var msg = "插入数据 "+doc+" 到集合"+collectionName+"中失败";
                cb(msg,result)
            }
            else{
                cb(null,result);
            }

        });
    });

};

exports.insertMany = function(collectionName,doc,cb){
    connect(function(err,db){
        if(err){
            cb(err);
            return;
        }
        db.collection(collectionName).insertMany(doc,function(err,result){
           db.close();
           if(err){
               var msg = "插入数据 "+doc+" 到集合"+collectionName+"中失败";
               cb(msg,result);
           }
           else{
               cb(null,result);
           }

        });
    });
};

exports.update = function(collectionName,filter,newDate,cb){
    connect(function(err,db){
        if(err){
            cb(err);
            return;
        }
        db.collection(collectionName).updateMany(filter,newDate,function(err,result){
            db.close();
            if(err){
                var msg = "更新数据失败"
                cb(msg,result);
            }
            else{
                cb(null,result);
            }

        });
    });
};

exports.remove = function(collectionName,filter,cb){
    connect(function(err,db){
        if(err){
            cb(err);
            return;
        }
        db.collection(collectionName).remove(filter,function(err,result){
            db.close();
            if(err){
                var msg = "删除数据失败";
                cb(msg,result);
            }
            else{
                cb(null,result);
            }

        });
    });
};

exports.query = function(collectionName,filter,pageSize,pageNo,sort,cb){
    connect(function(err,db){
        if(err){
            cb(err);
            return;
        }
        var cursor = db.collection(collectionName)
            .find(filter)
            .sort(sort)
            .skip((pageNo-1)*pageSize)
            .limit(pageSize);

        var result = [];

        cursor.each(function(err,doc){
           if(err){
               var msg = "查询数据失败";
               cb(msg,null);
               db.close();
               return;
           }
           if(doc!=null){
               result.push(doc);
           }
           else{
               db.close();
               cb(null,result);
           }
        });
    });
};