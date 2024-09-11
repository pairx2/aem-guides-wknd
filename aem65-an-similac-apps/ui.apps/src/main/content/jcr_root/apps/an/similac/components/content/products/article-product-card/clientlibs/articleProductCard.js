(function (document, $) {
    "use strict";

    $(document).on("foundation-contentloaded", function (e) {  
       dynamicTabShowHideHandler($(".article-product-card-events", e.target));
    });

    $(document).on("change", ".article-product-card-events", function (e) {
        dynamicTabShowHideHandler($(this));
    });

    function dynamicTabShowHideHandler(el) {
        el.each(function (i, element) {
            if($(element).is("coral-select")) {
                Coral.commons.ready(element, function (component) {
					var coralTab = $(".article-showhide-tabs coral-tablist coral-tab");
                    showHide(component, element, coralTab);
                    component.on("change", function () {
                       showHide(component, element, coralTab);
                    });
                });
            }
        })
    }

    function showHide(component, element, coralTab) {
        var target = $(element).data("articleProductCardEventsTarget");

        if (target) {
            coralTab[1].hide();
            coralTab[2].hide();
            coralTab[3].hide();
            coralTab[4].hide();

            const productPath = $('[name="./productPath"]');
            if (component.value === 'article') { 
                productPath.removeAttr('invalid',true);
                productPath.removeAttr('required',true);
                coralTab[1].show();
                coralTab[2].show();
                coralTab[3].show();

            }else if (component.value === 'product') {
                productPath.attr('invalid',true);
                productPath.attr('required',true);
				coralTab[4].show();
            }
        }
    }

})(document, Granite.$);
