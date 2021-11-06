const path = require('path')
module.exports = {  
    module: {
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
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    "less-loader"
                ],

            },
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
                    esModule: false,
                    limit: 1000,
                    name: 'resourse/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(ttf|woff|svg|eot|ttf)\??.*$/,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    limit: 1000,
                    name: 'resourse/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '../src') ,
        }
    },

}