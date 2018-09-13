<style lang="less">
	.Set {
		background: #efefef;
		.Wrapper{
			top:50px;
		}
	}
</style>
<template>
	<div class="Set">
		<Header title="设置" />
		<div class="container">
			<img class="skin" v-if="$store.state.local.skinId" :src="$store.getters.skinSrc" alt="" />
			<ty-wrapper class="ty-wrapper">

				<div class="layui-list">
					消息提示音
					<!--<mt-switch @change="changeVoice" :value="hasVoice" class="switch"></mt-switch>-->
					<ty-switch @change="changeVoice" :value="hasVoice" class="switch"></ty-switch>
				</div>
				<div @click="$router.push('/changeskin')" class="layui-list">
					更换皮肤
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div>
				<div @click="$router.push('/changestyle')" class="layui-list">
					更换风格
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div>
				<div class="layui-list">
					隐身
					<ty-switch @change="changeLine" :value="$store.state.cache.offLine" class="switch"></ty-switch>
				</div>
			</ty-wrapper>
		</div>
	</div>
</template>

<script>
	import {im} from '@/module/socket.js';
	import { setMylocal } from '@/module/local.js'
	export default {
		computed: {
			hasVoice() {
				return !this.$store.state.local.noVoice
			}
		},
		methods: {
			changeVoice(bol) {
				this.$store.state.local.noVoice = !this.$store.state.local.noVoice;
				setMylocal('noVoice', this.$store.state.local.noVoice);
			},
			changeLine(){
				this.$store.state.cache.offLine=!this.$store.state.cache.offLine;
				if(this.$store.state.cache.offLine){
					im.send('hide')
				}else{
					im.send('onLine')
				}
			}
		}
	}
</script>