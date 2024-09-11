$(document).ready(function () {
    
    // ph-nutirtional-info 
    let ph_nutritional_info = $('#ph-nutritional-info');
    ph_nutritional_info.each(function() {
		let that = $(this);

        that.find('button.coll-exp-title').on('click',function() {
			$(this).parent().toggleClass('custom-layout');
            $(this).parents(that).find('.m-accordion__content-items').toggleClass('custom-layout');
        });

        that.find('button.m-accordion__icon-wrapper').on('click',function() {
            $(this).parents(that).find('.m-accordion__options').toggleClass('custom-layout');
            $(this).parents(that).find('.m-accordion__content-items').toggleClass('custom-layout');
        });
    });
});