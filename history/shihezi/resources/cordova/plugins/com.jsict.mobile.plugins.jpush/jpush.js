cordova.define("com.jsict.mobile.plugins.jpush", function(require, exports, module){
	var exec = require("cordova/exec");
	var Jpush = function(){
		
	};
	Jpush.prototype = {
	    "init" : function(win, fail, packageName, appPackage, activity){
		    exec(win, fail, "JpushPlugin", "init", [packageName, appPackage, activity]);
	    },
	    "setDebugMode" : function(win, fail, mode){
		    exec(win, fail, "JpushPlugin", "setDebugMode", [mode]);
	    },
	    "setAliasAndTags" : function(win, fail, option){
	    	var alias = option.alias;
	    	var tagset = option.tags;
		    exec(win, fail, "JpushPlugin", "setAliasAndTags", [alias, tagset]);
	    },
	    "setNotificationLayOut" : function(win, fail, id, layout){
		    exec(win, fail, "JpushPlugin", "setNotificationLayOut", [id, layout]);
	    },
	    "getNotification" : function(win, fail){
		    exec(win, fail, "JpushPlugin", "getNotification", []);
	    },
	    "stopPush" : function(win, fail){
		    exec(win, fail, "JpushPlugin", "stopPush", []);
	    },
	    "resumePush" : function(win, fail){
		    exec(win, fail, "JpushPlugin", "resumePush", []);
	    }
	};
	module.exports = new Jpush();
});