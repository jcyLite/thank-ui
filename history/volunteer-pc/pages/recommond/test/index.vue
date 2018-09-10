<!--录取率测试组件-->
<template>
	<div id="enroll" class="enroll">
		<div class="select" id="select">
			<h1 class="test-enroll">测院校录取概率</h1>
			<div class="tip">分析了过去5年的考生录取情况后，根据科学的位次分析法得到，保证预测结果更加可靠。</div>
			<div class="info">
				<span class="user-info">考生信息</span>
				<span class="user-area"><span>生源地：</span><span>{{mybase.area}}</span></span>
				<span class="user-subject"><span>科类：</span><span>{{mybase.picked == 1 ? '理科' : '文科'}}</span></span>
				<span class="user-score"><span>分数：</span><span>{{mybase.grade}}</span></span>
				<span @layclick="toIndex" class="revise">修改</span>
			</div>
			<div class="info item-school">
				<span class="user-info">目标院校</span>
				<input @input="inputChange" ref="schoolName" type="text" placeholder="在此输入目标大学" >
				<span @layclick="startSearch" class="revise search-school">开始查询</span>
			</div>
		</div>
		<div class="search-info" style="display: none;">
			<h2>预测概率结果</h2>
			<div class="result">
				<div class="circle">
					<canvas id="result" width="246" height="246"></canvas>
				</div>
				<div class="square">
					<div><span><span>{{enroll.grade}}</span>分</span><br><span>你的分数</span></div><br><br><br><br>
					<div><span><span>{{enroll.lowest.lowest == null ? '暂无' : enroll.lowest.lowest}}</span>分</span><br><span>2016年一本录取最低分</span></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	'use strict';
var $ = require('jquery')
import Tip from "@/popers/tips"
//import {baseApi} from '@/modules/common.js'
import {scoreCanvas} from'../modules/canvas.js'

var cache = {};
//提取session
function getSession(key) {
	if (sessionStorage.getItem(key)) {
		return JSON.parse(sessionStorage.getItem(key));
	}
}
function searchSchoolAjax(el, fn) {
	var name = el.value;
	if (name == '') {
		return removeList('.info-major-list', 0.1);
	};
	this.$http.post('?service=App.School.Lists',{
		sname: name
	}).then(d => {		
		fn(d.data.items);
	})
}
//搜索列表
function searchSchoolList(d) {	
	var tpl = '';
	for (var key in d) {
		tpl += '<div @layclick="forList" school-id="' + d[key].id + '">' + d[key].sname + '</div>';
	}
	$('.info-major-list').remove();		
	$('#select').append('<div style="cursor:pointer;" class="info-major-list">' + tpl + '</div>');	
	addEventList();
	removeList('.info-major-list', 10000);
}
function removeList(el, time) {
	setTimeout(function () {
		$(el).remove();
	}, time);
}
//给list添加时间
function addEventList() {
	$(function () {
		$('body').off('click').on('click', '.info-major-list div', function () {
			var a = $(this).attr('school-id');
			cache.input1 = $(this).html();
			$('.info.item-school').find('input').val($(this).html());
			$('.info.item-school').find('input').attr('school-id', a);
			removeList('.info-major-list', 1);
		});
	});
}

export default{
	//props: ['search_school'],
	data: function data() {
		return {
			mybase: {
					area : '考区',
					picked : 1,
					grade : '分数',
					lower : 350
			},
			schoolName : '',
			enroll : {
				enroll : '',
				grade : '',
				lowest:{
					lowest :''
				}
			}
		};
	},	
	methods: {
		inputChange: function inputChange(e) {
			$('.search-info').hide();
			searchSchoolAjax.call(this,e.target,searchSchoolList);
		},
		startSearch: function startSearch(e) {
			this.schoolName = this.$refs.schoolName.value			
			if(this.$store.state.userInfo.logined && this.$store.state.userInfo.recommondData) {
				this.$http.post('?service=App.User.SchoolEnroll',{name : this.schoolName}).then(d=>{					
					$('.search-info').show();
					scoreCanvas('result', d.data.enroll);
					this.enroll = d.data					
				})
			}else{
				Tip('该操作需要录入成绩信息')
			}
		},
		toIndex: function toIndex() {
			location.href = "../index.html";
		}
	},
	mounted: function mounted() {
		scoreCanvas('result', 20);
	},
	created(){
		$('.search-info').hide();
		this.$store.commit('recommond')
		if(this.$store.state.userInfo.recommondData){
			this.mybase = this.$store.state.userInfo.recommondData
			
		}else{
			Tip('该操作需要录入成绩信息')
		}
		
	}
};
</script>
