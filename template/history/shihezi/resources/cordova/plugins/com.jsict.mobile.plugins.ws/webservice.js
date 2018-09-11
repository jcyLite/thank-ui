cordova.define("com.jsict.mobile.plugins.ws", function(require, exports, module){
	var exec = require("cordova/exec");
	var utils = require('cordova/utils');
	var WebService = function(){
		this.id = utils.createUUID();
	};
	var listener = [];
	WebService.prototype = {
	    "call" : function(win, fail, option){
		    var nameSpace = option.nameSpace;
		    var methodName = option.methodName;
		    var serviceURL = option.serviceUrl;
		    var soapAction = option.soapAction;
		    var ver = option.ver;
		    var converter = option.converter;
		    var timeout = option.timeout;
		    var params = option.params;
		    var attachments = option.attachments;
		    if(typeof(attachments) == "undefined") 
    		    attachments = "";
    		if(typeof(converter) == "undefined") 
    		    converter = "";
	    	listener[this.id] = {
                win : win,
                fail : fail
            };
	    	
            if(!params)
                params = "";        
            if(!attachments)
                attachments = "";
            exec(
            	function(result){
    			    var xmldom = new DOMParser().parseFromString(result.data,"text/xml");
    	            var json = $.xml2json(xmldom);
    	            listener[result.id].win(json);
    	            listener[result.id] = null;
    	        }, 
    	        function(error){
    	    	    listener[error.id].fail(error.error);
    	            listener[error.id] = null;
    	        }, 
    	        "WebServicePlugin", "", 
    	        [this.id, nameSpace, methodName, serviceURL, soapAction, ver, converter, timeout, params, attachments]
    	    );
		}    
	};
	module.exports = WebService;
});