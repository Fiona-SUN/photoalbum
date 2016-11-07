/**
 * Created by FIONA on 2016/10/26/026.
 */

var folderMgr = require('../model/folderMgr');
var fileMgr = require('../model/fileMgr');
var uploadPicMgr = require('../model/uploadPicMgr');
var newFolderMgr = require('../model/newFolderMgr');
var removeFolderMgr = require('../model/removeFolderMgr');
var renameFolderMgr = require('../model/renameFolderMgr');
var delPicMgr = require('../model/delPicMgr');
var dbutils = require('../model/dbutils');
var sd = require('silly-datetime');

//主页
var showAllFolders = function(req,res){
    folderMgr.getAllFolders(function(folders){
        res.render('show_all_folders',{titleContent:'同学聚会相册',folders:folders});
    });
};

//xxx的相册页面
var showAllFiles = function(req,res){
    var stuName = req.params.stuName;

    // fileMgr.getAllFiles(stuName,function(filesNum){
    //     res.render('show_all_files',{titleContent:stuName+'的相册',stuName:stuName,filesNum:filesNum});
    // });

    fileMgr.getAllFilesFromDB(stuName,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.render('show_all_files',{titleContent:stuName+'的相册',stuName:stuName,filesNum:result});
    });
};

//XXX的相册页面的xxx图片
var showAllPics = function(req,res){
    var stuName = req.params.stuName;
    var pic = req.params.pic;

    dbutils.query('comment',{stuName:stuName,pic:pic},10,1,{upload_time:-1},function(err,result){
        if(err){
            console.log(err);
        }
        res.render('show_all_pics',{titleContent:stuName+"相册的"+pic,stuName:stuName,pic:pic,comments:result});
    });

};

//上传照片页面展示
var showUploadPage = function(req,res){
    folderMgr.getAllFolders(function(folders){
        res.render('upload_pic',{titleContent:'上传照片',folders:folders})
    });
};

//上传照片逻辑处理
var uploadPics = function(req,res){
    uploadPicMgr.saveUploadPics(req,res);
};

//新建相册页面展示
var showNewFolderPage = function(req,res){
    res.render('show_new_folder',{titleContent:'新建相册'});
};

//新建相册逻辑处理
var createNewFolder = function(req,res){

    var folder_name = req.body.folder_name;
    newFolderMgr.createFolder(folder_name,function(flag){
        if(flag == -1){
            res.send({flag:flag,msg:"创建失败:相册名称不能为空!"});
        }
        else if(flag == 1){
            res.send({flag:flag,msg:"创建失败:相册已存在!"})
        }
        else{
            res.send({flag:flag,msg:"新建相册成功!"})
        }
    });
};

//删除相册
var removeFolder = function(req,res){
    var folder_name = req.body.folder;
    // console.log(folder_name);
    removeFolderMgr.removeFloder(folder_name,function(flag){
        if(flag == 0){
            res.send({flag:flag,msg:"相册删除成功!"});
        }
        else {
            res.send({flag:flag,msg:"相册中存在图片，不能删除该相册!"});
        }

    });
};

//相册重命名页面
var showRenamePage = function(req,res){
    var folder_name = req.params.stuName;
    res.render('show_rename_folder',{titleContent:'相册重命名',stuName:folder_name});
};

//相册重命名页面逻辑处理
var renameFolder = function(req,res){
    var stuName = req.body.stuName;
    var newName = req.body.newName;

    renameFolderMgr.renameFolder(stuName,newName,function(flag){
        if(flag == 0){
            res.send({flag:flag,msg:"相册重命名成功!"});
        }
        else{
            res.send({flag:flag,msg:"相册重命名失败!"});
        }
    });
};

//删除图片
var delPic = function(req,res){
    var stuName = req.params.stuName;
    var pic = req.params.pic;

    delPicMgr.delPic(stuName,pic,function(flag){
        if(flag == 0){
            res.send({flag:flag,msg:"删除图片成功!"});
        }
        else{
            res.send({flag:flag,msg:"删除图片失败!"});
        }
    });

};

//发表评论
var postComment = function(req,res){
    var user = req.body.user;
    var comment = req.body.comment;
    var stuName = req.params.stuName;
    var pic = req.params.pic;
    var flag = 0;
    var msg = user+"对图片"+pic+"评论成功!";
    var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');


    if(user == ""){
        flag = -1;
        res.send({flag:flag,msg:"点评者不能为空"});
    }
    else if(comment == ""){
        flag = -1;
        res.send({flag:flag,msg:"评论不能为空"});
    }
    else{
        dbutils.insertOne('comment',{stuName:stuName,pic:pic,user:user,comment:comment,upload_time:time},function (err,result) {
            if(err){
                flag = -1;
                console.log(err);
                res.send({flag:flag,msg:err});
            }
            else{
                flag = 0;
                res.send({flag:flag,msg:msg});
            }
        });
    }

};

//展示评论
var showComment = function(req,res){

    var stuName = req.params.stuName;
    var pic = req.params.pic;

    dbutils.query('comment',{stuName:stuName,pic:pic},10,1,{upload_time:-1},function(err,result){
        if(err){
            console.log(err);
        }
        res.send(result);
    })

};

//404页面
var showNotFound = function(req,res){
    res.render('404',{titleContent:'页面资源未找到'})
};


exports.showAllFolders = showAllFolders;
exports.showAllFiles = showAllFiles;
exports.showAllPics = showAllPics;
exports.showUploadPage = showUploadPage;
exports.uploadPics = uploadPics;
exports.showNewFolderPage = showNewFolderPage;
exports.createNewFolder = createNewFolder;
exports.showRenamePage = showRenamePage;
exports.removeFolder = removeFolder;
exports.renameFolder = renameFolder;
exports.delPic = delPic;
exports.postComment = postComment;
exports.showComment = showComment;
exports.showNoFound = showNotFound;