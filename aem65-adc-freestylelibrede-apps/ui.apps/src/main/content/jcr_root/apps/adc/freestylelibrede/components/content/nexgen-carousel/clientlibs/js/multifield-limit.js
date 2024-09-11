(function ($, $document) { 
    "use strict";
    $.validator.register("foundation.validation.validator", {
        selector: "coral-multifield",
        validate: function(el) {
            let totalPanels = el["0"].items.getAll().length;
            let min;
            let max;
             $(el).closest('.cq-dialog').find('.cq-dialog-submit').attr('disabled', false);
            if ($(el).data("min-item")){
                min = $(el).data("min-item");
                if(totalPanels < min) {
                    $(el).closest('.cq-dialog').find('.cq-dialog-submit').attr('disabled', true);
                    return "Minimum numbers of items required are: " + min;
                }
            }
            if ($(el).data("max-item")){
                max = $(el).data("max-item");
                if(totalPanels > max) {
                    $(el).closest('.cq-dialog').find('.cq-dialog-submit').attr('disabled', true);
                    return "Maximum numbers of items allowed are: " + max;
                }
            }
        }});
})($, $(document)); 