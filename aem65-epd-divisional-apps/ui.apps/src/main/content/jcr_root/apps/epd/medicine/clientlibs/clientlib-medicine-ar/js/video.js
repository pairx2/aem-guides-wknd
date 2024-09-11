$(document).ready(function () {
  function playVideo () {
    document.querySelectorAll('.a-video[data-autoplay="true"] video').forEach(function(video){
      setTimeout(function() {
        video.play();
        document.removeEventListener('click',playVideo, false);
      }, 1000);
    });
  }
  document.addEventListener('click',playVideo, false);
});