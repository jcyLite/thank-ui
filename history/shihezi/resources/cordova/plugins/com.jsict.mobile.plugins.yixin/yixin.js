cordova.define("com.jsict.mobile.plugins.yixin", function(require, exports, module){
	var exec = require("cordova/exec");
	var Yixin = function(){
		
	}
	Yixin.prototype = {
		sendTxt : function(win, fail, option){
        var text = option.text;
        var isTimelineCb = option.sence;
        var comment = option.comment;
        if(typeof(isTimelineCb) == "undefined") 
	        isTimelineCb = 0;
        exec(win, fail, "YixinPlugin", "sendTxt", [text, isTimelineCb, comment]);
    },
    sendPic : function(win, fail, option){		        
        exec(win, fail, "YixinPlugin", "sendPic", [option]);
    },
    sendMusic : function(win, fail, music){		        
        exec(win, fail, "YixinPlugin", "sendMusic", [music]);
    },
    sendWebPage : function(win, fail, option){
    	
        exec(win, fail, "YixinPlugin", "sendWebPage", [option]);
    },
    sendVideo : function(win, fail, option){
    	var isTimelineCb = option.sence;
        if(typeof(isTimelineCb) == "undefined") 
	        isTimelineCb = 0;
        exec(win, fail, "YixinPlugin", "sendVideo", [option]);
    }
	};
	module.exports = new Yixin();
});