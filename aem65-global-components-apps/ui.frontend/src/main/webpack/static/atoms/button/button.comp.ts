class Button{
    constructor(options) {
        $(options).on('click', this.onClickFocusBtn);
    }

    onClickFocusBtn(e = event) {
        e.preventDefault();
        const stickyHeaderHeight = $(".abbott-wrapper").height();
        const targetLocation = $(this).attr("href");
        if ($(this).attr("href").indexOf("#")===0 && targetLocation != undefined) {
            const targetElement = $(targetLocation);
            const targetElementOffset = !!targetElement.closest('.offset');
            $('html, body').animate({
                'scrollTop': targetElement.offset().top - (targetElementOffset ? stickyHeaderHeight + 110 : stickyHeaderHeight)
            }, 300);
        }
    }
}

document.querySelectorAll("a[target='selfTag']").forEach(function (ele) {
    new Button(ele);
});