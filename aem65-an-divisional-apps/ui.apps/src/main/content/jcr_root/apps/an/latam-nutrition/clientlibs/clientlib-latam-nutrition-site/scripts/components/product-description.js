let hideShowProducts = function (ref, imageID, totalContainers, accordionBtnNumber) {
    $(ref).find('.a-container__row .a-container__content .a-container').each(function () {
        if ($(this).find('section').attr('id').indexOf(imageID) > -1) {
            $(this).removeClass('d-none');
        } else {
            $(this).addClass('d-none');
        }
    });
    if (accordionBtnNumber > 1) {
        $(ref).find(".button.link").each(function() {
            if ($(this).find('a').attr('id').indexOf(imageID) > -1) {
                $(this).removeClass('d-none');
            } else {
                $(this).addClass('d-none');
            }
        });
    }
}
function containerProduct(firstImageId,totalContainerCount,accordionBtnCount,aProductContainer){
    let imageContainer;
    if (firstImageId && totalContainerCount > 1) {
        hideShowProducts(aProductContainer, firstImageId, totalContainerCount, accordionBtnCount);

        // Product sub images when clicked
        if ($(aProductContainer).find('.a-image--prod-dec-sub-img').length > 0) {
            imageContainer = $(aProductContainer).find('.a-container__row .a-container__content .a-container .a-image--prod-dec-sub-img .cmp-image');
        } else {
            imageContainer = $(aProductContainer).find('.a-container__row .a-container__content .a-container .a-image--prod-dec-sub-img-pediasure .cmp-image');
        }
        
        imageContainer.click(function () {
            firstImageId = $(this).attr('id');
            hideShowProducts(aProductContainer, firstImageId, totalContainerCount, accordionBtnCount);
            if (accordionBtnCount > 0) {
                $(aProductContainer).find(".a-text--prod-desc-table").each(function () {
                    $(this).css('display', 'none');

                });
            }
            $(aProductContainer).find(".button.link").removeClass('minus-sign');
        });
    }
}

function tableButton(accordionBtnCounts,accordionTableCount,subImagesId){
    if (accordionBtnCounts <= 0 && accordionTableCount > 0) {
        $(".a-text--prod-desc-table").each(function (index) {
            if (index != 0) {
                $(this).addClass('d-none');
            } else {
                $(this).css('display', 'block');
            }
        });
        $('.a-container--product .a-image--prod-dec-sub-img .cmp-image').on('click', function (e) {
            $(".a-text--prod-desc-table").each(function (index) {
                $(this).addClass('d-none')
                if (index == subImagesId.indexOf($(e.target.parentNode).attr('id'))) {
                    $(this).removeClass('d-none');
                    $(this).css('display', 'block')
                }
            })

        });
    }
}
function accordBttnClick(aProductContainer,firstImageId){
    $(aProductContainer).find(".button.link").click(function () {
        let that = this;
        let multiTables = $(that).next(".a-text--prod-desc-table").next(".a-text--prod-desc-table").length;
        if (multiTables === 0) {
            $(that).next(".a-text--prod-desc-table").toggle();
            if ($(that).next(".a-text--prod-desc-table").css('display') == 'block') {
                $(that).addClass('minus-sign');
            } else {
                $(that).removeClass('minus-sign');
            }
        } else {
            $(aProductContainer).find(".a-text--prod-desc-table").each(function () {
                if ($(this).find('.cmp-text').attr('id').indexOf(firstImageId) > -1) {
                    $(this).toggle();
                    if ($(this).css('display') == 'block') {
                        $(that).addClass('minus-sign');
                    } else {
                        $(that).removeClass('minus-sign');
                    }
                }
            });
        }
    });
}

$(window).on('load', function () {
    $('.a-container--product').each(function () {
        let aProductContainer = this;
        let accordionBtnCount = $(this).find(".button.link").length;

        if (($(aProductContainer).find('.a-image--prod-dec-sub-img').length > 0 || $(aProductContainer).find('.a-image--prod-dec-sub-img-pediasure').length > 0) && ($(aProductContainer).find('.a-container__row .a-container__content .a-container').length > 0)) {
            let firstImageId = $(aProductContainer).find('.a-image--prod-dec-sub-img').length > 0 ? $($(aProductContainer).find('.a-image--prod-dec-sub-img')[0]).find('.cmp-image').attr('id')  : $($(aProductContainer).find('.a-image--prod-dec-sub-img-pediasure')[0]).find('.cmp-image').attr('id');
            let totalContainerCount = $(aProductContainer).find('.a-container__row .a-container__content .a-container').length;
           containerProduct(firstImageId,totalContainerCount,accordionBtnCount,aProductContainer);

            if (accordionBtnCount > 0) {
                // Accordion buttons when clicked                
                accordBttnClick(aProductContainer,firstImageId);
            }
        }
    });



    // If there is no accordion button to display table.

    let accordionBtnCounts = $(".a-container--product .button.link").length;
    let accordionTableCount = $(".a-text--prod-desc-table").length;
    let subImagesId = [];
    $('.a-container__row .a-container__content .a-container .a-image--prod-dec-sub-img .cmp-image').each(function (index) {
        subImagesId.push($(this).attr('id'));
    });
    tableButton(accordionBtnCounts,accordionTableCount,subImagesId);
});