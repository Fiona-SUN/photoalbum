/**
 * Created by FIONA on 2016/10/30/030.
 */

var fs = require('fs');
var dbutils = require("./dbutils");

exports.delPic = function(stuName,pic,cb){
    var flag = 0;
    var url = './upload/'+stuName+'/'+pic;

    fs.unlink(url,function(err){
       if(err){
           flag = -1;
           console.log(err);
       }else{
           flag = 0;
           dbutils.remove('img',{folderOwner:stuName,photoTitle:pic},function (err,result) {
               if(err){
                   console.log(err);
               }
               dbutils.remove('comment',{stuName:stuName,pic:pic},function(err,result){
                   if(err){
                       console.log(err);
                   }
               })
           })
       }
       cb(flag);
    });
};