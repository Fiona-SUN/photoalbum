/**
 * Created by FIONA on 2016/10/27/027.
 */

var formidable = require('formidable');
var fs = require("fs");
var path = require("path");
var dbutils = require('./dbutils');

exports.saveUploadPics = function(req,res){

    var form = new formidable();

    form.encoding = 'utf-8';
    form.uploadDir = './upload/'+req.params.stuName;
    form.keepExtensions = true;

    form.parse(req,function(err,fields,files){

        var oldPath = files.upload_pic.path;
        var newPath = "";

        fs.readdir('./upload/'+req.params.stuName,function(err,f){

            for(var i =0;i<f.length;i++){
                if(f[i] == files.upload_pic.name){
                    res.send("图片已存在,请修改图片名称");
                    newPath = './transh/'+files.upload_pic.name;
                    fs.rename(oldPath,newPath);
                    break;
                }
            }
            if(i == f.length){

                var extname = path.extname(oldPath);
                getMimeType(extname,function(mimeType){
                    if(/^(image\/)/.test(mimeType)){
                        newPath = './upload/'+req.params.stuName+"/"+files.upload_pic.name;
                        fs.rename(oldPath,newPath);
                        res.send("上传图片成功!");
                        
                        //数据加载到数据库
                        dbutils.insertOne('img',
                            {folderOwner:req.params.stuName,photoTitle:files.upload_pic.name,desc:fields.desc,upload_time:new Date()},
                            function (err,result) {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    // console.log(result);
                                    console.log("数据插入成功");
                                }
                            })
                    }
                    else if(files.upload_pic.name == ""){
                        res.send("没有选择任何图片!");
                        newPath = './transh/empty';
                        fs.rename(oldPath,newPath);
                    }
                    else{
                        res.send("上传的文件不是图片!请重新上传!");
                        newPath = './transh/'+files.upload_pic.name;
                        fs.rename(oldPath,newPath);
                    }
                });

            }

        });


    });

};

function getMimeType(extname,cb){
    fs.readFile('./libs/mime.json',function(err,data){
        if(err)
            throw err;
        cb(JSON.parse(data)[extname]);
    });
}