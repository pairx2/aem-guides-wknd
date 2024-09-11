
$(document).ready(function () {

    // custom video width play button
	let customVideoContainer = $(".custom-video-container");
    let customVideoImage = $(".custom-video-container .image");
    customVideoImage.click(function() {
        $(this).hide();
        $(this).closest(customVideoContainer).find(".a-video__player-source").get(0).play();
        $(this).closest(customVideoContainer).find(".a-video__player-source").attr('controls',true);
    });
});