<template>
	<div class="info-box">
		<div class="info-liteBox">
			<div class="info-liteTitle">
				学校简介
			</div>
			<div>
				<div class="info-tip">
					<span>隶属：{{d.intro.attach}}</span>
					<span>类型：{{d.intro.category}}</span>
					<span>网址：<a style="cursor: pointer;" :href="d.intro.weburl">{{d.intro.weburl}}</a></span>
					<span>电话：<span>{{d.intro.enroll}}</span></span>
				</div>
				<div :style="{height:t.seeMore?'auto':'245px'}" class="info-introduce">
					<div class='info-ointro' v-html=d.intro.intro>&nbsp;&nbsp;</div>
				</div>
				<div @layclick="seeMore" class="info-seeall">查看全部</div>
			</div>
		</div>
		<div class="info-liteBox">
			<div class="info-liteTitle">
				深造情况
			</div>
			<div class="info-intro bd row info-shenzhao">
				<ul class="col-sm-6 br">
					<li class="info-duyanbi">{{d.intro.graduate}}% </li>
					<li class="info-duyan">读研比例</li>
				</ul>
				<ul class="col-sm-6">
					<li class="info-chuguobi">{{d.intro.abroad}}%</li>
					<li class="info-chuguo">出国比例</li>
				</ul>
			</div>
		</div>
		<div class="info-liteBox">
			<div class="info-liteTitle">
				学校男女生比例
			</div>
			<div class="info-intro bd row info-nannv">
				<ul class="col-sm-4">
					<li class="info-famale">
						<infoicon3></infoicon3>
					</li>
					<li class="info-nvsheng">女生</li>
				</ul>
				<ul class="col-sm-4">
					<div class="info-nannvspan">
						<span class="info-nv">{{100 - d.intro.manbili}}</span> :
						<span class="info-nan">{{d.intro.manbili}}</span>
					</div>
					<div class="fl">
						<div :style="{width:(100-d.intro.manbili)+'%'}"></div>
						<div :style="{width:d.intro.manbili+'%'}"></div>
					</div>
				</ul>
				<ul class="col-sm-4">
					<li class="info-male">
						<infoicon4></infoicon4>
					</li>
					<li class="info-nansheng">男生</li>
				</ul>
			</div>
		</div>
		<div class="info-liteBox">
			<div class="info-liteTitle">
				校园风光
			</div>
			<div class="info-intro bd row info-schoolimg">
				<div class="jcyui-container">
					<div @layclick="toleft" class="jcyui-left">
						<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 68.6 68.9" enable-background="new 0 0 68.6 68.9" xml:space="preserve">
							<line fill="#20A8BB" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="51.2" y1="4" x2="20.6" y2="34.6" />
							<line fill="none" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="20.6" y1="34.6" x2="51.5" y2="65.4" />
						</svg>
					</div>
					<div :style="{'margin-left':left,width:d.intro.picarr&&d.intro.picarr.length&&d.intro.picarr.length*252+'px'}" class="jcyui-imgcontainer">
						<div @layclick="toBiger(item.school_src)" v-for="item of d.intro.picarr" ref="imgBox" class="jcyui-imgbox" :style="{'background-image':'url('+item.school_src+')'}"></div>
					</div>
					<div @layclick="toright" class="jcyui-right">
						<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 68.6 68.9" enable-background="new 0 0 68.6 68.9" xml:space="preserve">
							<line fill="#20A8BB" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="20.9" y1="65.4" x2="51.5" y2="34.9" />
							<line fill="none" stroke="#20A8BB" stroke-width="5" stroke-miterlimit="10" x1="51.5" y1="34.9" x2="20.6" y2="4" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import infoicon3 from '@/components/icon/icon-3.vue'
	import infoicon4 from '@/components/icon/icon-4.vue'
	import jcyui from '@/components/jcyui'
	export default {
		data() {
			return {
				d: { //后台渲染数据流
					intro: {}
				},
				t: { //样式控制数据流
					seeMore: false,
					oleft:0
				},
				typety : 2
			}
		},
		components: {
			infoicon3,
			infoicon4
		},
		computed:{
			left(){//到左侧的距离
				return 252*this.t.oleft+'px';
			}
		},
		methods: {
			seeMore(e) {
				this.t.seeMore = !this.t.seeMore;
			},
			toleft(){
				this.t.oleft<0&&this.t.oleft++;				
			},
			toright(){				
				if(this.t.oleft.toString().substr(1) <= this.$refs.imgBox.length - 5){
					this.t.oleft--;
				}				
			},
			toBiger(url){
				
			}
		},
		created() {
			var id = this.$route.query.id;
			this.$http.post('?service=App.School.Detail', {
				id: id,
				type: this.typety
			}).then(d => {
				this.d = d.data;
			})
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.jcyui-imgbox{
		box-sizing: border-box;
	}
	.jcyui-container{
		overflow: hidden;
	}
</style>