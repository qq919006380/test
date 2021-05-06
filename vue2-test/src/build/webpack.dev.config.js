const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        before: require('./src/build/api.js.js')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            title: '手搭 Vue 开发环境'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],



})