(function (document, $) {
	"use strict";

	$(document).on("foundation-contentloaded", function (e) {
		dynamicHandler($(".variation-dropdown-events", e.target));
	});

	$(document).on("change", ".variation-dropdown-events", function (e) {

		dynamicHandler($(this));
	});

	function dynamicHandler(el) {
		el.each(function (i, element) {
			Coral.commons.ready(element, function (component) {
                var coralTab = $(".prod-showhide-tabs coral-tablist coral-tab");

				 if ($(element).is("coral-select")) {
                      showHideTab(component, element, coralTab);
					component.on("change", function () {
                        showHideTab(component, element, coralTab);

					});
				}
			});
		})
	}

	function showHideTab(component, element, coralTab) {
        var targetDropdown = $(element).data("variationDropdownEventsTarget");

		if(targetDropdown){
            if (component.value === 'prodSubscription'){
               coralTab[4].show();
            }else {
				coralTab[4].hide();

            }
        }
	}

})(document, Granite.$);
