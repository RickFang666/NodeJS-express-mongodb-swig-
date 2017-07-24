$(function (){
  var $userLogin = $('#user-login');
  var $userRegister = $('#user-register');
  var $userInfo = $('#user-info');

  // 切换到登录
  $userRegister.find('.to-login').on('click',function (e){
    // e.stopPropagation();
    $userRegister.hide();
    $userLogin.show();
  })

  // 切换到注册
  $userLogin.find('.to-register').on('click',function (e){
    // e.stopPropagation();
    $userLogin.hide();
    $userRegister.show();
  })

  // 提交注册
  $userRegister.find('[type="button"]').on('click',function (){
      $.ajax({
        type: 'post',
        url: '/api/user/register',
        data: {
          username: $userRegister.find('[name="username"]').val(),
          password: $userRegister.find('[name="password"]').val(),
          repassword: $userRegister.find('[name="repassword"]').val()
        },
        dataType: 'json',
        success: function (result){
          var message =function (){
              $userRegister.find('.back-prompt').html(result.message);
          }
          switch(result.code){
          case 1:
            message();
            break;
          case 2:
            message();
            break;
          case 3:
            message();
            break;
          case 4:
            message();
            break;
            // 如果注册成功
          default:
            setTimeout(function (){
              $userRegister.hide();
              $userLogin.show();
            }, 1000);
            break;
          }
        }
      })
  })
  $userLogin.find('[type="button"]').on('click',function (){
    $.ajax({
      type:'post',
      url: '/api/user/login',
      data: {
        username: $userLogin.find('[name="username"]').val(),
        password: $userLogin.find('[name="password"]').val()
      },
      dataType:'json',
      success: function (result){
        var message = function (){
         $userLogin.find('.back-prompt').html(result.message);
        }
        switch(result.code){
          case 1:
            message();
            break;
          case 2:
            message();
            break;
          default:
            message();
            setTimeout(function (){
              window.location.reload();
            }, 1000);
            break;
        }
      }
    })
  })
  //退出登录
  $('#logout').on('click',function (){
    $.ajax({
      url:'/api/user/logout',
      success: function (result){
          if(!result.code) {
            window.location.reload();
          }
      }
    })
  })
})
