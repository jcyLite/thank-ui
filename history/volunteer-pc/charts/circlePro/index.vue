<template>
	<svg version="1.1" x="0px" y="0px" viewBox="0 0 56.7 56.7">
		<text x="12" y="30" fill="#11BDC5">
		{{d.text||""}}
		</text>
		<circle fill="none" stroke="#DDDDDD" stroke-miterlimit="10" cx="28.3" cy="26.8" r="22.3" />
		<path :d="d.d" :transform="translate" id="ring" fill="none" stroke="#11BDC5" stroke-width="2" stroke-miterlimit="10" />
	</svg>
</template>

<script>
	export default{
		props:['data'],
		data(){
			return {
			}
		},
		computed:{
			d(){
				this.data=this.data || {};
					// 计算当前的进度对应的角度值
				this.data.progress=this.data.progress||0.5;
				this.data.text=this.data.text||(this.data.progress*100+'%');
				var degrees = this.data.progress * 360;
				var r = this.data.radius||22;
				this.data.r=r;
				// 计算当前角度对应的弧度值
				var rad = degrees * (Math.PI / 180);
				//极坐标转换成直角坐标
				var x = (Math.sin(rad) * r).toFixed(2);
				var y = -(Math.cos(rad) * r).toFixed(2);
				//大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
				var lenghty = window.Number(degrees > 180);
				//path 属性
				var descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y];
				// 给path 设置属性
				this.data.d=descriptions.join(' ');
				
				var svg = document.createElement('svg');
				return this.data||{};
			},
			translate(){
				var a=this.d.r+7;
				var b=this.d.r+5
				return 	`translate(${a},${b})`;
			}
		}
	}
</script>

<style>
</style>