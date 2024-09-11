$(document).on('input','textarea',function(){
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

var judgeAssessmentId;
function getJudgeAssessmentId(){
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessmentCycle&category=present',
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=UTF-8",
        "headers": {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPreferredLanguage,
        "x-id-token": jwtToken,
        "x-application-access-key": "admin1#Admin"
    },
        success: function(response) {
        if (response.response.count !== 0){
            judgeAssessmentId = response.response.data[0].id;
        }

    },
        error: function(error) {}
});
}

$("#returnToDashboard").click(function() {
    $('.loader-parent').show(); 
});

function miAssessmentTickMark(){
    var mItotalSecList = $("#measurable-impact-tab-body").find(".sectionList").length;
    var mItotalDropdownList = $("#measurable-impact-tab-body").find(".a-dropdown__field li.selected").length;
    var mItotalRadioList = $("#measurable-impact-tab-body").find(".a-radio__input.selected").length;

    if( (mItotalSecList == mItotalDropdownList) && (mItotalSecList == mItotalRadioList) ){
        $("#measureableImpactTab").addClass("verified");
    }else{
        $("#measureableImpactTab").removeClass("verified");
    }
}

function processAttrAssessmentTickMark(){
    var selectedRadioLen = $("#process-attributes-body-container").find(".selected").length;
    var processAttrTabsLen = $("#process-attributes-body-container").find(".processAttrTabs").length;
    if(selectedRadioLen == processAttrTabsLen){
        $("#processAttributeTab").addClass("verified");
    }else{
        $("#processAttributeTab").removeClass("verified");
    }
}

function submitTabAssessmentTickMark(){
    var submitTabSecList = $(".tabsjudge3").find(".sectionList").length;
    var submitTabRadioLen = $(".tabsjudge3 .sectionBody-right").find(".selected").length;

    if($("input[name='assessment-application-merit']:checked").val() == "false"){
        if($("#submit-application-merit .sectionBody-right .a-radio__input").hasClass('selected') && $("#assessment-explanation-merit").val() != ""){
            $("#submitTab").addClass("verified");
        }else{
            $("#submitTab").removeClass("verified");
        }
    }else{        
        if((submitTabSecList == submitTabRadioLen) && $("#assessment-explanation-merit").val() != "" && $("#assessment-standout-application").val() != ""){
            $("#submitTab").addClass("verified");
        }else{
            $("#submitTab").removeClass("verified");
        }
    }
}


$(document).ready(function() {

	var getApplicationId =  localStorage.getItem('storeAwardApplicationVal');
    var getJudgeAssessmentIdVal =  localStorage.getItem('JudgeAssessmentIdVal');

    $("#judge-assessment-tabs").addClass("callJudgeApi");

    if($("#login-container").find(".cmp-tabs.a-tabs").hasClass("callJudgeApi")){
        getJudgeAssessmentId();
    }

    $("#clinical-care-initiative #continue-btn-0, #initiativeTab, #measureableImpactTab, #processAttributeTab, #submitTab, #assessment-save-draft, #assessment-impact-save-draft, #assessment-continue, #assessment-previous, #unique-continue," +
      "#ease-continue, #scalability-continue, #governance-continue, #laboratory-continue, #unique-prev, #ease-prev, #scalability-prev, #governance-prev, #laboratory-prev, #submit-prev, #application-merit-continue, #standout-prev").addClass("assessmentSaveDraft");

    $("#submit-application-merit").find(".sectionBody-right .row .col-12:eq(1)").find(".btn").addClass("assessmentSaveDraft");
	$("#submit-standout-application").find(".sectionBody-right .row .col-12:eq(1)").find(".btn").addClass("assessmentSaveDraft");

    /*$("#processAttributeTab, .assessmentSaveDraft").click(function(){
        processAttributes();
    });*/

    /*Save draft For measurable Impact - sending the data*/
    $("#measurable-impact-tab-body .container.responsivegrid.a-container:eq(0)").addClass("patientKpiContainer");
    $("#measurable-impact-tab-body .container.responsivegrid.a-container:eq(1)").addClass("clinicianKpiContainer");
    $("#measurable-impact-tab-body .container.responsivegrid.a-container:eq(2)").addClass("adminKpiContainer");
    $("#measurable-impact-tab-body .container.responsivegrid.a-container:eq(3)").addClass("payorKpiContainer");

      $(".patientKpiContainer").find("#section-stakeholder-patient .row .col-12:eq(1)").addClass("patientKpiRight radioButtonIds");
    $(".clinicianKpiContainer").find("#section-stakeholder-patient .row .col-12:eq(1)").addClass("clinicianKpiRight radioButtonIds");
    $(".adminKpiContainer").find("#section-stakeholder-patient .row .col-12:eq(1)").addClass("adminKpiRight radioButtonIds");
    $(".payorKpiContainer").find("#section-stakeholder-patient .row .col-12:eq(1)").addClass("payorKpiRight radioButtonIds");

    customRadio('uniqueness-answer');
    customRadio('ease-implementation-answer');
    customRadio('scalability-answer');
    customRadio('levelofgovernance-answer');
    customRadio('laboratoryintelligence-answer');

    var searchUserurl = new URL($('#session-api-url').val());
	var searchUserurlOrigin = searchUserurl.origin;

    /*Adding IDs for labels and radio button inputs*/
    $(".assessmentSaveDraft, #measureableImpactTab").click(function(){ 
        var indexCount = 0;
         $(".radioButtonIds .a-radio__label").each(function(){
                var radioIndex = indexCount++;
                $(this).attr("for", "kpiRadio"+radioIndex+"");
                $(this).find(".a-radio__input").attr("id", "kpiRadio"+radioIndex+"");
         });

        $(".radioButtonIds .a-radio__input").each(function(){
            var miassessmentRadioBtns = $(this).attr('name');
            customRadio(miassessmentRadioBtns);
      });
    });

    $("#submit-application-merit .a-radio__input, #submit-standout-application .a-radio__input").each(function(){
        var sumitassessmentRadioBtns =  $(this).attr('name');
        customRadio(sumitassessmentRadioBtns);
    });

    if($("#initiativeTab").hasClass("active")){
       $("#initiativeTab").addClass("verifiedBlue");
    }

    $("#continue-btn-0, #measureableImpactTab, #processAttributeTab, #submitTab").click(function(){ 
		$("#initiativeTab").addClass("verified");
    });
	
	 $('#judge-assessment-tabs').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");

    /*Assessment Save Draft Functionality Starts here*/
    $(".assessmentSaveDraft").click(function(){
        $('.loader-parent').show(); 
        var saveDraftText = $(this).find('span').text();
		if(saveDraftText != 'SAVE DRAFT'){
          document.documentElement.scrollTop=0;
             $('.loader-parent').show(); 
         }
        var assessmentHashContent = localStorage.getItem('assessmentHashedContent');

        var formStatus = "DRAFT";

        if($(this).attr('name') == "submit-assessment"){
            formStatus = "SUBMITTED";
			$('.loader-parent').show();  
        }

		$("#initiativeTab").removeClass("verifiedBlue");


        if($("input[name='assessment-application-merit']:checked").val() == "false"){
            $("#submit-standout-application input[name='assessment-standout-application']").attr("data-required", "false").next(".a-radio__custom:eq(0)").attr("aria-checked", "false");
            $("#submit-standout-application input[name='assessment-standout-application']").next(".a-radio__custom:eq(0)").attr("aria-labelledby", "false");
             $("#submitTab").addClass("verified");
           }
           else{
            $('.loader-parent').show();
            $("#submit-standout-application input[name='assessment-standout-application']").attr("data-required", "true").next(".a-radio__custom:eq(0)").attr("aria-checked", "true");
            $("#submit-standout-application input[name='assessment-standout-application']").next(".a-radio__custom:eq(0)").attr("aria-labelledby", "true");
            $("#submit-standout-application textarea").attr('required', 'required');
            $("#submit-standout-application textarea").closest(".a-input-field").attr("data-required", "true");

            if($("#assessment-standout-application").val() == ""){
                $("#submit-assessment").attr('disabled', 'disabled');
                $("#submitTab").removeClass("verified");
            }
        }

        var patientAssessmentObj;
		var patientAssessmentArr = [];

        var clinicianAssessmentObj;
      var clinicianAssessmentArr = [];

        var adminAssessmentObj;
      var adminAssessmentArr = [];

        var payorAssessmentObj;
      var payorAssessmentArr = [];

        $(".patientKpiRight").each(function(i){
            patientAssessmentObj = {};
            patientAssessmentObj.kpiNumber = i;
            patientAssessmentObj.type = "PATIENT";
            patientAssessmentObj.category = "";
			patientAssessmentObj.evidenceType = $(this).find(".a-dropdown__field li.selected").attr("data-optionvalue");
            patientAssessmentObj.significance = $(this).find(".a-radio__input").hasClass("selected") ? $(this).find(".a-radio__input.selected").val():'';
            patientAssessmentArr.push(patientAssessmentObj);
        });

        $(".clinicianKpiRight").each(function(i){
            clinicianAssessmentObj = {};
            clinicianAssessmentObj.kpiNumber = i;
            clinicianAssessmentObj.type = "CLINICIAN";
            clinicianAssessmentObj.category = "CLINICIAN_CONFIDENCE";
         clinicianAssessmentObj.evidenceType = $(this).find(".a-dropdown__field li.selected").attr("data-optionvalue");
            clinicianAssessmentObj.significance = $(this).find(".a-radio__input").hasClass("selected") ? $(this).find(".a-radio__input.selected").val():'';
            clinicianAssessmentArr.push(clinicianAssessmentObj);
        });

        $(".adminKpiRight").each(function(i){
            adminAssessmentObj = {};
            adminAssessmentObj.kpiNumber = i;
            adminAssessmentObj.type = "HOSPITAL";
            adminAssessmentObj.category = "";
         adminAssessmentObj.evidenceType = $(this).find(".a-dropdown__field li.selected").attr("data-optionvalue");
            adminAssessmentObj.significance = $(this).find(".a-radio__input").hasClass("selected") ? $(this).find(".a-radio__input.selected").val():'';
            adminAssessmentArr.push(adminAssessmentObj);
        });

        $(".payorKpiRight").each(function(i){
            payorAssessmentObj = {};
            payorAssessmentObj.kpiNumber = i;
            payorAssessmentObj.type = "PAYOR";
            payorAssessmentObj.category = "";
         payorAssessmentObj.evidenceType = $(this).find(".a-dropdown__field li.selected").attr("data-optionvalue");
            payorAssessmentObj.significance = $(this).find(".a-radio__input").hasClass("selected") ? $(this).find(".a-radio__input.selected").val():'';
            payorAssessmentArr.push(payorAssessmentObj);
        });

        var data = {
			"type": "JudgeAssessment",
			"status": formStatus,
            "_hashedContent": assessmentHashContent,
            "id": getJudgeAssessmentIdVal,
          "body": {
              "isMerit": $('input[name="assessment-application-merit"].selected').val(),
              "isMeritDescription": $("#assessment-explanation-merit").val(),
              "isStandout": $('input[name="assessment-standout-application"].selected').val(),
              "isStandoutDescription": $("#assessment-standout-application").val(),
              "processAttributes": [
                  {
                      "attributeName": "uniqueness",
                      "attributeValue": $('input[name="uniqueness-answer"].selected').val()
                  },
                  {
                      "attributeName": "easeOfImplementation",
                      "attributeValue": $('input[name="ease-implementation-answer"].selected').val()
                  },
                  {
                      "attributeName": "scalability",
                      "attributeValue": $('input[name="scalability-answer"].selected').val()
                  },
                  {
                      "attributeName": "governanceLevel",
                      "attributeValue": $('input[name="levelofgovernance-answer"].selected').val()
                  },
                  {
                      "attributeName": "labIntelligence",
                      "attributeValue": $('input[name="laboratoryintelligence-answer"].selected').val()
                  }
              ],
              "kpiAssessments": {
                  "patientKpis": patientAssessmentArr,
                  "clinicianKpis": clinicianAssessmentArr,
                  "hospitalAdminKpis": adminAssessmentArr,
                  "payorKpis": payorAssessmentArr
              }
          },
          "links": [
              {
                  "type": "JudgeAssessmentCycle",
                  "id": judgeAssessmentId
              },
              {
                  "type": "AwardApplication",
                  "id": getApplicationId
             }
          ]

		}



		$.ajax({
		url: searchUserurlOrigin + '/api/private/eform/eforms',
		type: "POST",

		data: JSON.stringify(data),
		"headers": {
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPreferredLanguage,
			"x-id-token": getCookie('id.token'),
            "x-application-access-key": "judge1#Judge",
			'Content-Type': 'application/json'
		},
		success: function(response) {
            $('.loader-parent').hide();
			if (response.errorCode == 0) {
                if(saveDraftText == 'SAVE DRAFT'){
                 $('.draftMsg').show();
                    $('.loader-parent').hide();
                }
                else{
                    $('.draftMsg').hide();
                    $('.loader-parent').hide();
                }
                $(".returnToInbox").hide();
                localStorage.setItem('assessmentHashedContent', response.response._hashedContent);
				var totalScore = response.response.totalScore;
				var userResId = response.response.links[1].id;
                var userApplicationId = "000000"+userResId;
				var getApplicationName = localStorage.getItem('applicationName');
				var getisStandout = response.response.body.isStandout;
				if(response.response.status == "SUBMITTED"){
                    $("#assessment-submission-popup").show();
                    if(getisStandout == "true"){
						$('.standoutAppln').show();

                    }else{
                        $('.standoutAppln').hide();
                    }					
                    $(".popupScoreCard").find("p:eq(0) strong").text(getApplicationName);
                    $(".popupScoreCard").find("p:eq(1)").html("ID Number: "+ "<strong>"+userApplicationId+"</strong>");
                    $(".popupScoreCard").find("p:eq(2)").text("Final score: "+totalScore);
				}

            }else if(response.errorCode != 0){
                $(".returnToInbox").show();
            }

		},
			error: function(error) {
				console.log("error Data   -  " + response);
                $('.loader-parent').hide();
			}
		});

    	miAssessmentTickMark();
    	submitTabAssessmentTickMark();
    	processAttrAssessmentTickMark();
    });

/*Assessment Save Draft Functionality ends here*/


    $("#laboratory-continue").click(function(){
        $('.loader-parent').show();
		processAttrAssessmentTickMark();
    });



});