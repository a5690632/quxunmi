var _Height = $(window).height();
var _Width = $(window).width();
var _top = parseInt(_Height/2) - 250;
var _left = parseInt(_Width/2) - 225;
var uid = localStorage.getItem("uid");
var mobile = localStorage.getItem("mobile");
var goods_id = $("h4").attr("goods_id");

$(document).on("click",'.login',function(e){
    openLoginbox(e);
})
$(document).on("click",'.register',function(e){
    openRegsiterbox(e);
})
$(document).on('click', '.bg', function(e){
    if($(e.target).attr('class') === 'bg'){
        $('.bg').hide();
    }
})

$('.register-submit').click(function(e){
    $('.error').hide();
    $('.success').hide();
    e.preventDefault();
    var mobile = $('input[name=phonenumber]').val();
    var passwd = $('input[name=password]').val();

    if(mobile == ''){
        $('.error').text('请输入手机号').show();
        return;
    }
    if (isPhoneNo($.trim(mobile)) == false) {
        $('.error').text("手机号码不正确").show();
        return;
    }
    if(passwd == ''){
        $('.error').text('密码不能为空').show();
        return;
    }
    $.ajax({
        type : 'POST',
        url : 'http://www.liaodede.com/php/reg.php',
        dataType: "jsonp",
        data : {
            mobile : mobile,
            passwd : passwd
        },
        success : function(res){
            var uid = res.data.uid ;
            if(res.error_code == 1){
                $('.error').text(res.msg);
                $('.error').show();
            }else if(res.error_code == 0){               
                $(".box").hide();
                $(".bg").hide();
                $(".user").html('');
                $(".user").append('<span>'+mobile+'，<a href="" class="logout">退出</a></span>');
                // localStorage.setItem("uidreg", uid);
                localStorage.setItem("uid", uid);
                localStorage.setItem("mobile",mobile);
            }
        }
    })
});

$('.login-submit').click(function(e){
    $('.error').hide();
    $('.success').hide();
    e.preventDefault();
    var mobile = $('input[name=phonenumberLogin]').val();
    var passwd = $('input[name=passwordLogin]').val();

    if(mobile == ''){
        $('.error').text('请输入手机号').show();
        return;
    }
    if(passwd == ''){
        $('.error').text('密码不能为空').show();
        return;
    }
    $.ajax({
        type : 'POST',
        url : 'http://www.liaodede.com/php/login.php',
        dataType: "jsonp",
        data : {
            mobile : mobile,
            passwd : passwd
        },
        success : function(res){  
            var uid = res.data.uid ;                   
            if(res.error_code == 1){
                    $('.error').show();
                    $('.error').text(res.msg);
                    $('.error').show();
                }else if(res.error_code == 0){
                    $(".box").hide();
                    $(".bg").hide();
                    $(".user").html('');
                    $(".user").append('<span>'+mobile+'，<a href="" class="logout">退出</a></span>');
                    localStorage.setItem("uid", uid);
                    localStorage.setItem("mobile",mobile);
                }
            }
    })
});

$('.pay-btn').click(function(e) {
    var uid = localStorage.getItem("uid");
    if(uid){
        goodsverify(); 
    }else{
        openLoginbox(e);
    }      
});

$('.regsiter-m').click(function(e) {
    openRegsiterbox(e);
});
$('.login-m').click(function(e) {
    openLoginbox(e);
});

$(document).on("click",'.logout',function(){
    // localStorage.clear();
    localStorage.removeItem('mobile');
    localStorage.removeItem('uid');
    $(".user").html('<span><a href="javascript:;" class="login">登录</a></span> <span> | </span><span><a href="javascript:;" class="register">注册</a></span>');
    return false;
});


function openLoginbox(e){
    e.preventDefault();
    openPop();
    $('.register-box').hide();
    $('.login-box').show();
    
}
function openRegsiterbox(e){
    e.preventDefault();
    openPop();
    $('.login-box').hide();
    $('.register-box').show(); 
}
function openPop() {
    $('.box').show();
    $('.bg').css('height' , _Height + 'px').show();
    $('.box').css({'top': _top + 'px', 'left': _left + 'px'});
    $('.pay-box').hide();
    $('.error').hide();
}
function isPhoneNo(phone) {
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test(phone);
}
function isLogin(){
    if(mobile){
        $(".user").html('');
        $(".user").append('<span>'+mobile+'，<a href="" class="logout">退出</a></span>');
    }
}
isLogin();

function goodsverify(){
    var uid = localStorage.getItem("uid");
    $.ajax({
    type : 'POST',
    url : '',
    dataType: "jsonp",
    data : {
        uid,
        goods_id
    },
    success : function(res){                           
        if(res.error_code == 1){
            }else if(res.error_code == 0){
                if(res.data.isOwn == 0){
                    window.location = res.data.buyUrl;
                }else{
                    $('.pay-btn').hide();
                    $('.hide').show();
                }
            }
        }
    })  
}

// var wait = 60;
// function time(o){
//     if(wait == 0){
//         $(o).attr('disabled',false);
//         $(o).removeClass('ldd-verifybtn-disabled');
//         $(o).text("发送验证码");
//         wait = 60;
//     }else{
//         $(o).text(wait + 'S');
//         $(o).addClass('ldd-verifybtn-disabled');
//         $(o).attr('disabled',true);
//         wait--;
//         setTimeout(function () {
//             time(o);
//         },1000);
//     }
// }
// $('.ldd-verifybtn').click(function(e){
//     $('.error').hide();
//     $('.success').hide();
//     e.preventDefault();
//     var mobile = $('input[name=phonenumber]').val();
//     if(mobile == ''){
//         $('.error').text('请输入手机号').show();
//         return;
//     }
//     time(this);
//     $.ajax({
//         type : 'GET',
//         url : '/sms.php',
//         data : {
//             method : 'getVerifyCode',
//             mobile : mobile
//         },
//         success: function(res){
//             if(res.errorCode != 0){
//                 $('.error').text(res.errorMsg);
//                 $('.erroe').show();
//             }else{
//                 $('.success').text(res.errorMsg).show();
//             }
//         }
//     })
// });



    


