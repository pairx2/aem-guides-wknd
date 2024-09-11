(function(document, $) {
    "use strict";
        
        $(document).on("click", ".cq-dialog-submit", function(e) {
             
        $(".coral-Form-field[name*='./videoType']").each(function() {

            var videoType = $(this).val();

            if (videoType == 'limeLight') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./orgID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./mediaID']").prop('required', true);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./limelightPlayerID']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./orgID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./mediaID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./limelightPlayerID']").prop('required', false);
            }
            
            if (videoType == 'brightcove') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='brightcove']").find(".coral-Form-field[name*='./videoCarouselAccountID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='brightcove']").find(".coral-Form-field[name*='./videoCarouselBrightVideoID']").prop('required', true);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='brightcove']").find(".coral-Form-field[name*='./videoCarouselBrightPlayerID']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./videoCarouselAccountID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./videoCarouselBrightVideoID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='limeLight']").find(".coral-Form-field[name*='./videoCarouselBrightPlayerID']").prop('required', false);
            }
            
            if (videoType == 'iframe') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='iframe']").find(".coral-Form-field[name*='./videoURL']").prop('required', true);
                
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultiValue='iframe']").find(".coral-Form-field[name*='./videoURL']").prop('required', false);
               
            }
	
        });


    });

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function (e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHideHandler($(".cq-dialog-dropdown-showhide-multi", e.target));
    });

    $(document).on("selected", ".cq-dialog-dropdown-showhide-multi", function (e) {
        showHideHandler($(this));
    });

    $(document).on("click", "button[coral-multifield-add]", function (e) {
        showHideHandler($(".cq-dialog-dropdown-showhide-multi"));
    });

    function showHideHandler(el) {
        el.each(function (i, element) {
            if ($(element).is("coral-select")) {
                // handle Coral3 base drop-down
                Coral.commons.ready(element, function (component) {
                    showHide(component, element);
                    component.on("change", function () {
                        showHide(component, element);
                    });
                });
            } else {
                // handle Coral3 based drop-down
                let components = $(element).data("select");
                if (components) {
                    showHide(components, element);
                }
            }
        })
    }

    function showHide(component, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        //var target = $(element).data("cqDialogDropdownShowhideTarget");
        let target = $(element).data("cq-dialog-dropdown-showhide-target");
        let elementIndex = $(element).closest('coral-multifield-item').index();

        if (target) {
            let value;
            if (component.value) {
                value = component.value;
            } else {
                value = component.getValue();
            }


            $(element).closest('coral-multifield-item').find(target).each(function (index,obj) {
                let tarIndex = $(this).closest('coral-multifield-item').index();
                if (elementIndex == tarIndex) {
                    $(this).not(".hide").addClass("hide");

                    $(this).filter(function () {
                        return $(this).closest('.showhidetargetmulti').data('showhidetargetmultivalue').replace(/ /g, '').split(',').includes(value);
                    }).removeClass("hide");
                }

            });

        }
    }

    let registry = $(window).adaptTo("foundation-registry");

    // Validator for required for multifield max and min items
    registry.register("foundation.validation.validator", {
        selector: "[data-validation=banner-multifield-validate]",
        validate: function (element) {
            let el = $(element);
            let max = el.data("maxlinksallowed");
            let items = el.children("coral-multifield-item").length;
            let domitems = el.children("coral-multifield-item");
            let ui = $(window).adaptTo("foundation-ui");
            if (items > max) {
                ui.alert("Warning", "Maximum numbers of items allowed are: " + max, "notice");
                domitems.last().remove();
            }
        }
    });
    
})(document, Granite.$);
