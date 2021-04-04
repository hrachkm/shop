const {VueLoaderPlugin} = require('vue-loader')
require('babel-polyfill')

module.exports = {
    entry: ['babel-polyfill', './src/views/components/index.js'],
    output:{
        path: __dirname + "/src/public/js",
        filename: "build.js"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{ 
                    loader: "babel-loader"
                }
            },
            {
                test: /.vue$/,
                use:{
                    loader: "vue-loader"
                }
            },
            {
                test:/.png$/,
                use:{
                    loader: "file-loader"
                }
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    resolve: { 
        alias: { 
            'vue-full': 'vue/dist/vue.esm.js' 
        } 
    }
}