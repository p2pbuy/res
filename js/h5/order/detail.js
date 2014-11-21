$(function($){
	//AJ 接口
	var AJ = {
			'confirmorder' : '/order/confirmorder',
	};
	// 处理方法列表
    var funcList = {
    	//发布需求
    	'confirmorder' : function ( e ) {
    		var actionData = MAIN.getData($(e.currentTarget),'action-data');
    		
			var inputStr = funcList.inputCreator( actionData );
			var formN = $('<form action="'+AJ.confirmorder+'" method="post">'+ inputStr +'</form>').appendTo('body');
			formN[0].submit();
        				
    		return true;
    	},
    	'inputCreator' : function ( data ) {
            var arr = [];
            for ( var i in data ) {
                if ( data.hasOwnProperty( i ) ) {
                    arr[arr.length] = '<input type="hidden" name="' + i + '" value="' + data[i] + '" />';
                }
            }
            var randomKey = MAIN.getKey();
            arr.push( '<input type="hidden" name="_rd" value="' + randomKey + '"" />' )
            return arr.join('');
        },
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#detailbox').delegate( '[action-type=confirmorder]', 'click', funcList.confirmorder );
    };
    // 执行初始化
    init();
	
});