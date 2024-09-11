(function($) {
    $(document).ready(function() {
        $('.a-video__player-source').prop('loop', 'loop');
        $('.a-video__player-source').prop('muted', 'muted');
        $('.a-video__player-source').prop('autoplay', 'true');        
        setTimeout(function () {
        $(".a-video__player-source").removeAttr('controls');
        }, 1);
        $("#pageContent").addClass('parent-width');

		
        $("#section_inbox-wrapper").parent().addClass('banner-bg');
        $("#section-site-leaving-popup").parent().addClass('no-padding');
        
        $("#section-linkedin-wrapper").parent().addClass('linkedin-container');
        $("#linkedin-wrapper").addClass('linkedin');
        
        
        checkScreenSize();

        function checkScreenSize() {
            var newWindowWidth = $(window).width();
            
           
            if (newWindowWidth < 824) {
                $("#section-video-main-title").parent().addClass('no-padding');
            }
            if (newWindowWidth < 992){
                $("#section-video-main-title").parent().addClass('video-title-mobile'); 
                         
            }            
        }
        

        /*language alignment*/
        
    let ResponseURL = window.location.pathname
    let domain = ResponseURL.split('/');
    domain=(domain[domain.length-2]);

    if((domain == 'de') || (domain =='fr') || (domain == 'it') ||  (domain == 'pt') || (domain == 'es') || (domain == 'ru'))
    {
        $('#section-video-main-title .a-container__content').addClass('full-width');
    }
   if((domain == 'zh') || (domain == 'ja'))
    {
        $('#section-video-main-title .a-container__content').addClass('padding-btm-100')
    }
    
    });
})(jQuery);