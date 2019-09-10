$(document).ready(function(){


    $('.user-info-btn').on('click',function(){
        alert('请到首页登录')
    })
    // 放大镜效果
    class Bigmirror{
        constructor(){
            this.spic=$('.bd') //小图
            this.sf=$('.sf')//小放
            this.bpic=$('#bpic')//大图
            this.bf=$('#bf')//大放
            this.wrap=$('.tempWrap')
        }
        init(){
            var _this=this
            this.spic.hover(function(){
                $('.sf,#bf').css('visibility', 'visible');
                _this.spic.on('mousemove',function(ev){
                    _this.spicmove(ev);
                })

            },function(){
                $('.sf,#bf').css('visibility', 'hidden');
            })
            this.sf.css({
                width: this.spic.width() * this.bf.width() / this.bpic.width(),
                height: this.spic.height() * this.bf.height() / this.bpic.height(),
            });
            //求比例
            this.bili = this.bpic.width() / this.spic.width();
        }

        spicmove(ev) {
            let l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
            let t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
            if (l < 0) {
                l = 0;
            } else if (l >= this.spic.width() - this.sf.width()) {
                l = this.spic.width() - this.sf.width();
            }
            if (t < 0) {
                t = 0;
            } else if (t >= this.spic.height() - this.sf.height()) {
                t = this.spic.height() - this.sf.height();
            }

            this.sf.css({
                left: l,
                top: t
            });

            this.bpic.css({
                left: -l * this.bili,
                top: -t * this.bili
            })
        }

        

        
    }
    


    // 小图幻灯片+tab切换
    class Tabswitch{
        constructor(){
            this.ul=$('.bd ul');
            this.list=$('.hd li');
            this.bpic=$('.picFocus');
            this.time=null;
        }
        init(){
            this.index=0;
            var _this=this

            // 给小图添加点击事件
            this.list.on('click',function(){
                // 把点击的小图索引存起来
                _this.index=$(this).index()
                
                _this.spic(_this.index)
            })

            // 自动切换
            this.time=setInterval(function(){
                _this.switchauto()
            },2000)

            // 鼠标移入停止自动切换
            this.bpic.hover(function(){
                clearInterval(_this.time)
            },function(){
                _this.time=setInterval(function(){
                    _this.switchauto()
                },2000)
            })
            this.ul.css('width',$('.bd li').width()*$('.hd li').length)
        }

        // 大图与小图对应
        spic(e){
            // 小图加类
            this.list.eq(e).addClass('on').siblings().removeClass('on')

            this.ul.stop().animate({left:-e*430})
            // 将小图地址给放大镜里的图片
            this.url=this.list.eq(e).find('img').attr('src')
            $('#bpic').attr('src',this.url)
        }
        // 自动切换判断
        switchauto(){
            this.index++;
            if(this.index>$('.hd li').length-1){
                this.index=0
            }
            this.spic(this.index)
        }
    }



    // 商品数量加加减减
    class quantity{
        constructor(){
            this.minus=$('.amount .reduce');
            this.add=$('.plus');
            this.textnum=$('#buyNumber');
        }
        init(){
            var _this=this;
            this.num=this.textnum.val()//文本框的值
            // 给-添加点击事件
            this.minus.on('click',function(){
                _this.minusnum();
            })
            // 给+号添加点击事件
            this.add.on('click',function(){
                _this.addnum();
            })
            // 文本框失去焦点，将文本框的值赋值给变量
            this.textnum.blur(function(){
                _this.num=_this.textnum.val()
            })
            
        }
        // 数量减减的方法
        minusnum(){
            
            this.num--
            // 判断文本框值小于0的时候，直接赋值0
            if(this.num<1){
                this.num=1
            }
            this.textnum.val(this.num)
        }
        // 数量加加的方法
        addnum(){
            this.num++
            // 判断文本框值小于0的时候，直接赋值0
            if(this.num>999){
                this.num=999
            }
            this.textnum.val(this.num)
        }
    }
    new  quantity().init()
    
    // 给加入购物车提示框添加关闭效果
    $('.title .close,.btn .continue').on('click',function(){
        $('.boxy_layer').css('visibility', 'hidden')
        $('.boxy-modal-blackout').css('display','none')
    })

    // 加入购物车显示提示框
    $('.btn_addCart').on('click',function(){
        $('.boxy_layer').css('visibility', 'visible')
        $('.boxy-modal-blackout').css('display','block')
    })

    

// 将对应的sid属性商品渲染到详情页------------------------------------------
    let $sid=location.search.substring(1).split('=')[1];

    $.ajax({
        url:'http://10.31.157.48/html5-1907/dierjieduan/day33/php/getdata.php',
        data:{
            sid:$sid
        },
        dataType:'json'
    }).done(function(d){
        let $smallpic= d.urls.split(',')
        $('.title h1').html(d.titile)
        $('.price').html(d.price)

        // 渲染放大镜图片
        let $htmlstr2=`
        <img src="${d.url}" alt="" id="bpic" sid="${d.sid}" style="position: absolute;left: 0px;top: 0px;width: 1000px;height:1000px">
        `
        $('#bf').html($htmlstr2)
        console.log(d)
        let $htmlstr=''
        let $htmlstr1=''
        $.each($smallpic,function(index,value){
            // 渲染列表小图
            console.log(value)
            $htmlstr+=`
            <li class=""><img src="${value}" width="100" height="100" alt=""></li>
            `;
            $('.hd ul').html($htmlstr)
            // 渲染列表小图上方图片
            $htmlstr1+=`
            <li style="float: left; width: 430px;display:list-item"><img src="${value}" width="430" height="430"></li>
            `;
            $('.bd ul').html($htmlstr1)
        })
        $('.hd li:eq(0)').addClass('on')

        new Tabswitch().init()
        new Bigmirror().init()
    })

    $.ajax({
        url:'http://10.31.157.48/html5-1907/dierjieduan/day33/php/getdata1.php',
        data:{
            sid:$sid
        },
        dataType:'json'
    }).done(function(d){
        let $smallpic= d.urls.split(',')
        $('.title h1').html(d.titile)
        $('.price').html(d.price)

        // 渲染放大镜图片
        let $htmlstr2=`
        <img src="${d.url}" alt="" id="bpic" sid="${d.sid}" style="position: absolute;left: 0px;top: 0px;width: 1000px;height:1000px">
        `
        $('#bf').html($htmlstr2)
        let $htmlstr=''
        let $htmlstr1=''
        $.each($smallpic,function(index,value){
            // 渲染列表小图
            $htmlstr+=`
            <li class=""><img src="${value}" width="100" height="100" alt=""></li>
            `;
            $('.hd ul').html($htmlstr)
            // 渲染列表小图上方图片
            $htmlstr1+=`
            <li style="float: left; width: 430px;display:list-item"><img src="${value}" width="430" height="430"></li>
            `;
            $('.bd ul').html($htmlstr1)
        })
        $('.hd li:eq(0)').addClass('on')

        new Tabswitch().init()
        new Bigmirror().init()
    })

    

    // 存 取 删 cookie的对象-------
    var myobj={
        addcookie:function (key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        },
        
        getcookie:function (key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        },
        
        delcookie:function (key) {
            addcookie(key, '', -1);
        }
    }
    
    let sidarr=[]
    let numarr=[]

    function cookietoarr(){
        if(myobj.getcookie('cookiesid')&&myobj.getcookie('cookienum')){
            sidarr= myobj.getcookie('cookiesid').split(',');
            numarr=myobj.getcookie('cookienum').split(',');
        }
       
    }
    // 加入购物车
    $('.add').on('click',function(){
        var $sid=$(this).parents('.wrap').find('#bpic').attr('sid')
        console.log($sid)

        cookietoarr()

        if($.inArray($sid,sidarr)!=-1){
            // 原来cookie中的数量加上现在加的数量
            var num = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('#buyNumber').val());
            //将加起来的数量给数组对应索引的位置    
           numarr[$.inArray($sid, sidarr)] = num;
            //将加起来的数量存入cookie
           myobj.addcookie('cookienum', numarr.toString(), 10);
            
        }else{ //第一次存cookie
            sidarr.push($sid)
            myobj.addcookie('cookiesid',sidarr.toString(),10)
            numarr.push($('#buyNumber').val())
            myobj.addcookie('cookienum',numarr.toString(),10)
        }
    })


})