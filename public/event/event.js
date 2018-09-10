/**
 * this module will let you can defined a custom event
 * @return {[type]}
 */
(function () {
  if(!!window.CustomEvent) return;
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   };

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
var timeout;
var isMove;
var timestamp;
document.addEventListener('touchstart',function(e){
	timestamp=new Date().getTime();
	var a=new CustomEvent('longtap', {
 		'detail':e.changedTouches[0]
	})
	timeout=setTimeout(()=>{
		for(var i=0;i<e.path.length;i++){
			e.path[i].dispatchEvent(a)
		}
	},800)
});
document.addEventListener('touchmove',function(e){
	isMove=true;
	clearTimeout(timeout);
});
document.addEventListener('touchend',function(e){
	isMove=false;
	var nowTime=new Date().getTime();
	if(nowTime-timestamp<800){
		clearTimeout(timeout);
	}
})
