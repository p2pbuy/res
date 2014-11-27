$(function($){
	//AJ 接口
	var AJ = {
			
	};
	// 处理方法列表
    var funcList = {
    	//发布需求
    	'createAds' : function ( e ) {
    		var _thirdurl = $('[node-type=thirdurl]').val();
    		
    		if(_thirdurl){
    			location.href = 'http://p2pbuy.net/order/buy?thirdurl=' + encodeURIComponent(_thirdurl);
    			//alert('http://p2pbuy.net/order/buy?thirdurl=' + encodeURIComponent(_thirdurl));
    		}else{
    			location.href = 'http://p2pbuy.net/order/buy';
    			//alert('http://p2pbuy.net/order/buy');
    		}
    		
    		return true;
    	},
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#transads_tool').delegate( '[action-type=create_ads]', 'click', funcList.createAds );
    };
    // 执行初始化
    init();
	
});