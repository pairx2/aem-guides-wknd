(function (document, $) {
	"use strict";

	$(document).on("foundation-contentloaded", function (e) {
		dynamicHandler($(".retailer-variation-event", e.target));
	});

	$(document).on("change", ".retailer-variation-event", function (e) {
		dynamicHandler($(this));
	});

	function dynamicHandler(el) {
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

	function showHideField(component, element) {
        var target = $(element).data("retailerVariationEventTarget");
		if (target) {
			if (component.value) {
				$('[name="./retailerPageUrl"], [name="./subTitle"], [name="./selectRetailerLabel"], [name="./deSelectRetailerLabel"], [name="./deSelectRetailerEventLabel"]').parent().hide();
                if (component.value === 'selectRetailer') {
					$('[name="./selectRetailerLabel"], [name="./deSelectRetailerLabel"], [name="./deSelectRetailerEventLabel"]').parent().show();
				}else if (component.value === 'myOffers') {
					$('[name="./subTitle"], [name="./retailerPageUrl"]').parent().show();
				}
			}
		}
	}

})(document, Granite.$);
