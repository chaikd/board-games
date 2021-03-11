const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const buildDir = path.resolve(__dirname, './dist');

// 获取所有的入口文件
let chunks = [];
let getentries= function () {
  var entryFiles = glob.sync('./src/**/index.{js,ts}');
  var map = {};
  for (var i = 0; i < entryFiles.length; i++) {
      let filePath = entryFiles[i];
      if(filePath == './src/index.js') {
          map['index'] = filePath;
          chunks.push('index');
      }else {
          const fileArr = filePath.split('/');
          fileArr[3] = fileArr[3].split('.')[0];
          let filename = `${fileArr[2]+'/'+fileArr[3]}`;
          map[filename] = filePath; 
          chunks.push(filename)
      }
  }
  return map;
}
let entries = getentries();

// 获取所有的模板
let htmlPluginConfigs = [];
let getHtml = function(){
	let htmls= glob.sync('./src/**/index.html');
    let conf;
	for(var i = 0; i < htmls.length; i++){
        conf = {
            filename: chunks[i]+'.html',
            template: htmls[i],
            inject: 'body',
            chunks: [chunks[i]],
            minify: false,
            title: chunks[i]
        };
        if (process.env.NODE_ENV === 'production') {
            conf.hash = true;
        }
        htmlPluginConfigs.push(new HtmlWebpackPlugin(conf));
	}
}
getHtml();

module.exports = {
    devServer: {
        contentBase: './dist',
        port: '4202',
        open: true
    },
    mode: 'production',
    entry: entries,
    output: {
        path: buildDir,
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[chunkhash]',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use:{
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env'],
            //             plugins: [
            //                 require('@babel/plugin-proposal-class-properties')
            //             ]
            //         }
            //     }
            // },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        ...htmlPluginConfigs,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: './src/assets', to: path.resolve(buildDir,'assets')}
            ]
        })
    ]
}