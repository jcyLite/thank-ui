process.env.NODE_ENV='production';
const conf=require('../components/webpack.config.json');
const compiler=require('./compiler.js');
const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge');
const ora = require('ora');
const jcyFs=require('jcy-fs')
var webpackConfig=compiler('components','lib');
var entry=webpackConfig.entry;
webpackConfig.plugins.shift();
webpackConfig.output={
	filename: "./index.js",
	path: path.resolve(__dirname,"../lib"),
	library:'vue-hzf5-package',
	libraryTarget:'umd'
}
for(var key in entry){
	entry[key].unshift('./config/production.entry.js')
}
function buildPack(webpackConfig,callback) {
var spinner = ora('building for uncompressed files...')
spinner.start()
webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) {
      throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
    callback&&callback()
})
}
buildPack(webpackConfig,function(){
console.log('build success')
})