$(function(){
	// 处理方法列表
    var funcList = {
    		//删除sku
    		'delsku' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el,'action-data');
    			var _id = result.id;
    			
    			if(!_id){
    				alert('请选择sku');
    				return;
    			}
    			
    			$.post('/aj/sku/delsku',{
    				id : _id,
    			},function( json ){
    				if(json.code == 100000){
    					alert('删除成功');
    					location.reload();
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
    	$('#skuinfo').delegate( '[action-type=delsku]', 'click', funcList.delsku );
    };
    // 执行初始化
    init();
});