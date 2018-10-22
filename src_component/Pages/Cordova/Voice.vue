<template>
	<div class="Voice">
		<tk-header>Voice(语音)</tk-header>
		<tk-container>
			<tk-button-group @click="pressToSay" :contents="['开始录制','停止录制']"></tk-button-group>
		</tk-container>
	</div>
</template>

<script>
	export default {
		methods:{
			pressToSay(i){
				if(i==0){//开始录制
					this.tk_voice(0);
				}else{//停止录制
					this.tk_voice.stop(0);
				}
			}
		}
	}
</script>

<style>
</style>