$(function(){
	//AJ 接口
	var AJ = {
			'assignOrder' : '/aj/order/assignorder',
	};
	
	// 处理方法列表
    var funcList = {
    	'assignOrder' : function ( e ) {
    		var el = $(e.currentTarget);
    		var result = MAIN.getData(el,'action-data');
    		var _assginEmail = $('[node-type=assignEmail]').val();
    		var _boid = result.boid;

    		if(!_assginEmail){
    			alert('请输入邮箱');
    			return false;
    		}
    		if(!_boid){
    			alert('参数错误');
    			return false;
    		}
    		$.post( AJ.assignOrder, {
    			assignEmail : _assginEmail,
    			boid : _boid,
			}, function ( json ) {
    			//console.log(json);
    			if( json.code == 100000 ) {
    				alert('分配成功');
    				location.href='/order/list';
    				return true;
    			}else{
    				alert(json.msg);
    				return false;
    			}
    		}, 'json' );
    	}
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#assignbuyorder').delegate( '[action-type=assignOrder]', 'click', funcList.assignOrder );
    };
    // 执行初始化
    init();
    
    //
});