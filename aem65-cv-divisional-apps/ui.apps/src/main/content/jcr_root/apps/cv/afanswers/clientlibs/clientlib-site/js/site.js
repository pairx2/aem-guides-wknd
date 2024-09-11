$(document).ready(function () {

var countries = $('[name="countryList"]').val()?.split(',');
if(countries) {
	$("#site-entering-popup-content").attr("data-site-entering-popup-required", "false"); //not to call default one
}

var isPreviewMode = $('#wcmMode').val() == 'true' ? false : true;
var win_url = window.location.href.substr(window.location.href.lastIndexOf("/") + 1).split("?")[0];
$('.m-mega-menu__mobile .navbar-nav .m-mega-menu__mobile-item-wrapper .a-link__text').each(function(){
	var href = $(this).attr('href');
	if (href.indexOf(win_url) > -1){
		$(this).parents('li').addClass('active');
	}
});

//hover card within column control - full width
if (window.innerWidth > 767 && window.innerWidth < 993) {
	if ($('.columncontrol .m-card.m-hovercard.m-card--large').length){
		$('.columncontrol').each(function() {
			if ($(this).find('article.m-card.m-hovercard.m-card--large').length){
				$(this).addClass('full-width');
			}
		});
	}
}

//Hero banner - Animation container 
if(isPreviewMode){
$(".responsivegrid .aem-Grid>.aem-GridColumn.animationcontainer.container").each(function() {
    var heroBnrLng = $(this).find('.m-hero');
    if (heroBnrLng.length) {
        var style = $(this).children('div').attr("style");
        var data_aos_delay = $(this).children('div').attr('data-aos-delay');
        var data_aos_duration = $(this).children('div').attr('data-aos-duration');
        var data_aos_easing = $(this).children('div').attr('data-aos-easing');
        var data_aos = $(this).children('div').attr('data-aos');
        var data_aos_container = $(this).children('div').attr('data-aos-container');
        $(this).find('.m-hero .m-hero__content').attr({
            "style": style,
            "data-aos-delay": data_aos_delay,
            "data-aos-duration": data_aos_duration,
            "data-aos-easing": data_aos_easing,
            "data-aos": data_aos,
            "data-aos-container": data_aos_container
        });
        $(this).children('div').removeAttr('style data-aos-delay data-aos-duration data-aos-easing data-aos data-aos-container');
    }
});

setTimeout(function() {
    $(".responsivegrid .aem-Grid>.aem-GridColumn.animationcontainer.container").first().find('.m-hero__content').addClass('aos-animate');
		updateScroll();
}, 1000);
}
$.fn.isOnScreen = function() {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(window).scroll(function() {
    $(".animationcontainer.container .m-hero").each(function() {
        if ($(this).isOnScreen() == true) {
            $(this).find('.m-hero__content').addClass('aos-animate');
        } else {
            $(this).find('.m-hero__content').removeClass('aos-animate');
        }

    });
});

function updateScroll() {
	var compPos = $(window).scrollTop();
		compPos = Math.round(compPos);
	if (compPos != '0') {
		window.scrollTo({
			top: compPos+10,
			behavior: 'smooth',
		});
	}
}

// anchor links
$('a[href^="#"]').on('click', function() {
 	if($(this).is('[href^="#"')){
 		var sec_id = $(this).attr('href')
       	var scrollTo = $(sec_id).offset().top;
        $('html, body').animate({scrollTop: scrollTo-120}, 'slow');
 	}
});

//Language Nvigation on mobile/ipad
let countryLang = document.querySelector('.m-link-stack__country-select');
var isMobile = window.matchMedia("(max-width: 1024px)").matches;
	
if (isMobile) {
	
	//Remove country-dropdown for mobiles
	$(".country-dropdown").empty().remove();
	
	//Utility nav links into hamburgermenu code
	if (window.innerWidth < 768) {
	
	//mega menu href fix for mobile/ipad screens
	$('.m-mega-menu__mobile .navbar-nav .m-mega-menu__mobile-item-wrapper .m-link-stack__link[data-js-component="link-stack-dropdown"]').each(function(){
			var href = $(this).find('.a-link__text').attr('href');
			var navItemTxt = $(this).find('.a-link__text').text().replace(/\s+/g,'');
			var addEle = "<a class='mob-nav-link'></a>";
			var curEle = $(this).children().find('.a-link__text');
			$(this).find('.a-link__text').attr('href','javascript:void(0)');
			$(this).find('.a-link__text').prepend(addEle);
			$(this).find('.a-link__text').find('.mob-nav-link').text(navItemTxt);
			$(this).find('.a-link__text').find('.mob-nav-link').attr('href',href);
			curEle.contents().filter(function () {
				return this.nodeType === 3; 
			}).remove();
		});
		
		$('.m-mega-menu__mobile-item-wrapper .m-link-stack--dropdown .a-link__text[href="javascript:void(0)"]').on('click', function(){
			$(this).parents('.m-link-stack__link').next().toggleClass('d-block');
		});
	}
  
  // Appending Langugage Navigator code in the header-logo section
  document.querySelector('.o-header__logo-section .row .o-header__logo-right').innerHTML = '';
  document.querySelector('.o-header__logo-section .row .o-header__logo-right').append(countryLang);
}
     //Adding AFA INT, AP and LA flags in language navigator

    var path = location.pathname.toLowerCase();
    if (path.indexOf("/ap/en/") >= 0){
		 addAndRemoveFlag('flag-icon flag-icon-ap');
	}else if(path.indexOf("/la/es/") >= 0){
        addAndRemoveFlag('flag-icon flag-icon-la');
    }else if(path.indexOf("/int/en/") >= 0){
       addAndRemoveFlag('flag-icon flag-icon-int');
    }

    function addAndRemoveFlag(flagClsName){
		var $span = $( ".m-link-stack--dropdown .m-link-stack__link .a-link__text" ).find( "span.flag-icon" );
        $span.removeClass();
        $span.addClass(flagClsName);
    }
  
	/* Removing empty h3 tag form AFA footer */

	var customLinkHeading = $('.customtextlist .m-custom-list h3');
	if (customLinkHeading.length > 0) {
		if($(customLinkHeading).html().replace(/\s|&nbsp;/g, '').length == 0){
			customLinkHeading.remove();
		}
	}

	// Scroll to specific section if anchor id in URL 

	

});

$(window).on('load', function() {

	var headerHeight = $(".o-header__sticky-section").height();
	
	function hashUrlScroll (){
		var urlVal = window.location.href;
		var hashUrlVal = urlVal.split("#")[1];
		if (urlVal.indexOf("#") > -1) {
			var sec_id = $("#"+hashUrlVal).val();
			if(typeof sec_id != "undefined") {
				var scrollTo =  $("#"+hashUrlVal).offset().top;
				$('html, body').animate({scrollTop: scrollTo - headerHeight*2+50}, 'slow');
			}
		}
	}

	hashUrlScroll();
});
