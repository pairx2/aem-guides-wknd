(function (document, $) {
	"use strict";

	$(document).on("foundation-contentloaded", function (e) {
		dynamicHandler($(".form-variation-event", e.target));
	});

	$(document).on("change", ".form-variation-event", function (e) {
		dynamicHandler($(this));
	});

	function dynamicHandler(el) {
		el.each(function (i, element) {
			Coral.commons.ready(element, function (component) {
				if ($(element).is("coral-select")) {
					var coralTab = $(".container-showhide-tabs coral-tablist coral-tab");
                    showHideField(component, element);
					showHideTab(component, element, coralTab);
					component.on("change", function () {
                        showHideField(component, element);
						showHideTab(component, element, coralTab);
					});
				}
			});
		})
	}

    function showHideField(component, element) {
        var target = $(element).data("formVariationEventTarget");
		if (target) {
			if (component.value) {
				if (component.value === 'do-retailer-login' || component.value === 'do-retailer-registration') {
					$('[name="./disclaimer"], [name="./successMsgHeading"], [name="./successMsgText"], [name="./redirectOnSuccessURLNeosure"]').parent().hide();
					$('[name="./redirectToPreviousPage"], [name="./actionPathOnLoad"]').parent().hide();
                } else{
					$('[name="./disclaimer"], [name="./successMsgHeading"], [name="./successMsgText"], [name="./redirectOnSuccessURLNeosure"]').parent().show();
					$('[name="./redirectToPreviousPage"], [name="./actionPathOnLoad"]').parent().show();
                }
			}
		}
	}

	function showHideTab(component, element, coralTab) {  
		var target = $(element).data("formVariationEventTarget");
		if (target) {
			 if (component.value === 'contactUs') {
				coralTab[2].show();
                coralTab[1].hide();
                coralTab[3].hide();
                coralTab[4].hide();
             }else if (component.value === 'do-retailer-login' || component.value === 'do-retailer-registration') {
				coralTab[1].hide();
                coralTab[2].hide();
                coralTab[3].hide();
                coralTab[4].hide();
             }else if (component.value === 'manageAddress') {
				coralTab[1].hide();
                coralTab[2].hide();
                coralTab[3].hide();
                coralTab[4].show();
             }else {
                coralTab[1].show();
                coralTab[2].hide();
				coralTab[3].show();
                coralTab[4].hide();
			}
		}
	}

})(document, Granite.$);
