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
		$.post('/aj/order/getmoreorderjson',{
			page : _page,
			count : _count,
			isshow : 1,
		},function(data){
			var obj = eval('(' + data + ')');
			if(obj.code == 100000){
				var objdata = obj.data;
				var _html = '';
				
				for( var i in objdata){
					if(objdata.hasOwnProperty(i)){
						if(objdata[i]['img']){
							_img = objdata[i]['img'];
						}else{
							_img = '/img/usa.png';
						}
						_html += '<li class="order-item line-bottom">';
						_html += '<h3 class="tit"><em class="txt-ca">订单号：</em><span class="txt-cb">' + objdata[i]['boid'] + '</span></h3>';
						_html += '<div class="media-graphic layout-flexbox">';
						_html += '<div class="mod-media size-m">';
						_html += '<img src="' + _img + '" alt="">';
						_html += '</div>';
						_html += '<div class="item-list box-col">';
						_html += '<div class="item-main txt-ca">' + objdata[i]['title'] + '</div>';
						_html += '<div class="item-minor txt-cb">' + objdata[i]['description'] + '</div>';
						_html += '<div class="item-minor txt-cb">价格：￥' + objdata[i]['price'] + '</div>';
						_html += '<div class="item-minor txt-cb">竞价中</div>';
						_html += '</div>';
						_html += '<div class="opt">';
						_html += '<a href="/order/takeorder?boids=' + objdata[i]['boid'] + '" class="btn-line">我要竞价</a>';
						_html += '</div>';
						_html += '</div>';
						_html += '</li>';
					}
				}
				
				$('#orderLists').append(_html);
			}else{
				$('#pager').html('');
				alert('已经没有了');
			}
		});
	}
	
});