(function (document, $) {
	"use strict";
	const checkboxImgReq = '[name="./checkboxImgReq"]';
	const imageFile = '[name="./file"]';
	const checkboxRenderOn  = '[name="./checkboxRenderOn"]';
	const renderOn = '[name="./renderOnField"], [name="./renderOnValue"], [name="./fieldMapped"], [name="./otp"], [name="./magento"]';
	const apiCallRequired = '[name="./apiCallRequired"]';
	const apiField = '[name="./apiUrl"], [name="./apiMethod"]';
	const displayLabelFormat = '[name="./displayLabelFormat"]';
	const valueFormat = '[name="./valueFormat"]';
	const btnClassName = '[name="./btnClassName"]';
	const placeholder = '[name="./placeholder"]';


	$(document).on("foundation-contentloaded", function (e) {
		imageShowHideHandler($(".image-checkbox-events", e.target));
		renderOnFieldsShowHideHandler($(".renderOn-checkbox-events", e.target));
		dynamicShowHideHandler($(".api-checkbox-events, .api-dropdown-events", e.target));
	});

	$(document).on("change", ".api-dropdown-events, .api-checkbox-events", function (e) {
		dynamicShowHideHandler($(this));
	});

	$(document).on("change", ".image-checkbox-events", function (e) {
		imageShowHideHandler($(this));
	});

	$(document).on("change", ".renderOn-checkbox-events", function (e) {
		renderOnFieldsShowHideHandler($(this));
	});

	function dynamicShowHideHandler(el) {

		el.each(function (i, element) {
			var coralTab = $(".option-showhide-tabs coral-tablist coral-tab");
			Coral.commons.ready(element, function (component) {
				if ($(element).is("coral-select")) {
					showHideField(component, element, coralTab);
					component.on("change", function () {
						showHideField(component, element, coralTab);
					});
				} else if ($(element).is("coral-checkbox")) {
					showHideTab(component, element, coralTab);
					component.on("change", function () {
						showHideTab(component, element, coralTab);
					});
				}
			});
		})
	}

	function showHideField(component, element, coralTab) {

		var target = $(element).data("apiDropdownEventsTarget");
		if (target) {
			var value;
			if (component.value) {
				value = component.value;
				$(apiCallRequired.concat(',').concat(displayLabelFormat).concat(',').concat(valueFormat).concat(',').concat(imageFile)).parent().hide();
				$(btnClassName.concat(',').concat(placeholder).concat(',').concat(renderOnField).concat(',').concat(renderOnValue)).parent().hide();
                $(fieldMapped.concat(',').concat(magento).concat(',').concat(otp)).parent().hide();
				$(checkboxImgReq.concat(',').concat(checkboxRenderOn)).hide();		
				$('[data-granite-coral-multifield-name="./items"]').parent().show();
				showHideRequiredFields(coralTab, 'hide');

				if (value === 'dropdown') {
					showHideForDropdownField(coralTab);				
				} else if (value === 'checkbox') {
					showHideForCheckboxField();
                    showHideForRadioField();
				} else if (value === 'radio-button') {
					$('[name="./btnClassName"]').parent().show();
                    showHideForRadioField();
				} else if (value === 'radio') {
					showHideForRadioField();					
				}
			}
		}
	}

	function showHideForDropdownField(coralTab) {
		$(apiCallRequired.concat(',').concat(displayLabelFormat).concat(',').concat(valueFormat).concat(',').concat(placeholder).concat(',').concat(checkboxRenderOn)).parent().show();	
		if ($(apiCallRequired).length > 0) {
			if ($(apiCallRequired).get(0).checked === true) {
				showHideRequiredFields(coralTab, 'show');
			}
		}
		if ($(checkboxRenderOn).length > 0) {
			if ($(checkboxRenderOn).get(0).checked === true) {
				$(renderOn).parent().show();
			}
		}
	}

	function showHideForCheckboxField() {
		$(checkboxImgReq).show();
		$('[data-granite-coral-multifield-name="./items"]').parent().hide();
		if ($(checkboxImgReq).length > 0) {
			if ($(checkboxImgReq).get(0).checked === true) {
				$(imageFile).parent().show();
			}
		}
       showHideForRadioField();

	}

	function showHideForRadioField() {
		$(checkboxRenderOn).parent().show();
		if ($(checkboxRenderOn).length > 0) {
			if ($(checkboxRenderOn).get(0).checked === true) {
				$(renderOn).parent().show();
			}
		}
	}

	function showHideTab(component, element, coralTab) {
		var target = $(element).data("apiCheckboxEventsTarget");
		if (target) {
			if (component.checked) {
				showHideRequiredFields(coralTab, 'show');
			} else {
				showHideRequiredFields(coralTab, 'hide');
			}
		}
	}

	function showHideRequiredFields(coralTab, requiredType) {
		if (requiredType === 'hide') {
			coralTab[2].hide();
			$(apiField).removeAttr('aria-invalid', true);
			$(apiField).removeAttr('aria-required', true);
		} else if (requiredType === 'show') {
			coralTab[2].show();
			$(apiField).attr('aria-invalid', true);
			$(apiField).attr('aria-required', true);
		}

	}

	function imageShowHideHandler(el) {
		if ($(checkboxImgReq).length > 0) {
			if ($(checkboxImgReq).get(0).checked === true) {
				$(imageFile).parent().show();
			} else {
				$(imageFile).parent().hide();
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

})(document, Granite.$);
