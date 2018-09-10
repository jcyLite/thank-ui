require('./index.less');
var $=require('jquery')

function sale({btn,confirm}){
	var div=document.createElement('div');
	div.className="bottom";
	div.innerHTML=require('./index.tpl')({btn});
	document.body.appendChild(div);
	function cancel(){
		if(!div) return;
		div.className="bottom active";
		setTimeout(()=>{
			$(div).remove();
			delete sale.cancel;
		},250)
	}
	$(div).click(function(e){
		cancel()
		if($(e.target).hasClass('btn')){
			var index=$(e.target).attr('data');
			confirm&&confirm.call(this,index)
		}
	})
	sale.cancel=cancel
}

export default sale;