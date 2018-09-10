require('./index.less');

function loading(options){
	var div=document.createElement('div');
	div.className="loading";
	div.innerHTML=require('./index.tpl')(options);
	document.body.appendChild(div);
	loading.div.push(div);
}
loading.div=[]
loading.close=function(){
	document.body.removeChild(loading.div.shift());
}
export {loading};