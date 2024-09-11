$(document).ready(function () {
    // loop through footer link stacks - apply custom column class per designs
    const footer = $(".o-footer");
    if (footer && footer.length > 0) {
        const footerTop = footer.find(".o-footer__top");
        const footerLinkStacks = footerTop.find(".m-link-stack--content");
        for (const element of footerLinkStacks) {
            let numLinks = 0;
            const links = $(element).find(".a-link");
            if (links.length) {
                numLinks += links.length;
                if (numLinks > 3) {
                    $(element).closest(".o-footer__link-wrapper").removeClass("col-lg-2").addClass("col-lg-6");
                    $(element).addClass("three-column");
                }
            }
        }
    }
});