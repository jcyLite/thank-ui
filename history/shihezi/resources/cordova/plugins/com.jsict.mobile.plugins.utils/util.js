cordova.define("com.jsict.mobile.plugins.utils", function(require, exports, module){
	var exec = require("cordova/exec");
	var Util = function(){
		
	}
	Util.prototype = {
	    "createShortcut" : function(option){
		    exec(null, null, "UtilPlugin", "createShortcut", [option]);
	    },
	    "startActivity" : function(activity, extra){
	    	exec(null, null, "UtilPlugin", "startActivity", [activity, extra]);
	    },
	    "closeInput" : function(win, fail){
	    	exec(win, fail, "UtilPlugin", "closeInput", []);
	    },
	    "editPic" : function(win, fail, config){
	    	exec(win, fail, "UtilPlugin", "editPic", [config]);
	    },
	    "share" : function(title, content, pic){
	    	if(!pic){
	    		var type = "text/plain";
	    		exec(null, null, "UtilPlugin", "share", [title, content, type]);
	    	}else{
	    		var type = "image/*";
	    		exec(null, null, "UtilPlugin", "share", [title, content, type, pic]);
	    	}
	    },
	    "getIp" : function(win, fail, devName){
	    	if(devName)
	    		exec(win, fail, "UtilPlugin", "getIp", [devName]);
	    	else
	    		exec(win, fail, "UtilPlugin", "getIp", []);
	    },
	    "getSDCardPath" : function(win, fail){
	    	exec(win, fail, "UtilPlugin", "getSDCardPath", []);
	    },	    
	    "dial" : function(win, fail, tel){
	    	exec(win, fail, "UtilPlugin", "dial", [tel]);
	    },
	    "call" : function(win, fail, tel){
	    	exec(win, fail, "UtilPlugin", "call", [tel]);
	    },
	    "sendSMS" : function(win, fail, option){
	    	var tel = option.phone;
	    	var content = option.message;
	    	var direct = option.derect;
	    	if(typeof(direct) == "undefined") 
	    		direct = true;
	    	exec(win, fail, "UtilPlugin", "sendSMS", [tel, content, direct]);
	    },
	    "intercepterSMS" : function(win, fail, config){
	    	exec(win, fail, "UtilPlugin", "intercepterSMS", [config]);
	    },
	    "cancelIntercepterSMS" : function(win, fail){
	    	exec(win, fail, "UtilPlugin", "cancelIntercepterSMS", []);
	    },
	    "sendMessageToNative" : function(value){
	    	exec(null, null, "UtilPlugin", "sendMessageToNative", [value]);
	    }
	    
	};
	module.exports = new Util();
});