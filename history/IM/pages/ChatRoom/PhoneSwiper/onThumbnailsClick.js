import { PhotoSwipeUI_Default, PhotoSwipe } from '%/modules/PhoneSwiper';
var closest = function closest(el, fn) {
	return el && (fn(el) ? el : closest(el.parentNode, fn));
};
export default function onThumbnailsClick(target,mparent,mchild) {
	var a=$(target).parents(mparent);
	openPhotoSwipe(target,0, $(mchild).parents(mparent).parent()[0],mchild);
}

function parseThumbnailElements(el,target) {
	var thumbElements = el.childNodes,
		numNodes = thumbElements.length,
		items = [],
		el,
		childElements,
		thumbnailEl,
		size,
		item;
	
	for(var i = 0; i < numNodes; i++) {
		el = thumbElements[i];
		console.log(el.className)
		console.log(target.className)
		// include only element nodes 
		if(el.className!=target.className){
			continue;
		}

		childElements = el.children;
		size = [500, 500]

		// create slide object
		item = {
			src: el.getAttribute('href'),
			w: parseInt(size[0], 10),
			h: parseInt(size[1], 10),
			author: el.getAttribute('data-author')
		};

		item.el = el; // save link to element for getThumbBoundsFn

		if(childElements.length > 0) {
			item.msrc = childElements[0].getAttribute('src'); // thumbnail url
			if(childElements.length > 1) {
				item.title = childElements[1].innerHTML; // caption (contents of figure)
			}
		}
		var mediumSrc;
		if($(el).find('.layui-layim-photos')) {
			mediumSrc = $(el).find('.layui-layim-photos').attr('src');
		}
		if(mediumSrc) {
			size = [500, 500];
			// "medium-sized" image
			item.m = {
				src: mediumSrc,
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10)
			};
		}
		// original image
		item.o = {
			src: item.src,
			w: item.w,
			h: item.h
		};

		items.push(item);
	}
	console.log(items);
	return items;
};

function openPhotoSwipe(target,index, galleryElement,mchild) {
	var pswpElement = document.querySelectorAll('.pswp')[0],
		gallery,
		options,
		items;

	items = parseThumbnailElements(galleryElement,target);
	// define options (if needed)
	options = {

		galleryUID: galleryElement.getAttribute('data-pswp-uid'),

		getThumbBoundsFn: function(index) {
			// See Options->getThumbBoundsFn section of docs for more info
			var thumbnail = items[index].el.children[0],
				pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
				rect = thumbnail.getBoundingClientRect();
			console.log(rect)
			return {
				x: rect.left,
				y: rect.top + pageYScroll,
				w: rect.width
			};
		},

		addCaptionHTMLFn: function(item, captionEl, isFake) {
			if(!item.title) {
				captionEl.children[0].innerText = '';
				return false;
			}
			captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
			return true;
		},

	};

	options.index = parseInt(index, 10);

	// exit if index not found
	if(isNaN(options.index)) {
		return;
	}

	var radios = document.getElementsByName('gallery-style');
	for(var i = 0, length = radios.length; i < length; i++) {
		if(radios[i].checked) {
			if(radios[i].id == 'radio-all-controls') {

			} else if(radios[i].id == 'radio-minimal-black') {
				options.mainClass = 'pswp--minimal--dark';
				options.barsSize = {
					top: 0,
					bottom: 0
				};
				options.captionEl = false;
				options.fullscreenEl = false;
				options.shareEl = false;
				options.bgOpacity = 0.85;
				options.tapToClose = true;
				options.tapToToggleControls = false;
			}
			break;
		}
	}
	var oclassName=$(target)[0].className;
	var $oclassName=$('.'+oclassName);
	var index;
	for(var i=0;i<$oclassName.length;i++){
		if($(target)[0]==$oclassName[i]){
			options.index=i;
		}
	}
	var abcarr=[];var afterAbcArr=[];
	var iii=0;
	for(var key in items){
		if($(items[key].title).hasClass('layui-layim-photos')){
			var w=$oclassName.eq(iii).width();
			var h=$oclassName.eq(iii).height();
			delete items[key].bounds;
			delete items[key].o;
			items[key].m.h=h*2;
			items[key].m.w=w*2;
			console.log(items[key])
			abcarr.push(items[key]);
			iii++;
		}
	}
	console.log(JSON.stringify(abcarr))
	// Pass data to PhotoSwipe and initialize it
	gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, abcarr, options);

	// see: http://photoswipe.com/documentation/responsive-images.html
	var realViewportWidth,
		useLargeImages = false,
		firstResize = true,
		imageSrcWillChange;

	gallery.listen('beforeResize', function() {
		console.log('beforeResize')
		var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
		dpiRatio = Math.min(dpiRatio, 2.5);
		realViewportWidth = gallery.viewportSize.x * dpiRatio;

		if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
			if(!useLargeImages) {
				useLargeImages = true;
				imageSrcWillChange = true;
			}

		} else {
			if(useLargeImages) {
				useLargeImages = false;
				imageSrcWillChange = true;
			}
		}

		if(imageSrcWillChange && !firstResize) {
			gallery.invalidateCurrItems();
		}

		if(firstResize) {
			firstResize = false;
		}

		imageSrcWillChange = false;

	});

	gallery.listen('gettingData', function(index, item) {
		console.log('gettingData')
		item.src = item.m&&item.m.src;
		item.w = item.m&&item.m.w;
		item.h = item.m&&item.m.h;
	});

	gallery.init();
};