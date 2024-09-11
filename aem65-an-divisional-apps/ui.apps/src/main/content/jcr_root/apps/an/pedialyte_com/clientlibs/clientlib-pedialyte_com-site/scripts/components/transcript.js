$(function() {
    let flag = 0;

    $("#transcript").on('click', function () {
        
        flag++;
        if (flag % 2 == 0) {
            $(this).find(".a-link__inner-text").text("Video Transcript");
            $("#container-transcript").css("display","none");
        }
        else {
            $(this).find(".a-link__inner-text").text("Hide Video Transcript");
            $("#container-transcript").css("display","block");
        }
    });
});

