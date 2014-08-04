(function($){
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
	
})(jQuery);