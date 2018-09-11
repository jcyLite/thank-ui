/*
 * author  :chenjian
 * endtime :2018-9-6
 * function: this module will make your project run at development
 */
const DEV_MID = require('webpack-dev-middleware');
const HOT_MID = require("webpack-hot-middleware");
const express = require('express');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const path    = require('path');
const compiler = require('./compiler.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
/*
 * when you have to create a server to run a project
 * you can new developBase to make a service
 * and you have to hand it a path to make it know where the project in;
 */
class developBase {
	constructor(src) {
		console.log('> start make a development envirenment')
		this.conf = require('../' + src + '/webpack.config.json') || {};
		this.app = express();
		this.merge(src);
		this.entryConcat();
		this.compiler = webpack(this.base);
		this.useMiddleware();
		this.makeStatic(src);
		var port = this.findPort();
		this.app.listen(port)
		this.devMiddleware.waitUntilValid(()=>{
			console.log('> Listening at localhost:'+port)
		})
	}
	merge(src){
		var base=compiler(src);
		this.base=merge(base,{
			devtool:'#cheap-module-eval-source-map',
			plugins:[
			/*
			 *it will replace 'process.env' to be 'development' in project
			 */
				new webpack.DefinePlugin({
					'process.env':'development'
				}),
				new webpack.HotModuleReplacementPlugin(),
				new FriendlyErrorsPlugin()
			]
		})
	}
	entryConcat() {
		var entry = this.base.entry;
		for (var key in entry) {
			entry[key].unshift('./config/development.client.js')
		}
	}
	findPort() {
		developBase.defPort = developBase.defPort || 3000;
		developBase.ports = developBase.ports || [];
		if (this.conf.port) {
			developBase.ports.push(this.conf.port);
			return this.conf.port;
		} else if (developBase.ports.length == 0) {
			return developBase.defPort;
		} else {
			return developBase.defPort++;
		}
	}
	/*
	 * if a project hava a static resource,
	 * you should make a express static src to run it in development,
	 * and in production way , this static will copy to the dist
	 */
	makeStatic(src) {
		if (this.conf.static) {
			this.conf.static.forEach((i) => {
				this.app.use(
					'/js/' + i,
					express.static(path.resolve(__dirname, '../' + src + '/static/' + i))
				);
			})
		}
	}
	/*
	 * devMiddleware can make your project run in browser
	 * hotMiddleware can make your project update by save it
	 */
	useMiddleware() {
		this.devMiddleware = DEV_MID(this.compiler, {
			publicPath: "/",
			logLevel:'silent',//set silent will hide log
			quiet:true
		})
		this.hotMiddleware = HOT_MID(this.compiler, {
			log(){},
			path:"/__webpack_hmr"
		})
		this.app.use(this.devMiddleware)
		this.app.use(this.hotMiddleware)
	}
}
module.exports = developBase;