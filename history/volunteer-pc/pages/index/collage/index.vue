<template>
	<div class="college" v-cloak>
		<h3 class="title">大学排名</h3>
		<div class="banxin college-box clearfix  ">
			<div v-for="(item,ind) of college">
				<h3 class="com-top">{{item.title}}</h3>
				<ul class="pai-list">
					<li>
						<span v-for="item in todos">{{item.text}}</span>
					</li>
					<li v-for="(i,index) in item.content">
						<span>{{ index+1 }}</span>
						<span>{{ i.sname }}</span>
						<span>{{ i.city }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	data: function data() {
		var that = this;
		return {
			college: [{
				title: '大学综合排名',
				content: []
			}, {
				title: '大学女生排名',
				content: []
			}, {
				title: '毕业薪酬排名',
				content: []
			}],
			todos: [
	      		{ text: '排名' },
	      		{ text: '大学' },
	      		{ text: '地区' }
    		]
		}; 
		
	},
	created: function created() {		
		// 大学排名
		this.$http.post('?service=App.School.Lists', { type: "", page: 1 ,order : 0}).then(d=>{				
			this.college[0].content = d.data.items.slice(0, 4);			
		});
		this.$http.post('?service=App.School.Lists', { type: "salary", page: 1 ,order : 2}).then(d=>{			
			this.college[1].content = d.data.items.slice(0, 4);	
		});
		this.$http.post('?service=App.School.Lists', { type: "salary", page: 1 ,order : 1}).then(d=>{	
			this.college[2].content = d.data.items.slice(0, 4);	
		});
	}
	
};
</script>
<style lang="less">
	@import './index.less';
</style>