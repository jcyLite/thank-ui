<template>
	<div class="personal">
		<div class="dept list">
			<div class="title">
				部门
			</div>
			<div class="sel">
				<input @input="dept_input" placeholder="全部" v-model="dept" type="text" />
			</div>
			<div @click.stop="show_all_dept" :class="[!dept_active?'glyphicon-chevron-down':'glyphicon-chevron-up']" class="bot glyphicon">
				
			</div>
			<div @touchend.stop="" @touchmove.stop="" @touchstart.stop="" :class="{active:dept_active}" class="list_container">
				<div @click="dept_list_click(item.dept_name,item.dept_code)" v-for="item of dept_data_metch">
					{{item.dept_name}}
				</div>
			</div>
		</div>
		<div class="topi list">
			<div class="title">
				主题
			</div>
			<div class="sel">
				<input @input="topi_input" placeholder="全部" type="text" v-model="topi" />
			</div>
			<div @click.stop="show_all_topi" :class="[!topi_active?'glyphicon-chevron-down':'glyphicon-chevron-up']" class="bot glyphicon">
				
			</div>
			<div @touchend.stop="" @touchmove.stop="" @touchstart.stop="" :class="{active:topi_active}" class="topi list_container">
				<div @click="topi_list_click(item.topic_name,item.topic_code)" v-for="item of topi_data_metch">
					{{item.topic_name}}
					<!--<span class="count_number">{{item.count_number}}</span>-->
				</div>
			</div>
		</div>
		<div class="key_word list">
			<div class="title">
				关键字
			</div>
			<div class="sel">
				<input placeholder="请输入关键字" type="text" v-model="key_word"/>
			</div>
		</div>
		<div @click="search" class="btn_1 a">搜索</div>
	</div>
</template>

<script>
	function topi_ajax(){
		this.$http.post('topicsList.action',{
			busiType:2
		}).then(d=>{
			this.topi_data=d.data;
		})
	}
	function dept_ajax(){
		this.$http.post('deptList.action',{
			busiType:2
		}).then(d=>{
			this.dept_data=d.data;
		})
	}
	export default{
		data(){
			return {
				dept:'',
				dept_code:'',
				topi:'',
				topi_code:'',
				key_word:'',
				dept_data:[],
				topi_data:[],
				dept_data_metch:[],
				topi_data_metch:[],
				key_data_metch:[],
				key_active:!1
			}
		},
		computed:{
			dept_active(){
				return this.dept_data_metch.length!=0;
			},
			topi_active(){
				return this.topi_data_metch.length>0;
			},
			key_data(){
				return JSON.parse(localStorage.getItem('searchHistory'))
			},
		},
		methods:{
			dept_input(){
				var arr=[];
				for(var key of this.dept_data){
					if(!!this.dept&&new RegExp(this.dept).test(key.dept_name)){
						arr.push(key);
					}
				}
				this.dept_data_metch=arr;
			},
			topi_input(){
				var arr=[];
				for(var key of this.topi_data){
					if(!!this.topi&&new RegExp(this.topi).test(key.topic_name)){
						arr.push(key);
					}
				}
				this.topi_data_metch=arr;
			},
			show_all_dept(){
				if(this.dept_data_metch.length>1){
					this.dept_data_metch=[];
				}else{
					this.dept_data_metch=this.dept_data;
				}
			},
			show_all_topi(){
				if(this.topi_data_metch.length>1){
					this.topi_data_metch=[];
				}else{
					this.topi_data_metch=this.topi_data;
				}
			},
			show_all_key(){
				this.key_active=!this.key_active;
			},
			dept_list_click(name,code){
				this.dept=name;
				this.dept_code=code;
				this.dept_data_metch=[];
			},
			topi_list_click(name,code){
				this.topi=name;
				this.topi_code=code;
				this.topi_data_metch=[];
			},
			history_list_click(name){
				this.key_word=name;
				this.key_active=!1;
			},
			search(){
				this.$router.push({
					path:'/item',
					query:{
						busiType:2,
						deptCode:this.dept_code,
						topicCode:this.topi_code,
						type:'search',
						title:'法人办事',
						key_word:this.key_word
					}
				})
			}
		},
		mounted(){
			var that=this;
			topi_ajax.call(this);
			dept_ajax.call(this);
			$('body').click(()=>{
				that.dept_data_metch=[];
				that.topi_data_metch=[];
				that.key_active=!1;
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.personal{
		padding-top:5px;
		padding-bottom:300px;
		.list{
			display: flex;
			position:relative;
			.title{
				flex:1;
				height:65px;
				line-height:95px;
			}
			.sel{
				height:65px;
				line-height:95px;
				flex:5;
				text-align: center;
				input{
					text-align: center;
				}
			}
			.bot{
				flex:.5;
				margin-top:10px;
				line-height: 70px;
				text-align: center;
			}
			.list_container.topi{
				>div{
					position:relative;
					.count_number{
						position:absolute;
						right:20px;
						top:10px;
						width:30px;
						height:30px;
						border-radius:50%;
						background:#0000FF;
						text-align: center;
						line-height: 30px;
						color:#fff;
					}
				}
			}
			.list_container{
				box-shadow: 2px 2px 5px 2px #ddd;
				transition:.3s all;
				overflow-y:scroll;
				position:absolute;
				top:65px;
				z-index:10;
				height:0;
				opacity: 0;
				left:-10px;
				right:-5px;
				margin:auto;
				background:#fff;
				border:1px solid #ddd;
				border-radius:5px;
				>div{
					padding-left:20px;
					text-align: left;
					line-height: 50px;
				}
				>div:active{
					background:#2a70d0;
					color:#fff;
					opacity: .3;
				}
			}
			.list_container.active{
				opacity: 1;
				height:200px;
				width:100%;
				position:absolute;
			}
			height:65px;
			margin-left:25px;
			font-size:18px;
			border-bottom:1px solid #F5F5F5;
			margin-right:20px;
		}
		.btn_1.a{
			margin-top:50px;
			
		}
	}
</style>