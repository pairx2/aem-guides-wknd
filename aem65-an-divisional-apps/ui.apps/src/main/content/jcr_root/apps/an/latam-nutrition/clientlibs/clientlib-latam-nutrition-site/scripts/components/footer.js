$(window).on('load',function() {
	removeLastEmptyFooterColumnBorder();
});

$(window).on("resize", function () {
	removeLastEmptyFooterColumnBorder();
});

$(window).on("orientationchange", function () {
    removeLastEmptyFooterColumnBorder();
});

function removeLastEmptyFooterColumnBorder () {
	// If the last footer column is empty with only whitespace, then remove the border
    let footerLastNode = document.querySelector('.a-container--footer .o-footer .o-footer__link-wrapper.col-lg-2:last-child');
    let footerLastNodeContent = footerLastNode.textContent.trim();
    if (footerLastNodeContent == '') {
		footerLastNode.style.borderRight = 'none';
    }
}

