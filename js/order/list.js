$(function($){
	//加载更多
	if($('#scrollflag')){
		var _page = 1;
		var bufferTimer,
			buffer = 200;
		$(window).scroll(function(){
			bufferTimer && clearTimeout( bufferTimer );
			bufferTimer = setTimeout( function () {
				var _count = 5;
				var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrolltop>=$(document).height()-$(window).height()){
					_page = _page + 1;
					getmore(_page, _count);
				}
				bufferTimer = undefined;
			}, buffer );
			
	
		});
	}
	function getmore(_page, _count){
		$.post('/aj/order/getmoreorder',{
			page : _page,
			count : _count,
		},function(data){
			var obj = eval('(' + data + ')');
			if(obj.code == 100000){
				$('#orderLists').append(obj.data.html);
			}else{
				alert('已经没有了');
			}
		});
	}
	
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
    	$('#homepage_post').delegate( '[action-type=create_order]', 'click', funcList.createOrder );
    };
    // 执行初始化
    init();
	
});