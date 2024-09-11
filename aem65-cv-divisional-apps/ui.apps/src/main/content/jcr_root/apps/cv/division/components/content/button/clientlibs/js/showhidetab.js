(function(document, $) {
    "use strict";
    $(document).on("click", ".cq-dialog-submit", function(e) {


        $(".coral-Form-field[name*='./buttonType']").each(function() {

            var buttontype = $(this).val();

            if (buttontype == 'url') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='url']").find(".coral-Form-field[name*='./urlLink']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='url']").find(".coral-Form-field[name*='./urlLink']").prop('required', false);
            }

            if (buttontype == 'anchor') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='anchor']").find(".coral-Form-field[name*='./anchorName']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='anchor']").find(".coral-Form-field[name*='./anchorName']").prop('required', false);
            }
            if (buttontype == 'asset') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='asset']").find(".coral-Form-field[name*='assetLink']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='asset']").find(".coral-Form-field[name*='assetLink']").prop('required', false);
            }

            if (buttontype == 'clicktocall') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='clicktocall']").find(".coral-Form-field[name*='./phoneNumber']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='clicktocall']").find(".coral-Form-field[name*='./phoneNumber']").prop('required', false);
            }

            if (buttontype == 'video') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./mediaId']").prop('required', true);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./playerId']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./mediaId']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./playerId']").prop('required', false);
            }
            if (buttontype == 'brightCove') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='brightCove']").find(".coral-Form-field[name*='./accountID']").prop('required', true);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='brightCove']").find(".coral-Form-field[name*='./brightVideoID']").prop('required', true);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='brightCove']").find(".coral-Form-field[name*='./brightPlayerID']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='brightCove']").find(".coral-Form-field[name*='./accountID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='brightCove']").find(".coral-Form-field[name*='./brightVideoID']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='brightCove']").find(".coral-Form-field[name*='./brightPlayerID']").prop('required', false);
            }

            if (buttontype == 'ytvideo') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='ytvideo']").find(".coral-Form-field[name*='./videoId']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='ytvideo']").find(".coral-Form-field[name*='./videoId']").prop('required', false);
            }

        });



    });

    // when dialog gets injected
    $(document).on("foundation-contentloaded", function(e) {
        // if there is already an inital value make sure the according target element becomes visible
        showHideHandler($(".cq-dialog-dropdown-showhide-multi", e.target));
        showHideContHandler($(".cq-dialog-dropdown-height-selection", e.target));
    });

    function showHideContHandler(el) {
        el.each(function(i, element) {
            Coral.commons.ready(element, function(component) {
                showHideCont(component, element);
                component.on("change", function() {
                    showHideCont(component, element);
                });
            });
        })
    }

    $(document).on("selected", ".cq-dialog-dropdown-showhide-multi", function(e) {
        showHideHandler($(this));
    });

    $(document).on("click", "button[coral-multifield-add]", function(e) {
        showHideHandler($(".cq-dialog-dropdown-showhide-multi"));
        showHideContHandler($(".cq-dialog-dropdown-height-selection"));

    });

    function showHideHandler(el) {
        el.each(function(i, element) {
            if ($(element).is("coral-select")) {
                // handle Coral3 base drop-down
                Coral.commons.ready(element, function(component) {
                    showHide(component, element);
                    component.on("change", function() {
                        showHide(component, element);
                    });
                });
            } else {
                // handle Coral2 based drop-down
                var components = $(element).data("select");
                if (components) {
                    showHide(components, element);
                }
            }
        })
    }

    function showHide(component, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        //var target = $(element).data("cqDialogDropdownShowhideTarget");
        var target = $(element).data("cq-dialog-dropdown-showhide-target");
        var elementIndex = $(element).closest('coral-multifield-item').index();

        if (target) {
            var value;
            if (component.value) {
                value = component.value;
            } else {
                value = component.getValue();
            }


            $(element).closest('coral-multifield-item').find(target).each(function(index) {
                var tarIndex = $(this).closest('coral-multifield-item').index();
                if (elementIndex == tarIndex) {
                    $(this).not(".hide").addClass("hide");

                    $(this).filter(function() {
                        return $(this).closest('.showhidetargetmulti').data('showhidetargetmultivalue').replace(/ /g, '').split(',').includes(value);
                    }).removeClass("hide");

                    // $(this).filter("[data-showhidetargetmultivalue='" + value + "']").parent().removeClass("hide");
                }
            });

        }


    }

    function showHideCont(component, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        var target = $(element).data("cqDialogDropdownShowhideTarget");
        var $target = $(target);

        if (target) {
            var value;

            if (typeof component.value !== "undefined") {
                value = component.value;

            } else if (typeof component.getValue === "function") {
                value = component.getValue();
            }

            if (value === 'm-hbanner--small') {
                $target.each(function() {
                    $(this).not(".hide").addClass("hide");
                    var label = $(this).attr("aria-labelledby").split(" ")[0];
                    var desc = $(this).attr("aria-labelledby").split(" ")[1];
                    var labelEl = document.getElementById(label);
                    var descEl = document.querySelectorAll('[aria-describedby="' + desc + '"]');
                    $(labelEl).not(".hide").addClass("hide");
                    $(descEl).not(".hide").addClass("hide");
                });
            } else {
                $target.each(function() {
                    $(this).removeClass("hide");
                    var label = $(this).attr("aria-labelledby").split(" ")[0];
                    var desc = $(this).attr("aria-labelledby").split(" ")[1];
                    var labelEl = document.getElementById(label);
                    var descEl = document.querySelectorAll('[aria-describedby="' + desc + '"]');
                    $(labelEl).removeClass("hide");
                    $(descEl).removeClass("hide");

                });
            }
        }
    }



})(document, Granite.$);