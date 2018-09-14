cordova.define("com.jsict.mobile.plugins.des.desplugin", function(require, exports, module) {
	var exec = require('cordova/exec');
	var DES = function(){
		
	}
	DES.prototype = {
	    encrypt : function(win, fail, option){
		    var str = option.str;
		    var key = option.key;
		    exec(win, fail, "DESPlugin", "encrypt", [str, key]);
	    },
	    decrypt : function(win, fail, option){
	    	var str = option.str;
		    var key = option.key;
	    	exec(win, fail, "DESPlugin", "decrypt", [str, key]);
	    }
	};
	module.exports = new DES();
});
	