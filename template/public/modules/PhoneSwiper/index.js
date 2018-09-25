import './css/photoswipe.css';
import './css/default-skin/default-skin.css';
import PhoneSwipe from './index.vue';
var PhotoSwipe = require('./js/photoswipe.min.js');
var PhotoSwipeUI_Default = require('./js/photoswipe-ui-default.min.js');

function openPhotoSwipe(targetDom) {
	console.log(targetDom.__proto__);
	var index=$('.'+targetDom.className).index(targetDom)
	var items=[];
	var list=$('.'+targetDom.className)
	for(var i=0;i<list.length;i++){
		items.push({
			src:list.eq(i).attr('src'),
			w:list.eq(i).width()*5,
			h:list.eq(i).height()*5
		})
	}
	// define options (if needed)
	var options = {
		loop: false,
		closeOnScroll: false,
		// history & focus options are disabled on CodePen        
		history: true,
		focus: true,
		index:index,
		showAnimationDuration: true,
		hideAnimationDuration: true
	};

	var gallery = new PhotoSwipe(
		document.querySelectorAll('.pswp')[0],
		PhotoSwipeUI_Default, 
		items, 
		options
	);
	gallery.init();
};

export {
	openPhotoSwipe,
	PhoneSwipe
};