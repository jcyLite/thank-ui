const path=require('path');
function resolve (dir) {
  return path.join(__dirname, '..','..', dir)
}
module.exports=function(conf){
	var styleLoaders=require('./style-loaders')(conf);
	var vueLoaderConfig=require('./vue-loader.conf.js')(conf)
	var loaders=[{
		test: /\.ejs$/,
		use: {
			'loader': 'ejs-loader'
		},
		exclude: /node_modules/
	},{
		test:/\.ts$/,
		use:{
			"loader":'ts-loader'
		},
		exclude: /node_modules/
	},{
		test:/\.vue$/,
		loader: 'vue-loader',
    	options: vueLoaderConfig,
    	exclude: /node_modules/
	},{
		test: /\.html|.tpl$/,
		use: {
			'loader': "jcy-loader"
		},
		exclude: /node_modules/
	}, {
		test: /\.js$/,
	    exclude: /(node_modules)/,
	    use: [{
	      loader: 'babel-loader',
	      options: {
	        presets: ['es2015'],
	        plugins: [
	       	  "transform-object-rest-spread",
	          'syntax-dynamic-import',
	          'transform-async-to-generator',
	          'transform-regenerator',
	          'transform-runtime'
	        ],
	        "compact": false
	      }
	    }]
	}, {
		test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit:1000,
			name:"./images/[name].[ext]"
		}
	}, {
		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		loader: 'url-loader',
		options:{
			limit:1000,
			name:"./voice/[name].[ext]"
		}
	}, {
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options:{
			limit:1000,
			outputPath:"./fonts",
			publicPath:"../fonts",
			name:"[name].[ext]"
		}
	}];
	return loaders.concat(styleLoaders);
}
