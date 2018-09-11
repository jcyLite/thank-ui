require('./index.less');
function slider(targetDom, options){
	return new SliderBar(targetDom, options)
}
    var SliderBar = function (targetDom, options) {
    	if(typeof targetDom!='string'){
    		options=targetDom;
    		targetDom=undefined;
    		SliderBar.poper=true;
    	}else{
    		SliderBar.poper=false;
    	}
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了  
        // 参数
        this.options = this.extend({
            dataList: []
        }, options);
        // 获取dom
        this.targetDom = targetDom?targetDom:document.createElement('div');        
        var dataList = this.options.dataList;
        if (dataList.length > 0) {
            this.targetDom.innerHTML = require('./index.tpl')();
            this.targetDom.setAttribute('id','silderBox')
            document.body.appendChild(this.targetDom)
            this.slideBox = document.getElementById("slideBox"); 
            this.slideBtn = document.getElementById("slideBtn");                 // 拖拽按钮
            this.refreshBtn = document.getElementById("refreshBtn");             // 换图按钮
            this.slideHint = document.getElementById("slideHint");               // 提示名称
            this.slideImg = document.getElementById("slideImg");                 // 图片
            this.cutBlock = document.getElementById("cutBlock");                 // 裁剪区域
            this.slideBlock = document.getElementById("slideBlock");             // 裁剪的图片
            this.slideIcon = document.getElementById("slideIcon");               // 正确、失败的图标
            this.slideType = document.getElementById("slideType");               // 正确、失败
            this.slideContent = document.getElementById("slideContent");         // 正确、失败的正文
            this.slideHintInfo = document.getElementById("slideHintInfo");       // 弹出
            this.closeSpan = document.getElementById('closeSpan')
            this.resultX = 0;
            this.startX = 0;
            this.timer = 0;
            this.startTamp = 0;
            this.endTamp = 0;
            this.x = 0;
            this.imgWidth = 0;
            this.imgHeight = 0;
            this.imgList = [];
            this.isSuccess = true;
            var height = parseInt((window.innerHeight * 0.24))          
            this.slideBox.style.margin = ''+height+'px auto'
            for (var i = 1; i < 7; i++) {  //3 对应images图片张数 = 张数+1  下面reToNewImg随机数取整也要改变  = 张数-1
                this.imgList.push(i + ".jpg");
            }            
            
        }
        this.init();
        if(SliderBar.poper==true){
        	document.body.appendChild(this.targetDom);
        }
    }
    SliderBar.prototype = {
        init: function () {
            this.event();
        },
        extend: function (obj, obj2) {
            for (var k in obj2) {
                obj[k] = obj2[k];
            }
            return obj;
        },
        event: function () {
            var _this = this;
            _this.reToNewImg();
            _this.slideBtn.onmousedown = function(event){
                _this.mousedown(_this, event);
            } 
            _this.refreshBtn.onclick = function(){
                _this.refreshBtnClick(_this);
            }
            _this.closeSpan.onclick = function(){
            	document.body.removeChild(_this.targetDom)
            }
        },
        refreshBtnClick: function(_this){
            _this.isSuccess = true;
            _this.slideBlock.style.cssText = "";
            _this.cutBlock.style.cssText = "";
            _this.reToNewImg();
        },
        reToNewImg: function () {
            var _this = this;
            var index = Math.round(Math.random() * 5);         // 该方法有等于0 的情况
            var imgSrc = require("./images/" + _this.imgList[index] + "")
            _this.slideImg.setAttribute("src", imgSrc);
            _this.slideBlock.style.backgroundImage = "url("+ imgSrc +")";
            _this.slideImg.onload = function (e) {
                e.stopPropagation();
                _this.imgWidth = _this.slideImg.offsetWidth;                   // 图片宽
                _this.imgHeight = _this.slideImg.offsetHeight;                 // 图片高
            }
        },
        cutImg: function () {
            var _this = this;
            _this.cutBlock.style.display = "block";
            var cutWidth = _this.cutBlock.offsetWidth;                // 裁剪区域宽
            var cutHeight = _this.cutBlock.offsetHeight;              // 裁剪区域高
            // left 
            _this.resultX = Math.floor(Math.random() * (_this.imgWidth - cutWidth * 2 - 4) + cutWidth);
            // top
            var cutTop = Math.floor(Math.random() * (_this.imgHeight - cutHeight * 2) + cutHeight);
            // 设置样式
            _this.cutBlock.style.cssText = "top:" + cutTop + "px;" + "left:" + _this.resultX + "px; display: block;";
            _this.slideBlock.style.top = cutTop + "px";
            _this.slideBlock.style.backgroundPosition = "-" + _this.resultX + "px -" + cutTop + "px";
            _this.slideBlock.style.opacity = "1";
        },
        mousedown: function (_this, e) {
            e.preventDefault();
            _this.startX = e.clientX;
            _this.startTamp = (new Date()).valueOf();
            var target = e.target;
            target.style.backgroundPosition = "0 -216px";
            _this.slideHint.style.opacity = "0";
            if(_this.isSuccess){
                _this.cutImg();
            }
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);
        
            // 拖拽
            function mousemove(event) {
                _this.x = event.clientX - _this.startX;
                if (_this.x < 0) {
                    _this.slideBtn.style.left = "0px";
                    _this.slideBlock.style.left = "2px";
                } else if (_this.x >= 0 && _this.x <= 217) {
                    _this.slideBtn.style.left = _this.x + "px";
                    _this.slideBlock.style.left = _this.x + "px";
                } else {
                    _this.slideBtn.style.left = "217px";
                    _this.slideBlock.style.left = "217px";
                }
                _this.slideBtn.style.transition = "none";
                _this.slideBlock.style.transition = "none";
            };
            // 鼠标放开
            function mouseup() {
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
                var left = _this.slideBlock.style.left;
                left = parseInt(left.substring(0, left.length-2));
                if(_this.resultX > (left - 2) && _this.resultX < (left + 2)){
                    _this.isSuccess = true;
                    _this.endTamp = (new Date()).valueOf();
                    _this.timer = ((_this.endTamp - _this.startTamp) / 1000).toFixed(1);
                    // 裁剪图片(拼图的一块)
                    _this.slideBlock.style.opacity = "0";
                    _this.slideBlock.style.transition = "opacity 0.6s";
                    // 裁剪的区域(黑黑的那一块)
                    _this.cutBlock.style.opacity = "0";
                    _this.cutBlock.style.transition = "opacity 0.6s";
                    // 正确弹出的图标
                    _this.slideIcon.style.backgroundPosition = "0 -1207px";
                    _this.slideType.className = "slide-text-type greenColor";
                    _this.slideType.innerHTML = "验证通过:";
                    _this.slideContent.innerHTML = "用时" + _this.timer + "s";
                    setTimeout(function(){
                        _this.cutBlock.style.display = "none";
                        _this.slideBlock.style.left = "2px";
                        _this.reToNewImg();
                    }, 600);
                    _this.options.success&&_this.options.success();
                }else{
                    _this.isSuccess = false;
                    // 设置样式
                    // 裁剪图片(拼图的一块)
                    _this.slideBlock.style.left = "2px";
                    _this.slideBlock.style.transition = "left 0.6s";
                    // 错误弹出的图标
                    _this.slideIcon.style.backgroundPosition = "0 -1229px";
                    _this.slideType.className = "slide-text-type redColor";
                    _this.slideType.innerHTML = "验证失败:";
                    _this.slideContent.innerHTML = "拖动滑块将悬浮图像正确拼合";
                    _this.options.fail&&_this.options.fail();
                }
                // 设置样式
                _this.slideHintInfo.style.height = "22px";
                setTimeout(function(){
                    _this.slideHintInfo.style.height = "0px";
                }, 1300);
                _this.slideBtn.style.backgroundPosition = "0 -84px";
                _this.slideBtn.style.left = "0";
                _this.slideBtn.style.transition = "left 0.6s";
                _this.slideHint.style.opacity = "1";
            }
        }
    }


//var dataList = ["0"];
//var options = {
//  dataList: ["0"],
//  success:function(){  
//      console.log("show");  
//  },
//  fail: function(){
//      console.log("fail");  
//  }
//};


export default slider