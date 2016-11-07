/**
 * Created by FIONA on 2016/10/30/030.
 */

var fs = require('fs');

exports.renameFolder = function(stuName,newName,cb){

    var oldPath = './upload/'+stuName;
    var newPath = './upload/'+newName;
    var flag = 0;

    fs.rename(oldPath,newPath,function(err){
       if(err){
           flag = -1;
           // throw err;
       }
       else{
           flag = 0;
       }
        cb(flag);
    });

};