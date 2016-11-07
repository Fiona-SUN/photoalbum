/**
 * Created by FIONA on 2016/10/26/026.
 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var router = require('./controller/router');

app.use(express.static('public'));
app.use('/pics',express.static('upload'));

app.set('view engine','jade');
app.set('views','./views/pages');
app.locals.pretty = true;

app.get('/favicon.ico',function(req,res){
    return;
});
app.get('/index.js.map',function(req,res){
    return;
});

//主页显示所有的文件夹
app.get('/',router.showAllFolders);

//上传页面
app.get('/upload',router.showUploadPage);

//新建文件夹页面
app.get('/newFolder',router.showNewFolderPage);

//新建文件夹页面逻辑处理
app.post('/new',router.createNewFolder);

//某文件夹内容展示（图片展示
app.get('/:stuName',router.showAllFiles);

//上传图片的逻辑处理
app.post('/:stuName/new',router.uploadPics);

//删除文件夹
app.post('/:stuName/remove',router.removeFolder);

//文件夹重命名页面展示
app.get('/:stuName/rename',router.showRenamePage);

//文件夹重命名页面逻辑处理
app.post('/:stuName/rename',router.renameFolder);

//展示某张图片
app.get('/:stuName/:pic',router.showAllPics);

//删除某张图片
app.get('/:stuName/:pic/del',router.delPic);

//展示评论
app.get('/:stuName/:pic/showComment',router.showComment);

//发表评论
app.post('/:stuName/:pic/comment',router.postComment);

app.use(router.showNoFound);


app.listen(3000);