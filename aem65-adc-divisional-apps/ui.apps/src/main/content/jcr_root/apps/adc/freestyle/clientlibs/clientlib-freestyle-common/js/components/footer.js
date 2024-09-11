/**
 * FOOTER - COMPONENT
 **/

$(function () {
    let isMob = isMobile();
	
    if (!isMob) {
        //Footer columns declaration depending on no of sublinks
        $('.o-footer__link-wrapper .m-link-stack--content').each(function(){
            const section_length = $(this).find('li.a-link').length;
            if(section_length > 4 && section_length <= 8){
                $(this).addClass('m-link-stack--content__two-column');
                $(this).closest('.o-footer__link-wrapper').removeClass('col-lg-2').addClass('col-lg-4');
            }
            else if(section_length > 8 && section_length <= 12){
                $(this).addClass('m-link-stack--content__three-column');
                $(this).closest('.o-footer__link-wrapper').removeClass('col-lg-2').addClass('col-lg-6');
            }
            else if(section_length > 12){
                $(this).addClass('m-link-stack--content__four-column');
                $(this).closest('.o-footer__link-wrapper').removeClass('col-lg-2').addClass('col-lg-8');
            }
        });
        //Footer columns declaration depending on no of sublinks
    }

});