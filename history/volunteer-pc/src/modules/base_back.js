! function() {
	// import img from './img.js';
	var bool = 0,
		http, logo;
	if(bool === 0) { //线上生产环境
		http = 'http://api.gaiwenkeji.com/Api';
		logo = 'http://api.gaiwenkeji.com';
	} else if(bool === 1) { //线上测试环境
		http = 'http://121.40.166.96:92/Api';
		logo = 'http://121.40.166.96:92';
	} else if(bool === 2) { //戴进电脑
		http = 'http://192.168.1.232:88/Api';
		logo = 'http://192.168.1.232:88';
	} else if(bool === 3) { //戴进本地
		http = "http://192.168.2.65:82/gaokao-tp3/Api";
		logo = 'http://192.168.2.65:82';
	}
	var ajaxlen = 0,
		href = location.href,
		boo = href.indexOf('index.html') > -1 || href.indexOf('html') === -1, // 判断是否为主页
		img_path = boo ? './img/' : '../img/',
		email = img.email,
		phone = img.phone,
		guanzhu = img.guanzhu,
		guanzhu1 = img.guanzhu1,
		biaodan1 = img.biaodan1,
		biaodan = img.biaodan,
		xgmm = img.xgmm,
		xgmm1 = img.xgmm1,
		tuichu = img.tuichu,
		tuichu1 = img.tuichu1,
		vip = img.vip,
		vip1 = img.vip1,
		qq = img.qq,
		weixin = img.weixin,
		weibo = img.weibo,
		search = img.search,
		qr = img.qr,
		link = boo ? './view' : '.',
		url = boo ? '.' : '..',
		icon = '<link rel="icon" href="${url}/favicon.ico" type="image/x-icon">'
	apiObj = { // 高考志愿接口
			// 志愿首页
			// 录入成绩接口
			0: http + '/User/setGrade',

			/*根据省份判断所需填写*/
			1: http + '/User/getProvinceShow',//1

			/*测试录取率*/
			2: http + '/Search/testUserEnroll',//2

			/*距离高考天数接口*/
			3: http + '/Other/getCountDown',//3

			/*批次线接口*/
			4: http + '/Batch/getList',//4

			/*志愿列表页接口*/
			5: http + '/Wish/getCategoryWish',//5

			// 公共
			/*地区接口*/
			/*级联接口*/
			6: http + '/Cascadedata/getLevelData',//6

			/*某个学校所有专业接口*/
			7: http + '/School/getSchoolMajor',//7

			/*学校专业详情*/
			8: http + '/School/getSchoolMajorDetail',//8

			/*学校分数线*/
			9: http + '/School/getSchoolScore', //9

			/*意愿学校地区接口*/
			10: http + '/School/getWishSchoolArea',//10

			/*根据专业名称搜索专业列表*/
			11: http + '/Major/getMajorInfo',//11

			// 志愿表
			/*志愿列表接口*/
			/*志愿明细接口*/
			12: http + '/Wish/getWishDetail', //12

			/*志愿列表页接口*/
			13: http + '/Wish/getWishList', //13

			/*删除志愿表接口*/
			14: http + '/Wish/delWishForm', // 14

			/*保存志愿表名接口*/
			15: http + '/Wish/SaveWishTitle', //15

			/*保存志愿表接口*/
			16: http + '/Wish/saveAnalyseWishForm', //16

			/*本科批次接口*/
			17: http + '/Batch/getList', //17

			// 信息库
			/*院校大全接口*/
			18: http + '/School/getAllSchool',//18

			/*专业大全接口*/
			/*专业列表接口*/
			19: http + '/Major/getMajorList',//19

			/*学历、学科、科目列表接口*/
			20: http + '/Major/getList', //20 

			/*专业详情接口*/
			21: http + '/Major/getMajorDetail', // 21
 
			/*大学排行*/
			22: http + '/Search/getSchoolOrder', //22

			/*专业排行*/
			23: http + '/Search/getMajorOrder',//23

			/*真假院校*/
			24: http + '/Search/isTrueSchool',//24

			/*职业详情列表*/
			25: http + '/Job/getJobDetail',//25

			// 我的
			/*开通VIP接口*/
			26: http + '/User/userOpenVip',//26

			/*判断是否VIP*/
			27: http + '/User/isVip',//27

			/*留学申请接口*/
			28: http + '/User/applyAbroad',//28

			/*我的关注接口*/
			/*我的关注列表接口*/
			29: http + '/User/getMyAttention',//29

			/*我的关注新增接口*/
			30: http + '/User/addMyAttention',//30

			/*我的关注取消接口*/
			31: http + '/User/updateMyAttention',//31

			/*录取信息接口*/
			32: http + '/User/userEnroll',//32

			/*意见反馈接口*/
			33: http + '/User/userFeedBack',//33

			// 搜索
			/*职业专业*/
			34: http + '/Search/getJobData',//34

			/*看就业选学校*/
			35: http + '/Search/getTradeSchool',

			// 就业专业
			/*专业下拉*/
			36: http + '/Cascadedata/getLevelData',

			/*忘记密码*/
			37: http + '/Auth/resetPasswd',

			/*发送验证码*/
			38: http + '/Auth/smsSend',

			/*学校地区*/
			39: http + '/Cascadedata/getLevelData',

			/*登录接口*/
			40: http + '/Auth/login',

			/*志愿列表*/
			41: http + '/Wish/getWishList',

			/*意愿职业设置*/
			42: http + '/Wish/getWishTrade',

			/*手机注册*/
			43: http + '/Auth/register',

			/*验证是否登录*/
			44: http + '/Auth/checkLogin',

			/*学校专业详情*/
			45: http + '/Major/getSchoolMajorDetail',

			/*成绩展示接口*/
			46: http + '/User/getGrade',

			/*学校简介*/
			47: http + '/School/getSchoolDetail',

			/*看就业选专业*/
			48: http + '/Search/getTradeMajor',

			/*学校搜索接口*/
			49: http + '/School/getSchoolRate',

			/*授权登录接口*/
			50: http + '/Auth/authLogin',

			/*获取省份对应城市接口*/
			51: http + '/Cascadedata/getCasNextLevel',

			/*学校筛选条件*/
			52: http + '/School/getSchoolSelect',

			/*学校历年录取查询*/
			53: http + '/School/getOverYearAdmission',

			/*查询录取信息接口*/
			54: http + '/User/getUserEnroll',

			/*用户成绩分析报告*/
			55: http + '/User/userGradeReport',

			/*获取学校录取率*/
			56: http + '/Search/getUserEnrollSchool',

			/*填报政策列表*/
			57: http + '/FillPolicy/getList',

			/*填报政策明细*/
			58: http + '/FillPolicy/getDetail',

			/*支付接口*/
			59: http + '/Payment/',

			/*消费码激活*/
			60: http + '/User/vipActive',

			/*绑定邀请人*/
			61: http + '/User/bindInviter',

			/*个人信息*/
			62: http + '/User/userinfo',

			/*老用户绑定手机*/
			63: http + '/auth/authBind',

			/*填分地区*/
			64: http + '/Index/Area',

			/*冲刺推荐*/
			65: http + '/School/getAllSchool',

			/*图片绝对地址*/
			'logo': logo,

			/*检测更新*/
			checkUrl: 'http://api.gaiwenkeji.com/Api/Index/version',

			/*下载补丁*/
			wgtUrl: 'http://api.gaiwenkeji.com/update/update.wgt'

		},
		tap_first = true, // 为防短时间内多次点击用
		timer = null;
	var base = {};
	base.extend = $.extend;
	base.extend({
		// 返回接口,count: String || Number
		api: function(count) {
			return apiObj[count];
		},
		baseApi:function(o){
			return 'http://192.168.2.33/phalapi/public/?service='+o;
		},
		fourbmouseover: function() {
			$(".fourb").mouseover(function() {
				$(".fourb").removeClass("active").children().removeClass("active");
				$(".onePic").show();
				$(".twoPic").hide();
				$(this).find(".twoPic").show();
				$(this).find(".onePic").hide();
				$(this).find(".onediv").addClass("active");
				$(".onediv").find("h3").removeClass("active");
				$(".onediv").find("p").removeClass("active");
				$(this).find(".onediv").find("h3").addClass("active");
				$(this).find(".onediv").find("p").addClass("active");
				$(this).addClass("active");
			})
		},
		init: function() {
			var tips = "<div class='btn-box' style='z-index:1000000000;display:none;'><button type='button' data-loading-text='&nbsp;' class='mui-btn pointOut loading'></button></div>"; // 加载动画
			return function() { // 请务必此初始化方法
				// 添加头尾
				//				$(icon).appendTo($('head'))
				//顶部导航栏的切换
				$(".ul-box").on("click", "li", function() {
					$(".ul-box>li").removeClass("active");
					$(this).addClass("active");
					$(".ul-box>li>a").css("color", "#515151");
					$(this).find("a").css("color", "#11bdc5");
				})
				$(".ul-box").on("mouseover", "li", function() {
					$(".ul-box>li>a").removeClass("current");
					$(this).find("a").addClass("current");
					var index = $(this).attr("data-index");
					$(".tab-ul").hide();
					$(".tab-ul:eq(" + index + ")").show();
				})
				$(".tab-ul").on("click", "a", function() {
					// $(".tab-ul>a").click(function () {
					$(".tab-ul>a").removeClass("active");
					$(this).addClass("active");
				})
				$('.foot .left.fll ul').eq(1).on('click', 'a:not(.turn-a)', function(event) {
					event.preventDefault();
					$('#tips').show()
				});
				$('#tips-close,.no-download').on('click', function(e) { // 模态框
					e.preventDefault();
					$('#tips').hide();
				})
				//更多功能的切换
				/*$(".fun-lis").on("click", function() {
				    console.log(123);
				    $(".fun-lis").find("div").removeClass("active");
				    $(".picone").show();
				    $(".pictwo").hide();
				    $(this).find(".picone").hide();
				    $(this).find(".pictwo").show();
				    $(this).find("div").addClass("active");
				})*/
				//查看全文的切换
				/*$(".all-content").click(function() {
				    $(this).siblings("div").toggleClass("min-height");
				    if ($(this).find("i").text() == "查看全文") {
				        $(this).find("i").text("收起");
				    } else {
				        $(this).find("i").text("查看全文");
				    }
				})*/
				//四个盒子的切换问题
				console.log(this);
				this.fourbmouseover = function() {
					$(".fourb").mouseover(function() {
						$(".fourb").removeClass("active").children().removeClass("active");
						$(".onePic").show();
						$(".twoPic").hide();
						$(this).find(".twoPic").show();
						$(this).find(".onePic").hide();
						$(this).find(".onediv").addClass("active");
						$(".onediv").find("h3").removeClass("active");
						$(".onediv").find("p").removeClass("active");
						$(this).find(".onediv").find("h3").addClass("active");
						$(this).find(".onediv").find("p").addClass("active");
						$(this).addClass("active");
					})
				}
				this.fourbmouseover()
				//登录的input激活事件
				$(".com-login>input").click(function() {
					$(".com-login>input").removeClass("active");
					$(this).addClass("active");
				})
				//注册的input激活事件
				$(".com-list").on("focus", "input", function() {
					$(".com-list>input").removeClass("active");
					$(this).addClass("active");
				})
				//我的账户的列表鼠标经过事件
				$(".account-list").on("mouseover", function() {
					$(".account-list>a").removeClass("active");
					$(this).find("a").addClass("active");
					$(".account-list").find(".firstPic").show();
					$(".account-list").find(".secondPic").hide();
					$(this).find(".firstPic").hide();
					$(this).find(".secondPic").show();
				})
			}
		}(),
		throttle: function(callback) { // 点击事件节流阀
			if(tap_first) {
				tap_first = false;
				callback();
				timer = setTimeout(function() {
					tap_first = true;
					timer = null;
				}, 500)
			}
		},
		page: function(e) {
			var _this = this;
			var tar = e.target
			if(tar.nodeName === 'A') {
				if(tar.getAttribute('value') === '+') {
					var boo = false;
					if(tar.className.indexOf('school') > -1) { // 智能填志愿
						// _this.turn_page(base.api(65), schoollist, _this.current_schools, _this.school_opt.page)
						for(var key in _this.current_schools) {
							if(+key === _this.school_opt.page + 1) {
								schoollist = _this.current_schools[++_this.school_opt.page]
								boo = true;
								break
							}
						}
						if(boo) return;
						_this.school_opt.page++
							base.request(base.api(65), _this.school_opt, function(data) {
								_this.no_data_score = data.data.length == 0;
								if(data.data.length !== 0) {
									_this.current_schools[_this.school_opt.page] = data.data
								} else {
									--_this.school_opt.page
								}
								_this.schools = data.data
							})
					} else if(tar.className.indexOf('major') > -1) { // 看就业选专业
						for(var key in components.seemajor.current_major_schools) {
							if(+key === _this.major_opt.page + 1) {
								components.seemajor.professions = components.seemajor.current_major_schools[++_this.major_opt.page]
								boo = true;
								break
							}
						}
						if(boo) return;
						_this.major_opt.page++
							base.request(base.api(48), _this.major_opt, function(data) {
								_this.no_data_major = data.data.length == 0
								if(data.data.length !== 0) {
									components.seemajor.current_major_schools[_this.major_opt.page] = data.data
								} else {
									--_this.major_opt.page
								}
								components.seemajor.professions = data.data
							})
					} else if(tar.className.indexOf('occupation') > -1) { // 看职业选专业
						var index = $('.vm-box li.vm-active').index();
						if(index === 0) {
							for(var key in _this.current_occupation.vocations) {
								if(+key === _this.occupation_opt.page + 1) {
									_this.occupation.vocations = _this.current_occupation.vocations[++_this.occupation_opt.page]
									boo = true;
									break
								}
							}
							if(boo) return;
							_this.occupation_opt.page++
								base.request(base.api(34), _this.occupation_opt, function(data) {
									_this.no_data_occupation.vocations = data.data.job.length == 0
									if(data.data.job.length !== 0) {
										_this.current_occupation.vocations[_this.occupation_opt.page] = data.data.job
									} else {
										--_this.occupation_opt.page
									}
									_this.occupation.vocations = data.data.job
								})
						} else if(index === 1) {
							for(var key in _this.current_occupation.scales) {
								if(+key === _this.occupation_opt.page + 1) {
									_this.occupation.scales = _this.current_occupation.scales[++_this.occupation_opt.page]
									boo = true;
									break
								}
							}
							if(boo) return;
							_this.occupation_opt.page++
								base.request(base.api(34), _this.occupation_opt, function(data) {
									_this.no_data_occupation.scales = data.data.job.length == 0
									if(data.data.job.length !== 0) {
										_this.current_occupation.scales[_this.occupation_opt.page] = data.data.job
									} else {
										--_this.occupation_opt.page
									}
									_this.occupation.scales = data.data.job
								})
						} else {
							for(var key in _this.current_occupation.schoolgirls) {
								if(+key === _this.occupation_opt.page + 1) {
									_this.occupation.schoolgirls = _this.current_occupation.schoolgirls[++_this.occupation_opt.page]
									boo = true;
									break
								}
							}
							if(boo) return;
							_this.occupation_opt.page++
								base.request(base.api(34), _this.occupation_opt, function(data) {
									_this.no_data_occupation.schoolgirls = data.data.job.length == 0
									if(data.data.job.length !== 0) {
										_this.current_occupation.schoolgirls[_this.occupation_opt.page] = data.data.job
									} else {
										--_this.occupation_opt.page
									}
									_this.occupation.schoolgirls = data.data.job
								})
						}
					} else { // 看就业选学校
						for(var key in _this.current_job_schools) {
							if(+key === _this.job_opt.page + 1) {
								_this.job_schools = _this.current_job_schools[++_this.job_opt.page]
								boo = true;
								break
							}
						}
						if(boo) return;
						_this.job_opt.page++
							base.request(base.api(35), _this.job_opt, function(data) {
								_this.no_data_job = data.data.length == 0
								_this.current_job_schools[_this.job_opt.page] = data.data
								_this.job_schools = data.data
							})
						// _this.turn_page(base.api(35), _this.job_schools, _this.current_job_schools, _this.job_opt.page)
					}
				} else {
					var className = tar.className;
					if(className.indexOf('school') > -1) {
						_this.no_data_score = false
						if(_this.school_opt.page === 1 && schoollist.length === 0)
							schoollist = _this.current_schools[1]
						if(_this.school_opt.page === 1) return
						schoollist = _this.current_schools[--_this.school_opt.page]
					} else if(className.indexOf('major') > -1) {
						_this.no_data_major = false
						if(_this.major_opt.page === 1 && components.seemajor.professions.length === 0)
							components.seemajor.professions = components.seemajor.current_major_schools[1]
						if(_this.major_opt.page === 1) return
						components.seemajor.professions = components.seemajor.current_major_schools[--_this.major_opt.page]
					} else if(className.indexOf('occupation') > -1) {
						var index = $('.vm-box li.vm-active').index();
						if(index === 0) {
							_this.no_data_occupation.vocations = false
							if(_this.occupation_opt.page === 1 && _this.occupation.vocations.length === 0)
								_this.occupation.vocations = _this.current_occupation.vocations[1]
							if(_this.occupation_opt.page === 1) return
							_this.occupation.vocations = _this.current_occupation.vocations[--_this.occupation_opt.page]
						} else if(index === 1) {
							_this.no_data_occupation.scales = false
							if(_this.occupation_opt.page === 1 && _this.occupation.scales.length === 0)
								_this.occupation.scales = _this.current_occupation.scales[1]
							if(_this.occupation_opt.page === 1) return
							_this.occupation.scales = _this.current_occupation.scales[--_this.occupation_opt.page]
						} else {
							_this.no_data_occupation.schoolgirls = false
							if(_this.occupation_opt.page === 1 && _this.occupation.schoolgirls.length === 0)
								_this.occupation.schoolgirls = _this.current_occupation.schoolgirls[1]
							if(_this.occupation_opt.page === 1) return
							_this.occupation.schoolgirls = _this.current_occupation.schoolgirls[--_this.occupation_opt.page]
						}
					} else {
						_this.no_data_job = false
						if(_this.job_opt.page === 1 && _this.job_schools.length === 0)
							_this.job_schools = _this.current_job_schools[_this.job_opt.page]
						if(_this.job_opt.page === 1) return
						_this.job_schools = _this.current_job_schools[--_this.job_opt.page]
					}
				}
			}
		},
		select: function(e) {
			var tar = e.target;
			var _this = this;
			if(tar.nodeName == 'SPAN') { // 各个子页面筛选(不包含下拉筛选)————选中样式，多为单选
				if($(tar).hasClass('active')) return; // 若目标元素已被选中,return
				if($(tar).hasClass('submit')) { // 若是选择“生成志愿表”，打开新页面并return
					location.href = 'volunteer-table.html'
					return;
				}
				if(tar.innerHTML == '清空重选') { // 清空重选
					var span = $(tar).parent().prev().find('span');
					if(!span.first().hasClass('active')) span.first().addClass('active').next().removeClass('active');
					return;
				}
				if($(tar).parents().hasClass('choice')) {
					$(tar).addClass('active').siblings('.active').removeClass('active')
					return
				}
				var box = $('.tab-right>div').not($('.tab-right>div:hidden')),
					id = box[0].id,
					url;
					$(tar).parents('.select-item').find('.active').removeClass('active');
					$(tar).addClass('active');	
				// 选中后相应获取数据
					if(id === 'recommond') { // 按分推荐
						url = base.api(65)
						_this.school_opt.page = 1;
						_this.current_schools = []
						_this.school_opt.city = parseFloat($('#recommond .select-item .area span.active').attr('datavalue')) || 0 // 省份datavalue
						console.log(_this.school_opt.city)
						if(tar.getAttribute('category')) _this.school_opt.category = tar.getAttribute('category') // 类型
						base.request(url, _this.school_opt, function(data) {
							_this.no_data_score = data.data.length == 0 // 返回数据为空
							_this.current_schools = {
								1: data.data
							} // 保存已获取的数据
							_this.schools = data.data; // 当前展示的数据
						})
					} else if(id === 'employment-school') { // 看就业选学校
						url = base.api(35)
						_this.job_opt.page = 1;
						_this.current_job_schools = [];
						_this.job_opt.city = tar.getAttribute('datavalue') || 0
						base.request(url, _this.job_opt, function(data) {
							_this.no_data_job = data.data.length == 0
							_this.current_job_schools = {
								1: data.data
							}
							_this.job_schools = data.data
						})
					} else if(id === 'major-school') { // 看就业选专业

					} else if(id === 'vocation-major') { // 看职业选专业
						var index = $('.vm-box li.vm-active').index();
						url = base.api(34)
						_this.occupation_opt.page = 1;
						if(tar.getAttribute('datavalue')) _this.occupation_opt.trade = tar.getAttribute('datavalue')
						base.request(url, _this.occupation_opt, function(data) {
							if(index === 0) {
								_this.current_occupation.vocations = {};
								_this.no_data_occupation.vocations = data.data.job.length == 0
								_this.occupation.vocations = data.data.job
								_this.current_occupation.vocations = {
									1: data.data.job
								}
							} else if(index === 1) {
								_this.current_occupation.scales = {};
								_this.no_data_occupation.scales = data.data.job.length == 0
								_this.occupation.scales = data.data.job
								_this.current_occupation.scales = {
									1: data.data.job
								}
							} else {
								_this.current_occupation.schoolgirls = {};
								_this.no_data_occupation.schoolgirls = data.data.job.length == 0
								_this.occupation.schoolgirls = data.data.job
								_this.current_occupation.schoolgirls = {
									1: data.data.job
								}
							}
						})
					}
					

			}
		},
		popLogin:function(){
			var buttons=['去登陆','取消'];
			var tpl='<div class="to-login"><div class="content">该操作需要登陆</div><div class="buttons"><div class="button">'+buttons[0]+'</div><div class="button">'+buttons[1]+'</div></div></div>';
			return function(){
				$('body').append(tpl);
				$(function(){
					$('.to-login button').click(function(){
	
					})
				})
			}
		}(),
		hasSid: function() {
			var sid = localStorage.getItem('sid');
			if(typeof sid == 'string' && sid.length >= 20) {
				return true;
			} else {
				return false;
			}
		},
		ajax: function(options) { //用于同时多次执行ajax
			options = options || {};
			base.ajax.len = base.ajax.len || 0;
			base.ajax.data = base.ajax.data || {};
			options.baseData = options.baseData || {};
			if(jQuery.type(options.url) === 'string') {
				var a = options.url;
				options.url = [];
				for(var key in options.data) {
					options.url[key] = a;
				}
			}
			var d = options.url.length;
			for(var key in options.data) {
				base.request(options.url[key], jQuery.extend(options.data[key], options.baseData), function(data) {
					base.ajax.len++;
					jQuery.extend(base.ajax.data, data.data)
					if(d === base.ajax.len) {
						options.success && options.success(base.ajax.data)
					}
				}, function() {
					options.error && options.error(base.ajax.data)
				})
			}
		},
		/*
		 *	封装ajax请求
		 *	url：(String)，接口地址；
		 *	param：(Object)，对象结构的数据，如{uid:'16',group:'area'},若没有数据，则为空{}；
		 *	callback：(Function)，回调函数，用来处理成功返回data.code===0的数据；
		 *	callback2：(Function)，对data.code非0、400的情况进行处理的回调函数，如无需要，可不传
		 */
		request: function(url, param, callback, callback2) {
			sessionStorage['sid'] && (param.sid=sessionStorage['sid']);
			$.ajax({
				type: "post",
				url: url,
				data: param
			}).done(function(data) { //请求成功
				if(data.code === 0) { // 正常返回数据
					callback(data);
				} else if(data.code === 400) { // 若未登录，提示用户，并于1s后跳转到登录界面
					$('#login').removeClass("display-none").find('.logined').removeClass("display-none");
					$('body').addClass("fixed");
					// login.$emit('login1')
				} else { // 如需对data.code做额外判断
					try {
						callback2 && callback2(data);
					} catch(err) {
						/*console.log(err + '+++');
						console.log(url + ': %c 之所以看到此提示,是因为存在非0、400状态码未做处理', 'color:red')*/
					}
				}
			})
		}
	})
	// 向window注册全局变量:base
	window.base = base;
	window.tap_load = base.tap_load;
	window.throttle = base.throttle;
	window.editor = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAABJElEQVQ4jZ3TO0oDURjF8d/IFCIiaO0CbBSx8BF8YISkiY0LsBGxsBM34B60UXAFIoKNggq+wSwglZUgVikV4rPIjEyGiUk8MNz5zr3z53zfZYL+81v/0AJ20YutsMOPA6xgL+HtdHUI+cZm2uwkyWq0DuESs1F90y6koD4DqGAuWrsx3w6khONEfY01jCCs5nMfrWZSSAFibeAdb/AXpIjTDL+MsaTRrJ10C7EeMKl+S7/KSlJsAihjKg3IgpRw0iTBOL4y9hraaZUABhOgAJ94CaJ/ZwFnTRLEM1jHdmq/hp44yeEfCeIZnGA5UQd4xVeo3mtfRoKJlPcYPQ2q5nNCLKb8e0xH76MybiORpDZwcVcJMYMnHOEKB9GhJey3gDxj+AcHCkGZFZIPvwAAAABJRU5ErkJggg=='

}();
var mytest = function() {
	var a = location.href;
	return /index\.html/.test(a) || /recommond\.html/.test(a) || /infolib\.html/.test(a)
}
if(!mytest) { //index关闭此功能
	base.init();
	//渲染公共的编辑图片的vue实例
	$(function() {
		//登录和注册的
		window.login = new Vue({
			el: "#headBox",
			data: function() {
				return {
					// loginbox:true,//登录的button按钮的判断能否点击的参数
					ismycountshow: false, //我的账户的显示与否的参数
					isLoginshow: true, //登录和注册的框显示与否
					username: '', //登录时输入的用户名
					password: '', //登录时输入的密码
					isChecked: false,
					ismycountlistshow: false, //我的账户列表显示与隐藏
					rusername: '',
					rpassword: '',
					reginum: '',
					identifying: '',
					inviter: '',
					rusername_hint: '',
					rpassword_hint: '',
					reginum_hint: '',
					identifying_hint: '',
					inviter_hint: '',
					fgetc: true,
					regiterpara: 0, //判断能否点击注册的参数
				}
			},
			methods: {
				//关闭登录页面
				closelogin: function(e) {
					e.preventDefault();
					$(".logined").hide()
					$(".cover-box").hide()
				},
				//关闭注册页面
				closeregister: function() {
					$(".register").hide()
					$(".cover-box").hide()
				},
				//点击注册账号跳转到注册页面
				rightNow: function() {
					$(".logined").addClass("display-none");
					$(".register").removeClass("display-none");
					$(".login2").addClass("active");
					$(".login1").removeClass("active");
				},
				//点击有账号页面跳转到登录页面
				rightLogin: function() {
					$(".register").addClass("display-none");
					$(".logined").removeClass("display-none");
					$(".login1").addClass("active");
					$(".login2").removeClass("active");
				},
				//登录接口的触发事件
				denglu: function() {
					if(this.password == "") {
						$('.y-errorMsg').text("请输入密码");
					}
					if(this.uername == "") {
						$('.y-errorMsg').text("请输入用户名");
					}
					if(this.username == "" || this.password == "") {
						return
					}
					base.request(base.api(40), {
						username: this.username,
						password: this.password
					}, this.loginSuccess, this.loginFail); //登录接口
				},
				loginSuccess: function(data) { //登录接口返回成功
					sessionStorage.setItem("sid", data.sid);
					sessionStorage.setItem("username", this.username);
					$(".y-errorMsg").text("登录成功");
					this.ismycountshow = !this.ismycountshow;
					this.isLoginshow = !this.isLoginshow;
					//延迟一秒让登录框消失
					setTimeout(function() {
						$("#login").hide();
						location.reload() // 登录成功重载页面
					}, 1000)
				},
				loginFail: function(data) { //登录接口返回失败
					if(data.code == -1) {
						$(".y-errorMsg").text("" + data.msg + "");
						$("#password").val("");
					}
				},
				login1: function(e) {
					if(e.target.nodeName === 'A') { // 登录、注册
						var tar = e.target,
							index = $(tar).index();
						$(".cover-box").toggle().find('.login-action').eq(index).show()
						if(!$(tar).hasClass('active')) $(tar).addClass('active').siblings('a').removeClass('active');
					}
				},
				//点击我的账户
				mycount: function(e) {
					this.ismycountlistshow = true;
				},
				vanish: function(e) {
					this.ismycountlistshow = false;
				},
				//退出登录，清除sid
				logout: function() {
					sessionStorage.removeItem("sid");
					sessionStorage.removeItem("username");
					this.ismycountshow = false;
					this.isLoginshow = true;
				},
				islogined: function() {
					//判断sid是否存在
					if(sessionStorage && sessionStorage.sid) {
						this.ismycountshow = true;
						this.isLoginshow = false;
						this.username = sessionStorage.username;
					}
				},
				//账户列表的mouseover效果
				accountlist: function(e) {
					$(e).find("a").css({
						'color': "#11bdc5"
					});
					$(".account-list>a").css({
						"color": "#555"
					});
					$(".account-list").find(".firstPic").removeClass("display-none");
					$(".account-list").find(".secondPic").addClass("display-none");
					$(e.target).find(".firstPic").addClass("display-none");
					$(e.target).find(".secondPic").removeClass("display-none");
				},
				//用于截取href中?后面内容
				subHref: function(href) {
					var str = href.substring(href.indexOf('?') + 1, href.length);
					return str.split('&')
				},
				// 发送验证码前验证手机号
				checkver_test: function() {
					var _this = this,
						c,
						user = _this.reginum,
						reg = /^1[3|4|5|7|8][0-9]{9}$/,
						res = reg.test(user);
					if(user == null || user == '') {
						_this.reginum_hint = "手机号不能为空";
						return;
					} else if(res) {
						_this.reginum_hint = "";
						c = 1;
					} else {
						_this.reginum_hint = "手机号不符合要求";
						return;
					}
					if(c == 1) return true;
				},
				//发动验证码
				coding: function() {
					var _this = this;
					if(_this.checkver_test()) {
						var phone = _this.reginum;
						if(phone == "") {
							_this.reginum_hint = "手机号不能为空";
							return;
						}
						base.request(base.api(38), {
								'phone': phone
							}, function(data) {
								if(_this.fgetc == true) {
									_this.fgetc = false;
									var i = 60;
									$('#get-code').text(i + 's').css('background-color', "#c2c2c2");
									var time = setInterval(fun, 1000);

									function fun() {
										i--;
										if(i === 0) {
											$('#get-code').text("获取验证码").css('background-color', "#11bdc5");
											clearInterval(time);
											_this.fgetc = true;
										} else {
											$('#get-code').text(i + "s").css('background-color', "#c2c2c2");
										}
									}
								}
							},
							function(data) {
								data['code']['0'] === '160040' ? alert('当天短信发送次数超限') : alert(data.msg, "提示", "确定");
							})
					}
				},
				// 验证用户名、手机号、验证码、密码
				checkver: function(e) {
					var _this = this,
						a,
						b,
						c,
						d,
						username = _this.rusername,
						phone = _this.reginum,
						code = _this.identifying,
						password = _this.rpassword,
						invite = _this.inviter || '',
						reg = /^1[3|4|5|7|8][0-9]{9}$/,
						pat1 = /^[0-9]{4}$/,
						pat2 = /^[a-zA-Z0-9]{6,20}$/,
						pat3 = /^[a-zA-Z0-9]{5,20}$/,
						res = reg.test(phone),
						res1 = pat1.test(code),
						res2 = pat2.test(password),
						res3 = pat3.test(username);
					if(username == null || username == '') {
						_this.rusername_hint = '请输入用户名';
						return;
					} else if(res3) {
						_this.rusername_hint = "";
						d = 1
					} else {
						_this.rusername_hint = '用户名不符合要求';
						return;
					}
					if(password == null || password == '') {
						_this.rpassword_hint = "密码不能为空";
						return;
					} else if(res2) {
						_this.rpassword_hint = "";
						a = 1;
					} else {
						_this.rpassword_hint = "密码不符合要求";
						return;
					}
					if(phone == null || phone == '') {
						_this.reginum_hint = "账户不能为空";
						return;
					} else if(res) {
						_this.reginum_hint = "";
						c = 1;
					} else {
						_this.reginum_hint = "账户不符合要求";
						return;
					}
					if(code == null || code == '') {
						_this.identifying_hint = "验证码不能为空";
						return;
					} else if(res1) {
						_this.identifying_hint = "";
						b = 1;
					} else {
						_this.identifying_hint = "验证码不符合要求";
						return;
					}
					if(a == 1 && b == 1 && c == 1 && d == 1) {
						_this.check_register(username, phone, code, password, invite)
					}
				},
				check_register: function(username, phone, code, password, parent) { // 注册
					var _this = this;
					var parent = parent || '';
					base.request(base.api(37), {
						username: username,
						phone: phone,
						code: code,
						password: password,
						parent: parent
					}, function(data) {
						alert('注册成功');
						this.ismycountshow = !this.ismycountshow;
						this.isLoginshow = !this.isLoginshow;
						setTimeout(function() {
							$("#login").hide();
						}, 500)
					}, function(data) {
						alert(data.msg);
					})
				},
			},
			created: function() {
				//写登录的sessionstorage 调用islogined方法
				this.islogined();
			}
		});
		/*$('.ul-box.clearfix').click(function(e){
			console.log(this);
		})
		$(".school-groom").mouseover(function() {
		    $(".tabUl").hide();
		    $(".banxin-school-groom").show();
		    $(".tab-nav").show();
		});
		$(".information-bank").mouseover(function() {
		    $(".tabUl").hide();
		    $(".banxin-information-bank").show();
		    $(".tab-nav").show();
		});
		$(".ul-box").mouseout(function(){
		    $(".tab-nav").hide();
		});*/
	})
}

function closelogin() {
	$('.cover-box').addClass("display-none");
	$('.register').addClass("display-none");
	$('.logined').addClass("display-none");
}

function reveal() {
	$("#tips").show();
}

function conceal() {
	$("#tips").hide();
}