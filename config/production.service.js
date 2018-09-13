const conf=require('../src/webpack.config.json');
const processArgs=require('process.args')();
console.log(processArgs);
const compiler=require('./compiler.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge')
var base=compiler('src');
var entry=base.entry;
for(var key in entry){
	entry[key].unshift('./config/production.entry.js')
}
var statics=[];
if(conf.static){
	conf.static.forEach((i)=>{
		statics.push({
			from:'./src/static/'+i,
			to:'./js/'+i
		})
	})
}
base.plugins.push(new CopyWebpackPlugin(statics)) 
module.exports=merge(base,{
	plugins: [
	    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
	],
	optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'initial',
                    name: 'utils',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                },
                styles:{
                	name:'styles',
                	test:/\.css$/,
                	chunks:'all',
                	enforce:true
                }
            }
        }
   }
});
