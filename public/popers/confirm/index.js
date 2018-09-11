require('./index.less');
var $=require('jquery')
class $sale {
	constructor({content,title,confirm,btns}){
		var div=document.createElement('div');
		div.className="confirm";
		div.innerHTML=require('./index.tpl')({content,title,btns});
		document.body.appendChild(div);
		function cancel(){
			if(!div) return;
			div.className="confirm sm";
			setTimeout(()=>{
				div.remove();
				delete sale.cancel;
			},250)
		}
		$('.confirm .btn-container>.btn').click(function(){
			if($(this).hasClass('conf')){
				confirm&&confirm.call(this)
			}
			if($(this).hasClass('btn')){
				cancel();
			}
		})
		sale.cancel=cancel;
		this.$div=$(div);
	}
	
}

function sale(content){
	return new $sale(content);
}

export default sale;