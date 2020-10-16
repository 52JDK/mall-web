const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?'./' : './',
    outputDir: `dist/${process.env.NODE_ENV}`,
    assetsDir: 'static',
    lintOnSave: false,
    filenameHashing: true,
    productionSourceMap: false,
    // ...
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip', // 使用gzip压缩
                test: /\.js$|\.html$|\.css$/, // 匹配文件名
                filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
                minRatio: 1, // 压缩率小于1才会压缩
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
            }),
        ],
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            }
        }
    },

    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()

        // set preserveWhitespace
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options.compilerOptions.preserveWhitespace = true
            return options
          })
          .end()

        config
          .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
          )

        config
          .when(!0,
            config => {
              config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                // `runtime` must same as runtimeChunk name. default is `runtime`
                  inline: /runtime\..*\.js$/
                }])
                .end()
              config
                .optimization.splitChunks({
                  chunks: 'all'
                })
              config.optimization.runtimeChunk('single')
            }
          )
      },
    devServer:{
      open: true,
      port: 8066,
      disableHostCheck: true,
    },


}
