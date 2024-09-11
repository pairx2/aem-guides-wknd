jQuery(document).ready(function(){
    jQuery('#mobile-rewards .accordion').each(function(index,item){
       if(index == 0){
           jQuery(item).css({
            borderTop: ".063rem solid #029ce8"
        });
       }
    });
});
jQuery('#expand').click(function(){
    var boldEle= jQuery(this).find('b');
    var spanELe= jQuery(this).find('span');
    if(boldEle.length ? boldEle.text() == "Expand All":"" || spanELe.length ? spanELe.text() == "Expand All":""){
        boldEle.length ? boldEle.text('Collapse All'):"" || spanELe.length ? spanELe.text('Collapse All'):""
        jQuery('.accordion__header').removeClass('collapsed');
        jQuery('.accordion__body').addClass('show'); 
    } else{
        boldEle.length ? boldEle.text('Expand All'):"" || spanELe.length ? spanELe.text('Expand All'):""
        jQuery('.accordion__header').addClass('collapsed');
        jQuery('.accordion__body').removeClass('show');
    }
});
jQuery('a[href="#iphone1"]').click(function(e){
	e.preventDefault();
	jQuery('#mobile-rewards :nth-child(1 of .accordion) .accordion__header').removeClass('collapsed').attr('aria-expanded','true');

	jQuery('#mobile-rewards :nth-child(1 of .accordion) .accordion__body').addClass('show');
});
jQuery('a[href="#android1"]').click(function(e){
	e.preventDefault();
	jQuery('#mobile-rewards :nth-child(2 of .accordion) .accordion__header').removeClass('collapsed').attr('aria-expanded','true');

	jQuery('#mobile-rewards :nth-child(2 of .accordion) .accordion__body').addClass('show');
});

jQuery('.accordion__header').click(function(){
    if(jQuery(this).hasClass('collapsed')){
        jQuery(this).removeClass('collapsed')
        jQuery(this).next('.accordion__body').addClass('show');
    } else {
        jQuery(this).addClass('collapsed')
        jQuery(this).next('.accordion__body').removeClass('show');
    }
});
