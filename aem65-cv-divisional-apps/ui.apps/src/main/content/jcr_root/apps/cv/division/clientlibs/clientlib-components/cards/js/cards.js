var stopVideos = function () { 

    var videos = document.querySelectorAll('[data-js-component="cards"] iframe,[data-js-component="video"] video');    
    Array.prototype.forEach.call(videos, function (video) {        
        if (video.tagName.toLowerCase() === 'video') {           
            video.pause();        
        } else {           
            var src = video.src;            
            video.src = src;        
        }
    });
};


