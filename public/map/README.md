###this module explain how to use baidu map successful.
##if you want to use this module
##you can import it like this:
	import { initMap, $, BMap } from '%/map/map.run.js';
	import BMapLib from './map.lib.js';
	
##before use it, when dom mounted
##you can init it like this:
	initMap();

##when you want a search map
##you can use it like this:
	function makepoint(d) {
		var map = new BMap.Map("dituContent");
		map.centerAndZoom(new BMap.Point(120.610809, 31.303565), 13);
		map.enableScrollWheelZoom();
	
		var MAX = d.length;
		var markers = [];
		var pt = null;
		var i = 0;
		for(; i < MAX; i++) {
			pt = new BMap.Point(d[i].location.lng, d[i].location.lat);
			markers.push(new BMap.Marker(pt));
		}
		//最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
		var markerClusterer = new BMapLib.MarkerClusterer(map, {
			markers: markers
		});
	}
	$.ajax({
		url: 'http://api.map.baidu.com/place/v2/search?region=苏州&output=json&ak=MiOQpyve40Hu3y58N5SxoOGHyuL5351z',
		dataType: "jsonp",
		data: {
			query: e.target.value
		},
		success(d) {
			makepoint(d.results)
		}
	})
	
	
