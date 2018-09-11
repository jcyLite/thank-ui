<style lang="less" scoped="scoped">
	.wrapper{
		top:50px;
		bottom:0;
		left:0;
		right:0;
		img{
			width:100%;
			margin:auto;
			top:50%;
			bottom:50%;
			position:absolute;
			display: none;
		}
	}
</style>
<template>
	<div class="Avatar">
		<Header :right_top=right_top title="头像裁剪"/>
		<div class="wrapper">
			<img id="avatar" :src="$store.state.cache.base_avatar" alt="" />
		</div>
	</div>
</template>

<script>
	var Cropper=require('%/modules/Cropper');
	import {uploadPhoto} from '@/server/ajax.js';
	import {setMyLocalAvatar} from '@/module/local.js'
	export default {
		data(){
			return {
				cropper:null
			}
		},
		computed:{
			right_top(){
				var that=this;
				return {
					name:'裁剪',
					click(){
						var o=that.cropper.getImageData();
						var a=that.cropper.getCroppedCanvas({
							width:100,
							height:100
						})
						var b=a.toDataURL('image/jpeg')
						uploadPhoto.call(that,b,function(d){
							that.$store.state.cache.mine.avatar=d.data.src;
							that.$router.push('/more');
//							setMyLocalAvatar(d.data.src)
						})
					}
				}
			}
		},
		mounted(){
			var that=this;
			var image=document.getElementById('avatar');
			var height=window.innerHeight-50;
			this.cropper = new Cropper(image, {
				strict:true,
		        aspectRatio: 1,
		        autoCropArea:1,
		        minContainerHeight:height,
		        minCanvasWidth:50,
		        minCanvasHeight:50,
		        resizable:false,
		        movable:false,
		        cropBoxResizable:false,
		        viewMode:1,
		        crop: function (e) {
		        }
		   });
		}
	}
</script>
