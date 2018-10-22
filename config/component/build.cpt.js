process.env.NODE_ENV='production';
const conf=require('../../src_component/webpack.config.json');
const compiler=require('../compiler.js');
const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge');
const ora = require('ora');
const jcyFs=require('jcy-fs')
var webpackConfig=compiler('src_component','dist_cpt');
var entry=webpackConfig.entry;
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
   jcyFs.copyDir(
   		path.resolve(__dirname,'../../dist_cpt'),
   		path.resolve(__dirname,'../../document/static/dist')
   	,to)
  if(conf.static){
    var from=path.resolve(__dirname,'../../src_component/static')
    var output_path=webpackConfig.output.path;
    var to=output_path+'/static';
    jcyFs.copyDir(from,to)
  }
})