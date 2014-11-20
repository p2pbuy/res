$(function($){
	//AJ 接口
	var AJ = {
			'reg' : '/aj/reg',
			'login' : '/aj/login',
	};
	// 处理方法列表
    var funcList = {
		'reg' : function ( data ) {
			var _username = $('[node-type=username]').val();
			var _passwd = $('[node-type=passwd]').val();
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
							location.href="/";
						}else{
							alert('登录失败，请到首页登录');
							location.href="/login/login";
						}
					}, 'json' );
				}else{
					alert('注册失败');
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
    	$('#reg').delegate( '[action-type=reg]', 'click', funcList.reg );
    };
    // 执行初始化
    init();
	
});