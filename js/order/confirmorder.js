$(function(){
	$('#payment').click(function(){
		if(confirm('确定要付款吗？确定后订单会锁定')){
			var result = MAIN.getData($('#payment'),'action-data');
			takeorder(result.boid,result.biduid,result.bidprice,result.bid);

			location.href='https://shenghuo.alipay.com/send/payment/fill.htm';
		}
	});
	//锁定订单
	function takeorder(_boid, _biduid, _bidprice, _bid){
		$.post('/aj/order/takeorder',{
			boid : _boid,
			biduid : _biduid,
			bidprice : _bidprice,
			bid : _bid,
		},function( json ){
			return;
		}, 'json' );
	}
});