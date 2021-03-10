const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const buildDir = path.resolve(__dirname, './dist')

module.exports = {
    devServer: {
        // contentBase: './dist',
        port: '4202',
        open: true
    },
    mode: 'production',
    entry: {
        'three-boards/index': './src/three-boards/index.js'
    },
    output: {
        path: buildDir,
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
    },
    // resolve: ['.js', 'ts'],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
}