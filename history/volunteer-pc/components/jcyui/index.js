var jcy = require('jcy');
import './index.less';
import {extend} from './extend'
var jcyui = function(selector) {
	if(jcy.isString(selector)) {
		return new $ui(selector);
	} else if(jcy.isObject(selector)) {
		return new oui(selector)
	}
};
var cache = {},
	oclick = {},
	ohover = {},
	otouch = {};
var newArray = new Array;
var oui = function(obj) {
	this.all = jcy.extend(cache, obj);
	this.init();
}
var $ui = function(selector) {
	this.sel = selector;
}
$ui.fn = $ui.prototype;
oui.fn = oui.prototype;
$ui.fn.extend = oui.fn.extend = jcyui.extend = extend;
function allevent(othis, selector, e) {
	var o = othis.attr(selector),
		u = o.indexOf('('),
		z = o.indexOf(')'),
		t = o.substring(u + 1, z),
		d = o.substring(0, u),
		c = t ? t.split(',') : [];
	c.unshift(e);
	return function(val) {
		if(!val) {
			return c;
		} else {
			return d || o;
		}
	};
};
jcyui.extend({
	click: function(obj) {
		console.log(2323)
		jcyui('body').click(jcy.extend(oclick, obj));
	},
	hover: function(obj) {
		jcyui('body').hover(jcy.extend(ohover, obj));
	},
	touch: function(obj) {
		jcyui('body').hover(jcy.extend(otouch, obj));
	}
});
oui.fn.extend({
	init: function() {
		if(jcy.isObject(this.all)) {
			this.all.click && jcyui('body').click(jcy.extend(oclick, this.all.click));
			this.all.hover && jcyui('body').hover(jcy.extend(ohover, this.all.hover));
			this.all.touch && jcyui('body').touch(jcy.extend(otouch, this.all.touch));
			this.all.tpl && jcy('body').append(this.all.tpl);
			this.all.toggleShow && this.toggleShow();
		}
	},
	toggleShow: function() {
		var u = this.all.toggleShow;
		jcy(u.parent).find(u.button).click(function() {
			var index = jcy(this).index();
			var a = jcy(u.parent).find(u.box).eq(index);
			a.removeClass('jcyui-hide').addClass('jcyui-show');
			a.siblings(u.box).removeClass('jcyui-show').addClass('jcyui-hide');
		})
	}
})
$ui.fn.extend({
	hover: function(selector, eve) {
		if(jcy.isObject(selector)) {
			eve = selector;
			selector = 'j-hover';
		}
		jcy(this.sel).on('mouseover', '*[' + selector + ']', function(e) {
			e.stopPropagation();
			var u = allevent(jcy(this), selector, e)
			var c = u();
			var g = u(!0);
			eve[g] ? eve[g].apply(this, c) : '';
		})
	},
	click: function(selector, eve) {
		if(jcy.isObject(selector)) {
			eve = selector;
			selector = 'j-click';
		}
		jcy(this.sel).on('click', '*[' + selector + ']', function(e) {
			e.stopPropagation();
			var u = allevent(jcy(this), selector, e)
			var c = u();
			var g = u(!0);
			eve[g] ? eve[g].apply(this, c) : '';
		})
	},
	touch: function(selector, eve) {
		if(jcy.isObject(selector)) {
			eve = selector;
			selector = 'j-touch';
		}
		var move = 0;
		jcy(this.sel).on('touchend', '*[' + selector + ']', function(e) {
				e.stopPropagation();
				if(move) return move = 0;
				var u = allevent(jcy(this), selector, e)
				var c = u();
				var g = u(!0);
				eve[g] ? eve[g].apply(this, c) : '';
			}).on('touchmove', '*[' + selector + ']', function() {
				move = 1
			})
			.on('touchstart', '*[' + selector + ']', function() {
				move = 0;
			})
	}
})
	var cut = ['<div class="jcyui-container">', '<div class="jcyui-left">', '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"', 'viewBox="0 0 68.6 68.9" enable-background="new 0 0 68.6 68.9" xml:space="preserve">', '<line fill="#20A8BB" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="51.2" y1="4" x2="20.6" y2="34.6"/>', '<line fill="none" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="20.6" y1="34.6" x2="51.5" y2="65.4"/>', '</svg>', '</div>', '<div class="jcyui-imgcontainer">', '{{# jcy.each(d.images,function(index,item){ }}', '<div class="jcyui-imgbox" style="background-image:url({{item}})"></div>', '{{# }) }}', '</div>', '<div class="jcyui-right">', '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"', 'viewBox="0 0 68.6 68.9" enable-background="new 0 0 68.6 68.9" xml:space="preserve">', '<line fill="#20A8BB" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="20.9" y1="65.4" x2="51.5" y2="34.9"/>', '<line fill="none" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="51.5" y1="34.9" x2="20.6" y2="4"/>', '</svg>', '</div>', '</div>'].join('');
	$ui.fn.extend({
		carousel: function(options) {
			var that = this,
				a = 0;
			options = options || {};
			options.skin = options.skin || '';
			options.images = options.images.school_src || [];
			var c = -(options.images.length - 3) * 233;
			if(options.skin === 1) {
				jcy.tpl(cut).render(options, function(tpl) {
					jcy(that.sel).html(tpl);
					if(options.hover) {
						jcy('body').on('mouseover', '.jcyui-imgbox', function() {
							options.hover.apply(this, arguments)
						})
					};
					if(options.click) {
						jcy('body').on('click', '.jcyui-imgbox', function() {
							var arr = arguments;
							newArray.unshift.call(arr, options.images[jcy(this).index()])
							options.click.apply(this, arguments)
						})
					}
					jcy('body').on('mouseenter', '.jcyui-left', function() {
						jcy(this).css('cursor', 'pointer');
					}).on('mouseenter', '.jcyui-right', function() {
						jcy(this).css('cursor', 'pointer');
					}).on('click', '.jcyui-left', function() {
						if(a >= 0) {
							jcy('.jcyui-imgcontainer').css('margin-left', '0px');
						} else {
							a = a + 252;
							jcy('.jcyui-imgcontainer').css('margin-left', a + 'px');
						}
					}).on('click', '.jcyui-right', function() {
						if(a <= c) {
							jcy('.jcyui-imgcontainer').css('margin-left', c + 'px')
						} else {
							a = a - 252;
							jcy('.jcyui-imgcontainer').css('margin-left', a + 'px')
						}
					});
				})
			}
		}
	})
export default jcyui;