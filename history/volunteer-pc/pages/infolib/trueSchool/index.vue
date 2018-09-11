<template>
	<div class="true-false-academy">
		<div class="tfa-top">
			检测真假院校
			<div class="tfa-search">
				<span>院校名称</span>
				<input type="text" ref="searchSname" placeholder="在此输入完整的院校名称" class="tfa-input" @keyup.enter=inquiry($event) />
				<span style="cursor: pointer;" class="tfa-button" @layclick=inquiry($event)>开始查询</span>
			</div>
			<div class="tfa-img">
				<img :src='realSchool' v-show=back&&exist />
				<img :src='lieSchool' v-show=back&&!exist />
			</div>
			<div class="tfa-fruit">
				<span v-show=back&&exist>您查询的学校比9999黄金还真哦~</span>
				<span v-show=back&&!exist>您查询的学校不在院校库内哦~</span>
			</div>
		</div>
	</div>
</template>

<script>
	//import {baseApi} from '@/modules/common.js'
	
	import trueSchool from '@/assets/images/school-true.png'
	import falseSchool from '@/assets/images/school-false.png'
	export default {
		data : function(){
			return {
				realSchool : trueSchool,
				lieSchool : falseSchool,
				back : !1,
				exist : !1
			}
		},
		created : function(){
			
		},
		methods : {
			inquiry : function(e){
				let name  = this.$refs.searchSname.value
				this.$http.post('?service=App.School.GetSchoolId',{
					name : name 
				}).then(d=>{						
					if(d.data != 0){
						this.back = 1;
						this.exist = 1
					}else{
						this.back = 1
						this.exist = !1
					}
				})
			}
		}
	}
</script>

<style>
</style>