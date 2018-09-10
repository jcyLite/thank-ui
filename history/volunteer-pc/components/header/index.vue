<!--需要传参useRouter-->
<template>
	<div id="headBox">
		<div class="header" id="header">
    		<div class="headCenter banxin">
    		    <div class="logo fll">
    		        <a style="cursor: pointer;" @layclick="toIndex" title="第一志愿">
    		            <img src="./img/logo.png" alt="第一志愿">
    		            第一志愿
    		        </a>
    		    </div>
    		    <div class="tab fll clearfix">
    		        <ul class="ul-box clearfix">
    		            <li v-for="(item,index) of routes" data-index ="0" :class="{'active':topac==index+1}">
    		            	<router-link :to="{name:item.oname}">{{item.name}}</router-link>
    		            </li>
    		            
    		        </ul>
    		        <div data-index = "4" :class="{'active':topac==5}" class="gaokao">    		            	    		            		
	            		高考倒计时
	            		<span>{{dateOne}}</span>
	            		<span>{{dateTwo}}</span>
	            		天        		            			            
    		        </div>
    		    </div>
    		    <!--注册-->
    		    <div class="search flr">
    		        <!-- <div class="fll">
    		            <input type="text" placeholder="搜素专业、学校">
    		            <a href="">
    		                <img src="${search}" alt="">
    		            </a>
    		        </div> -->
    		        <div class="flr loginBox" v-if = "isLoginshow">
    		            <a @layclick="popLogin(0)" href="javascript:void(0)" :class="{active:active==0}" class="login login1" style="margin-left:25px;">登录</a>
    		            <a @layclick="popLogin(1)" href="javascript:void(0)" :class="{active:active==1}" class="login login2">注册</a>
    		        </div>
    		        <div class="my-count flr " v-if="!isLoginshow" @mouseover="mycount($event)" @mouseout="vanish($event)">
    		            <a style="cursor: pointer;" @layclick="toMyAccount" :class="{'oactive':topac==5}" class="account">我的账户</a>
    		            <ul class="my-countlist" v-show = ismycountlistshow >
    		                <li class="my-countUsername">{{username}}，你好</li>
    		                <li class="account-list" @layclick="toMyAccount(0)" @mouseover ="accountlist($event)">
    		                    <a style="cursor: pointer;" class="clearfix">我的关注
    		                        <img :src="t.photo[0]" alt="" class="firstPic">
    		                        <img :src="t.photo[1]" alt="" class="secondPic display-none">
    		                    </a>
    		                </li>
    		                <li class="account-list" @layclick="logout" @mouseover ="accountlist($event)">
    		                    <a style="cursor: pointer;" class="clearfix">退出登录
    		                        <img :src="t.photo[2]" alt="" class="firstPic">
    		                        <img :src="t.photo[3]" alt="" class="secondPic display-none">
    		                    </a>
    		                </li>
    		            </ul>
    		        </div>
    		    </div>
    		</div>
		</div>
    </div>
</template>
<script>
var $ = require('jquery')
import img from '@/modules/img.js'
export default {
    data: function data() {
        return {
        	t:{
        		photo : [
        			require('@/assets/images/guanzhu.png'),
        			require('@/assets/images/guanzhu1.png'),
        			require('@/assets/images/tuichu.png'),
        			require('@/assets/images/tuichu1.png'),
        			
        		]
        	},
        	active:0,
            useRouter: 1,
            topac: -1,
            // loginbox:true,//登录的button按钮的判断能否点击的参数
            username: '', //登录时输入的用户名
            password: '', //登录时输入的密码
            isChecked: false,
            ismycountlistshow: false, //我的账户列表显示与隐藏
            regiterpara: 0, //判断能否点击注册的参数
            router:['recommondSchool','allSchool','load','vip'],
            dateOne : '',
            dateTwo : '',
            href:null,
            routes:[
            	{
    				name:'院校推荐',
    				link:'/recommond',
    				oname:'recommondSchool'
    			},
    			{
    				name:'信息库',
    				link:'/infolib',
    				oname:'allSchool'
    			},
    			{
    				name:'APP下载',
    				link:'/load',
    				oname:'load'
    			},
    			{
    				name:'成为VIP',
    				link:'/vip',
    				oname:'vip'
    			}
            ]
        };
    },
    watch:{
    	$route(to){
    		this.topac=this.router.indexOf(to.name)+1
    	}
    },
    computed:{
    	isLoginshow(){
    		return !this.$store.state.userInfo.logined;
    	}
    },
    methods: {
        toIndex: function toIndex() {
            //点击左上角的logo
            this.$router.push({ path: '/index' });
        },
        toMyAccount:function(i){
        	this.topac = 5;
        	this.$router.push({
        		path:'/account'
        	})
        },
        popLogin(i){//弹出登陆框
			this.active=i;
			if(i==0){	
				this.$router.push({ path: '/index' });
				this.$store.state.login.show=!0;
			}else{
				this.$store.state.register.show=!0;
			}
        },
        //hover我的账户
        mycount(e) {
            this.ismycountlistshow = true;
            if(this.$store.state.userInfo.infoData){	    		
	    		this.username = this.$store.state.userInfo.infoData.username	
	    	}
        },
        vanish: function vanish(e) {
            this.ismycountlistshow = false;
        },
        //退出登录，清除sid
        logout(){
            this.$store.commit('logout')
            this.$router.push({ path: '/' })
        },
        //账户列表的mouseover效果
        accountlist: function accountlist(e) {
            $(".account-list").find(".firstPic").removeClass("display-none");
            $(".account-list").find(".secondPic").addClass("display-none");
            $(e.target).find(".firstPic").addClass("display-none");
            $(e.target).find(".secondPic").removeClass("display-none");
        },
        //用于截取href中?后面内容
        subHref: function subHref(href) {
            var str = href.substring(href.indexOf('?') + 1, href.length);
            return str.split('&');
        }
//      islogined(){
//      	var islogined = sessionStorage.infoState;
//      	islogined = JSON.parse(islogined);
//      	console.log(islogined);
//      	if(islogined  && islogined.username !=""){
////      		this.isLoginshow = false;
//      		this.username = islogined.username;
//      	}
//      }
    },
    mounted() {
        //写登录的sessionstorage 调用islogined方法   
//      this.islogined();
        var a = /info\.html/.test(location.href);        
        if (!a) {
            switch (this.$route.name) {
                case 'recommondSchool':
                    this.topac = 1;
                    break;
                case 'allSchool':
                    this.topac = 2;
                    break;
                case 'load':
                    this.topac = 3;
                    break;
                case 'vip':
                    this.topac = 4;
                    break;
            }
        };
       
        //倒计时
    },
    created(){
    	this.$http.post('?service=App.User.GetCountDown').then(d=>{     
        	var str =  d.data.toString();      	
        	this.dateOne = str.substr(0,1);
        	this.dateTwo = str.substr(1,1);      	
        })
    	
    }
};
</script>

<style lang="less">
	@import "./index.less";
</style>;