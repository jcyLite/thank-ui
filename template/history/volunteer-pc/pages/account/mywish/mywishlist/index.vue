<template>
	<div id="box">
		 <div class="content">
			<ul>
				<li>
					<div class="content-left">
						<h3>本科第一批</h3>
						<p>2017年本科：文科最低300分</p>
					</div>
					<div class="content-right">
						<button type="button" @layclick="pici1">
							开始
						</button>
					</div>
				</li>
				<li v-show="pici" v-for="(schoolItem,schoolItemIndex) in schoolList" class="schoolList">
					<span class="addSchool" v-show="addList[schoolItemIndex]" @layclick="addSchool($event,schoolItemIndex)">+</span>
					<div class="wishlist" v-show="schoolList[schoolItemIndex]">
						<div class="content-left-school">
							<div class="school-title">
								<h4>选择学校</h4>
								<input type="text"  @input="searchSchool($event,schoolItemIndex)"/>
							</div>
							<ul ref="schoolUlbox">
								<li v-for="(school,index) in schools" @layclick="chonseSchool(school,schoolItemIndex,$event)">
									<div class="schoolItem" >
										<span class="schoolItem-logo">
											<img :src="baseImg + school.logo " alt="" />
										</span>
										<span class="schoolItem-info">
											<p>{{school.sname}}</p>
											<span v-show="school.nef">{{school.nef}}</span>
											<span v-show="school.too">{{school.too}}</span>
											<span v-show="school.nature" class="last-span">{{school.nature}}</span>
										</span>
									</div>
								</li>
							</ul>
							<div class="majoy-list">
								<span v-for="(majoy,majoyIndex) in majoyList" @layclick="chonseMajoy(majoy,schoolItemIndex)">
									{{majoy.majorname}}
								</span>
								
							</div>
						</div>
						<div class="content-right-majoy">
							<div class="school-title">
								<h4>选择的专业</h4>								
							</div>
							<div>
								<span v-for="(majoy_list,majoy_index) in majotList_r">{{majoy_list}}</span>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="content-left">
						<h3>本科第一批</h3>
						<p>2017年本科：文科最低300分</p>
					</div>
					<div class="content-right">
						<button type="button" @layclick="wishListShow">
							开始
						</button>
					</div>
				</li>
			</ul>
		</div> 
		<!--<wishList name="" v-show='show'></wishList>-->
	</div>
</template>

<script>
	import wishList from '@/components/mywish/index.vue'
	import {schoolList} from '@/server'
	import {baseImg} from '@/modules/common.js'
	export default{
		data(){
			return{
				pici : '',
				show:false,
				schoolList:[false,false,false,false],
				addList:[true,true,true,true],
				schools:null,
				majoyList:null,
				majotList_r : [],
				baseImg:baseImg,
				wish :  {
					"id": 1, //修改时必传 志愿表id 
					"uid": 1, //用户id 
					"name": "志愿表名称",
					"remark": "备注内容",
					"type": 1, //0自动填志愿 1手动填志愿 
					"school": {
						"pici1": [ //本科一批
							{
								"id": 3, //学校id
								"major_id": "31,66" //专业id 
							},
							{
								"id": 4,
								"major_id": "31,117"
							}
						],
						"pici2": [ //本科二批 
							{
								"id": 44,
								"major_id": "1,9"
							}
						],
						"pici3": [ //本科三批 
							{
								"id": 44,
								"major_id": "1,9"
							}
						],
						"pici4": [ //专科 
							{
								"id": 44,
								"major_id": "1,9"
								}
							]
						}
					}
			}
		},
		components : {wishList},
		methods:{
			pici1(){
				this.pici = 'pici1'
			},
			wishListShow(){		
				this.show = true;
				this.$router.push({
					path :'/account/myaccount/setwish?id=1'
				})
			},
			addSchool(e,schoolItem){
				this.schoolList = [false,false,false,false]
				this.addList = [true,true,true,true]
				//让schoolList对应的index为true//让 加号隐藏
				this.schoolList[schoolItem] = true;
				this.addList[schoolItem] = false;						
			},
			searchSchool(e,schoolItemIndex){
				var name = e.target.value
				if (name == '') {
					return false
				};
				this.$http.post('?service=App.School.Lists',{
					sname: name
				}).then(d => {							
					if(d.data.items.length != 0){						
						this.schools = null;
						this.schools = d.data.items
					}
				})	
			},
			//点击学校
			chonseSchool(school,schoolItemIndex,name,e){
				//将schools清空
				this.schools = [];
				//将选择的school添加到schools
				this.schools.push(school)				
				//存储学校id
				var pici = this.pici		
				this.wish.school[pici][schoolItemIndex].id = school.id					
				//根据id查找学校专业
				var schoolId = school.id
				this.$http.post('?service=App.School.Major',{
					id:schoolId
				}).then(d=>{
					this.majoyList = d.data
				})
			},
			//点击专业
			chonseMajoy(majoy,schoolItemIndex){
				var pici = this.pici		
				this.wish.school[pici][schoolItemIndex].major_id = majoy.major_id
				this.majotList_r.push(majoy.majorname)
				console.log(this.wish.school)
			}
		},
		created(){
			schoolList.call(this)
			
		},
		watch:{
			$route(n,o){
				if(n.query.id == 1){
					this.show = true;
				}else if(n.query.id == 2){
					this.show = false;
				}
				
			}
		},
	
	}
	/*json数据 {
		"id": 1, //修改时必传 志愿表id 
		"uid": 1, //用户id 
		"name": "志愿表名称",
		"remark": "备注内容",
		"type": 1, //0自动填志愿 1手动填志愿 
		"school": {
			"pici1": [ //本科一批
				{
					"id": 3, //学校id
					"major_id": "31,66" //专业id 
				},
				{
					"id": 4,
					"major_id": "31,117"
				}
			],
			"pici2": [ //本科二批 
				{
					"id": 44,
					"major_id": "1,9"
				}
			],
			"pici3": [ //本科三批 
				{
					"id": 44,
					"major_id": "1,9"
				}
			],
			"pici4": [ //专科 
				{
					"id": 44,
					"major_id": "1,9"
				}
			]
		}
	}*/
</script>

<style lang="less" scoped="scoped">
#box{
	border-top: 3px solid #11bdc5;
}
.content{
	width:850px;
	/*height: 500px;*/
	background: #fff;
	border-radius: 10px;
}
.content ul{
	list-style: none;
	padding: 30px 44px;
}
.content ul li{
	display: flex;
	border-bottom: 1px dotted #ccc;
}
.content ul li .content-left{
	flex:8;
	padding-top: 18px;
}

.content ul li .wishlist{
	width:100%;
	display:flex;
}

.content ul  .schoolList{
	/*height: 120px;;*/
}
.content ul  .schoolList .addSchool{
	display: block;
    width: 100px;
    font-size: 76px;
    color: #ccc;
    margin: 0 auto;
    cursor: pointer;
}
.content ul li .wishlist .school-title{
	display:flex;
	padding:5px;
	height: 32px;
    line-height: 32px;
    border: 1px solid #ccc;
}
.content ul li .wishlist .school-title h4,
.content ul li .wishlist .school-title input{
	flex:5;
	text-align: center;
}
.content ul li div .content-left-school{
	flex:5
}
.content ul li div .content-left-school .majoy-list span{
	display: inline-block;
    width: auto;
    height: 24px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 24px;
    margin: 5px;
}
.content ul li div .content-left-school ul {
	margin: 0;
    padding: 5px;
    /*height: 344px;*/
    overflow: auto;
    /*border: 1px solid #ccc;*/
	
}
.content ul li div .content-left-school ul li{
	height: 80px;
	margin: 5px 0;
}
.content ul li div .content-left-school ul li div{
	width:100%;
	display:flex;
	margin-bottom: 8px;;
}
.content ul li div .content-left-school ul li div .schoolItem-logo{
	width: 100px;
    text-align: center;
}
.content ul li div .content-left-school ul li div .schoolItem-logo img{
	/*width:100%;*/
	height:100%
}
.content ul li div .content-left-school ul li div .schoolItem-info{
	flex:5
}
.content ul li div .content-left-school ul li div .schoolItem-info p{
	padding-top: 10px;
    padding-left: 12px;
    font-size: 18px;
}
.content ul li div .content-left-school ul li div .schoolItem-info span{
	display: inline-block;
    width: 32px;
    height: 22px;
    text-align: center;
    border: 1px solid #f60;
    color:#f60;
    border-radius: 4px;
    margin-left: 10px;
    margin-top: 8px;
}
.content ul li div .content-left-school ul li div .schoolItem-info  .last-span{
	display: inline-block;
    width: 120px;
    height: 22px;
    text-align: center;
    border: 1px solid #11bdc5;
    color:#11bdc5;
    border-radius: 4px;
    margin-left: 10px;
    margin-top: 8px;
}
.content ul li div .content-right-majoy{
	flex:5
}
.content ul li .content-right{
	line-height: 94px;
	text-align: center;
}
.content ul li .content-right button{
	width: 80px;
	height: 32px;
	border: 1px solid #ccc;	
	background: #11bdc5;
	color: #fff;
}
</style>