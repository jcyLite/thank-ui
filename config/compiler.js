const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const webpack = require('webpack');
const rules = require('./loaders');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const PostCompilePlugin = require('webpack-post-compile-plugin')
function dist() {
	return process.env.OUTPUT == 'cordova'?'../cordova/www':'../dist';
}
module.exports = function(src) {
	var conf = require('../' + src + '/webpack.config.json');
	conf.src = src;
	return {
		target: 'web',
		mode: 'development',
		entry: {
			index: ['./' + src + '/index.js']
		}, //入口JS
		output: {
			filename: "./js/[name].js",
			path: path.resolve(__dirname, dist())
		},
		resolve: {
			alias: {
				'%': path.resolve(__dirname, '../public'),
				'$': path.resolve(__dirname, '../public'),
				'@': path.resolve(__dirname, '../' + src),
				'vue$': 'vue/dist/vue.esm.js'
			},
			// 省略后缀
			extensions: ['.js', '.less', '.tpl', '.json', '.css', '.vue']
		},
		module: {
			noParse: /es6-promise\.js$/,
			rules: rules(conf)
		},
		plugins: [
			new PostCompilePlugin(),
			new HtmlWebpackPlugin({
				template: './' + src + '/index.html', // 模板文件           
				filename: 'index.html',
				env: isDev ? 'development' : 'production',
				chunks:['vendor','utils','index'],
				chunkSortMode:'manual',
				inject:true,
				minify: {
					minimize: false,
					removeConments: false, //remove the note in html
					collapseWhitespace: false // delete the white and space
				}
			}),
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename:"css/[name].[chunkhash:8].css",
				chunkFilename:"css/[id].css"
			}),
			new CleanWebpackPlugin(['dist', 'build'], {
				verbose: false
			})
		]
	}
}