const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //根路径
  // outputDir:'dist',//打包的时候生成的一个文件名
  assetsDir: 'assets', //静态资源目录(js,css,img,fonts)这些文件都可以写里面
  lintOnSave: false, //是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
  productionSourceMap: false,
  // productionGzip: true,
  devServer: {
    // open:true,//启动项目后自动开启浏览器
    host: 'localhost', //对应的主机名
    port: 8080, //端口号
    https: false, //是否开启协议名,如果开启会发出警告
    hotOnly: false, //热模块更新的一种东西,webpack中自动有过配置,但如果我们下载一些新的模块可以更好的给我更新一些配置
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('src', resolve('src'))
    // .set('api', resolve('src/api'))

    config.output.filename('[name].[hash].js').end();

    
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: `@import "src/assets/css/resources.scss";`
        // data: fs.readFileSync('src/assets/css/resources.scss', 'utf-8')
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    // externals: {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'element-ui': 'ELEMENT',
    // }
  }
}