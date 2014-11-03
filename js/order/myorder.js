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
								_checked = 'checked="checked"';
							}else{
								_checked = '';
							}
							_html += '<ul class="item_content_details" id="allOrderInfo">';
							_html += '<img src="' + _img + '" alt="item1" height="135px" width="220px" class="item_content_image"/>';
							_html += '<li>我也买不了，展示给别人吧<input type="checkbox" action-type="isshow" ' + _checked + '></li>';
							_html += '<li action-data="boid=' + obj[i]['boid'] + '">订单ID：' + obj[i]['boid'] + '</li>';
							_html += '<li>订单名称：' + obj[i]['title'] + '</li>';
							_html += '<li>订单描述：' + obj[i]['description'] + '</li>';
							_html += '<li>商品价格：' + obj[i]['price'] + '</li>';
							_html += '<li>商品数量：' + obj[i]['quantity'] + '</li>';
							_html += '<li>补充说明：' + obj[i]['additional'] + '</li>';
							_html += '<li>创建时间：' + obj[i]['createtime'] + '</li>';
							_html += '</ul>';
							_html += '</br>';
							$('#allOrderInfos').html(_html);
						}
					}
				}
			}
		});
		return true;
	});
	
	// 处理方法列表
    var funcList = {
    		//选择收获地址
    		'isshow' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el.parent().next(),'action-data');
    			var ischeck = el.context.checked;
    			
    			if(ischeck){
    				ischeck = 1;
    			}else{
    				ischeck = 0;
    			}
    			
    			$.post('/aj/order/publicorder',{
    				boid : result.boid,
    				isshow : ischeck,
    			},function( json ){
    				if(json.code == 100000){
    					alert('更新成功！');
    				}
    			}, 'json' );
    			
    			return;
    		},

    }
	
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#allorder').delegate( '[action-type=isshow]', 'click', funcList.isshow );
    };
    // 执行初始化
    init();
});