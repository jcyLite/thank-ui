var jcy=require('jcy');
import base from '@/modules/base.js'
import jcyui from '@/components/jcyui'
import jcychart from '@/components/ychart'
var cache = { //所有变量均定义在此对象的分支上
	page: 1
};
var init = {};
function ajaxSchool(type, id) {
	var that = this;
	this.$http.post('?service=App.School.Detail',{
		id:id,
		type:1
	}).then(function(d){
		//console.log(d)
	})
	base.request(base.api(47), { method: 'introduce', school_id: id }, function (d) {		
		//console.log(d)
		that.d.introduce = d.data.introduce;
	});
	base.request(base.api(47), { method: 'enroll', school_id: id }, function (d) {		
		that.d.base_data = d.data.base_data;
		that.d.enroll = d.data.enroll;
	});
	base.request(base.api(47), { method: 'report', school_id: id }, function (d) {		
		that.d.report = d.data.report;
		infoChart.call(that,d.data, type, id);
	});
	that.d.name = ['北京', '北京', '北京', '北京'];
	that.d.flex = [63, 12, 5, 3];
}

//功能：根据type类型绘制相应的图表
//传参：d为后台数据，type为学校或专业，id为学校或专业的id
//返回值：无返回值
//依赖：cirPro绘制进度条函数，lineChart绘制折线图函数，reckChart绘制条形图函数
function infoChart(d, type, id) {
	//绘制图表总方法 第三次封装
	if (type == 'school') {
		cirPro('.cirpro', d.report.trade.bili); //在.cirpro中绘制圆形进度条
		cirPro('.cirpro2', d.report.area.bili); //在.cirpro2中绘制圆形进度条
		('.lineChart',{})
//		lineChart('.lineChart'); //绘制折现图
		reckChart('.reckChart', d.report.trade.spread, 'trade_name', 'bili'); //在.reckChart中绘制条形图
		//调用毕业生行业分布echarts图
		var data = {
			data1:[],
			data2:[]
		};
		//毕业生就业薪酬echarts表
		this.$http.post('?service=App.School.Detail',{id:id,type:3}).then(d=>{	
			var data = {
					data1:[],
					data2:[]
			}			
			var json1=d.data.all_payment;
			for(var key in json1){
				data.data1.push(json1[key]); //全国应届生
			}
			var json2=d.data.in_payment;
			for(var key in json2){
				data.data2.push(json2[key]); //本校应届生
			}
			//echartsWy.polyChart(".moneyDis",data);
		})

		//毕业生行业分布echarts表
		base.request(base.api(21), {id: id}, function (d){
			d = d.data.job.hyfb;
			if(d.length == 0){
				$(".graduate").nextSibling.hide();
				return
			}
			for(var i=0;i<d.length;i++){
				data.data2.push(d[i].bili);
				data.data1.push(d[i].trade_name);
			}
			//echartsWy.distribution(".graduate",data);
		});
		
	
	} else {
		cirPro('.cirpro', d.job.prospect.trade_bili); //在.cirpro中绘制圆形进度条
		cirPro('.cirpro2', d.job.prospect.area_bili); //在.cirpro2中绘制圆形进度条
		reckChart('.info-gwqx', d.job.gwqx, 'job_name', 'bili'); //在.info-gwgx中绘制表格
	}
}
//功能：绘制圆形进度条
//传参：sel为选择的html标签，progress为进度条的值
//返回值：无返回值
//依赖：jcychart模块
function cirPro(sel, progress) {
	//圆形进度条通用方法二次封装
	jcychart(sel).cirPro({ //在.cirpro中绘制圆形进度条
		progress: progress / 100,
		radius: 22,
		text: progress + '%'
	});
}
//功能：根据type类型绘制相应的图表
//传参：d为后台数据，type为学校或专业，id为学校或专业的id
//返回值：无返回值
//依赖：cirPro绘制进度条函数，lineChart绘制折线图函数，reckChart绘制条形图函数
function lineChart(sel) {
	//折现图通用方法二次封装
	jcychart(sel).lineChart({ //在.lineChart中绘制折现图
		green: {
			name: '最高',
			num: [8531, 12657, 15924, 16565.5, 17653, 17888.3, 18888]
		},
		red: {
			name: '最低',
			num: [5531, 7657, 8924, 9565.5, 10653, 12888.3, 14888]
		},
		name: ['毕业1年', '毕业2年', '毕业3年', '毕业4年', '毕业5年', '毕业6年', '毕业7年']
	});
}
//功能：绘制条形图表
//传参：sel为选中的html标签，ojson为后台数据，y与z不用传
//返回值：无返回值
//依赖：jcychart模块
function reckChart(sel, ojson, y, z) {
	//条形图通用方法二次封装
	if (ojson.length) {
		var namey = [],
		    namez = [];
		jcy.each(ojson, function (index, item) {
			namey.push(item[y]);
			namez.push(item[z]);
		});
		jcychart(sel).reckChart({
			namey: namey,
			namex: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%'],
			namez: namez
		});
	} else {
		jcy(sel).html('暂无数据');
	}
}



//功能：school模块中的轮播
//传参：sel为选择的页面html标签，d为后台数据
//返回值：无返回值
//依赖：jcyui模块
function carousel(sel, d) {
	//轮播
	jcyui(sel).carousel({ //调用轮播插件
		skin: 1,
		images: ['./src/style/img/z1.png', './src/style/img/z2.png', './src/style/img/z3.png', './src/style/img/z1.png', './src/style/img/z2.png', './src/style/img/z3.png', './src/style/img/z1.png', './src/style/img/z2.png', './src/style/img/z3.png'],
		hover: function hover(e) {
			var that = this;
			var tpl = '<div class="info-imgbot">校门</div>';
			jcy(that).html(tpl);
			jcy('.info-imgbot').removeClass('active');
			setTimeout(function () {
				jcy(that).find('.info-imgbot').addClass('active');
			}, 20);
		},
		click: function click(url) {
			jcy.useJs('jcyer', function () {
				jcy.jcyer(this).imgShade({
					url: url
				});
			});
		}
	});
}
//功能：专业的ajax请求
//传参：this（vue对象）；type（学校或专业）；id(学校或专业的id)
//返回值：无返回值
//依赖：base.ajax
function ajaxMajor(type, id) {
	var that = this;
	base.request(base.api(21), 	{ id: id }, function (d) {
		d = d.data;
		that.d.intro = d.intro;
		that.d.job = d.job;
		that.d.school = d.school;
		that.d.status = d.status;
		infoChart.call(that,d, type, id);
	});
	//由于school接口中的data直接是数组不好合并，所以单独请求
	ajaxMajor.school = function (city, page, u, id) {
		var a, b;
		id = id || cache.id;
		if (!city) {
			a = cache['city' + page];
			b = {
				major_id: id,
				page: page
			};
		} else {
			a = cache['city' + city + page];
			b = {
				major_id: id,
				city: city,
				page: page
			};
		};
		if (!a) {
			base.request(base.api(18), b, function (d) {
				that.d.schools = d.data;
				a = d.data;
			});
		} else {
			that.d.schools = a;
		}
	};
	ajaxMajor.school(!1, 1, !1, id);
	//由于area接口中的data直接是数组不好合并，所以单独请求
	base.request(base.api(6), {
		group: 'schoolArea'
	}, function (d) {
		for (var key in d.data) {
			d.data[key].show = 0;
		}
		that.d.areas = d.data;
	});
}
//功能：点击收藏按钮
//传参：d为返回数据，obj为vue对应的属性
//返回值：无返回值
//依赖：jcy
function attentionAjax(obj, id, otype) {
	//请求修改关注接口
	otype = otype || this.type;
	if (jcy.isObject(obj)) {
		base.request(base.api(30), {
			type: otype || cache.type,
			id: id
		}, function (d) {
			attentionCallback(d, obj);
		}, function (d) {
			attentionCallback(d, obj);
		});
	} else if (jcy.isArray(obj)) {
		jcy.each(obj, function (index, item) {
			if (item.id == id) {
				base.request(base.api(30), {
					type: otype || cache.type,
					id: id
				}, function (d) {
					attentionCallback(d, item);
				}, function (d) {
					attentionCallback(d, item);
				});
			}
		});
	}
}
//功能：点击收藏按钮
//传参：d为返回数据，obj为vue对应的属性
//返回值：无返回值
//依赖：jcyer模块（用于弹出收藏成功还是失败的div）
function attentionCallback(d, obj) {
	//请求修改关注接口成功后显示d.msg中的内容并修改obj中status属性
	if (obj.status == !0) {
		obj.status = !1;
	} else {
		obj.status = !0;
	}
	jcy.useJs('jcyer', function () {
		jcy.jcyer({
			skin: 1,
			content: d.msg
		});
	});
}
function getCache(href) {
	var get = jcy.subHref(href); //直接获取数据为数组形式，前提是?后的数据用&符号链接
	var getData = get[0]; //获取传入的第一个值school-id=2或major-id=1等
	var getFrom = get[1]; //获取传入的第二个值collage为从院校推荐跳转过来，info为从信息库中跳转过来
	var getIndex = get[2]; //获取传入的第三个值index为数字，标记从院校推荐或信息库中的哪个分页中跳转过来
	var id = jcy.subString(getData, { //获取href?后面的内容的=后面的内容
		start: '='
	});
	var type = jcy.subString(getData, { //获取href?后面的内容-前面的内容
		end: '-'
	});
	var index = jcy.subString(getIndex, {
		start: '='
	});
	return {
		type: type,
		id: id,
		from: getFrom,
		index: index
	};
}
function seeMore(e) {
	if ($(e.target).html() === '收起') {
		$('.info-introduce').css('height', '245px');
		$(e.target).html('查看更多');
	} else {
		$('.info-introduce').css('height', 'auto');
		$(e.target).html('收起');
	}
}
function button(e) {
	$(e.target).addClass('info-active').siblings('.info-toggleshow').removeClass('info-active');
}
var id=getCache(location.href).id;
var href=cache.href;
import reckChart2 from './reckChart.js'
export {getCache,cache,reckChart2,ajaxMajor,ajaxSchool,init,attentionAjax,seeMore,id,button,href}