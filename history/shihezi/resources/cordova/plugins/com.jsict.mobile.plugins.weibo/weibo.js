cordova.define("com.jsict.mobile.plugins.weibo", function(require, exports, module){
	var exec = require("cordova/exec");
	var Weibo = function(){};
	Weibo.prototype = {
	    "reg" : function(win, fail, appKey){
		    exec(win, fail, "WeiboPlugin", "reg", [appKey]);
		},
		share : function(successCallback, errorCallback, content, pic){
		    if(!pic)
		        cordova.exec(successCallback, errorCallback, "WeiboPlugin", "share", [content]);	
		    else
		        cordova.exec(successCallback, errorCallback, "WeiboPlugin", "share", [content, pic]);	
	    },
	    shareWebPage : function(successCallback, errorCallback, config){
		    cordova.exec(successCallback, errorCallback, "WeiboPlugin", "shareWebPage", [config]);	
	    },
	    shareMusic : function(successCallback, errorCallback, config){
		    cordova.exec(successCallback, errorCallback, "WeiboPlugin", "shareMusic", [config]);	
	    },
	    shareVideo : function(successCallback, errorCallback, config){
		    cordova.exec(successCallback, errorCallback, "WeiboPlugin", "shareVideo", [config]);	
	    },
	    shareVoice : function(successCallback, errorCallback, config){
		    cordova.exec(successCallback, errorCallback, "WeiboPlugin", "shareVoice", [config]);	
	    }
	};
	module.exports = new Weibo();
});