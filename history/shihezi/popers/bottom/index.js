require('./index.less');
var $=require('jquery')

function sale({btn,confirm}){
	var div=document.createElement('div');
	div.className="bottom";
	div.innerHTML=require('./index.tpl')({btn});
	document.body.appendChild(div);
	$(div).click(function(e){
		div.className="bottom active";
		if($(e.target).hasClass('btn')){
			var index=$(e.target).attr('data');
			confirm&&confirm.call(this,index)
		}
		setTimeout(()=>{
			$(div).remove();
		},300)
	})
}

export default sale;