(function ($) {
    $(document).ready(function () {
        $('#section-site-leaving-popup').parent().addClass('no-padding');
        $('#section-site-leaving-popup .a-button--primary .btn, #section-site-enter-popup .a-button--primary .btn').addClass('popup-btn');

        $('#section-site-leaving-popup, #section-site-enter-popup').parent('container').addClass('no-padding');
        var popup = document.getElementById("site-leaving-popup-content");

        popup.classList.add("modal");

        const el = document.createElement('section');
        el.classList.add('container', 'responsivegrid', 'a-container', 'aem-GridColumn', 'aem-GridColumn--default--12', 'no-padding');
        var org = document.getElementById("section-site-leaving-popup");
        const clone = org.cloneNode(true);
        el.appendChild(clone)
        $('#site-leaving-popup-content .m-popup-content .a-container').replaceWith(el)

    });
})(jQuery);
