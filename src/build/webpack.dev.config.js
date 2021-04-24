const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const package = require('../package.json');

module.exports = merge(webpackBaseConfig, {
    //配置服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        overlay: true,
        // contentBase: "./",
        // port: 8080,
        proxy: {
            // web服务
            "/web": {
                // target: 'http://192.168.0.127:8080', // 龙
                // target: 'http://192.168.0.135:8081', // dm
                // target: 'http://192.168.0.141:8080', // lin
                // target: 'http://192.168.0.121:8080', // wei
                // target: 'http://192.168.0.127:8080', // zyk
                // target: 'http://192.168.0.151:8080', // hjh
                // target: 'http://192.168.0.186:8080', // wu
                // target: 'http://192.168.0.180:8080', // chen
                target: 'http://192.168.0.202:8038', // 202
                // target: 'https://t202.maijju.com:6082', // 202 外网
                // target: 'https://adm_t.maijju.com', // 202 外网
                // target: 'https://adm_yl.maijju.com/', // 202 外网
                // target: 'http://192.168.0.190:8080',
                pathRewrite: {
                    // '^/web': '/web',
                    '^/web': '/appweb',
                },
                changeOrigin: true,
                secure: false,
                onProxyRes: function (proxyRes, req, res) {
                    console.log(req.url + " ====> " + req.originalUrl);
                    var cookies = proxyRes.headers['set-cookie'];
                    // var cookieRegex = /Path=\/web/i;
                    var cookieRegex = /Path=\/appweb/i;
                    // 修改cookie Path
                    if (cookies) {
                        var newCookie = cookies.map(function (cookie) {
                            if (cookieRegex.test(cookie)) {
                                return cookie.replace(cookieRegex, 'Path=/');
                            }
                            return cookie;
                        });
                        //修改cookie path
                        delete proxyRes.headers['set-cookie'];
                        proxyRes.headers['set-cookie'] = newCookie;
                    }
                }
            },
            // 微服务
            "/micro-web": {
                // target: 'http://192.168.0.109:22012', // xiaowei
                target: 'https://t202.maijju.com:6082', // 202
                // target: 'https://adm_yl.maijju.com', // 202
                changeOrigin: true,
                secure: false,
            },
            // 微服务
            "/micro-com-rest": {
                // target: 'http://192.168.0.109:22013', // xiaowei
                target: 'https://t202.maijju.com:6082', // 202
                // target: 'https://adm_yl.maijju.com', // 202
                changeOrigin: true,
                secure: false,
            },
            // rest服务
            "/services": {
                // target: 'http://192.168.0.183:8118', // 小五
                // target: 'http://192.168.0.190:8118', // 小余
                // target: 'http://192.168.0.180:8118', // 小陈
                // target: 'http://192.168.0.135:8118', // 小黄
                // target: 'http://192.168.0.121:8118', // 伟伟
                // target: 'http://192.168.0.141:8118', // 小林
                // target: 'http://192.168.0.202:8118', //
                target: "https://t202.maijju.com:6082/",
                // target: "https://abao.maijju.com/",
                pathRewrite: {
                    '^/services': '/services'
                },
                changeOrigin: true,
                secure: false,
            }
        },

    },
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin([{
            from: 'src/views/main-components/text-editor/tinymce'
        }], {
            ignore: [
                'text-editor.vue'
            ]
        })
    ]
});