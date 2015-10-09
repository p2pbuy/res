$(function(){
	// 处理方法列表
    var funcList = {
    		//添加物流信息
    		'addsku' : function ( e ) {
    			//var el = $(e.currentTarget);
    			//var result = MAIN.getData(el,'action-data');
    			
    			var _code = $('[node-type=code]').val();
    			var _title = $('[node-type=title]').val();
    			var _imgurl = $('[node-type=imgurl]').val();
                var _price_unit = $('[node-type=price_unit]').val();
                var _attr = $('[node-type=attr]').val();
                var _remark = $('[node-type=remark]').val();
    			
    			if(!_code || !_title || !_price_unit){
    				alert('请完善sku信息');
    				return;
    			}
    			
    			$.post('/aj/sku/addsku',{
    				code : _code,
    				title : _title,
    				imgurl : _imgurl,
    				price_unit : _price_unit,
                    attr : _attr,
                    remark : _remark,
    			},function( json ){
    				if(json.code == 100000){
    					alert('添加成功');
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
    	$('#addsku').delegate( '[action-type=addsku]', 'click', funcList.addsku );
    };
    // 执行初始化
    init();
});