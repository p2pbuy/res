$(function () {
	window.MAIN = {};
	
	// 对象合并，isNumParse表示是否转换为数值类型
	MAIN.parseObj = function (rootObj, newObj, isNumParse) {
        var tempObj = {};
        var newObj = newObj || {};
        for (var i in rootObj) {
            tempObj[i] = rootObj[i];
            if (i in newObj) {
                var temp = newObj[i];
                var parseVal = parseFloat(temp);
                if (isNumParse && !isNaN(parseVal)) {
                    temp = parseVal;
                }
                tempObj[i] = temp;
            }
        }
        return tempObj;
    };
    
    // getkey获取唯一值
    MAIN.getKey = function () {
        var date = new Date();
        return date.getTime();
    };

	
    MAIN.getData = function ( node, attrName ) {
		var act_data = $(node).attr( attrName || 'act_data' ) || '';
		if( !act_data ) {
			return {};
		}
		var dataArr = act_data.split('&');
		var result = {};
		for(var i in dataArr){
			var item = dataArr[i];
			var tmp = item.split('=');
			result[tmp[0]] = tmp[1];
		}
		return result;
	};
	
	// 表单提交不跳页
	MAIN.formUp = function ( formNode, conf ) {
        var config = MAIN.parseObj( {
            'method' : 'post',
            'action' : '',
            'enctype': 'multipart/form-data',
            'extraD' : {},
            'cbkName': 'cbkdata',
            'cbk'    : function () {}
        }, conf );
        if ( !config.action ) {
            return;
        }
        var transData = config.extraD;
        transData.cbkname = config.cbkName;

        var iframN;
        // Input创建器
        var inputCreator = function ( data ) {
            var arr = [];
            for ( var i in data ) {
                if ( data.hasOwnProperty( i ) ) {
                    arr[arr.length] = '<input type="hidden" name=' + i + ' value=' + data[i] + ' />';
                }
            }
            var randomKey = MAIN.getKey();
            arr.push( '<input type="hidden" name="_rd" value="' + randomKey + '"" />' )
            return arr.join('');
        };

        var iframCreat = function () {
            var unikey = 'formIframe_' + MAIN.getKey();
            iframN = document.createElement( 'iframe' );
            iframN.setAttribute( 'name', unikey );
            iframN.style.display = 'none';
            document.body.appendChild( iframN );
            return unikey;
        };

        var hiddenBox = document.createElement( 'div' );
        hiddenBox.style.display = 'none';
        hiddenBox.innerHTML = inputCreator( transData );
        formNode.appendChild( hiddenBox );


        var iframeKey = iframCreat();
        formNode.setAttribute( 'method', config.method );
        config.action && formNode.setAttribute( 'action', config.action );
        formNode.setAttribute( 'target', iframeKey );
        formNode.setAttribute( 'enctype', config.enctype );
        iframN.onload = function () {
            config.cbk( iframN.contentWindow[ config.cbkName ] || {} );
            hiddenBox.parentNode.removeChild( hiddenBox );
            document.body.removeChild( iframN );
        };
        formNode.submit();
    };
	
});