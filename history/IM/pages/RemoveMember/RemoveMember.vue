<style scoped="scoped" lang="less">
	.RemoveMember{
		z-index:0;
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		background:#fff;
		.Wrapper{
			top:50px;
		}
		.layui-layim-list{
			li{
				background:#fff;
			}
		}
		.img-box{
			position:absolute;
			left:70px;
			top:23px;
			img{
				position:absolute;
				left:0;
				top:0;
				background:#ddd;
			}
		}
		.username{
			top:25px;
			left:120px;
			position: absolute;
		}
	}
</style>
<template>
	<div class="RemoveMember">
		<Header title="删除群成员" :right_top="right_top"/>
		<ty-wrapper class="ty-wrapper">
			<mt-checklist
				align="right"
			  	v-model="value"
			  	:options="list">
			</mt-checklist>
		</ty-wrapper>
		<!--<div class="wrapper">
			<div class="scroller">
				<ul class="layui-layim-list layui-show">
					<li class="list" @click="choose(data)" :class="'layim-friend'+data.id" :data-index="index" data-type="friend" v-for="(data,index) of list">
						<div :class="[data.active?'choose':'']" class="radius">
							<i v-if="data.active" class="layui-icon">&#xe605;</i>
						</div>
						<div class="img-box">
							<img :src="baseImageURL+data.avatar">
						</div>
						<span class="username">
							{{ data.username||data.groupname||data.name||"佚名" }}
						</span>
					</li>
				</ul>
			</div>
		</div>-->
	</div>
	
</template>

<script>
	function removeGroupMember(){
		var gid=this.$route.query.gid;
		var ids=this.value.join('/');
		this.$http.post('websocket/removeGroupMember.action',{
			gid,ids
		}).then(d=>{
			this.$router.go(-1);
		})
	}
	function remove(options,val) {
	  for(var i=0; i<options.length; i++) {
	    if(options[i] == val) {
	      options.splice(i, 1);
	      break;
	    }
	  }
	}
	export default{
		data(){
			return {
				arr:[],
				value:[],
				d:[]
			}
		},
		computed:{
			list(){
				var list=[];
				for(var i=0;i<this.d.length;i++){
					list.push({
						label:this.d[i].username,
						value:this.d[i].id
					})
				}
				return list;
			},
			right_top(){
				var that=this;
				return {
					name:'删除',
					click(){
						if(!that.value.length){
							that.$poper.tips('至少选择一个群成员')
							return
						}
						removeGroupMember.call(that)
					}
				}
			}
		},
		mounted(){
			var mineId=layui.data('layim-mobile').mine.id;
			var list=this.$route.query.list;
			for(var key in list){
				list[key].active=false;
				if(list[key].id==mineId){
					list.splice(key,1);
				}
			}
			this.d=list;
			
				
		},
		methods:{
			choose(data,index){
				data.active=!data.active;
				if(this.arr.indexOf(data.id)!=-1){
					remove(this.arr,data)
				}else{
					this.arr.push(data.id)
				}
			}
		}
	}
</script>
