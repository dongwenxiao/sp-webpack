const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const appPath = process.cwd()

// 执行顺序，从右到左
const rules = [{
    test: /\.json$/,
    loader: 'json-loader'
}, {
    test: /\.css$/,
    loader: 'sp-css-loader?length=4&mode=replace!postcss-loader'
}, {
    test: /\.png$/,
    loader: 'url-loader?limit=1&name=./images/[hash:5].[ext]'
}, {
    test: /\.(ico|gif|jpg|jpeg|svg|webp)$/,
    loader: 'file-loader?context=static&name=/[path][name].[ext]',
    exclude: /node_modules/
}, {
    test: /\.(js|jsx)$/,
    use: [{
        loader: 'babel-loader'
    }]
}]

// 执行顺序，
const plugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function() {
                return [
                    // https://github.com/postcss/postcss-import
                    // postcssImport({
                    //     addDependencyTo: webpack
                    // }),
                    autoprefixer({ browsers: ['last 2 versions'] })
                ]
            }
        }
    })
]

const resolve = {
    modules: [
        'node_modules',
        path.resolve(appPath, './src/server/modules')
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.gcss']
}

const needBabelHandleList = [
    'sp-base',
    'sp-boilerplate',
    'sp-css-import',
    'sp-css-loader',
    'sp-mongo',
    'sp-react-isomorphic'
]

module.exports = {
    rules,
    plugins,
    resolve,
    needBabelHandleList
}