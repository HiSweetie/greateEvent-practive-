$(function() {
    getUserInfo();
    $("#btn_loginout").on("click", function() {
        layer.confirm('要退出登录吗?', { icon: 4, title: '退出登录' }, function(index) {
            layer.close(index);
            location.href = "login.html";
            localStorage.clear();
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                // console.log(res.status);
                return layui.layer.msg("获取用户信息失败！")
            }
            console.log(res);
            renderAvater(res.data);
        }
    })
}

function renderAvater(userInfo) {
    var name = userInfo.nickname || userInfo.username;
    // 设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    console.log(typeof(name));
    console.log(name[0]);
    // 渲染图片
    if (userInfo.user_pic !== null) {
        $(".layui-nav-img").attr('src', userInfo.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}