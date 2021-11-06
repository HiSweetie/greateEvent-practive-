$(function() {
    var layer = layui.layer;
    var form = layui.form;
    (function() {
        $("#toLogin").on("click", function() {
            $(".regBox").css("display", "none");
            $(".loginBox").css("display", "block");
        })
        $("#toReg").on("click", function() {
            $(".regBox").css("display", "block");
            $(".loginBox").css("display", "none");
        })
    })();
    (function() {
        form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(val) {
                let pwd = $(".regBox input[name='password']").val()
                if (val !== pwd) {
                    // return console.log("两次密码不一致");
                    return "两次密码输入不一致"
                }
            }
        })
    })()
    $("#regForm").on("submit", function(e) {
        e.preventDefault();
        $.post("http://api-breakingnews-web.itheima.net/api/reguser", {
            username: $(".regBox input[name='userName']").val(),
            password: $(".regBox input[name='password']").val()
        }, function(res) {
            // if (res.status === 0) {
            //     console.log("注册成功！");
            //     return console.log(res.message);
            // } else {
            //     return console.log(res.message);
            // }
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录', {
                // icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function() {
                $("#toLogin").click();
            });

        });

    });
    (function() {
        // 监听登录表单的提交事件
        $("#loginForm").submit(function(e) {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: "http://api-breakingnews-web.itheima.net/api/login",
                // 快速获取表单中的数据
                data: $("#loginForm").serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        console.log($("#loginForm").serialize());
                        console.log(res.message);
                        return layer.msg("登录失败！");
                    }
                    layer.msg("登录成功");
                    localStorage.setItem("token", res.token)
                        // console.log($("#loginForm").serialize());
                    location.href = "/index.html";
                }
            });
        });
    })()
})