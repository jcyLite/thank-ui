//一款用于绘制图表的插件  author：陈坚
var jcy = require('jcy')
	var chart = function(sel) {
		if(jcy.isString(sel)) {
			return new ochart(sel);
		}
	}
	var ochart = function(sel) {
		this.sel = sel;
	}
	ochart.prototype.extend = jcy.extend;
	ochart.prototype.extend({
		cirPro: function(){
			var cut=['<svg version="1.1" x="0px" y="0px" viewBox="0 0 56.7 56.7">'
						,'<text x="12" y="30" fill="#11BDC5">'
						,'{{d.text||""}}'
						,'</text>'
						,'<circle fill="none" stroke="#DDDDDD" stroke-miterlimit="10" cx="28.3" cy="26.8" r="22.3" />'
						,'<path d="{{d.d}}" transform="translate({{d.r+7}},{{d.r+5}})" id="ring" fill="none" stroke="#11BDC5" stroke-width="2" stroke-miterlimit="10" />'
					,'</svg>'].join('');
			return function(options) { //圆形进度条
					options = options || {};
					// 计算当前的进度对应的角度值
					var that = this;
					var degrees = options.progress * 360;
					var r = options.radius;
					// 计算当前角度对应的弧度值
					var rad = degrees * (Math.PI / 180);
					//极坐标转换成直角坐标
					var x = (Math.sin(rad) * r).toFixed(2);
					var y = -(Math.cos(rad) * r).toFixed(2);
					//大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
					var lenghty = window.Number(degrees > 180);
					//path 属性
					var descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y];
					// 给path 设置属性
					var svg = document.createElement('svg');
					jcy.tpl(cut).render({
						text: options.text,
						d: descriptions.join(' '),
						r: r
					}, function(html) {
						jcy(that.sel).html(html);
					})
				}
		}(),
		lineChart: function(){
			var cut=['<svg version="1.1" x="0px" y="0px" viewBox="0 0 1259.8 587">'
						,'<g class="zhouxian">'
							,'<g>'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="468.1" x2="37.7" y2="62.1" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="468.1" x2="1211.7" y2="468.1" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="62.1" x2="45.2" y2="69.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="62.1" x2="29.9" y2="69.9" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="1211.7" y1="468.1" x2="1204.2" y2="460.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="1211.7" y1="468.1" x2="1203.4" y2="476.4" />'
							,'</g>'
							,'<g>'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="38.1" y1="92.3" x2="41.8" y2="92.3" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="38.1" y1="175.8" x2="41.8" y2="175.8" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="326.1" y1="288.8" x2="329.8" y2="288.8" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="38.1" y1="259.6" x2="41.8" y2="259.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="38.1" y1="343.5" x2="41.8" y2="343.5" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="38.1" y1="427.4" x2="41.8" y2="427.4" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="196.4" y1="467.9" x2="196.4" y2="462.2" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="354.7" y1="468.1" x2="354.7" y2="462.4" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="512.9" y1="468.3" x2="512.9" y2="462.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="671.4" y1="468.1" x2="671.4" y2="462.4" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="830.4" y1="468.3" x2="830.4" y2="462.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="987.7" y1="468.3" x2="987.7" y2="462.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="1144.9" y1="468.3" x2="1144.9" y2="462.6" />'
							,'</g>'
							,'<g>'
								,'<text transform="matrix(1 0 0 1 160.6895 506.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[0]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 315.6895 504.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[1]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 478.8562 504.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[2]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 635.1478 506.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[3]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 795.1478 506.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[4]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 951.4811 506.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[5]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 1109.1895 504.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{d.name[6]||""}}</text>'
								,'<text transform="matrix(1 0 0 1 26.9397 40.758)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="24">单位：元</text>'
							,'</g>'
						,'</g>'
						,'<g class="colline">'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="196.4" y1="462.4" x2="196.4" y2="{{d.green7}}" />'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="354.7" y1="462.4" x2="354.7" y2="{{d.green6}}" />'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="512.9" y1="462.4" x2="512.9" y2="{{d.green5}}" />'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="671.4" y1="462.4" x2="671.4" y2="{{d.green4}}" />'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="830.4" y1="462.4" x2="830.4" y2="{{d.green3}}" />'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="987.7" y1="462.4" x2="987.7" y2="{{d.green2}}" />'
							,'<line fill="none" stroke="#7A7A7A" stroke-miterlimit="10" x1="1144.9" y1="462.4" x2="1144.9" y2="{{d.green1}}" />'
						,'</g>'
						,'<g class="red">'
							,'<circle fill="#FE6A23" cx="196.4" cy="{{d.red1}}" r="5.8" />'
							,'<circle fill="#FE6A23" cx="354.7" cy="{{d.red2}}" r="5.8" />'
							,'<circle fill="#FE6A23" cx="512.9" cy="{{d.red3}}" r="5.8" />'
							,'<circle fill="#FE6A23" cx="671.4" cy="{{d.red4}}" r="5.8" />'
							,'<circle fill="#FE6A23" cx="830.4" cy="{{d.red5}}" r="5.8" />'
							,'<circle fill="#FE6A23" cx="987.7" cy="{{d.red6}}" r="5.8" />'
							,'<circle fill="#FE6A23" cx="1144.9" cy="{{d.red7}}" r="5.8" />'
						,'</g>'
						,'<g class="redline">'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="1144.9" y1="{{d.red7}}" x2="987.7" y2="{{d.red6}}" />'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="987.7" y1="{{d.red6}}" x2="830.4" y2="{{d.red5}}" />'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="830.4" y1="{{d.red5}}" x2="671.4" y2="{{d.red4}}" />'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="671.4" y1="{{d.red4}}" x2="512.9" y2="{{d.red3}}" />'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="512.9" y1="{{d.red3}}" x2="354.7" y2="{{d.red2}}" />'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="354.7" y1="{{d.red2}}" x2="196.4" y2="{{d.red1}}" />'
							,'<line fill="none" stroke="#FE6A23" stroke-miterlimit="10" x1="196.4" y1="{{d.red1}}" x2="38.1" y2="427.4" />'
						,'</g>'
						,'<g class="green">'
							,'<circle fill="#11BDC5" cx="1144.9" cy="{{d.green1}}" r="5.8" />'
							,'<circle fill="#11BDC5" cx="987.7" cy="{{d.green2}}" r="5.8" />'
							,'<circle fill="#11BDC5" cx="830.4" cy="{{d.green3}}" r="5.8" />'
							,'<circle fill="#11BDC5" cx="671.4" cy="{{d.green4}}" r="5.8" />'
							,'<circle fill="#11BDC5" cx="512.9" cy="{{d.green5}}" r="5.8" />'
							,'<circle fill="#11BDC5" cx="354.7" cy="{{d.green6}}" r="5.8" />'
							,'<circle fill="#11BDC5" cx="196.4" cy="{{d.green7}}" r="5.8" />'
						,'</g>'
						,'<g class="greenline">'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="38.1" y1="401.4" x2="196.4" y2="{{d.green7}}" />'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="196.4" y1="{{d.green7}}" x2="354.7" y2="{{d.green6}}" />'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="354.7" y1="{{d.green6}}" x2="512.9" y2="{{d.green5}}" />'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="512.9" y1="{{d.green5}}" x2="671.4" y2="{{d.green4}}" />'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="671.4" y1="{{d.green4}}" x2="830.4" y2="{{d.green3}}" />'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="830.4" y1="{{d.green3}}" x2="987.7" y2="{{d.green2}}" />'
							,'<line fill="none" stroke="#11BDC5" stroke-miterlimit="10" x1="987.7" y1="{{d.green2}}" x2="1144.9" y2="{{d.green1}}" />'
						,'</g>'
						,'<g>'
							,'<text transform="matrix(1 0 0 1 541.0228 566.8716)" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="30">{{d.greenname||""}}</text>'
							,'<text transform="matrix(1 0 0 1 664.3561 566.8716)" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="30">{{d.redname||""}}</text>'
							,'<circle fill="#11BDC5" cx="522.6" cy="554.3" r="10.1" />'
							,'<circle fill="#FE6A23" cx="645.3" cy="554.3" r="10.1" />'
						,'</g>'
						,'<g>'
							,'<g>'
								,'<rect x="166.4" y="{{d.green7-79}}" fill="#11BDC5" width="100" height="40.1" />'
								,'<rect x="324.4" y="{{d.green6-79}}" fill="#11BDC5" width="100" height="40.1" />'
								,'<rect x="482.4" y="{{d.green5-79}}" fill="#11BDC5" width="100" height="40.1" />'
								,'<rect x="640.4" y="{{d.green4-79}}" fill="#11BDC5" width="100" height="40.1" />'
								,'<rect x="798.4" y="{{d.green3-79}}" fill="#11BDC5" width="100" height="40.1" />'
								,'<rect x="956.4" y="{{d.green2-79}}" fill="#11BDC5" width="100" height="40.1" />'
								,'<rect x="1114.4" y="{{d.green1-79}}" fill="#11BDC5" width="100" height="40.1" />'
							,'</g>'
							,'<g>'
								,'<text transform="matrix(1 0 0 1 164.4397 {{d.green7-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[0]}}</text>'
								,'<text transform="matrix(1 0 0 1 322.273 {{d.green6-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[1]}}</text>'
								,'<text transform="matrix(1 0 0 1 480.9397 {{d.green5-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[2]}}</text>'
								,'<text transform="matrix(1 0 0 1 639.9396 {{d.green4-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[3]}}</text>'
								,'<text transform="matrix(1 0 0 1 798.9396 {{d.green3-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[4]}}</text>'
								,'<text transform="matrix(1 0 0 1 956.4396 {{d.green2-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[5]}}</text>'
								,'<text transform="matrix(1 0 0 1 1113.4397 {{d.green1-54}})" fill="#FFFFFF" font-family=""AdobeSongStd-Light-GBpc-EUC-H"" font-size="21">￥{{d.green[6]}}</text>'
							,'</g>'
							,'<g>'
								,'<polygon fill="#11BDC5" points="196.2,{{d.green7-30}} 190.6,{{d.green7-41.6}} 204.2,{{d.green7-41.6}} " />'
								,'<polygon fill="#11BDC5" points="354.1,{{d.green6-30}} 348.4,{{d.green6-41.6}} 362,{{d.green6-41.6}} " />'
								,'<polygon fill="#11BDC5" points="512.7,{{d.green5-30}} 507.1,{{d.green5-41.6}} 520.7,{{d.green5-41.6}} " />'
								,'<polygon fill="#11BDC5" points="671.7,{{d.green4-30}} 666.1,{{d.green4-41.6}} 679.7,{{d.green4-41.6}} " />'
								,'<polygon fill="#11BDC5" points="830.7,{{d.green3-30}} 825.1,{{d.green3-41.6}} 838.7,{{d.green3-41.6}} " />'
								,'<polygon fill="#11BDC5" points="988.2,{{d.green2-30}} 982.6,{{d.green2-41.6}} 996.2,{{d.green2-41.6}} " />'
								,'<polygon fill="#11BDC5" points="1145.2,{{d.green1-30}} 1139.6,{{d.green1-41.6}} 1153.2,{{d.green1-41.6}} " />'
							,'</g>'
						,'</g>'
					,'</svg>'].join('')
			return function(options) { //线形图表
				var that = this;
				options = options || {};
				var obj = {
					red1: 468 - options.red.num[0] / 57,
					red2: 468 - options.red.num[1] / 57,
					red3: 468 - options.red.num[2] / 57,
					red4: 468 - options.red.num[3] / 57,
					red5: 468 - options.red.num[4] / 57,
					red6: 468 - options.red.num[5] / 57,
					red7: 468 - options.red.num[6] / 57,
					green1: 468 - options.green.num[6] / 57,
					green2: 468 - options.green.num[5] / 57,
					green3: 468 - options.green.num[4] / 57,
					green4: 468 - options.green.num[3] / 57,
					green5: 468 - options.green.num[2] / 57,
					green6: 468 - options.green.num[1] / 57,
					green7: 468 - options.green.num[0] / 57,
					green: options.green.num,
					greenname: options.green.name,
					redname: options.red.name,
					name: options.name
				}
				jcy.tpl(cut).render(obj, function(html) {
					jcy(that.sel).html(html);
				})
			};
		}(),
		reckChart: function(){
			var cut=['<svg version="1.1" x="0px" y="0px" viewBox="0 0 1350 587">'
						,'<g class="zhouxian">'
							,'<g class="y">'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="468.1" x2="37.7" y2="32.1" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="32.1" x2="45.2" y2="39.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="32.1" x2="29.9" y2="39.9" /> '
								,'{{# jcy.each(d.namey,function(index,item){ }}'
									,'<line stroke-width="2" fill="none" stroke="#000000" stroke-miterlimit="10" x1="38.1" y1="{{428/d.namey.length*(index+1)+10}}" x2="41.8" y2="{{428/d.namey.length*(index+1)+10}}" />'
									,'<text transform="matrix(1 0 0 1 40 {{428/d.namey.length*(index+1)}})" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="20">{{item||""}}</text> '
								,'{{# }) }}'
							,'</g>'
							,'<g class="x">'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="37.7" y1="468.1" x2="1211.7" y2="468.1" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="1211.7" y1="468.1" x2="1204.2" y2="460.6" />'
								,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="1211.7" y1="468.1" x2="1203.4" y2="476.4" /> '
								,'{{# jcy.each(d.namex,function(index,item){ }}'
									,'<line fill="none" stroke="#000000" stroke-miterlimit="10" x1="{{1050/d.namex.length*(index+1)+20}}" y1="467.9" x2="{{1050/d.namex.length*(index+1)+20}}" y2="462.2" />'
									,'<text transform="matrix(1 0 0 1 {{1050/d.namex.length*(index+1)}} 506.3508)" fill="#666666" font-family="AdobeSongStd-Light-GBpc-EUC-H" font-size="26">{{item||""}}</text> '
								,'{{# }) }}'
							,'</g>'
						,'</g>'
						,'<g>'
							,'{{# jcy.each(d.namez,function(index,item){ }}'
								,'<rect x="38.1" y={{428/d.namez.length*(index+1)+5}} fill="#11bdc5" stroke="none" stroke-miterlimit="10" width="{{item*18}}" height="15"/>'
							,'{{# }) }}'
						,'</g>'
					,'</svg>'].join('');
			return function(options) { //条状图表
				var that = this;
				jcy.tpl(cut).render(options, function(html) {
					jcy(that.sel).html(html);
				})
			}
		}()
	})
	export default chart