$(document).ready(function(){
    // 头部购物车悬停事件
    $('.header-gwc').hover(function(){
        $('.car_list').stop().animate({height:104})
    },function(){
        $('.car_list').stop().animate({height:0})
    });   
    // 二级导航
    var a=0
    $('.all_wares li').hover(function(){
        a=$(this).find('dl').height()
        $(this).find('dl').show()
        $(this).find('dl').css('height','0')
        $(this).find('dl').stop().animate({height:a})
    },function(){
        $(this).find('dl').hide()
    })

    //返回顶部
    $('.go_top').on('click',function(){
        $('html,body').animate({
            scrollTop:0
        })
    })
})