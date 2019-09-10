
!function ($) {

    function addcookie(key, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
    }

    function getcookie(key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    }

    function delcookie(key) {
        addcookie(key, '', -1);
    }

    function goodslist(id, count) {
        $.ajax({
            url: 'http://10.31.157.48/html5-1907/dierjieduan/day33/php/piclist.php',//获取所有的接口数据
            dataType: 'json'
        }).done(function (data) {

            var $htmlsrc = '';
            $.each(data, function (index, value) {

                if (id == value.sid) {//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                    // console.log(value)
                    $htmlsrc += `<tr>
                        <td class="state">
                            <span class="checkbox">
                                <input type="checkbox" checked="checked">
                                <label class="curr""></label>
                            </span>
                        </td>
                        <td>
                            <dl class="clear">
                                <dt class="left"><a href="/product/462" target="_blank"><img src="${value.url}" alt="" ></a></dt>
                                <dd class="left">
                                    <h1 class="clear">
                                        <a href="/product/462" class="name ellipsis2" target="_blank" >${value.titile}</a>
                                    </h1>
                                        <p class="ellipsis2" title="款式:Arctis 3;颜色:黑色">款式:Arctis 3;颜色:黑色</p>
                                </dd>
                            </dl>
                        </td>
                        <td>
                            <span sid="${value.sid}" danprice="${value.price}" class="amount number-input"><span class="reduce disable"></span><input id="num_462_1164" name="num_462_1164" data-pid="462_1164" type="text" value="${count}" min="1" data-stock="50" data-suit-number="1" maxlength="3" autocomplete="off"><span class="plus"></span></span>
                                <p class="stock">库存<font>50</font>件</p>
                        </td>
                        <td class="price">¥<font id="rmbPrice_462_1164">${(value.price * count).toFixed(2)}</font></td>
                        <td><a href="javascript:void(0)" class="del" data-pid="462_1164"><span></span></a></td>
                    </tr>`
                    
                    //计算每个商品的价格。
                    $('.cart_list').css('display', 'block');
                    

                }
            });

            $('tbody').append($htmlsrc)
            priceall();//计算总价的
        })
        $.ajax({
            url: 'http://10.31.157.48/html5-1907/dierjieduan/day33/php/piclist1.php',//获取所有的接口数据
            dataType: 'json'
        }).done(function (data) {

            var $htmlsrc = '';
            $.each(data, function (index, value) {

                if (id == value.sid) {//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                    // console.log(value)
                    $htmlsrc += `<tr>
                        <td class="state">
                            <span class="checkbox">
                                <input type="checkbox" checked="checked">
                                <label class="curr""></label>
                            </span>
                        </td>
                        <td>
                            <dl class="clear">
                                <dt class="left"><a href="/product/462" target="_blank"><img src="${value.url}" alt="" ></a></dt>
                                <dd class="left">
                                    <h1 class="clear">
                                        <a href="/product/462" class="name ellipsis2" target="_blank" >${value.titile}</a>
                                    </h1>
                                        <p class="ellipsis2" title="款式:Arctis 3;颜色:黑色">款式:Arctis 3;颜色:黑色</p>
                                </dd>
                            </dl>
                        </td>
                        <td>
                            <span sid="${value.sid}" danprice="${value.price}" class="amount number-input"><span class="reduce disable"></span><input id="num_462_1164" name="num_462_1164" data-pid="462_1164" type="text" value="${count}" min="1" data-stock="50" data-suit-number="1" maxlength="3" autocomplete="off"><span class="plus"></span></span>
                                <p class="stock">库存<font>50</font>件</p>
                        </td>
                        <td class="price">¥<font id="rmbPrice_462_1164">${(value.price * count).toFixed(2)}</font></td>
                        <td><a href="javascript:void(0)" class="del" data-pid="462_1164"><span></span></a></td>
                    </tr>`
                    
                    //计算每个商品的价格。
                    $('.cart_list').css('display', 'block');
                    

                }
            });

            $('tbody').append($htmlsrc)
            priceall();//计算总价的
        })
    }
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        var s = getcookie('cookiesid').split(',');//数组sid
        var n = getcookie('cookienum').split(',');//数组num
        $.each(s, function (i, value) {
            goodslist(s[i], n[i]);
        });
    }


    kong();
    function kong() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            $('.cart_null').hide();//cookie存在，购物车有商品，隐藏盒子。
            $('#hidden').hide()
        } else {
            $('.cart_null').show();
            $('.cart_list').css('display', 'none');
            $('#hidden').hide()
        }
    }

    //4.计算总价和总的商品件数，必须是选中的商品。
    function priceall() {
        var $sum = 0;//总价的初始值
        var $count = 0;
        $('tbody tr').each(function (index, element) {
            if ($(element).find('.state input').prop('checked')) {
                $sum += parseFloat($(element).find('.price').find('#rmbPrice_462_1164').html());
                $count += parseInt($(element).find('.number-input').find('#num_462_1164').val());
                
            }
        });

        $('#checkoutNum').html($count);
        $('#checkoutPrice').html($sum.toFixed(2));
    }

    //6.数量的改变
	//改变商品数量++
	$('tbody').on('click','.plus', function() {
        var $count = $(this).parent().find('#num_462_1164').val();
	    $count++;
	    if ($count >= 99) {
	        $count = 99;
	    }
        $(this).parent().find('#num_462_1164').val($count);
	    $(this).parents('tr').find('.price').find('font').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();//重新计算总和。
	    setcookie($(this));//将改变的数量重新添加到cookie
	
	});
	
	//改变商品数量--
	$('tbody').on('click','.reduce', function() {
	    var $count = $(this).parent().find('#num_462_1164').val();
	    $count--;
	    if ($count <= 1) {
	        $count = 1;
	    }
	    $(this).parent().find('#num_462_1164').val($count);
	    $(this).parents('tr').find('.price').find('font').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();
        setcookie($(this));
    });
    
    //7.计算数量改变后单个商品的价格
    function singlegoodsprice(obj) { //obj:当前元素
        var $dj = parseFloat(obj.parent().attr('danprice'));//单价
        var $cnum = parseInt(obj.parent().find('input').val());//数量
        return ($dj * $cnum).toFixed(2);//结果
    }


    $('tbody').on('blur','#num_462_1164',function(){
        var $reg = /^\d+$/g; //只能输入数字
	    var $value = parseInt($(this).val());
	    if ($reg.test($value)) {//是数字
	        if ($value >= 99) {//限定范围
	            $(this).val(99);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {//不是数字
	        $(this).val(1);
	    }
	    $(this).parents('tr').find('.price').find('font').html(singlegoodsprice($(this)));//改变后的价格
	    priceall();
	    setcookie($(this));
    })
    

    //8.将改变后的数量的值存放到cookie
	//点击按钮将商品的数量和id存放cookie中
	var arrsid=[]; //商品的id
	var arrnum=[]; //商品的数量
	//提前获取cookie里面id和num
	function cookietoarray(){
		if(getcookie('cookiesid') && getcookie('cookienum')){
			arrsid=getcookie('cookiesid').split(',');//cookie商品的sid  
			arrnum=getcookie('cookienum').split(',');//cookie商品的num
		}
	}
	function setcookie(obj) { //obj:当前操作的对象
		cookietoarray();//得到数组
	    var $index = obj.parent().attr('sid');//通过id找数量的位置
	    arrnum[$.inArray($index,arrsid)] = obj.parent().find('input').val();
	    addcookie('cookienum', arrnum.toString(), 7);
    }
    
    //9.删除操作
	//删除cookie
	function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
	    var $index = -1;
	    $.each(arrsid,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
	    	if(sid==value){
	    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
	    	}
	    });
	    arrsid.splice($index, 1);//删除数组对应的值
	    arrnum.splice($index, 1);//删除数组对应的值
	    addcookie('cookiesid', arrsid.toString(), 7);//添加cookie
	    addcookie('cookienum', arrnum.toString(), 7);//添加cookie
	}
	
	//删除单个商品的函数(委托)
	$('tbody').on('click', '.del', function(ev) {
		cookietoarray();//得到数组,上面的删除cookie需要。
	    if(confirm('你确定要删除吗？')){
	     	$(this).parent().parent().remove();//通过当前点击的元素找到整个一行列表，删除
	    }
	    delgoodslist($(this).parents('tr').find('td').eq(2).attr('sid'), arrsid);
	    priceall();
	});


	//删除全部商品的函数
	$('.batch-delete').on('click', function() {
		cookietoarray();//得到数组,上面的删除cookie需要。
		if(confirm('你确定要全部删除吗？')){
		    $('tbody tr').each(function() {
		        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
		            $(this).remove();
		            delgoodslist($(this).find('tbody td').eq(2).find('span').attr('sid'), arrsid);
		        }
		    });
		    priceall();
		}
    });
    
    $('.userlogin em a').on('click',function(){
        alert('请到首页登录')
    })
}(jQuery)