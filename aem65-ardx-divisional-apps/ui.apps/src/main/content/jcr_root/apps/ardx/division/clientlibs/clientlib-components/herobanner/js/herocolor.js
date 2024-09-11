$(document).ready(function() {
    $('.m-hero').each(function() {
        let bgColor = $(this).find('.m-hero__content').attr("data-bgcolor");
        if($(window).width() < 991.98) {  
				if(bgColor){						
                    $(this).find('.hero-color .m-hero__content ').css("background-color", bgColor);
                }
                let preColor = $(this).find('.m-hero__title').attr("data-precolor");
                if(preColor) {
                    $(this).find('.hero-color .m-hero__title').css("color", preColor);
                }
                
                let titleColor = $(this).find('.m-hero__header').attr("data-titlecolor");
                if(titleColor) {
					$(this).find('.hero-color .m-hero__header').css("color", titleColor);
                }
				
				let subTitleColor = $(this).find('.m-hero__subtitle').attr("data-subtitlecolor");
				if(subTitleColor) {
					$(this).find('.hero-color .m-hero__subtitle').css("color", subTitleColor);
                }
					
				let descrColor = $(this).find('.m-hero__body').attr("data-descriptioncolor");		
				if(descrColor){
					$(this).find('.hero-color .m-hero__body').css("color", descrColor);	
				}                      
        }
        else {
            	$(this).find('.hero-color .m-hero__media').css("background-color", bgColor);
            
        }
    });
});