jQuery(document).ready(function(){
    
    let windowWidth = window.innerWidth;
    
    // get active offset and scroll left
    if(jQuery('.h-nav-list__item').hasClass('h-nav-list__item--active')){
        let offset = jQuery('.h-nav-list__item--active').offset();
        let offsetLeft = offset.left;
        
        if(offsetLeft > (windowWidth-100)){
            jQuery('.h-nav-list').animate({scrollLeft: (offsetLeft-(windowWidth/2))}, 1000);
        }
    }
    

    // show hide shorten field for mobile
    let listItems = jQuery(".h-nav-list__item");
    if(windowWidth < 600){
        listItems.each(function(idx, list) {
            if(jQuery(list).find('.h-nav__text--mb').text() == ''){
                jQuery(list).find('.h-nav__text--mb').hide();
                jQuery(list).find('.h-nav__text--lg').show();
            }
        });
    }
    // /show hide shorten field for mobile

});
