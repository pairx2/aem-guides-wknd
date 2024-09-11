/**
 * Contactus Experience page for commerce
 **/
$("#contactButtonSendReq").prop("disabled", true);
const errorMessage = "The email doesn't match";
let helpText, inputError, inputExclamation, excIcon, confirmEmailLabel;

$(document).ready(function() {
	if ($("#contactus-confirmemail").length > 0) {
		inputError = findSiblings('.a-input-field--text-require');
		inputExclamation = findSiblings('.a-input-field--text-error');
		excIcon = $(inputExclamation.firstChild);
		confirmEmailLabel = findSiblings('.a-input-label');
		helpText = $("#contactus-confirmemail").parent().siblings('.a-input-field--text-help');
		if (helpText.length > 0) {
			helpText = helpText[0]
		}
	}

	function findSiblings(domEle) {
		return ($("#contactus-confirmemail").parent().siblings(domEle)[0]);
	}

	let confirmEmail = $("#contactus-confirmemail");
	let emailAddress = $("#contactus-email").val();

	contactUsConfirmEmailError(emailAddress,showError,removeError);
	
	contactUsEmailError(emailAddress,showError,removeError);

	function showError() {
		$("#contactButtonSendReq").prop("disabled", true);
		inputError.textContent = errorMessage;
		addClass(inputError, 'customErrorClass');
		addClass(inputExclamation, 'customError');
		addClass(excIcon[0], 'exce-icon');
		addClass(confirmEmail[0], 'confirmEmailError');
		addClass(confirmEmailLabel, 'customErrorClass');
		if (helpText.length > 0) {
			addClass(helpText, 'hideItem');
		}
	}

	function removeError() {
		removeClass(inputError, 'customErrorClass');
		removeClass(inputExclamation, 'customError');
		removeClass(excIcon[0], 'exce-icon');
		removeClass(confirmEmail[0], 'confirmEmailError');
		removeClass(confirmEmailLabel, 'customErrorClass');
		if (helpText.length > 0) {
			removeClass(helpText, 'hideItem');
		}
	}

	function addClass(ele, className) {
		ele.classList.add(className);
	}

	function removeClass(ele, className) {
		ele.classList.remove(className);
	}

	$("#contactFormOuterContainer").on("change focus focusout keyup", function(e) {
		emailAddress = $("#contactus-email").val();
		
		if (emailAddress == $("#contactus-confirmemail").val() && emailAddress != "" && $('#contactFirstName').val() != "" && $('#contactLastName').val() != "" && $('#contactMessage').val() != "" && $('.a-checkbox__input').is(':checked')) {
			$("#contactButtonSendReq").prop("disabled", false);
		} else {
			document.getElementById("contactButtonSendReq").disabled = true;
			$("#contactButtonSendReq").prop("disabled", true);
		}
	})
});
const contactUsEmailError = (emailAddress,showError,removeError) => {
	if ($("#contactus-email").length > 0) {
		$("#contactus-email").on("keyup blur change focus focusout", function(e) {
			emailAddress = $("#contactus-email").val();
			if (emailAddress == $("#contactus-confirmemail").val() && emailAddress != "") {
				removeError();
			} else if (emailAddress !== "" && $("#contactus-confirmemail").val() !== "") {
				showError();
			}
		});
	}
}
const contactUsConfirmEmailError = (emailAddress,showError,removeError) =>
	{
		if ($("#contactus-confirmemail").length > 0) {
			$("#contactus-confirmemail").on("keyup blur change focus focusout", function(e) {
				emailAddress = $("#contactus-email").val();
				if (emailAddress == $("#contactus-confirmemail").val() && emailAddress != "") {
					removeError();
				} else {
					showError();
				}
			});
		}
}
