<style scoped="scoped" lang="less">
	@import "~@/style/variable.less";
	.message-box {
		position: relative;
		background-color: transparent;
		left: 5%;
		width: 90%;
		margin-bottom: 2.5rem;
		padding-top: 1rem;
		.title {
			position: relative;
			width: 90%;
			left: 5%;
			line-height: 30px;
			height:30px;
			div {
				width: 0.4rem;
				height: 30px;
				margin-top: 0;
				display: inline-block;
			}
			h1 {
				font-size: 1rem;
				margin-left: 0.5rem;
				margin-top: 0;
				margin-bottom: 0.5rem;
				vertical-align: top;
				color: #333333;
				display: inline-block;
			}
		}
		.box {
			padding-top:10px;
			margin-top:10px;
			position: relative;
			background-color: white;
			width: 90%;
			height: 100%;
			left: 5%;
			box-shadow: @shadow;
			border-radius: 1rem;
			h1:first-child {
				position: relative;
				display: inline-block;
				height: auto;
				font-size: 1.2rem;
				margin-left: 1rem;
			}
			h1:nth-child(2) {
				position: relative;
				display: inline-block;
				float: right;
				color: #979797;
				font-size: 0.9rem;
				margin-right: 1rem;
			}
			>div.content {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 1rem;
				margin-left: 1rem;
			}
		}
	}
</style>
<template>
	<div data-role="page" id="message-list-main">
		<Header title="消息" />
		<div class="container">
			<div>
				<div class="forBox">
					<Nodata v-if="d.length==0"></Nodata>
					<div class="message-box" @click="changeToRead(item)" v-for="item of d" :style="{height:item.msgtypeHeight}">
						<div class="title">
							<div :style="{'background-color':item.msgtypeColor}"></div>
							<h1>
								{{item.msgtypeStr}}
							</h1>
						</div>
						<div class="box">
							<h1 :style="{color:item.msgStringColor}">
								{{item.msgstatusStr}}
							</h1>
							<h1>
								{{item.createtime}}
							</h1>
							<div class="content" :style="{color:item.msgStringColor}">
								{{item.msgcontent}}
							</div>
							<div v-html="item.msgstatusStrHtml">

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * 加载消息列表
	 */
	function getList(reset) {
		var that = this;
		var messageListLoading = false;
		if(messageListLoading) {
			showLoading("正在加载...");
		}
		var pageIndex = this.page;
		if(this.page == 1) {
			$("#message-list").empty();
		}
		this.$http.post('systemMessageList.action', {
			cpage: this.page,
			len: 10
		}).then(data => {
			if(data.systemMessageList.length==0){
				reset&&reset('nodata');
				return this.page--;
			}
			if(this.page==1){
				this.d=[];
			}
			messageListLoading = false;
			var systemMessageList = data.systemMessageList;
			var total = data.totalCount;
			this.messagePageNumber = Math.floor(total / 10) + (total % 10 == 0 ? 0 : 1);
			if(total == 0) {
				var html = "";
				html += '<img style="width:100%;height:auto;" src="../../resources/images/wuneirong.png">';
				$(html).appendTo("#message-list");
			}
			//生成items
			for(var i = 0; i < systemMessageList.length; i++) {
				var id = systemMessageList[i].id;
				var msgtype = systemMessageList[i].msgtype;
				var msgtypeStr = "";
				var msgtypeColor = "";
				var msgtypeHeight = "7rem";
				var msgStringColor = "";
				var msgstatusStr = "";
				var msgstatusStrHtml = "";
				var msgId = "";
				var msgcontent = systemMessageList[i].msgcontent;
				var msgstatus = systemMessageList[i].msgstatus;
				switch(msgstatus) {
					case "0": //未读
						msgStringColor = "#333333";
						break;
					case "1": //已读
						msgStringColor = "#cccccc";
						break;
					default:
						msgStringColor = "#333333";
						break;
				}
				switch(msgtype) {
					case "1":
						//截取
						if(msgcontent && msgcontent.length > 14) {
							msgId = msgcontent.substring(0, 14);
							msgstatusStr = "办件" + msgcontent.substring(14, msgcontent.length).replace("。", "");
							msgstatusStrHtml = "<h1 style=\" width: 100%; left: 5%; color: " + msgStringColor + ";font-size: 0.7rem; margin-left: 1rem;\">" + "办件编号：" + msgId + "</h1>" +
								"</div>" +
								"</div>";
						} else {
							msgstatusStr = "办件已完成";
							msgstatusStrHtml = "</div>" + "</div>";
						}
						msgtypeStr = "办件消息";
						msgtypeColor = "#78B3FA";
						msgtypeHeight = "8.7rem";
						break;
					case "2":
						msgtypeStr = "咨询消息";
						msgstatusStr = "咨询已回复";
						msgtypeColor = "#EBB761";
						msgtypeHeight = "7rem";
						break;
					case "3":
						msgtypeStr = "建议消息";
						msgstatusStr = "建议消息";
						msgtypeColor = "#EBB761";
						msgtypeHeight = "7rem";
						break;
					case "4":
						msgtypeStr = "投诉消息";
						msgstatusStr = "投诉消息";
						msgtypeColor = "#EBB761";
						msgtypeHeight = "7rem";
						break;
					case "100":
						msgtypeStr = "系统消息";
						msgstatusStr = "系统消息";
						msgtypeColor = "#75C3C5";
						msgtypeHeight = "7rem";
						break;
					default:
						break;
				}

				var createtime = systemMessageList[i].createtime;
				this.d.push({
					msgtypeHeight,
					msgtypeColor,
					msgtypeStr,
					msgStringColor,
					msgstatusStr,
					createtime,
					msgcontent,
					msgstatusStrHtml,
					id:systemMessageList[i].id,
					msgtype
				})
			}
			if(systemMessageList.length<10){
				return reset&&reset(true)
			}
			this.myScroll&&this.myScroll.refresh();
			reset && reset(true);
		})
	};
	export default {
		data() {
			return {
				page: 1,
				d: [],
				messagePageNumber: 1
			}
		},
		mounted() {
			var that = this;
			this.myScroll=that.$module.initScroll('.container',{
				dir:"y", //滚动的方向，x或者y
				pullDownLoading(reset) {
					that.page = 1;
					getList.call(that, reset)
				},
				pullUpLoading(reset) {
					that.page++;
					getList.call(that, reset)
				},
				initAjax(reset){
					getList.call(that,reset)
				}
			})
		},
		methods: {
			changeToRead(message) {
				console.log(message.msgtype);
				this.$http.post('readMessage.action', {
					isAll:0,
					messageId: message.id,
					userId: 1
				}).then(data => {
					switch(message.msgtype) {
						case "1":
							this.$router.push({
								path: '/user/Item/My_apply_detail',
								query: {
									id: message.id
								}
							})
							break;
						case "2": //咨询
						case "3": //建议
						case "4": //投诉
							window.myQuestionItemXQData = {
								infoid: message.row_id
							};
							window.messageListInit = false;
							$.mobile.changePage("../user/myquestionDoneDetail.html");
							break;
						case "100": //系统

							break;
						default:
							break;
					}
				})
			}
		}
	}
</script>