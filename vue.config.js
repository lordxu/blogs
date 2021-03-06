const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/static' : '',
    configureWebpack: {
        devServer: {
            proxy: {
                "/action": {
                    target: 'http://localhost:3001'
                },
                "/api": {
                    target: 'http://localhost:3001'
                },
            }
        }
    },
    // 直接在config里面改好像不行
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(path.resolve('./src/assets'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.resolve('./src/assets'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.plugin('html')
            .tap(args => {
                args[0].template = path.resolve('./src/index.html');
                return args;
            })
    }
}
