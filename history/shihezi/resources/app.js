// window.serverUrl="http://192.168.1.5:8080/shz/outwebmobile/";
// window.serverUrl="http://192.168.1.109:8080/outweb/outwebmobile/";
// window.serverUrl="http://202.102.101.92:18088/shz/outwebmobile/";
//window.serverUrl="http://shzzwfw2.shz.gov.cn/shz/outwebmobile/";
window.serverUrl="http://10.1.163.15:8181/shz/outwebmobile/";
// window.picUrl="http://202.102.101.92:18088/shz/upload/qlsxlct/";
// window.picUrl="http://202.102.101.92:18088/shz/upload/";
window.serverShenbaoUrl="http://shzzwfw2.shz.gov.cn/shz/outWeb/index.action";
window.picUrl="http://shzzwfw1.shz.gov.cn/shz/upload/";
window.des_key="h1y2i3j4l8";
window.versionNumber = "1.0.6";
window.resUrl=window.location.href.replace("pages/main/load.html","resources/");

// local  "http://192.168.1.95:8080";  http://202.102.101.92:18088
var remoteServer = "http://202.102.101.92:18088";

//$("div[data-role=page]").live("pagecreate",function(e){
//  $(e.currentTarget).find(".jszx-bar-icon-up>div:eq(0)").listen("quickClick",function(e){
//		$.mobile.changePage("main.html");
//	});
//	$(e.currentTarget).find(".jszx-bar-icon-up>div:eq(1)").listen("quickClick",function(e){
//		$.mobile.changePage("setting.html");
//	});
//});
var doc = document.documentElement;
var curDeviceWidth = doc.clientWidth || window.innerWidth;
doc.style.fontSize = curDeviceWidth * (16 / 412) + 'px';
//$("div[data-role=page]").live("pageshow",function(e){
//  $(e.currentTarget).find("*[user-role]").each(function(){
//      var roles=$(this).attr("user-role");
//      roles=roles.split(" ");
//      var flag=false;
//      for(var i=0;i<roles.length;i++){
//          if(roles[i]==window.userRole){
//              flag=true;
//              break;
//          }
//      }
//      if(flag)
//          $(this).show();
//      else
//          $(this).hide();
//  });
//});
//$("div[data-role=page]").live("pagecreate",function(e){
//  $(e.currentTarget).find(".back-button").listen("quickClick",backButtonListener);
//  
//});
function backButtonListener(){
    window.history.back();
}
//判断字符串是否为空：若str为undefined,null,""，返回true，否则，返回false
function isNull(str){
	str = $.trim(str);
	if(!str || str=="" || str=="null" || str=="undefined")
		return true;
	return false;
}
function skipNull(str){
	if(isNull(str)){
		return "";
	}
	return str;
}
function skipNullNum(str){
	if(isNull(str)){
		return 0;
	}
	return str;
}
//简单的键值对
function SimpleMap(){
	this.key="";
	this.value="";
}
function cutText(str,num,id){
	$("#"+id).css("text-align","right");
	var num3 = parseInt(num) + 3;
	if (str.trim().length<=num3) {
		$("#"+id).html(str);
	} else{
		$("#"+id).html("<span id='isNotAllText"+id+"' class='isNotAllText"+id+"' >"+str.trim().simple(num)+"</span><span id='more_text"+id+"' style='float:right;color:#0080e0;text-align:right;'>更多</span>");
		$("#more_text"+id+"").bind("click",function(){
			if($("#more_text"+id+"").html()=="更多"){
				$("#isNotAllText"+id+"").html(str);
				$("#more_text"+id+"").html("收起");
				$("#"+id).css("text-align","left");
			}else{
				$("#isNotAllText"+id+"").html(str.trim().simple(num));
				$("#more_text"+id+"").html("更多");
				$("#"+id).css("text-align","right");
			}
		});
	};	
}
function cutText2(str,num){
	var num = parseInt(num);
	if (str.trim().length<=num) {
		return str;
	} else{
		return str.substring(0,num)+"...";
	};	
}

function bgBeforeLoad(id) {
    var $bgNode = $("#" + id);
    var html = "";
    html += '<div class="shz_bg_page"></div>';
    $(html).appendTo($bgNode);
}

function removeBg() {
    $(".ui-page-active").find(".shz_bg_page").remove();
}
