require('./index.less')

function mask(content){
	var div = document.createElement('div')
	div.className = 'mask'
	div.id="mask"
	div.innerHTML = require('./index.tpl')({content})
	document.body.appendChild(div)
	var closeMask =  document.getElementById('closeMask')
	closeMask.onclick=function(){
		document.body.removeChild(div)
		document.body.style.overflow = 'inherit'
	}
}
export default mask
