const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');
const package = require('../package.json');

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            exclude: ['global.js']
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: '后台管理系统 v' + package.version,
            favicon: './favicon.ico',
            filename: './index.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/text-editor/tinymce',
                to:"js"
            },
            {
                from: 'for_build',
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ]
});