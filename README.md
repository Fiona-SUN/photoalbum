#photoalbum
`这是一个使用nodejs、express框架、jade后台模板、部分underscore前台模板，使用json进行前后台通讯，前后台使用ajax进行交互，局部页面刷新，数据库使用mongodb进行存储数据`

photoalbum这个项目主要是存在的业务有： 

+ 相册的增删改查（相册是使用nodejs的fileSystem模块进行操作）
+ 照片的增删查（照片信息存于数据库）
+ 评论的增查（评论存于数据库）
+ 注重兼容浏览器使用了bootsrap框架进行编写前台页面，以及注重注释的编写。

页面存在一些bug，待修复。。（之后会慢慢改
1，页面布局存在一些小问题
2，错误的处理
3，一些表单的验证要配合正则表达式进行验证
4，underscore的循环使用（一直报错。。后修改了一种方式）

由于涉及到后台，就没法贴链接供预览。
（存储的数据也一起放在了仓库里面，命名为mydb的文件夹）

贴上截图：

 + 相册主页
    
![相册主页](https://Fiona-SUN.github.io/photos/photoalbum_home.png)

 + XX同学的相片页面
    
![XX同学的相片页面](https://Fiona-SUN.github.io/photos/photoalbum_photos.png)

 + XX同学的XX照片的页面
    
![XX同学的XX照片的页面](https://Fiona-SUN.github.io/photos/photoalbum_comments.png)

 + 新建相册的页面
    
![新建相册](https://Fiona-SUN.github.io/photos/photoalbum_newfolder.png)

 + 上传照片的页面
    
![上传照片](https://Fiona-SUN.github.io/photos/photoalbum_postphoto.png)


>post in 2016/11/7
