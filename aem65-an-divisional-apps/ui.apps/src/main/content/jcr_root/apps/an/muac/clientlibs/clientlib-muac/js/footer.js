$(document).ready(function () {
    // loop through footer link stacks - apply custom column class per designs
    const footer = $(".o-footer");
    const footerTop = footer.find(".o-footer__top");
    const footerLinkStacks = footerTop.find(".m-link-stack--content");
    for (const element of footerLinkStacks) {
                $(element).closest(".o-footer__link-wrapper").removeClass("col-lg-2").addClass("col-lg-6");
            }
});

