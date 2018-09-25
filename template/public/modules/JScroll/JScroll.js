/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
const $ = require('jquery');
import './pullDown/pullDown.less';
import './pullUp/pullUp.less';
import Indicator from "./Indicator.js";
import utils from './utils.js';
const pullUpTpl = require('./pullUp/pullUp.tpl')();
const pullDownTpl = require('./pullDown/pullDown.tpl')();
var rAF = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};



function JScroll(el, options) {
	options=options||{};
	$(el).height(window.innerHeight - $(el).offset().top);
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style; // cache style for better performance
	const $scroller = $(el + '>div:first-child');
	this.options = {

		resizeScrollbars: true,

		mouseWheelSpeed: 20,

		snapThreshold: 0.334,

		// INSERT POINT: OPTIONS
		disablePointer: !utils.hasPointer,
		disableTouch: utils.hasPointer || !utils.hasTouch,
		disableMouse: utils.hasPointer || utils.hasTouch,
		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		probeType: 3,
		scrollbars: false,
		fadeScrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'clip',

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: {
			tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
		},

		HWCompositing: true,
		useTransition: true,
		useTransform: true,
		bindToWrapper: typeof window.onmousedown === "undefined"
	};
	for(var i in options) {
		this.options[i] = options[i];
	}
	if(options.pullDownLoading) {
		this.$pullDown = $(pullDownTpl);
		this.$pullDown.appendTo($scroller);
	}
	if(options.pullUpLoading) {
		this.$pullUp = $(pullUpTpl);
		this.$pullUp.appendTo($scroller);
	}
	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if(this.options.tap === true) {
		this.options.tap = 'tap';
	}

	if(this.options.shrinkScrollbars == 'scale') {
		this.options.useTransition = false;
	}

	this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	if(this.options.probeType == 3) {
		this.options.useTransition = false;
	}

	// INSERT POINT: NORMALIZATION

	// Some defaults
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

	// INSERT POINT: DEFAULTS

	this._init();
	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
	this.refresh();
}

JScroll.prototype = {
	version: '5.2.0',

	_init: function() {
		this._initEvents();
		if(this.options.initAjax){
			this._initAjax();
		}
		
		if(this.options.scrollbars || this.options.indicators) {
			this._initIndicators();
		}

		if(this.options.mouseWheel) {
			this._initWheel();
		}

		if(this.options.snap) {
			this._initSnap();
		}

		if(this.options.keyBindings) {
			this._initKeys();
		}

		// INSERT POINT: _init

	},
	_initAjax(){
		this.options.initAjax((reset)=>{
			if(reset){
				this.refresh();
			}
		})
	},
	destroy: function() {
		this._initEvents(true);
		clearTimeout(this.resizeTimeout);
		this.resizeTimeout = null;
		this._execEvent('destroy');
	},

	_transitionEnd: function(e) {
		if(e.target != this.scroller || !this.isInTransition) {
			return;
		}

		this._transitionTime();
		if(!this.resetPosition(this.options.bounceTime)) {
			this.isInTransition = false;
			this._execEvent('scrollEnd');
		}
	},

	_start: function(e) {
		// React to left mouse button only
		if(utils.eventType[e.type] != 1) {
			// for button property
			// http://unixpapa.com/js/mouse.html
			var button;
			if(!e.which) {
				/* IE case */
				button = (e.button < 2) ? 0 :
					((e.button == 4) ? 1 : 2);
			} else {
				/* All others */
				button = e.button;
			}
			if(button !== 0) {
				return;
			}
		}

		if(!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
			return;
		}

		if(this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated = utils.eventType[e.type];
		this.moved = false;
		this.distX = 0;
		this.distY = 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this.startTime = utils.getTime();

		if(this.options.useTransition && this.isInTransition) {
			this._transitionTime();
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
		} else if(!this.options.useTransition && this.isAnimating) {
			this.isAnimating = false;
			this._execEvent('scrollEnd');
		}

		this.startX = this.x;
		this.startY = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX = point.pageX;
		this.pointY = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function(e) {
		if(!this.enabled || utils.eventType[e.type] !== this.initiated) {
			return;
		}

		if(this.options.preventDefault) { // increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			deltaX = point.pageX - this.pointX,
			deltaY = point.pageY - this.pointY,
			timestamp = utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX = point.pageX;
		this.pointY = point.pageY;

		this.distX += deltaX;
		this.distY += deltaY;
		absDistX = Math.abs(this.distX);
		absDistY = Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if(timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if(!this.directionLocked && !this.options.freeScroll) {
			if(absDistX > absDistY + this.options.directionLockThreshold) {
				this.directionLocked = 'h'; // lock horizontally
			} else if(absDistY >= absDistX + this.options.directionLockThreshold) {
				this.directionLocked = 'v'; // lock vertically
			} else {
				this.directionLocked = 'n'; // no lock
			}
		}

		if(this.directionLocked == 'h') {
			if(this.options.eventPassthrough == 'vertical') {
				e.preventDefault();
			} else if(this.options.eventPassthrough == 'horizontal') {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if(this.directionLocked == 'v') {
			if(this.options.eventPassthrough == 'horizontal') {
				e.preventDefault();
			} else if(this.options.eventPassthrough == 'vertical') {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}
		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		//		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;
		// Slow down if outside of the boundaries
		if(newX > 0 || newX < this.maxScrollX) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if(newY > 0 || newY < this.maxScrollY) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}
		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if(!this.moved) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

		/* REPLACE START: _move */
		if(timestamp - this.startTime > 300) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;

			if(this.options.probeType == 1) {
				this._execEvent('scroll');
			}
		}

		if(this.options.probeType > 1) {
			this._execEvent('scroll');
		}
		/* REPLACE END: _move */

	},

	_end: function(e) {
		if(!this.enabled || utils.eventType[e.type] !== this.initiated) {
			return;
		}

		if(this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();
		// reset if we are outside of the boundaries
		if(this.resetPosition(this.options.bounceTime)) {
			return;
		}

		this.scrollTo(newX, newY); // ensures that the last position is rounded

		// we scrolled less than 10 pixels
		if(!this.moved) {
			if(this.options.tap) {
				utils.tap(e, this.options.tap);
			}

			if(this.options.click) {
				utils.click(e);
			}

			this._execEvent('scrollCancel');
			return;
		}

		if(this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if(this.options.momentum && duration < 300) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
				destination: newX,
				duration: 0
			};
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
				destination: newY,
				duration: 0
			};
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}

		if(this.options.snap) {
			var snap = this._nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
				Math.max(
					Math.min(Math.abs(newX - snap.x), 1000),
					Math.min(Math.abs(newY - snap.y), 1000)
				), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = this.options.bounceEasing;
		}

		// INSERT POINT: _end

		if(newX != this.x || newY != this.y) {
			// change easing function when scroller goes out of the boundaries
			if(newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function() {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function() {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function(time) {

		var x = this.x,
			y = this.y;

		time = time || 0;

		if(!this.hasHorizontalScroll || this.x > 0) {
			x = 0;
		} else if(this.x < this.maxScrollX) {
			x = this.maxScrollX;
		}

		if(!this.hasVerticalScroll || this.y > 0) {
			y = 0;
		} else if(this.y < this.maxScrollY) {
			y = this.maxScrollY;
		}

		if(x == this.x && y == this.y) {
			return false;
		}
		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function() {
		this.enabled = false;
	},

	enable: function() {
		this.enabled = true;
	},

	refresh: function() {
		$(() => {
			var rf = this.wrapper.offsetHeight; // Force reflow

			this.wrapperWidth = this.wrapper.clientWidth;
			this.wrapperHeight = this.wrapper.clientHeight;

			/* REPLACE START: refresh */

			this.scrollerWidth = this.scroller.offsetWidth;
			this.scrollerHeight = this.scroller.offsetHeight;

			this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

			/* REPLACE END: refresh */

			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

			if(!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if(!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;

			this.wrapperOffset = utils.offset(this.wrapper);

			this._execEvent('refresh');

			this.resetPosition();
		})
		// INSERT POINT: _refresh

	},

	on: function(type, fn) {
		if(!this._events[type]) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function(type, fn) {
		if(!this._events[type]) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if(index > -1) {
			this._events[type].splice(index, 1);
		}
	},

	_execEvent: function(type) {
		if(!this._events[type]) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if(!l) {
			return;
		}

		for(; i < l; i++) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},

	scrollBy: function(x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function(x, y, time, easing) {
		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;
		var transitionType = this.options.useTransition && easing.style;
		if(!time || transitionType) {
			if(transitionType) {
				this._transitionTimingFunction(easing.style);
				this._transitionTime(time);
			}
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function(el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if(!el) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if(offsetX === true) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if(offsetY === true) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;
		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function(time) {
		time = time || 0;

		var durationProp = utils.style.transitionDuration;
		this.scrollerStyle[durationProp] = time + 'ms';

		if(!time && utils.isBadAndroid) {
			this.scrollerStyle[durationProp] = '0.0001ms';
			// remove 0.0001ms
			var self = this;
			rAF(function() {
				if(self.scrollerStyle[durationProp] === '0.0001ms') {
					self.scrollerStyle[durationProp] = '0s';
				}
			});
		}

		if(this.indicators) {
			for(var i = this.indicators.length; i--;) {
				this.indicators[i].transitionTime(time);
			}
		}

		// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function(easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

		if(this.indicators) {
			for(var i = this.indicators.length; i--;) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}

		// INSERT POINT: _transitionTimingFunction

	},

	_translate: function(x, y) {
		if(this.options.useTransform) {

			/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

			/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;

		if(this.indicators) {
			for(var i = this.indicators.length; i--;) {
				this.indicators[i].updatePosition();
			}
		}

		// INSERT POINT: _translate

	},

	_initEvents: function(remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if(this.options.click) {
			eventType(this.wrapper, 'click', this, true);
		}
	
		if(!this.options.disableMouse) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}
		if(utils.hasPointer && !this.options.disablePointer) {
			eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
			eventType(target, utils.prefixPointerEvent('pointermove'), this);
			eventType(target, utils.prefixPointerEvent('pointercancel'), this);
			eventType(target, utils.prefixPointerEvent('pointerup'), this);
		}

		if(utils.hasTouch && !this.options.disableTouch) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function() {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if(this.options.useTransform) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return {
			x: x,
			y: y
		};
	},
	_initIndicators: function() {
		var interactive = this.options.interactiveScrollbars,
			customStyle = typeof this.options.scrollbars != 'string',
			indicators = [],
			indicator;

		var that = this;

		this.indicators = [];

		if(this.options.scrollbars) {
			// Vertical scrollbar
			if(this.options.scrollY) {
				indicator = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if(this.options.scrollX) {
				indicator = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}
		}

		if(this.options.indicators) {
			// TODO: check concat compatibility
			indicators = indicators.concat(this.options.indicators);
		}

		for(var i = indicators.length; i--;) {
			this.indicators.push(new Indicator(this, indicators[i]));
		}

		// TODO: check if we can use array.map (wide compatibility and performance issues)
		function _indicatorsMap(fn) {
			if(that.indicators) {
				for(var i = that.indicators.length; i--;) {
					fn.call(that.indicators[i]);
				}
			}
		}

		if(this.options.fadeScrollbars) {
			this.on('scrollEnd', function() {
				_indicatorsMap(function() {
					this.fade();
				});
			});

			this.on('scrollCancel', function() {
				_indicatorsMap(function() {
					this.fade();
				});
			});

			this.on('scrollStart', function() {
				_indicatorsMap(function() {
					this.fade(1);
				});
			});

			this.on('beforeScrollStart', function() {
				_indicatorsMap(function() {
					this.fade(1, true);
				});
			});
		}

		this.on('refresh', function() {
			_indicatorsMap(function() {
				this.refresh();
			});
		});

		this.on('destroy', function() {
			_indicatorsMap(function() {
				this.destroy();
			});

			delete this.indicators;
		});
	},

	_initWheel: function() {
		utils.addEvent(this.wrapper, 'wheel', this);
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function() {
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = null;
			utils.removeEvent(this.wrapper, 'wheel', this);
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function(e) {
		if(!this.enabled) {
			return;
		}

		e.preventDefault();

		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		if(this.wheelTimeout === undefined) {
			that._execEvent('scrollStart');
		}

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function() {
			if(!that.options.snap) {
				that._execEvent('scrollEnd');
			}
			that.wheelTimeout = undefined;
		}, 400);

		if('deltaX' in e) {
			if(e.deltaMode === 1) {
				wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
				wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
			} else {
				wheelDeltaX = -e.deltaX;
				wheelDeltaY = -e.deltaY;
			}
		} else if('wheelDeltaX' in e) {
			wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
			wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
		} else if('wheelDelta' in e) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
		} else if('detail' in e) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
		} else {
			return;
		}

		wheelDeltaX *= this.options.invertWheelDirection;
		wheelDeltaY *= this.options.invertWheelDirection;

		if(!this.hasVerticalScroll) {
			wheelDeltaX = wheelDeltaY;
			wheelDeltaY = 0;
		}

		if(this.options.snap) {
			newX = this.currentPage.pageX;
			newY = this.currentPage.pageY;

			if(wheelDeltaX > 0) {
				newX--;
			} else if(wheelDeltaX < 0) {
				newX++;
			}

			if(wheelDeltaY > 0) {
				newY--;
			} else if(wheelDeltaY < 0) {
				newY++;
			}

			this.goToPage(newX, newY);

			return;
		}

		newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

		this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
		this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

		if(newX > 0) {
			newX = 0;
		} else if(newX < this.maxScrollX) {
			newX = this.maxScrollX;
		}

		if(newY > 0) {
			newY = 0;
		} else if(newY < this.maxScrollY) {
			newY = this.maxScrollY;
		}
		this.scrollTo(newX, newY, 0);

		if(this.options.probeType > 1) {
			this._execEvent('scroll');
		}

		// INSERT POINT: _wheel
	},

	_initSnap: function() {
		this.currentPage = {};

		if(typeof this.options.snap == 'string') {
			this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		}

		this.on('refresh', function() {
			var i = 0,
				l,
				m = 0,
				n,
				cx, cy,
				x = 0,
				y,
				stepX = this.options.snapStepX || this.wrapperWidth,
				stepY = this.options.snapStepY || this.wrapperHeight,
				el;

			this.pages = [];

			if(!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
				return;
			}

			if(this.options.snap === true) {
				cx = Math.round(stepX / 2);
				cy = Math.round(stepY / 2);

				while(x > -this.scrollerWidth) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while(y > -this.scrollerHeight) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				el = this.options.snap;
				l = el.length;
				n = -1;

				for(; i < l; i++) {
					if(i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
						m = 0;
						n++;
					}

					if(!this.pages[m]) {
						this.pages[m] = [];
					}

					x = Math.max(-el[i].offsetLeft, this.maxScrollX);
					y = Math.max(-el[i].offsetTop, this.maxScrollY);
					cx = x - Math.round(el[i].offsetWidth / 2);
					cy = y - Math.round(el[i].offsetHeight / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: el[i].offsetWidth,
						height: el[i].offsetHeight,
						cx: cx,
						cy: cy
					};

					if(x > this.maxScrollX) {
						m++;
					}
				}
			}

			this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

			// Update snap threshold if needed
			if(this.options.snapThreshold % 1 === 0) {
				this.snapThresholdX = this.options.snapThreshold;
				this.snapThresholdY = this.options.snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
			}
		});

		this.on('flick', function() {
			var time = this.options.snapSpeed || Math.max(
				Math.max(
					Math.min(Math.abs(this.x - this.startX), 1000),
					Math.min(Math.abs(this.y - this.startY), 1000)
				), 300);

			this.goToPage(
				this.currentPage.pageX + this.directionX,
				this.currentPage.pageY + this.directionY,
				time
			);
		});
	},

	_nearestSnap: function(x, y) {
		if(!this.pages.length) {
			return {
				x: 0,
				y: 0,
				pageX: 0,
				pageY: 0
			};
		}

		var i = 0,
			l = this.pages.length,
			m = 0;

		// Check if we exceeded the snap threshold
		if(Math.abs(x - this.absStartX) < this.snapThresholdX &&
			Math.abs(y - this.absStartY) < this.snapThresholdY) {
			return this.currentPage;
		}

		if(x > 0) {
			x = 0;
		} else if(x < this.maxScrollX) {
			x = this.maxScrollX;
		}

		if(y > 0) {
			y = 0;
		} else if(y < this.maxScrollY) {
			y = this.maxScrollY;
		}

		for(; i < l; i++) {
			if(x >= this.pages[i][0].cx) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		for(; m < l; m++) {
			if(y >= this.pages[0][m].cy) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if(i == this.currentPage.pageX) {
			i += this.directionX;

			if(i < 0) {
				i = 0;
			} else if(i >= this.pages.length) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if(m == this.currentPage.pageY) {
			m += this.directionY;

			if(m < 0) {
				m = 0;
			} else if(m >= this.pages[0].length) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x: x,
			y: y,
			pageX: i,
			pageY: m
		};
	},

	goToPage: function(x, y, time, easing) {
		easing = easing || this.options.bounceEasing;

		if(x >= this.pages.length) {
			x = this.pages.length - 1;
		} else if(x < 0) {
			x = 0;
		}

		if(y >= this.pages[x].length) {
			y = this.pages[x].length - 1;
		} else if(y < 0) {
			y = 0;
		}

		var posX = this.pages[x][y].x,
			posY = this.pages[x][y].y;

		time = time === undefined ? this.options.snapSpeed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};

		this.scrollTo(posX, posY, time, easing);
	},

	next: function(time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x++;

		if(x >= this.pages.length && this.hasVerticalScroll) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	},

	prev: function(time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x--;

		if(x < 0 && this.hasVerticalScroll) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	},

	_initKeys: function(e) {
		// default key bindings
		var keys = {
			pageUp: 33,
			pageDown: 34,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		var i;

		// if you give me characters I give you keycode
		if(typeof this.options.keyBindings == 'object') {
			for(i in this.options.keyBindings) {
				if(typeof this.options.keyBindings[i] == 'string') {
					this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
				}
			}
		} else {
			this.options.keyBindings = {};
		}

		for(i in keys) {
			this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
		}

		utils.addEvent(window, 'keydown', this);

		this.on('destroy', function() {
			utils.removeEvent(window, 'keydown', this);
		});
	},

	_key: function(e) {
		if(!this.enabled) {
			return;
		}

		var snap = this.options.snap, // we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			newY = snap ? this.currentPage.pageY : this.y,
			now = utils.getTime(),
			prevTime = this.keyTime || 0,
			acceleration = 0.250,
			pos;

		if(this.options.useTransition && this.isInTransition) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this.isInTransition = false;
		}

		this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

		switch(e.keyCode) {
			case this.options.keyBindings.pageUp:
				if(this.hasHorizontalScroll && !this.hasVerticalScroll) {
					newX += snap ? 1 : this.wrapperWidth;
				} else {
					newY += snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.pageDown:
				if(this.hasHorizontalScroll && !this.hasVerticalScroll) {
					newX -= snap ? 1 : this.wrapperWidth;
				} else {
					newY -= snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length - 1 : this.maxScrollX;
				newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			default:
				return;
		}

		if(snap) {
			this.goToPage(newX, newY);
			return;
		}

		if(newX > 0) {
			newX = 0;
			this.keyAcceleration = 0;
		} else if(newX < this.maxScrollX) {
			newX = this.maxScrollX;
			this.keyAcceleration = 0;
		}

		if(newY > 0) {
			newY = 0;
			this.keyAcceleration = 0;
		} else if(newY < this.maxScrollY) {
			newY = this.maxScrollY;
			this.keyAcceleration = 0;
		}

		this.scrollTo(newX, newY, 0);

		this.keyTime = now;
	},
	_rotateDown(type) {
		switch(type) {
			case 'loading':
				this.$pullDown.find('span').text('正在刷新数据')
				this.$pullDown.find('img').attr('src', require('./images/loading.gif'))
				break;
			case 'pullOver':
				this.$pullDown.find('span').text('松开刷新数据')
				this.$pullDown.find('img').attr('src', require('./images/pull-up.png'))
				break;
			case 'pullBefore':
				this.$pullDown.find('span').text('下拉进行刷新');
				this.$pullDown.find('img').attr('src', require('./images/pull-down.png'))
				break;
			case 'nodata':
				this.$pullUp&&this.$pullUp.find('span').text('上拉加载更多');
				this.$pullUp&&this.$pullUp.find('img').attr('src', require('./images/pull-up.png'));
				this.nodata=false;
				break;
		}
	},
	_pullDownLoading(e) {
		var that = this;
		var MIN = 50;
		if(e.type == 'pointerup') {
			if(this.y > MIN) {
				that.scrollTo(0, MIN, 300);
				this._rotateDown('loading')
				that.options.pullDownLoading(function(isReset) {
					if(isReset) {
						that._rotateDown('nodata')
						that.refresh();
					}
				});
				return true;
			}
		} else if(e.type == 'pointermove') {
			if(this.y > MIN) {
				this._rotateDown('pullOver')
			} else {
				this._rotateDown('pullBefore')
			}
		}
	},
	_rotateUp(type) {
		switch(type) {
			case 'loading':
				this.$pullUp.find('span').text('正在刷新数据')
				this.$pullUp.find('img').attr('src', require('./images/loading.gif'))
				break;
			case 'pullOver':
				this.$pullUp.find('span').text('松开刷新数据')
				this.$pullUp.find('img').attr('src', require('./images/pull-down.png'))
				break;
			case 'pullBefore':
				this.$pullUp.find('span').text('上拉加载更多');
				this.$pullUp.find('img').attr('src', require('./images/pull-up.png'))
				break;
			case 'nodata':
				this.nodata = true;
				this.$pullUp.find('span').text('暂无更多数据');
				this.$pullUp.find('img').attr('src', '')
				break;
		}
	},
	_pullUpLoading(e) {
		var that = this;
		window.uu = that;
		var MAX = -this.scrollerHeight + this.wrapperHeight - 50;
		if(e.type == 'pointerup') {
			if(this.y < MAX) {
				that.scrollTo(0, MAX, 300);
				that._rotateUp('loading');
				that.options.pullUpLoading((isReset) => {
					if(isReset == 'nodata') {
						that.refresh();
						return that._rotateUp('nodata')
					}
					if(isReset) {
						that._rotateUp('pullBefore');
						that.refresh();
					}
				})
				return true;
			}
		} else if(e.type == "pointermove") {
			if(this.y < MAX) {
				this._rotateUp('pullOver')
			} else {
				this._rotateUp('pullBefore')
			}
		}
	},
	_animate: function(destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step() {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if(now >= destTime) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if(!that.resetPosition(that.options.bounceTime)) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = (now - startTime) / duration;
			easing = easingFn(now);
			newX = (destX - startX) * easing + startX;
			newY = (destY - startY) * easing + startY;

			that._translate(newX, newY);

			if(that.isAnimating) {
				rAF(step);
			}

			if(that.options.probeType == 3) {
				that._execEvent('scroll');
			}
		}

		this.isAnimating = true;
		step();
	},

	handleEvent: function(e) {
		if(this.options.pullDownLoading && this._pullDownLoading(e)) {
			return;
		}
		if(this.options.pullUpLoading && !this.nodata && this._pullUpLoading(e)) {
			return;
		}
		switch(e.type) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if(this.enabled && !e._constructed) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};

function createDefaultScrollbar(direction, interactive, type) {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

	if(type === true) {
		scrollbar.style.cssText = 'position:absolute;z-index:9999';
		indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0, 0, 0,0.3);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	}

	indicator.className = 'iScrollIndicator';

	if(direction == 'h') {
		if(type === true) {
			scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
			indicator.style.height = '100%';
		}
		scrollbar.className = 'iScrollHorizontalScrollbar';
	} else {
		if(type === true) {
			scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
			indicator.style.width = '100%';
		}
		scrollbar.className = 'iScrollVerticalScrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';

	if(!interactive) {
		scrollbar.style.pointerEvents = 'none';
	}

	scrollbar.appendChild(indicator);

	return scrollbar;
}


JScroll.utils = utils;

export default JScroll;