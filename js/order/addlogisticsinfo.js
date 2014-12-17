$(function(){
	// 处理方法列表
    var funcList = {
    		//添加物流信息
    		'addlogisticsinfo' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el,'action-data');
    			
    			var _info = $('[node-type=info]').val();
    			var _createtime = $('[node-type=createtime]').val();
    			var _operator = $('[node-type=operator]').val();
    			
    			if(!_info || !_createtime || !_operator){
    				alert('请完善物流信息');
    				return;
    			}
    			
    			$.post('/aj/order/addlogisticsinfo',{
    				boid : result.boid,
    				info : _info,
    				createtime : _createtime,
    				operator : _operator,
    			},function( json ){
    				if(json.code == 100000){
    					alert('添加成功');
    					location.reload();
    				}
    			}, 'json' );
    			
    			return;
    		},
    		//删除物流信息
    		'dellogisticsinfo' : function ( e ) {
    			var el = $(e.currentTarget);
    			var result = MAIN.getData(el,'action-data');
    			
    			var _boid = result.boid;
    			var _id = result.id;
    			
    			$.post('/aj/order/dellogisticsinfo',{
    				boid : _boid,
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
    	$('#logisticsinfo').delegate( '[action-type=addlogisticsinfo]', 'click', funcList.addlogisticsinfo );
    	$('#logisticsinfo').delegate( '[action-type=dellogisticsinfo]', 'click', funcList.dellogisticsinfo );
    };
    // 执行初始化
    init();
});