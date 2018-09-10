<template>
	<div @click="dept_active=false" class="offer_suggestions">
		<Header title="建言献策" />
		<div class="container">
			<div class="scroller">
				<div class="dept">
					部门：
					<input @input="dept_input" v-model="dept" type="text" />
					<div @click.stop="dept_data_metch=deptList,dept_active=!dept_active" :class="[!dept_active?'glyphicon-chevron-down':'glyphicon-chevron-up']" class="bot glyphicon">
					</div>
					<div @touchstart.stop='' @touchmove.stop='' @touchend.stop='' :class="{active:!!dept_active}" class="dept_list">
						<ul>
							<li @click="dept_click(item)" v-for="item of dept_data_metch">
								{{item.dept_name}}
							</li>
						</ul>
					</div>
				</div>
				<div class="type">
					类型：
					<ul>
						<li @click="check_box(index)" v-for="(item,index) of type_data">
							<div :class="{active:check_active==index}" class="check_box">
								<span v-if="check_active==index" class="icon-checkmark"></span>
							</div>
							<div>
								{{item.name}}
							</div>
						</li>
					</ul>
				</div>
				<div class="title">
					标题：
					<input v-model="title" type="text" />
				</div>
				<textarea v-model="message" placeholder="请输入您的建议" name="" rows="" cols=""></textarea>
				<div class="mobile">
					手机号：
					<input v-model="mobile" type="number" />
				</div>
				<div @click="submit" class="btn_1">
					提交
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { phone_RE } from "@/module/RE_tester.js";

	function ajax() {
		this.$http.post('onlineConsulting.action', {
			deptCode: this.dept_code,
			type: this.check_active + 1,
			title: this.title,
			content: this.message,
			mobile: this.mobile
		}).then(d => {

		})
	}
	export default {
		data() {
			return {
				dept: '',
				dept_code: '',
				title: '',
				type: '请点击右侧按钮,选择类型。',
				message: '',
				mobile: '',
				dept_active: false,
				type_active: false,
				deptList: null,
				dept_data_metch: [],
				type_data: [{
					name: '咨询',
					id: '1'
				}, {
					name: '建议',
					id: '2'
				}, {
					name: '投诉',
					id: '3'
				}],
				check_active: 1
			}
		},
		created() {
			this.$ajax.deptList.call(this);
		},
		mounted() {
			this.$module.initScroll('.container',{
				"dir": "y" //滚动的方向，x或者y
			})
		},
		methods: {
			submit() {
				if(!this.dept_code) {
					return this.$poper.tips('请选择部门')
				}
				if(!this.title) {
					return this.$poper.tips('请填写标题')
				}
				if(!this.message) {
					return this.$poper.tips('请填写您的建议')
				}
				if(!this.mobile) {
					return this.$poper.tips('请输入您的手机号');
				}
				if(!phone_RE.test(this.mobile)) {
					return this.$poper.tips('请输入正确的手机号码');
				}
				ajax.call(this);
				this.$router.go(-1);
			},
			dept_click(item) {
				this.dept = item.dept_name;
				this.dept_code = item.dept_code;
				this.dept_active = false;
			},
			check_box(i) {
				this.check_active = i;
			},
			dept_input() {
				var arr = [];
				for(var key of this.deptList) {
					if(!!this.dept && new RegExp(this.dept).test(key.dept_name)) {
						arr.push(key);
					}
				}
				this.dept_data_metch = arr;
				if(arr.length > 0) {
					this.dept_active = true;
				} else {
					this.dept_active = false;
				}
			},
			type_click() {

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import "./Work_guide/fonts/style.css";
	.container {
		textarea {
			width: 90%;
			margin-left: 5%;
			border: 1px solid #ddd;
			height: 200px;
			margin-top: 10px;
			padding: 10px;
		}
		.btn_1 {
			margin-top: 40px;
			margin-bottom:200px;
		}
	}
	.dept,
	.type,
	.title,
	.mobile {
		width: 90%;
		position: relative;
		border: 1px solid #ddd;
		border-radius: 4px;
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
		margin-left: 5%;
		margin-top: 10px;
		background: #fff;
		input {
			background: transparent;
		}
		.glyphicon {
			position: absolute;
			top: 17px;
			right: 10px;
			color: #ddd;
			text-align: center;
			height: 40px;
			width: 40px;
		}
	}
	
	.dept {
		input {
			width: 70%;
		}
		.dept_list {
			position: absolute;
			width: 100%;
			left: 0;
			z-index: 10;
			background: #fff;
			height: 0px;
			border: 1px solid #ddd;
			opacity: 0;
			transition: .2s all;
			overflow-y: scroll;
			ul {
				li {
					height: 40px;
					line-height: 40px;
					padding-left: 10px;
				}
			}
		}
		.dept_list.active {
			height: 200px;
			z-index: 10;
			opacity: 1;
			border-bottom: 2px solid #ddd;
		}
	}
	
	.type {
		position: relative;
		ul {
			float: right;
			height: 50px;
			line-height: 50px;
			width: 80%;
			display: flex;
			li {
				flex: 1;
				width: 40%;
				.check_box {
					width: 20px;
					height: 20px;
					border-radius: 10px;
					border: 1px solid #ddd;
					margin-top: 15px;
					margin-right: 10px;
					color: #fff;
					text-align: center;
					line-height: 20px;
					position: relative;
					span {
						text-align: center;
						line-height: 20px;
						position: absolute;
						top: 0;
						left: 2px;
						color: #fff;
						font-size: 14px;
					}
				}
				.check_box.active {
					background: #2a70d0;
					border: none;
				}
				div {
					float: left;
					height: 50px;
					line-height: 50px;
				}
			}
		}
	}
	
	.title {}
</style>