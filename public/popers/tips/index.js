

function tips(content){
	if(tips.t){clearTimeout(tips.t)};content=content||"";
	document.getElementsByClassName('otips').length
	&&document.body.removeChild(document.getElementsByClassName('otips')[0]);
	var div=document.createElement('div');
	div.className="otips";
	if(typeof content=='string'){
		require('./index.less');
		div.innerHTML=require('./index.tpl')({content});
	}else if(typeof content=='object'){
		if(content.type=='1'){
			require('./index.less');
			div.innerHTML=require('./index.tpl')(content);
		}else if(content.type=='right'){
			require('./tips-right.less');
			require('./tips-right.js');
			div.innerHTML=require('./tips-right.tpl')(content)
		}
	}
	document.body.appendChild(div);
	tips.t=setTimeout(()=>{
		document.body.removeChild(div);
	},2000)
}
export default tips;