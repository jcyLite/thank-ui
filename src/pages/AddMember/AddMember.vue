<style lang="less">
	.AddMember {
		background: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index:0;
		.Wrapper.ty-wrapper{
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
	<div class="AddMember">
		<Header title="添加新成员" :right_top="right_top"/>
		<ty-wrapper class="ty-wrapper">
			<mt-checklist
				align="right"
			  	v-model="value"
			  	:options="list">
			</mt-checklist>
		</ty-wrapper>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	function getAddGroupMember(){
		   var gid=this.$route.query.gid;
		this.$http.post('websocket/getAddGroupMember.action',{
			gid
		}).then(d=>{
			for(var key in d.data){
				d.data[key].active=false;
			}
			this.d=d.data
		})
	}
	function addGroupMember(){
		var gid=this.$route.query.gid;
		var ids=this.value.join('/');
		this.$http.post('websocket/addGroupMember.action',{
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
	export default {
		data(){
			return {
				d:[],
				arr:[],
				value:[]
			}
		},
		computed:{
			...mapState(['cache']),
			list(){
				var list=[];
				for(var i=0;i<this.d.length;i++){
					list.push({
						label:this.d[i].username,
						value:this.d[i].id
					})
				}
				return list
			},
			right_top(){
				var that=this;
				return {
					name:'添加',
					click(){
						if(!that.value.length){
							that.$poper.tips('至少选择一个群成员')
							return
						}
						addGroupMember.call(that);
					}
				}
			}
		},
		mounted(){
			getAddGroupMember.call(this)
		},
		methods:{
			choose(data,index){
				data.active=!data.active;
				if(this.arr.indexOf(data.id)!=-1){
					remove(this.arr,data.id)
				}else{
					this.arr.push(data.id)
				}
			}
		}
	}
</script>