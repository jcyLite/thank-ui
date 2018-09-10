cordova.define("com.jsict.mobile.plugins.xmpp", function(require, exports, module){
	var exec = require("cordova/exec");
	var Xmpp = function(){
		
	}
	Xmpp.prototype = {
	    "start" : function(win, fail, id){
		    exec(win, fail, "XmppMessagePlugin", "start", [id]);
	    },
	    "stop" : function(){
	    	exec(win, fail, "XmppMessagePlugin", "stop", []);
	    },
	    "sendMessage": function(senderId,  senderName, receiverId, content, url,  isShow){
	    	exec(win, fail, "XmppMessagePlugin", "send", [senderName, receiverId, content, url, isShow, senderId]);
	    }
	    
	};
	module.exports = new Xmpp();
});