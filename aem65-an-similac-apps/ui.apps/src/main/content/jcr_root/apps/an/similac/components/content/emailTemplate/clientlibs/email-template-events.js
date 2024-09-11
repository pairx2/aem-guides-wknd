(function (document, $) {
	"use strict";

	$(document).on("foundation-contentloaded", function (e) {
		showHideFeeder($(".email-template-variation-event", e.target));
	});

	function showHideField(component, element) {
        var target = $(element).data("emailTemplateVariationEventTarget");
		if (target) {
			$('[name="./logo2File"], [name="./retailerImgFile"], [name="./retailerTxt"], [name="./redemptionSubtext"], [name="./redeemImgFile"], [name="./buttonTxt"]').parent().hide();

			$('[name="./decorationImgFile"], [name="./leftLogoFile"], [name="./footerProdImgFile"], [name="./rightLogoFile"], [name="./buyLinkPath"]').parent().hide();

			$('[name="./unsubscribeLinkText"], [name="./unsubscribeLinkPath"], [name="./contactUsText"], [name="./privacyLinkText"], [name="./privacyLinkPath"]').parent().hide();

			$('[name="./termsLinkText"], [name="./termsLinkPath"], [name="./contactLinkText"], [name="./contactLinkPath"], [name="./copyrightText"]').parent().hide();

			$($('[name="./footerLogoLinkPath"]')[0]).parent().hide();
			$($('[name="./leftLogoLinkPath"]')[0]).parent().hide();
			$($('[name="./buyImgFile"]')[0]).parent().hide();

			if (component.value === 'amazon') {
				$('[name="./retailerImgFile"], [name="./decorationImgFile"], [name="./redeemImgFile"], [name="./leftLogoFile"], [name="./leftLogoLinkPath"]').parent().show();
				$('[name="./footerProdImgFile"], [name="./rightLogoFile"], [name="./buyImgFile"], [name="./buyLinkPath"], [name="./footerLogoLinkPath"]').parent().show();
			}else if (component.value === 'target') {
				$('[name="./retailerImgFile"], [name="./redemptionSubtext"], [name="./buttonTxt"], [name="./decorationImgFile"], [name="./leftLogoFile"]').parent().show();
				$('[name="./leftLogoLinkPath"], [name="./footerProdImgFile"], [name="./rightLogoFile"], [name="./buyImgFile"], [name="./buyLinkPath"]').parent().show();
				$('[name="./footerLogoLinkPath"]').parent().show();
			}else if(component.value === 'tpg') {
				$('[name="./logo2File"], [name="./retailerTxt"], [name="./redemptionSubtext"], [name="./buttonTxt"], [name="./unsubscribeLinkText"]').parent().show();
				$('[name="./unsubscribeLinkPath"], [name="./contactUsText"], [name="./privacyLinkText"], [name="./privacyLinkPath"], [name="./termsLinkText"]').parent().show();
				$('[name="./termsLinkPath"], [name="./contactLinkText"], [name="./contactLinkPath"], [name="./copyrightText"]').parent().show();
			}
		}
	}

	function showHideFeeder(el) {
		el.each(function (i, element) {
			Coral.commons.ready(element, function (component) {
				if ($(element).is("coral-select")) {
					showHideField(component, element);
					component.on("change", function () {
						showHideField(component, element);
					});
				}
			});
		})
	}

	$(document).on("change", ".email-template-variation-event", function (e) {
		showHideFeeder($(this));
	});

})(document, Granite.$);
