$(function(){
	//AJ 接口
	var AJ = {
			'bidBuyOrder' : '/aj/bid/bidbuyorder',
	};
	
	// 处理方法列表
    var funcList = {
    	'bidBuyOrder' : function ( e ) {
    		var el = $(e.currentTarget);
    		var result = MAIN.getData(el,'action-data');
    		var _bidprice = $('[node-type=bidprice]').val();
    		var _boid = result.boid;

    		if(!_bidprice){
    			alert('请输入竞价价格');
    			return false;
    		}
    		if(!_boid){
    			alert('参数错误');
    			return false;
    		}
    		$.post( AJ.bidBuyOrder, {
    			bidprice : _bidprice,
    			boid : _boid,
			}, function ( json ) {
    			//console.log(json);
    			if( json.code == 100000 ) {
    				alert('竞价成功');
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
    	$('#bidbuyorder').delegate( '[action-type=bidBuyOrder]', 'click', funcList.bidBuyOrder );
    };
    // 执行初始化
    init();
    
    //
});