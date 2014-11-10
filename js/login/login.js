$(function($){
	//AJ 接口
	var AJ = {
			'login' : '/aj/login',
	};
	// 处理方法列表
    var funcList = {
		'login' : function ( data ) {
			var _email = $('[node-type=username]').val();
			var _passwd = $('[node-type=passwd]').val();
			
			$.post(AJ.login,{
				email : _email,
				passwd : _passwd,
			},function( json ){
				if(json.code == 100000){
					location.href="/";
				}else{
					$('[node-type=passwdErr]').show();
				}
				return;
			}, 'json' );
			return;
        },
    	
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#login').delegate( '[action-type=login]', 'click', funcList.login );
    };
    // 执行初始化
    init();
	
});