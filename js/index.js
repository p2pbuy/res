$(function($){
	//AJ 接口
	var AJ = {
			'createOrder' : '/order/buy',
			'amazon' : '/aj/third/amazon',
	};
	// 处理方法列表
    var funcList = {
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
    	//发布需求
    	'createOrder' : function ( e ) {
    		e.preventDefault();
    		var _thirdurl = $('[node-type=thirdurl]').val();
    		if(!_thirdurl){
    			alert('请输入商品的链接');
    			return;
    		}
    		var i = _thirdurl.indexOf('http');
    		if( i == -1){
    			_thirdurl = 'http://'+_thirdurl;
    		}

    		if(!_thirdurl){
    			location.href=AJ.createOrder;
    		}else{
    			$.post( AJ.amazon, {
    				amazonurl : _thirdurl,
    			}, function ( json ) {
        			//console.log(json);
        			if( json.code == 100000 ) {
        				var inputStr = funcList.inputCreator( json.data );
        				var formN = $('<form action="'+AJ.createOrder+'" method="post">'+ inputStr +'</form>').appendTo('body');
        				formN[0].submit();
        				/*$.post( AJ.createOrder, {
        					title : json.data.title,
        					feature : json.data.feature,
        					price : json.data.price,
        					img : json.data.img,
        				}, function ( ) {
        					
        				}, 'json' );*/
        				return true;
        			}else{
        				alert('地址有问题，请重新填写');
        				return false;
        			}
        		}, 'json' );
    		}
    		return true;
    	}
    }
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#u17').delegate( '[action-type=create_order]', 'click', funcList.createOrder );
    };
    // 执行初始化
    init();
	
});