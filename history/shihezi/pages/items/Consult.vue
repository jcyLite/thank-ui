<template>
	<div data-role="page" id="advicePage">
		<Header title="咨询" />
		<div class="page_content">
			<div class="jszx-wrapper" id="adviceWrapper">
				<div class="jszx-scroller" id="adviceScroller">
					<div @click="pro_type" id="problem_type" class="choose_cell">
						<p style="width:30%;float: left;line-height: 52px;text-indent:6%">问题分类</p>
						<div id="choose_type" class="choose_result">
							{{msg}}
						</div>
						<div class="right_pop">
							<div class="right_pop_icon"></div>
						</div>
					</div>

					<div id="dept_choose" class="choose_cell select-value3">
						<p style="width:30%;float: left;line-height: 52px;text-indent:6%">部门选择</p>
						<div style="float:left;" id="choose_dept" class="choose_result">
							{{dept}}
						</div>
						<div style="float:left;" class="right_pop">
							<div class="right_pop_icon"></div>
						</div>
					</div>

					<div class="content_input">
						<input v-model="title" id="title_input" style="padding-left:18px;" placeholder="请输入标题" />
					</div>

					<div class="content_input">
						<textarea v-model="content" id="content_area" style="padding-left:18px;" placeholder="请输入内容" />
					</div>

					<div class="choose_cell">
						<input v-model="mobile" data-role="none" id="contact_input" type="text" placeholder="请输入联系方式" style="height: 52px;width: 100%;border:none;outline: none;-webkit-appearance: none;text-indent:6%">
					</div>

					<button :disabled="!canSubmit" @click="submit" class="ui-btn ui-corner-all shz_loginBtn" id="advice_submit">提交</button>

					<!-- 隐藏域：存储部门id-->
					<div style="height:2rem" id="deptId_area"></div>
				</div>
			</div>

			<!-- 问题分类底部弹窗-->
			<!--<div @click="cancel"  v-if="show" class="jui_mask">
				<div v-if="show" class="jui_actionsheet" id="type_pop">
					<div class="jui_actionsheet_menu" id="type_cells">
						<a @click="toMsg($event,'咨询')" href="javascript:void(0);">咨询</a>
						<a @click="toMsg($event,'建议')" href="javascript:void(0);">建议</a>
						<a @click="toMsg($event,'投诉')" href="javascript:void(0);">投诉</a>
					</div>
					<a @click="cancel" href="javascript:void(0);" class="jui_actionsheet_action">取消</a>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	 //获取当前时间，格式YYYY-MM-DD
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if(month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if(strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
	function onlineConsulting(){
		this.$http.post('onlineConsulting.action',{
			type:this.msg,
			title:this.title,
			content:this.content,
			createTime:getNowFormatDate(),
			deptCode:this.$route.query.deptCode,
			mobile:this.mobile,
			itemId:this.$route.query.row_id
		}).then(d=>{
			this.$poper.tips('提交成功')
			this.$router.goBack()
		})
	}
	import {phone_RE} from '@/module/RE_tester.js'
	export default {
		data() {
			return {
				show: !1,
				msg: '',
				dept:'',
				cityData:[],
				title:'',
				content:'',
				mobile:''
			}
		},
		computed:{
			canSubmit(){
				return this.msg&&this.title&&this.content&&this.mobile
			}
		},
		methods: {
			pro_type() {
				var that=this;
				var btns=['咨询','建议','投诉'];
				this.$poper.bottom({
					btn:btns,
					confirm(i){
						that.msg=btns[i]
					}
				})
//				this.show = !0;
			},
			cancel() {
				this.show = !1;
			},
			toMsg(e, msg) {
				this.msg = msg;
			},
			submit(){//点击提交按钮
				if(!phone_RE.test(this.mobile)){
					return this.$poper.tips('手机号码不符合要求')
				}
				onlineConsulting.call(this)
			}
		},
		mounted() {
			var that=this;
			this.$http.post('deptList.action').then(data=>{
				var jsonData = data.data;
                var dept_codes = jsonData;
                var total = data.totalCount;
                for(var i = 0; i < jsonData.length; i++) {
                    var dic = jsonData[i];
                    dic["parentId"] = "100000";
                    dic["name"] = jsonData[i].dept_name;
                }
                var cityData = jsonData;
				$(".select-value3").mPicker({
					shadow: true,
					level: 1,
					dataJson:cityData,
					Linkage: false,
					rows: 5,
					idDefault: true,
					header: '<div class="mPicker-header">部门选择</div>',
					footer: '<div class="mPicker-footer"><a href="javascript:;" class="mPicker-confirm">确定</a><a href="javascript:;" class="mPicker-cancel">取消</a></div>',
					confirm: function(json) {
						that.dept=json.name
					},
					cancel: function(json) {
	
					}
				})
			})
			
		}

	}
</script>

<style scoped="scoped" lang="less">
	.ui-input-text input {
		min-height: 0rem !important;
	}
	
	div.ui-input-text {
		display: inline !important;
		border-width: 0rem !important;
		position: relative;
	}
	
	.choose_cell {
		width: 100%;
		height: 55px;
		background: white;
		margin: 0px auto;
		margin-top: 10px;
	}
	
	.right_pop {
		width: 12%;
		height: 52px;
		text-align: center;
		line-height: 52px;
		display: inline-block;
		float: right;
	}
	
	.right_pop_icon {
		width: 16px;
		height: 16px;
		margin-top: 14px;
		margin-left: 10px;
		background-image: url('../../resources/pictures/back_right_gray.png');
		background-size: cover;
	}
	
	.choose_result {
		width: 58%;
		height: 52px;
		line-height: 52px;
		text-align: right;
		display: inline-block;
		color: #979797;
	}
	
	.content_input {
		margin-top: 10px;
		width: 100%;
		background: white;
	}
	
	#content_area {
		padding-top: .8rem;
		padding-bottom: 0.5rem;
		min-height: 8rem;
		width: 88%;
		margin: auto;
		outline: 0;
		background: white;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-user-modify: read-write-plaintext-only;
	}
	
	#title_input {
		padding-top: .8rem;
		padding-bottom: 0.5rem;
		min-height: 2.75rem;
		width: 88%;
		margin: auto;
		outline: 0;
		background: white;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-user-modify: read-write-plaintext-only;
	}
	/* 模拟placeholder属性*/
	
	[contentEditable=true]:empty:not(:focus):before {
		content: attr(data-text);
		color: #979797;
		font-size: 1em;
	}
	
	[contentEditable=true]:empty:focus:before {
		content: attr(data-text);
		color: #979797;
		font-size: 1em;
	}
	
	.commit_btn {
		background: lightgray !important;
		width: 90% !important;
		margin: 30px auto 0 !important;
		border-radius: 10px !important;
		color: white !important;
	}
</style>