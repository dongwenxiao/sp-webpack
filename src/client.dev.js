const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const common = require('./common')

module.exports = (appPath, port) => ({
    target: 'web',
    entry: [
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.resolve(appPath, './src/client')
    ],
    output: {
        filename: 'client.js',
        chunkFilename: '[id].[name].chunk.js',
        path: appPath + '/dist',
        publicPath: `http://localhost:${port}/dist/`
    },
    module: {
        rules: [...common.rules]
    },
    plugins: [
        new webpack.DefinePlugin({
            '__CLIENT__': true,
            '__SERVER__': false,
            '__DEV__': true
        }),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ...common.plugins
    ]
})
