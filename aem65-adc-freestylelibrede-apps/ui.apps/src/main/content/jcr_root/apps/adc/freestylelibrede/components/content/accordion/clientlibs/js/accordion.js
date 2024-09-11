jQuery(document).ready(function(){	
	    // accordion outer
    jQuery('.level-0-accordion').find('h5').click(function(){
        jQuery('.level-0-accordion > h5 > .adc-icon').removeClass('rotate-180');
        if (jQuery(this).parents('.level-0-accordion').hasClass('active')){
            jQuery('.level-0-accordion').removeClass('active');
            jQuery(this).parents('.level-0-accordion').removeClass('active');
        }else{
            jQuery(this).parents('.level-0-accordion').addClass('active');
            jQuery(this).find('.adc-icon').addClass('rotate-180');
            jQuery('.level-0-accordion').removeClass('active');
            jQuery(this).parents('.level-0-accordion').addClass('active');       
        }
    });
})