cordova.define("com.jsict.mobile.plugins.weixin", function(require, exports, module){
	var exec = require("cordova/exec");
	var Weixin = function(){};
	Weixin.prototype = {
		    sendTxt : function(win, fail, option){
		        var text = option.text;
		        var isTimelineCb = option.sence;
		        if(typeof(isTimelineCb) == "undefined") 
    		        isTimelineCb = 0;
		        exec(win, fail, "WeixinPlugin", "sendTxt", [text, isTimelineCb]);
		    },
		    sendPic : function(win, fail, option){		        
		        exec(win, fail, "WeixinPlugin", "sendPic", [option]);
		    },
		    sendMusic : function(win, fail, music){		        
		        exec(win, fail, "WeixinPlugin", "sendMusic", [music]);
		    },
		    sendWebPage : function(win, fail, option){
		    	
		        exec(win, fail, "WeixinPlugin", "sendWebPage", [option]);
		    },
		    sendVideo : function(win, fail, option){
		    	var isTimelineCb = option.sence;
		        if(typeof(isTimelineCb) == "undefined") 
    		        isTimelineCb = 0;
		        exec(win, fail, "WeixinPlugin", "sendVideo", [option]);
		    }
	};
	module.exports = new Weixin();
});