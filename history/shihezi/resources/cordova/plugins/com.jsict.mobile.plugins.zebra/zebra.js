cordova.define("com.jsict.mobile.plugins.zebra", function(require, exports, module){
	var exec = require("cordova/exec");
	var Zebra = function(){};
	Zebra.prototype = {
	    "scan" : function(win, fail){
		    cordova.exec(win, fail, "ZebraPlugin", "scan", []);	
	    },
	    "create" : function(win, fail, option){
	    	cordova.exec(win, fail, "ZebraPlugin", "create", [option]);	
	    }
	};
	module.exports = new Zebra();
});