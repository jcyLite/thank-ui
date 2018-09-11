const fs=require('fs');
const developBase=require('./development.base.js');
const files   = fs.readdirSync('./history');
files.forEach(function (item, index) {
	new developBase('history/'+item);
})