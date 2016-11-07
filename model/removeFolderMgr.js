/**
 * Created by FIONA on 2016/10/28/028.
 */

var fs = require("fs");

exports.removeFloder = function(folder_name,cb){
    var flag = 0;
    fs.rmdir('./upload/'+folder_name,function(err){
        if(err){
            // console.log(err);
            if(err.errno == "-4051"){
                // console.log("wrong!");
                flag = -1;
                cb(flag);
            }
        }else{
            flag = 0;
            cb(flag);
        }

    });
};