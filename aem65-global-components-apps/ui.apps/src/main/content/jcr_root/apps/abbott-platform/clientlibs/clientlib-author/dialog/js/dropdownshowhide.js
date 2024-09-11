/**
 * Extension to the standard dropdown/select dropDownComponent. It enabled hidding/unhidding of other components based on the
 * selection made in the dropdown/select.
 *
 * How to use:
 *
 * - add the class cq-dialog-dropdown-showhide to the dropdown/select element
 * - add the data attribute cq-dialog-dropdown-showhide-target to the dropdown/select element, value should be the
 *   selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
 * - add the target class to each target dropDownComponent that can be shown/hidden
 * - add the class hidden to each target dropDownComponent to make them initially hidden
 * - add the attribute showhidetargetvalue to each target dropDownComponent, the value should equal the value of the select
 *   option that will unhide this element.
 */
(function (document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function (e) {
        // if there is already an inital value make sure the according target element becomes visible
        Coral.commons.ready(function () {
            showHideHandler($(".cq-dialog-dropdown-showhide", e.target));
        });
    });

    $(document).on("selected", ".cq-dialog-dropdown-showhide", function (e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {
        el.each(function (i, element) {
            if ($(element).is("coral-select")) {
                // handle Coral3 base drop-down
                Coral.commons.ready(element, function (dropDownComponent) {
                    showHide(dropDownComponent, element);
                    dropDownComponent.on("change", function () {
                        showHide(dropDownComponent, element);
                    });
                });
            } else {
                // handle Coral2 based drop-down
                var dropDownComponentEle = $(element).data("select");
                if (dropDownComponentEle) {
                    showHide(dropDownComponentEle, element);
                }
            }
        })
    }

    function showHide(dropDownComponent, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        var target = $(element).data("cqDialogDropdownShowhideTarget");
        var $target = $(target);
        var attrName = "data-showhidetargetvalue";

        if (target) {
            var value;
            if (typeof dropDownComponent.value !== "undefined") {
                value = dropDownComponent.value;
            } else if (typeof dropDownComponent.getValue === "function") {
                value = dropDownComponent.getValue();
            }

            // make sure all unselected target elements are hidden.
            $target.not(".hide").addClass("hide");

            $target.filter("[" + attrName + "]").each(function() {
                var $targetElement = $(this);
                var values = $targetElement.attr(attrName).split(",");
                $.each(values, function(index, targetVal) {
                    if (targetVal === value) {
                        $targetElement.removeClass("hide");
                    }
                });
            });
        }
    }

})(document, Granite.$);