<template>
	<div>
		<div class="container">
		<div class="top">
			<div class="banxin">
				<div class="topleft clearfix">
					<h3>志愿填报神器</h3>
					<h3>百万高考生的选择</h3>
					<span><svg aria-labelledby="simpleicons-apple-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-apple-icon">Apple icon</title><path d="M7.078 23.55c-.473-.316-.893-.703-1.244-1.15-.383-.463-.738-.95-1.064-1.454-.766-1.12-1.365-2.345-1.78-3.636-.5-1.502-.743-2.94-.743-4.347 0-1.57.34-2.94 1.002-4.09.49-.9 1.22-1.653 2.1-2.182.85-.53 1.84-.82 2.84-.84.35 0 .73.05 1.13.15.29.08.64.21 1.07.37.55.21.85.34.95.37.32.12.59.17.8.17.16 0 .39-.05.645-.13.145-.05.42-.14.81-.31.386-.14.692-.26.935-.35.37-.11.728-.21 1.05-.26.39-.06.777-.08 1.148-.05.71.05 1.36.2 1.94.42 1.02.41 1.843 1.05 2.457 1.96-.26.16-.5.346-.725.55-.487.43-.9.94-1.23 1.505-.43.77-.65 1.64-.644 2.52.015 1.083.29 2.035.84 2.86.387.6.904 1.114 1.534 1.536.31.21.582.355.84.45-.12.375-.252.74-.405 1.1-.347.807-.76 1.58-1.25 2.31-.432.63-.772 1.1-1.03 1.41-.402.48-.79.84-1.18 1.097-.43.285-.935.436-1.452.436-.35.015-.7-.03-1.034-.127-.29-.095-.576-.202-.856-.323-.293-.134-.596-.248-.905-.34-.38-.1-.77-.148-1.164-.147-.4 0-.79.05-1.16.145-.31.088-.61.196-.907.325-.42.175-.695.29-.855.34-.324.096-.656.154-.99.175-.52 0-1.004-.15-1.486-.45zm6.854-18.46c-.68.34-1.326.484-1.973.436-.1-.646 0-1.31.27-2.037.24-.62.56-1.18 1-1.68.46-.52 1.01-.95 1.63-1.26.66-.34 1.29-.52 1.89-.55.08.68 0 1.35-.25 2.07-.228.64-.568 1.23-1 1.76-.435.52-.975.95-1.586 1.26z"/></svg>Iphone下载</span>
					<span><svg aria-labelledby="simpleicons-android-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-android-icon">Android icon</title><path d="M22.146 9.227c0-.815-.658-1.478-1.476-1.478s-1.48.66-1.48 1.48v6.19c0 .81.663 1.48 1.483 1.48.814 0 1.476-.67 1.476-1.48v-6.2h-.01zM5.393 8.032l.004 9.6c0 .885.704 1.59 1.573 1.59h1.063v3.28c0 .82.66 1.482 1.47 1.482s1.467-.66 1.48-1.468v-3.28h1.993v3.28c0 .823.66 1.483 1.47 1.483.823 0 1.482-.66 1.482-1.49v-3.28h1.078c.87 0 1.573-.71 1.573-1.578v-9.63L5.35 8.03l.04.002zm9.648-2.93c-.31 0-.56-.25-.56-.56 0-.305.25-.558.56-.56.31 0 .56.255.56.56 0 .31-.25.56-.56.56m-6.06 0c-.31 0-.56-.25-.56-.56 0-.307.25-.558.56-.558.31 0 .56.255.56.57s-.252.567-.57.567m6.29-2.9L16.29.33c.06-.105.014-.226-.076-.285C16.11 0 15.99.03 15.93.135l-1.05 1.9c-.868-.405-1.856-.63-2.89-.63s-2.018.215-2.892.603L8.064.105c-.053-.098-.18-.135-.278-.08-.1.045-.136.18-.08.27l1.03 1.875c-2.03 1.047-3.4 3.04-3.4 5.33h13.328c0-2.29-1.368-4.283-3.396-5.33M3.33 7.742c-.817 0-1.48.665-1.48 1.483v6.192c0 .82.664 1.48 1.484 1.48.814 0 1.477-.66 1.477-1.48v-6.19c0-.815-.66-1.478-1.47-1.478"/></svg>Android下载</span>
					<div class="fll" v-for='item of [0,1]'><img :src="t.photo[0]" alt=""></div>
				</div>
			</div>
		</div>
		<div class="threeDiv banxin">
			<div class="reTop">
				<div class="clearfix">
					<a>
						<div>
							<img :src="t.photo[1]" alt="" />
						</div>
						<p>模拟填志愿</p>
					</a>
					<a>
						<div>
							<img :src="t.photo[2]" alt="" />
						</div>
						<p>批次线</p>
					</a>
					<a>
						<div>
							<img :src="t.photo[3]" alt="" />
						</div>
						<p>填报政策解读</p>
					</a>
				</div>

			</div>
			<div class="reBottom">
				在“第一志愿”的高考志愿大数据辅助系统里，输入自己的成绩分数或预估分数、所在地区、文理科类别，点击“确定”，1秒钟后，系统便会自动匹配，将符合该分数水平的候选学校全部筛选出来，并根据“录取平均分”、“薪酬高低”、“知名度”、“男女比例”、“学校规模”等几个类别对候选学校进行排名展示，可以更直观的选择。
			</div>
		</div>
		<div class="allSchool">
			<h1>超全院校信息</h1>
			<p>全国近两千多所学校，新体验，信息早知道</p>
		</div>
		<div class="phones banxin">
			<img src="./img/bgphone.png" alt="">
		</div>
		<div class="recommend">
			<h1>最精准的推荐</h1>
			<p>根据考生真实数据，个性化推荐最合适的报考志愿</p>
			<div class="banxin">
				<img src="./img/wdzy.png" alt="">
				<img src="./img/zntzy.png" alt="">
				<img src="./img/zyxz.png" alt="">
			</div>
		</div>
		<div class="baok">
			<h1>最懂你的报考指南</h1>
			<div>
				<img src="./img/vips.png" alt="">
			</div>
			<p><span>智能分析：</span>输入分数可免费获得一份完整成绩分析报告</p>
			<p><span>与院校零距离：</span>查看就业、学校概况、分数线、专业设置等</p>
			<p><span>条件筛选：</span>根据考生真实数据筛选出合适的院校和专业</p>
			<p><span>个人喜好：</span>对于感兴趣的院校或专业进行收藏</p>
		</div>
		</div>
	</div>
</template>
<script>
	export default{	
		data(){
			return{
				t :{
					photo:[
						require('@/assets/images/qr.png'),
						require('@/assets/images/mnzy.png'),
						require('@/assets/images/pcx.png'),
						require('@/assets/images/tbzcjd.png'),						
					]
				}
			}
		},
		created:function(){}
	}
</script>
<style scoped="scoped">
@import './special.css';
.top {
	width: 100%;
	height: 909px;
	background: url(./img/bg.png) no-repeat center;
	-webkit-background-size: cover;
	background-size:cover ;
	min-width: 1200px
}

.top>.banxin {
	height: 100%;
	padding-top: 45px
}

.top>.banxin>a {
	display: block;
	width: 105px;
	height: 43px;
	border: 1px solid #11bcc3;
	color: #11bcc3;
	font: 400 18px "黑体";
	text-align: center;
	line-height: 43px;
	border-radius: 5px
}

.topleft {
	float: right;
	padding-top: 140px;
	width: 500px
}

.topleft>h3 {
	font: 400 45px "黑体";
	color: #fff;
	margin-bottom: 40px
}

.topleft>span {
	display: inline-block;
	width: 185px;
	height: 45px;
	border: 1px solid #fff;
	color: #fff;
	font: 400 20px/45px "黑体";
	text-align: center;
	border-radius: 10px;
	margin-right: 60px;
	margin-bottom: 57px;
	
}
.topleft>span>svg{
	width: 25px;
	height:25px;
	fill:#fff;
	vertical-align: middle;
	margin-top: -3px;
}
.topleft>span:hover{
	color:#000;
	cursor:pointer;
	transition:.3s all;
	border:1px solid #000;
}
.topleft>span:hover>svg{
	fill:#000;
	transition:.3s all;
}
.topleft>span>img {
	margin-right: 10px;
	vertical-align: middle;
	margin-bottom: 5px
}

.topleft>div {
	margin-right: 60px
}

.topleft>div>img {
	width: 189px;
	height: 189px
}
</style>