$(function(){
	//AJ 接口
	var AJ = {
			'createBuyOrder' : '/aj/order/buy',
			'login' : '/aj/login',
			'reg' : '/aj/reg',
	};
	
	// 处理方法列表
    var funcList = {
    	'createBuyOrder' : function ( e ) {
    		var _title = $('[node-type=title]').val();
    		var _description = $('[node-type=description]').val();
    		var _price = $('[node-type=price]').val();
    		var _quantity = $('[node-type=quantity]').val();
    		/*if(!_title){
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
        				$('#layer_login').show();
        				return false;
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
    	},
    	'login' : function ( data ) {
			var _email = $('[node-type=username]').val();
			var _passwd = $('[node-type=passwd]').val();
			
			$.post(AJ.login,{
				email : _email,
				passwd : _passwd,
			},function( json ){
				if(json.code == 100000){
					funcList.createBuyOrder();
					return true;
				}else{
					alert('账号或者密码错误');
				}
				return;
			}, 'json' );
			return;
        },
        'closeLayer' : function ( e ) {
        	$('#layer_login').hide();
        	$('#layer_reg').hide();
        	return true;
        },
        'showLoginLayer' : function ( e ) {
        	$('#layer_reg').hide();
        	$('#layer_login').show();
        	return true;
        },
        'showRegLayer' : function ( e ) {
        	$('#layer_login').hide();
        	$('#layer_reg').show();
        	return true;
        },
        'reg' : function ( data ) {
			var _username = $('[node-type=username_reg]').val();
			var _passwd = $('[node-type=passwd_reg]').val();
			var _nick = $('[node-type=nick]').val();
			
			if(!_username){
				alert('请填写邮箱/手机');
				return false;
			}
			if(!_passwd){
				alert('请填写密码');
				return false;
			}
			if(!_nick){
				alert('请填写昵称');
				return false;
			}
			
			$.post(AJ.reg,{
				email : _username,
				passwd : _passwd,
				nick : _nick,
			},function( json ){
				if(json.code == 100000){
					$.post(AJ.login,{
						email : _username,
						passwd : _passwd,
					},function( json_2 ){
						if(json_2.code == 100000){
							funcList.createBuyOrder();
							return true;
						}else{
							alert('登录失败，请到首页登录');
							location.href="/login/login";
							return false;
						}
					}, 'json' );
				}else{
					alert('注册失败');
					return false;
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
    	$('#ordering_form').delegate( '[action-type=createBuyOrder]', 'click', funcList.createBuyOrder );
    	$('body').delegate( '[action-type=login]', 'click', funcList.login );
    	$('body').delegate( '[action-type=closeLayer]', 'click', funcList.closeLayer );
    	$('body').delegate( '[action-type=showLoginLayer]', 'click', funcList.showLoginLayer );
    	$('body').delegate( '[action-type=showRegLayer]', 'click', funcList.showRegLayer );
    	$('body').delegate( '[action-type=reg]', 'click', funcList.reg );
    };
    // 执行初始化
    init();
    
    //
});