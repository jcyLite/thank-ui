var jcy=require('jcy')
import './index.less'
var jcyer=function(sel){
		if(!sel.skin){
			return new ojcyer(sel);
		}else{
			return $jcyer(sel);
		}
	};
var ojcyer=function(sel){
	this.sel=sel;
};
var $jcyer=function(options){
	if(options.type=='list'){
		if(options.skin==1){
			return $list1(options);
		}
	}else{
		if(options.skin==1){
			return $jcyer1(options)
		}
	}
}
function $jcyer1(options){
	var tpl=['<div class="jcyer-skin1" style="top:'+window.innerHeight/2+'px;">'
	,options.content||''
	,'</div>'].join('');
	jcy(options.selector||'body').find('.jcyer-skin1').remove();
	jcy(options.selector||'body').append(tpl);
	jcy(function(){
		setTimeout(function(){
			jcy(options.selector||'body').find('.jcyer-skin1').addClass('active').css('top',window.innerHeight/2-5+'px');
		},20)
		setTimeout(function(){
			jcy(options.selector||'body').find('.jcyer-skin1').removeClass('active').css('top',window.innerHeight/2+'px');;
			jcy(options.selector||'body').find('.jcyer-skin1').remove();
		},3000||options.time)
	})
}
function $list1(options){
	
}
ojcyer.fn=ojcyer.prototype;
ojcyer.fn.imgShade=function(options){
	var that=this;
	var src=that.sel.src||jcy(that.sel).attr('src')||options.url;
	var img=new Image();
	console.log(src);
	img.src=src;
	img.onload=function(){
		var tpl=['<div class="jcyer-shade">'
		,'<div class="jcyer-img" style="width:'+this.width+'px">'
		,'<img src="'+this.src+'"/>'
		,'<div class="jcyer-close">X</div>'
		,'</div>'
		,'</div>'].join('');
		jcy(options.box||'body').append(tpl);
		jcy(function(){
			jcy(options.box||'body').find('.jcyer-shade').on('click',function(e){
				if(jcy(e.target).hasClass('jcyer-shade')||jcy(e.target).hasClass('jcyer-close')){
					jcy(this).remove();
				}
			})
		})
		setTimeout(function(){
			jcy('.jcyer-shade').addClass('active');
			},20)
		}
	};
	
module.exports=jcyer