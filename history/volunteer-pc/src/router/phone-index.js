!function(){
	window.router=function(){
		return new VueRouter({//手机版路由
			routes: [{
				name: 'index',
				path: '/',
				component: jcy.require('index')
			}]
		})
	}
}()
