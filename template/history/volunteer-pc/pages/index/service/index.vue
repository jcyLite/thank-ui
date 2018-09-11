<template>
	<div class="service">
		<div class="ser-box banxin ">
			<h3 class="title">精品服务</h3>
			<div class="four-box">
				<div class="fourb active">
					<div class="active onediv">
						<img :src="t.celuqu[0]" alt=""  class="display-none onePic">
						<img :src="t.celuqu[1]" alt="" class="twoPic">
						<h3 class="active">测大学录取概率</h3>
						<p class="active">精准预测院校投档分和录取最低分</p>
					</div>
					<div>
						<div>
							<p>预测目标院校录取概率</p>
						</div>
						<a @layclick="toTy(0)">立即体验</a>
					</div>
				</div> 
				<div class="fourb">
					<div class="onediv">
						<img  :src="t.celuqu[2]" alt="" class="onePic">
						<img  :src="t.celuqu[3]" alt="" class="display-none twoPic">
						<h3>成绩分析报告</h3>
						<p>扫描以往录取成绩，精准分析</p>
						<p>成绩录取方向</p>
					</div>
					<div>
						<div>
							<p>量身定制成绩分析报告</p>
						</div>
						<a @layclick="toTy(1)">立即体验</a>
					</div>
				</div>
				<div class="fourb">
					<div class="onediv">
						<img  :src="t.celuqu[4]" alt="" class="onePic">
						<img  :src="t.celuqu[5]" alt="" class="display-none twoPic">
						<h3>模拟填志愿</h3>
						<p>实战模拟高考志愿填报</p>
						<p>精准定位目标大学</p>
					</div>
					<div>
						<div>
							<p>智能填报志愿不落榜</p>
							<p>提前熟悉填报流程</p>
						</div>
						<a @layclick="toTy(2)">立即体验</a>
					</div>
				</div>
				<div class="fourb">
					<div class="onediv">
						<img  :src="t.celuqu[6]" alt="" class="onePic">
						<img  :src="t.celuqu[7]" alt="" class="display-none twoPic">
						<h3>智能填志愿</h3>
						<p>大数据和云计算设计精准推荐</p>
					</div>
					<div>
						<div>
							<p>高考成绩出来</p>
							<p>智能填报志愿不落榜</p>
						</div>
						<a @layclick="toTy(3)">立即体验</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
var $ = require('jquery')
export default {
	data(){
		return {
			t:{
				celuqu:[
					require('@/assets/images/celuqu1.png'),
					require('@/assets/images/celuqu2.png'),
					require('@/assets/images/cjfx1.png'),
					require('@/assets/images/cjfx2.png'),
					require('@/assets/images/mnzy1.png'),
					require('@/assets/images/mnzy2.png'),
					require('@/assets/images/zhineng1.png'),
					require('@/assets/images/zhineng2.png'),
				]
			}
		}
	},
	mounted() {
		$(".fourb").mouseover(function () {
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
		});
	},
	methods:{
		toTy:function(){
			var arr=[{
				path:'/recommond',
				query:{
					id:3
				}
			},{
				path:'/recommond',
				query:{
					id:4
				}
			},{
				path:'/recommond',
				query:{
					id:2
				}
			},{
				path:'/recommond',
				query:{
					id:1
				}
			}]
			return function(index){
				this.$router.push(arr[index]);
			}
		}()
	}
};
</script>
<style lang="less">
	@import url("./index.less");
</style>