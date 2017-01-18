const path = require('path')
const webpack = require('webpack')
const common = require('./common')

module.exports = (appPath, port) => ({
    target: 'web',
    devtool: 'source-map',
    entry: [
        path.resolve(appPath, './src/client')
    ],
    output: {
        filename: 'client.js',
        chunkFilename: '[id].[name].chunk.js',
        path: appPath + '/dist/public/client',
        publicPath: '/client/' // TODO 改成静态第三方URL用于CDN部署 http://localhost:3000/
    },
    module: {
        rules: [...common.rules]
    },
    plugins: [
        // 在node执行环境中设置，不起作用，此处不能省略
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({
            '__CLIENT__': true,
            '__SERVER__': false,
            '__DEV__': false
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        ...common.plugins,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            beautify: false,
            comments: false,
            sourceMap: true
        })
    ],
    resolve: common.resolve
    // externals: ['react'] // 尝试把react单独已js引用到html中，看看是否可以减小体积
})
