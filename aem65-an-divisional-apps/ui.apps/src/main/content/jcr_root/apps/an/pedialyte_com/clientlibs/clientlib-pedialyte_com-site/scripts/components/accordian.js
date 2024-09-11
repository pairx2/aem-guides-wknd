$(function() {

    $('.m-accordian--base .m-accordion__header').on("click", function () {
        let val=$(this).find('.m-accordion__icon-wrapper').attr('aria-expanded');
        console.log(val);
        setTimeout(() => {
    
                   if (val=="false" ) {
            $(this).parents('.m-accordion__content-items').addClass('bg-color');
            $(this).siblings('.m-accordion__body').addClass('show');
        }
                   if (val=="true" ) {
            $(this).parents('.m-accordion__content-items').removeClass('bg-color');
            $(this).siblings('.m-accordion__body').removeClass('show');         
        }
        
    }, 0);
    });
    $(".m-accordion__expand-title").on("click", function (e) {
        $(".m-accordian--base .cmp-accordion >.m-accordion__content >.m-accordion__content-items").each(function(i, el){
            if(!$(el).hasClass('bg-color')) {
                $(el).addClass('bg-color');
            }
        })
    });
    
    $(".m-accordion__collapse-title").on("click", function (e) {
        $(".m-accordian--base .cmp-accordion >.m-accordion__content >.m-accordion__content-items").each(function(i, el) {
            if($(el).hasClass('bg-color')) {
                $(el).removeClass('bg-color');
            }
        });
    });
    });
    
    
    
    