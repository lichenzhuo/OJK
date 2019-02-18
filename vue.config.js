const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',//根路径
  // outputDir:'dist',//打包的时候生成的一个文件名
  assetsDir:'assets',//静态资源目录(js,css,img,fonts)这些文件都可以写里面
  lintOnSave:false,//是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
  productionSourceMap: false,
  devServer:{
      // open:true,//启动项目后自动开启浏览器
      host:'localhost',//对应的主机名
      port:8080,//端口号
      https:false,//是否开启协议名,如果开启会发出警告
      hotOnly:false,//热模块更新的一种东西,webpack中自动有过配置,但如果我们下载一些新的模块可以更好的给我更新一些配置
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('src', resolve('src'))
      // .set('api', resolve('src/api'))
 
    config.output.filename('[name].[hash].js').end();
  },


}