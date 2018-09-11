<template>
	<div data-role="page" id="myReservationPage">
		<Header title="我的预约" />
		<div class="page_content">
			<div id="myReservationWrapper" class="jszx-wrapper">
				<div class="jszx-scroller" id="myReservationScroller">
					<div id="myReservationList" class="page_content_in">
						<Nodata v-if="!d.length"/>
						<div v-for="item of d" class="reservation_cell">
							<div class="jui_cell_title"></div>
							<div class="cell_top">
								<div style="text-indent: 5px;float: left;font-size: 1.3rem;color: #000000;margin-top: 10px">{{item.appointmenttime}}</div>
								<button @click="cancel(item.itemid)" id="quxiaoyuyue" style="width: 80px;height: 28px;border:1px lightgray solid;border-radius: 20px;float: right;color: lightgray;background: white;margin-top: 10px">
									取消预约
								</button>
								<div style="position: absolute;float: left;bottom: 10px;text-indent: 5px;font-size: 1.2rem;color: #333333;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.ql_name}}</div>
							</div>
							<div class="cell_foot">
								<div class="cell_foot_div" style="height: 30px;line-height: 40px;text-indent: 5px;color: #979797;font-size: 1.2rem">{{item.qldep}}</div>
								<div class="cell_foot_div" style="text-indent: 5px;color: lightgray;font-size: 1rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;padding-bottom:.5rem">{{item.acceptaddressinfo}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function ajax(reset) {
		this.$http.post('appointmentList.action', {
			itemName: '',
			cpage: this.page,
			len: 10
		}).then(d => {
			if(this.page == 1) {
				this.d = d.data;
			} else if(d.data.length == 0) {
				reset && reset(true);
				this.page--;
			} else {
				this.d = this.d.concat(d.data)
			}
			reset && reset(true);
		})
	}
	export default {
		data() {
			return {
				d: [],
				page: 1
			}
		},
		created() {
			ajax.call(this)
		},
		methods:{
			cancel(itemId){
				var that=this;
				this.$poper.confirm({
					title:'提示！',
					content:'您确定取消吗？',
					confirm(){
						that.$http.post('disreservate.action',{itemId}).then(d=>{
							if(d.code==0){
								that.$poper.tips('取消预约成功')
								ajax.call(that)
							}
						})
					}
				})
			}
		},
		mounted() {
			var that = this;
			this.$module.initScroll('#myReservationWrapper',{
				"dir": "y", //滚动的方向，x或者y
				"bounce": false,
				"scrollBar": false,
				pullDownLoading(reset) {
					that.page = 1;
					ajax.call(that, reset)
				},
				pullUpLoading(reset) {
					that.page++;
					ajax.call(that, reset);
				}
			})
		}
	}
</script>

<style scoped="scoped">
	
	.reservation_cell {
		background: white;
	}
	
	.cell_top {
		width: 90%;
		height: 105px;
		margin-left: 5%;
		border-bottom: 1px lightgray solid;
	}
	
	.cell_foot {
		width: 90%;
		height: auto;
		margin-left: 5%;
	}
</style>