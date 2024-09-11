jQuery(document).ready(function(){
	jQuery('.adc-list').click(function(){
		let screenSize= jQuery(window).width(); 
		if (screenSize <= 1199){
            jQuery(this).find('.adc-link-list__icon').toggleClass('show');
			jQuery("ul", this).toggle();
		}
    });
	jQuery('.adc-list-v2').click(function(){
		let screenSize= jQuery(window).width(); 
		if (screenSize <= 1199){
            jQuery(this).find('.cordin_icon').toggleClass('show');
			jQuery("ul", this).toggle();
		}
    });
});