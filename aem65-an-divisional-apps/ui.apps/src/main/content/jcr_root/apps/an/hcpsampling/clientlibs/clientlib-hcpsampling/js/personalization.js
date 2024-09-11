$(document).ready(function () {
    //varaiable for hiding loginCTA 
    const userLoginBtnContainer = $("#userLoginBtnContainer");
	const afterClinicalSolutionBtn = $("#afterClinicalSolutionBtn");
	const clinicalSearchBtn = $("#clinicalSearchBtn");
	const eduProfBtn = $("#eduProfBtn");
	const nutriResourceBtn = $("#nutriResourceBtn");
	const resgistrationTxt =$("#resgistrationTxt");
	const registrationBtn = $("#registrationBtn");
    const afterloginClinicalSolutionBtn = $("#afterloginClinicalSolutionBtn");
    const clinicalSearchLearnMoreBtn = $("#clinicalSearchLearnMoreBtn");
    const eduProfLearnMoreBtn = $("#eduProfLearnMoreBtn");
    const nutriResourceLearnMoreBtn = $("#nutriResourceLearnMoreBtn");   


    if (isUserLoggedIn()) {
        // if user is logged in - show callout based on segmentType from user data
        const homeLoginFormContainer = $("#homeLoginFormContainer");
        if (homeLoginFormContainer.length) {
            homeLoginFormContainer.addClass("d-none");
        }

        const data = getLocalStorage("userInfo");
        const segmentType = data.additionalProperties.segmentType;
        if (segmentType !== undefined) {
            const callout = $("#homeLoggedInCallout" + segmentType);
            if (callout.length) {
                callout.addClass("d-block");
            }
        }

        // function call to hide Login CTA if user logged in
        hideLoginbtn(userLoginBtnContainer);
		hideLoginbtn(afterClinicalSolutionBtn);
		hideLoginbtn(clinicalSearchBtn);
		hideLoginbtn(eduProfBtn);
		hideLoginbtn(nutriResourceBtn);
		hideLoginbtn(resgistrationTxt);
		hideLoginbtn(registrationBtn);
        //show learn more button
        showLearMore(afterloginClinicalSolutionBtn);
        showLearMore(clinicalSearchLearnMoreBtn);
        showLearMore(eduProfLearnMoreBtn);
        showLearMore(nutriResourceLearnMoreBtn);

    }

    function hideLoginbtn(elmId){
		if (elmId.length) {
			elmId.addClass("d-none");
		}	
	}
    function showLearMore(BtnId){
        if (BtnId.length) {
			BtnId.show();
		}	
    }
});