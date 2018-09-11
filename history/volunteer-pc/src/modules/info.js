! function() {
	var cache = { //所有变量均定义在此对象的分支上
		page: 1
	};
	//功能：vue的mounted函数
	//传参：type, id（学校或专业的id）, data（后台数据）, t（自定义数据）, extend（扩展数据）
	//返回值：无返回值
	//依赖：Vue
	function init(type, id, data, t, extend) { //接受后台数据部分 第四次封装
		window.vm = init.vm = new Vue({
			el: '#box',
			data: function() {
				var obj = jcy.extend({
					d: data,
					t: t,
					type: type
				}, extend)
				return obj;
			},
			created: function() {
				if(type == "school") {
					ajaxSchool.call(this, type, id)
				} else if(type=='major'){
					ajaxMajor.call(this, type, id)
				}else if(type=='job'){
					ajaxJob.call(this,id)
				}
			},
			mounted: mounted
		})
	}
	//功能：vue的mounted函数
	//传参：无
	//返回值：无返回值
	//依赖：jcy.jcyui
	function mounted() {
		jcy.jcyui({
			toggleShow: {
				parent: '.info-container',
				box: '.info-box',
				button: '.info-toggleshow'
			}
		})
	}
	//功能：点击收藏按钮
	//传参：d为返回数据，obj为vue对应的属性
	//返回值：无返回值
	//依赖：jcy
	function attentionAjax(obj, id, otype) { //请求修改关注接口
		if(jcy.isObject(obj)) {
			base.request(base.api(30), {
				type: otype || cache.type,
				id: id
			}, function(d) {
				attentionCallback(d, obj);
			}, function(d) {
				attentionCallback(d, obj);
			});
		} else if(jcy.isArray(obj)) {
			jcy.each(obj, function(index, item) {
				if(item.id == id) {
					base.request(base.api(30), {
						type: otype || cache.type,
						id: id
					}, function(d) {
						attentionCallback(d, item);
					}, function(d) {
						attentionCallback(d, item);
					});
				}
			})
		}
	}
	//功能：点击收藏按钮
	//传参：d为返回数据，obj为vue对应的属性
	//返回值：无返回值
	//依赖：jcyer模块（用于弹出收藏成功还是失败的div）
	function attentionCallback(d, obj) { //请求修改关注接口成功后显示d.msg中的内容并修改obj中status属性
		if(obj.status == !0) {
			obj.status = !1;
		} else {
			obj.status = !0;
		}
		jcy.useJs('jcyer', function() {
			jcy.jcyer({
				skin: 1,
				content: d.msg
			})
		})
	}
	//功能：绘制条形图表
	//传参：sel为选中的html标签，ojson为后台数据，y与z不用传
	//返回值：无返回值
	//依赖：jcy.jcychart模块
	function reckChart(sel, ojson, y, z) { //条形图通用方法二次封装
		if(ojson.length) {
			var namey = [],
				namez = [];
			jcy.each(ojson, function(index, item) {
				namey.push(item[y]);
				namez.push(item[z]);
			})
			jcy.jcychart(sel).reckChart({
				namey: namey,
				namex: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%'],
				namez: namez
			})
		} else {
			jcy(sel).html('暂无数据')
		}
	}
	//功能：绘制圆形进度条
	//传参：sel为选择的html标签，progress为进度条的值
	//返回值：无返回值
	//依赖：jcy.jcychart模块
	function cirPro(sel, progress) { //圆形进度条通用方法二次封装
		jcy.jcychart(sel).cirPro({ //在.cirpro中绘制圆形进度条
			progress: progress / 100,
			radius: 22,
			text: progress + '%'
		});
	}
	//功能：根据type类型绘制相应的图表
	//传参：d为后台数据，type为学校或专业，id为学校或专业的id
	//返回值：无返回值
	//依赖：cirPro绘制进度条函数，lineChart绘制折线图函数，reckChart绘制条形图函数
	function lineChart(sel) { //折现图通用方法二次封装
		jcy.jcychart(sel).lineChart({ //在.lineChart中绘制折现图
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
	//功能：根据type类型绘制相应的图表
	//传参：d为后台数据，type为学校或专业，id为学校或专业的id
	//返回值：无返回值
	//依赖：cirPro绘制进度条函数，lineChart绘制折线图函数，reckChart绘制条形图函数
	function infoChart(d, type, id) { //绘制图表总方法 第三次封装
		if(type == 'school') {
			cirPro('.cirpro', d.report.trade.bili); //在.cirpro中绘制圆形进度条
			cirPro('.cirpro2', d.report.area.bili); //在.cirpro2中绘制圆形进度条
			lineChart('.lineChart'); //绘制折现图
			reckChart('.reckChart', d.report.trade.spread, 'trade_name', 'bili'); //在.reckChart中绘制条形图
		} else {
			cirPro('.cirpro', d.job.prospect.trade_bili); //在.cirpro中绘制圆形进度条
			cirPro('.cirpro2', d.job.prospect.area_bili); //在.cirpro2中绘制圆形进度条
			reckChart('.info-hyfb', d.job.hyfb, 'trade_name', 'bili'); //在.info-hyfb中绘制表格
			reckChart('.info-gwqx', d.job.gwqx, 'job_name', 'bili'); //在.info-gwgx中绘制表格
		}
	}
	//功能：school模块中的轮播
	//传参：sel为选择的页面html标签，d为后台数据
	//返回值：无返回值
	//依赖：jcy.jcyui模块
	function carousel(sel, d) { //轮播
		jcy.jcyui(sel).carousel({ //调用轮播插件
			skin: 1,
			images: ['../style/img/z1.png', '../style/img/z2.png', '../style/img/z3.png', '../style/img/z1.png', '../style/img/z2.png', '../style/img/z3.png', '../style/img/z1.png', '../style/img/z2.png', '../style/img/z3.png'],
			hover: function(e) {
				var that = this;
				var tpl = '<div class="info-imgbot">校门</div>'
				jcy(that).html(tpl);
				jcy('.info-imgbot').removeClass('active');
				setTimeout(function() {
					jcy(that).find('.info-imgbot').addClass('active');
				}, 20)
			},
			click: function(url) {
				jcy.useJs('jcyer', function() {
					jcy.jcyer(this).imgShade({
						url: url
					});
				})
			}
		})
	}
	//功能：学校的ajax请求
	//传参：this（vue对象）；type（学校或专业）；id(学校或专业的id)
	//返回值：无返回值
	//依赖：base.ajax
	function ajaxSchool(type, id) {
		var that = this;
		base.ajax({ //发送队列ajax
			url: [base.api(47), base.api(47), base.api(47)],
			baseData: {
				school_id: id
			},
			data: [{
				method: 'introduce'
			}, {
				method: 'enroll'
			}, {
				method: 'report'
			}],
			success: function(d) {
				that.d = d;
				infoChart(d, type, id);
				that.d.flex = [63, 12, 5, 3];
				that.d.name = ['北京', '北京', '北京', '北京'];
				carousel('.info-schoolimg', d);
			}
		});
	}
	//功能：专业的ajax请求
	//传参：this（vue对象）；type（学校或专业）；id(学校或专业的id)
	//返回值：无返回值
	//依赖：base.ajax
	function ajaxMajor(type, id) {
		var that = this;
		base.request(base.api(21),{id: id},function(d){
			d=d.data;
			that.d.intro = d.intro;
			that.d.job = d.job;
			that.d.school = d.school;
			that.d.status = d.status;
			infoChart(d, type, id);
		})
		//由于school接口中的data直接是数组不好合并，所以单独请求
		ajaxMajor.school = function(city, page, u, id) {
			var a, b;
			id=id||cache.id;
			if(!city) {
				a = cache['city' + page];
				b = {
					major_id: id,
					page: page
				}
			} else {
				a = cache['city' + city + page];
				b = {
					major_id: id,
					city: city,
					page: page
				}
			};
			if(!a) {
				base.request(base.api(18), b, function(d) {
					that.d.schools = d.data;
					a = d.data;
				})
			} else {
				that.d.schools = a;
			}
		}
		ajaxMajor.school(!1, 1,!1,id);
		//由于area接口中的data直接是数组不好合并，所以单独请求
		base.request(base.api(6), {
			group: 'schoolArea'
		}, function(d) {
			for(var key in d.data) {
				d.data[key].show = 0;
			}
			that.d.areas = d.data;
		})
	}
	function ajaxJob(id){
		var that=this;
		base.request(base.api(25),{job_id: id,type:'info'},function(d){
			
		})
	}
	//功能：学校的基本数据，用于在没发送ajax之前页面初次渲染
	//传参：ofrom为一个数组，例如['信息库','院校大全']，用于info-bg组件的头部下方路由字段（数组），nodata为无数据是显示的内容（字符串），index为从信息库或院校推荐中的哪个分页跳转过来（数字）
	//返回值：返回一个基本数据对象
	//依赖：无所依赖
	function schoolData(ofrom, nodata, index) {
		return {
			data: { //学校模拟数据,结构与后台数据结构一致
				introduce: {},
				report: {
					salary: {
						self: {}
					},
					trade: {},
					area: {}
				},
				enroll: {
					year_enroll_num: {},
					school_score_year: {},
					major_average_score: {}
				},
				base_data: {}
			},
			t: {
				button: ['录取概率', '学校简介', '就业报告'],
				nodata: nodata,
				from: ofrom,
				index: index
			}
		}
	}
	//功能：专业的基本数据，用于在没发送ajax之前页面初次渲染
	//传参：ofrom为一个数组，例如['信息库','专业大全']，用于info-bg组件的头部下方路由字段（数组），nodata为无数据是显示的内容（字符串），index为从信息库或院校推荐中的哪个分页跳转过来（数字）
	//返回值：返回一个基本数据对象
	//依赖：无所依赖
	function majorData(ofrom, nodata, index) {
		return {
			data: { //专业模拟数据,结构与后台数据结构一致
				intro: {
					boy: nodata,
					class: nodata,
					code: nodata,
					id: nodata,
					intro: nodata,
					major_name: "哲学",
					related: [],
					status: nodata
				},
				job: {
					bsgs: nodata,
					csfb: [],
					gwqx: [],
					hyfb: [],
					money: {},
					prospect: {}
				},
				school: [],
				areas: [],
				schools: [],
				status: nodata,
				name:['北京', '北京', '北京', '北京']
			},
			t: {
				button: ['专业简介', '就业报告', '开设学校'],
				buxian: 1,
				nodata: nodata,
				from: ofrom,
				index: index
			}
		}
	}
	function jobData(){
		return {
//			data: { //专业模拟数据,结构与后台数据结构一致
//				intro: {
//					boy: nodata,
//					class: nodata,
//					code: nodata,
//					id: nodata,
//					intro: nodata,
//					major_name: "哲学",
//					related: [],
//					status: nodata
//				},
//				job: {
//					bsgs: nodata,
//					csfb: [],
//					gwqx: [],
//					hyfb: [],
//					money: {},
//					prospect: {}
//				},
//				school: [],
//				areas: [],
//				schools: [],
//				status: nodata
//			},
//			t: {
//				button: ['专业简介', '就业报告', '开设学校'],
//				buxian: 1,
//				nodata: nodata,
//				from: ofrom,
//				index: index
//			}
		}
	}
	//功能：定义vue组件函数
	//传参：tpl为模板组，type为school或major（字符串），id为school或major的id（数字）
	//返回值：该函数无返回值
	//依赖：jcy，Vue，webpack
	function components(tpl, type, id) {
		var svgcuts = jcy.cut(tpl.infoSvg)
		for(var key in svgcuts) {
			Vue.component('info-icon' + key, {
				template: svgcuts[key]
			})
		};
		jcy.webpack(['infoBg','base-footer','base-header', 'info-major-container', 'info-school-container', 'info-schoollist'], {
			'attentionAjax': attentionAjax,
			'seeMore': function(e) {
				if($(e.target).html() === '收起') {
					$('.info-introduce').css('height', '245px');
					$(e.target).html('查看更多')
				} else {
					$('.info-introduce').css('height', 'auto');
					$(e.target).html('收起');
				}
			},
			'button': function(e) {
				$(e.target).addClass('info-active').siblings('.info-toggleshow').removeClass('info-active');
			},
			'href':cache.href,
			'type': type,
			'id': id,
			'cache': cache,
			'ajaxMajor': ajaxMajor,
			'init': init
		});
	};
	//功能：路由函数
	//传参：from为'info'或'collage'（字符串）,index为‘info’或‘collage’的第几分页（数字）
	//返回值：返回一个数组，例如['信息库','院校大全']
	//依赖：无所依赖
	function router(from, index) {
		var ofrom, afrom = [];
		if(from == 'info') {
			ofrom = '信息库';
			switch(index) {
				case '0':
					afrom.push('院校大全');
					break;
				case '1':
					afrom.push('专业大全');
					break;
				case '2':
					afrom.push('大学排行');
					break;
				case '3':
					afrom.push('专业排行');
					break;
			}
		} else if(from == 'collage') {
			ofrom = '院校推荐';
			switch(index) {
				case '0':
					afrom.push('按分推荐大学');
					break;
				case '5':
					afrom.push('看就业选学校');
					break;
				case '6':
					afrom.push('看就业选专业');
					break;
				case '7':
					afrom.push('看职业选专业');
					break;
			}
		}
		afrom.unshift(ofrom);
		return afrom;
	};
	//功能：页面初始化执行函数传入，
	//传参：type=school||major，id为学校id或专业id，tpl是模块组，href是当前页面的地址？前面的内容（用于跳转页面）
	//返回值：无返回值
	//依赖：cache对象，components函数，init函数
	function baseData(type, id, tpl, href, from, index) {
		//type是学校或者专业 id是学校或专业的id号
		cache.type=type;
		cache.id=id;
		cache.href=href;
		var data = function() { //定义基本数据
			return {
				type: type,
				id: id
			}
		}();
		components(tpl, type, id);
		var nodata = "你看到的是假的";
		var ofrom = router(from, index);
		var oschoolData = schoolData(ofrom, nodata, index);
		var omajorData = majorData(ofrom, nodata, index);
		var ojobData=jobData(ofrom, nodata, index);
		if(data.type == "school") {
			init(type, id, oschoolData.data, oschoolData.t);
		} else if(data.type == "major"){
			init(type, id, omajorData.data, omajorData.t);
		}else if(data.type == "job"){
			init(type, id, ojobData.data, ojobData.t);
		}
	};
	window.info=function(){//输出入口
		return baseData.apply(this,arguments);
	}
}();