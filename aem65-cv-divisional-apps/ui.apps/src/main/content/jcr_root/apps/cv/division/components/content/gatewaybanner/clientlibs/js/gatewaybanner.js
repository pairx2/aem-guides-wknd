(function ($, $document) {
    "use strict";


    $(document).on("click", ".cq-dialog-submit", function (e) {


        $(".coral-Form-field[name*='./cta']").each(function () {

            let cta = $(this).val();

            if (cta == 'url') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='url']").find(".coral-Form-field[name*='./urlLink']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='url']").find(".coral-Form-field[name*='./urlLink']").prop('required', false);
            }

            if (cta == 'anchorLink') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='anchorLink']").find(".coral-Form-field[name*='./anchorID']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='anchorLink']").find(".coral-Form-field[name*='./anchorID']").prop('required', false);
            }
            if (cta == 'downloadasset') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='downloadasset']").find(".coral-Form-field[name*='assetURL']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='downloadasset']").find(".coral-Form-field[name*='assetURL']").prop('required', false);
            }

            if (cta == 'clicktocall') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='clicktocall']").find(".coral-Form-field[name*='./phoneNumber']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='clicktocall']").find(".coral-Form-field[name*='./phoneNumber']").prop('required', false);
            }

            if (cta == 'video') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./mediaId']").prop('required', true);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./playerId']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./mediaId']").prop('required', false);
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='video']").find(".coral-Form-field[name*='./playerId']").prop('required', false);
            }

            if (cta == 'ytvideo') {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='ytvideo']").find(".coral-Form-field[name*='./videoId']").prop('required', true);
            } else {
                $(this).parent().siblings(".showhidetargetmulti[data-showhidetargetmultivalue='ytvideo']").find(".coral-Form-field[name*='./videoId']").prop('required', false);
            }

        });

        let bgtype = $(".coral-Form-field[name='./bgType']").val();

        if (bgtype == 'image') {

            $(".coral-Form-field[name*='./bannerImagePath']").each(function () {

                if ($(this).val() == '') {
                    $(this).prop('required', true);
                }
            });
            $(".coral-Form-field[name*='./bannerImageAlttext']").each(function () {
                let currectAltTxt = $(this);
                let altIndx = $(this).closest('coral-multifield-item').index();
                $(".coral-Form-field[name*='./decorative']").each(function () {
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

        } else if (bgtype == 'backgroundColor') {
            $(".coral-Form-field[name*='./bannerImagePath']").each(function () {

                if ($(this).val() == '') {
                    $(this).prop('required', false);
                }
            });
            $(".coral-Form-field[name*='./bannerImageAlttext']").each(function () {

                if ($(this).val() == '') {
                    $(this).prop('required', false);
                }
            });
        }
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


            $(element).closest('coral-multifield-item').find(target).each(function (index) {
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
                ui.alert("Warning", "Maximum " + max + " Pannel are allowed!", "notice");
                domitems.last().remove();
            }
        }
    });

})($, $(document));
