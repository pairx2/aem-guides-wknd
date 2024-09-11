/**********************************
image Component
**********************************/
$(function () {

    //to make the caption tag clickable in image component
    if ($('.column-controll--hero-banner .two-by-one--banner').length > 0 ){
       let captioncontainer= $(this).find(".cmp-image__title");
       let link =$(this).find(".cmp-image__link");
       $(link).append($(captioncontainer));
    }
})