<style lang="less" scoped="scoped">
	.ChangeStyle{
		.ty-wrapper{
			top:50px;
			.container{
				.style-list{
					float:left;
					width:40%;
					margin:5%;
				}
			}
		}
	}
</style>
<template>
	<div class="ChangeStyle">
		<Header title="风格设置"/>
		<img class="skin" v-if="$store.state.skin" :src="$store.state.skin" alt="" />
		<ty-wrapper class="ty-wrapper">
			<div class="container">
				<img @click="chooseStyle(index)" class="style-list" v-for="(item,index) of items" :src="item" alt="" />
			</div>
		</ty-wrapper>
	</div>
</template>

<script>
	import {setMylocal} from "@/module/local.js";
	var style_1=require('./Image/style_0.png')
	var style_2=require('./Image/style_1.png')
	export default {
		computed:{
			items(){
				return [style_1,style_2]
			}
		},
		methods:{
			chooseStyle(index){
				setMylocal('styleId',index);
				this.$router.goBack();
			}
		}
	}
</script>
