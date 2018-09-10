require('../api/api.map.baidu.js');
var map = new BMap.Map("container");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 15);

function SearchControl() {
	// 设置默认停靠位置和偏移量  
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT; //相对于左上角
	this.defaultOffset = new BMap.Size(100, 20); //相对于图标左上角的位置
}
// 通过JavaScript的prototype属性继承于BMap.Control   
SearchControl.prototype = new BMap.Control();
SearchControl.prototype.initialize = function(map) {
	var div = $("<div><font size='2'>关键字</font><input id='mytext' type='text'><input id='mybtn' type='button' value='查询'></div");
	$(map.getContainer()).append(div); //将以上的html添加到地图中覆盖
	$("#mybtn").css("border-radius", 8); //设置按钮圆角
	$("#mybtn").on("click", function() { //按钮点击后 调用api搜索
		var val = $("#mytext").val();
		var local = new BMap.LocalSearch(map, {
			renderOptions: {
				map: map
			}
		});
		local.search(val);
	});
	// 将DOM元素返回  
	return div[0];
}
//地图点击事件 获取经纬度
map.addEventListener("click", function() {
	var center = map.getCenter();
	alert("地图中心点变更为：" + center.lng + ", " + center.lat);
});
map.addControl(new SearchControl()); //将自定义的控件添加到地图中