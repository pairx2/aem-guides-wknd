var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var parentTableName, headerKeys;

$("#forgot-password-btn").click(function(){
    $(this).parents('body').prepend("<div class='loader-parent' style='display: block;'><em class='abt-icon abt-icon-spinner'></em></div>");
});

function onLoginUserApplication() {
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication',
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "admin1#Admin"
        },
        success: function(responseVal) {

            var userKeyVal = localStorage.getItem('userKey');
            let userkeyV = [];

            for (var i = 0; i < responseVal.response.data.length; i++) {
                if (responseVal.response.data[i].createdBy == userKeyVal) {
                    let createdBy = responseVal.response.data[i].createdBy;
                    userkeyV.push(createdBy);
                }
            }
            if (userkeyV.length == 0) {
                userkeyV.push(" ");
            }
        },
        error: function(error) {}
    });
}

function getPresentCycleStatus(){
    $.ajax({
            url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplicationCycle&category=present',
            type: "GET",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "admin1#Admin"
        },
            success: function(responseVal) {
                if(responseVal.response.count == 0) {
                    $('#active-cycle-text').css('display','block');
                    $('#section-submitted-applications').parents('.m-accordion__body').parents('.m-accordion__content-items').addClass('activeApplication').hide()
                    $('#myAccount').find('#start-application-text p').css('display','none');
                }
        },
            error: function(error) {}
    });
}

function activeApplicationList() {
    var userKeyVal = localStorage.getItem('userKey');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication&createdBy=' + userKeyVal,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "admin1#Admin"
        },
        beforeSend: function() {
            // Show image container
            $(".loader").show();
            $('table').hide();
		},
        success: function(responseVal) {
           
             for (var i = 0; i < responseVal.response.data.length; i++) {
                if((responseVal.response.data[i]).hasOwnProperty('links') == true ){
                    if (responseVal.response.data[i].links[0].category == 'present') {
                        if (responseVal.response.data[i].status == 'SUBMITTED' || responseVal.response.data[i].status == 'DISQUALIFIED' || responseVal.response.data[i].status == 'NA') {
                            $('#submitted-applications').append('<div class="submitted-list"><p><strong>Application Title</strong>: <span class="applt-title" id="denld"><a href="" id="' + responseVal.response.data[i].id + '">' + responseVal.response.data[i].name + '</a></span></p><p><strong>Status</strong>: <span class="applt-status">Submitted</span></p></div>');
                        }else if (responseVal.response.data[i].status == 'RELEASED') {
                            $('#submitted-applications').append('<div class="submitted-list"><p><strong>Application Title</strong>: <span class="applt-title" id="denld"><a href="" id="' + responseVal.response.data[i].id + '">' + responseVal.response.data[i].name + '</a></span></p><p><strong>Status</strong>: <span class="applt-status">Submitted</span></p></div>');
                        } 
						else if (responseVal.response.data[i].status == 'DRAFT') {
                            var titleName = ''
                            if(responseVal.response.data[i].name != ''){
								titleName = '<p><strong>Application Title</strong>: <span>' + responseVal.response.data[i].name + '</span></p>';
                            }
                            var statusLists = '';
                            statusLists += 'In progress';
                            $('ul[name="draft-applications"]').append('<li class="draft-items" data-hashedContent='+responseVal.response.data[i]._hashedContent+' '+'data-id='+responseVal.response.data[i].id+'>'+'<span class="applt-title" >'+ titleName +'<span><strong>Status:</strong> ' + statusLists + ' </span><span class="tooltip-list"><em class="abt-icon abt-icon-delete"></em><span class="tooltiptext">Delete Application</span></span></span><span class="continue-app"><a href="/en/secure/applicant/application.html" id="' + responseVal.response.data[i].id + '">Continue Application</a></span></li>');
                        }
                    } 
                }
            }
        },
        complete: function(data) {
			// Hide image container
			$(".loader").hide();
			$('table').show();
		},
        error: function(error) {}
    });
}

function previousApplicationList() {
    var userKeyVal = localStorage.getItem('userKey');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication&createdBy=' + userKeyVal,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "admin1#Admin"
        },
        success: function(responseVal) {
            for (var i = 0; i < responseVal.response.data.length; i++) {
                if((responseVal.response.data[i]).hasOwnProperty('links') == true ){
                    if ((responseVal.response.data[i].links[0].category == 'past') || (responseVal.response.data[i].links[0].category == 'previous')) {
                    if (responseVal.response.data[i].status == 'SUBMITTED' || responseVal.response.data[i].status == 'RELEASED' || responseVal.response.data[i].status == 'DISQUALIFIED' || responseVal.response.data[i].status == 'NA') {
                        $('#submitted-applications-previous').append('<div class="submittedPrevious-list"><p><strong>Application Title</strong>: <span class="applt-title"><a href="" id="' + responseVal.response.data[i].id + '">' + responseVal.response.data[i].name +   '</a></span></p> <p><strong>Award Year</strong>: <span class="applt-title"><span>' + responseVal.response.data[i].links[0].name + '</span></span></p>  <p><strong>Status</strong>: <span class="applt-status">Submitted</span></p></div>');
                    }
                    if (responseVal.response.data[i].status == 'INCOMPLETE' || responseVal.response.data[i].status == 'DRAFT') {
                        $('#incomplete-applications').append('<div class="incompletePrevious-list" data-hashedContent='+ responseVal.response.data[i]._hashedContent +' '+ 'data-id='+responseVal.response.data[i].id +'>'+'<p><strong>Application Title</strong>: <span class="applt-title"><span id="' + responseVal.response.data[i].id + '">' + responseVal.response.data[i].name +   '</span></span></p><p><strong>Award Year</strong>: <span class="applt-title"><span>' + responseVal.response.data[i].links[0].name + '</span></span></p><p><strong>Status</strong>: <span class="applt-status">Incomplete</span><a class="tooltip-list"><em class="abt-icon abt-icon-delete"></em><span class="tooltiptext">Delete Application</span></a></p></div>');
                    }
                }
                }
            }


        },
        error: function(error) {}
    });
}

function downloadFile(filename, data) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;base64,' + data);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/* common download functionality of link */ 
function commonTableDownload(previousAppId) {

    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication&id=' + previousAppId + '&action=download',
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        },
        success: function(downloadResponse) {
            var encodeval = downloadResponse.response;
        	const fileName = '000000' + previousAppId+'.zip';
			const content = encodeval;
			downloadFile(fileName, content);
        },
        error: function(error) {}
    });
}

function commonDownload(previousAppId) {
    var downloadData = {
		"action": "download",
    	"applicationId": previousAppId
    };
    $('.loader-parent').show();
    $.ajax({
			url: searchUserurlOrigin + '/api/private/profile/signed-url',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(downloadData),
			"headers": {
				"x-country-code": "US",
				"x-application-id": "univantshce",
				"x-id-token": getCookie('id.token'),
				"x-application-access-key": "user1#Applicant"
			},
			success: function(response) {

				var storeSigned = response.response.signedUrl;
				saveAs(storeSigned);
                $('.loader-parent').hide();

			},
			error: function(error) {
                $('.loader-parent').hide();
            }
		});
}

function saveAs(uri) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.setAttribute('download', true);

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}


function commonRadioButton(getRadioData, inputValue) {
    $(inputValue).each(function(index, value) {
        var radioValue = $(this).attr('value');
        if (radioValue == getRadioData) {
            $(this).addClass('selected');
	        $(this).attr('checked', 'checked');
            $(this).next('span').attr('aria-checked', 'true');			
        } 
    });
}

function commonSelect(getSelectData, listValue) {
    $(listValue).each(function(index, value) {
        var selectValue = $(this).attr('data-optionvalue');
        if (selectValue == getSelectData) {
            let listVal = $(this).addClass('selected').attr('aria-selected', 'true').find('span').text();
            $(this).parent('ul').siblings('span').removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected').text(listVal);
        }
    });
}

function dataApplication() {
    var getApplicationId = localStorage.getItem('storeContinueAppVal');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication&id=' + getApplicationId,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "admin1#Admin"
        },
        success: function(responseVal) {
        if (responseVal.errorCode == 0) {
            $('.loader-parent').hide();
            let receivedAttachments = [];
            receivedAttachments = responseVal.response.data[0].attachments;
            if (responseVal.response.data[0].hasOwnProperty('attachments')) {
                receivedAttachments.forEach(function (el) {
                    if(el.hasOwnProperty('id'))
                    {
                        if ((el.id != "undefined")&&(el.type == "attachment")) {
                        $('.attachments').append('<div class="attachment-item"' + ' ' + 'data-file-size=' + el.size + '><span>' + el.id + '</span><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></div>');
                    }                    }
                   
                })
            }
            var getLastName = localStorage.getItem('userName');
            var getFirstName = localStorage.getItem('lastName');
            var getInstitutionName = localStorage.getItem('institutionName');
            var getDynamicEmail = localStorage.getItem('dynamicEmail');
            $('#applicant-information').append('<p class="nameByapplicant"></p>');
            $('.nameByapplicant').prev('p').remove();
            $('#applicant-information p.nameByapplicant').html(getLastName + getFirstName + ',' + getInstitutionName + '<br/>' + getDynamicEmail);

            var responseValue = responseVal.response.data[0].body.applicantInfo;
            $('#applicantTitle').val(responseValue.title);
            $('#applicantDepartment').val(responseValue.department);
            $('#applicantAddress1').val(responseValue.addressLine1);
            $('#applicantAddress2').val(responseValue.addressLine2);
            $('#applicantCity').val(responseValue.city);
            $('#applicantState').val(responseValue.state);
            $('#applicantZip').val(responseValue.zip);
            var applicationcountryVal = responseValue.country;
            var countryText;
            $('#applicantCountry-options ul li').each(function(){                
                var countryoption = $(this).attr('data-country');                
                if(countryoption == applicationcountryVal) {
					$(this).addClass('selected');
                    countryText = $(this).find('span').text();  
                    $('#applicantCountry-options').find('.a-dropdown__placeholder').removeClass().addClass('a-dropdown-selected').text(countryText);
                }
            });
            
            $('#clinicalCareDescription').val(responseVal.response.data[0].body.clinicalCareDescription);
           
            var getIntitutionType = (responseVal.response.data[0].body.institution.type);
            var intitutionType = $('#institutionType-options .a-radio__input');
            commonRadioButton(getIntitutionType, intitutionType);

            var getCategory = (responseVal.response.data[0].body.institution.category);
            var categoryInput = $('#institutionCategory-options .a-radio__input');
            commonRadioButton(getCategory, categoryInput);

            var getSubCategory = (responseVal.response.data[0].body.institution.subCategory);
            var subCategoryInput = $('#institutionSubCategory-options .a-radio__input');
            commonRadioButton(getSubCategory, subCategoryInput);

            var getLaboratoryMedicineParticipation = responseVal.response.data[0].body.laboratoryMedicineParticipation;
            var laboratoryMedicineParticipationInput = $('#laboratoryMedicinePathologyParticipation-options .a-radio__input');
            commonRadioButton(getLaboratoryMedicineParticipation, laboratoryMedicineParticipationInput);

            if(getSubCategory == "OTHER")
            {
                $(".institutionSubCategoryDesc").show().find(".a-input-control").addClass("reqFieldClass");
                $(".institutionSubCategoryDesc").find('.a-input-field.mt-0').attr('data-required', true);
                $("#institution-sub-category-description").val(responseVal.response.data[0].body.institution.subCategoryDesc);
            }
            else {
                $(".institutionSubCategoryDesc").hide().find(".a-input-control").removeClass("reqFieldClass");
                $(".institutionSubCategoryDesc").find('.a-input-field.mt-0').attr('data-required', false);
            }

            $.each(responseVal.response.data[0].body.clinicalCareDepartments, function(index, element) {
                cloneDiscipline(index, element.deptName, element.description);
            });


   		    $.each(responseVal.response.data[0].body.patientKpis, function(index, patienttKPIlistelement) {
		     cloneKPI(index,patienttKPIlistelement,responseVal.response.data[0].body.patientKpis.length);
			});

   		    $.each(responseVal.response.data[0].body.clinicianKpis, function(index, patienttKPIlistelement) {
		     cloneKPI(index,patienttKPIlistelement,responseVal.response.data[0].body.clinicianKpis.length);
			});        

   		    $.each(responseVal.response.data[0].body.hospitalAdminKpis, function(index, patienttKPIlistelement) {
			 cloneKPI(index,patienttKPIlistelement,responseVal.response.data[0].body.hospitalAdminKpis.length);
			});        
   		    $.each(responseVal.response.data[0].body.payorKpis, function(index, patienttKPIlistelement) {
			 cloneKPI(index,patienttKPIlistelement,responseVal.response.data[0].body.payorKpis.length);
			});

            $('#projectPartners0-name').val(responseVal.response.data[0].body.projectPartners[0].name);
            $('#projectPartners0-email').val(responseVal.response.data[0].body.projectPartners[0].email);
            $('#projectPartners0-title').val(responseVal.response.data[0].body.projectPartners[0].title);

            var getattributeValue = responseVal.response.data[0].body.processAttributes[0].attributeValue;
            var uniquenessInput = $('#uniqueness-options .a-radio__input');
            commonRadioButton(getattributeValue, uniquenessInput);
            $('#processAttributesUniquenessFreeText').val(responseVal.response.data[0].body.processAttributes[0].attributeDesc);

            var getattribute1Value = responseVal.response.data[0].body.processAttributes[1].attributeValue;
            var implementationInput = $('#implementation-options .a-radio__input');
            commonRadioButton(getattribute1Value, implementationInput);
            $('#processAttributesImplementationFreeText').val(responseVal.response.data[0].body.processAttributes[1].attributeDesc);

            var getattribute2Value = responseVal.response.data[0].body.processAttributes[2].attributeValue;
            var scalabilityInput = $('#scalability-options .a-radio__input');
            commonRadioButton(getattribute2Value, scalabilityInput);
            $('#processAttributesScalabilityFreeText').val(responseVal.response.data[0].body.processAttributes[2].attributeDesc);

            var getattribute3Value = responseVal.response.data[0].body.processAttributes[3].attributeValue;
            var governanceInput = $('#governance-options .a-radio__input');
            commonRadioButton(getattribute3Value, governanceInput);
            $('#processAttributesGovernanceFreeText').val(responseVal.response.data[0].body.processAttributes[3].attributeDesc);

            var getattribute4Value = responseVal.response.data[0].body.processAttributes[4].attributeValue;
            var laboratoryIntelligenceInput = $('#laboratoryIntelligence-options .a-radio__input');
            commonRadioButton(getattribute4Value, laboratoryIntelligenceInput);
            $('#processAttributesIntelligenceFreeText').val(responseVal.response.data[0].body.processAttributes[4].attributeDesc);

            $('#projectName').val(responseVal.response.data[0].name);
			
			if(responseVal.response.data[0].body.projectPartners.length > 1){

            var getPartner2Discipline = responseVal.response.data[0].body.projectPartners[1].discipline;
            var partner2DisciplineList = $('#projectPartners1-discipline-options ul li');            
            commonSelect(getPartner2Discipline, partner2DisciplineList);
                if (getPartner2Discipline == "CLINICAL_DEPARTMENT" || getPartner2Discipline == "OTHER") {
                    $(".partner2Description").show();
                    $(".partner2Description").find('.a-input-field.mt-0').attr('data-required', true);
                    $('#partner2-discipline-description').val(responseVal.response.data[0].body.projectPartners[1].disciplineDescription);
                }
                else {
                    $(".partner2Description").hide();
                    $(".partner2Description").find('.a-input-field.mt-0').attr('data-required', false);
                }
			
			var getPartner1Discipline = responseVal.response.data[0].body.projectPartners[2].discipline;
            var partner1DisciplineList = $('#projectPartners2-discipline-options ul li');
            commonSelect(getPartner1Discipline, partner1DisciplineList);
                if (getPartner1Discipline == "CLINICAL_DEPARTMENT" || getPartner1Discipline == "OTHER") {
                    $(".partner3Description").show();
                    $(".partner3Description").find('.a-input-field.mt-0').attr('data-required', true);
                    $('#partner3-discipline-description').val(responseVal.response.data[0].body.projectPartners[2].disciplineDescription);
                }	
                else {
                    $(".partner3Description").hide();
                    $(".partner3Description").find('.a-input-field.mt-0').attr('data-required', false);
                }

            $('#projectPartners1-name').val(responseVal.response.data[0].body.projectPartners[1].name);
            $('#projectPartners1-email').val(responseVal.response.data[0].body.projectPartners[1].email);
            $('#projectPartners1-title').val(responseVal.response.data[0].body.projectPartners[1].title);

            $('#projectPartners2-name').val(responseVal.response.data[0].body.projectPartners[2].name);
            $('#projectPartners2-email').val(responseVal.response.data[0].body.projectPartners[2].email);
            $('#projectPartners2-title').val(responseVal.response.data[0].body.projectPartners[2].title);

            var keyPartners = responseVal.response.data[0].body.projectPartners;
             for (var k = 3; k < keyPartners.length; k++) {


                        if (keyPartners[k].partnerId == '3') {


                            if (responseVal.response.data[0].body.projectPartners[3].name != '' || responseVal.response.data[0].body.projectPartners[3].email != '' ||
                                responseVal.response.data[0].body.projectPartners[3].title != '') {
                                $('#application-parent-column').find('.paddingNone').addClass('onDependData').find('section').css('display', 'block');
                                $('#projectPartners3-name').val(responseVal.response.data[0].body.projectPartners[3].name);
                                $('#projectPartners3-email').val(responseVal.response.data[0].body.projectPartners[3].email);
                                $('#projectPartners3-title').val(responseVal.response.data[0].body.projectPartners[3].title);
                                var getPartner3Discipline = responseVal.response.data[0].body.projectPartners[3].discipline;
                                var partner3DisciplineList = $('#projectPartners3-discipline-options ul li');
                                commonSelect(getPartner3Discipline, partner3DisciplineList);
                                if (getPartner3Discipline == "CLINICAL_DEPARTMENT" || getPartner3Discipline == "OTHER") {
                                    $(".partner4Description").show();
                                    $(".partner4Description").find('.a-input-field.mt-0').attr('data-required', true);
                                    $('#partner4-discipline-description').val(responseVal.response.data[0].body.projectPartners[3].disciplineDescription);
                                } else {
                                    $(".partner4Description").hide();
                                    $(".partner4Description").find('.a-input-field.mt-0').attr('data-required', false);
                                }
                                $('#application-parent-column').find('.removePartner').find('a#remove-partner').css('display', 'inline');
                            } else if (responseVal.response.data[0].body.projectPartners[3].name == '' || responseVal.response.data[0].body.projectPartners[3].email == '' ||
                                responseVal.response.data[0].body.projectPartners[3].title == '') {
                                $('#section-key-partner4').hide();
                            }
                        } else if (keyPartners[k].partnerId == '4') {
                            if (responseVal.response.data[0].body.projectPartners[4].name != '' || responseVal.response.data[0].body.projectPartners[4].email != '' ||
                                responseVal.response.data[0].body.projectPartners[4].title != '') {
                                $('#application-parent-column').find('.paddingNone').addClass('onDependData').find('section').css('display', 'block');
                                $('#projectPartners4-name').val(responseVal.response.data[0].body.projectPartners[4].name);
                                $('#projectPartners4-email').val(responseVal.response.data[0].body.projectPartners[4].email);
                                $('#projectPartners4-title').val(responseVal.response.data[0].body.projectPartners[4].title);
                                var getPartner4Discipline = responseVal.response.data[0].body.projectPartners[4].discipline;
                                var partner4DisciplineList = $('#projectPartners4-discipline-options ul li');
                                commonSelect(getPartner4Discipline, partner4DisciplineList);
                                if (getPartner4Discipline == "CLINICAL_DEPARTMENT" || getPartner4Discipline == "OTHER") {
                                    $(".partner5Description").show();
                                    $(".partner5Description").find('.a-input-field.mt-0').attr('data-required', true);
                                    $('#partner5-discipline-description').val(responseVal.response.data[0].body.projectPartners[4].disciplineDescription);
                                } else {
                                    $(".partner5Description").hide();
                                    $(".partner5Description").find('.a-input-field.mt-0').attr('data-required', false);
                                }
                                $('#application-parent-column').find('.addPartner').css('display', 'none').find('a#add-partner').css('display', 'none');
                                $('#application-parent-column').find('.removePartner').find('a#remove-partner').css('display', 'inline');

                            } else if (responseVal.response.data[0].body.projectPartners[4].name == '' || responseVal.response.data[0].body.projectPartners[4].email == '' ||
                                responseVal.response.data[0].body.projectPartners[4].title == '') {

                                $('#section-key-partner5').hide();
                            }
                        }

                    }
		}


            if (responseVal.response.data[0].body.formSubmitAcknowledgement1 == 'true') {
                $('#formSubmitAcknowledgement-options #formSubmitAcknowledgementCheckbox1').siblings('.a-checkbox__custom').addClass('selected');
				$('#formSubmitAcknowledgementCheckbox1').next('input').attr('checked', true);
                $('#formSubmitAcknowledgementCheckbox1').next('input').next('span').attr('aria-checked', 'true');				
            } else {
                $('#formSubmitAcknowledgement-options #formSubmitAcknowledgementCheckbox1').siblings('.a-checkbox__custom').removeClass('selected');
				$('#formSubmitAcknowledgementCheckbox1').next('input').attr('checked', false);
				$('#formSubmitAcknowledgementCheckbox1').next('input').next('span').attr('aria-checked', 'false');				
            }

            if (responseVal.response.data[0].body.formSubmitAcknowledgement2 == 'true') {
                $('#formSubmitAcknowledgement-options #formSubmitAcknowledgementCheckbox2').siblings('.a-checkbox__custom').addClass('selected');
				$('#formSubmitAcknowledgementCheckbox2').next('input').attr('checked', true);
				$('#formSubmitAcknowledgementCheckbox2').next('input').next('span').attr('aria-checked', 'true');				
            } else {
                $('#formSubmitAcknowledgement-options #formSubmitAcknowledgementCheckbox2').siblings('.a-checkbox__custom').removeClass('selected');
				$('#formSubmitAcknowledgementCheckbox2').next('input').attr('checked', false);
				$('#formSubmitAcknowledgementCheckbox2').next('input').next('span').attr('aria-checked', 'false');				
            }

            if (responseVal.response.data[0].body.formSubmitAcknowledgement3 == 'true') {
                $('#formSubmitAcknowledgement-options #formSubmitAcknowledgementCheckbox3').siblings('.a-checkbox__custom').addClass('selected');
				$('#formSubmitAcknowledgementCheckbox3').next('input').attr('checked', true);
				$('#formSubmitAcknowledgementCheckbox3').next('input').next('span').attr('aria-checked', 'true');				
            } else {
                $('#formSubmitAcknowledgement-options #formSubmitAcknowledgementCheckbox3').siblings('.a-checkbox__custom').removeClass('selected');
				$('#formSubmitAcknowledgementCheckbox3').next('input').attr('checked', false);
				$('#formSubmitAcknowledgementCheckbox3').next('input').next('span').attr('aria-checked', 'false');				
            }

            /*kpi*/
            var patientKpisResponse = responseVal.response.data[0].body.patientKpis;
            /*Open Accordians Based on the response length*/
            var patientKpisLength = patientKpisResponse.length;
            var patientKpiParents = document.querySelectorAll(".patientKpiParent");
            var patientKpiParentCount = 0;

            $(patientKpiParents).each(function() {
                patientKpiParentCount++
                if (patientKpiParentCount <= patientKpisLength) {
                   $(this).removeClass("disable").addClass("patientKpiActive");
                }
            });

            /*Setting Values for KPi accordians*/
            var patientKpiActiveItems = document.querySelectorAll(".patientKpiActive");

            var selectKpiRes;
            var selectQualifier;
            var measureOfImpact;
            var quantitativeDescription;
            var qualitativeDescription;
            var qualitativeName;
            var qualitativeTitle;
            var impact;
            var impactRating;


            $(patientKpisResponse).each(function(pkI, pkRes) {
                selectKpiRes = pkRes.category;
                selectQualifier = pkRes.qualifier;
                measureOfImpact = pkRes.measureOfImpact;
                if(typeof measureOfImpact === 'string'){
                    measureOfImpact= measureOfImpact.toLowerCase();
                }
                quantitativeDescription = pkRes.quantitativeDescription;
                qualitativeDescription = pkRes.qualitativeDescription;
                qualitativeName = pkRes.qualitativeName;
                qualitativeTitle = pkRes.qualitativeTitle;
                impact = pkRes.impact;
                impactRating = pkRes.impactRating;
                if(typeof impactRating === 'string'){
                    impactRating= impactRating.toLowerCase();
                }
                impactRating = pkRes.impactRating;
            });


            $(patientKpiActiveItems).each(function(index) {
                $("#patient" + index + "-kpi-category-options").addClass("selectKpi").find(".a-dropdown__field .a-dropdown__placeholder").text(selectKpiRes);
                $("#patientKpis" + index + "-qualifier-options").addClass("selectQualifier").find(".a-dropdown__field .a-dropdown__placeholder").text(selectQualifier);

                $("#patientKpis" + index + "-measureOfImpact-options").addClass("qAndQRadio");
                var qAndQRadioButtons = $(this).find(".qAndQRadio .a-radio__input");
                commonRadioButton(measureOfImpact, qAndQRadioButtons);

                $("#patient" + index + "-quantitative-measure-container").addClass("quantitativeDescription").find("textarea").val(quantitativeDescription);
                $("#patientKpi" + index + "-directquote").val(qualitativeDescription);
                $("#patientKpis" + index + "-sourceName").val(qualitativeName);
                $("#patientKpis" + index + "-sourceTitle").val(qualitativeTitle);

                $("#patient" + index + "-stakeholder-impact-rating-options").addClass("ratingOptions");
                var ratingOptionsRadioButtons = $(this).find(".ratingOptions .a-radio__input");
                commonRadioButton(impactRating, ratingOptionsRadioButtons);

                $("#patient" + index + "-stakeholder-impact").val(impact);
            });
			$(".miTabs").trigger('click');
            progressPercentage();			
   //KPI's character limit
    $('.kpiCharactercount').each(function(){
       var maxcount = $(this).parents('.text').next().find('.maxCount').text();
        var textlen = this.value.length;
  		if (textlen > maxcount) {
   		this.value = this.value.substring(0, maxcount);
 			 } else {
                 $(this).parents('.text').next().find('.character-count').text(maxcount - textlen)

 			 }

    });
        }

        },
        error: function(error) {}
    });
}


$(document).ready(function() {
	$('#iconColumns').children().children().addClass('stakeholder_column').children().siblings().next().children().each(function(i) {
        $(this).addClass('colswidth'+i);    
     })
	 
    $("#application-form-container").addClass("callApplicationApi");
	
	$("#myAccount").parents('#login-container').addClass("callMyAccountApi");
	if($("#myAccount").parents('#login-container').hasClass("callMyAccountApi")){
		getPresentCycleStatus();
        activeApplicationList();
        previousApplicationList();
    }

	if($("#application-form-container").hasClass("callApplicationApi")){
        $('#application-form-container').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
        $('.loader-parent').show();
        dataApplication();
    }

    onLoginUserApplication();
    $('#application-btn-container').parent().addClass('marginTopNone');
    $('#application-container').find('.a-rule').next('.columncontrol ').addClass('marginTopNone');
   
    $("#draft-applications").append('<ul class="a-dropdown__menu" name="draft-applications"></ul>');
    $('.hce-application-department').hide();
    $('.disciplineActive').show();

    $('.hce-application-department .a-dropdown__field').click(function() {
        if ($(this).hasClass('active') == false) {
            $(this).parents('.hce-application-department').css('z-index', '99999');
        } else if ($(this).hasClass('active') == true) {
            $(this).parents('.hce-application-department').css('z-index', '0');
        }
    });
	
	$('#laboratory-error-text').hide();
    $('#laboratoryMedicinePathologyParticipation-options .a-radio .a-radio__input').click(function() {        
        if ($(this).hasClass('selected') == true) {
            if($(this).attr('value') == 'true') {
				$(this).parents('#laboratoryMedicinePathologyParticipation-options').parent('.options').next('.text').find('#laboratory-error-text').hide();
            }else{
				$(this).parents('#laboratoryMedicinePathologyParticipation-options').parent('.options').next('.text').find('#laboratory-error-text').show();
            }

        }      
    });

    $(document).on("click", ".applt-title a", function(e) {
        e.preventDefault();
        let previousAppId = $(this).attr('id');
        commonDownload(previousAppId);
    });

    $(document).on("click", ".continue-app a", function() {       
        let storeContinueAppId = $(this).attr('id');
		$('.loader-parent').show();
        localStorage.setItem('storeContinueAppVal', storeContinueAppId);
    });
	
	$(document).on("click", "#viewpdf", function(e) {
        $('.loader-parent').show();
        e.preventDefault();
        let previousAppId = localStorage.getItem('storeContinueAppVal');
		$.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=ApplicationPDF&id=' + previousAppId,
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken
        },
        success: function(downloadResponse) {
            var encodeval = downloadResponse.response;
        	const fileName = '000000' + previousAppId+'.pdf';
			const content = encodeval;
			downloadFile(fileName, content);
            $('.loader-parent').hide(); 
        },
        error: function(error) {
            $('.loader-parent').hide();
        }
    });
    });
	//injecting pop up
    

 $('#delete-application-popup').wrap(' <div class="modal generic-modal" id="delete-application-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#delete-application-popup.cmp-container');
	$('#delete-application-popup').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#delete-application-popup').closest('body').find('.modal-backdrop.show').hide();
	
});

function cloneDiscipline(index, selectedValue, selectedDesc) {
    if (index > 0) {
        $('#remove-discipline').show();
        var clone = $('.adddropdown:eq(0)').clone().addClass('selectOption');
        $('#discipline-xf-options').closest('.options').append(clone);
        $('.selectOption:eq(' + index + ')').find('.fields.text').remove();
    }
    $('.selectOption:eq(' + index + ') ul li').each(function() {
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        if ($(this).attr("data-optionvalue") == selectedValue) {
            $(this).addClass("selected");
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder');
            $(this).closest('.a-dropdown__field').find('.a-dropdown-selected').text($(this).children('span').text());

            if (selectedValue == "CLINICAL_DEPARTMENT" || selectedValue == "OTHER") {
             $('#discipline-description').closest('.fields').clone().insertAfter($(this).parents('.a-dropdown'));
             $('.selectOption:eq(' + index + ')').find(' #discipline-description').parents('.text').show().addClass('pleaseDescribe');
			$('.selectOption:eq(' + index + ')').find(' #discipline-description').parents('.text').find('.a-input-field.mt-0').attr('data-required', true);			 
             $('.selectOption:eq(' + index + ')').find(' #discipline-description').show();
             $('.selectOption:eq(' + index + ')').find('#discipline-description').val(selectedDesc).attr('required', true).addClass("reqFieldClass");
            } 
        }


    });


}

var KPItype;
function cloneKPI(index, patienttKPIlistelement,kpiLength) {
    KPItype = patienttKPIlistelement.type.toLowerCase();
    if (KPItype == "health systems / administration") {
        KPItype = "hospital";
    }
    if (index > 0) {
        var clone = $('.selectKpiList-' + KPItype + ':eq(0)').clone();
        $('.selectKpiList-' + KPItype + ':eq(0)').closest('.m-accordion__body ').find('.columncontrol.column-align--center:eq(1)').append(clone);
		$('.selectKpiList-' + KPItype + ':eq(0) input[type="radio"].selected').prop('checked', true);		
        var newIDattr = $('.selectKpiList-' + KPItype + ':eq(0)').attr('id');
        var Idreplaced = newIDattr.slice(0, -1) + index;
        $('.selectKpiList-' + KPItype + ':eq(' + index + ')').attr('id', Idreplaced);
        var str = $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#application-kpi-title-' + KPItype + ' p').text();
        var lastIndex = str.lastIndexOf(" ");
        var addIndex = index + 1;
        str = str.substring(0, lastIndex) + " " + addIndex;
        $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#application-kpi-title-' + KPItype + ' p').text(str);
        var forattr = 0;
        $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#Kpis-measureOfImpact0-' + KPItype + '-options input').attr('name', 'Kpis-measureOfImpact0-' + KPItype + index);
        $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#Kpis-measureOfImpact0-' + KPItype + '-options input').each(function() {
            $(this).prop('checked', false);
            $(this).removeClass('selected');
            $(this).closest('label').attr("for", 'Kpis-measureOfImpact0-' + KPItype + index + forattr);
            $(this).attr("id", 'Kpis-measureOfImpact0-' + KPItype + index + forattr);
            forattr = forattr + 1;
        });
        $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#stakeholder-impact-rating0-' + KPItype + '-options input').attr('name', 'stakeholder-impact-rating0-' + KPItype + index);
        $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#stakeholder-impact-rating0-' + KPItype + '-options input').each(function() {
            $(this).prop('checked', false);
            $(this).removeClass('selected');
            $(this).closest('label').attr("for", 'stakeholder-impact-rating0-' + KPItype + index + forattr);
            $(this).attr("id", 'stakeholder-impact-rating0-' + KPItype + index + forattr);
            forattr = forattr + 1;
        });
         $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-qualifier-description0-' + KPItype + '').parents('.fields').hide();
        $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-category-description0-' + KPItype + '').parents('.fields').hide();
		$('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#remove-'+ KPItype +'-kpi').show();
        if(kpiLength-1 == index){
            $('.selectKpiList-' + KPItype + ':eq(' + index + ')').find('#add-'+ KPItype +'-kpi').show();
        }		
       	
    }
    else{
        if(kpiLength <2){
             $('.selectKpiList-' + KPItype + ':eq(0)').find('#add-'+ KPItype +'-kpi').show();
            $('.selectKpiList-' + KPItype + ':eq(0)').find('#remove-'+ KPItype +'-kpi').hide();
        }
        else{
         $('.selectKpiList-' + KPItype + ':eq(0)').find('#add-'+ KPItype +'-kpi').hide();
         $('.selectKpiList-' + KPItype + ':eq(0)').find('#remove-'+ KPItype +'-kpi').show();
        }
    }	

    //Select Qualifier
    var selectedKPIqualifier = patienttKPIlistelement.qualifier;
    let previousQualifier = $('.selectKpiList-' + KPItype + ':eq(' + index + ') ul[name="Kpis-qualifier0-' + KPItype + '"]').closest('.a-dropdown__field').find('.a-dropdown-selected');
    if(previousQualifier.length > 0)
    {
         previousQualifier.addClass('a-dropdown__placeholder').removeClass('a-dropdown-selected');
        previousQualifier[0].innerHTML='PLEASE CHOOSE A QUALIFIER';
    }
    $('.selectKpiList-' + KPItype + ':eq(' + index + ') ul[name="Kpis-qualifier0-' + KPItype + '"] li').each(function() {
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        if ($(this).attr("data-optionvalue") == selectedKPIqualifier) {
            $(this).addClass("selected");
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder');
            $(this).closest('.a-dropdown__field').find('.a-dropdown-selected').text($(this).children('span').text());

            if (selectedKPIqualifier == "OTHER") {
				
                $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-qualifier-description0-' + KPItype + '').parents('.fields').show().addClass('pleaseDescribe');
                $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-qualifier-description0-' + KPItype + '').parents('.fields').find('.a-input-field.mt-0').attr('data-required', true);
                $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-qualifier-description0-' + KPItype + '').show();
                $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-qualifier-description0-' + KPItype + '').val(patienttKPIlistelement.qualifierDescription).attr('required', true).addClass("reqFieldClass");
				
            }
        }
    });
	
    //Select KPI
    let previousKPI = $('.selectKpiList-' + KPItype + ':eq(' + index + ') ul[name="kpi-category0-' + KPItype + '"]').closest('.a-dropdown__field').find('.a-dropdown-selected');
    if(previousKPI.length > 0)
    {
         previousKPI.addClass('a-dropdown__placeholder').removeClass('a-dropdown-selected');
        previousKPI[0].innerHTML='PLEASE CHOOSE A KPI';
    }
    $('.selectKpiList-' + KPItype + ':eq(' + index + ') ul[name="kpi-category0-' + KPItype + '"] li').each(function() {
        var selectedKPIval = patienttKPIlistelement.category;
		var KPItypeother = patienttKPIlistelement.type;
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }

        if ($(this).attr("data-optionvalue") == selectedKPIval) {
            $(this).addClass("selected");
            $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder');
            $(this).closest('.a-dropdown__field').find('.a-dropdown-selected').text($(this).children('span').text());
                if(typeof KPItype === 'string'){
                    KPItypeother= KPItype.toUpperCase();
                }
            if (selectedKPIval == "OTHER_"+KPItypeother) {
                $('.selectKpiList-' + KPItype + ':eq(' + index + ')  #kpi-category-description0-' + KPItype + '').parents('.fields').show().addClass('pleaseDescribe');
                $('.selectKpiList-' + KPItype + ':eq(' + index + ')  #kpi-category-description0-' + KPItype + '').parents('.fields').find('.a-input-field.mt-0').attr('data-required', true);
                $('.selectKpiList-' + KPItype + ':eq(' + index + ')  #kpi-category-description0-' + KPItype + '').show();
                $('.selectKpiList-' + KPItype + ':eq(' + index + ')  #kpi-category-description0-' + KPItype + '').val(patienttKPIlistelement.categoryDescription).attr('required', true).addClass("reqFieldClass");
            }
            
            else{
                $('.selectKpiList-' + KPItype + ':eq(' + index + ')  #kpi-category-description0-' + KPItype + '').parents('.fields').hide();
            }

        }
    });

    //Quantiative and Qualitative radio buttons
    var selectedMeasureofimpact = patienttKPIlistelement.measureOfImpact; 
    if(typeof selectedMeasureofimpact === 'string'){
        selectedMeasureofimpact= selectedMeasureofimpact.toLowerCase();
     }
    $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-measureOfImpact0-' + KPItype + '-options input').prop('checked', false);

    $('.selectKpiList-' + KPItype + ':eq(' + index + ') #Kpis-measureOfImpact0-' + KPItype + '-options input').each(function() {
        if ($(this).val() == selectedMeasureofimpact) {
            if (selectedMeasureofimpact == 'quantitative') {
                $(this).addClass('selected');
				$(this).attr('checked', true);
                $(this).prop('checked', true);
                $(this).next('span').attr('aria-checked', 'true');				
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription-' + KPItype + '').val(patienttKPIlistelement.quantitativeDescription);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', true);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-' + KPItype + '').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-' + KPItype + '').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-' + KPItype + '').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', false);				


            } else if (selectedMeasureofimpact == 'qualitative') {
                $(this).addClass('selected');
				$(this).attr('checked', true);
                $(this).prop('checked', true);
                $(this).next('span').attr('aria-checked', 'true');				
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container').show();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container').hide();
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpi0-directquote-' + KPItype + '').val(patienttKPIlistelement.qualitativeDescription);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceName-' + KPItype + '').val(patienttKPIlistelement.qualitativeName);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container #Kpis0-sourceTitle-' + KPItype + '').val(patienttKPIlistelement.qualitativeTitle);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container #Kpis0-quantitativeDescription-' + KPItype + '').val('');
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-quantitative-measure-container .a-input-field.mt-0').attr('data-required', false);
                $(this).parents('#helpful-hint-entry-point').find('#section-patient0-qualitative-measure-container .a-input-field.mt-0').attr('data-required', true);				
            }

        }

    });

    //RATE THE IMPACT    
    var selectedRateofimpact = patienttKPIlistelement.impactRating;
    $('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact-rating0-' + KPItype + '-options input').prop('checked', false);
	$('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact-rating0-' + KPItype + '-options input').attr('checked', false);
	$('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact-rating0-' + KPItype + '-options input').removeClass('selected');
	$('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact-rating0-' + KPItype + '-options input').next('span').attr('aria-checked', 'true');
	$('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact-rating0-' + KPItype + '-options input').attr('data-required', false);	
    $('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact-rating0-' + KPItype + '-options input').each(function() {
      if ($(this).val() == selectedRateofimpact) {
		$(this).prop("checked", true);
		$(this).addClass('selected');
		$(this).attr('checked', true);
		$(this).next('span').attr('aria-checked', 'true');

        }
        else{
		$(this).prop("checked", false);
		$(this).removeClass('selected');
		$(this).attr('checked', false);
		$(this).next('span').attr('aria-checked', 'false');

        }
    });

    //Significance of the impact
   $('.selectKpiList-' + KPItype + ':eq(' + index + ') #stakeholder-impact0-' + KPItype + '').val(patienttKPIlistelement.impact);
}

$(document).on("click", "#draft-applications .applt-title span",function(e) { 
		e.preventDefault(); 
        $('#delete-submit').off();
		let appid,hashedContent;
		$('#delete-application-popup').show();
		$('#delete-application-popup').closest('body').find('.modal-backdrop.show').show();
         appid= $(this).closest('.draft-items').attr('data-id');
         hashedContent = $(this).closest('.draft-items').attr('data-hashedcontent');
        
         $('#delete-submit').click(function(e)
        {
            deleteApplication(appid,hashedContent);
    
        });
})
$(document).on('click', '#incomplete-applications .incompletePrevious-list .tooltip-list',function(e)
{
    e.preventDefault(); 
    $('#delete-submit').off();
    let appid,hashedContent;
    $('#delete-application-popup').show();
	$('#delete-application-popup').closest('body').find('.modal-backdrop.show').show();
     appid= $(this).closest('.incompletePrevious-list').attr('data-id');
         hashedContent = $(this).closest('.incompletePrevious-list').attr('data-hashedcontent');
        
         $('#delete-submit').click(function(e)
         {
             deleteApplication(appid,hashedContent);
     
         });
});
function deleteApplication(appid,hashedContent)
{
    $('.loader-parent').show();
    let data={};
    data['type']='AwardApplication';
    data['id']=appid;
    data['_hashedContent']=hashedContent;
    data['action']='delete';

     $.ajax({
			url: searchUserurlOrigin + '/api/private/eform/eforms',
			type: "POST",
			dataType: 'json',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			"headers": {
				"x-country-code": "US",
				"x-application-id": "univantshce",
				"x-id-token": getCookie('id.token'),
				"x-application-access-key": "user1#Applicant"
			},
			success: function(response) {

				console.log(response);
                if(response.errorCode == 0)
                {
                    $('#delete-application-popup')[0].style.display='none';
                    $('#delete-application-popup').closest('body').find('.modal-backdrop.show').hide();
                    window.location.reload();
                     $('.loader-parent').hide();
                }

			},
			error: function(error) {
                $('.loader-parent').hide();
            }
		});
}
