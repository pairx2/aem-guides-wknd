    $('.video-thumbnail').click(function(){
    $('.video-thumbnail').hide();
    var videoURL = $('#yt-').prop('src');
	videoURL += "&autoplay=1";
	$('#yt-').prop('src',videoURL);
});