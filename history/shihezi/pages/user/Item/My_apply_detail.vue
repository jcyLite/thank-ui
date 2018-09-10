<style scoped="scoped" lang="less">
	.forBox{
		padding-bottom:20px;
	}
	.container-one {
		padding-left: 5%;
		padding-right: 5%;
		background: #fff;
		>div:last-child {
			border: none;
		}
		>div {
			background: #fff;
			border-bottom: 1px solid #E3E3E3;
			line-height: 3.5rem;
			>div:first-child {
				display: inline-block;
				width: 20%;
				color: #979797;
			}
			>div:last-child {
				width: 78%;
				display: inline-block;
				text-align: right;
				color: #000;
			}
		}
	}
	
	.container-two {
		margin-top: 20px;
		background: #fff;
	}
</style>
<template>
	<div data-role="page" id="myShixiangDetailPage">
		<Header title="我的申请详情" />
		<div class="container">
			<div class="container-box">
				<div class="forBox">
					<div class="container-one">
						<div>
							<div>办件编号</div>
							<div id="mySXcaseNo">
								{{d.caseNo}}
							</div>
						</div>
						<div>
							<div>申报时间</div>
							<div>
								{{d.createDate}}
							</div>
						</div>
						<div>
							<div>实施机关</div>
							<div id="mySXdeptName">
								{{d.deptName}}
							</div>
						</div>
						<div>
							<div>
								事项名称
							</div>
							<div>
								{{d.itemName}}
							</div>
						</div>
						<div>
							<div>办件状态</div>
							<div>
								{{["申报","补齐材料","办结","作废"][d.caseStatus-1]}}
							</div>
						</div>
						<div>
							<div>申请类型</div>
							<div>
								{{["个人","单位"][d.caseapplicanttype-1]}}
							</div>
						</div>

					</div>

					<div class="container-two" v-show="d.caseapplicanttype=='1'" id="personal">
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">申请人</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXcaseapplicant">
								{{d.caseapplicant}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:25%;color:#979797">申请人手机</div>
							<div style="width:73%;display:inline-block;text-align:right;color:#000" id="mySXcaseapplicantphone">
								{{d.caseapplicantphone}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">证件类型</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXcaseapplicantpapertye">
								{{d.caseapplicantpapertye=='1'?'身份证':''}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">证件号码</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXcaseapplicantpapercode">
								{{d.caseapplicantpapercode}}
							</div>
						</div>
						<div style="border-bottom:0px;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">联系地址</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXcaseapplicantaddress">
								{{d.caseapplicantaddress}}
							</div>
						</div>
					</div>

					<div v-show="d.caseapplicanttype=='2'" id="farenshenqing">
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">单位名称</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXorganization">
								{{d.organization}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">单位法人</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXlegalperson">
								{{d.legalperson}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">机构代码</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXorgcode">
								{{d.orgcode}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">单位邮编</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXorgzipcode">
								{{d.orgzipcode}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">单位传真</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXfax">
								{{d.fax}}
							</div>
						</div>

						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">单位地址</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXaddress">
								{{d.address}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:20%;color:#979797">联系人</div>
							<div style="width:78%;display:inline-block;text-align:right;color:#000" id="mySXcaselinkmanname">
								{{d.caselinkmanname}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:40%;color:#979797">联系人证件类型</div>
							<div style="width:58%;display:inline-block;text-align:right;color:#000" id="mySXcaselinkmanpapertype">
								{{d.caselinkmanpapertype=="1"?"身份证":''}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:40%;color:#979797">联系人证件号码</div>
							<div style="width:58%;display:inline-block;text-align:right;color:#000" id="mySXcaselinkmanpapercode">
								{{d.caselinkmanpapercode}}
							</div>
						</div>
						<div style="border-bottom:solid 1px #E3E3E3;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:25%;color:#979797">联系人手机</div>
							<div style="width:73%;display:inline-block;text-align:right;color:#000" id="mySXcaselinkmanmobile">
								{{d.caselinkmanmobile}}
							</div>
						</div>
						<div style="border-bottom:0px;width:90%;margin-left:5%;line-height:3.5rem;">
							<div style="display:inline-block;width:25%;color:#979797">联系人地址</div>
							<div style="width:73%;display:inline-block;text-align:right;color:#000" id="mySXcaselinkmanaddress">
								{{d.caselinkmanaddress}}
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	function ajax() {
		this.$http.post('myItemDetail.action', {
			itemId: this.$route.query.id
		}).then(d => {
			this.d = d;
		})
	}
	export default {
		data() {
			return {
				d: {}
			}
		},
		methods: {

		},
		created() {
			ajax.call(this)
		},
		mounted() {
			this.$module.initScroll('.container',{
				"dir": "y", //滚动的方向，x或者y
				"bounce": false,
				"scrollBar": false,
			})
		}

	}
</script>