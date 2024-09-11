$('.m-custom-list-level2-cds .m-custom-list__content .abt-icon').attr('data-toggle','collapse');
$('.m-custom-list-level2-cds .m-custom-list__content').addClass('collapse-item');
$('.m-custom-list-level2-cds .m-custom-list__content').each(function(e){ let $this = $(this);     
    $(this).children().find('.abt-icon').click(function(){
        if($(this).attr('data-toggle') == 'collapse'){
            $this.addClass('expand-item');
            $this.removeClass('collapse-item');
            $(this).attr('data-toggle','expand');
        }
        else{
            $this.addClass('collapse-item');
            $this.removeClass('expand-item');
            $(this).attr('data-toggle','collapse');
        }
        
    });
});
if(typeof typeof Granite === 'undefined' ||  typeof Granite.author === 'undefined'){
    $('.m-custom-list-grey-bg-medium').appendTo('.m-custom-list-level2-cds .m-custom-list__content:last-child');
    $('.a-text-grey-bg.a-text-half-center').insertAfter('.m-custom-list-grey-bg-medium');
}