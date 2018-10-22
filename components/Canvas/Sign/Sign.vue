<style lang="less">
	.tk-sign{
		.container{
			width:100%;
			height:400px;
			.colpick.colpick_hex{
				display: none;
			}
			.-canvas-wrapper{
				height:400px;
			}
		}
		.button{
			width:100%;
			height:50px;
			background:#007AFF;
			color:#fff;
			line-height:50px;
			text-align: center;
		}
	}
</style>
<template>
	<div class="tk-sign">
		<div class="container"></div>
		<div @click="submit" class="button">提交</div>
	</div>
</template>

<script>
	import Tablet from './tablet.js';
	export default {
		data(){
			return {
				tablet:null
			}
		},
		methods:{
			submit(){
				console.log(this.tablet.getBase64())
			}
		},
		mounted(){
			this.tablet=new Tablet(".tk-sign>.container",{
                defaultColor: "#000",
                onInit: function (){
                    var that = this,
                        container = this.container;
//                  container.find("select").eq(0).on("change", function (){
//                      that.setLineWidth($(this).val());
//                  });
//                  container.find("select").eq(1).on("change", function (){
//                      that.rotate($(this).val());
//                  });
//                  container.find(".save-canvas-to-img").on("click", function (){
//                      console.log(that.getBase64());
//                      if(!that.isMobile){
//                          alert("请按f12打开控制台查看base64图片数据！");
//                      }
//                  });
//                  container.find(".get_blob").on("click", function (){
//                      that.getBlob();
//                  });
                    /*container.find(".download").on("click", function (){
                        document.getElementById("preview_img").src = that.getBase64();
                    });*/
                }
            });	
		}
	}
</script>
