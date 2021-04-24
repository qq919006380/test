const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");




function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },

    module: {
        // loaders: [
        //     {
        //         // this should be /\.handlebars$/
        //         test: /\.hbs$/,
        //         exclude: /(node_modules)/,
        //         loader: 'handlebars-loader'
        //     }
        // ],
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                loader: 'babel-loader',
                options: {
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import"
                    ]
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.less$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'vue-style-loader',
                    'css-loader',
                    "less-loader"
                ],

            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         // MiniCssExtractPlugin.loader,
            //         'vue-style-loader',
            //         'css-loader',
            //         "scss-loader"
            //     ],

            // },

            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'resourse/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(ttf|woff|svg|eot|ttf)\??.*$/,
                loader: 'file-loader',
                options: {
                    limit: 1000,
                    name: 'resourse/[name].[hash:7].[ext]'
                }
            },


        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            title: '手搭 Vue 开发环境'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('/src'),
        }
    },

}