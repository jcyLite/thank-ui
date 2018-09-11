cordova.define("com.jsict.mobile.plugins.http", function(require, exports, module){
	var exec = require("cordova/exec");
	var HttpUtil = function(){
	}
	HttpUtil.prototype = {
	    "post" : function(url, para, timeout, outEnc, inEnc, ke, win, fail){
		    exec(win, fail, "HttpUtil", "", [0, url, para, timeout, outEnc, inEnc, ke, win, fail]);
	    },
	    "get" : function(url, para, timeout, outEnc, inEnc, ke, win, fail){
	    	exec(win, fail, "HttpUtil", "", [1, url, para, timeout, outEnc, inEnc, ke, win, fail]);
	    }	    
	}
	module.exports = new HttpUtil();
});