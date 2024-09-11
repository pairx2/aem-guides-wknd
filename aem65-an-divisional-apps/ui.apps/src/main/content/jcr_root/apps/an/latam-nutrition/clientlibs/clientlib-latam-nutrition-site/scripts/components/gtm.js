function removeStyleonCard (){
	setTimeout( function() {
		if($('[data-js-component="card"]').length && $('[data-js-component="card"]').attr("style") != undefined) {
			$('[data-js-component="card"]').removeAttr("style");
		}
	}, 500);
}
function contactDataLayer() {
	window.dataLayer.push({
		'formType': 'Contact_form',
		'event': 'clickToStartContactRequest'
	});
}
function registrationDataLayer() {
	window.dataLayer.push({
		'formType': 'Registration_form',
		'event': 'clickToStartRegistration'
	});
}
function openLink(hreflink) {
	if(hreflink.attr("target") === "_self" || hreflink.attr("target") === undefined) {
		window.open(hreflink.attr("href"), "_self");
	}
	else if(hreflink.attr("target") === "_blank") {
		window.open(hreflink.attr("href"), "_blank");
	}
}
function linkAction (){
	$('.a-link__text').click(function(e) {
		if($(this).attr("href").indexOf("/contact") > -1) {
			e.preventDefault();
			if($(this).closest(".m-link-stack").parent().hasClass("a-linkstack--header")) {
				contactDataLayer();
				localStorage.setItem("ubicacionBotonContacto", "Header");
			}
			else if($(this).closest(".m-link-stack").parent().hasClass("o-footer__link-wrapper")) {
				contactDataLayer();
				localStorage.setItem("ubicacionBotonContacto", "Footer");
			}
			openLink($(this));
		}
		else if($(this).attr("id") != undefined && $(this).attr("id").toLowerCase() === "header-user-register") {
			e.preventDefault();
			registrationDataLayer();
			localStorage.setItem("ubicacionBotonRegistro", "Header");
			openLink($(this));
		}
	});
}
function headerLinkAction(){
	$('a.cmp-navigation__item-link, a.nav-link, a.m-mega-menu__mobile-header').click(function(e) {
		if($(this).closest("nav").parent().hasClass("m-sitemap--sitemap") || $(this).closest("nav").parent().hasClass("m-megamenu--sitemap")) {
			if($(this).attr("href").indexOf("/contact") > -1) {
				e.preventDefault();
				contactDataLayer();
				localStorage.setItem("ubicacionBotonContacto", "SiteMap");
				openLink($(this));
			}
			else if($(this).attr("href") === $("#header-user-register").attr("href")) {
				e.preventDefault();
				registrationDataLayer();
				localStorage.setItem("ubicacionBotonRegistro", "SiteMap");
				openLink($(this));
			}
		}
	});
}
function gtm_dataLayerPush() {
	window.dataLayer = window.dataLayer || [];
	$('.a-link__text').off("click");
	linkAction();
	$('a.cmp-navigation__item-link, a.nav-link, a.m-mega-menu__mobile-header').off("click");
	headerLinkAction();
}
$(document).ready(function() {
	/* Receipe height issue fix start */
	removeStyleonCard();
	/* Receipe height issue fix end */
	/* GTM events start */
	let gtm_countryCode = $("body").attr("data-country-code") ? $("body").attr("data-country-code").toLowerCase() : $('[name="x-country-code"]').val().toLowerCase();
	
	let gtm_countryList = $('[name="gtm_country"]').val();
	if($('[name="gtm_country"]').length && gtm_countryList != undefined) {
		if(gtm_countryList.indexOf(",") > -1) {
			let gtmCountrySplit = gtm_countryList.toLowerCase().split(",");
			for(let i in gtmCountrySplit) {
				if(gtmCountrySplit[i] === gtm_countryCode) {
					gtm_dataLayerPush();
				}
			}
		}
		else if(gtm_countryList.toLowerCase() === gtm_countryCode) {
			gtm_dataLayerPush();
		}
	}
	/* GTM events end */
});