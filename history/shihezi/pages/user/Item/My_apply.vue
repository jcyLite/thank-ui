<style lang="less" scoped="scoped">
	.container {
		padding-top: 1px;
		.container-box {
			/*overflow: hidden;*/
			>div {
				/*padding-bottom: 10px;*/
			}
			.list {
				position: relative;
				background: #fff;
				margin-bottom: 18px;
				.title {
					width: 100%;
					line-height: 2rem;
					padding: 1rem 1rem;
					text-align: center;
					font-size: 1.1rem;
				}
				.content {
					img {
						width: 100%;
						height: auto;
					}
				}
				.bottom {
					width: 100%;
					color: #979797;
					font-size: 0.9rem;
					line-height: 4rem;
					margin-top: 1rem;
				}
				.toPingjia {
					position: absolute;
					top: 40px;
					right: 20px;
					height: 30px;
					padding: 0px 10px;
					line-height: 30px;
					border: 1px solid #7cc587;
					color: #9BC4A2;
					border-radius: 15px;
				}
			}
		}
	}
</style>
<template>
	<div class="my_apply">
		<Header title="我的申请" />
		<div class="container">
			<div class="container-box">
				<div>
					<Nodata v-if="!d.length" />
					<div class="list" @click="$router.push({path:'/user/Item/my_apply_detail',query:{id:item.row_id}})" v-for="item of d">
						<div class="title">
							{{item.servname}}
						</div>
						<div class="content">
							<img :src='item.casestatus=="3"?images[0]:(item.casestatus=="4")?images[1]:images[2]'>
						</div>
						<div class="bottom">
							<div style="display:inline-block;margin-left:1rem">
								<span>申报时间：</span>
								<span>{{item.casestartdate}}</span>
							</div>
							<div style="display:inline-block;float:right;margin-right:1rem">{{item.deptname}}</div>
						</div>
						<div class="toPingjia" v-if="item.casestatus=='3'" @click="toEvaluate($event,item)">
							去评价
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				d: [],
				images: [
					require("@/resources/images/liucheng2.png"),
					require("@/resources/images/liucheng3.png"),
					require("@/resources/images/liucheng1.png")
				],
				page: 1,
				tipShow: !1
			}
		},
		computed: {
			right_top() {
				var that = this;
				return {
					class: 'glyphicon glyphicon-option-horizontal',
					click() {
						that.tipShow = !0
					}
				}
			}
		},
		created() {
			this.$ajax.myItemList.call(this)
		},
		methods: {
			toEvaluate(e, item) {
				e.stopPropagation();
				this.$router.push({
					'path': '/my_evaluate',
					'query': {
						'applyId': item.row_id,
						'servcode': item.servcode
					}
				})
			}
		},
		mounted() {
			var that = this;
			this.$module.initScroll('.container',{
				"dir": "y", //滚动的方向，x或者y
				pullDownLoading(reset) {
					that.page = 1;
					that.$ajax.myItemList.call(that, reset)
				},
				pullUpLoading(reset) {
					that.page++;
					that.$ajax.myItemList.call(that, reset)
				}
			})
		}
	}
</script>