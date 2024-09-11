$(document).ready(function () {
    $('.m-popup').each(function() {
        $(this).on('click', function() {
            let imgClick = $(this).attr('data-target').replace("#","");
            let fullWidth = $(this).attr('data-fullwidth-section');
            $('.title-image-popup').each(function() {
                let textPopup = $(this).attr('data-text-image-popup');
                if(imgClick == textPopup) {
                    let contentAdd = "#" + textPopup;
                   if(fullWidth == "true") {
                       $(contentAdd).find('.modal-dialog').addClass('modal-dialog-fullscreen');
                       $(contentAdd).find('.modal-dialog-fullscreen').removeClass('modal-dialog-centered');
                   }
                   let contentUpdated = $(contentAdd).find('.generic-modal__content-body');
                   contentUpdated.empty();
                   let imageTag = $(this).find('.title-image-popup-content').find(".cmp-image");
                   for(const element of imageTag){
                        let imageAssertUrl = $(element).attr("data-asset");
                        $(element).find("img").attr("src",imageAssertUrl);
                   }
                   $(this).find('.title-image-popup-content').clone().prependTo(contentUpdated);
                }
            });
        });
    });
});