/**
 * Created by FIONA on 2016/10/26/026.
 */

var fs = require('fs');

exports.getAllFolders = function(cb){

    var folders = [];

    fs.readdir('./upload',function(err,files){

        // console.log(files);

        //考虑到异步以及要获取最终值
        (function iterator(i){
            if( i == files.length){
                cb(folders);
                return;
            }
            fs.stat('./upload/'+files[i],function(err,stats){
                if(stats.isDirectory()){
                    folders.push(files[i]);
                }
                iterator(++i);
            });
        })(0);

    });

};