require('./index.less');
var $=require('jquery')
class $sale {
	constructor({content,title,confirm,btns}){
		var div=document.createElement('div');
		div.className="confirm";
		div.innerHTML=require('./index.tpl')({content,title,btns});
		document.body.appendChild(div);
		$(div).click(function(e){
			if($(e.target).hasClass('conf')){
				confirm&&confirm()
			}
			if($(e.target).hasClass('btn')){
				var that=this;
				this.className="confirm sm";
				setTimeout(()=>{
					$(that).remove();
				},280)
			}
		})
		this.$div=$(div);
	}
	
}
function sale(content){
	
}

function sale(content){
	return new $sale(content);
}

export default sale;