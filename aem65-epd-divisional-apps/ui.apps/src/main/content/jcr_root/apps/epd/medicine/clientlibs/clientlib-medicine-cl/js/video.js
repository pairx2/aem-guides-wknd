$(document).ready(function () {
  /*
  Auto playing video without interaction causes error
  Listen to first click event, trigger  video play
  */
  function playVideo () {
    // Query the video player that has auto play only 
    document.querySelectorAll('.a-video[data-autoplay="true"] video').forEach(function(video){
      setTimeout(function() {
        video.play();
        // remove listener once video is played.
        document.removeEventListener('click',playVideo, false);
      }, 1000);
    });
  }
  document.addEventListener('click',playVideo, false);
});