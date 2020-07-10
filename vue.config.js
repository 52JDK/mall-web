const path = require('path')

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
    configureWebpack: {
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
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
      port: 8066
    }

}