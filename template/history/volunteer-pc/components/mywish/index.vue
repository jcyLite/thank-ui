<!--<template>
	<div id="box">
		<div class="content">			
			<header>江苏省2018年普通类本科第一批学校志愿智能模拟<span @layclick="closeBox" class="close-box">X</span></header>			
			
			<ul class="content-ul">
				<li class="title-top">
					<span>志愿名称</span>
					<span>学校</span>
					<span>专业</span>
					<span>是否服从调剂</span>
				</li>
				<li class="content-li" v-for="(item ,index) in school.pici1">
					<div class="content-left">第{{index+1}}志愿</div>
					<div class="content-center">
						<div class="content-c-top">
							<input type="text" @input="inputChange($event,index)" v-model="item.name"  value="">
							<span style="display:none" v-model="item.id">{{item.id}}</span>
							<button type="button" @layclick="chonseSchool(index)" class="center-btn">选择为A志愿</button>							
							<div class="searchSchoolList" v-show="schoolListShow[index]" >
								<div @layclick="appendSchool($event,item.id,index)" v-for="item in sSchoolList[index]" >{{item.sname}}</div>
							</div>
						</div>
						<div class="content-c-btom">
								<p>院校特色：财经</p>
								<p>2018选测科目等级要求：BB</p>  
								<p>2017选测科目等级要求：BB</p>		
								<p>2017年投档分：361</p>
						</div>
					</div>	
					<div class="content-right">
						<ul>
							<li v-for="(items ,index1) in item.major_name">
								<input type="text" v-model="items">									
								<button type="button" @layclick="searchMajoy(item.id,index,index1)">选择</button>
							</li>
						</ul>
						
						<div class="majoy-box" v-show="majoyShow[index]">
							<ul>
								<li v-for="(majoy,index2) in majoyList[index]">
									<div>
										<span>{{majoy.majorname}}</span>
										<span>{{majoy.trade.trade_name}}</span>										
										<button type="button" @layclick="chonseMajoy(majoy.major_id,majoy.majorname,index)">选择</button>
									</div>
								</li>
								<li>
									<div>
										<span>工程监理</span>
										<span>建筑工程</span>
										<button type="button">选择</button>
									</div>
								</li>
								<li>
									<div>
										<span>会计</span>
										<span>财务</span>
										<button type="button">选择</button>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="content-right-r">
						<label>							
							<input type="radio" name="fucong" value="1" v-model="fc"/>是
							<input type="radio" name="fucong" value="2" v-model="fc"/>否
						</label>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{		
		data(){
			return{		
				fc:'1',
				schoolListShow:[],
				majoyShow:[],
				sSchoolList:['','','',''],
				schoolId:'',
				majoyList :　[],				
				school: {
					name : '本科一批',
					remark : '',
					type : 1,
					pici1: [ //本科一批
						{
							name :'',
							id: '', //学校id
							major_name:['','','',''],
							major_id: ['','','',''] //专业id 
						},
						{
							name :'',
							id: '', //学校id
							major_name:['','','',''],
							major_id: ['','','',''] //专业id 
						},
						{
							name :'',
							id: '', //学校id
							major_name:['','','',''],
							major_id: ['','','',''] //专业id 
						},
						{
							name :'',
							id: '', //学校id
							major_name:['','','',''],
							major_id: ['','','',''] //专业id 
						}
					]
				},
				i : 0
			}
		},
		created(){
				
		},
		methods : {
			//关闭
			closeBox(){
				this.$router.push({
					path :'/account/myaccount/setwish?id=2'
				})
			},
			//联想搜索
			inputChange(e,index){				
				var name = e.target.value
				if (name == '') {
					return 
				};
				this.$http.post('?service=App.School.Lists',{
					sname: name
				}).then(d => {							
					if(d.data.items.length != 0){
						var arr=[]
						arr[index]=true;
						this.schoolListShow=arr;
						this.sSchoolList[index] = d.data.items;
					}
				})	
			},
			//appendSchool
			appendSchool(e,schoolId,index){				
				this.school.pici1[index].name =e.target.innerText 
				this.schoolId = schoolId
				this.schoolListShow = []
			},
			//选择当前学校
			chonseSchool(index){
				this.school.pici1[index].id = this.schoolId
			},
			//搜索专业
			searchMajoy(schoolId,index,index1){
				this.i = index1;
				this.$http.post('?service=App.School.Major',{
					id:schoolId
				}).then(d=>{
					var arr=[]
						arr[index]=true;
					this.majoyShow = arr
					this.majoyList[index] = d.data					
				})
			},
			//选择专业
			chonseMajoy(majoyId,name,index){	
				console.log(index)
				this.school.pici1[index].major_name[this.i] = name;
				this.school.pici1[index].major_id[this.i] = majoyId;				
				this.searchMajoy()
										
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
    #box header{
    	text-align: center;
    	padding: 30px 0;
    	font-size: 22px;
    	position: relative;
    }
    .close-box{
    	position: absolute;
		right: 15px;
    	top: 4px;
    	width:24px;
    	border-radius: 16px;
    	border: 1px solid #11bdc5;
    	cursor: pointer;
    	background: #11bdc5;
    	color: #fff;
    }
	#box{
		position: fixed;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0,0,0, 0.5)
	}
	#box .content{
		width:850px;
		/*height: 1000px;*/
		background: #fff;
		border-radius: 10px;
		margin: 10px auto;
		padding: 20px auto;
	}	
	#box .content .content-ul{
		list-style: none;
		padding: 10px 16px;
	}
	#box .content .content-ul .content-li{
		display: flex;
		margin: 12px;
	}
	#box .content .searchSchoolList {
	    width: 152px;
	    height: 200px;
	    line-height: 28px;
	    border: 1px solid #ccc;
	    padding-left: 5px;
	    background:#fff;
	    overflow-y: scroll;
	    overflow-x: hidden;
	}
	#box .content .searchSchoolList div{
		border-bottom: 1px solid #cccccc;
		cursor: pointer;
	}
	#box .content .searchSchoolList div:hover{
		background: rgba(0,0,0,.4);
		color:#fff
	}
	#box .content .content-ul .title-top {display: flex;    padding-bottom: 11px;}
	#box .content .content-ul .title-top span{
		flex: 1;
		/*text-align:center;*/
	}
	#box .content .content-ul .title-top span:nth-child(3){
		text-align: center;
	}
	#box .content .content-ul .title-top span:last-child{
		text-align: right;
	}
	#box .content .content-ul .content-li button{
		border:1px solid #11bdc5;
		background: #11bdc5;
		color:#fff;
		width: 74px;
		height: 32px;
		cursor: pointer;
	}
	#box .content .content-ul .content-li input[type=text]{
		height: 28px;
		padding-left:2px;
	}
	#box .content .content-ul .content-li:not(:first-child){
		margin-top: 20px;
	    border-top: 2px solid #ccc;
	    padding-top: 14px;
	}
	
	#box .content .content-ul .content-li .center-btn{
		width:100px;
	}
	#box .content .content-ul .content-li .content-left{
		flex:1;
	}
	#box .content .content-ul .content-li .content-center{
		flex:4;		
	}
	#box .content .content-ul .content-li .content-right{
		flex: 4;
		position: relative;
	}
	#box .content .content-ul .content-li .content-right .majoy-box{
		width:380px;
		height:300px ;
		border: 1px solid #ccc;
		position: absolute;
	    top: 0;
	    left: 252px;
	    background: #fff;	  
	    overflow: auto;  
	}
	#box .content .content-ul .content-li .content-right .majoy-box div{
		display: flex;
		padding: 5px;
	}
	#box .content .content-ul .content-li .content-right .majoy-box div span{
		flex:1;
		text-align: center;
		line-height: 32px;
	}
	#box .content .content-ul .content-li .content-right ul li:not(:first-child){
		margin: 5px 0;
	}
	#box .content .content-ul .content-li .content-right-r{
		flex:1;		
	}
</style>-->