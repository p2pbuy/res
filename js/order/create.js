$(function(){
	var getMoreCount = 0;
	var goodsInfoPartsCount = 0;
	$('[node-type=goodsInfoParts]').each(function(){
		goodsInfoPartsCount++;
	});
	//AJ 接口
	var AJ = {
			'amazonGetgoodsinfo' : '/aj/third/amazon/getgoodsinfo',
	};
	
	// 处理方法列表
    var funcList = {
    	'amazonGetgoodsinfo' : function ( e ) {
    		var actionData = MAIN.getData($(e.currentTarget),'action-data');
    		
    		$('[action-type=amazonGetgoodsinfo]').each(function(){
    			$(this).removeClass('choosed');
    		});
    		
    		$(e.currentTarget).addClass('choosed');
    		$('[node-type=parentSize]').hide();
    		
    		$.post( AJ.amazonGetgoodsinfo, {
				ASIN : actionData.ASIN,
			}, function ( json ) {
    			if( json.code == 100000 ) {
    				//替换页面内容
    				$('[node-type=goodsTitle]').html(json.data.title);
    				$('[node-type=goodsImg]').attr('src',json.data.goodsImg);
    				
    				return true;
    			}else{
    				
    				return false;
    			}
    		}, 'json' );
    		return;
    	},
    	'getMore' : function (e) {
    		var i = 0;
    		getMoreCount++;
    		console.log(getMoreCount,goodsInfoPartsCount);
    		if(getMoreCount >= goodsInfoPartsCount){
    			getMoreCount = 0;
    		}
    		$('[node-type=goodsInfoParts]').each(function(){
    			if(i == getMoreCount){
    				$(this).show();
    			}else{
    				$(this).hide();
    			}
    			i++;
    		});
    		
    		goodsInfoPartsCount = i;
    		
    		return;
    	}
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#size-box').delegate( '[action-type=amazonGetgoodsinfo]', 'click', funcList.amazonGetgoodsinfo );
    	$('#size-box').delegate( '[action-type=getMore]', 'click', funcList.getMore );
    };
    // 执行初始化
    init();
    
    //
});