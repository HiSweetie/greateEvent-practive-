$(function() {
    const options = {
        // aspectRatio: 16 / 9,
        aspectRatio: 1,
        viewMode: 1,
        preview: ".preview",
        crop: function(e) {
            // console.log(99);
        }
    };
    $("#avatar").cropper(options);
    $("#chooseImg").on("click", function() {
        $("#inputFile").click();
    });
    $("#inputFile").on("change", function(e) {
        if (e.target.files.length === 0) {
            console.log(e.target.files.length);
            return layui.layer.msg("未选择图片!");
        }
        let userImg = URL.createObjectURL(e.target.files[0]);
        console.log("新选择图片的src地址：" + userImg);
        $("#avatar").cropper("destroy").attr('src', userImg).cropper(options);
    })
    $("#uploadAvatar").on("click", function() {
        var dataURL = $("#avatar").cropper("getCroppedCanvas", {
            width: 100,
            height: 100
        }).toDataURL("image/png");
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui, layer.msg("更换头像失败");
                }
                layui.layer.msg("更换成功");
                window.parent.getUserInfo();
            }
        })

    })
})