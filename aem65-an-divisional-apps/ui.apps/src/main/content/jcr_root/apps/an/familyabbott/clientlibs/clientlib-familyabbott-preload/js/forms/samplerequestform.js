function redirectToErrorPage() {
    let path = window.location.pathname;
    path = path.replace(".html", "");
    let errorPath = window.location.assign(path + '/error.html');
    return errorPath;
}

function redirectToNewsletterErrorPage () {
    let errorPath = $('#ph-newsletter-error-path').val();
    if (errorPath) {
        window.location.href = errorPath;
    }
}

function redirectToToolErrorPage () {
    let errorPath = $('#ph-tool-error-path').val();
    if (errorPath) {
        window.location.href = errorPath;
    }
}

function successGrowthCheck () {
    $('#ph-growth-identifier').click();
}

function successHWGrowthCheck () {
    $('#growth-calculator-hw-identifier').click();
}

function successGrowthQuiz () {
   $('#ph-growth-form').removeClass('active');
   $('body').removeClass('popup-overlay');
}

function successBMICalculator () {
   $('#ph-bmi-calculator-form').removeClass('active');
   $('body').removeClass('popup-overlay');
   sessionStorage.setItem('bmiResult','stored');
}
const retriveUTMParams = (data)=> {
    // retrieve UTM params
    let pageURL = window.location.search.substring(1);
    let variablesURL = pageURL.split('&');
    for (let pageUrls of variablesURL) {
        let paraName = pageUrls.split('=');
        if (paraName[0] == "utm_medium") {
            data.body.utmMedium = paraName[1];
        } else if (paraName[0] == "utm_source") {
            data.body.utmSource = paraName[1];
        } else if (paraName[0] == "utm_content") {
            data.body.utmContent = paraName[1];
        } else if (paraName[0] == "utm_campaign") {
            data.body.utmCampaign = paraName[1];
        } else if (paraName[0] == "utm_terms") {
            data.body.utmTerms = paraName[1];
        } else if (paraName[0] == "utm_string") {
            data.body.utmString = paraName[1];
        } else if (paraName[0] == "orgid") {
            data.body.channel = paraName[1];
        }
    }
}
function processFormData(data) {
    // registration Date
    let date = new Date().toISOString().split('T')[0];
    data.body.registrationDate = date;

    retriveUTMParams(data);

    // set products id, campaign name and brand id
    if ($('#ph-radio-option-products-options').length > 0) {
        let productValues = $('#ph-radio-option-products-options .a-radio .a-radio__input:checked').val().split(',');
        if (productValues[0]) {
            data.body.sampleProductId = productValues[0];
        }

        if (productValues[1]) {
            data.body.campaignName = productValues[1];
        }

        if (productValues[2]) {
            data.body.brandId = productValues[2];
        }
    }

    if (data.body.sampleProductIdRadio) {
        delete data.body.sampleProductIdRadio;
    }

    if (data.body.addressOptions) {
        delete data.body.addressOptions;
    }

    if (data.body.haveDiabetic == "Self") {
		data.body.brandId = $('[name="brandIdDiabetesCare"]').val();
    }
    let isConsent = true;
    if (data.body.communicationConsent == isConsent) {
		data.body.communicationConsent = "TRUE";
    }

    if (data.body.sampleRequestConsent == isConsent) {
		data.body.sampleRequestConsent = "TRUE";
    }
    
    return data;
}
function submitPrePopupClose() {
	$('#form-submit-before-popup').removeClass('active');
	$('body').removeClass('popup-overlay');
}
function submitPrePopup() {
	if($('#form-submit-before-popup').length > 0) {
		$('#form-submit-before-popup').addClass('active');
		$('body').addClass('popup-overlay');
		$('#form-submit-before-popup').find('#form-submit-before-popup-close').on('click', function() {
			submitPrePopupClose();
		});
		$('#form-submit-before-popup-dismiss').on('click', function(e) {
			e.preventDefault();
			submitPrePopupClose();
		});
	}
}