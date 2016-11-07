/**
 * Created by FIONA on 2016/10/27/027.
 */

$(function(){
    //在上传照片的页面点击上传照片
    $("#postPho").on('click',postPhoto);

    //在新建相册的页面上点击新建相册
    $("#newFolder").on('click',newPhoFolder);

    //删除相册
    $("#remove_folder").on('click',removeFolder);

    //相册重命名
    $("#rename_folder").on('click',renameFolder);

    //删除图片
    $(".close-pho").on('click',delPic);

    //发表评论
    $("#post_comment").on('click',postComment);

    //动态清空所有评论
    $("#clear_comment").on('click',clearComment);

    //动态加载所有的评论
    $("#load_comment").on('click',loadComment);

});

//上传照片
function postPhoto(){
    var stuName = $("#stuName").val();
    var upload_pic = $("#upload_pic").val();
    var desc = $("#desc").val();

    var url = '/'+stuName+'/new';

    //- $("#postForm").attr("action",url).submit();

    if(stuName == -1){
        $("#postInfoContent").text("未选择存放新照片的相册!");
        return;
    }
    else if(desc == ""){
        $("#postInfoContent").text("请填写照片描述!");
        return;
    }
    else if(upload_pic == ""){
        $("#postInfoContent").text("未上传任何文件!");
        return;
    }

    var formData = new FormData($("#postForm")[0]);

    $.ajax({
        url:url,
        type:'post',
        data:formData,
        //- 使用data对参数进行序列化处理，默认true
        processData: false,
        //- 发送到服务器的编码内容，默认是application/x-www-form-urlencoded
        contentType: false,
        success:function(data){
            //console.log(data);
            $("#postInfoContent").text(data);
        }
    });
}

//新建相册
function newPhoFolder(){
    var folder_name = $("#folder_name").val();

    $.post('/new',{folder_name:folder_name},function(data){
        var msg = data.msg;
        var flag = data.flag;

        $("#newInfoContent").text(msg);

        //点击新建相册后弹出的模态框后点击关闭模态框
        // $(".close-modal").on('click',function(){
        //     refreshWin(flag);
        // });

    });
}

//删除相册
function removeFolder(){
    var folder = $(".stuName").data('name');
    $.post('/'+folder+'/remove',{folder:folder},function(data){
        //console.log(data);
        var msg = data.msg;
        var flag = data.flag;

        $("#removeInfoContent").text(msg);

        //关闭模态框后返回主页
        $(".close-modal").on('click',function(){
            if(flag == 0){
                location.replace('/');
            }
            $('#removeInfo').modal('hide');
        });
    })
}



//点击关闭模态框后刷新页面
function refreshWin(flag){
    if(flag == 0){
        location.reload();
    }

    $('#newInfo').modal('hide');
}

//相册重命名
function renameFolder(){

    var stuName = $("#stu_name").html();
    var newName = $("#folder_name").val();
    var url = '/'+stuName+'/rename';


    $.post(url,{stuName:stuName,newName:newName},function(data){
        var flag = data.flag;
        var msg = data.msg;

        $("#renameInfoContent").text(msg);

        //点击关闭模态框后返回主页
        $(".close-modal").on('click',function(){
            if(flag == 0){
                location.replace('/');
            }
            $('#renameInfo').modal('hide');
        });
    });

}

//删除图片
function delPic(event){
    // stopPropagation(event);
    // console.log($(this).data('img'));

    var img_url = $(this).data('img');

    $.get(img_url+'/del',null,function(data){
        var flag = data.flag;
        var msg = data.msg;

        $("#removeInfoContent").text(msg);
        //关闭模态框后返回主页
        $(".close-modal").on('click',function(){
            if(flag == 0){
                location.reload();
            }
            $('#removeInfo').modal('hide');
        });

    });
}

//发表评论
function postComment(){
    var loc = $(this).data("location");
    var user = $("#user").val();
    var comment = $("#comment").val();

    var url = loc+'/comment';

    console.log(user);
    if(user == ""){
        $('#fail_part').html('评论失败：点评者不能为空').fadeIn(1000).fadeOut(3000);
    }
    else if(comment == ""){
        $('#fail_part').html('评论失败：评论内容不能为空').fadeIn(1000).fadeOut(3000);
    }
    else{
        $.post(url,{user:user,comment:comment},function(data){
            var flag = data.flag;
            var msg = data.msg;
            if(flag == -1){
                $('#fail_part').html('评论失败：'+msg).fadeIn(1000).fadeOut(3000);
            }
            else{
                $('#success_part').html('评论成功：'+msg).fadeIn(1000).fadeOut(3000);

                // var content ='<div class="list-group-item col-sm-10 col-sm-offset-1"> <p class="list-group-item-text pull-right">'+
                //     getTime() + '</p> <h4 class="list-group-item-heading">'+
                //     user+'</h4> <p class="list-group-item-text">'+
                //     comment+'</p> </div>';
                // $('#comment_part').prepend(content);

                var compiled =_.template($("#tep").html());
                var output= compiled({time:getTime(),user:user,comment:comment});
                $("#comment_part").html(output);
            }

        });
    }

}

//动态清空所有评论
function clearComment(){
    $("#comment_part").empty();
}

//动态加载所有的评论
function loadComment(){

    var loc = $("#post_comment").data("location");
    var url = loc+'/showComment';

    $.get(url,function(data){

        var compiled = _.template($("#tep").html());
        var output = "";
        for(var i=0;i<data.length;i++){
            output += compiled(data[i]);
        }
        console.log(output);
        $("#comment_part").html(output);

        // var output = data;
        // var compile = _.template($("#tep").html());
        // var output = compile(data);
        // $("#comment_part").html(output);
         // $("#comment_part").html( _.template($('#tep').html(), output));

    });
}

//时间格式化
function getTime(){
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }

    var newDate = year+'-'+month+'-'+day+' '+hours+":"+minutes;
    return newDate;
}

//阻止冒泡
function stopPropagation(event){

    if(event&&event.stopPropagation){
        event.stopPropagation();
    }
    else{
        window.event.cancelBubble = true;
    }

}