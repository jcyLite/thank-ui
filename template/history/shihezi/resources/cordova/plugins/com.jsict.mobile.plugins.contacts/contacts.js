cordova.define("com.jsict.mobile.plugins.contacts.ContactDialogPlugin", function(require, exports, module) {
	var exec = require('cordova/exec');
	var contactsDialog = {
		getContacts : function(win, fail, multi){
		    if(!multi)
		    	multi = false;
		    exec(win, fail, "ContactDialogPlugin" , "", [multi]);
		}	
	};
	module.exports = contactsDialog;
});