require('./index.less');

function tips(content){
	if(tips.t){clearTimeout(tips.t)};content=content||"";
	document.getElementsByClassName('otips').length
	&&document.body.removeChild(document.getElementsByClassName('otips')[0]);
	var div=document.createElement('div');
	div.className="otips";
	div.innerHTML=require('./index.tpl')({content});
	document.body.appendChild(div);
	tips.t=setTimeout(()=>{
		document.body.removeChild(div);
	},2000)
}
export default  tips;