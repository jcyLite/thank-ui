cordova.define("com.jsict.mobile.plugins.clipboard", function(require, exports, module){
	var exec = require("cordova/exec");
	var Clipboard = function(){
		
	};
	Clipboard.prototype = {
	    "get" : function(win, fail){
	    	exec(win, fail, 'ClipboardPlugin', 'get', []);
		},
	    "copy" : function(text){
			exec(null, null, 'ClipboardPlugin', 'copy', [text]);
		}		
	};
	module.exports = new Clipboard();
});