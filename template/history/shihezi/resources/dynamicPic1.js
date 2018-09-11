/* 修改日志
 * 2013.5.13 添加onChange参数
 * 2013.5.13 添加text参数
 */
 
/**
 * @param options 参数选项
 * @param options.id 图册容器id，必须
 * @param options.pics 图片URL的数组，必须
 * @param options.markers 标识URL的数组，元素0为非当前图片标识，元素1为当前图片标识，默认URL为"images/d_gray.png"和"images/d_green.png"
 * @param options.text 图片对应文字数组
 * @param options.width 图册的宽度，默认为window.innerWidth
 * @param options.height 图册的高度，默认为window.innerWidth*9/16
 * @param options.timer 图片自动切换的时间间隔，默认为5000毫秒
 * @param options.onClick 图片的点击事件响应函数
 * @param options.onChange 图片切换时响应函数
 * @param options.autoSlide 自动切换图片
 * @param options.thumbnail 是否有缩略图
 * @param options.thumbnailCount 缩略图数量
 * @param options.loop 是否循环播放
 */
function DynamicPic1(options){
	var that=this;
	this.options=options;
	
	this.dpWrapper=$("#"+options.id);
	this.dpWrapper.append("<div class='jszx-dp1'></div>").append("<div class='jszx-dp1-markers'></div>");
	
	var dpWidth=options.width||widnow.innerWidth;
	var dpHeight=options.height||(widnow.innerWidth*9/16);
	
	this.dpWrapper.css({"position":"relative"});
	this.dpWrapper.find(".jszx-dp1").width(dpWidth).height(dpHeight);
	
	if(options.text){
		this.dpWrapper.append("<div class='jszx-dp1-text'></div>");
		this.dpWrapper.find(".jszx-dp1-markers").width(dpWidth-this.dpWrapper.find(".jszx-dp1-text").width());
	}
	
	if(options.thumbnail){
		this.dpWrapper.find(".jszx-dp1-markers").hide();
		
		var thumbnailCount=options.thumbnailCount||4;
		
		var html="<div class='jszx-dp1-thumbnail' rightThumb='"+((options.pics.length>thumbnailCount)?(options.pics.length-thumbnailCount):"0")+"'>"
				+	"<img src='"+options.thumbnailControl[1]+"' class='thumbControl left' style='-webkit-transform:rotate(180deg);'>"
				+	"<div style='display:inline;'><div id='"+options.id+"Wrapper' class='jszx-wrapper'><div id='"+options.id+"Scroller' class='jszx-scroller'>"
				+	"</div></div></div>"
				+	"<img src='"+options.thumbnailControl[((options.pics.length>thumbnailCount)?"0":"1")]+"' class='thumbControl right'>"
				+"</div>";
		this.dpWrapper.append(html);
		
		var thumbnailWrapperWidth=dpWidth-this.dpWrapper.find(".jszx-dp1-thumbnail img.thumbControl").width()*2;
		var thumbnailWidth=thumbnailWrapperWidth/thumbnailCount-8;
		var thumbnailHeight=thumbnailWidth*(dpHeight/dpWidth);
		
		this.dpWrapper.find(".jszx-dp1-thumbnail").width(dpWidth).height(thumbnailHeight);
		
		this.dpWrapper.find(".jszx-wrapper").width(thumbnailWrapperWidth);
		this.dpWrapper.find(".jszx-scroller").width(thumbnailWrapperWidth/thumbnailCount*options.pics.length);
		//initScroll({"wrapper": options.id+"Wrapper","dir": "x"});
		
		var leftControl=this.dpWrapper.find(".jszx-dp1-thumbnail img.thumbControl.left");
		var rightControl=this.dpWrapper.find(".jszx-dp1-thumbnail img.thumbControl.right");
		leftControl.addEventListener("quickClick",function(){
			var rightThumb=Number(that.dpWrapper.find(".jszx-dp1-thumbnail").attr("rightThumb"));
			
			if(rightThumb>=options.pics.length-thumbnailCount)
				return;
			
			var dpThumbScroller=that.dpWrapper.find(".jszx-scroller");
			dpThumbScroller.css("left",dpThumbScroller[0].offsetLeft+thumbnailWrapperWidth/thumbnailCount+"px");
			
			that.dpWrapper.find(".jszx-dp1-thumbnail").attr("rightThumb",rightThumb+1);
			
			if(rightThumb==0)
				rightControl.attr("src",options.thumbnailControl[0]);
			if(rightThumb+1==options.pics.length-thumbnailCount)
				leftControl.attr("src",options.thumbnailControl[1]);
			
		});
		rightControl.addEventListener("quickClick",function(){
			var rightThumb=Number(that.dpWrapper.find(".jszx-dp1-thumbnail").attr("rightThumb"));
			
			if(rightThumb==0)
				return;
			
			var dpThumbScroller=that.dpWrapper.find(".jszx-scroller");
			dpThumbScroller.css("left",dpThumbScroller[0].offsetLeft-thumbnailWrapperWidth/thumbnailCount+"px");
			
			that.dpWrapper.find(".jszx-dp1-thumbnail").attr("rightThumb",rightThumb-1);
			
			if(rightThumb-1==0)
				rightControl.attr("src",options.thumbnailControl[1]);
			if(rightThumb==options.pics.length-thumbnailCount)
				leftControl.attr("src",options.thumbnailControl[0]);
			
		});
	}
    
    this.jszxDpImgLeft={
        left:"-100%"
    }
    this.jszxDpImgMiddle={
        left:"0%"
    }
    this.jszxDpImgRight={
        left:"100%"
    }
    
    this.dp=this.dpWrapper.find(".jszx-dp1");
    this.dpMarkers=this.dpWrapper.find(".jszx-dp1-markers");
	this.dpText=this.dpWrapper.find(".jszx-dp1-text");
	this.dpThumbnail=this.dpWrapper.find(".jszx-dp1-thumbnail");
	this.dpThumbnailWrapper=this.dpWrapper.find(".jszx-wrapper");
	this.dpThumbnailScroller=this.dpWrapper.find(".jszx-scroller");
    
    this.dp[0].removeEventListener(START_EV,function(e){
        e.stopPropagation();
    });
    this.dp[0].addEventListener(START_EV,function(e){
        e.stopPropagation();
    });
    
    if(options.pics.length==0){
        console.error("图片数量不能为0");
        return;
    }
    if(options.pics.length==1){
    	var $img=$("<img src='"+options.pics[0]+"' class='jszx-dp1-img'>").css(this.jszxDpImgMiddle).appendTo(this.dp);
		$img.addEventListener("quickClick",function(){
			options.onClick.call(window,0);
		});
        return;
    }
    
    this.dpImgMark=0;
    this.dpImgs=[];
    this.dpMarkerImgs=[];
    
    this.showMarker=options.markers?options.markers[1]:"images/d_green.png";
    this.hideMarker=options.markers?options.markers[0]:"images/d_gray.png";
    
    for(var i=0;i<options.pics.length;i++){
        var $img, $thumbnail;
        if(i==this.dpImgMark){
        	$img=$("<img src='"+options.pics[i]+"' class='jszx-dp1-img'>").css(this.jszxDpImgMiddle).appendTo(this.dp);
            this.dpImgs.push($img);
            this.dpMarkerImgs.push($("<img src='"+this.showMarker+"'>").appendTo(this.dpMarkers));
			
			if(options.text)
				this.dpText.text(options.text[i])
				
			if(options.thumbnail)
				$thumbnail=$("<img src='"+options.pics[i]+"' class='thumbnail active'>").appendTo(this.dpThumbnailScroller);
        }else{
        	$img=$("<img src='"+options.pics[i]+"' class='jszx-dp1-img'>").css(this.jszxDpImgRight).appendTo(this.dp);
            this.dpImgs.push($img);
            this.dpMarkerImgs.push($("<img src='"+this.hideMarker+"'>").appendTo(this.dpMarkers));
			
			if(options.thumbnail)
				$thumbnail=$("<img src='"+options.pics[i]+"' class='thumbnail'>").appendTo(this.dpThumbnailScroller);
        }

        $img.addEventListener("quickClick",function(index){
			return function(){
				if(options.onClick)
					options.onClick.call(window,index);
			}
		}(i));
		
		if(options.thumbnail){
			$thumbnail.width(thumbnailWidth).height(thumbnailHeight);
			
			$thumbnail.addEventListener("quickClick",function(index){
				return function(){
					if(index==that.dpImgMark)
						return;
					if(index>that.dpImgMark){
						that.forward(index-that.dpImgMark);
					}
					if(index<that.dpImgMark){
						that.back(that.dpImgMark-index);
					}
				}
			}(i));
		}
    }
	
	if(options.autoSlide!=false){
		if(this.dpTimer)
			clearInterval(this.dpTimer);
		this.dpTimer=setInterval($.proxy(this.playPic,this),options.timer||5000);
	}
	
	if(this.options.onChange)
		this.options.onChange.call(window,this.dpImgMark);
    
    this.dp.bind("swipeleft",{direction:"forward"},$.proxy(this.playPic,this));
    this.dp.bind("swiperight",{direction:"back"},$.proxy(this.playPic,this));
}
DynamicPic1.prototype.forward=function(step){
	var event={};
	event.data={};
	event.data.direction="forward";
	event.data.step=step;
	this.playPic(event);
}
DynamicPic1.prototype.back=function(step){
	var event={};
	event.data={};
	event.data.direction="back";
	event.data.step=step;
	this.playPic(event);
}
DynamicPic1.prototype.playPic=function(event){

    if(event && event.data && event.data.direction){
		if(this.options.autoSlide!=false)
			clearInterval(this.dpTimer);
        
        if(event.data.direction=="back"){
			if(this.options.loop==false && this.dpImgMark==0)
				return;
				
			var preImg;
			if(event.data.step){
				var actualSetp=event.data.step%this.dpImgs.length;
				preImg=(this.dpImgMark-actualSetp)<0?this.dpImgs.length-(actualSetp-this.dpImgMark):this.dpImgMark-actualSetp;
			}else
				preImg=(this.dpImgMark-1)<0?this.dpImgs.length-1:this.dpImgMark-1;
            
            this.dpImgs[preImg].css(this.jszxDpImgLeft);
            this.dpImgs[this.dpImgMark].animate(this.jszxDpImgRight,500);
            this.dpImgs[preImg].animate(this.jszxDpImgMiddle,500);
            
            this.dpMarkerImgs[this.dpImgMark][0].src=this.hideMarker;
            this.dpMarkerImgs[preImg][0].src=this.showMarker;
            
            this.dpImgMark=preImg;
        }else{
			if(this.options.loop==false && this.dpImgMark==this.dpImgs.length-1)
				return;
		
			var nextImg;
			if(event.data.step){
				nextImg=(this.dpImgMark+event.data.step)%this.dpImgs.length;
			}else
				nextImg=(this.dpImgMark+1)%this.dpImgs.length;
			
            this.dpImgs[this.dpImgMark].animate(this.jszxDpImgLeft,500,$.proxy(function(mark){
                return function(){
                    this.dpImgs[mark].css(this.jszxDpImgRight);
                }
            }(this.dpImgMark),this));
            this.dpImgs[nextImg].animate(this.jszxDpImgMiddle,500);
            
            this.dpMarkerImgs[this.dpImgMark][0].src=this.hideMarker;
            this.dpMarkerImgs[nextImg][0].src=this.showMarker;
            
            this.dpImgMark=nextImg;
        }
		
		if(this.options.text)
			this.dpText.text(this.options.text[this.dpImgMark])
				
		if(this.options.onChange)
			this.options.onChange.call(window,this.dpImgMark);
        
		if(this.options.autoSlide!=false)
			this.dpTimer=setInterval($.proxy(this.playPic,this),this.options.timer||3000);
			
		if(this.options.thumbnail){
			this.dpThumbnailScroller.find("img.active").removeClass("active");
			this.dpThumbnailScroller.find("img:eq("+this.dpImgMark+")").addClass("active");
		}
        return;
    }
	
    if(!this.dp.closest("div[data-role=page]").hasClass("ui-page-active"))
        return;
    
	if(this.options.loop==false && this.dpImgMark==this.dpImgs.length-1)
		return;
		
	var nextImg=(this.dpImgMark+1)%this.dpImgs.length;
    this.dpImgs[this.dpImgMark].animate(this.jszxDpImgLeft,500,$.proxy(function(mark){
        return function(){
            this.dpImgs[mark].css(this.jszxDpImgRight);
        }
    }(this.dpImgMark),this));
    this.dpImgs[nextImg].animate(this.jszxDpImgMiddle,500);
    
    this.dpMarkerImgs[this.dpImgMark][0].src=this.hideMarker;
    this.dpMarkerImgs[nextImg][0].src=this.showMarker;
    
    this.dpImgMark=nextImg;
	
	if(this.options.text)
		this.dpText.text(this.options.text[this.dpImgMark])
			
	if(this.options.onChange)
		this.options.onChange.call(window,this.dpImgMark);
	
	if(this.options.thumbnail){
		this.dpThumbnailScroller.find("img.active").removeClass("active");
		this.dpThumbnailScroller.find("img:eq("+this.dpImgMark+")").addClass("active");
	}
}