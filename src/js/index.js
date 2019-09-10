$(document).ready(function(){
    // 轮播图
    class Bannar{
        constructor(){
            this.btns=$('.hd a')
            this.ul=$('.super_slide')
            this.prev=$('.prev span')
            this.next=$('.next span')
            this.time=null;
          
        }
        init(){
            var _this=this
                // 给小圆点加点击事件
            this.index=null;
            this.btns.on('click',function(){
                _this.index=$(this).index()
                _this.change(_this.index)
            })
            // 给左箭头加点击事件
            this.prev.on('click',function(){
                _this.prevchange()
            })
            // 给右箭头添加点击事件
            this.next.on('click',function(){
                _this.nextchange()
            })
            // 添加定时器
            this.time=setInterval(function(){
                    _this.nextchange()
            },4000)

            // 鼠标移入清除定时器
            this.ul.hover(function(){
                clearTimeout(_this.time)
            },function(){
                _this.time=setInterval(function(){
                    _this.nextchange()
            },4000)
            })
        }

        // 给小圆点加运动
        change(ev){
            this.btns.eq(ev).addClass('on').siblings().removeClass('on')
            this.ul.stop().animate({left:-(ev * 1403)})
        }
        // 左箭头点击后运动
        prevchange(){
            this.index--
            if(this.index<0){
                this.index=1
            }
            this.change(this.index)
        }
        // 右箭头点击后运动
        nextchange(){
            this.index++
                if(this.index>1){
                    this.index=0
                }
                this.change(this.index)
        }
    }
    new Bannar().init()

    $('.userlogin em a').on('click',function(){
        $('#accountBox').css({'display':'block'})
    })
    $('.closebox span').on('click',function(){
        $('#accountBox').css({'display':'none'})
    })

    // 数据渲染dota2列表
    $.ajax({
            url: 'http://10.31.157.48/html5-1907/dierjieduan/day33/php/piclist.php',
            dataType: 'json',
        }).done(function(d){
            var $strhtml=`<div class="area_slide dota_slide left in">
            <div class="hd"><a href="javascript:void(0)" class="on"></a></div>
            <div class="bd">
                <div class="tempWrap" style="overflow:hidden; position:relative; width:467px"><ul class="clear" style="width: 467px; left: 0px; position: relative; overflow: hidden; padding: 0px; margin: 0px;">
                    <li style="float: left; width: 467px;"><a href="http://secretshop.dota2.com.cn/product/list?cid=1" target="_blank"><img src="http://img.shop.wanmei.com/upload/moduleScroll/2018-06-11/7cef96d122b64cf7976e4233ef0bbc07.jpg"></a></li>
                </ul></div>
                <a class="prev" href="javascript:void(0)"><span></span></a>
                <a class="next" href="javascript:void(0)"><span></span></a>
            </div>
        </div>`;
            $.each(d,function(index,value){
                $strhtml+=`
                <div class="product-item list in">
                <a href="http://10.31.157.48/html5-1907/dierjieduan/day33/dist/details.html?sid=${value.sid}" target="_blank"><img src="${value.url}" alt="" title="${value.titile}"></a>
                <p class="name ellipsis" title="${value.titile}" style="overflow-wrap: break-worvalue; word-break: break-all;">${value.titile}</p>
                <p class="price">${value.price}
                </p>
            </div>
                `;
            });
            $(".main").html($strhtml);
        })

        // 渲染csgo商品列表
        $.ajax({
            url: 'http://10.31.157.48/html5-1907/dierjieduan/day33/php/piclist1.php',
            dataType: 'json',
        }).done(function(d){
            var $strhtml=`
            <a href="https://shop.csgo.com.cn/" target="_blank" class="left ad in">
                    <img src="http://img.shop.wanmei.com/upload/moduleCover/2017-07-09/7a580e48-595c-4f11-847c-f81e95219bba.jpg" width="226" height="614" alt="">
                </a>
            `;
            $.each(d,function(index,value){
                $strhtml+=`
                <div class="product-item list in">
                    <a href="http://10.31.157.48/html5-1907/dierjieduan/day33/dist/details.html?sid=${value.sid}" target="_blank"><img src="${value.url}" alt="${value.titile}" title="${value.titile}"></a>
                    <p class="name ellipsis" title="${value.titile}" style="overflow-wrap: break-word; word-break: break-all;">${value.titile}</p>
                    <p class="price">¥${value.price}
                    </p>
                </div>
            </div>
                `;
            });
            $("#csgostore").html($strhtml);
        })
    
    
    })