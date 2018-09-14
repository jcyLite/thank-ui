cordova.define("com.jsict.mobile.plugins.baidu.map", function(require, exports, module){
	var exec = require("cordova/exec");
	var BaiduMap = function(){};
	BaiduMap.prototype = {
		show : function(win, fail, config){
            exec(win, fail, "BaiduMapPlugin", "show", [config]);
        },
        hide : function(win, fail){
            exec(win, fail, "BaiduMapPlugin", "hide", []);
        },
        markPoint : function(win, fail, points){
            cordova.exec(win, fail, "BaiduMapPlugin", "markPoint", points);
        },
        downloadOfflineMap : function(win, fail, cityInfo){
            cordova.exec(win, fail, "BaiduMapPlugin", "downloadOfflineMap", [cityInfo]);
        },
        importOfflineMap : function(win, fail){
            cordova.exec(win, fail, "BaiduMapPlugin", "importOfflineMap", []);
        },
        findOfflineMap : function(win, fail){
            cordova.exec(win, fail, "BaiduMapPlugin", "findOfflineMap", []);
        },
        removeOfflineMap : function(win, fail, cityInfo){
            cordova.exec(win, fail, "BaiduMapPlugin", "removeOfflineMap", [cityInfo]);
        }
	
	};
	module.exports = new BaiduMap();
});