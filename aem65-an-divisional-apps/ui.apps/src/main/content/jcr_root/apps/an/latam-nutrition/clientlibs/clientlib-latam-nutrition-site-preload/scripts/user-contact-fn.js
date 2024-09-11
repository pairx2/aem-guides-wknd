function gtmCountryContact() {
	let gtm_countryCode = $("body").attr("data-country-code") ? $("body").attr("data-country-code").toLowerCase() : $('[name="x-country-code"]').val().toLowerCase();
	let gtm_countryList = $('[name="gtm_country"]').val();
	let countryCountContact = 0;
	if(gtm_countryList != undefined) {
		if(gtm_countryList.indexOf(",") > -1) {
			let gtmCountrySplit = gtm_countryList.toLowerCase().split(",");
			for(let i in gtmCountrySplit) {
				if(gtmCountrySplit[i] === gtm_countryCode) {
					countryCountContact++;
				}
			}
		}
		else if(gtm_countryList.toLowerCase() === gtm_countryCode) {
			countryCountContact++;
		}
	}
	return countryCountContact;
} 
function onBeforeLatamnutritionContactRequest(data) {
	let countryStatus = gtmCountryContact();
	if(countryStatus != 0) {
		dataLayer.push({
			'formType': 'Contact_form',
			'event': 'clickToSendContactInformation'
		});
	}
}
function onSuccessLatamnutritionContactRequest(data) {
	let countryStatus = gtmCountryContact();
	if(countryStatus != 0) {
		if (data.errorCode !== 0) {
			dataLayer.push({
				'formType': 'Contact_form',
				'event': ' contactRequestNotSent'
			});
		}
		else {
			dataLayer.push({
				'formType': 'Contact_form',
				'event': 'contactRequestSent'
			});
		}
	}
}