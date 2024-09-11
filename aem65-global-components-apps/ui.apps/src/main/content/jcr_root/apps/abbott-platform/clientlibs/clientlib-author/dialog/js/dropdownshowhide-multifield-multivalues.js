(function(document, $) {
    "use strict";



    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHideHandler($(".cq-dialog-dropdown-showhide-multival", e.target));
    });

 

    function showHideHandler(el) {
        el.each(function(i, element) {
                Coral.commons.ready(element, function(component) {
                    showHide(component, element);
                    component.on("change", function() {
                        showHide(component, element);
                    });
                });
        })
    }

 

    function showHide(component, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        const target = $(element).data("cqDialogDropdownShowhideTarget");
        let $target = $(target);

        if (target) {
            let value;
            if (typeof component.value !== "undefined") {
                value = component.value;
             } else if (typeof component.getValue === "function") {
                value = component.getValue();
            }
            $target.each(function(index) {
                    $(this).not(".hide").addClass("hide");
                    $(this).filter(function() {
                        return $(this).data('showhidetargetvalue').replace(/ /g, '').split(',').includes(value);
                    }).removeClass("hide");
            });
        }
    }



})(document, Granite.$);
