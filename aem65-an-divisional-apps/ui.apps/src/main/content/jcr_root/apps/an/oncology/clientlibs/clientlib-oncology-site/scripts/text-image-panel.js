$(window).on('load', function () {
    // Dynamically adding hrefs to cards.
    $('.a-container--text-image-panel .contentfragment article').on('click', function () {
        let contentfragmentElement = $(this).find('.cmp-contentfragment__elements');
        let contentdetailsreferenceElement = contentfragmentElement.find('.cmp-contentfragment__element--contentdetailsreference');
        let valueElement = contentdetailsreferenceElement.find('.cmp-contentfragment__element-value');
        window.location.href = valueElement.text().trim();
    });
});