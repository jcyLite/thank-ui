require('./index.less');
var $=require('jquery')
class $sale {
	constructor(content){
		var div=document.createElement('div');
		div.className="sale";
		div.innerHTML=require('./index.tpl')({content});
		document.body.appendChild(div);
		$(div).click(function(e){
			if(/cancel/.test(e.target.className)){
				var that=this;
				this.className="sale sm";
				setTimeout(()=>{
					$(that).remove();
				},300)
			}
		})
		this.$div=$(div);
	}
	confirm(fn){
		this.$div.click((e)=>{
			if(/confirm/.test(e.target.className)){
				fn.call(this,e)
			}
		})
		return this;
	}
	
}
function sale(content){
	
}

function sale(content){
	return new $sale(content);
}

export default sale;