/**
 * Created by FIONA on 2016/10/26/026.
 */

var fs = require('fs');
var path = require('path');
var dbutils = require("./dbutils");

//直接去文件中读取
exports.getAllFiles = function(stuName,cb){

    var filesNum = [];

    // console.log('./upload/'+stuName);

    fs.readdir('./upload/'+stuName,function(err,files){

        // console.log(stuName);

       (function iterator(i){
           if(i == files.length){
                // console.log(filesNum);
                cb(filesNum);
                return;
            }
            fs.stat('./upload/'+stuName+'/'+files[i],function(err,stats){

               var extName = path.extname(files[i]);
               getMimeType(extName,function(mimeType){

                   //如果是图片
                   if(/^(image\/)/.test(mimeType) && stats.isFile()){
                       filesNum.push(files[i]);
                   }

                   iterator(++i);
               });

            });
        })(0);

    });
};

function getMimeType(extName,cb){
   fs.readFile('./libs/mime.json',function(err,data){
       if(err)
           throw err;
       cb(JSON.parse(data)[extName]);
   });
}

//去数据库中读取
exports.getAllFilesFromDB = function(stuName,cb){
    dbutils.query("img",{folderOwner:stuName},10,1,{"upload_time":-1},cb);
};