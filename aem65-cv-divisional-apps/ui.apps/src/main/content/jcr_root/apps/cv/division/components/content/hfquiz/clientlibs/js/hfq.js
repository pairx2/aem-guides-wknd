(function(document, $) {
    "use strict";

    var registry = $(window).adaptTo("foundation-registry");

    // Validator for required for multifield max and min items
    registry.register("foundation.validation.validator", {
        selector: "[data-validation=HFQ-multifield-validate]",
        validate: function(element) {
            var el = $(element);
            let max = el.data("maxlinksallowed");
            let items = el.children("coral-multifield-item").length;
            let domitems = el.children("coral-multifield-item");
            var ui = $(window).adaptTo("foundation-ui");
            if (items > max) {
                ui.alert("Warning", "You can add a Maximum of " + max + " quiz questions to this module!", "notice");
                domitems.last().remove();
            }
        }
    });

})(document, Granite.$);