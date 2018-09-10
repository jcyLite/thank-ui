cordova.define("com.jsict.mobile.plugins.zip", function(require, exports, module){
	var exec = require("cordova/exec");
	var Zip = function(){};
	Zip.prototype = {
	    "zip" : function(win, fail, zipOption){
		    var src = zipOption.files;
		    var dst = zipOption.zipPath;
		    exec(win, fail, "ZipPlugin", "zip", [src, dst]);	
		},
	    "unzip" : function(win, fail, upzipOption){
			var src = upzipOption.zipPath;
			var dst = upzipOption.targetPath;
		    exec(win, fail, "ZipPlugin", "unzip", [src, dst]);	
		}
	};
	module.exports = new Zip();
});