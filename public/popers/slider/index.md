###Welcome to use MarkDown
### 此模块为滑动验证
调用 ： import slider from '@popers/slider'
使用 ： slider(option)
传递参数格式 ：      var options = {
				dataList: ["0"],  //length 必须大于0
				success:function(){  
				     console.log("show");   //验证成功
				},
				fail: function(){
				    console.log("fail");  //验证失败
				}
			};
图片显示： 将图片存放到 images 文件中 图片文件名为（1.jpg,2.jpg....）
	        并在index.js第48行  [i < (图片张数 + 1)]
	         在 index.js 第86行  [Math.random() * (图片张数 - 1)]