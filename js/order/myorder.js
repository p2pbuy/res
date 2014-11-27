$(function(){
	//搜索订单
	$('[action-type=searchOrder]').blur(function(){
		$.ajax({
			url : "/aj/order/getorderinfobyboids?boids=" + $('[action-type=searchOrder]').val(),
			cache : false,
			success: function(json){
				json = eval('(' + json + ')');;
				if(json.code == 100000){
					var _html = '';
					obj = json.data;
					var _img = '';
					var _checked = '';
					for( var i in obj){
						if(obj.hasOwnProperty(i)){
							if(obj[i]['img']){
								_img = obj[i]['img'];
							}else{
								_img = '/img/usa.png';
							}
							
							if(obj[i]['isshow'] == '1'){
								_isshow = '<a href="javascript:void(0);" class="btn btn-primary" action-type="isshow" action-data="boid=' + obj[i]['boid'] + '&isshow=0">关闭</a>';
							}else{
								_isshow = '<a href="javascript:void(0);" class="btn btn-primary" action-type="isshow" action-data="boid=' + obj[i]['boid'] + '&isshow=1">开放</a>';
							}
							
							_html += '<li>';
							_html += '<div class="order-num">订单号：';
							_html += '<span class="number">' + obj[i]['boid'] + '</span>';
							_html += '<span class="time">' + obj[i]['createtime'] + '</span>';
							_html += '</div>';
							_html += '<ul class="inline">';
							_html += '<li class="a clearfix">';
							_html += '<div class="pic">';
							_html += '<img src="' + _img + '" alt="">';
							_html += '</div>';
							_html += '<div class="detail">';
							_html += '<div class="name"><em>订单名：</em><span>' + obj[i]['title'] + '</span></div>';
							_html += '<div class="num"><em>商品URL：</em><span><a href="' + obj[i]['thirdurl'] + '" target="_blank">' + obj[i]['thirdurl'] + '</a></span></div>';
							_html += '<div class="num"><em>数量：</em><span>' + obj[i]['quantity'] + '</span></div>';
							_html += '<div class="num"><em>备注：</em><span>' + obj[i]['additional'] + '</span></div>';
							_html += '</div>';
							_html += '</li>';
							_html += '<li class="b">￥' + obj[i]['price'] + '</li>';
							_html += '<li class="c">';
							_html += '<small>';
							_html += '</small>';
							_html += '</li>';
							_html += '<li class="d">';
							_html += '<small>';
							_html += _isshow;
							_html += '<a href="/order/takeorder?boids=' + obj[i]['boid'] + '" target="_blank" class="btn">接单</a>';
							_html += '<a href="javascript:void(0);" class="btn" action-type="delorder" action-data="boid=' + obj[i]['boid'] + '">删除订单</a>';
							_html += '</small>';
							_html += '</li>';
							_html += '</ul>';
							_html += '</li>';
							
							$('#allOrderInfos').html(_html);
						}
					}
				}
			}
		});
		return true;
	});
	
	//buyer查看更多订单
	var _page = 2;
	$('[action-type=getmoreallorder]').click(function(){
		var _count = 5;
		
		$.post('/aj/order/getmoreorderjson',{
			page : _page,
			count : _count,
		},function( json ){
			if(json.code == 100000){
				var _html = '';
				obj = json.data;
				var _img = '';
				var _checked = '';
				for( var i in obj){
					if(obj.hasOwnProperty(i)){
						if(obj[i]['img']){
							_img = obj[i]['img'];
						}else{
							_img = '/img/usa.png';
						}
						
						if(obj[i]['isshow'] == '1'){
							_isshow = '<a href="javascript:void(0);" class="btn btn-primary" action-type="isshow" action-data="boid=' + obj[i]['boid'] + '&isshow=0">关闭</a>';
						}else{
							_isshow = '<a href="javascript:void(0);" class="btn btn-primary" action-type="isshow" action-data="boid=' + obj[i]['boid'] + '&isshow=1">开放</a>';
						}
						
						_html += '<li>';
						_html += '<div class="order-num">订单号：';
						_html += '<span class="number">' + obj[i]['boid'] + '</span>';
						_html += '<span class="time">' + obj[i]['createtime'] + '</span>';
						_html += '</div>';
						_html += '<ul class="inline">';
						_html += '<li class="a clearfix">';
						_html += '<div class="pic">';
						_html += '<img src="' + _img + '" alt="">';
						_html += '</div>';
						_html += '<div class="detail">';
						_html += '<div class="name"><em>订单名：</em><span>' + obj[i]['title'] + '</span></div>';
						_html += '<div class="num"><em>商品URL：</em><span><a href="' + obj[i]['thirdurl'] + '" target="_blank">' + obj[i]['thirdurl'] + '</a></span></div>';
						_html += '<div class="num"><em>数量：</em><span>' + obj[i]['quantity'] + '</span></div>';
						_html += '<div class="num"><em>备注：</em><span>' + obj[i]['additional'] + '</span></div>';
						_html += '</div>';
						_html += '</li>';
						_html += '<li class="b">￥' + obj[i]['price'] + '</li>';
						_html += '<li class="c">';
						_html += '<small>';
						_html += '</small>';
						_html += '</li>';
						_html += '<li class="d">';
						_html += '<small>';
						_html += _isshow;
						_html += '<a href="/order/takeorder?boids=' + obj[i]['boid'] + '" target="_blank" class="btn">接单</a>';
						_html += '<a href="javascript:void(0);" class="btn" action-type="delorder" action-data="boid=' + obj[i]['boid'] + '">删除订单</a>';
						_html += '</small>';
						_html += '</li>';
						_html += '</ul>';
						_html += '</li>';
						
					}
				}
				$('#allOrderInfos').append(_html);
				_page = _page + 1;
			}
		}, 'json' );
		return true;
	});
	// 处理方法列表
    var funcList = {
    		//查找订单
    		'isshow' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el,'action-data');
    			
    			$.post('/aj/order/publicorder',{
    				boid : result.boid,
    				isshow : result.isshow,
    			},function( json ){
    				if(json.code == 100000){
    					if(result.isshow == 1){
    						el.html('关闭');
    						el.attr("action-data","boid=" + result.boid + "&isshow=0");
    					}else{
    						el.attr("action-data","boid=" + result.boid + "&isshow=1");
    						el.html('开放');
    					}
    				}
    			}, 'json' );
    			
    			return;
    		},
    		//取消订单
    		'cancelOrder' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el,'action-data');
    			var _boid = result.boid;
    			
    			if(confirm("确定要取消吗？")){
    				$.post('/aj/order/cancelorder',{
        				boid : result.boid,
        			},function( json ){
        				if(json.code == 100000){
        					el.parent().parent().parent().parent().remove();
        				}else{
        					alert(json.msg);
        				}
        			}, 'json' );
    			}
    			
    			return;
    		},
    		//删除订单
    		'delOrder' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el,'action-data');
    			var _boid = result.boid;
    			
    			if(confirm("确定要删除吗？")){
    				$.post('/aj/order/delorder',{
        				boid : result.boid,
        			},function( json ){
        				if(json.code == 100000){
        					el.parent().parent().parent().parent().remove();
        				}else{
        					alert(json.msg);
        				}
        			}, 'json' );
    			}
    			
    			return;
    		},
    }
	
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#allorder').delegate( '[action-type=isshow]', 'click', funcList.isshow );
    	$('#myorder').delegate( '[action-type=cancelorder]', 'click', funcList.cancelOrder );
    	$('#allorder').delegate( '[action-type=delorder]', 'click', funcList.delOrder );
    };
    // 执行初始化
    init();
});