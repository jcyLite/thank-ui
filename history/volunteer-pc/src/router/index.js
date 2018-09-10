!function(){
		var a=new VueRouter({//电脑版路由
			routes: [{
				path: '/',
				component: jcy.require('index')
			},{
				path:'/account',
				component:jcy.require('account')
			},{
				path: '/index',
				component: jcy.require('index')
			},{
				path: '/recommond',
				component: jcy.require('recommond')
			}, {
				path: '/infolib',
				component: jcy.require('infolib')
			}, {
				path: '/load',
				component: jcy.require('load')
			}, {
				path: '/vip',
				component: jcy.require('vip')
			}, {
				path: '/policy',
				component:jcy.require('policy')
			},{
				path:'/policy-detail',
				component:jcy.require('policy-detail')
			},{
				path:'/agree',
				component:jcy.require('agree')
			},{
				path:'/info',
				component:jcy.require('info')
			}]
		})
		a.afterEach(function(to,from,next){
			window.scrollTo(0,0);
		})
		window.router=a;
}()
