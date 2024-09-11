(function(document, $) {
    "use strict";

    $(document).on("click", ".cq-dialog-submit", function(e) {

        var bgtype = $(".coral-Form-field[name='./backgroundType']").val();

        if (bgtype == 'imageBackground') {
            $(".coral-Form-field[name*='imageFileReference']").each(function() {

                if ($(this).val() == '') {
                    $(this).prop('required', true);
                }
            });
            $(".coral-Form-field[name*='./altText']").each(function() {
                var currectAltTxt = $(this);
                var altIndx = $(this).closest('coral-multifield-item').index();
                $(".coral-Form-field[name*='./decorative']").each(function() {
                    if ($(this).closest('coral-multifield-item').index() == altIndx) {
                        if ($(this).prop('checked') == true) {
                            currectAltTxt.val("");
                            currectAltTxt.prop('required', false);
                        } else {
                            currectAltTxt.prop('required', true);
                        }
                    }
                });
            });

        } else {
            $(".coral-Form-field[name*='imageFileReference']").each(function() {

                if ($(this).val() == '') {
                    $(this).prop('required', false);
                }
            });
        }

        if (bgtype == 'solidColor') {
            $(".coral-Form-field[name*='imageFileReference']").each(function() {

                    $(this).prop('required', false);

            });
            $(".coral-Form-field[name*='./altText']").each(function() {

                    $(this).prop('required', false);

            });
        }


    });

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        Coral.commons.ready(function() {
            showHideHandler($(".cq-dialog-checkbox-showhide-multifield", e.target));
        });

    });

    $(document).on("change", ".cq-dialog-checkbox-showhide-multifield", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {
        el.each(function(i, element) {
            if ($(element).is("coral-checkbox")) {
                // handle Coral3 base checkbox
                Coral.commons.ready(element, function(component) {
                    showHide(component, element);
                    component.on("change", function() {
                        showHide(component, element);
                    });
                });
            }
        })
    }


    function showHide(component, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        var target = $(element).data("cqDialogCheckboxShowhideTarget");
        var elementIndex = $(element).closest('coral-multifield-item').index();

        if (target) {
            // is checkbox checked?
            var checked = $(element).prop('checked');

            // get the selected value
            // if checkbox is not checked, we set the value to empty string
            var value = checked ? $(element).val() : '';

            var $target = $(element).closest('coral-multifield-item').find(target);

            $target.each(function(index) {
                var targetIndex = $(this).closest('coral-multifield-item').index();

                if (elementIndex == targetIndex) {
                    // make sure all unselected target elements are hidden.
                    $(this).not(".hide").addClass("hide");

                    $(this).filter("[data-showhidetargetvalue='" + value + "']").removeClass("hide");
                }
            });
        }
    }


    var registry = $(window).adaptTo("foundation-registry");

    // Validator for required for multifield max and min items
    registry.register("foundation.validation.validator", {
        selector: "[data-validation=button-multifield-validate]",
        validate: function(element) {
            var el = $(element);
            let max = el.data("maxlinksallowed");
            let items = el.children("coral-multifield-item").length;
            let domitems = el.children("coral-multifield-item");
            var ui = $(window).adaptTo("foundation-ui");
            if (items > max) {
                ui.alert("Warning", "Maximum " + max + " buttons are allowed!", "notice");
                domitems.last().remove();
            }
        }
    });

    registry.register("foundation.validation.validator", {
        selector: "[data-validation=imagetext-multifield-validate]",
        validate: function(element) {
            var el = $(element);
            let max = el.data("maxlinksallowed");
            let items = el.children("coral-multifield-item").length;
            let domitems = el.children("coral-multifield-item");
            var ui = $(window).adaptTo("foundation-ui");
            if (items > max) {
                ui.alert("Warning", "Maximum " + max + " carousel items are allowed!", "notice");
                domitems.last().remove();
            }
        }
    });

})(document, Granite.$);