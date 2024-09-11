$(document).ready(function () {

    let sampleForm = $("#sampleFormContainer");

    if (sampleForm.length) {

        if($("input[name=x-country-code]").val() == "TH"){
			$("#sampleQuantity-options").hide();
        }

        let userInfo = getLocalStorage("userInfo");

		//prepopulation of user details
        $("#sampleFirstName").val(userInfo.firstName);
		$("#sampleLastName").val(userInfo.lastName);
        $("#sampleEmail").val(userInfo.email);
        $("#sampleMobileNumber").val(userInfo.additionalProperties.phone);
        $("#sampleLicenseNumber").val(userInfo.additionalProperties.licenseID);

    }
});
