(function (document, $) {
	"use strict";

	function dynamicHandler(ele) {
		ele.each(function (i, element) {
			Coral.commons.ready(element, function (component) {
				 if ($(element).is("coral-select")) {
					component.on("change", function () {
						showHideField(component, element);
					});
					showHideField(component, element);
				}
			});
		})
	}

	$(document).on("foundation-contentloaded", function (e) {
		dynamicHandler($(".variation-dropdown-events", e.target));
	});

	$(document).on("change", ".variation-dropdown-events", function (e) {
		dynamicHandler($(this));
	});


	function showHideField(component, element) {
        var target = $(element).data("variationDropdownEventsTarget");
		if (target) {
			if (component.value) {

				$('[name="./editMyInfo"], [name="./changePwd"], [name="./requiredLabel"], [name="./placeholder"], [name="./strongMomID"], [name="./emailAddress"]').parent().hide();
				$('[name="./emailHelperText"], [name="./subTitle"], [name="./addBaby"], [name="./editBaby"], [name="./removeBaby"]').parent().hide();
				$('[name="./label"], [name="./title"], [name="./description"], [name="./submitButton"], [name="./cancelButton"]').parent().hide();
				$('[name="./editPhoneNumberLabel"], [name="./enabledSmsNotificationsTxt"], [name="./enablingSmsNotificationsTxt"]').parent().hide();
				$('[name="./modalTitle"], [name="./modalDescription1"], [name="./modalDescription2"], [name="./modalConfirmButton"], [name="./modalCancelButton"]').parent().hide();
                $('[name="./getTextAlert"], [name="./neverMiss"], [name="./notificationSetting"], [name="./editPhoneNumberLabelOptOut"], [name="./enablingSmsNotificationsTxtGreen"]').parent().hide();
                $('[name="./enablingSmsNotificationsTxtRed"], [name="./resendSMSText"], [name="./saveChange"], [name="./smsNotificaionOptOut"], [name="./optBackClick"], [name="./optBackClickTxt"], [name="./optBackInTxt"]').parent().hide();
                if (component.value === 'myInfo') {
					$('[name="./strongMomID"], [name="./emailAddress"], [name="./editMyInfo"], [name="./emailHelperText"]').parent().show();
				} else if (component.value === 'changePassword') {
					$('[name="./placeholder"], [name="./changePwd"], [name="./label"]').parent().show();
                    $('[name="./placeholder"], [name="./requiredLabel"], [name="./label"]').parent().show();
				} else if (component.value === 'babyInfo') {
					$('[name="./subTitle"], [name="./addBaby"], [name="./editBaby"], [name="./removeBaby"], [name="./title"]').parent().show();
					$('[name="./description"], [name="./submitButton"], [name="./cancelButton"]').parent().show();
				} else if (component.value === 'smsNotification') {
					$('[name="./subTitle"], [name="./addBaby"], [name="./editBaby"], [name="./removeBaby"], [name="./title"], [name="./emailHelperText"]').parent().hide();
					$('[name="./editPhoneNumberLabel"], [name="./enabledSmsNotificationsTxt"], [name="./enablingSmsNotificationsTxt"]').parent().show();
					$('[name="./modalTitle"], [name="./modalDescription1"], [name="./modalDescription2"], [name="./modalConfirmButton"], [name="./modalCancelButton"]').parent().show();
                    $('[name="./getTextAlert"], [name="./neverMiss"], [name="./notificationSetting"], [name="./editPhoneNumberLabelOptOut"], [name="./enablingSmsNotificationsTxtGreen"]').parent().show();
                    $('[name="./enablingSmsNotificationsTxtRed"], [name="./resendSMSText"], [name="./saveChange"], [name="./smsNotificaionOptOut"], [name="./optBackClick"], [name="./optBackClickTxt"], [name="./optBackInTxt"]').parent().show();
				}
			}
		}
	}

})(document, Granite.$);
