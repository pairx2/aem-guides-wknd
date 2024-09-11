var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var presentApplicationId;

function customRadio(radioName) {
	var radioButton = $('input[name="' + radioName + '"]');
	$(radioButton).each(function() {
		if ($(this).is(':checked')) {
			$(this).addClass("selected");
		}
	});
	$(radioButton).click(function() {
		if ($(this).is(':checked')) {
			$(this).addClass("selected");
		}
		$(radioButton).not(this).each(function() {
			$(this).removeClass("selected");
		});
	});
}


function showButtonLoader(ele, eleDisplay) {
	var buttonTextElement = $('input[id="save-draft-text"]');

	var id = ele.attr('id') === 'application-save-draft';

	if (id) {
		if (eleDisplay) {
			ele.parent().addClass('a-button--spinner');
			if (buttonTextElement) {
				ele.children('span').text(buttonTextElement.val());
			}
		} else {
			ele.parent().removeClass('a-button--spinner');
			if (buttonTextElement) {
				ele.children('span').text('SAVE DRAFT');
			}
		}
	}
}

$(document).ready(function() {
	let fileDetails=[];
	localStorage.setItem('FileAdded',false);
	$('#confirmation-tab-submit').addClass('application-save-draft');
	$("#startNewApplication").attr("href", "#");
	$("#startNewApplication").click(function(e) {

		e.preventDefault();
		$(this).parent().parent().hide();
		$("#section-start-application").show();
	});
	$("#section-helpful-hints-small").parent().addClass("helpfullhint-device");
	$("#application-form-container").parent().closest("#section-login-container").parent().addClass("application-page-container");

	$("div#application-container .options fieldset.radio").addClass("customRadio");

	$('section[id^="section-key-partner"]').parent().addClass("paddingNone");


	customRadio("institutionType");
	customRadio("institutionCategory");
	customRadio("institutionSubCategory");
	customRadio("laboratoryMedicinePathologyParticipation");
	customRadio("uniqueness");
	customRadio("implementation");
	customRadio("scalability");
	customRadio("governance");
	customRadio("laboratoryIntelligence");
	// description field added for key partner decipline
	$("input#partner2-discipline-description").parent().closest(".text").addClass("partner2Description");
	$("input#partner3-discipline-description").parent().closest(".text").addClass("partner3Description");
	$("input#partner4-discipline-description").parent().closest(".text").addClass("partner4Description");
	$("input#partner5-discipline-description").parent().closest(".text").addClass("partner5Description");
	$(".partner2Description,.partner3Description,.partner4Description,.partner5Description").hide();
	$(".partner2Description,.partner3Description,.partner4Description,.partner5Description").find('.a-input-field.mt-0').attr('data-required', false);
	$(".partner2Description,.partner3Description,.partner4Description,.partner5Description").find('.a-input-label').hide();
	$("input#institution-sub-category-description").parents('.fields.text').addClass("institutionSubCategoryDesc");
	$(".institutionSubCategoryDesc").find('.a-input-field.mt-0').attr('data-required', false);
	$(".institutionSubCategoryDesc").find('.a-input-label').hide();

	$(document).on("click", "section[id^='section-key-partner'] .drop-down ul li", function(e) {
		var selectdiscipline = $(this).attr("data-optionvalue");
		if (selectdiscipline == "CLINICAL_DEPARTMENT" || selectdiscipline == "OTHER") {
			$(this).parents('.drop-down').parent().next('.fields.text').show().find(".a-input-control").addClass("reqFieldClass");
			$(this).parents('.drop-down').parent().next('.fields.text').find(".a-input-control").val("");
			$(this).parents('.drop-down').parent().next('.fields.text').find('.a-input-field.mt-0').attr('data-required', true);
		} else {
			$(this).parents('.drop-down').parent().next('.fields.text').hide().find(".a-input-control").removeClass("reqFieldClass");
			$(this).parents('.drop-down').parent().next('.fields.text').find('.a-input-field.mt-0').attr('data-required', false);
		}
	});
	$(document).on("click", 'input[name="institutionSubCategory"]', function(e) {
		var selectCategory = $(this).val()
		if (selectCategory == "OTHER") {
			$(".institutionSubCategoryDesc").show().find(".a-input-control").addClass("reqFieldClass");
			$(".institutionSubCategoryDesc").find('.a-input-field.mt-0').attr('data-required', true);
		} else {
			$(".institutionSubCategoryDesc").hide().find(".a-input-control").removeClass("reqFieldClass");
			$(".institutionSubCategoryDesc").find('.a-input-field.mt-0').attr('data-required', false);
		}
	});

	//Add and remove partner starts here
	var partnerCount = 3;
	$("#add-partner").click(function(e) {
		e.preventDefault();
		partnerCount++;

		$("#section-key-partner" + partnerCount).show();
		$("#section-key-partner" + partnerCount).find('.a-input-field.mt-0').attr('data-required', true);
		$("#section-key-partner" + partnerCount).find('.a-dropdown.a-input-field.mt-0').attr('data-required', true);
		$("#remove-partner").show();
		if (partnerCount == 5) {
			$("#add-partner").hide();

		}
	});
	$("#remove-partner").click(function(e) {
		e.preventDefault();

		$("#section-key-partner" + partnerCount).hide();
		$("#section-key-partner" + partnerCount).find('.a-input-field.mt-0').attr('data-required', false);
		$("#section-key-partner" + partnerCount).find('.a-dropdown.a-input-field.mt-0').attr('data-required', false);
		partnerCount--;
		$("#add-partner").show();
		if (partnerCount == 3) {
			$("#remove-partner").hide();

		}
	});

	//Add and remove partner ends here

	$("div#application-form-container #application-container .tab-content>div #btn_back").addClass("btnBack");
	$("div#application-form-container #application-container .tab-content>div #btn_continue").addClass("btnContinue");

	$("div#application-form-container #application-container nav a").each(function(index) {
		$(this).attr('id', 'application-container-item-' + index + '-tab');
		$(this).attr('href', '#application-container-item-' + index);
	});

	$("div#application-form-container #application-container .tab-content>div").each(function(index) {
		$(this).attr('id', 'application-container-item-' + index);
		$('#application-container-item-' + index).append('<p class="applicationSaveDraftText">Your draft has been saved</p>');
		$('#application-container-item-' + index).append('<p class="returnToInboxApp">There was an error saving. Return to your inbox <a href="/en/secure/applicant/my-account.html">here.</a></p>');
	});
	$("div#application-form-container #application-container .tab-content>div #btn_continue").removeAttr("target");

	$('a[id^="application-btn-continue"]').on('click', function() {
		var currenttabContainer;
		var selectedLink;

		$("div#application-form-container #application-container nav a").each(function(index) {
			if ($(this).hasClass("active")) {
				selectedLink = $(this).attr("id");
				currenttabContainer = $(this).attr("href");
			}
		});
		$("#" + selectedLink).removeClass("active");
		$("#" + selectedLink).next().addClass("active");
		$(currenttabContainer).removeClass("active");
		$(currenttabContainer).next().addClass("active");
		document.documentElement.scrollTop = 0

	});
	$('a[id^="application-btn-back"]').on('click', function() {
		var currenttabContainer;
		var selectedLink;
		$("div#application-form-container #application-container nav a").each(function(index) {
			if ($(this).hasClass("active")) {
				selectedLink = $(this).attr("id");
				currenttabContainer = $(this).attr("href");
			}
		});
		$("#" + selectedLink).removeClass("active");
		$("#" + selectedLink).prev().addClass("active");
		$(currenttabContainer).removeClass("active");
		$(currenttabContainer).prev().addClass("active");
		document.documentElement.scrollTop = 0
	});


	$("#application-save-draft, #application-btn-back0, #application-btn-continue0, #application-btn-continue1," +
		"#application-btn-back1, #application-btn-back2, #application-btn-continue2, #application-btn-back3, #application-btn-continue3,  #application-btn-back4").addClass("application-save-draft");

	getPresentApplicationId();

	function getPresentApplicationId() {
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
			success: function(response) {
				presentApplicationId = response.response.data[0].id;

			},
			error: function(error) {}
		});
	}

	$('.applicationSaveDraftText').hide();
	$('.returnToInboxApp').hide();

	var storeContinueAppVal = localStorage.getItem('storeContinueAppVal');
	var applicationHashContent = sessionStorage.getItem('applicationHashContent');
	$('.application-save-draft').click(function() {
      applicationHashContent = sessionStorage.getItem('applicationHashContent');
		var formApplnStatus = "DRAFT";
		if ($(this).attr('type') == "submit") {
			formApplnStatus = "SUBMITTED";
		}
		var saveDraftTextApplication = $(this).find('span').text();
	
	
			if(localStorage.getItem('userGroup') !="Administration")
			{
				saveDraftsubmit(formApplnStatus, saveDraftTextApplication, $(this));
				showButtonLoader($(this), true);
			}
		
	});

	$(document).on("click", "#application-container nav .tab-pane", function(e) {
		var formApplnStatus = "DRAFT";
		if(localStorage.getItem('userGroup')!=="Administration")
		{
		saveDraftsubmit(formApplnStatus)

		}
	});


	$('input[name="fileUpload"]').on('change', function() {

     		var iSize = $("#fileUpload input")[0].files[0].size;
			var iformat = $("#fileUpload input")[0].files[0].type;
			let allowedType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf','image/png','image/jpeg','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/x-zip-compressed','text/plain','text/csv','application/vnd.ms-powerpoint','application/msword']
			let count = 0;
            let totalFiles = $('.attachment-item');
            [...totalFiles].forEach(function(el) {
               count = count + parseInt(el.getAttribute('data-file-size'));
            });
            const fileiSize = Math.round((iSize / 1024));
			count = count+ fileiSize;
           
			if(allowedType.includes(iformat))
			{
				if((count<10240)&&(fileiSize<10240))
				{
					$('.attachments').append('<div class="attachment-item" data-file-size='+fileiSize+' '+'data-file='+[fileDetails]+'><span>'+$('#fileUpload input')[0].files[0].name+'</span><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></div>');
					fileDetails.push($("#fileUpload input")[0].files[0]);
					$('input[name="fileUpload"]').addClass('transparent');

				}
				else
				{
					$('.allowsize').show();
					$('input[name="fileUpload"]').val('');
					$('input[name="fileUpload"]').removeClass('transparent');
				}
			}
			else
			{
				$('.allowzip').show();
				$('input[name="fileUpload"]').val('');
				$('input[name="fileUpload"]').removeClass('transparent');

			}
			
		if($('.attachment-item').length > 0)
		{
			localStorage.setItem('FileAdded',true);
		}
		
	});
	$(document).on("click", '#fileUpload .abt-icon-cancel', function(e) {
	
		let currentFile = $(this).siblings().text();
		fileDetails.forEach(el=>
		{
			if(el.name==currentFile)
			{
				fileDetails.splice(fileDetails.indexOf(el),1);
			}
		});
		$(this).parent().remove();
		let activeTab = $('#application-container-item-4-tab').hasClass('active');
		if((localStorage.getItem('FileAdded')=='false')&&(activeTab == true))
		{
			localStorage.setItem('FileAdded','true');
		}
	});

	function saveDraftsubmit(formApplnStatus, saveDraftTextApplication, btnLoader) {

		$('.loader-parent').show();
		var applicantTitle = $("#applicantTitle").val();
		var applicantDepartment = $('#applicantDepartment').val();
		var applicantAddress1 = $('#applicantAddress1').val();
		var applicantAddress2 = $('#applicantAddress2').val();
		var applicantCity = $("#applicantCity").val();
		var applicantState = $("#applicantState").val();
		var applicantZip = $("#applicantZip").val();
		var applicantCountry = $('#applicantCountry-options ul').find("li.selected").attr("data-country");
		var institutionType = $('input[name="institutionType"].selected').val();
		var institutionCategory = $('input[name="institutionCategory"].selected').val();
		var institutionSubCategory = $('input[name="institutionSubCategory"].selected').val();
		var subCategoryDesc = $("#institution-sub-category-description").val();
		var laboratoryMedicineParticipation = $('input[name="laboratoryMedicinePathologyParticipation"].selected').val();
		var department = {};
		var clinicalCareDepartments = [];
		$('fieldset[id^="discipline-xf-options"]').each(function(index) {

			department.deptName = $(this).find("li.selected").attr("data-optionvalue")
			department.deptNumber = index;
			department.description = $(this).find('#discipline-description').val();

			//clinicalCareDepartments.push({department: department});
			clinicalCareDepartments.push({
				...department
			})
		});

		// *******partner data******

		var partners = {};
		var keyPartners = [];
		$('section[id^="section-key-partner"]').each(function(index) {
			if ($("#section-key-partner" + (index + 1)).css("display") !== "none") {
				partners.partnerId = index;
				if (index == 0) {
					partners.discipline = "LABORATORY_MEDICINE_PATHOLOGY";
					partners.disciplineDescription = "";
				} else {
					partners.discipline = $(this).find('#key-partner' + (index + 1)).find("li.selected").attr("data-optionvalue");
					partners.disciplineDescription = $('input[name="partner' + (index + 1) + '-discipline-description"]').val();
				}
				partners.email = $(this).find('input[name="projectPartners' + index + '-email"]').val();
				partners.name = $(this).find('input[name="projectPartners' + index + '-name"]').val();
				partners.title = $(this).find('input[name="projectPartners' + index + '-title"]').val();

				keyPartners.push({
					...partners
				});

			}
		});

		var patientkpi = {};
		var patientkpiItems = [];

		$(".selectKpiList-patient").each(function(index) {
			var contentID = $(this).attr("id");
			patientkpi.kpiNumber = index;
			patientkpi.type = "PATIENT"
			patientkpi.category = $("#" + contentID + " #kpi-category0-patient-options").find("li.selected").attr("data-optionvalue");
			patientkpi.qualifier = $("#" + contentID + " #Kpis-qualifier0-patient-options").find("li.selected").attr("data-optionvalue");

			if(patientkpi.qualifier === "OTHER"){
				patientkpi.qualifierDescription = $("#" + contentID + " #Kpis-qualifier-description0-patient").val();
				}
			else{
				patientkpi.qualifierDescription = "";
			}

			if(patientkpi.category === "OTHER_PATIENT"){
				patientkpi.categoryDescription = $("#" + contentID + " #kpi-category-description0-patient").val();
				}
			else{
				patientkpi.categoryDescription = "";
			}


			var measureType = $('#' + contentID + ' #Kpis-measureOfImpact0-patient-options input[type="radio"].selected').val();
			if (measureType == "quantitative") {
				patientkpi.measureOfImpact = "QUANTITATIVE";
				patientkpi.quantitativeDescription = $("#" + contentID + " #Kpis0-quantitativeDescription-patient").val();
			}
			if (measureType == "qualitative") {
				patientkpi.measureOfImpact = "QUALITATIVE";
				patientkpi.qualitativeDescription = $("#" + contentID + " #Kpi0-directquote-patient").val();
				patientkpi.qualitativeName = $("#" + contentID + " #Kpis0-sourceName-patient").val();
				patientkpi.qualitativeTitle = $("#" + contentID + " #Kpis0-sourceTitle-patient").val();
			}
			patientkpi.impact = $("#" + contentID + " #stakeholder-impact0-patient").val();
			patientkpi.impactRating = $('#' + contentID + '  #stakeholder-impact-rating0-patient-options input[type="radio"].selected').val();

			patientkpiItems.push({
				...patientkpi
			})

		});

		var cliniciankpi = {};
		var cliniciankpiItems = [];

		$(".selectKpiList-clinician").each(function(index) {
			var contentID = $(this).attr("id");
			cliniciankpi.kpiNumber = index;
			cliniciankpi.type = "CLINICIAN"
			cliniciankpi.category = $("#" + contentID + " #kpi-category0-clinician-options").find("li.selected").attr("data-optionvalue");
			cliniciankpi.qualifier = $("#" + contentID + " #Kpis-qualifier0-clinician-options").find("li.selected").attr("data-optionvalue");
			if(cliniciankpi.qualifier === "OTHER"){
				cliniciankpi.qualifierDescription = $("#" + contentID + " #Kpis-qualifier-description0-clinician").val();
				}
			else{
				cliniciankpi.qualifierDescription = "";
			}
			
			if(cliniciankpi.category === "OTHER_CLINICIAN"){
				cliniciankpi.categoryDescription = $("#" + contentID + " #kpi-category-description0-clinician").val();
				}
			else{
				cliniciankpi.categoryDescription = "";
			}

			var measureType = $('#' + contentID + ' #Kpis-measureOfImpact0-clinician-options input[type="radio"].selected').val();
			if (measureType == "quantitative") {
				cliniciankpi.measureOfImpact = "QUANTITATIVE";
				cliniciankpi.quantitativeDescription = $("#" + contentID + " #Kpis0-quantitativeDescription-clinician").val();
			}
			if (measureType == "qualitative") {
				cliniciankpi.measureOfImpact = "QUALITATIVE";
				cliniciankpi.qualitativeDescription = $("#" + contentID + " #Kpi0-directquote-clinician").val();
				cliniciankpi.qualitativeName = $("#" + contentID + " #Kpis0-sourceName-clinician").val();
				cliniciankpi.qualitativeTitle = $("#" + contentID + " #Kpis0-sourceTitle-clinician").val();

			}
			cliniciankpi.impact = $("#" + contentID + " #stakeholder-impact0-clinician").val();
			cliniciankpi.impactRating = $('#' + contentID + '  #stakeholder-impact-rating0-clinician-options input[type="radio"].selected').val();

			cliniciankpiItems.push({
				...cliniciankpi
			})

		});

		var hospitalAdminkpi = {};
		var hospitalAdminkpiItems = [];

		$(".selectKpiList-hospital").each(function(index) {
			var contentID = $(this).attr("id");
			hospitalAdminkpi.kpiNumber = index;
			hospitalAdminkpi.type = "HEALTH SYSTEMS / ADMINISTRATION"
			hospitalAdminkpi.category = $("#" + contentID + "  #kpi-category0-hospital-options").find("li.selected").attr("data-optionvalue");
			hospitalAdminkpi.qualifier = $("#" + contentID + " #Kpis-qualifier0-hospital-options").find("li.selected").attr("data-optionvalue");
			if(hospitalAdminkpi.qualifier === "OTHER"){
				hospitalAdminkpi.qualifierDescription = $("#" + contentID + " #Kpis-qualifier-description0-hospital").val();
				}
			else{
				hospitalAdminkpi.qualifierDescription = "";
			}

			if(hospitalAdminkpi.category === "OTHER_HOSPITAL"){
				hospitalAdminkpi.categoryDescription = $("#" + contentID + " #kpi-category-description0-hospital").val();
				}
			else{
				hospitalAdminkpi.categoryDescription = "";
			}

			var measureType = $('#' + contentID + ' #Kpis-measureOfImpact0-hospital-options input[type="radio"].selected').val();
			if (measureType == "quantitative") {
				hospitalAdminkpi.measureOfImpact = "QUANTITATIVE";
				hospitalAdminkpi.quantitativeDescription = $("#" + contentID + " #Kpis0-quantitativeDescription-hospital").val();
			}
			if (measureType == "qualitative") {
				hospitalAdminkpi.measureOfImpact = "QUALITATIVE";
				hospitalAdminkpi.qualitativeDescription = $("#" + contentID + " #Kpi0-directquote-hospital").val();
				hospitalAdminkpi.qualitativeName = $("#" + contentID + " #Kpis0-sourceName-hospital").val();
				hospitalAdminkpi.qualitativeTitle = $("#" + contentID + " #Kpis0-sourceTitle-hospital").val();
			}
			hospitalAdminkpi.impact = $("#" + contentID + " #stakeholder-impact0-hospital").val();
			hospitalAdminkpi.impactRating = $('#' + contentID + '  #stakeholder-impact-rating0-hospital-options input[type="radio"].selected').val();

			hospitalAdminkpiItems.push({
				...hospitalAdminkpi
			})

		});

		var payorkpi = {};
		var payorkpiItems = [];

		$(".selectKpiList-payor").each(function(index) {
			var contentID = $(this).attr("id");
			payorkpi.kpiNumber = index;
			payorkpi.type = "PAYOR"
			payorkpi.category = $("#" + contentID + " #kpi-category0-payor-options").find("li.selected").attr("data-optionvalue");
			payorkpi.qualifier = $("#" + contentID + " #Kpis-qualifier0-payor-options").find("li.selected").attr("data-optionvalue");

			if(payorkpi.qualifier === "OTHER"){
				payorkpi.qualifierDescription = $("#" + contentID + " #Kpis-qualifier-description0-payor").val();
				}
			else{
				payorkpi.qualifierDescription = "";
			}

			if(payorkpi.category === "OTHER_PAYOR"){
				payorkpi.categoryDescription = $("#" + contentID + " #kpi-category-description0-payor").val();
				}
			else{
				payorkpi.categoryDescription = "";
			}


			var measureType = $('#' + contentID + ' #Kpis-measureOfImpact0-payor-options input[type="radio"].selected').val();
			if (measureType == "quantitative") {
				payorkpi.measureOfImpact = "QUANTITATIVE";
				payorkpi.quantitativeDescription = $("#" + contentID + " #Kpis0-quantitativeDescription-payor").val();
			}
			if (measureType == "qualitative") {
				payorkpi.measureOfImpact = "QUALITATIVE";
				payorkpi.qualitativeDescription = $("#" + contentID + " #Kpi0-directquote-payor").val();
				payorkpi.qualitativeName = $("#" + contentID + " #Kpis0-sourceName-payor").val();
				payorkpi.qualitativeTitle = $("#" + contentID + " #Kpis0-sourceTitle-payor").val();
			}
			payorkpi.impact = $("#" + contentID + " #stakeholder-impact0-payor").val();
			payorkpi.impactRating = $('#' + contentID + '   #stakeholder-impact-rating0-payor-options input[type="radio"].selected').val();

			payorkpiItems.push({
				...payorkpi
			})

		});

		let savedAttachments = [];
		let attachmentList = $('.attachment-item');
		if(attachmentList.length > 0)
		{
			[...attachmentList].forEach(function(el)
			{
				savedAttachments.push({
					'type': 'attachment',
					'id': el.innerText,
					'size': el.getAttribute('data-file-size') ? el.getAttribute('data-file-size') : 0,
					'file': fileDetails.filter(ele => {
						if (el.innerText == ele.name) {
							return ele;
						}
					})
	
				});
			})	
		}
		else{
			savedAttachments.push(
				{'type': 'attachment'}
			)
		}
		

		var eforData = {

			"type": "AwardApplication",
			"_hashedContent": applicationHashContent,
			"id": storeContinueAppVal,
			"status": formApplnStatus,
			"name": $("#projectName").val(),
			"links": [{
				"type": "AwardApplicationCycle",
				"id": presentApplicationId

			}],
			"attachments": savedAttachments,
			
			"body": {
				"applicantInfo": {
					"title": applicantTitle,
					"department": applicantDepartment,
					"addressLine1": applicantAddress1,
					"addressLine2": applicantAddress2,
					"city": applicantCity,
					"state": applicantState,
					"zip": applicantZip,
					"country": applicantCountry
				},
				"institution": {
					"type": institutionType,
					"category": institutionCategory,
					"subCategory": institutionSubCategory,
					"subCategoryDesc": subCategoryDesc
				},
				"formSubmitAcknowledgement1": $('input[value="formSubmitAcknowledgementCheckbox1"]').next('span').attr('aria-checked'),
				"formSubmitAcknowledgement2": $('input[value="formSubmitAcknowledgementCheckbox2"]').next('span').attr('aria-checked'),
				"formSubmitAcknowledgement3": $('input[value="formSubmitAcknowledgementCheckbox3"]').next('span').attr('aria-checked'),
				"laboratoryMedicineParticipation": laboratoryMedicineParticipation,
				"clinicalCareDescription": $("#clinicalCareDescription").val(),
				"clinicalCareDepartments": clinicalCareDepartments,
				"projectPartners": keyPartners,
				"processAttributes": [{
					"attributeName": "uniqueness",
					"attributeValue": $('input[name="uniqueness"].selected').val(),
					"attributeDesc": $("#processAttributesUniquenessFreeText").val()
				}, {
					"attributeName": "easeOfImplementation",
					"attributeValue": $('input[name="implementation"].selected').val(),
					"attributeDesc": $("#processAttributesImplementationFreeText").val()
				}, {
					"attributeName": "scalability",
					"attributeValue": $('input[name="scalability"].selected').val(),
					"attributeDesc": $("#processAttributesScalabilityFreeText").val()
				}, {
					"attributeName": "governanceLevel",
					"attributeValue": $('input[name="governance"].selected').val(),
					"attributeDesc": $("#processAttributesGovernanceFreeText").val()
				}, {
					"attributeName": "labIntelligence",
					"attributeValue": $('input[name="laboratoryIntelligence"].selected').val(),
					"attributeDesc": $("#processAttributesIntelligenceFreeText").val()
				}],
				"patientKpis": patientkpiItems,
				"clinicianKpis": cliniciankpiItems,
				"hospitalAdminKpis": hospitalAdminkpiItems,
				"payorKpis": payorkpiItems
			}

		};
	
				
		var validationRequireLength = $('.validation-require').length;
		
		
		if (localStorage.getItem('FileAdded') == 'true') {
			//altering efordata payload:
			if (attachmentList.length > 0) {
				savedAttachments.forEach(function (el, index) {

					var eforDataTest = {

						"type": "AwardApplication",
						"_hashedContent": applicationHashContent,
						"id": storeContinueAppVal,
						"status": formApplnStatus,
						"name": $("#projectName").val(),
						"links": [{
							"type": "AwardApplicationCycle",
							"id": presentApplicationId

						}],
						"attachments": [el],

						"body": {
							"applicantInfo": {
								"title": applicantTitle,
								"department": applicantDepartment,
								"addressLine1": applicantAddress1,
								"addressLine2": applicantAddress2,
								"city": applicantCity,
								"state": applicantState,
								"zip": applicantZip,
								"country": applicantCountry
							},
							"institution": {
								"type": institutionType,
								"category": institutionCategory,
								"subCategory": institutionSubCategory,
								"subCategoryDesc": subCategoryDesc
							},
							"formSubmitAcknowledgement1": $('input[value="formSubmitAcknowledgementCheckbox1"]').next('span').attr('aria-checked'),
							"formSubmitAcknowledgement2": $('input[value="formSubmitAcknowledgementCheckbox2"]').next('span').attr('aria-checked'),
							"formSubmitAcknowledgement3": $('input[value="formSubmitAcknowledgementCheckbox3"]').next('span').attr('aria-checked'),
							"laboratoryMedicineParticipation": laboratoryMedicineParticipation,
							"clinicalCareDescription": $("#clinicalCareDescription").val(),
							"clinicalCareDepartments": clinicalCareDepartments,
							"projectPartners": keyPartners,
							"processAttributes": [{
								"attributeName": "uniqueness",
								"attributeValue": $('input[name="uniqueness"].selected').val(),
								"attributeDesc": $("#processAttributesUniquenessFreeText").val()
							}, {
								"attributeName": "easeOfImplementation",
								"attributeValue": $('input[name="implementation"].selected').val(),
								"attributeDesc": $("#processAttributesImplementationFreeText").val()
							}, {
								"attributeName": "scalability",
								"attributeValue": $('input[name="scalability"].selected').val(),
								"attributeDesc": $("#processAttributesScalabilityFreeText").val()
							}, {
								"attributeName": "governanceLevel",
								"attributeValue": $('input[name="governance"].selected').val(),
								"attributeDesc": $("#processAttributesGovernanceFreeText").val()
							}, {
								"attributeName": "labIntelligence",
								"attributeValue": $('input[name="laboratoryIntelligence"].selected').val(),
								"attributeDesc": $("#processAttributesIntelligenceFreeText").val()
							}],
							"patientKpis": patientkpiItems,
							"clinicianKpis": cliniciankpiItems,
							"hospitalAdminKpis": hospitalAdminkpiItems,
							"payorKpis": payorkpiItems
						}

					};
					if (eforDataTest.attachments != null) {
						$.ajax({
							url: searchUserurlOrigin + '/api/private/profile/signed-url',
							type: "POST",
							dataType: 'json',
							contentType: "application/json;charset=UTF-8",
							async: false,
							data: JSON.stringify(eforDataTest),
							"headers": {
								"x-country-code": xCountryCode,
								"x-application-id": xApplicationId,
								"x-id-token": getCookie('id.token'),
							},
							success: function (response) {

								var storeSigned = response.response.signedUrl;

								//sending appropriate file 
								secondAjaxCall(storeSigned, el.file[0]);

							},
							error: function (error) {
								if (btnLoader) {
									showButtonLoader($(btnLoader), false);
								}
							}
						});
					}
					if (index == savedAttachments.length - 1) {
						console.log(index);
						finalAjaxCall(eforData);

					}
				});
				localStorage.setItem('FileAdded', false);
			}
			else {
				finalAjaxCall(eforData);
			}
		}
		else {
			finalAjaxCall(eforData);
		}
				
		function secondAjaxCall(storeSigned, attachmentfn) {
			let xApplicationId = document.querySelector('input[name="x-application-id"]').value;
			let xCountryCode = document.querySelector('input[name="x-country-code"]').value;
			const putData = async () => {
				const response = await fetch(storeSigned, {
					method: 'PUT',
					async:false,
					headers: {
						"x-country-code":xCountryCode,
						"x-application-id": xApplicationId,
						"x-id-token": getCookie('id.token'),
						"Content-Type": "binary/octet-stream"
					},
					body: attachmentfn
				});
				// now do whatever you want with the data  
				
				// Return response data    
				return response;
			};
			putData();
		}

		function finalAjaxCall(eforDataFinal) {
			$.ajax({
				url: searchUserurlOrigin + '/api/private/eform/eforms',
				type: "POST",
				dataType: 'json',
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(eforDataFinal),
				"headers": {
					"x-country-code": xCountryCode,
					"x-application-id": xApplicationId,
					"x-id-token": getCookie('id.token'),
				},
				success: function(response) {
					if(btnLoader) {
						showButtonLoader($(btnLoader), false);
					}
					if (response.errorCode == 0 && response.response.status == "DRAFT") {
						$(document).find('.loader').hide();
						$(".returnToInboxApp").hide();
						sessionStorage.setItem('applicationHashContent', response.response._hashedContent);
						if (saveDraftTextApplication == 'SAVE DRAFT') {
							$('.applicationSaveDraftText').show();
							$('.loader-parent').hide();
						} else {
							$('.applicationSaveDraftText').hide();
							$('.loader-parent').hide();
						}

					} else if (response.errorCode != 0) {
						$(".returnToInboxApp").show();
					}

					if (response.errorCode == 0 && response.response.status == "SUBMITTED" && validationRequireLength < 1) {
						if(localStorage.getItem('userGroup')=='Applicant')
						window.location.href = "/en/secure/applicant/application-thank-you.html";
					else{
						if(localStorage.getItem('userGroup')=='Administration')
						{
							window.location.href = "/en/secure/administration/application-thank-you.html";
            
						}
					}
					}
				},
				error: function(error) {
					if(btnLoader) {
						showButtonLoader($(btnLoader), false);
					}
				}
			});
		}
	}
});