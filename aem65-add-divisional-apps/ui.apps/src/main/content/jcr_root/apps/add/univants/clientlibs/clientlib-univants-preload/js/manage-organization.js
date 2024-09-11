function UpdateAddOrganization(formData) {
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    formData.headers = {
            'x-country-code': headerCountryCode,
            'x-application-id': headerApplicationId,
            'x-preferred-language': headerLanguage,
            'Content-Type': 'application/json',
			'x-id-token': jwtToken,
			'x-application-access-key': 'admin1#Admin'
        }
        formData.body = {
            type: "Organization",
            name: formData.body.organizationname,
            status: "ACTIVE",
            body: {
                "isAuditOrgn": formData.body.isAuditOrganization

            }
        }

}

//Add organization error message
function onErrorAddOrganization(response) {
    $(".o-form-container__error-msg").hide();
    showApiError('#add-organization-api-error', response);

}

function onupdateReactiveorganization(formData) {
    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
    var headerCountryCode = document.querySelector('input[name="x-country-code"]').value
    var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;

    var selectedOrg = document.querySelector('ul[name="reactivate-organization-names"] .selected').getAttribute('data-hashcontent');
    var selectedOrgID = document.querySelector('ul[name="reactivate-organization-names"] .selected').getAttribute('id');
    formData.headers = {
        'x-country-code': headerCountryCode,
        'x-application-id': headerApplicationId,
        'x-preferred-language': headerLanguage,
		'x-id-token': jwtToken,
		'x-application-access-key': 'admin1#Admin'
    }

    formData.body = {
        type: "Organization",
        id: selectedOrgID,
        _hashedContent: selectedOrg,
        status: "ACTIVE"

    }
}