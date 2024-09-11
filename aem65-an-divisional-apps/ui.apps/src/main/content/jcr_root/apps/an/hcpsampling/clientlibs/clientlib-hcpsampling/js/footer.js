$(document).ready(function () {
    // loop through footer link stacks - apply custom column class per designs
    const footer = $(".o-footer");
    const footerTop = footer.find(".o-footer__top");
    const footerLinkStacks = footerTop.find(".m-link-stack--content");
    for (let i of footerLinkStacks) {
        let numLinks = 0;
        const links = $(i).find(".a-link");
        if (links.length) {
            numLinks += links.length;
            if (numLinks > 10) {
                $(i).closest(".o-footer__link-wrapper").removeClass("col-lg-2").addClass("col-lg-5");
                $(i).addClass("three-column");
            }
        }
    }
    
    // webnova popup
    $(".footer .o-footer__link-wrapper:nth-child(3) .m-link-stack").attr("id","webnova-link-stack");
    $("#webnova-link-stack .js-collapsable-links li:last-child a").attr("id","webnova_popup").removeAttr("href");
    $("#webnova-link-stack #webnova_popup").wrapAll('<div class="m-popup" data-toggle="modal" data-target="#webnova_popup-modal"></div>');
        
    $('#webnova-link-stack #webnova_popup').on('click', function(e) {
        if (isUserLoggedIn()) {
            e.StopPropagation();
        } else if (!isUserLoggedIn()) {
            e.stopImmediatePropagation();
            let loginRedirect = $('input[name="webnovaRedirect"]').val();
            $(this).attr('href', loginRedirect);
        }    
    })
});