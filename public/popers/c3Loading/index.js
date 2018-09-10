require('./index.less')

function c3Loading(){
	var div = document.createElement('div')	
	div.setAttribute('class','c3Loading')
	var dom = require('./index.tpl')()	
	div.innerHTML = dom
	document.body.appendChild(div)
}

export default c3Loading