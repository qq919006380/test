const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const serverEnv = require("../src/config/server.env.dev.js")
const mock = require('./mockApi.js')
console.log(serverEnv.env)

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        proxy: {
            '/apiss': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
        before: (app) => {
            if (serverEnv.env == "local-mock") {
                mock(app)
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
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