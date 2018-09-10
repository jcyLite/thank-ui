const $=require('jquery');
function tipsXY({x,y,options,confirm}){
	require('./index.less');
	if(tipsXY.div){
		document.body.removeChild(tipsXY.div);
		tipsXY.div=null
	}
	var width=150;
	tipsXY.div=document.createElement('div');
	tipsXY.div.className="tipsXY";
	var html=require('./index.tpl')({options})
	$(tipsXY.div).html(html);
	$(function(){
		var height=$('.tipsXY>.selecter').height()
		var showleft=(window.innerWidth-x<(width+20))
		var showtop=(window.innerHeight-y<(height+150))
		if(showleft){
			x=x-width;
		}
		if(showtop){
			y=y-height;
		}
		$('.tipsXY>.selecter').css({
			"left":x+'px',
			"top":y+'px',
			transform:`scale(.2,.2)`,
			width
		})
		setTimeout(()=>{
			$('.tipsXY>.selecter')
			.addClass('active')
			.css({
				transform:`scale(1,1)`
			})
		},20);
		
		$('.selecter>.options').click(function(){
			confirm&&confirm($(this).index());
		})
		$(document).click(function(){
			$('.tipsXY>.selecter').removeClass('active')
			tipsXY.timeout=setTimeout(()=>{
				if(tipsXY.div){
					document.body.removeChild(tipsXY.div);
					tipsXY.div=null;
				}
			},300)
		})
	})
	document.body.appendChild(tipsXY.div);
}
export default tipsXY;