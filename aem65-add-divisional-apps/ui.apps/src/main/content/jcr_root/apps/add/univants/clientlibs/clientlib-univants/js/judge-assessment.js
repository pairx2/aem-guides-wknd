function populateJudgeassessmenttab() {
	var getApplicationId = localStorage.getItem('storeAwardApplicationVal');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication&id=' + getApplicationId,
        type: "GET",
        dataType: 'json',
        contentType: "application/json",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-application-access-key": "user1#Applicant",
            'x-id-token': jwtToken
        },
        success: function(data) {
            if (data.errorCode == 0) {
                $('.loader-parent').hide();
                var applicantAnswers = data.response.data[0].body.processAttributes;
                $.each(applicantAnswers, function(appIndex, appAns){
                    
                    if(appAns.attributeName == "uniqueness"){
                        $("#section-processatrribute-uniqueness #assessment-uniqueness").val(appAns.attributeValue.replace(/_/g, ' '));
                        $('#section-assessment-process-attributes-left #uniqueness-rating-explanation').text(appAns.attributeDesc.replace(/_/g, ' '));
                    }
                    if(appAns.attributeName == "easeOfImplementation"){
                        $("#section-processatrribute-easeofimplementation #assessment-ease-implementation").val(appAns.attributeValue.replace(/_/g, ' '));
                        $("#section-assessment-process-attributes-left #assessment-ease-implementation-explanation").text(appAns.attributeDesc.replace(/_/g, ' '));
                    }
                    if(appAns.attributeName == "scalability"){
                        $("#section-processatrribute-scalability #assessment-scalability").val(appAns.attributeValue.replace(/_/g, ' '));
                        $("#section-assessment-process-attributes-left #assessment-scalability-explanation").text(appAns.attributeDesc.replace(/_/g, ' '));
                    }
                    if(appAns.attributeName == "governanceLevel"){
                        $("#section-processatrribute-governance #assessment-levelofgovernance").val(appAns.attributeValue.replace(/_/g, ' '));
                        $("#section-assessment-process-attributes-left #assessment-governance-explanation").text(appAns.attributeDesc.replace(/_/g, ' '));
                    }
                    if(appAns.attributeName == "labIntelligence"){
                        if(appAns.attributeValue == "NOT_SIGNIFICANT")
                        {
                            $('#assessment-labintelligence').val("Not/Somewhat Significant");
                        }
                        else if(appAns.attributeValue == "VERY_SIGNIFICANT")
                        {
                            $('#assessment-labintelligence').val("Very/Extremely Significant");
                        }
                        else if(appAns.attributeValue == "SIGNIFICANT")
                        {
                            $('#assessment-labintelligence').val("Significant");
                        }
                        $("#section-assessment-process-attributes-left #assessment-labintelligence-explanation").text(appAns.attributeDesc.replace(/_/g, ' '));
                    }
                });

                if(data.response.data[0].judgeNotes == undefined){
                    $('#judgeNotes-from-team').hide();
                    $('#judge-notes-from-team').closest('body').find('.modal-backdrop.show').hide();
                }else {
                    $('#judge-notes-from-team').find('h3').parents('.text').siblings().eq(0).addClass('judge-desc');
                    $('#judge-notes-from-team').find('h3').parents('.text').siblings().eq(1).addClass('judge-indent');
                    $('#judgeNotes-from-team').show();
                    $('#judge-notes-from-team').closest('body').find('.modal-backdrop.show').show();
                    $('.judge-indent').find('p').text(data.response.data[0].judgeNotes);
                }

                var projectpartners = "";
                var responeData = data.response.data[0].body;
                var clinicalcareInitiative = $('#clinical-care-initiative');
                clinicalcareInitiative.find('textarea[name="titledepartment"]').val(responeData.applicantInfo.title + ',' + responeData.applicantInfo.department);
                clinicalcareInitiative.find('input[name="institutiontype"]').val(responeData.institution.type + ',' + responeData.institution.category + ',' + responeData.institution.subCategory.replace(/_/g, ' '));
                clinicalcareInitiative.find('input[name="country"]').val(responeData.applicantInfo.countryName.replace(/_/g, ' '));
                for (var m = 0; m < responeData.projectPartners.length; m++) {

                    if (responeData.projectPartners[m].title != "" && responeData.projectPartners[m].discipline != undefined) {
                        projectpartners = projectpartners+'<li>' + responeData.projectPartners[m].title + ',' + responeData.projectPartners[m].discipline.replace(/_/g, ' ') + '</li>';
                    }
                }
                $('#partners').append(projectpartners);
                $('#partners p').text(' ');

                clinicalcareInitiative.find('#assessment-initiative-description p').text(data.response.data[0].body.clinicalCareDescription);



                /* Clinician KPI */
                var participantsclinicianField = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #section-stakeholder-patient');

                for (var n = 1; n < responeData.clinicianKpis.length; n++) {


                    var cloneClinician = participantsclinicianField.clone();

                    participantsclinicianField.closest(".container").append(cloneClinician);



                }
                $.each(responeData.clinicianKpis, function(cindex, clinicianVal) {
                    var clinicianKPI = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')');
                    var str = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')').find('#purple-title-bg h3').text();
                    var lastIndex = str.lastIndexOf(" ");
                    var addIndex = cindex + 1;
                    str = str.substring(0, lastIndex) + " " + addIndex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')').find('#purple-title-bg h3').text(str);
                    var newindexattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')').find('#assessment-cliniciankpi-evidenceType-options ul').attr('name') + cindex;
                    var newindexInputattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')').find('.options input').attr('name') + cindex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')').find('.options input').attr('name', newindexInputattr);
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(1) #stakeholder-patient:eq(' + cindex + ')').find('#assessment-cliniciankpi-evidenceType-options ul').attr('name', newindexattr);
                    
                    if (clinicianVal.qualifier ||clinicianVal.category ) {
                        if((clinicianVal.categoryDescription)&&(clinicianVal.qualifierDescription)){
                            clinicianKPI.find('#assessment-clinician-kpi-qualifier').text(clinicianVal.qualifierDescription + ' ' +clinicianVal.categoryDescription);

                        }
                         else if(clinicianVal.qualifierDescription)
                         {
                            clinicianKPI.find('#assessment-clinician-kpi-qualifier').text(clinicianVal.qualifierDescription+' '+clinicianVal.category.replace(/_/g, ' '));
                        }
                        else if(clinicianVal.categoryDescription)
                        {
                            clinicianKPI.find('#assessment-clinician-kpi-qualifier').text(clinicianVal.qualifier+' '+clinicianVal.categoryDescription);
                       }
                        else{
                            clinicianKPI.find('#assessment-clinician-kpi-qualifier').text(clinicianVal.qualifier+' '+clinicianVal.category.replace(/_/g, ' '));
                       }
                    }
                    if (clinicianVal.measureOfImpact) {
                        clinicianKPI.find('#assessment-clinician-kpi-measure-impact').text(clinicianVal.measureOfImpact);
                        if(clinicianVal.measureOfImpact == 'QUANTITATIVE'){
                            clinicianKPI.find('#assessment-clinician-qualitative-question').hide();
                            clinicianKPI.find('#assessment-clinician-kpi-quote').hide();
                   			if (clinicianVal.quantitativeDescription) {
                        		clinicianKPI.find('#assessment-clinician-kpi-quantitative-measure').text(clinicianVal.quantitativeDescription);
                    		}                            
                        }      
                        else if(clinicianVal.measureOfImpact == 'QUALITATIVE'){
                            clinicianKPI.find('#assessment-clinician-quanititative-question').hide();
                            clinicianKPI.find('#assessment-clinician-kpi-quantitative-measure').hide();
                            if (clinicianVal.qualitativeDescription || clinicianVal.qualitativeName || clinicianVal.qualitativeTitle) {
                              clinicianKPI.find('#assessment-clinician-kpi-quote').text(clinicianVal.qualitativeDescription+','+clinicianVal.qualitativeName+','+clinicianVal.qualitativeTitle);
                            }
                        }
						
                    }
                    if (clinicianVal.impactRating) {
                        if(clinicianVal.impactRating == "NOT_SIGNIFICANT")
                        {
                            clinicianKPI.find('#assessment-clinician-kpi-rating').text("Not/Somewhat Significant");
                        }
                        else if(clinicianVal.impactRating == "VERY_SIGNIFICANT")
                        {
                            clinicianKPI.find('#assessment-clinician-kpi-rating').text("Very/Extremely Significant");
                        }
                        else if(clinicianVal.impactRating == "SIGNIFICANT")
                        {
                            clinicianKPI.find('#assessment-clinician-kpi-rating').text("Significant");
                        }
                    }
                    if (clinicianVal.quantitativeDescription) {
                        clinicianKPI.find('#assessment-clinician-kpi-quantitative-measure').text(clinicianVal.quantitativeDescription);
                    }
                    if (clinicianVal.impact) {
                        clinicianKPI.find('#assessment-clinician-kpi-significance').text(clinicianVal.impact.replace(/_/g, ' '));
                    }


                });
                /* Patient KPI */
                var participantspatientField = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient');

                for (var p = 1; p < responeData.patientKpis.length; p++) {


                    var clonePatient = participantspatientField.clone();

                    participantspatientField.closest(".container").append(clonePatient);



                }
                $.each(responeData.patientKpis, function(pindex, patientVal) {
                    var patientKPI = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')');
                    var str = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')').find('#purple-title-bg h3').text();
                    var lastIndex = str.lastIndexOf(" ");
                    var addIndex = pindex + 1;
                    str = str.substring(0, lastIndex) + " " + addIndex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')').find('#purple-title-bg h3').text(str);
                    var newindexattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')').find('#assessment-patientkpi-evidenceType-options ul').attr('name') + pindex;
                    var newindexInputattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')').find('.options input').attr('name') + pindex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')').find('.options input').attr('name', newindexInputattr);
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(0) #section-stakeholder-patient #stakeholder-patient:eq(' + pindex + ')').find('#assessment-patientkpi-evidenceType-options ul').attr('name', newindexattr);
                    
                    if (patientVal.qualifier ||patientVal.category ) {
                        if((patientVal.categoryDescription)&&(patientVal.qualifierDescription)){
                            patientKPI.find('#assessment-patient-kpi-qualifier').text(patientVal.qualifierDescription + ' ' +patientVal.categoryDescription);

                        }
                         else if(patientVal.qualifierDescription)
                         {
                            patientKPI.find('#assessment-patient-kpi-qualifier').text(patientVal.qualifierDescription+' '+patientVal.category.replace(/_/g, ' '));
                        }
                        else if(patientVal.categoryDescription)
                        {
                            patientKPI.find('#assessment-patient-kpi-qualifier').text(patientVal.qualifier+' '+patientVal.categoryDescription);
                       }
                       else{
                        patientKPI.find('#assessment-patient-kpi-qualifier').text(patientVal.qualifier+' '+patientVal.category.replace(/_/g, ' '));
                       }
                    }
                    if (patientVal.measureOfImpact) {
                        patientKPI.find('#assessment-patient-kpi-measure-impact').text(patientVal.measureOfImpact);
                        if(patientVal.measureOfImpact == 'QUANTITATIVE'){
                            patientKPI.find('#assessment-patient-qualitative-question').hide();
                            patientKPI.find('#assessment-patient-kpi-quote').hide();
                   			if (patientVal.quantitativeDescription) {
                        		patientKPI.find('#assessment-patient-kpi-quantitative-measure').text(patientVal.quantitativeDescription);
                    		}                            
                        }      
                        else if(patientVal.measureOfImpact == 'QUALITATIVE'){
                            patientKPI.find('#assessment-patient-quanititative-question').hide();
                            patientKPI.find('#assessment-patient-kpi-quantitative-measure').hide();
                            if (patientVal.qualitativeDescription || patientVal.qualitativeName || patientVal.qualitativeTitle) {
                              patientKPI.find('#assessment-patient-kpi-quote').text(patientVal.qualitativeDescription+','+patientVal.qualitativeName+','+patientVal.qualitativeTitle);
                            }
                        }
                    }
                    if (patientVal.impactRating) {
                        if(patientVal.impactRating == "NOT_SIGNIFICANT")
                        {
                            patientKPI.find('#assessment-patient-kpi-rating').text("Not/Somewhat Significant");
                        }
                        else if(patientVal.impactRating == "VERY_SIGNIFICANT")
                        {
                            patientKPI.find('#assessment-patient-kpi-rating').text("Very/Extremely Significant");
                        }
                        else if(patientVal.impactRating == "SIGNIFICANT")
                        {
                            patientKPI.find('#assessment-patient-kpi-rating').text("Significant");
                        }
                    }
                    if (patientVal.quantitativeDescription) {
                        patientKPI.find('#assessment-patient-kpi-quantitative-measure').text(patientVal.quantitativeDescription);
                    }
                    if (patientVal.impact) {
                        patientKPI.find('#assessment-patient-kpi-significance').text(patientVal.impact.replace(/_/g, ' '));
                    }


                });
                /* Hospital Admin KPI */
                var participantshospitalField = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #section-stakeholder-patient');

                for (var r = 1; r < responeData.hospitalAdminKpis.length; r++) {


                    var cloneHospital = participantshospitalField.clone();

                    participantshospitalField.closest(".container").append(cloneHospital);



                }
                $.each(responeData.hospitalAdminKpis, function(hindex, hospitalVal) {
                    var hospitalKPI = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')');
                    var str = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')').find('#purple-title-bg h3').text();
                    var lastIndex = str.lastIndexOf(" ");
                    var addIndex = hindex + 1;
                    str = str.substring(0, lastIndex) + " " + addIndex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')').find('#purple-title-bg h3').text(str);
                    var newindexattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')').find('#assessment-healthsystemsadministrationkpi-evidenceType-options ul').attr('name') + hindex;
                    var newindexInputattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')').find('.options input').attr('name') + hindex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')').find('.options input').attr('name', newindexInputattr);
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(2) #stakeholder-patient:eq(' + hindex + ')').find('#assessment-healthsystemsadministrationkpi-evidenceType-options ul').attr('name', newindexattr);
                    if (hospitalVal.qualifier ||hospitalVal.category ) {
                        if((hospitalVal.categoryDescription)&&(hospitalVal.qualifierDescription)){
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-qualifier').text(hospitalVal.qualifierDescription + ' ' +hospitalVal.categoryDescription);

                        }
                         else if(hospitalVal.qualifierDescription)
                         {
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-qualifier').text(hospitalVal.qualifierDescription+' '+hospitalVal.category.replace(/_/g, ' '));
                        }
                        else if(hospitalVal.categoryDescription)
                        {
                           hospitalKPI.find('#assessment-healthsystemsadministration-kpi-qualifier').text(hospitalVal.qualifier+' '+hospitalVal.categoryDescription);
                       }
                       else{
                        hospitalKPI.find('#assessment-healthsystemsadministration-kpi-qualifier').text(hospitalVal.qualifier+' '+hospitalVal.category.replace(/_/g, ' '));
                       }
                    }
                   
                    if (hospitalVal.measureOfImpact) {
                        hospitalKPI.find('#assessment-healthsystemsadministration-kpi-measure-impact').text(hospitalVal.measureOfImpact);
                        if(hospitalVal.measureOfImpact == 'QUANTITATIVE'){
                            hospitalKPI.find('#assessment-healthsystemsadministration-qualitative-question').hide();
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-quote').hide();
                           if (hospitalVal.quantitativeDescription) {
                        		hospitalKPI.find('#assessment-healthsystemsadministration-kpi-quantitative-measure').text(hospitalVal.quantitativeDescription);
                    		}                            
                        }      
                        else if(hospitalVal.measureOfImpact == 'QUALITATIVE'){
                            hospitalKPI.find('#assessment-healthsystemsadministration-quanititative-question').hide();
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-quantitative-measure').hide();
                            if (hospitalVal.qualitativeDescription || hospitalVal.qualitativeName || hospitalVal.qualitativeTitle) {
                              hospitalKPI.find('#assessment-healthsystemsadministration-kpi-quote').text(hospitalVal.qualitativeDescription+','+hospitalVal.qualitativeName+','+hospitalVal.qualitativeTitle);
                            }
                        }						
                    }
                    if (hospitalVal.impactRating) {
                     if(hospitalVal.impactRating == "NOT_SIGNIFICANT")
                        {
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-rating').text("Not/Somewhat Significant");
                        }
                        else if(hospitalVal.impactRating == "VERY_SIGNIFICANT")
                        {
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-rating').text("Very/Extremely Significant");
                        }
                        else if(hospitalVal.impactRating == "SIGNIFICANT")
                        {
                            hospitalKPI.find('#assessment-healthsystemsadministration-kpi-rating').text("Significant");
                        }
                    }
                    if (hospitalVal.quantitativeDescription) {
                        hospitalKPI.find('#assessment-healthsystemsadministration-kpi-quantitative-measure').text(hospitalVal.quantitativeDescription);
                    }
                    if (hospitalVal.impact) {
                        hospitalKPI.find('#assessment-healthsystemsadministration-kpi-significance').text(hospitalVal.impact.replace(/_/g, ' '));
                    }


                });

                /* Payor KPI */
                var participantspayorField = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #section-stakeholder-patient');

                for (var s = 1; s < responeData.payorKpis.length; s++) {


                    var clonePayor = participantspayorField.clone();

                    participantspayorField.closest(".container").append(clonePayor);



                }
                $.each(responeData.payorKpis, function(pyindex, payorlVal) {
                    var payorKPI = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')');
                    var str = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')').find('#purple-title-bg h3').text();
                    var lastIndex = str.lastIndexOf(" ");
                    var addIndex = pyindex + 1;
                    str = str.substring(0, lastIndex) + " " + addIndex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')').find('#purple-title-bg h3').text(str);
                    var newindexattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')').find('#assessment-payorkpi-evidenceType-options ul').attr('name') + pyindex;
                    var newindexInputattr = $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')').find('.options input').attr('name') + pyindex;
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')').find('.options input').attr('name', newindexInputattr);
                    $('.tabsjudge1 .cmp-container .container.responsivegrid.a-container:eq(3) #stakeholder-patient:eq(' + pyindex + ')').find('#assessment-payorkpi-evidenceType-options ul').attr('name', newindexattr);
                   
                    if (payorlVal.qualifier ||payorlVal.category ) {
                        if((payorlVal.categoryDescription)&&(payorlVal.qualifierDescription)){
                            payorKPI.find('#assessment-payor-kpi-qualifier').text(payorlVal.qualifierDescription + ' ' +payorlVal.categoryDescription);

                        }
                         else if(payorlVal.qualifierDescription)
                         {
                            payorKPI.find('#assessment-payor-kpi-qualifier').text(payorlVal.qualifierDescription+' '+payorlVal.category.replace(/_/g, ' '));
                        }
                        else if(payorlVal.categoryDescription)
                        {
                            payorKPI.find('#assessment-payor-kpi-qualifier').text(payorlVal.qualifier+' '+payorlVal.categoryDescription);
                       }
                       else{
                        payorKPI.find('#assessment-payor-kpi-qualifier').text(payorlVal.qualifier+' '+payorlVal.category.replace(/_/g, ' '));
                       }
                    }
                    if (payorlVal.measureOfImpact) {
                        payorKPI.find('#assessment-payor-kpi-measure-impact').text(payorlVal.measureOfImpact);
                       if(payorlVal.measureOfImpact == 'QUANTITATIVE'){
                            payorKPI.find('#assessment-payor-qualitative-question').hide();
                            payorKPI.find('#assessment-payor-kpi-quote').hide();
                   			if (payorlVal.quantitativeDescription) {
                        		payorKPI.find('#assessment-payor-kpi-quantitative-measure').text(payorlVal.quantitativeDescription);
                    		}                            
                        }      
                        else if(payorlVal.measureOfImpact == 'QUALITATIVE'){
                             payorKPI.find('#assessment-payor-quanititative-question').hide();
                            payorKPI.find('#assessment-payor-kpi-quantitative-measure').hide();
                           if (payorlVal.qualitativeDescription || payorlVal.qualitativeName || payorlVal.qualitativeTitle) {
                              payorKPI.find('#assessment-payor-kpi-quote').text(payorlVal.qualitativeDescription+','+payorlVal.qualitativeName+','+payorlVal.qualitativeTitle);
                            }
                        }							
                    }
                    if (payorlVal.impactRating) {                       
                        if(payorlVal.impactRating == "NOT_SIGNIFICANT")
                        {
                            payorKPI.find('#assessment-payor-kpi-rating').text("Not/Somewhat Significant");
                        }
                        else if(payorlVal.impactRating == "VERY_SIGNIFICANT")
                        {
                            payorKPI.find('#assessment-payor-kpi-rating').text("Very/Extremely Significant");
                        }
                        else if(payorlVal.impactRating == "SIGNIFICANT")
                        {
                            payorKPI.find('#assessment-payor-kpi-rating').text("Significant");
                        }
                    }
                    if (payorlVal.quantitativeDescription) {
                        payorKPI.find('#assessment-payor-kpi-quantitative-measure').text(payorlVal.quantitativeDescription);
                    }
                    if (payorlVal.impact) {
                        payorKPI.find('#assessment-payor-kpi-significance').text(payorlVal.impact.replace(/_/g, ' '));
                    }


                });

                $('#section-clinical-care-initiative,#section-stakeholder-patient').addClass('sectionList');

                $('<p id="pageCountlist"></p>').insertBefore('.cmp-container #return-inbox .col-12.col-md-4 .link');
                getSectioncont();



            }
        },
        error: function(error) {}
    });
}

function getSectioncont() {
    $('.sectionList').each(function(i) {
        var totalList = $('.sectionList').length;
        if ($(this).is(":visible")) {
            i = i + 1;
            $('.cmp-container #pageCountlist').text(i + ' ' + 'of' + ' ' + totalList);
        }
    });
}
$(document).ready(function() {

    $("#measurable-impact-tab-body #stakeholder-patient .sectionBody-left").addClass("assessment-measurable-impact-left");
	$(".assessment-measurable-impact-left").find(".a-rule").prev(".text").addClass("applicantAnswers");

    if ($('#judge-assessment-tabs').length) {
        $('.loader-parent').show();
        populateJudgeassessmenttab();
        $('.container #section-stakeholder-patient').hide();

        var enableSubmitbtn = $('#judge-assessment-tabs').closest('body');
        enableSubmitbtn.click(function(){ 
            var checkfielddetails = $('#judge-assessment-tabs .nav .verified').length;
            if(checkfielddetails == '4'){
             $('#submit-assessment').removeAttr('disabled'); 
            }
          $('.draftMsg').hide();
        });       

		$('<p class="draftMsg">Your draft has been saved</p>').insertAfter('#judge-assessment-tabs .tab-content').hide();
        $('<p class="returnToInbox">There was an error saving. Return to your inbox <a href="/en/secure/judge.html">here.</a></p>').insertAfter('#judge-assessment-tabs .tab-content').hide(); 

        $('#judge-assessment-tabs .nav-item').each(function(indexing) {
            $(this).addClass('tabsjudge' + indexing);
        });
        $('#judge-assessment-tabs .cmp-tabs__tabpanel').each(function(indexs) {
            $(this).addClass('tabsjudge' + indexs);
        });
        $('.cmp-container #return-inbox').closest('.columncontrol ').addClass('judgemarginTop');
        $('.cmp-container #return-inbox').closest('.columncontrol ').addClass('judgemarginBottom');
        $('.a-container__content #stakeholder-patient #sectionBody').closest('.columncontrol').addClass('m-0');
        $('.a-container__content #stakeholder-patient #purple-title-bg').closest('.text').addClass('m-0');
        $(".a-container__content #stakeholder-patient ").addClass('borderGrey');
        $('#purple-title-bg').closest('.text').addClass('judgemarginBottom');
        $('#scorecard-section-header').closest('.text').addClass('judgemargin');
        $('#assessment-optional-download').closest('.button').addClass('justifyStart');
        $('#judge-btn-group').closest('.columncontrol ').addClass('judgebtnList');
		$('#section-processatrribute-uniqueness, #section-processatrribute-easeofimplementation,#section-processatrribute-scalability,#section-processatrribute-governance,#section-processatrribute-labintelligence,#section-submit-application-merit,#submit-standout-application').addClass('sectionList');
        $('#continue-btn-0').click(function() {
            $('.tabsjudge1').addClass('active');
            $('.tabsjudge1').show();
            $('.tabsjudge0').removeClass('active');
            $('#section-stakeholder-patient:eq(0)').show();
            $(".judgebtnList").show();
            $('#judge-btn-group').show();
            $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').show();
            getSectioncont();

        });
        $(document).on("click", ".nav .tabsjudge1", function(e) {
            $('#measurable-impact-tab-body .sectionList').hide();
            $('#section-stakeholder-patient:eq(0)').show();
            $(".judgebtnList").show();
            $('#judge-btn-group').show();
            $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').show();
        });
        $(document).on("click", ".nav .tabsjudge0", function(e) {
            $('#section-clinical-care-initiative').show();
            $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').hide();
        });
        $(document).on("click", ".nav .tabsjudge2", function(e) {
            $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').hide();
        });

        $(document).on("click", ".tab-pane", function(e) {
            getSectioncont();
        });

        var index = 1;
            

        $(document).on("click", "#assessment-continue", function(e) {
            var impactLength = $('.tabsjudge1 .sectionList').length;

            if ($('.sectionList:eq(1)').is(":visible")) {
                $('.sectionList:eq(1)').hide();
                index = 2;
            } 
            else if( $('#section-measurable-impact-tab-body .sectionList:last').is(":visible")){

               $('.tabsjudge2').addClass('active');
                $(".judgebtnList").hide();
                $('.tabsjudge1').removeClass('active');
            }						
			else {
                $('.sectionList:visible').hide();
                index = index + 1;
            }

            $('.sectionList').eq(index).show();
            if (impactLength == index - 1) {
                $('.tabsjudge2').addClass('active');
                $(".judgebtnList").hide();
                $('.tabsjudge1').removeClass('active');

            }

            getSectioncont();
            return index;
        })
        $(document).on("click", "#assessment-previous", function(e) {
            var impactLength = $('.tabsjudge1 .sectionList').length;

            if ($('.sectionList:eq(1)').is(":visible")) {
                $('.sectionList:eq(1)').hide();
                index = 0;
            } 
 			else if( $('#section-measurable-impact-tab-body .sectionList:last').is(":visible")){
                var preimpact = impactLength-1;
               $('.sectionList:visible').hide(); 
                $('.sectionList:eq('+preimpact+')').show(); 

                $('.sectionList:eq(1)').hide();
                $('.sectionList').eq(index).hide();
                index = preimpact;
            }  
            else {
                $('.sectionList:visible').hide();
                index = index - 1;
                 $('.sectionList').eq(index).show();

            }

            if (index == 0) {
                $('.tabsjudge0').addClass('active');
                $('.tabsjudge1').removeClass('active');
                $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').hide();
            }
            if (impactLength == index) {
                $('.tabsjudge1').addClass('active');
                $('.tabsjudge2').removeClass('active');

            }
            getSectioncont();
        })

        if ($('.tabsjudge0').hasClass('active')) {
            $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').hide();
        }

        $(document).on("click", "#unique-prev", function(e) {
			 $('#section-measurable-impact-tab-body .sectionList').hide();
            $('.patientKpiContainer .sectionList:first-child').hide();
            $('.payorKpiContainer .sectionList:last-child').show();
            $(".judgebtnList").show();
            $('#assessment-previous, #assessment-continue, #assessment-impact-save-draft').show();
        });

        $(document).on("click", "#processAttributeTab, #submitTab", function(e) {
			$(".judgebtnList").hide();
        });
		
		$(document).on("click", "#assessment-optional-download", function(e) {
            $('.loader-parent').show();
            e.preventDefault();
            var previousAppId = localStorage.getItem("storeAwardApplicationVal");
            commonDownload(previousAppId);
    	});

        var applicationName = localStorage.getItem("applicationName");
        $('.judgemarginTop').find('.col-lg-4').find('a.a-link__text').addClass('assessment-download');
        $('.assessment-download').children('span').remove();
        $('.assessment-download').prepend('<span class="applicationName">'+ applicationName +'</span>').prepend('<span class="zipExtension">(.ZIP)</span> ');

        $(document).on("click", ".assessment-download", function(e) {
            e.preventDefault();
            var previousAppId = localStorage.getItem("storeAwardApplicationVal");
            commonDownload(previousAppId);
    	});
		
		
	 /* judge assessment submit tab*/
	 $("#judge-assessment-tabs").closest(".container").addClass("p-0");


    $("#submit-application-merit").find(".columncontrol").addClass("m-0");
    $("#submit-standout-application").find(".columncontrol").addClass("m-0");   


	$('.judgebtnList').hide();


  $('#submit-standout-application').hide();

    $("#application-merit-continue").click(function() {
  		$("#submit-standout-application").show();
        $('#submit-application-merit').hide();
	});

    $('#submit-prev span').click(function(){

		$('#processAttributeTab').addClass('show active');
        $("#section-processatrribute-uniqueness").parent(".container").hide();
        $("#section-process-attributes-tab-body .processAttrTabs:last-child").show();
		$('#submitTab').removeClass('show active');
        $('.tabsjudge3').removeClass('cmp-tabs__tabpanel--active active');
        $('.tabsjudge2').addClass('cmp-tabs__tabpanel--active active');

    });

    $('#standout-prev span').click(function(){

		$("#submit-standout-application").hide();
        $('#submit-application-merit').show();

    });

    $("#application-merit-continue").click(function() {
			$("#standout-application-text").hide();
            $("#submit-standout-application .sectionBody-right .text:first-child").show();
            $("#submit-standout-application .sectionBody-right .options").show();
           	$("#submit-standout-application .sectionBody-right .form-group.a-form-grp").show();
            $("#submit-standout-application .sectionBody-right .cmp-title__text").show();
	});		

    }

});
