$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // console.log(options)


    // 统一为有权限的接口设置headers请求头
    // 根据API文档要求,判断请求路径是否包含"/my"
    if (options.url.indexOf("/my/") !== 0) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 全局统一挂载complete
    options.complete = function(res) {
        console.log(res);
        // 你向ajax后台的程序发送xmlhttp请求的时候, 后台程序接到请求会进行处理,处理结束后,可以返回一串数据给前台,这个就是responseText. 
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem("token");
            location.href = '/login.html';
        }
    }
})