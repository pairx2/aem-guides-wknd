/* PMIS Js */

$(document).ready(function () {

    // On the header dropdown, on click of each option, the page has to redirect to that particular value page
    if ($('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .container .cmp-container .options').length && $('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .container .cmp-container .btn').length) {
        let buttonEle = $('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .container .cmp-container .btn');
        buttonEle.attr('href', 'javascript:void(0)');
        buttonEle.on('click', function () {
            let redirectURL = buttonEle.parents('.cmp-container').find('.options .a-dropdown__menu li.selected').attr('data-optionvalue');
            window.location.href = redirectURL;
        });
    }

    // Add image variation class to header image with right aligh class
    if ($('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .image.image--align-right').length) {
        $('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .image.image--align-right').addClass('image-var--abs-right');
    }

    // Add button variation class to body section
    if ($('body #pageContent .container .cmp-container .text + .button').length) {
        $('body #pageContent .container .cmp-container .text + .button').addClass('btn--download-pdf');
    }

    // Add container variation class to header container
    if ($('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .container.a-container').length) {
        $('.abbott-wrapper .xf-content-height .aem-GridColumn:not(.footer) .container.a-container').addClass('container-style--z-index__auto');
    }

    // Add container variation class to page container
    if ($('body #pageContent .container.a-container').length) {
        $('body #pageContent .container.a-container').addClass('container-style--z-index__auto');
    }

    // Add text variation class to page text component
    if ($('body #pageContent .container.a-container .cmp-container > .text').length) {
        $('body #pageContent .container.a-container .cmp-container > .text').addClass('text-var--pmis-para');
    }
});