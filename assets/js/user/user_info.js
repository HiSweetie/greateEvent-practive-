$(function() {
    getUserInfo();

    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                // console.log(res.data);
                layui.form.val("setUserInfo", res.data);
                // console.log(99);
            }
        });
    }
    $("#resetBtn").on("click", function(e) {
        e.preventDefault();
        getUserInfo();
    })
})