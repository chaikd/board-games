//服务端口
const PORT=4201;
//启动服务的根目录
const server_root='src'
//引用gulp
var gulp = require('gulp');
//引用gulp开启服务的插件
var connect = require('gulp-connect');
//引用插件 gulp代理中间件插件
var proxy = require('http-proxy-middleware');

//开启服务
gulp.task('default', function() {
    connect.server({
        root: [server_root],
        port: PORT,
        livereload: true,
        // middleware: function(connect, opt) {
        //     return [
        //         proxy.createProxyMiddleware((pathName) => {
        //             return pathName.indexOf('/api')
        //         },  {
        //             target: 'http://blog.chaikd.com',//代理的目标地址
        //             changeOrigin:true,//
        //             // pathRewrite:{//路径重写规则 
        //             //     '^/api':''
        //             // }
        //         })
        //     ]
        // }

    });
});