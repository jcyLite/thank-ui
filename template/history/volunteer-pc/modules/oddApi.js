var bool = 0,
	http, logo;
if(bool === 0) { //线上生产环境
	http = 'http://api.gaiwenkeji.com/Api';
	logo = 'http://api.gaiwenkeji.com';
} else if(bool === 1) { //线上测试环境
	http = 'http://121.40.166.96:92/Api';
	logo = 'http://121.40.166.96:92';
} else if(bool === 2) { //戴进电脑
	http = 'http://192.168.1.232:88/Api';
	logo = 'http://192.168.1.232:88';
} else if(bool === 3) { //戴进本地
	http = "http://192.168.2.65:82/gaokao-tp3/Api";
	logo = 'http://192.168.2.65:82';
}
export default { // 高考志愿接口
		// 志愿首页
		// 录入成绩接口
		0: http + '/User/setGrade',

		/*根据省份判断所需填写*/
		1: http + '/User/getProvinceShow', //1

		/*测试录取率*/
		2: http + '/Search/testUserEnroll', //2

		/*距离高考天数接口*/
		3: http + '/Other/getCountDown', //3

		/*批次线接口*/
		4: http + '/Batch/getList', //4

		/*志愿列表页接口*/
		5: http + '/Wish/getCategoryWish', //5

		// 公共
		/*地区接口*/
		/*级联接口*/
		6: http + '/Cascadedata/getLevelData', //6

		/*某个学校所有专业接口*/
		7: http + '/School/getSchoolMajor', //7

		/*学校专业详情*/
		8: http + '/School/getSchoolMajorDetail', //8

		/*学校分数线*/
		9: http + '/School/getSchoolScore', //9

		/*意愿学校地区接口*/
		10: http + '/School/getWishSchoolArea', //10

		/*根据专业名称搜索专业列表*/
		11: http + '/Major/getMajorInfo', //11

		// 志愿表
		/*志愿列表接口*/
		/*志愿明细接口*/
		12: http + '/Wish/getWishDetail', //12

		/*志愿列表页接口*/
		13: http + '/Wish/getWishList', //13

		/*删除志愿表接口*/
		14: http + '/Wish/delWishForm', // 14

		/*保存志愿表名接口*/
		15: http + '/Wish/SaveWishTitle', //15

		/*保存志愿表接口*/
		16: http + '/Wish/saveAnalyseWishForm', //16

		/*本科批次接口*/
		17: http + '/Batch/getList', //17

		// 信息库
		/*院校大全接口*/
		18: http + '/School/getAllSchool', //18

		/*专业大全接口*/
		/*专业列表接口*/
		19: http + '/Major/getMajorList', //19

		/*学历、学科、科目列表接口*/
		20: http + '/Major/getList', //20 

		/*专业详情接口*/
		21: http + '/Major/getMajorDetail', // 21

		/*大学排行*/
		22: http + '/Search/getSchoolOrder', //22

		/*专业排行*/
		23: http + '/Search/getMajorOrder', //23

		/*真假院校*/
		24: http + '/Search/isTrueSchool', //24

		/*职业详情列表*/
		25: http + '/Job/getJobDetail', //25

		// 我的
		/*开通VIP接口*/
		26: http + '/User/userOpenVip', //26

		/*判断是否VIP*/
		27: http + '/User/isVip', //27

		/*留学申请接口*/
		28: http + '/User/applyAbroad', //28

		/*我的关注接口*/
		/*我的关注列表接口*/
		29: http + '/User/getMyAttention', //29

		/*我的关注新增接口*/
		30: http + '/User/addMyAttention', //30

		/*我的关注取消接口*/
		31: http + '/User/updateMyAttention', //31

		/*录取信息接口*/
		32: http + '/User/userEnroll', //32

		/*意见反馈接口*/
		33: http + '/User/userFeedBack', //33

		// 搜索
		/*职业专业*/
		34: http + '/Search/getJobData', //34

		/*看就业选学校*/
		35: http + '/Search/getTradeSchool',

		// 就业专业
		/*专业下拉*/
		36: http + '/Cascadedata/getLevelData',

		/*忘记密码*/
		37: http + '/Auth/resetPasswd',

		/*发送验证码*/
		38: http + '/Auth/smsSend',

		/*学校地区*/
		39: http + '/Cascadedata/getLevelData',

		/*登录接口*/
		40: http + '/Auth/login',

		/*志愿列表*/
		41: http + '/Wish/getWishList',

		/*意愿职业设置*/
		42: http + '/Wish/getWishTrade',

		/*手机注册*/
		43: http + '/Auth/register',

		/*验证是否登录*/
		44: http + '/Auth/checkLogin',

		/*学校专业详情*/
		45: http + '/Major/getSchoolMajorDetail',

		/*成绩展示接口*/
		46: http + '/User/getGrade',

		/*学校简介*/
		47: http + '/School/getSchoolDetail',

		/*看就业选专业*/
		48: http + '/Search/getTradeMajor',

		/*学校搜索接口*/
		49: http + '/School/getSchoolRate',

		/*授权登录接口*/
		50: http + '/Auth/authLogin',

		/*获取省份对应城市接口*/
		51: http + '/Cascadedata/getCasNextLevel',

		/*学校筛选条件*/
		52: http + '/School/getSchoolSelect',

		/*学校历年录取查询*/
		53: http + '/School/getOverYearAdmission',

		/*查询录取信息接口*/
		54: http + '/User/getUserEnroll',

		/*用户成绩分析报告*/
		55: http + '/User/userGradeReport',

		/*获取学校录取率*/
		56: http + '/Search/getUserEnrollSchool',

		/*填报政策列表*/
		57: http + '/FillPolicy/getList',

		/*填报政策明细*/
		58: http + '/FillPolicy/getDetail',

		/*支付接口*/
		59: http + '/Payment/',

		/*消费码激活*/
		60: http + '/User/vipActive',

		/*绑定邀请人*/
		61: http + '/User/bindInviter',

		/*个人信息*/
		62: http + '/User/userinfo',

		/*老用户绑定手机*/
		63: http + '/auth/authBind',

		/*填分地区*/
		64: http + '/Index/Area',

		/*冲刺推荐*/
		65: http + '/School/getAllSchool',

		/*图片绝对地址*/
		'logo': logo,

		/*检测更新*/
		checkUrl: 'http://api.gaiwenkeji.com/Api/Index/version',

		/*下载补丁*/
		wgtUrl: 'http://api.gaiwenkeji.com/update/update.wgt'

	}