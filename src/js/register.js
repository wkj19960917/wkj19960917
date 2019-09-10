$(document).ready(function(){
    // 给文本框添加点击事件
    $('.pwshow').on('click',function(){
        $(this).css('display','none')
        $(this).next().css('display','inline-block').focus()
        $(this).parent().addClass('onfocus')
    })


    // 表单验证-------------------------------------------------------------------------------------------
    const $t_phone=$('.t_phone')
    const $password=$('.password')
    const $repeat=$('.repeat')
    const $name=$("input[name='truename']")
    const $idnumber=$("input[name='idnumber']")
    const $aspan=$('.ihint')
    const $list=$('.pwLv li')

    let telflag = true;
    let passflag = true;
    let repassflag = true;
    let nameflag=true;
    let cartflag = true;
    //手机号码：
    $t_phone.focus(function(){
        if (this.value === '') {
            telflag = false;
        }
    })
    $t_phone.blur(function(){
        if (this.value !== '') {
            let tel = /^1[34578]\d{9}$/; //规则
            if (tel.test(this.value)) {
                // $aspan.eq(0).html('此账号可用').addClass('ihint_pass').css({"display":"block"})
                $.ajax({
                    url:'http://10.31.157.48/html5-1907/dierjieduan/day33/php/register.php',
                    data:{
                        checkname:$t_phone.val()
                    }
                }).done(function(d){
                    if(!d){
                        $aspan.eq(0).html('此账号可用').addClass('ihint_pass').css({"display":"block"})
                        telflag = true;
                    }else{
                        $aspan.eq(0).html('手机号已注册').addClass('ihint_error').css({"display":"block"});
                        telflag = false;
                    }
                })
                
            } else {
                $aspan.eq(0).html('手机号格式不正确').addClass('ihint_error').css({"display":"block"});
                telflag = false;
            }
        } else {
            $aspan.eq(0).html('不能为空').addClass('ihint_error').css({"display":"block"});
            telflag = false;
        }

       
    })


    //密码强度(1种字符：弱   2种-3种字符：中   4种字符：强)
        //数字  大写字母  小写字符   特殊字符
        $password.focus(function(){
            if (this.value === '') {
                passflag = false;
            }
        })
        $password.on('input',function(){
            let num = 0; //记录字符串中字符的种类
            let numreg = /\d+/;
            let uppercase = /[A-Z]+/;
            let lowercase = /[a-z]+/;
            let othercase = /[\W\_]+/;
            if (numreg.test(this.value)) {
                num++;
            }
            if (uppercase.test(this.value)) {
                num++;
            }
            if (lowercase.test(this.value)) {
                num++;
            }
            if (othercase.test(this.value)) {
                num++;
            }

            switch (num) {
                case 1:
                    $list.eq(0).addClass('cur').siblings().removeClass('cur').parent().css({'display':'block'})
                    passflag = false;
                    break;
                case 2:
                case 3:
                $list.eq(1).addClass('cur').siblings().removeClass('cur').parent().css({'display':'block'})
                    passflag = true;
                    break;
                case 4:
                $list.eq(2).addClass('cur').siblings().removeClass('cur').parent().css({'display':'block'})
                    passflag = true;
                    break;

            }
            if (this.value !== '') { //不为空
                if (this.value.length >= 8 && this.value.length <= 16) { //长度
                    if (passflag) {
                        $aspan.eq(1).css({"display":"none"});
                        passflag = true;
                    } else {
                        $aspan.eq(1).html('密码必须包含大写字母、小写字母、数字、符号至少3种').addClass('ihint_error').css({"display":"block"});
                       
                        passflag = false;
                    }
                } else {
                    $aspan.eq(1).html('密码长度必须在8-16个字符之间').addClass('ihint_error').css({"display":"block"});
                    
                }

            } else {
                $aspan.eq(1).html('不能为空').addClass('ihint_error').css({"display":"block"});
            }
        })
        $password.blur(function(){
            if (this.value.length==0){
                $aspan.eq(1).html('不能为空').addClass('ihint_error').css({"display":"block"});
            }
        })

        //密码重复
        $repeat.focus(function () {
            if (this.value === '') {
                repassflag = false;
            }
        })  

        $repeat.blur(function () {
            if (this.value !== '') {
                if ($(this).val() == $password.val()) {
                    $aspan.eq(2).css({"display":"none"});
                    repassflag = true;
                } else {
                    $aspan.eq(2).html('两次输入的密码不一致').addClass('ihint_error').css({"display":"block"});
                    repassflag = false;
                }
            } else {
                $aspan.eq(2).html('不能为空').addClass('ihint_error').css({"display":"block"});
                repassflag = false;
            }

        }) 

        // 验证名字
        $name.focus(function () {
            if (this.value === '') {
                nameflag = false;
            }
        })

        $name.blur(function(){
            let namezz = /^[\u4e00-\u9fa5]{2,4}$/;
            if(this.value!==''){
                if (namezz.test(this.value)) {
                    $aspan.eq(3).css({"display":"none"});
                    nameflag = true;
                }else{
                    $aspan.eq(3).html('真实姓名格式不对').addClass('ihint_error').css({"display":"block"});
                    nameflag = false;
                }
            }else{
                $aspan.eq(3).html('不能为空').addClass('ihint_error').css({"display":"block"});
                    nameflag = false;
            }
            
        })

        // 身份证验证
        $idnumber.focus(function () {
            if (this.value === '') {
                cartflag = false;
            }
        }) ;
        $idnumber.blur(function () {
            if (this.value !== '') {
                let cartid = /^\d{6}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])\d{3}[\dXx]$/; //规则
                if (cartid.test(this.value)) {
                    $aspan.eq(4).css({'display':'none'})
                    cartflag = true;
                } else {
                    $aspan.eq(4).html('身份证格式不对').addClass('ihint_error').css({"display":"block"});
                    cartflag = false;
                }
            } else {
                $aspan.eq(4).html('不能为空').addClass('ihint_error').css({"display":"block"});
                cartflag = false;
            }
        }) 

        // 点击免费注册
        // const $regbtn=$('.rbtn_s1')
        console.log($('form'))
        $('form').on('submit',function(){
            if ($t_phone.val() === '') {
                $aspan.eq(0).html('不能为空').addClass('ihint_error').css({"display":"block"});
                telflag = false;
            }

            if ($password.val() === '') {
                $aspan.eq(1).html('不能为空').addClass('ihint_error').css({"display":"block"});
                passflag = false;
            }

            if ($repeat.val() === '') {
                $aspan.eq(2).html('不能为空').addClass('ihint_error').css({"display":"block"});
                repassflag = false;
            }

            if ($name.val() === '') {
                $aspan.eq(3).html('不能为空').addClass('ihint_error').css({"display":"block"});
                nameflag = false;
            }

            if ($idnumber.val() === '') {
                $aspan.eq(4).html('不能为空').addClass('ihint_error').css({"display":"block"});
                cartflag = false;
            }

            if (!telflag || !passflag || !repassflag || !nameflag || !cartflag) { //阻止
                return false;
                
            }
            console.log(1)
        })
        
        // 
        
        
    })