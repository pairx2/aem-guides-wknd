$(document).ready(function () {
	
	var isPreviewMode = $('#wcmMode').val() == 'true' ? false : true;
	if(isPreviewMode){
       $('#user-registration').css('display', 'none');
    }


	//logout modal changes
	var login_link = $('.login-link a').attr('href');
	$('.logout-link').find('.a-link__text').attr('href', 'javascript:void(0);')
	setTimeout(function () {
		var id = $('.logout-link').find('div').attr('data-target');
		$(id).addClass('rp').addClass('alg-center');
		$(id).find('.modal-footer .button:first-child a').addClass('confirm-logout');
	}, 1000);

	$(document).on('click', '.confirm-logout', function (event) {
		deleteCookie('jwtToken');
		localStorage.removeItem("dynamicEmail");
	});


	var login_Html = $('.o-header__secondary-top-nav .login-container').html();
	var logout_Html = $('.o-header__secondary-top-nav .logout-container').html();

	var browserUrlPath = window.location.pathname.toLowerCase();
	
	var loginRedirectionEnabled = false;
	if(browserUrlPath && browserUrlPath.indexOf('/au/en/') > -1){
		loginRedirectionEnabled = true;
		sessionStorage.setItem('documentReferrer',document.referrer);
	}
	
	// check coookie
	var jwtToken = getCookie("jwtToken");
	var wcmmodeChk = getCookie("cq-authoring-mode");
	if (jwtToken == "" || jwtToken == typeof undefined) {
		$('.o-header__mob-options').html(login_Html);
		localStorage.removeItem("dynamicEmail");
		if ($('.o-header__mob-options').children().hasClass('login-link')) {
			$('.o-header__mob-options').addClass('rp');
			$('.m-mega-menu__mobile button.navbar-toggler').hide();
		}
		if (!($('.hidden input[name="publicPage"]').length)) {
			if (!wcmmodeChk && loginRedirectionEnabled && login_link){
				window.location.href = login_link;
			}
		}


	} else {
		$('.logout-link, .my-acc').removeClass('display-hidden');
		$('.login-link').addClass('display-hidden');
		$('.o-header__mega-menu').show();
		$('.o-header__mob-options').html(logout_Html);
		if ($('input[name="dynamicEmail"]').length){
		$('input[name="dynamicEmail"]').val(localStorage.getItem('dynamicEmail'));
		}
	}
	
	//mega menu active links border code 
	var win_url = window.location.href.substr(window.location.href.lastIndexOf("/") + 1).split("?")[0];
		$('.o-header-v2-global__section .m-mega-menu__mobile .navbar-nav .m-mega-menu__mobile-item-wrapper .a-link__text').each(function(){
			var href = $(this).attr('href');
			var cv_mint = $(this).closest(".section.cv_mint");
			if ((href.indexOf(win_url) > -1) && (href.indexOf("#") === -1)){
				if(!(cv_mint.length)){
					$(this).closest("li").addClass('active');
				}
			}
		});

		$('.o-header-v2-global__section .navbar-nav .m-mega-menu__mobile-item-wrapper .nav-link').each(function(){
			var url = $(this).attr('href');
			var cv_mint = $(this).closest(".section.cv_mint");
			if (url.indexOf(win_url) > -1){
				if(!(cv_mint.length)){
					$(this).closest("li").addClass('active');
				}
			}
		});

	//mega menu href fix for mobile/ipad screens
	if (window.innerWidth < 992) {  
		$('.m-mega-menu__mobile .navbar-nav .m-mega-menu__mobile-item-wrapper .navigation .m-mega-menu__item .nav-item').each(function(){
			var href = $(this).attr('href');
			var navItemTxt = $(this).text();
			var addEle = "<a class='mob-nav-link'></a>";
			var curEle = $(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header');
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').attr('href','javascript:void(0)');
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').prepend(addEle);
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').find('.mob-nav-link').text(navItemTxt);
			$(this).parent().parent().find('.m-mega-menu__mobile-item').children('.m-mega-menu__mobile-header').find('.mob-nav-link').attr('href',href);
			curEle.contents().filter(function () {
				return this.nodeType === 3; 
			}).remove();
		});
	}
	
	$('.o-form-container .options').each(function(){
			var mandval = $(this).find('label>span.a-dropdown__title--required');
			if (mandval.text() == '*') {
				mandval.parent().addClass('hidden');
			}
	});
	
	$('.o-form-container[data-js-component="formcontainer"] .o-form-container__buttons .button>button.btn').on('click', function(){
		var elem = $(this).parents('.o-form-container__buttons');
			elem.siblings().eq(elem.index()+1).addClass('active');
    });
	
	$('.o-form-container[data-js-component="formcontainer"] .form-container .button>button#resetpassword').on('click', function() {
		loadSpinnerIcon();
	});

	function loadSpinnerIcon() {
		var spinnerIcon = setTimeout(loadSpinnerIcon, 1000);
		if ($("button#resetpassword").parents('.o-form-container__main-form').siblings('.o-form-container__success-msg').text().length == '0') {
			$("button#resetpassword").parent().addClass('a-button--spinner');
		} else {
			$("button#resetpassword").parent().removeClass('a-button--spinner');
			clearTimeout(spinnerIcon);
    }
}

//Adding INT flags in language navigator
    var path = location.pathname.toLowerCase();
    if (path.indexOf("/int/en/") >= 0){
		addAndRemoveFlag('flag-icon flag-icon-int');
	}

    function addAndRemoveFlag(flagClsName){
	    var $span = $( ".m-link-stack--dropdown .m-link-stack__link .a-link__text" ).find( "span.flag-icon" );
        $span.removeClass();
        $span.addClass(flagClsName);
    }
//Language Nvigation on mobile/ipad
var isMobile = window.matchMedia("(max-width: 991.98px)").matches;

if (isMobile) {
	//Utility nav links into hamburgermenu code
	$('.o-header__utility-nav').children().each(function(){
        var curEle = $(this).attr('class');
        if (curEle.match('a-link')){
			$(".m-mega-menu__mobile ul").append('<li class="m-mega-menu__mobile-item-wrapper bt"><div class="link button"></div></li>');
			$(".m-mega-menu__mobile ul li:last-child>div").append($(this).clone());
		}else {
			$(".m-mega-menu__mobile ul").append('<li class="m-mega-menu__mobile-item-wrapper bt"></li>');
			$(".m-mega-menu__mobile ul li:last-child").append($(this).clone());
		}
		$(".login-container, .logout-container").parents('li').remove();	
	});
}

$('.a-dropdown__field>.a-dropdown__placeholder').each(function(){
    if ($(this).height() > "25") {
		$(this).addClass('dyn-height');
    }
});

// anchor links
$('a[href^="#"]').on('click', function() {
	if($(this).is('[href^="#"')){
		var sec_id = $(this).attr('href')
		  var scrollTo = $(sec_id).offset().top;
	   $('html, body').animate({scrollTop: scrollTo-120}, 'slow');
	}
});
var panZoomSection = $(".a-pan-zoom");
if (panZoomSection.length > 0) {
	panZoomSection.parents(".a-container").css("z-index","1");
}

});

// Scroll to specific section if anchor id in URL 

$(window).on('load', function() {

	var headerHeight = $(".o-header-v2-global__sticky-section").height();
	
	function hashUrlScroll (){
		var urlVal = window.location.href;
		var hashUrlVal = urlVal.split("#")[1];
		if (urlVal.indexOf("#") > -1) {
			var sec_id = $("#"+hashUrlVal).val();
			if(typeof sec_id != "undefined") {
				var scrollTo =  $("#"+hashUrlVal).offset().top;
				$('html, body').animate({scrollTop: scrollTo - headerHeight*2+25}, 'slow');
			}
		}
	}

	hashUrlScroll();

	//TrustArc banner ISI Overlap
	var consentBannerSection = $("#consent-banner");
	function stickWithConsentBanner() {
		var heightConsentBanner = $('.trustarc-banner-wrapper').height();
		$('<style>.a-floatingactionbutton { bottom: ' + heightConsentBanner + 'px !important };</style>').appendTo('head');
	}
	if (consentBannerSection.length > 0) {
		stickWithConsentBanner();
	}

	// CVNMAEM-4494
	setTimeout(function(){
		var floatingFeedbackSection = $("div._acsmiddleright._acsVertical_right._acsbadge--default");
		function stickFeedbackButton(){
			if($(window).height() < 715) {
				$('div._acsmiddleright._acsVertical_right._acsbadge--default').addClass('sticktobottom');
			}
		}
		if (floatingFeedbackSection.length > 0) {
			stickFeedbackButton();
		}
	}, 100);
});