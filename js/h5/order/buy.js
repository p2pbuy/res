$(function(){
	//AJ 接口
	var AJ = {
			'createBuyOrder' : '/aj/order/buy',
	};
	
	// 处理方法列表
    var funcList = {
    	'createBuyOrder' : function ( e ) {
    		var _title = $('[node-type=title]').val();
    		var _description = $('[node-type=description]').val();
    		var _price = $('[node-type=price]').val();
    		var _quantity = $('[node-type=quantity]').val();
    		if(!_title){
    			alert('请输入订单标题');
    			return false;
    		}
    		if(!_description){
    			alert('请输入商品描述');
    			return false;
    		}
    		/*if(!_price){
    			alert('请输入商品价格');
    			return false;
    		}*/
    		if(!_quantity){
    			alert('请输入商品数量');
    			return false;
    		}
    		MAIN.formUp($('#createOrder')[0],{
    			'action' : '/aj/order/buy',
    			'cbk' : function ( data ) {
    				if( data.code == 100000 ) {
        				alert('创建成功');
        				location.href="/order/myorder";
        				return true;
        			}else if(data.code == 102001){
        				alert(data.msg);
        				return false;
        			}else if(data.code == 102002){
        				var curUrl = window.location.href;
        				window.location.href = '/login/login?backurl=' + encodeURI(curUrl);
        				return false;
        			}else{
        				alert('创建订单失败');
        				return false;
        			}
    			}
    		});
    		/*var el = $(e.currentTarget);
    		var _title = $('[node-type=title]').val();
    		var _description = $('[node-type=description]').val();
    		var _price = $('[node-type=price]').val();
    		var _quantity = $('[node-type=quantity]').val();
    		var _additional = $('[node-type=additional]').val();
    		if(!_title){
    			alert('请输入订单标题');
    			return false;
    		}
    		if(!_description){
    			alert('请输入商品描述');
    			return false;
    		}
    		if(!_price){
    			alert('请输入商品价格');
    			return false;
    		}
    		if(!_quantity){
    			alert('请输入商品数量');
    			return false;
    		}
    		$.post( AJ.createBuyOrder, {
    			title : _title,
    			description : _description,
    			price : _price,
    			quantity : _quantity,
    			additional : _additional,
			}, function ( json ) {
    			//console.log(json);
    			if( json.code == 100000 ) {
    				alert('创建成功');
    				location.reload();
    				return true;
    			}else{
    				alert('创建订单失败');
    				return false;
    			}
    		}, 'json' );*/
    	}
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#ordering_form').delegate( '[action-type=createBuyOrder]', 'click', funcList.createBuyOrder );
    };
    // 执行初始化
    init();
    
    //
});