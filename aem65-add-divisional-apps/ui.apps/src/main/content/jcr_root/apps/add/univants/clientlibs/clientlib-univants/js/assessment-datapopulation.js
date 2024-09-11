var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;


function commonRadioButton(getRadioData, inputValue) {
    $(inputValue).each(function(index, value) {
        var radioValue = $(this).attr('value');
        if (radioValue == getRadioData) {
            $(this).addClass('selected');
              $(this).attr('checked',true);
            $(this).next('span').attr('aria-checked','true');			
        }
    });
}

function addSelectToDropdown(dropdownVal, liVal){
    $(liVal).each(function(){
        if( dropdownVal == $(this).attr('data-optionvalue')){
			$(this).addClass("selected");
        }
    });
}

function assessmentDataPopulation() {
    var getAssessmentId = localStorage.getItem('JudgeAssessmentIdVal');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessment&id=' + getAssessmentId,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "user1#Judge"
        },
        success: function(assessmentResponse) {
        if (assessmentResponse.errorCode == 0) {

		var processAttrVal = assessmentResponse.response.data[0].body.processAttributes;
        var patientKpiVal = assessmentResponse.response.data[0].body.kpiAssessments.patientKpis;
        var clinicianKpiVal = assessmentResponse.response.data[0].body.kpiAssessments.clinicianKpis;
        var adminKpiVal = assessmentResponse.response.data[0].body.kpiAssessments.hospitalAdminKpis;
        var payorKpiVal = assessmentResponse.response.data[0].body.kpiAssessments.payorKpis;

        var meritRadioRes = assessmentResponse.response.data[0].body.isMerit;
        var meritText = assessmentResponse.response.data[0].body.isMeritDescription;

        var standoutRadioRes = assessmentResponse.response.data[0].body.isStandout;
        var standoutText = assessmentResponse.response.data[0].body.isStandoutDescription;

	 	/*console.log("patientKpiVal: ", patientKpiVal);*/

		/*patient KPI assessment data setting*/
        var patientKpiDropdownField = $(".patientKpiContainer").find(".a-dropdown__field .a-dropdown__placeholder");
		var index = 0;
        $(patientKpiDropdownField).each(function(){
            if(index < patientKpiVal.length){
                $(this).text(patientKpiVal[index].evidenceType).attr("class", "a-dropdown-selected");
                addSelectToDropdown(patientKpiVal[index].evidenceType, $(this).next(".a-dropdown__menu").find('li'));
            }
            index++;
        });

		var radioIndex = 0;
        $(".patientKpiContainer .sectionList").each(function(){
            var patientKpiradioBtns = $(this).find(".a-radio__input");
			if(radioIndex < patientKpiVal.length){
                $(patientKpiradioBtns).each(function(pRadioI, pRadioVal){
                    var patientKpiRadioVal = pRadioVal;
                    var patientKpiRadioRes = patientKpiVal[radioIndex].significance;
                    /*console.log("patientKpiRadioRes: ", patientKpiRadioRes);*/
                    if($(patientKpiRadioVal).attr('value') == patientKpiRadioRes){
                        $(this).addClass("selected");
                        $(this).attr('checked',true);
						$(this).next('span').attr('aria-checked','true');
                    }
                });
            }
            radioIndex++;
        });

        /*Clinician KPI assessment data setting*/
		var clinicianKpiDropdownField = $(".clinicianKpiContainer").find(".a-dropdown__field .a-dropdown__placeholder");
		var clinicianIndex = 0;
        $(clinicianKpiDropdownField).each(function(){
			if(clinicianIndex < clinicianKpiVal.length){
                $(this).text(clinicianKpiVal[clinicianIndex].evidenceType).attr("class", "a-dropdown-selected");
                addSelectToDropdown(clinicianKpiVal[clinicianIndex].evidenceType, $(this).next(".a-dropdown__menu").find('li'));
            }
            clinicianIndex++;
        });

        var clinicianRadoiIndex = 0;
        $(".clinicianKpiContainer .sectionList").each(function(){
            var clinicianKpiradioBtns = $(this).find(".a-radio__input");
            if(clinicianRadoiIndex < clinicianKpiVal.length){
                $(clinicianKpiradioBtns).each(function(cRadioI, cRadioVal){
                    var clinicianKpiRadioVal = cRadioVal;
                    var clinicianKpiRadioRes = clinicianKpiVal[clinicianRadoiIndex].significance;
                    /*console.log("clinicianKpiRadioRes: ", clinicianKpiRadioRes);*/
                    if($(clinicianKpiRadioVal).attr('value') == clinicianKpiRadioRes){
                        $(this).addClass("selected");
                        $(this).attr('checked',true);
                        $(this).next('span').attr('aria-checked','true');
                    }
                });
            }
            clinicianRadoiIndex++;
        });

        /*Admin KPI assessment data setting*/
		var adminKpiDropdownField = $(".adminKpiContainer").find(".a-dropdown__field .a-dropdown__placeholder");
		var adminIndex = 0;
        $(adminKpiDropdownField).each(function(){
             if(adminIndex < adminKpiVal.length){
                $(this).text(adminKpiVal[adminIndex].evidenceType).attr("class", "a-dropdown-selected");
                addSelectToDropdown(adminKpiVal[adminIndex].evidenceType, $(this).next(".a-dropdown__menu").find('li'));
             }
            adminIndex++;
        });

        var adminRadoiIndex = 0;
        $(".adminKpiContainer .sectionList").each(function(){
            var adminKpiradioBtns = $(this).find(".a-radio__input");
            if(adminRadoiIndex < adminKpiVal.length){
                $(adminKpiradioBtns).each(function(aRadioI, aRadioVal){
                    var adminKpiRadioVal = aRadioVal;
                    var adminKpiRadioRes = adminKpiVal[adminRadoiIndex].significance;
                    /*console.log("adminKpiRadioRes: ", adminKpiRadioRes);*/
                    if($(adminKpiRadioVal).attr('value') == adminKpiRadioRes){
                        $(this).addClass("selected");
                        $(this).attr('checked',true);
                        $(this).next('span').attr('aria-checked','true');
                    }
                });
            }
            adminRadoiIndex++;
        });

        /*Payor KPI assessment data setting*/
		var payorKpiDropdownField = $(".payorKpiContainer").find(".a-dropdown__field .a-dropdown__placeholder");
		var payorIndex = 0;
        $(payorKpiDropdownField).each(function(){
            if(payorIndex < payorKpiVal.length){
                $(this).text(payorKpiVal[payorIndex].evidenceType).attr("class", "a-dropdown-selected");
                addSelectToDropdown(payorKpiVal[payorIndex].evidenceType, $(this).next(".a-dropdown__menu").find('li'));
            }
            payorIndex++;
        });

        var payorRadoiIndex = 0;
        $(".payorKpiContainer .sectionList").each(function(){
            var payorKpiradioBtns = $(this).find(".a-radio__input");
            if(payorRadoiIndex < payorKpiVal.length){
                $(payorKpiradioBtns).each(function(payRadioI, payRadioVal){
                    var payorKpiRadioVal = payRadioVal;
                    var payorKpiRadioRes = payorKpiVal[payorRadoiIndex].significance;
                    /*console.log("payorKpiRadioRes: ", payorKpiRadioRes);*/
                    if($(payorKpiRadioVal).attr('value') == payorKpiRadioRes){
                        $(this).addClass("selected");
                        $(this).attr('checked',true);
                        $(this).next('span').attr('aria-checked','true');
                    }
                });
            }
            payorRadoiIndex++;
        });

        /*Process Attributes assessment data setting*/
        var processAttrUniqueVal = $('#uniqueness-answer-options .a-radio__input');
        var processAttrEaseVal = $('#ease-implementation-answer-options .a-radio__input');
        var processAttrScalableVal = $('#scalability-answer-options .a-radio__input');
        var processAttrGovernanceVal = $('#levelofgovernance-answer-options .a-radio__input');
        var processAttrLabVal = $('#laboratoryintelligence-answer-options .a-radio__input');


        $(processAttrVal).each(function(attrIndex, attrVal){
            var processAttrResponseVal = attrVal.attributeValue;
            commonRadioButton(processAttrResponseVal, processAttrUniqueVal);
            commonRadioButton(processAttrResponseVal, processAttrEaseVal);
            commonRadioButton(processAttrResponseVal, processAttrScalableVal);
            commonRadioButton(processAttrResponseVal, processAttrGovernanceVal);
            commonRadioButton(processAttrResponseVal, processAttrLabVal);
            /*console.log("you are at process attributes");*/
        });


        /*Submit tab assessment data setting*/
        var meritRadio = $('#submit-application-merit .radio .a-radio__input');
        $('#submit-application-merit #assessment-explanation-merit').text(meritText);
        commonRadioButton(meritRadioRes, meritRadio)

        var standoutRadio = $('#submit-standout-application .radio .a-radio__input');
        $('#submit-standout-application #assessment-standout-application').text(standoutText);
        commonRadioButton(standoutRadioRes, standoutRadio)
		
		//textarea count preloader issue
		$('.kpiCharactercount').each(function() {
            //var totalLencount = $(this).parents('.text').next().find('.character-count').text();
            var maxcount = $(this).parents('.text').next().find('.maxCount').text();
            var textlen = this.value.length;
            if (textlen > maxcount) {
                this.value = this.value.substring(0, maxcount);
            } else {
                $(this).parents('.text').next().find('.character-count').text(maxcount - textlen)
                
            }
            
        });
		
    	}

      	miAssessmentTickMark();
        processAttrAssessmentTickMark();
        submitTabAssessmentTickMark();

        },
        error: function(error) {}
    });
}



$(document).ready(function() {

    $("#submit-application-merit, #section-submit-standout-application").addClass('borderGrey');
    $("#assessment-impact-save-draft.assessmentSaveDraft").parent().addClass("mb-1");
    $("#assessment-continue.assessmentSaveDraft").parent().addClass("mt-0");

    $("#assessment-submission-popup").addClass("popupContainer");
    $(".popupContainer").find("#section-popupbox-submit").addClass("popupBox");
    $(".popupBox").parent(".container").addClass("pt-0");
    $(".popupBox").find(".btn").addClass("closeAssessmentPopup");
    $(".popupBox").find(".text:eq(2)").addClass("popupScoreCard");
	$(".closeAssessmentPopup").parent(".button").addClass("d-flex justify-content-end mt-0");
    $(".popupBox").append("<p class='closeAssessmentPopup'>&times;</p>");
	
	$('<div class="standoutAppln"><em class="abt-icon abt-icon-star-badge"></em><span>STANDOUT APPLICATION</span></div>').insertBefore('.popupScoreCard ');	

    $(".closeAssessmentPopup").click(function(){
		$("#assessment-submission-popup").hide();
		 window.location.href= "/en/secure/judge.html";
    });

    $(window).on('load', function(){
        
        setTimeout(function() {
            assessmentDataPopulation();
        }, 1000);
    });


});