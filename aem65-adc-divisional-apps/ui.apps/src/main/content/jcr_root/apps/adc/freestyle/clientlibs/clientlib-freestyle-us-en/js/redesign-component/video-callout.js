/**
 * videoCallOut - COMPONENT
 * for making both col same
 * for adding fallback image 
**/
const typeFullWidth = 'a-video-fullwidth';
const typeContent = 'a-video-content';
$(function () {

    const m_video_content= $('.'+typeContent);
    const m_video_full_width = $('.'+typeFullWidth);
    const getAllVideo = [...m_video_content, ...m_video_full_width];

    if (getAllVideo?.length > 0 ){

          $(getAllVideo).each(function (index) {
            const self = $(this);
            addHeroElementToVideoDiv(self, index);
            if(getAllVideo?.length == index+1){
       		// $('.a-video-content-hero-image-click')?.click(function () {bannerClicked($(this))}); // click even after all custom class added
           }

          });


    } 
   

    calcDesktopHeight();

});
const get_near_video_div = (ele) => {
    const videoRes = $(ele).find(".m-video[data-js-component='video']");
    
    return videoRes;
}

const addHeroElementToVideoDiv = (m_video_content, index) => {

    const selfType = $(m_video_content)?.hasClass(typeFullWidth) ? 'full-width': m_video_content?.hasClass(typeContent) ? 'Content' : '';
    if (!selfType) return

    const vdo =  get_near_video_div(m_video_content); 
    
    const get_content_height = selfType == 'Content' ?
     $(m_video_content).find(".col-md-5.columncontrol__column > .container") : ''; 
    const video_parent_div =  $(m_video_content).find(".video");
    const take_vide_type =  $(video_parent_div).find(".a-video__player >");
    const isPopupType = vdo?.find('.a-video')?.attr('data-playertype');
    //  const playIcon = `<div class="play_btn_video_us_redesign"><em class="abt-icon abt-icon-play2 customIcon" aria-hidden="true"></em></div>`;
    let next_heroDiv = 
    selfType == 'Content' ? video_parent_div?.next('.m-hero') : $(m_video_content)?.find('.m-hero') ;
    if (isPopupType == 'modal'){
        next_heroDiv =  $(m_video_content)?.find('.col-md-7 .m-hero');
    }
    // playIcon
   // next_heroDiv?.find('.m-hero__content')?.append(playIcon);
    next_heroDiv.addClass('a-video-content-hero-image-click');
    vdo.attr('data-video-redesign-index', 'video-call-out');
    
    vdo.attr('data-video-redesign-type', `${take_vide_type?.hasClass('a-video__dom-video') ? 'dam' :
    take_vide_type?.hasClass('brightCove-video-wrapper') ? 'brightCove-video' : take_vide_type?.hasClass('a-video__embed-video') ? 'youtube-etn' : 'rest'}`);
    vdo.addClass(m_video_content?.hasClass('a-video-content') ? 'us-redesign-a-video-content show-fallback-img' : m_video_content?.hasClass('a-video-fullwidth') ? 'us-redesign-a-video-fullwidth show-fallback-img' : '');
    if (isPopupType == 'modal') vdo.addClass('m-popup-fallback');

   
    if (take_vide_type?.length == 0){
        // empty one
        vdo.addClass('dam_empty');
      
    }
    const vdoBrightCove = vdo?.find('.vjs-error-display');
    const vdoBrightCoveErrorStyle = vdoBrightCove?.length > 0 ? window.getComputedStyle($(vdoBrightCove)[0]) : false;
    if (vdoBrightCoveErrorStyle && vdoBrightCoveErrorStyle?.display == 'block') {
        vdo.addClass('brightcove_video_error');
    }
  
    if (selfType == 'Content' && window.innerWidth > 992) {
        const content_height = get_content_height?.height() ?  Math.round(get_content_height?.height())  : 0;
        if (content_height) {
		 next_heroDiv?.css('--hero-desktop-tall-height', `${content_height -1.4}px`);
         vdo?.find('.a-video__player')?.css('height', `${content_height -1.4}` + 'px');
         vdo?.find('.a-video__player >')?.css('height', `${content_height -1.4}`+'px');
        }

    }
    next_heroDiv?.detach();
    vdo?.append(next_heroDiv);

}


const bannerClicked = (self) => {
    const self_section = $(self);
    const parent_selector = self_section?.closest(".us-redesign-a-video-content");
    parent_selector?.removeClass('show-fallback-img');
    const iFrame = parent_selector?.find('iframe');
    const iVideo = parent_selector?.find('video');
    iFrame && iFrame?.length > 0 && playYoutube(iFrame);
    iVideo && iVideo?.length > 0 && videoTag(iVideo);
    

}
const playYoutube = (iFrame) => {
    const iFrameSrc = iFrame?.attr('src');
    const autoPlaySrc = iFrameSrc?.includes('autoplay=0') ? iFrameSrc?.replace('autoplay=0', 'autoplay=1') : iFrameSrc+'?autoplay=1';
    iFrame?.attr('src', autoPlaySrc);
}

$(window).on('load', function() {
    setTimeout(function() {
        resizeYoutube();
      }, 100); // Adjust the timeout value as needed
    
});
const resizeYoutube = () => {
  $('.vjs-error-display').each(function () {
    const vdoBrightCoveErrorStyle = window.getComputedStyle($(this)[0]);
    if (vdoBrightCoveErrorStyle && vdoBrightCoveErrorStyle?.display == 'block') {
        $(this)?.closest(".a-video-fullwidth")?.find(".us-redesign-a-video-fullwidth")?.addClass('brightcove_video_error');
        $(this)?.closest(".a-video-content")?.find(".us-redesign-a-video-content")?.addClass('brightcove_video_error');
    }
  });
}




function calcDesktopHeight() {
    if (window.innerWidth < 992) {
        $('.a-video-content .col-md-5 .m-hero').css('height', '100%');
    }
}
var resizeTimer;
$(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      afterResize();
    }, 100); // Adjust the timeout value as needed
  });

  function afterResize() {
    calcDesktopHeight();
    calCresizeheroBanner();
  }

const calCresizeheroBanner = () => {
     const redesign_video_content = $('.us-redesign-a-video-content');
     if (window?.innerWidth > 992) {
        updateHeightBanner();
     } else {
        $(redesign_video_content).each(function (index) {
            $(this)?.find('.a-video__player')?.css('height', '100%');
            $(this)?.find('.a-video__player >')?.css('height', '100%');
          });
    }
         
     
}
const updateHeightBanner = () => {
    const redesign_video_content = $('.us-redesign-a-video-content');
    if (redesign_video_content?.length > 0 ) {
        $(redesign_video_content).each(function (index) {
            const self = $(this);
            checkHeight(self);
          });
    }
    
   
}
const checkHeight = (self) => {
    const redesign_video_content = self?.closest(".a-video-content")?.find(".col-md-5.columncontrol__column > .container");
    const content_height = redesign_video_content?.height() ?  Math.round(redesign_video_content?.height())  : 0;
    if (content_height) {
        self?.find('.m-hero')?.css('--hero-desktop-tall-height', `${content_height - 1.4}px`);
        self?.find('.a-video__player')?.css('height', `${content_height -1.8}` + 'px');
        self?.find('.a-video__player >')?.css('height', `${content_height -1.8}`+'px');
    }
}


