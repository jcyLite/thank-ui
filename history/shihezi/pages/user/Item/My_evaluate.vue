<template>
	<div class="my_evaluate">
		<Header title='对该服务进行评价'/>
		<div class="container">
			<textarea v-model="evaluateContent" placeholder="请输入您的评价" name="" rows="" cols=""></textarea>
			<div class="star">
				<div @click="evaluateStar=item" v-for="item of [1,2,3,4,5]" :class="{active:evaluateStar>=item}" class="glyphicon glyphicon-star"></div>
				<div class="msg">
					{{evaluateMessage}}
				</div>
			</div>
			<div @click="submit" :disabled="disabled" class="btn_1">
				提交
			</div>
		</div>
	</div>
</template>

<script>
	function saveEvaluate(){
		this.$http.post('saveEvaluate.action',{
			applyId:this.$route.query.applyId,
			servcode:this.$route.query.servcode,
			evaluateMessage:this.evaluateMessage,
			evaluateStar:this.evaluateStar,
			evaluateContent:this.evaluateContent
		}).then(d=>{
			console.log(d);
		})
	}
	export default {
		data(){
			return {
				evaluateStar:4,
				evaluateContent:''
			}
		},
		computed:{
			evaluateMessage(){
				var message=['很不满意','不满意','一般','满意','很满意'];
				return message[this.evaluateStar-1]
			},
			disabled(){
				return !this.evaluateContent
			}
		},
		methods:{
			submit(){
				saveEvaluate.call(this)
			}
		},
		mounted(){
			
		}
	}
</script>

<style scoped="scoped" lang="less">
	.my_evaluate{
		.container{
			textarea{
				width:100%;
				height:200px;
				margin-top:10px;
				padding:10px;
			}
			.star{
				padding-left:20px;
				padding-top:10px;
				position:relative;
				width:100%;
				div{
					margin-left:5px;
					color:#ddd;
					font-size:25px;
					float:left;
				}
				div.active{
					color:orange; 
				}
				.msg{
					position:absolute;
					right:40px;
					color:#333;
					height:20px;
					line-height: 20px;
					margin-left:120px;
				}
			}
			.btn_1{
				margin-top:100px;
			}
		}
	}
</style>