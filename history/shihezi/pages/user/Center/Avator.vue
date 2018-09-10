<style lang="less" scoped="scoped">
	.avator-container{
		width:100%;
		padding-top:20px;
		img{
			width:100%;
			height:auto;
		}
	}
</style>
<template>
	<div class="avator">
		<Header title="修改头像" :right_top='right_top'/>
		<div class="avator-container">
			<img :style="imgStyle" :src="avator" alt="头像加载失败" />
		</div>
	</div>
</template>

<script>
	
	function uploadPhoto(imageData){
		this.$http.post('uploadPhoto.action',{
			userId:this.$store.state.userInfo.userId,
			headPortal:imageData
		}).then(d=>{
			this.$poper.tips(d.message);
			this.$store.state.userInfo.headPortal=d.headPortal;
		})
	}
	
	function mycamera(){
		var that=this;
		function successCallback(imageData){
			uploadPhoto.call(that,imageData);
		}
		function errorCallback(message){
			that.$poper.tips(message)
		}
		navigator.camera.getPicture(successCallback,errorCallback,{
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL
		});
	}
	export default {
		data(){
			return {
				base64:''
			}
		},
		computed:{
			avator(){
				return this.picURL+this.$store.state.userInfo.headPortal
			},
			imgStyle(){
				return {
					height:window.innerWidth+'px',
					width:window.innerWidth+'px'
				}
			},
			right_top(){
				var that=this;
				return {
					click(){
						that.$poper.bottom({
							btn: ['拍照', '从手机相册选择'],
							confirm(i) {
								switch(i) {
									case "0":
										mycamera.call(that);
										break;
									case "1":
										alert(1);
										break;
								}
							}
						})
					},
					class:'glyphicon glyphicon-option-horizontal'
				}
			}
		}
	}
</script>
