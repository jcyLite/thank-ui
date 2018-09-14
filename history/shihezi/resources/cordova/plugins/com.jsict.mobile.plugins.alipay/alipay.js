cordova.define("com.jsict.mobile.plugins.alipay", function(require, exports, module){
	var exec = require("cordova/exec");
	var Alipay = function(){
		
	};
	Alipay.prototype = {
	    "pay" : function(win, fail, option){
		    exec(win, fail, "AlipayPlugin", "", [option]);
	    }
	};
	module.exports = new Alipay();
});