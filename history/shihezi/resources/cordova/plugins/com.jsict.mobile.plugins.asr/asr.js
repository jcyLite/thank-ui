cordova.define("com.jsict.mobile.plugins.asr", function(require, exports, module){
	var exec = require("cordova/exec");
	var Asr = function(appId){
		exec(null, null, "AsrPlugin", "init", [appId]);
	};
	Asr.prototype = {
	    "startRecognize" : function(win, fail){
		    exec(win, fail, "AsrPlugin", "startRecognize", []);
	    },
	    "stopRecognize" : function(win, fail){
		    exec(win, fail, "AsrPlugin", "stopRecognize", []);
	    },
	    "resumeSpeaking" : function(win, fail){
	    	exec(win, fail, "AsrPlugin", "resumeSpeaking", []);
	    },
	    "pauseSpeaking" : function(win, fail){
	    	exec(win, fail, "AsrPlugin", "pauseSpeaking", []);
	    },
	    "stopSpeaking" : function(win, fail){
	    	exec(win, fail, "AsrPlugin", "stopSpeaking", []);
	    },
	    "startSpeaking" : function(win, fail, text){
	    	exec(win, fail, "AsrPlugin", "startSpeaking", [text]);
	    }
	    
	};
	module.exports = Asr;
});