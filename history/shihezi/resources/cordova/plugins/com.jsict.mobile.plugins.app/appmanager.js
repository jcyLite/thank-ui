cordova.define("com.jsict.mobile.plugins.app.appmanager", function(require, exports, module) {
	var exec = require('cordova/exec');
	var appManager = function (){
		this.gotIconsCallback = null;
	};
	appManager.prototype = {
		findInstalledApps : function(win, fail, options){
			this.gotIconsCallback = options.gotIconsCallback;
			var that = this;
			var win1 = function(result) {
				console.error(result.isIcon);
				if(result.isIcon){
					if(that.gotIconsCallback){
						that.gotIconsCallback(result.files);
					}					
				}else{
					win(result);
				}
			};			
		    exec(win1, fail, "AppManager", "findInstalledApps", [options]);
	    },
	    hasApp : function(win, fail, packageName){
	    	exec(win, fail, "AppManager", "isAppInstalled", [packageName]);
	    },
	    installApp : function(win, fail, apkFile){
	    	exec(win, fail, "AppManager", "installApp", [apkFile]);
	    },
	    openApp : function(win, fail, options){
	    	exec(win, fail, "AppManager", "openApp", [options]);
	    },
	    unstallApp : function(win, fail, packageName){
	    	exec(win, fail, "AppManager", "unstallApp", [packageName]);
	    },
	    openLocalFile : function(win, fail, filePath){
	    	exec(win, fail, "AppManager", "openLocalFile", [filePath]);
	    }
	};
	module.exports = new appManager();
});
