const $ = require('jquery');
(function() {
	window.supportTouch = "ontouchstart" in window;
	window.START_EV = window.supportTouch ? "touchstart" : "mousedown";
	window.MOVE_EV = window.supportTouch ? "touchmove" : "mousemove";
	window.END_EV = window.supportTouch ? "touchend" : "mouseup";
})()

function getTranslateOffset(element) {
	var transform = element.style.WebkitTransform || "";
	var translate = transform.match(/\-?[0-9]+\.?[0-9]*/g) || 0;
	return Number(translate);
}

function scrollTE(e) {
	var currentTarget = e.currentTarget;
	var $currentTarget = $(currentTarget);
	currentTarget.removeEventListener(MOVE_EV, scrollTM);
	currentTarget.removeEventListener(END_EV, scrollTE);

	var point = window.supportTouch ? e.changedTouches[0] : e;
	var touchStartX = $currentTarget.data("startX");
	var touchStartY = $currentTarget.data("startY");
	var touchStartTime = $currentTarget.data("startTime");

	var touchEndOffset = getTranslateOffset(currentTarget);
	var touchEndTime = new Date();

	var $scrollBar = $currentTarget.data("scrollBar");
	var scrollDir = $currentTarget.data("scrollDir");
	var dir = $currentTarget.data("direction");

	var pullDownLoading = $currentTarget.data("pullDownLoading");
	var pullUpLoading = $currentTarget.data("pullUpLoading");
	var $pullDown = $currentTarget.parent().find(".pull-down");
	var $pullUp = $currentTarget.parent().find(".pull-up");

	var touchEndCallback = $currentTarget.data("touchEnd");
	var scrollEndCallback = $currentTarget.data("scrollEnd");

	currentTarget.style.WebkitTransition = "-webkit-transform 0.3s ease-out";
	var touchMove, domMoveAvl, barMoveAvl;
	if(scrollDir == "x") {
		touchMove = point.clientX - touchStartX;
		domMoveAvl = $currentTarget.parent().width() - $currentTarget.width();
		barMoveAvl = $currentTarget.parent().width() - $scrollBar.width();
	} else {
		touchMove = point.clientY - touchStartY;
		domMoveAvl = $currentTarget.parent().height() - $currentTarget.height();
		barMoveAvl = $currentTarget.parent().height() - $scrollBar.height();
	}

	//click or taphold
	if(dir == null) {

		return;
	}
	if((dir == "x" && scrollDir == "x") || (dir == "y" && scrollDir == "y")) {
		if(touchEndCallback)
			touchEndCallback.call($currentTarget, touchEndOffset);

		var translate = "translate" + dir.toUpperCase();

		//弹回
		if(touchEndOffset > 0) {

			if($currentTarget.data("autoHideScrollBar") == true)
				$scrollBar.animate({
					"opacity": "0"
				}, 500);

			$scrollBar[0].style.webkitTransform = translate + "(0px)";
			if(pullDownLoading && touchEndOffset > 50) {
				currentTarget.style.webkitTransform = translate + "(50px)";

				$pullDown[0].style.top = "0px";
				$pullDown.find("span").text("正在刷新，请稍候...");
				$pullDown.find("img").attr("src", require("@/resources/images/loading.gif"));

				pullDownLoading.call(window, function(listReset) {
					setTimeout(function() {
						if(listReset)
							currentTarget.style.webkitTransform = translate + "(0px)";

						$pullDown[0].style.top = "-50px";
						$pullDown.find("span").text("下拉进行刷新");
						$pullDown.find("img")[0].style.webkitTransform = "rotate(0deg)";
						$pullDown.find("img").attr("src", require("@/resources/images/pull-down.png"));
					}, 300)
				})
			} else {
				currentTarget.style.webkitTransform = translate + "(0px)";

				if(pullDownLoading) {
					$pullDown[0].style.top = "-50px";
					$pullDown.find("span").text("下拉进行刷新");
					$pullDown.find("img")[0].style.webkitTransform = "rotate(0deg)";
				}
			}

			return;
		}

		//弹回
		if(domMoveAvl > 0) {

			if($currentTarget.data("autoHideScrollBar") == true)
				$scrollBar.animate({
					"opacity": "0"
				}, 500);

			if(pullUpLoading && touchEndOffset < -50) {
				if(domMoveAvl > 50)
					currentTarget.style.webkitTransform = translate + "(0px)";
				else
					currentTarget.style.webkitTransform = translate + "(" + (domMoveAvl - 50) + "px)";

				$pullUp[0].style.bottom = "0px";
				$pullUp.find("span").text("正在加载，请稍候...");
				$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
				$pullUp.find("img").attr("src", require("@/resources/images/loading.gif"));

				pullUpLoading.call(window, function(listReset) {
					if(listReset)
						currentTarget.style.webkitTransform = translate + "(0px)";

					$pullUp[0].style.bottom = "-50px";
					$pullUp.find("span").text("上拉加载更多");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
					$pullUp.find("img").attr("src", require("@/resources/images/pull-up.png"));
				})
			} else {
				currentTarget.style.webkitTransform = translate + "(0px)";
				$scrollBar[0].style.webkitTransform = translate + "(0px)";

				if(pullUpLoading) {
					$pullUp[0].style.bottom = "-50px";
					$pullUp.find("span").text("上拉加载更多");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
				}
			}

			return;
		}

		//弹回
		if(touchEndOffset < domMoveAvl) {

			if($currentTarget.data("autoHideScrollBar") == true)
				$scrollBar.animate({
					"opacity": "0"
				}, 500);

			$scrollBar[0].style.webkitTransform = translate + "(" + barMoveAvl + "px)";
			if(pullUpLoading && touchEndOffset < domMoveAvl - 50) {
				currentTarget.style.webkitTransform = translate + "(" + (domMoveAvl - 50) + "px)";
				$pullUp[0].style.bottom = "0px";
				$pullUp.find("span").text("正在加载，请稍候...");
				$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
				$pullUp.find("img").attr("src", require("@/resources/images/loading.gif"));

				pullUpLoading.call(window, function(listReset) {
					if(listReset)
						currentTarget.style.webkitTransform = translate + "(" + domMoveAvl + "px)";

					$pullUp[0].style.bottom = "-50px";
					$pullUp.find("span").text("上拉加载更多");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
					$pullUp.find("img").attr("src", require("@/resources/images/pull-up.png"));
				})
			} else {
				currentTarget.style.webkitTransform = translate + "(" + domMoveAvl + "px)";

				if(pullUpLoading) {
					$pullUp[0].style.bottom = "-50px";
					$pullUp.find("span").text("上拉加载更多");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
				}
			}

			return;
		}

		if($currentTarget.data("inertia") == false) {
			if(scrollEndCallback)
				scrollEndCallback(touchEndOffset, $currentTarget);
			return;
		}

		var touchInterval = touchEndTime.getTime() - touchStartTime.getTime();
		if(touchInterval <= 500) {
			var scrollDistance = Math.abs((dir == "x" ? 800 : 500) * touchMove * touchMove / touchInterval / touchInterval);
			var endOffset;
			if(touchMove > 0) {
				if(touchEndOffset + scrollDistance > 0)
					endOffset = 0;
				else
					endOffset = touchEndOffset + scrollDistance;
			} else {
				if(touchEndOffset - scrollDistance < domMoveAvl)
					endOffset = domMoveAvl;
				else
					endOffset = touchEndOffset - scrollDistance;
			}

			var scrollInterval = Math.abs((endOffset - touchEndOffset) * touchInterval / touchMove) / 1000;
			currentTarget.style.WebkitTransition = "-webkit-transform " + scrollInterval + "s ease-out";
			$scrollBar[0].style.WebkitTransition = "-webkit-transform " + scrollInterval + "s ease-out";

			var scrollBarEndOffset;
			if(dir == "x")
				scrollBarEndOffset = -endOffset * $currentTarget.parent().width() / $currentTarget.width();
			else
				scrollBarEndOffset = -endOffset * $currentTarget.parent().height() / $currentTarget.height();

			currentTarget.style.webkitTransform = translate + "(" + endOffset + "px)";
			$scrollBar[0].style.webkitTransform = translate + "(" + scrollBarEndOffset + "px)";

			if(scrollEndCallback)
				scrollEndCallback(endOffset, $currentTarget);

			if($currentTarget.data("autoHideScrollBar") == true) {
				setTimeout(function() {
					$scrollBar.animate({
						"opacity": "0"
					}, 500);
				}, scrollInterval)
			}

		} else {
			if(scrollEndCallback)
				scrollEndCallback(touchEndOffset, $currentTarget);

			if($currentTarget.data("autoHideScrollBar") == true) {
				$scrollBar.animate({
					"opacity": "0"
				}, 500);
			}
		}
	}
}

function scrollTM(e) {
	e.preventDefault();

	var currentTarget = e.currentTarget;
	var $currentTarget = $(currentTarget);

	var point = window.supportTouch ? e.touches[0] : e;
	var touchStartX = $currentTarget.data("startX");
	var touchStartY = $currentTarget.data("startY");
	var touchStartOffset = $currentTarget.data("startOffset");
	var touchStartTime = $currentTarget.data("startTime");

	var $scrollBar = $currentTarget.data("scrollBar");
	var scrollDir = $currentTarget.data("scrollDir");
	var bounce = $currentTarget.data("bounce");

	var pullDownLoading = $currentTarget.data("pullDownLoading");
	var pullUpLoading = $currentTarget.data("pullUpLoading");
	var $pullDown = $currentTarget.parent().find(".pull-down");
	var $pullUp = $currentTarget.parent().find(".pull-up");

	var touchMoveCallback = $currentTarget.data("touchMove");

	currentTarget.style.WebkitTransition = "";
	$scrollBar[0].style.WebkitTransition = "";

	var touchMoveX = point.clientX - touchStartX;
	var touchMoveY = point.clientY - touchStartY;

	var domMove, barMove, domMoveAvl, barMoveAvl;
	if(scrollDir == "x") {
		domMove = touchStartOffset + touchMoveX;
		barMove = -domMove * $currentTarget.parent().width() / $currentTarget.width();
		domMoveAvl = $currentTarget.parent().width() - $currentTarget.width();
		barMoveAvl = $currentTarget.parent().width() - $scrollBar.width();
	} else {
		domMove = touchStartOffset + touchMoveY;
		barMove = -domMove * $currentTarget.parent().height() / $currentTarget.height();
		domMoveAvl = $currentTarget.parent().height() - $currentTarget.height();
		barMoveAvl = $currentTarget.parent().height() - $scrollBar.height() - $currentTarget.find(".pull-down").height() - $currentTarget.find(".pull-up").height();
	}

	var dir;
	if(!$currentTarget.data("direction")) {
		if(Math.abs(touchMoveX) < 5 && Math.abs(touchMoveY) < 5)
			return;
		dir = Math.abs(touchMoveX) - Math.abs(touchMoveY);
		if(dir > 0)
			$currentTarget.data("direction", "x");
		else
			$currentTarget.data("direction", "y");
	}
	dir = $currentTarget.data("direction");

	if((dir == "x" && scrollDir == "x") || (dir == "y" && scrollDir == "y")) {

		var translate = "translate" + dir.toUpperCase();

		if($currentTarget.data("autoHideScrollBar") == true)
			$scrollBar[0].style.opacity = 0.8;

		if(domMove > 0 || domMoveAvl >= 0) {
			domMove = bounce ? 0 : domMove / 3;
			barMove = bounce ? 0 : barMove / 3;

			if(domMove > 0 && pullDownLoading) {
				$pullDown[0].style.top = (-50 + domMove) + "px";
				if(domMove > 50) {
					$pullDown.find("span").text("松开开始刷新");
					$pullDown.find("img")[0].style.webkitTransform = "rotate(180deg)";
				} else {
					$pullDown.find("span").text("下拉进行刷新");
					$pullDown.find("img")[0].style.webkitTransform = "rotate(0deg)";
				}
			} else if(domMove < 0 && pullUpLoading) {
				$pullUp[0].style.bottom = (-50 - domMove) + "px";

				if(-domMove > 50) {
					$pullUp.find("span").text("松开开始加载");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(180deg)";
				} else {
					$pullUp.find("span").text("上拉加载更多");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
				}
			}
		} else if(domMove < domMoveAvl) {
			domMove = bounce ? domMoveAvl : (domMoveAvl + (domMove - domMoveAvl) / 3);
			barMove = bounce ? barMoveAvl : (barMoveAvl + (barMove - barMoveAvl) / 3);

			if(domMove < domMoveAvl && pullUpLoading) {
				$pullUp[0].style.bottom = (-50 + domMoveAvl - domMove) + "px";

				if(domMoveAvl - domMove > 50) {
					$pullUp.find("span").text("松开开始加载");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(180deg)";
				} else {
					$pullUp.find("span").text("上拉加载更多");
					$pullUp.find("img")[0].style.webkitTransform = "rotate(0deg)";
				}
			}
		}

		currentTarget.style.webkitTransform = translate + "(" + domMove + "px)";
		$scrollBar[0].style.webkitTransform = translate + "(" + barMove + "px)";

		if(touchMoveCallback)
			touchMoveCallback(domMove);
	}
}
/*
 	params:event
 */
function scrollTS(e) {
	var target = e.target;
	var currentTarget = e.currentTarget;
	var $currentTarget = $(currentTarget);
	while(target !== currentTarget) {
		if($(target).attr("browserclick"))
			return;
		target = target.parentElement;
	}
	currentTarget.addEventListener(MOVE_EV, scrollTM);
	currentTarget.addEventListener(END_EV, scrollTE);
	var point = window.supportTouch ? e.touches[0] : e;
	$currentTarget.data("startX", point.clientX);
	$currentTarget.data("startY", point.clientY);
	$currentTarget.data("startOffset", getTranslateOffset($currentTarget[0]));
	$currentTarget.data("startTime", new Date());
	$currentTarget.data("direction", null);
}
/*
 	params:
 */
const initScroll = (el) => {
	return new $initScroll(el)
}
class $initScroll {
	constructor(el) {
		this.$wrapper = $(el);
		this.$scroller = $(el + '>div')
		this.$scroller.css("transition", ".2s ease-out");
		this.$wrapper.css('background','#F5F8F7')
	}
	setOptions(options) {
		options = options || {};
		this.$wrapper.height(window.innerHeight);
		this.$scroller.on(START_EV, scrollTS);
		var $scrollBar;
		if(options["dir"] == "x") {
			this.$scroller.css("min-width", "100%");

			$scrollBar = $("<div class='scroll-bar-x'></div>")
			var scrollerWidth = this.$scroller.width();
			var wrapperWidth = this.$wrapper.width();
			var scrollBarWidth = (scrollerWidth <= wrapperWidth ? 0 : Math.floor(wrapperWidth * wrapperWidth / scrollerWidth));
			$scrollBar.width(scrollBarWidth);
		} else {
			this.$scroller.css("min-height", "100%");

			$scrollBar = $("<div class='scroll-bar-y'></div>")
			var scrollerHeight = this.$scroller.height();
			var wrapperHeight = this.$wrapper.height();
			var scrollBarHeight = (scrollerHeight <= wrapperHeight ? 0 : Math.floor(wrapperHeight * wrapperHeight / scrollerHeight));
			$scrollBar.height(scrollBarHeight);
		}
		$scrollBar.appendTo(this.$wrapper);
		this.$scroller.data("scrollBar", $scrollBar);

		if(options["scrollBar"] == false)
			$scrollBar.hide();
		if(options["autoHideScrollBar"] == true)
			$scrollBar[0].style.opacity = 0;

		if(options["pullDownLoading"]) {
			var html = "<div class='pull-down' style='position:absolute;top:-50px;height:50px;width:100%;line-height:50px;text-align:center;border:0;padding:0;margin:0;'>" +
				"<img style='position:relative;height:30px;top:10px;margin-right:10px;-webkit-transition:-webkit-transform 0.1s ease-out;-webkit-transform:rotate(0deg);' src='" + require("@/resources/images/pull-down.png") + "'>" +
				"<span style='font-size:0.9em;color:#888;'>下拉进行刷新</span>" +
				"</div>";
			$(html).appendTo(this.$wrapper);
			this.$scroller.data("pullDownLoading", options["pullDownLoading"]);
		}

		if(options["pullUpLoading"]) {
			var html = "<div class='pull-up' style='position:absolute;bottom:-50px;height:50px;width:100%;line-height:50px;text-align:center;border:0;padding:0;margin:0;'>" +
				"<img style='position:relative;height:30px;top:10px;margin-right:10px;-webkit-transition:-webkit-transform 0.1s ease-out;-webkit-transform:rotate(0deg);' src='" + require("@/resources/images/pull-up.png") + "'>" +
				"<span style='font-size:0.9em;color:#888;'>上拉加载更多</span>" +
				"</div>";
			$(html).appendTo(this.$wrapper);
			this.$scroller.data("pullUpLoading", options["pullUpLoading"]);
		}

		this.$scroller.data("scrollExBottomHandler", options["scrollExBottomHandler"]);
		this.$scroller.data("scrollExTopHandler", options["scrollExTopHandler"]);

		this.$scroller.data("scrollDir", options["dir"]);
		this.$scroller.data("bounce", options["bounce"]);
		this.$scroller.data("autoHideScrollBar", options["autoHideScrollBar"]);
		this.$scroller.data("inertia", options["inertia"]);

		this.$scroller.data("touchStart", options["touchStart"]);
		this.$scroller.data("touchMove", options["touchMove"]);
		this.$scroller.data("touchEnd", options["touchEnd"]);

		this.$scroller.data("scrollEnd", options["scrollEnd"]);
	}
}

export {
	initScroll
}