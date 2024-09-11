/**
 * Extension to the standard checkbox component. It enables showing/hiding of other components based on the
 * selection made in the checkbox in multifield.
 *
 * How to use:
 *
 * - add the granite:class cq-dialog-checkbox-showhide-multifield to the checkbox element
 * - add the data attribute cq-dialog-checkbox-showhide-multifield-target to the checkbox element, value should be the
 *   selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
 * - add the target class to each target component that can be shown/hidden
 * - add the granite:class hide to each target component to make them initially hidden
 * - add the attribute showhidetargetvalue to each target component, the value 
 *   should equal the value of the select option that will unhide this element. 
 *   Leave this value as an empty string to toggle the target component on when the checkbox is unchecked.
 */
(function(document, $) {
    "use strict";

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
		// if there is already an inital value make sure the according target element becomes visible
        Coral.commons.ready(function () {
            showHideHandler($(".cq-dialog-checkbox-showhide-multifield", e.target));
        });

    });

     $(document).on("change", ".cq-dialog-checkbox-showhide-multifield", function(e) {
        showHideHandler($(this));
    });

    function showHideHandler(el) {
        el.each(function (i, element) {
            if ($(element).is("coral-checkbox")) {
                // handle Coral3 base checkbox
                Coral.commons.ready(element, function (component) {
                    showHide(component, element);
                    component.on("change", function () {
                        showHide(component, element);
                    });
                });
            }
        })
    }


    function showHide(component, element){
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

})(document,Granite.$);