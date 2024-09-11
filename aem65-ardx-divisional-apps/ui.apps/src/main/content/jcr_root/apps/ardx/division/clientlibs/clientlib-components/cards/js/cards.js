$(document).ready(function() {
    $('[data-js-component="card"]').each(function(sel) {
        let bgStyle = "background-color:" + $(this).find('.m-card__body').attr('data-card-bg-color');
        $(this).attr('style', bgStyle);
    });
    $('[data-js-component="card"] .m-card__body[data-card-type="video"]').click(function(){
		$(this).closest('[data-js-component="card"]').find('.m-card__media[data-card-type="video"] .wistia_click_to_play').click();
    })
});