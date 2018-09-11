<template>
	<div class="scroll clearfix">
		<a href="javascript:;" class="leftone">
			<s></s>
		</a>
		<a href="javascript:;" class="rightone">
			<s></s>
		</a>
		<div class="scroll-in clearfix">
			<ul id='scrollBox' class="clearfix">
				<li style="height:100%;" :class="{active:tips==item.id}" class="banners" v-for="(item,index) in autoPlay">
					<a href="#"><img :src="item.img" alt="" /></a>
				</li>
			</ul>
			<ol class="olList">
				<li @mouseover="showCurrent(i)" @mouseout="timeStart(i)" v-for="i of [0,1,2]" :class="{current:tips==i}"></li>
			</ol>
			<span @layclick="currentClick(1)" class="carousel-left"> <img src="./img/left.svg"/> </span>
			<span @layclick="currentClick(0)" class="carousel-right"> <img src="./img/right.svg"/> </span>
		</div>
		<div class="form banxin index-box">
			<div class="flr">
				<h3>第一志愿推荐系统</h3>
				<div class="checkbox">
					<select v-model="selected">
						<option value="" disabled="disabled">考区：</option>
						<option :value="item" :label="item.dataname" v-for="item of getLevelData">{{item.dataname}}</option>
					</select>
					<input type="radio" value="2" @change="radioChange" v-model="picked" name="xueke">文科
					<input type="radio" value="1" @change="radioChange" v-model="picked" name="xueke">理科
				</div>
				<div class="com-fen clearfix">
					<span class="fll">分数</span>
					<input type="text" class="fll" v-model="grade" placeholder="请输入高考预估分">
					<i>分</i>
				</div>
				<div class="com-fen clearfix">
					<span class="fll">院校批次</span>
					<select name="" v-model="education">
						<option>全部</option>
						<option value="1">本科</option>
						<option value="2">专科</option>
					</select>
				</div>
				<div class=clearfix>
					<div class="com-fen fll clearfix com">
						<select class="fll selects" v-model="course1">
							<option value="1">物理</option>
							<option value="6">历史</option>
						</select>
						<select v-model="course1_score">
							<option value="">全部</option>
							<option :value="item.value" v-for="item in materialization">{{item.name}}</option>							
						</select>
					</div>
					<div class="com-fen fll clearfix com">
						<select class="fll selects" v-model="course2">							
							<option :value="item.value" v-for="item in OtherClass">{{item.name}}</option>						
						</select>
						<select v-model="course2_score">							
							<option value="">全部</option>
							<option :value="item.value" v-for="item in materialization">{{item.name}}</option>							
						</select>
					</div>
				</div>
				<a href="javascript:void(0)" @layclick="showTips">开始推荐学校</a>
			</div>
		</div>
	</div>
</template>
<script>
	var $ = require('jquery')
	import {session,local} from "@/modules/setAndGet"
	
	import Tip from "@/popers/tips"	
	function setSession(key, obj) {
		sessionStorage.setItem(key, JSON.stringify(obj));
	}

	function setTime(that, i) {
		setTime.time = setTimeout(function() {
			if(that.tips == 2) {
				that.tips = 0
			} else {
				that.tips++;
			}
			setTime(that)
		}, 3000)
	}
	export default {
		props: ['d'],
		data: function data() {
			return {
				selected: '', //地区
				tips: 0,
				getLevelData: [], //地区接口			
				picked: '2', //文科理科
				education: '1', //本科专科
				course1: '6', //历史 物理
				course1_score: '', //等级
				course2: '2', //化学生物地理政治
				course2_score: '', //等级
				qxs: '',
				science_id: '',
				grade: '', //成绩
				autoPlay: [{
						id: 0,
						img: require('./img/banner.png')
					},
					{
						id: 1,
						img: require('./img/banner2.png')
					},
					{
						id: 2,
						img: require('./img/banner3.png')
					}
				],
				dataname: '',
				materialization : [
					{value:"1",name:"A+"},
					{value:"2",name:"A"},
					{value:"3",name:"B+"},
					{value:"4",name:"B"},
					{value:"5",name:"C"},
					{value:"6",name:"D"}
					],
				OtherClass : [					
					{value:"2",name:"化学"},
					{value:"3",name:"生物"},
					{value:"4",name:"地理"},
					{value:"5",name:"政治"},					
					]				
			};
		},
		created: function created() {
			this.$http.get('?service=App.School.Area').then(d=>{
				this.getLevelData = d.data;
			})
			this.obj = this.selected.datavalue
			
		},
		methods: {
			radioChange(){
				//console.log(typeof this.picked)
				this.picked == '1'? this.course1 = '1' : this.course1 = '6'
				/*var obj={
					'1':function(){
						this.course1 = '1'
					},
					'2':function(){
						this.course1 = '6'
					}
				}
				obj[this.picked]()*/
				//console.log(this.course1)
			},
			showTips: function showTips() {											
				//发送成绩信息请求
				if(!this.$store.state.userInfo.logined) {
					Tip('请先登录！')
					return
				} else if(!this.selected.datavalue) {
					Tip('请选择考区！')
					return
				} else if(!this.grade) {
					Tip('请输入成绩！')
					return
				}else if(this.course1_score == '' && this.course2_score != '') {
					Tip('请选择副级科目~')
					return
				}else if(this.course1_score != '' && this.course2_score == ''){
					Tip('请选择副级科目！')
					return
				}else {
					var obj = {
					area: this.selected.dataname,
					area_id: this.selected.datavalue,
					science_id: this.picked,
					picked:this.picked,
					grade: this.grade,
					education: this.education,
					course1: this.course1,
					course1_score: this.course1_score,
					course2: this.course2,
					course2_score: this.course2_score,	
				}
					this.$http.post('?service=App.User.SetGrade', 
						obj
					).then(d=>{
						if(d.code != 0) {
							Tip(d.msg)
						}					
						session.setItem('recommond',obj);
						//this.$store.commit('recommond')
//						this.$store.commit('recommond', {
//							obj							
//						})
						Tip(d.msg)						
						this.$router.push({ path: '/recommond' })
					})
				}

				//document.querySelector('#tips').style.display = 'block';
			},
			showCurrent: function(index) {				
				this.tips = index;
				clearTimeout(setTime.time);
			},
			timeStart: function(index) {				
				setTime(this, index)
			},
			currentClick(i){					
				if(i === 1){				
					this.tips > 0 ? --this.tips : this.tips	= 2
				}else{
					this.tips < 2 ? ++this.tips : this.tips = 0
				}							   
			}
		},
		mounted: function mounted() {
			setTime(this)
		}
	};
</script>
<style lang="less">
	@import './index.less';
	
</style>