$(document).on('ready',function () {
    
    // Set the Open / close Icons
    $('.m-accordion--v1').find('.abt-icon-plus-bold').parent('.m-accordion-icon').addClass('icon-visible');
    $('.m-accordion--v1').find('.abt-icon-minus-bold').parent('.m-accordion-icon').removeClass('icon-visible');
    
    // Initial close for accordion content    
    $('.m-accordion--v1').find('.m-accordion__body').removeClass('show');
    $('.m-accordion--v1').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
    $('.m-accordion--v1').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');  
    
    // Expand Single Accordion Only
    $('.m-accordion--v1').find('.m-accordion__header').click(function() {
        
        setTimeout(()=>{
                   if($(this).find('.m-accordion__icon-wrapper').attr('aria-expanded') === 'true') {
            
            $('.m-accordion--v1').find('.m-accordion__body').removeClass('show');
            $('.m-accordion--v1').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
            $('.m-accordion--v1').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');
            
            $('.m-accordion--v1').find('.abt-icon-plus-bold').parent('.m-accordion-icon').addClass('icon-visible');
            $('.m-accordion--v1').find('.abt-icon-minus-bold').parent('.m-accordion-icon').removeClass('icon-visible');
            
            $(this).parents('.m-accordion--v1').find('.m-accordion__body').removeClass('show');
            $(this).parents('.m-accordion--v1').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
            $(this).parents('.m-accordion--v1').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');
            $(this).parents('.m-accordion--v1').find('.abt-icon-plus-bold').parent('.m-accordion-icon').removeClass('icon-visible');
            $(this).parents('.m-accordion--v1').find('.abt-icon-minus-bold').parent('.m-accordion-icon').addClass('icon-visible');
            
        } else {
            $('.m-accordion--v1').find('.m-accordion__body').removeClass('show');
            $('.m-accordion--v1').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
            $('.m-accordion--v1').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'expand');
            
            $('.m-accordion--v1').find('.abt-icon-plus-bold').parent('.m-accordion-icon').addClass('icon-visible');
            $('.m-accordion--v1').find('.abt-icon-minus-bold').parent('.m-accordion-icon').removeClass('icon-visible');
            
            $(this).parents('.m-accordion--v1').find('.m-accordion__icon-wrapper').attr('aria-expanded', 'true');
            $(this).parents('.m-accordion--v1').find('.m-accordion__icon-wrapper span').attr('data-toggle', 'collapse');
        }
    }, 0);
    
}); 

});
