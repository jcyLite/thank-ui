<template>
	<div data-role="page" id="shixiangDetailPage">
		<Header @right_top_click="right_top_click" :right_top="right_top" :title="d.itemName||'详情'" />
		<div class="page_content">
			<div class="boxListTitle">
				<div class="menu4">
					<span @click="to(index)" v-for="(item,index) of ['基本信息','流程图','设定依据','常见问题']" :class="{active:active==index}">{{item}}</span>
				</div>
			</div>
			<div class="max-slider" id="shixiangDetailBoxListSlider" style="margin-top: 1px;">
				<div id="shixiangDetailWrapper" class="container">
					<div id="shixiangDetailScroller" class="jszx-scroller" style="background-color: #FFFFFF;">
						<transition :name="transitionName">
							<div v-if="active==0" id="shixiangJCXI" class="page_content_in">
								<div class="jui_loadmore_line">
									<span>基本信息</span>
								</div>
								<div>
									<div class="view_out2" style="margin-bottom:0rem">
										<div class="view_in2">
											<div class="view_in_left" style="width:20%;line-height:3.5rem">
												事项名称
											</div>
											<div class="view_in_right2" style="width:70%" id="itemName">
												{{d.itemName}}
											</div>
										</div>
									</div>
									<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
										<div style="display:inline-block;width:20%;color:#979797">事项编码</div>
										<div style="width:78%;display:inline-block;text-align:right;color:#000" id="itemCode">
											{{d.itemCode}}
										</div>
									</div>
									<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
										<div style="display:inline-block;width:20%;color:#979797">实施单位</div>
										<div style="width:78%;display:inline-block;text-align:right;color:#000" id="itemDept">
											{{d.itemDept}}
										</div>
									</div>
									<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
										<div style="display:inline-block;width:50%;color:#979797">事项类型</div>
										<div style="width:48%;display:inline-block;text-align:right;color:#000" id="itemType">
											{{d.itemType}}
										</div>
									</div>
									<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
										<div style="display:inline-block;width:30%;color:#979797">咨询电话</div>
										<div style="width:68%;display:inline-block;text-align:right;color:#000" id="linkTel">
											{{d.linkTel}}
										</div>
									</div>
									<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
										<div style="display:inline-block;width:50%;color:#979797">监督电话</div>
										<div style="width:48%;display:inline-block;text-align:right;color:#000" id="superviseTel">
											{{d.superviseTel}}
										</div>
									</div>
									<div style="border-bottom:none;width:90%;margin-left:5%;line-height:3.5rem;">
										<div style="display:inline-block;width:30%;color:#979797">承诺期限</div>
										<div style="width:68%;display:inline-block;text-align:right;color:#000" id="promiseDay">
											{{d.promiseDay}}天
										</div>
									</div>
								</div>
								<div style="height:1.5rem;background:#f9f9f9"></div>
							</div>
							<div v-if="active==1" id="shixiangLCT" class="page_content_in">
								<div class="jui_loadmore_line">
									<span>流程图</span>
								</div>
								<!--<img style="margin-bottom:1rem;width:15%;margin-left:42.5%" id="itemJPG" src="@/resources/images/liuchengtu.png" />-->
								<!--改为绝对路径-->
								<img style="margin-bottom:1rem;width:15%;margin-left:42.5%" id="itemJPG" src="@/resources/images/liuchengtu.png" />
								<div style="height:1.5rem;background:#f9f9f9">

								</div>
							</div>
							<div v-if="active==2" id="shixiangSDYJ" class="page_content_in">
								<div class="jui_loadmore_line">
									<span>设定依据</span>
								</div>
								<div style="width:90%;margin-left:5%;margin-bottom:1rem;" id="lawbasis">
									{{decodeURIComponent(d.lawbasis)}}
								</div>
								<div style="height:1.5rem;background:#f9f9f9">

								</div>
							</div>
							<div v-if="active==3" id="shixiangCJWT" class="page_content_in" style="padding-bottom:6rem">
								<div class="jui_loadmore_line">
									<span>常见问题</span>
								</div>
								<div style="width:100%" id="problemList">
									<div v-for="item of d.problemList">
										<div style="width:100%;background:#fff;">
											<div style="width:10%;margin-left:5%;float:left;margin-top:1rem;display:inline-block;height：2rem;width:2rem;border-radius:2rem;font-size:1rem;background:orange;line-height:2rem;text-align:center">问</div>
											<span style="width:85%;display:inline-block;padding-left:1rem;margin-top:1.25rem;margin-bottom:1.25rem;line-height:1.5rem">
											{{item.problemtitle}}
										</span>
										</div>
										<div style="width:100%;background:#f9f9f9">
											<div style="width:10%;margin-left:5%;margin-top:1rem;float:left;display:inline-block;height：2rem;width:2rem;border-radius:2rem;font-size:1rem;background:#77c581;line-height:2rem;text-align:center">答</div>
											<div style="width:85%;display:inline-block;padding-left:1rem;margin-top:1.25rem;margin-bottom:1.25rem;line-height:1.5rem">
												{{item.probleminfo}}
											</div>
										</div>
									</div>
								</div>
							</div>
						</transition>

					</div>
				</div>

			</div>

		</div>
		<div id="shixiangFooter" style="width:90%;height:3.5rem;background:#77c581;left:5%;border-radius:1.5rem">
			<div @click="declare" style="width:33.33%;height:3.5rem;border-radius:1.5rem;float:left" onclick="toSkipZaixianshenbao()">
				<img src="@/resources/images/shenbao.png" style="height:2rem;width:auto;float:left;margin-top:0.75rem;margin-left:1rem" />
				<span style="margin-left:0.5rem;line-height:3.5rem;color:#fff;">申报</span>
			</div>
			<div style="width:33.33%;height:3.5rem;border-radius:1.5rem;float:left">
				<img src="@/resources/images/yuyue.png" style="height:2rem;width:auto;float:left;margin-top:0.75rem;margin-left:1rem" />
				<span style="margin-left:0.5rem;line-height:3.5rem;color:#fff;">预约</span>
				<input data-role="none" type="text" class="select-value2" value="" style="color: transparent;border:none;margin-top:-2rem;z-index:999;background-color:transparent">
			</div>
			<div style="width:33.33%;height:3.5rem;border-radius:1.5rem;float:left" @click="toSkipZaixianzixun">
				<img src="@/resources/images/zixun.png" style="height:2rem;width:auto;float:left;margin-top:0.75rem;margin-left:1rem" />
				<span style="margin-left:0.5rem;line-height:3.5rem;color:#fff;">咨询</span>
			</div>
		</div>

	</div>
</template>

<script>
	function discollect() {
		this.$http.post('discollect.action', {
			itemId: this.$route.query.id
		}).then(d => {
			this.show = "0";
			this.$poper.tips(d.message)
		})
	}

	function collect() {
		this.$http.post('collect.action', {
			itemId: this.$route.query.id
		}).then(d => {
			this.show = "1";
			this.$poper.tips(d.message)
		})
	}

	function itemDetail() {
		this.$http.post('itemDetail.action', {
			itemId: this.$route.query.id
		}).then(d => {
			this.show = d.data[0].isCollection
			this.d = d.data[0];
			this.right_top.active=this.show;
			//			this.title=data.itemName;
		})
	}

	function onlineAppointment(appointmentTime) {
		this.$http.post('onlineAppointment.action', {
			itemId: this.$route.query.id,
			appointmentTime
		}).then(d => {
			this.$poper.tips(d.message)
		})
	}
	// 获取n天后的日期
	function GetDateStr(n) {
		var dd = new Date();
		dd.setDate(dd.getDate() + n);
		var y = dd.getFullYear();
		var m = dd.getMonth() + 1; //获取当前月份的日期
		var d = dd.getDate();
		return y + "-" + m + "-" + d;
	}
	export default {
		data() {
			return {
				title: '详情',
				show: "0", //false 为不收藏状态
				active: 0,
				d: {},
				transitionName: 'tap'
			}
		},
		computed: {
			iconClass() {
				return !this.show ? 'glyphicon glyphicon-star-empty' : 'glyphicon glyphicon-star';
			},
			right_top() {
				var that = this;
				return {
					toggleClass: ['glyphicon glyphicon-star-empty', 'glyphicon glyphicon-star'],
					active: this.show
				}
			}
		},
		methods: {
			to(index) { //点击基本信息、流程图、设定依据、常见问题
				this.active = index;
			},
			declare() { //点击申报
				window.open("http://shzzwfw2.shz.gov.cn/shz/outWeb/index.action", "_system");
			},
			toSkipZaixianzixun() { //点击咨询
				this.$router.push({
					path: '/consult',
					query: {
						deptCode: this.d.deptCode,
						row_id: this.$route.query.id
					}
				})
			},
			right_top_click(){
				if(this.show == '0') {
					collect.call(this)
				} else {
					discollect.call(this)
				}
			}
		},
		created() {
			itemDetail.call(this)
		},
		mounted() {
			var that = this;
			this.$module.initScroll('#shixiangDetailWrapper',{
				"wrapper": "shixiangDetailWrapper", //滚动组件的id
				"dir": "y", //滚动的方向，x或者y
				"bounce": false,
				"scrollBar": false
			})
			var jsonDatas = new Array();
			var timeArray = [{
				"name": "9:00",
				"value": "0"
			}, {
				"name": "9:30",
				"value": "1"
			}, {
				"name": "10:00",
				"value": "2"
			}, {
				"name": "10:30",
				"value": "3"
			}, {
				"name": "11:00",
				"value": "4"
			}, {
				"name": "11:30",
				"value": "5"
			}, {
				"name": "12:00",
				"value": "6"
			}, {
				"name": "12:30",
				"value": "7"
			}, {
				"name": "13:00",
				"value": "8"
			}, {
				"name": "13:30",
				"value": "9"
			}, {
				"name": "14:00",
				"value": "10"
			}, {
				"name": "14:30",
				"value": "11"
			}, {
				"name": "15:00",
				"value": "12"
			}, {
				"name": "15:30",
				"value": "13"
			}, {
				"name": "16:00",
				"value": "14"
			}, {
				"name": "16:30",
				"value": "15"
			}, {
				"name": "17:00",
				"value": "16"
			}];
			for(var i = 0; i < 365; i++) {

				if(i >= 8) {
					var itemData = new Array();
					var day = GetDateStr(i);

					if(i == 8) {
						$(".select-value2").attr("value", day);
					}

					itemData["name"] = day;
					itemData["value"] = i - 7;
					itemData["child"] = timeArray;

					jsonDatas.push(itemData);

				}

			}
			var level3 = jsonDatas;
			$('.select-value2').mPicker({
				shadow: true,
				level: 2,
				dataJson: level3,
				rows: 5,
				Linkage: false,
				header: '<div class="mPicker-header">预约时间</div>',
				footer: '<div class="mPicker-footer"><a href="javascript:;" class="mPicker-confirm">预约</a><a href="javascript:;" class="mPicker-cancel">取消</a></div>',
				idDefault: true,
				confirm: function(json) {
					onlineAppointment.call(that, json.name)
				}
			})
		}
	}
</script>

<style scoped="scoped" lang="less">
	.view_out2 {
		width: 100%;
		background: #ffffff;
		min-height: 3.5rem;
	}
	
	.view_in2 {
		width: 90%;
		margin-left: 5%;
		display: block;
		overflow: hidden;
		font-size: 1rem;
		border-bottom: 1px solid #eee;
		line-height: 3.5rem;
		min-height: 3.5rem;
	}
	
	.view_in_left {
		width: 35%;
		float: left;
		text-align: left;
		color: #9d9d9d;
	}
	
	.view_in_right2 {
		width: 60%;
		/*margin-right:5%;*/
		float: right;
		font-size: 1rem;
		line-height: 1.5rem;
		margin-top: 1rem;
		min-height: 1.5rem;
		margin-bottom: 1rem;
		text-align: right;
	}
	
	.tap-enter,
	.tap-leave-active {
		opacity: 0;
	}
	
	.slidebottom div.slide3 {
		width: 25%;
	}
	
	.slidebottom div.slide1,
	.slidebottom div.shixiangDetailslide2,
	.slidebottom div.slide3 {
		position: absolute;
		height: 2px;
		left: 0;
		bottom: 0;
		background: #17639F;
		-webkit-transition: left 0.1s ease-in;
	}
	
	.menu4 span.active {
		color: #77c581;
		border-bottom: 1px solid #77c581;
	}
	
	.menu4 span {
		width: 24.9%;
	}
	
	.menu4 div.slide {
		width: 25%;
	}
	
	.slidebottom div.shixiangDetailslide2 {
		width: 25%;
	}
	
	.slidebottom div.slide1,
	.slidebottom div.shixiangDetailslide2,
	.slidebottom div.slide3 {
		position: absolute;
		height: 2px;
		left: 0;
		bottom: 0;
		background: #77c581;
		-webkit-transition: left 0.1s ease-in;
	}
	
	.jui_loadmore,
	.jui_loadmore_line,
	.jui_loadmore_dot {
		margin: 2rem 5rem 0rem 5rem;
	}
	
	#shixiangFooter {
		position: fixed;
		bottom: 20px;
	}
	
	.left {
		line-height: 50px;
		width: 50px;
		height: 40px;
		text-align: center;
	}
	
	.page_header_title {
		height: 40px;
		width: 200px;
		margin: auto;
		left: 0;
		right: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.select-value2 {
		position: fixed;
		bottom: 20px;
		width: 100px;
		left: 0;
		right: 0;
		margin: 0 auto;
		height: 60px;
	}
	
	.menu2,
	.menu3,
	.menu4 {
		position: relative;
		font-size: 1em;
		/*font-weight:bold;*/
		text-align: center;
		border-top: solid 1px #fff;
		border-bottom: solid 1px #fff;
		background: #fff;
	}
	
	.menu3 span,
	.menu4 span {
		position: relative;
		display: inline-block;
		padding: 10px 0;
		color: #A3B0B9;
	}
	
	.jui_loadmore_line {
		border-top: .0625rem solid #e3e3e3;
		font-size: 1rem;
		text-align: center;
	}
	
	.jui_loadmore_line span {
		position: relative;
		top: -.9rem;
		padding: 0 1rem;
		background: #fafafa;
		color: #999;
	}
</style>