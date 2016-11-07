/**
 * Created by FIONA on 2016/10/28/028.
 */

var fs = require('fs');

exports.createFolder = function(folder_name,cb){

    var flag = 0;

    //相册名称不能为空
    if(folder_name == ""){
        flag = -1;
        cb(flag);
        return;
    }

    fs.readdir('./upload',function(err,files){

        for(var i=0;i<files.length;i++){
            //相册是否已经存在
            if(files[i] == folder_name){
                flag = 1;
                break;
            }
        }
        //成功
        if(i == files.length){
            flag = 0;
            fs.mkdir('./upload/'+folder_name);
        }
        cb(flag);

    });

};