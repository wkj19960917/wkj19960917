$(document).ready(function(){

const $username=$('#user');
const $password=$('#passwd');
const $userlogin=$('.userlogin');
const $login=$('#normaldl');


$login.on('click',function(){
    console.log($password.val())
    $.ajax({
        type:'POST',
        url:'http://10.31.157.48/html5-1907/dierjieduan/day33/php/login.php',
        data:{
            user:$username.val(),
            pass:$password.val()
        }
    }).done(function(d){
        if(!d){
            alert('用户名和密码错误');
        }else{
            alert('欢迎'+$username.val()+'!')
            $userlogin.find('em a').html('欢迎'+$username.val()+'!');
            $('.WM_LoginBox').css({'display':'none'})
            $userlogin.find('strong').css({'display':'none'})
            // localStorage.setItem('customname',$username.value);
            // alert('欢迎'+$username.val()+'登录');
        }
    });
})

})