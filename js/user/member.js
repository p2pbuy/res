$(function(){
	//查看更多会员
	var _page = 2;
	$('[action-type=getmoreuserinfo]').click(function(){
		var _count = 5;
		
		$.post('/managep2p/aj/member/getmoreuserinfojson',{
			page : _page,
			count : _count,
		},function( json ){
			if(json.code == 100000){
				var _html = '';
				obj = json.data;
				for( var i in obj){
					if(obj.hasOwnProperty(i)){
						if(obj[i].hasOwnProperty('uid')){
							var alipayusername;
							if(obj[i]['extends']['alipayusername']){
								alipayusername = obj[i]['extends']['alipayusername'];
							}else{
								alipayusername = '';
							}
							_html += '<li>';
							_html += '<ul class="inline">';
							_html += '<li class="a clearfix">';
							_html += '<div class="detail">';
							_html += '<div class="name"><em>uid：</em><span>' + obj[i]['uid'] + '</span></div>';
							_html += '<div class="num"><em>nick：</em><span>' + obj[i]['nick'] + '</span></div>';
							_html += '</div>';
							_html += '</li>';
							_html += '<li class="b"><input type="text" value="' + alipayusername + '" /></li>';
							_html += '<li class="c">';
							_html += '<small>';
							_html += '</small>';
							_html += '</li>';
							_html += '<li class="d">';
							_html += '<small>';
							_html += '<a href="javascript:void(0);" class="btn btn-primary" action-type="setuserinfo">确认</a>';
							_html += '</small>';
							_html += '</li>';
							_html += '</ul>';
							_html += '</li>';
						}
					}
				}
				$('#allUserInfos').append(_html);
				_page = _page + 1;
			}
		}, 'json' );
		return true;
	});
	// 处理方法列表
    var funcList = {
    		//设置用户信息
    		'setuserinfo' : function ( e ) {
    			var el = $(e.currentTarget);
    			var alipayusername = el.closest('#userInfoBox').find('[node-type=alipayusername]').val();
    			var result = MAIN.getData(el,'action-data');
    			
    			$.post('/aj/order/publicorder',{
    				boid : result.boid,
    				isshow : result.isshow,
    			},function( json ){
    				if(json.code == 100000){
    					if(result.isshow == 1){
    						el.html('关闭');
    						el.attr("action-data","boid=" + result.boid + "&isshow=0");
    					}else{
    						el.attr("action-data","boid=" + result.boid + "&isshow=1");
    						el.html('开放');
    					}
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
    	$('#alluserinfo').delegate( '[action-type=setuserinfo]', 'click', funcList.setuserinfo );
    };
    // 执行初始化
    init();
});