(function (document, $) {
	"use strict";

    const checkboxRenderOn  = '[name="./checkboxRenderOn"]';
    const checkboxRenderOnHelp = '[name="./checkboxRenderOnHelp"]';
	const renderOn = '[name="./renderOnField"], [name="./renderOnValue"], [name="./fieldMapped"], [name="./otp"], [name="./magento"], [name="./ecomOnly"]';
    const renderOnHelp = '[name="./renderOnFieldHelpInfo"], [name="./renderOnValueHelpInfo"],'+
                            '[name="./fieldMappedHelpInfo"], [name="./otpHelpInfo"], [name="./magentoHelpInfo"], [name="./ecomOnlyHelpInfo"]';

	$(document).on("foundation-contentloaded", function (e) {
        dynamicHandler($(".help-checkbox-events, .fieldtype-dropdown-events", e.target));
        renderOnFieldsShowHideHandler($(".renderOn-checkbox-events-text", e.target));
        renderOnFieldsShowHideHandlerHelp($(".renderOn-checkbox-events-text-help", e.target));
	});

	$(document).on("change", ".help-checkbox-events, .fieldtype-dropdown-events", function (e) {
		dynamicHandler($(this));
	});

    $(document).on("change", ".renderOn-checkbox-events-text", function (e) {
		renderOnFieldsShowHideHandler($(this));
	});

    $(document).on("change", ".renderOn-checkbox-events-text-help", function (e) {
		renderOnFieldsShowHideHandlerHelp($(this));
	});

	function dynamicHandler(el) {
		el.each(function (i, element) {
			Coral.commons.ready(element, function (component) {
                var coralTab = $(".text-showhide-tabs coral-tablist coral-tab");
				if ($(element).is("coral-checkbox")) {
					showHideTab(component, element, coralTab);
					component.on("change", function () {
						showHideTab(component, element, coralTab);
					});
				}else if ($(element).is("coral-select")) {
					showHideField(component, element);
                    showHideTab(component, element, coralTab);
					component.on("change", function () {
						showHideField(component, element);
                        showHideTab(component, element, coralTab);
					});
				}
			});
		})
	}

	function showHideField(component, element) {
        var target = $(element).data("fieldtypeDropdownEventsTarget");
		if (target) {
			if (component.value) {

				$('[name="./btnClassName"], [name="./tagName"], [name="./placeholder"], [name="./initValue"], [name="./size"], [name="./theme"]').parent().hide();
				$('[name="./render"], [name="./sitekey"], [name="./maxLength"], [name="./row"], [name="./rte"]').parent().hide();
                $('[name="./errorUpdateProfile"], [name="./errorUpdateProfileNonDOUser"], [name="./href"]').parent().hide();
				renderFieldAttr(component);
			}
		}
	}
	function renderFieldAttr(component){
		const maxLength = $('[name="./maxLength"]');
        showHideBasicField(component,maxLength);
		showHideAdvanceField(component,maxLength);
	}
	function showHideBasicField(component,maxLength){
		if (component.value === 'htmltag') {
			$('[name="./btnClassName"], [name="./tagName"]').parent().show();
		} else if (component.value === 'textbox') {
			$('[name="./placeholder"]').parent().show();
			maxLength.parent().show();
		} else if (component.value === 'textarea') {
			$('[name="./row"]').parent().show();
			maxLength.parent().show();
		}  else if (component.value === 'password') {
			maxLength.parent().show();
		} else if (component.value === 'rte') {
			$('[name="./btnClassName"], [name="./rte"]').parent().show();
		}
	}
	function showHideAdvanceField(component,maxLength){
		if (component.value === 'divider') {
			$('[name="./className"]').parent().show();
		} else if (component.value === 'passwordstrength') {
			maxLength.parent().show();
		} else if (component.value === 'socialLogin') {
			 $('[name="./errorUpdateProfile"], [name="./errorUpdateProfileNonDOUser"]').parent().show();
		} else if (component.value === 'tel') {
			maxLength.parent().show();
		} else if (component.value === 'hidden') {
			$('[name="./initValue"]').parent().show();
		} else if (component.value === 'captcha') {
			$('[name="./size"], [name="./theme"], [name="./render"], [name="./sitekey"]').parent().show();
		} else if (component.value === 'link') {
			$('[name="./href"]').parent().show();
		}else if (component.value === 'googleApi') {
			maxLength.parent().show();
		}
	}
	function showHideTab(component, element, coralTab) {
		var target = $(element).data("helpCheckboxEventsTarget");
		var targetDropdown = $(element).data("fieldtypeDropdownEventsTarget");

		if (target) {
			const iconContent = $('[name="./icon"], [name="./content"]');
			if (component.checked) {
				coralTab[2].show();
				iconContent.attr('aria-invalid', true);
				iconContent.attr('aria-required', true);
			} else {
				coralTab[2].hide();
				iconContent.removeAttr('aria-invalid', true);
				iconContent.removeAttr('aria-required', true);
			}
		}
		if(targetDropdown){
            if (component.value === 'passwordstrength'){
				coralTab[3].show();
            }else {
				coralTab[3].hide();
            }
        }
	}


    function renderOnFieldsShowHideHandler(el) {
		if ($(checkboxRenderOn).length > 0) {
			if ($(checkboxRenderOn).get(0).checked === true) {
				$(renderOn).parent().show();
			} else {
				$(renderOn).parent().hide();
			}
		}
	}

    function renderOnFieldsShowHideHandlerHelp(e2) {
		if ($(checkboxRenderOnHelp).length > 0) {
			if ($(checkboxRenderOnHelp).get(0).checked === true) {
				$(renderOnHelp).parent().show();
			} else {
				$(renderOnHelp).parent().hide();
			}
		}
	}

})(document, Granite.$);
