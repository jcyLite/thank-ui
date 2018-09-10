<template>
	<div>
		<div class="container ">
			<!--vip嘉年华-->
			<div class="vip clearfix">
				<img src="./img/y-vipTopBg.png" alt="">
				<div class="banxin">
					<h1>VIP特权嘉年华</h1>
					<div class="vip-bottom clearfix">
						<div>
							<img src="./img/y-vipTop.png" alt="">
							<p>开通会员</p>
							<p>无限次使用会员服务</p>
							<p>¥999</p>
						</div>
						<div class='vip-right clearfix'>
							<h1>第一志愿VIP</h1>
							<ul style="margin-right: 109px;">
								<li style="color: #fe6a23;font-size: 20px;">功能特权:</li>
								<li><span></span>院校历年专业录取详细数据</li>
								<li><span></span>一键智能填报并生成志愿表</li>
								<li><span></span>独家就业数据智能分析</li>
							</ul>
							<ul>
								<li style="color:#11bdc5;font-size: 20px;">使用说明:</li>
								<li><span></span>适用考生：全日制统招生及特长生</li>
								<li><span></span>适用批次：普通类非提前批</li>
								<li><span></span>会员有效期：<i>1年</i></li>
							</ul>
						</div>
						<div class="vip-last">
							<a href="javascript:void(0)" class="rightNowKT reveal">立即开通</a>
							<a href="javascript:void(0)" style="margin-left:104px;background-color:#11bdc5;" class="rightNowJH reveal" @layclick = rightNowjh>立即激活</a>
						</div>
					</div>
				</div>
			</div>
			<!--五大专属特权-->
			<div class="exclusive">
				<h1>专属五大特权</h1>
				<!--<img src="../img/y-zhuanshu.png" alt="">-->
				<div class="boxs">
					<div class="banxin">
						<div class="reveal skip">
							<router-link :to="{path:'/recommond/test'}">
								<p style="color:#ffba7e">测试录取率</p>
								<img :src="t.photo[0]" alt="" />
								</router-link>
						</div>
						<div style="bottom: 0; left:226px;" class="reveal skip">
							<router-link :to="{path:'/recommond/report'}">
								<p style="color:#7f9ce7">成绩分析报告</p>
								<img :src="t.photo[1]" alt="" />	
							</router-link>
						</div>
						<div style="top: 0; left:452px;" class="skip">
							<router-link :to="{path:'/recommond/chooseSchool'}">
								<p style="color:#49d6dc">看就业选学校</p>
								<img :src="t.photo[2]" alt="" />
							</router-link>
						</div>
						<div style="bottom: 0; left:681px;" class="skip">
							<router-link :to="{path:'/recommond/seemajor'}">
								<p style="color:#ffd57e">看就业选专业</p>
								<img :src="t.photo[3]" alt="" />
							</router-link>
						</div>
						<div style="top: 0; right:0px;" class="skip">
							<router-link :to="{path:'/recommond/seejob'}">
								<p style="color:#ffc6ab">按职业选专业</p>
								<img :src="t.photo[4]" alt="" />	
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<!--直击四大痛点-->
			<div class="pain banxin clearfix">
				<h1>直击4大痛点</h1>
				<div class="four-one" >
					<span>1</span>
					<p>我的分数可以</p>
					<p>上什么学校？</p>
				</div>
				<div class="four-two" >
					<span>2</span>
					<p>我的分数可以</p>
					<p>读哪些专业？</p>
				</div>
				<div class="four-thr" >
					<span>3</span>
					<p>我就读xx大学</p>
					<p>的概率高吗？</p>
				</div>
				<div class="four-fou" >
					<span>4</span>
					<p>我对填报的院校</p>
					<p>和专业一头雾水？</p>
				</div>
			</div>
			<!--全面分析志愿填报需求-->
			<div class="require">
				<h3>全面分析志愿填报需求</h3>
				<div class="reBox">
					<img src="./img/y-bajiao.png" alt="">
					<div class="jiaoL" style="top:-70px; left: 142px;">
						<h1>填报建议</h1>
						<p>给出详细填报建议</p>
					</div>
					<div class="jiaoL" style="top:70px; left: 34px;">
						<h1>填报政策</h1>
						<p>深度解读最新政策</p>
					</div>
					<div class="jiaoL" style="bottom:154px; left: 25px;">
						<h1>成绩分析</h1>
						<p>给出适合分析报告</p>
					</div>
					<div class="jiaoL" style="bottom:3px; left: 142px;">
						<h1>就业专业</h1>
						<p>先看就业再选专业</p>
					</div>

					<div class="jiaoR" style="top:-70px; right: 142px;">
						<h1>毕业薪酬</h1>
						<p>披露毕业薪酬报告</p>
					</div>
					<div class="jiaoR" style="top:70px; right: 34px;">
						<h1>录取预测</h1>
						<p>精准预测录取概率</p>
					</div>
					<div class="jiaoR" style="bottom:154px; right: 25px;">
						<h1>批次线</h1>
						<p>历年文理科批次线</p>
					</div>
					<div class="jiaoR" style="bottom:3px; right: 136px;">
						<h1>兴趣筛选</h1>
						<p>按自己意愿选学校</p>
					</div>
				</div>
			</div>
			<!--第一志愿VIP-->
			<div class="purchase clearfix">
				<img src="./img/y-vipBG.png" alt="">
				<div>
					<h1>第一志愿VIP</h1>
					<h1>¥999</h1>
					<a href="javascript:void(0)" class="rightNowKT reveal">立即开通</a>
				</div>
			</div>
		</div>
		<div class="y-opacity display-none">
			<!--激活VIP-->
			<div class="becomeVIP display-none">
				<div class="clearfix closeA">
					<a href="javascript:void(0)">×</a>
				</div>
				<h3>第一志愿VIP购买</h3>
				<form class="pay">
					<div class="clearfix bosLIS">
						<span>第一志愿VIP：</span>
						<div>专属VIP：¥999</div>
					</div>
					<div class="clearfix bosLIS">
						<span>实付金额：</span>
						<i>￥999</i>
					</div>
					<div class="clearfix bosLIS">
						<span>支付方式：</span>
						<input type="radio">
						<img :src="t.photo[5]" alt="" />
						</div>
					<a href="">立即购买</a>
				</form>
			</div>
			<!--开通VIP-->
			<div class="startVIP display-none">
				<div class="clearfix closeA">
					<a href="javascript:void(0)">×</a>
				</div>
				<h3>第一志愿VIP激活</h3>
				<div class="errorMsg" style="text-align:center">{{error}}</div>
				<form action="">
					<div class="bosLIS clearfix">
						<span>激活码:</span>
						<input type="text" placeholder="请输入激活码" maxlength="12" v-model = "msg" @focus = inputting>
					</div>
					<span @layclick=rightActive >立即激活</span>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	var $ = require('jquery')
	export default{		
		data(){
			return{
				t : {
					photo:[
						require('@/assets/images/azyx.png'),
						require('@/assets/images/cjfx.png'),
						require('@/assets/images/kjyx.png'),
						require('@/assets/images/kjyxzy.png'),
						require('@/assets/images/zhiye.png'),
						require('@/assets/images/zhifubao.png')
					]
				},
				error:'',
				msg:''
				
			}
		},
		methods:{
			rightActive() { //激活vip
				//1.判断登录没
				var islogin;
				if(sessionStorage.infoState && JSON.parse(sessionStorage.infoState).username != ""){  //判断登录才能激活vip
					islogin = JSON.parse(sessionStorage.infoState);
					this.error = "";
					//2.判断有激活码没
					if(this.msg == ""){
						this.error = "请输入激活码";
						return;
					}
					if(!/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{12}/.test(this.msg)){
						this.error = "请输入正确的激活码";
						return;
					}
					this.$http.post('?service=App.User.Activate',{uid:islogin.id,code:this.msg}).then(d=>{  
			        	if(d.code == 0){  //激活成功
			        		//3.激活后关闭遮罩层
			        		$(".y-opacity").addClass("display-none");	
			        	}else{ //激活失败
			        		this.error = d.msg;
			        	}
       				})
				}else{  //未登录提示先登录
					this.error = "请先登录";
				} 	
			},
			rightNowjh(){
				this.error = "";
			},
			inputting(){
				this.error = "";
			}
		
		},
		mounted: function mounted() {
			$(".closeA>a").click(function () {
				document.documentElement.style.overflow='auto';
				$(".y-opacity").addClass("display-none");
			});
			$(".rightNowKT").click(function (e) {
				document.documentElement.style.overflow = 'hidden';
				$(".y-opacity").removeClass("display-none");
				$(".becomeVIP").removeClass("display-none");
				$(".startVIP").addClass("display-none");
			});
			$(".rightNowJH").click(function (e) {
				document.documentElement.style.overflow = 'hidden';
				$(".y-opacity").removeClass("display-none");
				$(".startVIP").removeClass("display-none");
				$(".becomeVIP").addClass("display-none");
			});
			function reveal() {
				$("#tips").show();
				$("body").addClass('fixed');
			}
			
			
			
		}
	};
</script>
<style scoped="scoped">
	@import './become-vip.css';
	.four-one{
		background: url('./img/y-tong1.png') no-repeat;
	}
	.four-two{
		background: url('./img/y-tong2.png') no-repeat;
	}
	.four-thr{
		background: url('./img/y-tong3.png') no-repeat;
	}
	.four-fou{
		background: url('./img/y-tong4.png') no-repeat;
	}
</style>