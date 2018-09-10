<template>
	<div class="list">
		<div class="title">
			部门
		</div>
		<div class="sel">
			<input @input="input" placeholder="全部" v-model="dept" type="text" />
		</div>
		<div @click="show" :class="[!active?'glyphicon-chevron-down':'glyphicon-chevron-up']" class="bot glyphicon">

		</div>
		<div :class="{active:active}" class="list_container">
			<div @click="dept_list_click(item.name,item.code)" v-for="item of items">
				{{item.dept_name}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items'],
		data() {
			return {
				dept: '',
				dept_code: ''
			}
		},
		computed: {
			active() {
				return this.items && this.items.length;
			}
		},
		methods: {
			input() {
				var arr = [];
				for(var key of this.dept_data) {
					if(!!this.dept && new RegExp(this.dept).test(key.dept_name)) {
						arr.push(key);
					}
				}
				this.dept_data_metch = arr;
			},
			show() {

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.list {
		display: flex;
		position: relative;
		.title {
			flex: 1;
			height: 65px;
			line-height: 95px;
		}
		.sel {
			height: 65px;
			line-height: 95px;
			flex: 5;
			text-align: center;
			input {
				text-align: center;
			}
		}
		.bot {
			flex: .5;
			margin-top: 10px;
			line-height: 70px;
			text-align: center;
		}
		.list_container.topi {
			>div {
				position: relative;
				.count_number {
					position: absolute;
					right: 20px;
					top: 10px;
					width: 30px;
					height: 30px;
					border-radius: 50%;
					background: #0000FF;
					text-align: center;
					line-height: 30px;
					color: #fff;
				}
			}
		}
		.list_container {
			box-shadow: 2px 2px 5px 2px #ddd;
			transition: .3s all;
			overflow-y: scroll;
			position: absolute;
			top: 65px;
			z-index: 10;
			height: 0;
			opacity: 0;
			left: -10px;
			right: -5px;
			margin: auto;
			background: #fff;
			border: 1px solid #ddd;
			border-radius: 5px;
			>div {
				padding-left: 20px;
				text-align: left;
				line-height: 50px;
			}
			>div:active {
				background: #2a70d0;
				color: #fff;
				opacity: .3;
			}
		}
		.list_container.active {
			opacity: 1;
			height: 200px;
			width: 100%;
			position: absolute;
		}
		height:65px;
		margin-left:25px;
		font-size:18px;
		border-bottom:1px solid #F5F5F5;
		margin-right:20px;
	}
	
	.btn_1.a {
		margin-top: 50px;
	}
</style>