$(function(){
	$('#payment').click(function(){
		if(confirm('确定要付款吗？确定后订单会锁定')){
			var result = MAIN.getData($('#payment'),'action-data');
			
			//锁定订单 更新订单收货地址
			$.post('/aj/order/takeorder',{
				boid : result.boid,
				biduid : result.biduid,
				bidprice : result.bidprice,
				bid : result.bid,
				addressid : result.addressid,
			},function( json ){
				if(json.code == 100000){
					location.href='/order/payment?boid=' + result.boid;
				}else{
					alert('提交失败');
				}
				return;
			}, 'json' );
			

			//location.href='https://shenghuo.alipay.com/send/payment/fill.htm';
		}
		return true;
	});
	
	// 处理方法列表
    var funcList = {
    		//选择收获地址
    		'chooseAddress' : function ( e ) {
    			var el = $(e.currentTarget);
    			$('[node-type=chooseAddress]').removeClass("choosed");
    			el.addClass("choosed");
    			//找到当前地址节点的addressId的值
    			var addressId = el.find('[node-type=addressId]').val();

    			//替换action-data的值
    			var result = MAIN.getData($('#payment'),'action-data');
    			result.addressid = addressId;
    			result = MAIN.setData($('#payment'),'action-data',result);
    			$('#payment').attr("action-data",result);
    			
    			return;
    		},
    		//展示使用新地址
    		'showNewAddr' : function ( e ) {
    			$('[node-type=ShowNewAddr]').show();
    			return;
    		},
    		//添加新地址
    		'setAddress' : function ( e ) {
    			var _name = $('[node-type=name]').val();
    			var _country = $('[node-type=country]').val();
    			var _province = $('[node-type=province]').val();
    			var _city = $('[node-type=city]').val();
    			var _addrdetail = $('[node-type=addrDrtail]').val();
    			var _mobile = $('[node-type=mobile]').val();
    			
    			if(!_name){
        			alert('请输入收货人姓名');
        			return false;
        		}
    			
    			if(!_country){
        			alert('请选择国家');
        			return false;
        		}
    			
    			if(!_province){
        			alert('请选择省份');
        			return false;
        		}
    			
    			if(!_city){
        			alert('请选择县市');
        			return false;
        		}
    			
    			if(!_addrdetail){
    				alert('请填写详细地址');
    				return false;
    			}
    			
    			if(!_mobile){
    				alert('请填写手机号');
    				return false;
    			}
    			
    			$.post('/aj/order/setaddress',{
    				name : _name,
    				country : _country,
    				province : _province,
    				city : _city,
    				addrdetail : _addrdetail,
    				mobile : _mobile,
    			},function( json ){
    				if(json.code == 100000){
    					alert('保存成功');
    					
    					$.post('/aj/order/getaddress',{
    						
    					},function( json2 ){
    						json2 = eval('(' + json2 + ')');
    						var replace_html = '<ul class="inline clearfix">';
    						for(var i = 0; i < json2.data.length; i++){
    							if(i == 0){
    								replace_html += '<li class="buyer-info choosed" action-type="chooseAddress" node-type="chooseAddress"><div class="name"><span class="n1">' + json2.data[i].country + ' ' + json2.data[i].province + ' ' + json2.data[i].city + '</span><span class="n2">（' + json2.data[i].name + ' 收）</span></div><div class="other"><span class="address">' + json2.data[i].address + '</span><span class="phone">' + json2.data[i].mobile + '</span></div><div class="markup"></div><input type="hidden" node-type="addressId" value="' + json2.data[i].id + '"></li>';
    							}else{
    								replace_html += '<li class="buyer-info" action-type="chooseAddress" node-type="chooseAddress"><div class="name"><span class="n1">' + json2.data[i].country + ' ' + json2.data[i].province + ' ' + json2.data[i].city + '</span><span class="n2">（' + json2.data[i].name + ' 收）</span></div><div class="other"><span class="address">' + json2.data[i].address + '</span><span class="phone">' + json2.data[i].mobile + '</span></div><div class="markup"></div><input type="hidden" node-type="addressId" value="' + json2.data[i].id + '"></li>';
    							}
    						}
    						replace_html += '</ul>';
    						$('#address-box').html(replace_html);
    						
    						//替换action-data的值
    		    			var result = MAIN.getData($('#payment'),'action-data');
    		    			result.addressid = json2.data[0].id;
    		    			result = MAIN.setData($('#payment'),'action-data',result);
    		    			$('#payment').attr("action-data",result);
    					})
    					
    					return true;
    				}else{
    					alert('保存失败');
    					return false;
    				}
    			}, 'json' );
    		}
    }
	
	// 模块主初始化方法
    var init = function () {
        evtInit();
    };
    
    var evtInit = function () {
    	$('#add-address').delegate( '[action-type=showNewAddr]', 'click', funcList.showNewAddr );
    	$('#add-address').delegate( '[action-type=setAddress]', 'click', funcList.setAddress );
    	$('#address-box').delegate( '[action-type=chooseAddress]', 'click', funcList.chooseAddress );
    };
    // 执行初始化
    init();
});