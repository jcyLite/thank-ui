<template>
	<div class="info-bg">
		<div class="info-schoolbg">
			<div class="info-schoolbg-container">
				<ul>
					<li>
						{{d.common.majorname}}
					</li>
					<li>
						<span>专业代码:{{d.common.code}}</span>
					</li>
				</ul>
				<div class="info-paiming">
					<span>综合排名:</span>
					<span>{{d.common.ranking}}</span>
					<div class="atten">
						<span @layclick.stop=addAttention($event,d.common.id) class="ms-attention"		    				
		    				:class='!parseInt(d.common.status)?"icon-notcollect":"icon-collect"'></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {  baseImg,baseURL } from '@/modules/common.js'
	import {MajorDetail,UserAttentionListActive} from '@/server'
	import Tip from "@/popers/tips"
	export default { //网页中间部分的使用一个大背景图的组件
		//props: ['type'],		
		data() {
			return {
				d: {
					common: {},
					intro: {
						major:[]
					}
				},
				baseURL:baseURL,
				typety:1,
				type:2
			}
		},
		created: function created() {
			MajorDetail.call(this)					
		},
		methods: {
//			attention: function attention(e) {
//				if(this.type == 'school') {
//					attentionAjax.call(this, init.vm.d.base_data, id);
//				} else {
//					attentionAjax.call(this, init.vm.d, id);
//				}
//			},
			addAttention(e,id){
				if(this.$store.state.userInfo.logined){
					var status=!parseInt(this.d.common.status)?"1":"0";	
					var obj = {
						type:2,
						id:id,
						status:parseInt(status)
					}			
					this.$http.post('?service=App.User.Attention',obj).then(d=>{
						Tip(d.msg);
						MajorDetail.call(this)
					})
				}else{
					Tip('该操作需要登录')
				}
				
			}
		},
		watch: {
         	$route(n,o){  
         		MajorDetail.call(this)
			}
        }
	};
</script>
<style lang="less" scoped="scoped">
	.info-bg-topnav {
		margin: 0 auto;
		width: 1200px;
	}
	.atten{
		width: 100%;
	    height: 60px;
	    text-align: center;
	    font-size: 26px;	   
	    margin-top: 13px;
	}
	.icon-collect {	   
	    color: red;	   
	}
</style>
