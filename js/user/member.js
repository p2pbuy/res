$(function(){
	//搜索会员
	$('[action-type=searchUser]').blur(function(){
		searchUserInfo();
		return true;
	});
	
	function searchUserInfo(){
		$.ajax({
			url : "/managep2p/aj/member/getuserinfobyemailjson?email=" + $('[action-type=searchUser]').val(),
			cache : false,
			success: function(json){
				json = eval('(' + json + ')');;
				if(json.code == 100000){
					var _html = '';
					obj = json.data;
					
					var alipayusername = obj['extends']['alipayusername'];
					if(alipayusername == null){
						alipayusername = '';
					}
					
					_html += '<li id="userInfoBox">';
					_html += '<ul class="inline">';
					_html += '<li class="a clearfix">';
					_html += '<div class="detail">';
					_html += '<div class="name"><em>uid：</em><span>' + obj['uid'] + '</span></div>';
					_html += '<div class="num"><em>nick：</em><span>' + obj['nick'] + '</span></div>';
					_html += '</div>';
					_html += '</li>';
					_html += '<li class="b"><input type="text" value="' + alipayusername + '" node-type="alipayusername"/></li>';
					_html += '<li class="c">';
					_html += '<small>';
					_html += '</small>';
					_html += '</li>';
					_html += '<li class="d">';
					_html += '<small>';
					_html += '<a href="javascript:void(0);" class="btn btn-primary" action-type="setuserinfo" action-data="uid=' + obj['uid'] + '">确认</a>';
					_html += '</small>';
					_html += '</li>';
					_html += '</ul>';
					_html += '</li>';
					
					$('#allUserInfos').html(_html);
				}
			}
		});
		return true;
	}
	// 处理方法列表
    var funcList = {
    		//设置用户信息
    		'setuserinfo' : function ( e ) {
    			var el = $(e.currentTarget);
    			var _alipayusername = el.closest('#userInfoBox').find('[node-type=alipayusername]').val();
    			var result = MAIN.getData(el,'action-data');
    			
    			$.post('/managep2p/aj/member/setuserinfo',{
    				uid : result.uid,
    				type : 2,
    				alipayusername : _alipayusername,
    			},function( json ){
    				if(json.code == 100000){
    					alert('设置成功');
    					searchUserInfo();
    				}else{
    					alert('设置失败');
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