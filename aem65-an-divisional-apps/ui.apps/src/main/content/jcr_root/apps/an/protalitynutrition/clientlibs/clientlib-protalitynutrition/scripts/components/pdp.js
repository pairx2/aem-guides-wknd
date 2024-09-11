$(document).ready(function () {
    if (window.location.href.indexOf("/nutrition-products/") > -1) {
        $('.a-dropdown__container .a-dropdown__field .a-dropdown__menu li').click(function () {
            let selectedFlavor = $(this).attr('data-optionvalue');
            let currentPagePath = window.location.pathname;
            let currentPageName = currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1);
            let extension = "";
            // Checking html extension available or not
            if (currentPagePath.indexOf(".html") !== -1) {
                extension = ".html";
            }
            window.location.href = currentPagePath.replace(currentPageName, selectedFlavor + extension);
        });
        $('#section-pdp-flavor-desc').parent().css({ 'padding-left': '0', 'padding-top': '0' });
        if (isMobileDevice()) {
            $('#pd-pro-show .columncontrol__column:nth-child(1) .text, .options').css("width", "100%");
            $('#pd-faq-acc .m-accordion__body').removeClass('show');
            if (! $("#pd-faq-acc .m-accordion__content .m-accordion__content-items:nth-child(1) .m-accordion__icon-wrapper .m-accordion-toggle .m-accordion-icon:nth-child(1)").hasClass("icon-visible")) {
                $("#pd-faq-acc .m-accordion__content .m-accordion__content-items:nth-child(1) .m-accordion__icon-wrapper .m-accordion-toggle .m-accordion-icon:nth-child(1)").addClass("icon-visible");
            }
            if ($("#pd-faq-acc .m-accordion__content .m-accordion__content-items:nth-child(1) .m-accordion__icon-wrapper .m-accordion-toggle .m-accordion-icon:nth-child(2)").hasClass("icon-visible")) {
                $("#pd-faq-acc .m-accordion__content .m-accordion__content-items:nth-child(1) .m-accordion__icon-wrapper .m-accordion-toggle .m-accordion-icon:nth-child(2)").removeClass("icon-visible");
            }
            let storedImgDiv = $('#prod-image').html(); localStorage.setItem('storedImgDiv', storedImgDiv);
            let divImg = localStorage.getItem('storedImgDiv');
            $('#prod-image').hide();
            $('#pdp-title').parent().append(divImg);
            $('#section-dot-gradient').parent().hide();
        } else {
            $('#pd-pro-show .columncontrol__column:nth-child(1) .text, .options').css("width", "70%");
        }
    }
    
});
//show thumbnail in mobile view
let checkSlick = setInterval(function(){
	
	if( $('.slick-dots li').length ){
		let slickDots = $('.slick-dots li');	   
		let thumbsList = $('.product-thumbnail');
		for (let i in thumbsList) {
			if(i<thumbsList.length){
                let curSrc = thumbsList.children('img')[i].src;
                (slickDots[i]).style.backgroundImage = 'url('+curSrc+')';
			}

		}
	}
clearInterval(checkSlick);
},1000);