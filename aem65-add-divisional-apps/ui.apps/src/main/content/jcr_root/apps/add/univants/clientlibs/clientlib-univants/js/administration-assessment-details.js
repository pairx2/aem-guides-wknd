function showAssessmentDetails() {
    var firstRow = new Array(),
        secondRow = new Array(),
        thirdRow = new Array(),
        fourRow = new Array(),
        fiveRow = new Array(),
        sixRow = new Array(),
        sevenRow = new Array(),
        eightRow = new Array(),
        nineRow = new Array(),
        labintellgience = new Array(),
        pruniqueness = new Array(),
        preaseImpn = new Array(),
        prscaleImpn = new Array(),
        prgImpn = new Array(),
        unityscore = new Array(),
        assessmentStatus = new Array(),        
        meritDescription = new  Array(),
        standoutDescription = new Array();


    var table = $("<table id='assesmentTable' class='table-responsive' />");
    var dynamicassesID = localStorage.getItem('adminAssessmentID');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=ApplicationDetails&id=' + dynamicassesID,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",

        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": getCookie('id.token'),
            "x-application-access-key": "admin1#Admin"

        },
        success: function(responseData) {
            $("#api-loader").hide();
            $('#judging-details-table').append(table);
            $('#assesmentTable').append('<tr class="overview-table-section-header"><td>Scroring Overview</td><td colspan=100%></td></tr>');
            var judgeName = "JUDGE NAME",
                judgeOrgan = "JUDGE ORGANIZATION",
                judgesubmission = "JUDGE SUBMISSION DATE",
                judgecomplete = "JUDGE COMPLETION TIME",
                judgeProgressto = "JUDGE'S PROGRESS TO DATE",
                lstModify = "LAST MODIFIED DATE",
                meritAppln = "APPLICATION OF MERIT ",
                standAppln = "STANDOUT DESIGNATION",
                judgescoreTot = "TOTAL SCORE ",
                mpText = "PATIENT KPI ",
                mcText = "CLINICIAN KPI ",
                mhText = "HEALTH SYSTEMS / ADMINISTRATION KPI ",
                mpaText = "PAYOR KPI ",
                labText = "LAB INTELLIGENCE",
                puniquetext = "UNIQUENESS",
                peaseImpnText = "EASE OF IMPLEMENTATION",
                pscaleImpnText = "SCALABILITY",
                prgImpnText = "GOVERNANCE",
                unityscoreText = "UNITY";

            $('#judge-details-table-score td:nth-child(2):eq(0)').text(responseData.response.totalMerit);
            if (responseData.response.totalStandout != undefined) {
                $('#judge-details-table-score td:nth-child(2):eq(1)').text(responseData.response.totalStandout);
            }
            if (responseData.response.averageJudgeScore != undefined) {
                $('#judge-details-table-score td:nth-child(2):eq(2)').text(responseData.response.averageJudgeScore);
            }
            if (responseData.response.selfScore != undefined) {

                $('#judge-details-table-score td:nth-child(2):eq(3)').text(responseData.response.selfScore);
            }
            if (responseData.response.applicantTimeToComplete != undefined) {
                if(responseData.response.applicantTimeToComplete == 1){
                $('#judge-details-table-score td:nth-child(2):eq(4)').text(responseData.response.applicantTimeToComplete + " " + "day");
                }
                else{
                     $('#judge-details-table-score td:nth-child(2):eq(4)').text(responseData.response.applicantTimeToComplete + " " + "days");
                }
				
              
            }

            $.each(responseData.response.assessments, function(indexDetTwo, elementDetTwo) {
                var assessmentStatusVal;
                
                assessmentStatusVal = elementDetTwo.status
                assessmentStatus.push(assessmentStatusVal);
            }); 
            setTimeout(function() { 
                getAssessmentStatus(assessmentStatus);
            }, 1000);

            $.each(responseData.response.assessments, function(indexDetTwo, elementDetTwo) {
                var judgeOrganization;
                if (elementDetTwo.judgeOrganization != undefined) {
                    judgeOrganization = elementDetTwo.judgeOrganization;
                } else {
                    judgeOrganization = "";
                }
                secondRow.push(judgeOrganization);
            });
            insertTable(secondRow, judgeOrgan);
			

            $.each(responseData.response.assessments, function(indexDetOne, elementDetOne) {
                var firstLastName;
                if (elementDetOne.firstName != undefined && elementDetOne.lastName != undefined) {
                    firstLastName = elementDetOne.firstName + elementDetOne.lastName;
                } else {
                    firstLastName = "";
                }
                firstRow.push(firstLastName);

            });
            insertTable(firstRow, judgeName);

            $.each(responseData.response.assessments, function(indexDetThree, elementDetThree) {
                var judgeSubmissionDate, SubmissionDate, tempDate;
                if (elementDetThree.judgeSubmissionDate) {
                    SubmissionDate = elementDetThree.judgeSubmissionDate;
                    tempDate = new Date(SubmissionDate);
                    judgeSubmissionDate = [tempDate.getMonth() + 1, tempDate.getDate(), tempDate.getFullYear()].join('/');
                }
                else {
                    judgeSubmissionDate = "-";

                }
                thirdRow.push(judgeSubmissionDate);
            });
            insertTable(thirdRow, judgesubmission);
			

            $.each(responseData.response.assessments, function(indexDetFour, elementDetFour) {
                var judgeCompletion;
                if (elementDetFour.judgeCompletionTime != undefined) {
					if(elementDetFour.judgeCompletionTime == 1){
                        judgeCompletion = elementDetFour.judgeCompletionTime + " " + "day";
                    }
                    else{
                        judgeCompletion = elementDetFour.judgeCompletionTime + " " + "days";
                    }
                } 
				else {
                    judgeCompletion = "";

                }
                fourRow.push(judgeCompletion);

            });
            insertTable(fourRow, judgecomplete);

            $.each(responseData.response.assessments, function(indexDetFive, elementDetFive) {
                var judgeProgress;
                if (elementDetFive.judgeProgress != undefined) {
                    judgeProgress = parseFloat(elementDetFive.judgeProgress) + "%";
                } else {
                    judgeProgress = "";

                }
                fiveRow.push(judgeProgress);

            });
            insertTable(fiveRow, judgeProgressto);

            $.each(responseData.response.assessments, function(indexDetSix, elementDetSix) {
                var judgelstmodify, modifylastDate, tempDate;
                if (elementDetSix.lastModifiedDate) {
                    modifylastDate = elementDetSix.lastModifiedDate;
                    tempDate = new Date(modifylastDate);
                    judgelstmodify = [tempDate.getMonth() + 1, tempDate.getDate(), tempDate.getFullYear()].join('/');
                }
                 else {
                    judgelstmodify = "-";
                }
                sixRow.push(judgelstmodify);
            });
            insertTable(sixRow, lstModify);
			

            $.each(responseData.response.assessments, function(indexDetSeven, elementDetSeven) {
                var judgeApplnmerit, getmeritval;
                meritDescription.push(elementDetSeven.isMeritDescription);
                if (elementDetSeven.isMerit != undefined) {
                    judgeApplnmerit = elementDetSeven.isMerit;
                    if (judgeApplnmerit == "true") {
                        getmeritval = 'YES';                       
                    } else {
                        getmeritval = "NO";                       
                    }
                }
                else {
                    getmeritval = "-";
                }
                sevenRow.push(getmeritval);
                
    
            });
            insertTable(sevenRow, meritAppln, meritDescription);




            $.each(responseData.response.assessments, function(indexDetEight, elementDetEight) {
                var judgeApplnstand, getstandval;
                standoutDescription.push(elementDetEight.isStandoutDescription);
                if (elementDetEight.isStandout != undefined) {
                    judgeApplnstand = elementDetEight.isStandout;
                    if (judgeApplnstand == "true") {
                        getstandval = 'YES';
                    } else {
                        getstandval = "NO";                        
                    }
                }
                else {
                    getstandval = "-";
                }
                eightRow.push(getstandval);
            });
            insertTable(eightRow, standAppln, standoutDescription);


            $.each(responseData.response.assessments, function(indexDetNine, elementDetNine) {
                var judgetotalScore;
                if (elementDetNine.totalScore != undefined) {
                    judgetotalScore = elementDetNine.totalScore;

                } else {
                    judgetotalScore = "";

                }
                nineRow.push(judgetotalScore);

            });
            insertTable(nineRow, judgescoreTot);

            $('#assesmentTable').append('<tr class="overview-table-section-header"><td>MEASURABLE IMPACT</td><td colspan=100%></td></tr>');
          $('#assesmentTable').append('<tr class="noMeasureofImpact"><td> PATIENT KPI 1</td></tr>');
          $('#assesmentTable').append('<tr class="noMeasureofImpact"><td>CLINICIAN KPI 1</td></tr>');
          $('#assesmentTable').append('<tr class="noMeasureofImpact"><td>HEALTH SYSTEMS / ADMINISTRATION KPI 1</td></tr>');
          $('#assesmentTable').append('<tr class="noMeasureofImpact"><td>PAYOR KPI 1</td></tr>');			

            var getLargerlength = new Array(),
                finLargerlength;

            $.each(responseData.response.assessments, function(index, element) {
                if (responseData.response.assessments[index].measurableImpact != undefined) {
                    var a = responseData.response.assessments[index].measurableImpact.length;
                    getLargerlength.push(a);
					$('.noMeasureofImpact').hide();
                }
                if(getLargerlength < 1){
                      $('.noMeasureofImpact:eq(0)').append('<td></td>');
                      $('.noMeasureofImpact:eq(1)').append('<td></td>');
                      $('.noMeasureofImpact:eq(2)').append('<td></td>');
                      $('.noMeasureofImpact:eq(3)').append('<td></td>');
                }				
            });
            finLargerlength = Math.max.apply(Math, getLargerlength);
			var i;
            for ( i = 0; i <= finLargerlength - 1; i++) {

                var pateintListkpiitem, mpRow = new Array();
                mpRow.length = 0;

                $.each(responseData.response.assessments, function(index, element) {
                    if (responseData.response.assessments[index].measurableImpact != undefined && responseData.response.assessments[index].measurableImpact[i] != undefined && responseData.response.assessments[index].measurableImpact[i].patientKpis != undefined) {
                        pateintListkpiitem = parseFloat(element.measurableImpact[i].patientKpis);
                    }
                    else {
                        pateintListkpiitem = "-";
                    }
                    mpRow.push(pateintListkpiitem);                    
                    
                });                 
                
                var mpText1 = mpText + (i + 1);
                if(mpRow[0] != "-"){
                    insertTable(mpRow, mpText1);
                } 

            }

            for ( i = 0; i <= finLargerlength - 1; i++) {

                var clinicianListkpiitem, clinicianArray = new Array();
                clinicianArray.length = 0;
            
                $.each(responseData.response.assessments, function(index, element) {
                    if (responseData.response.assessments[index].measurableImpact != undefined && responseData.response.assessments[index].measurableImpact[i] != undefined &&
                        responseData.response.assessments[index].measurableImpact[i].clinicianKpis != undefined) {
                        clinicianListkpiitem = parseFloat(element.measurableImpact[i].clinicianKpis);
            
                    } else {
                        clinicianListkpiitem = "-";
                    }
            
                    clinicianArray.push(clinicianListkpiitem);                  
                    
                }); 
                var mcText1 = mcText + (i + 1);
                  
            
                if(clinicianArray[0] != "-"){
                    insertTable(clinicianArray, mcText1);
                }
                
            
            }

            for ( i = 0; i <= finLargerlength - 1; i++) {

                var  hospitalListkpiitem, hospitalArray = new Array();
                hospitalArray.length = 0;
            
                $.each(responseData.response.assessments, function(index, element) {
                    if (responseData.response.assessments[index].measurableImpact != undefined && responseData.response.assessments[index].measurableImpact[i] != undefined &&
                        responseData.response.assessments[index].measurableImpact[i].hospitalAdminKpis != undefined) {
                        hospitalListkpiitem = parseFloat(element.measurableImpact[i].hospitalAdminKpis);
                    } else {
                        hospitalListkpiitem = "-";
                    }
            
                    hospitalArray.push(hospitalListkpiitem);                   
                    
                }); 
                
                
                var mhText1 = mhText + (i + 1);
                if(hospitalArray[0] !="-"){
                    insertTable(hospitalArray, mhText1);
                }
            
            }

            for ( i = 0; i <= finLargerlength - 1; i++) {

                var payorListkpiitem, payorArray = new Array();
                payorArray.length = 0;
            
                $.each(responseData.response.assessments, function(index, element) {
                    if (responseData.response.assessments[index].measurableImpact != undefined && responseData.response.assessments[index].measurableImpact[i] != undefined &&
                        responseData.response.assessments[index].measurableImpact[i].payorKpis != undefined) {
                        payorListkpiitem = parseFloat(element.measurableImpact[i].payorKpis);
            
                    } else {
                        payorListkpiitem = "-";
                    }
            
                    payorArray.push(payorListkpiitem);                   
                    
                }); 
                var mpaText1 = mpaText + (i + 1);
                if(payorArray[0] != "-"){               
                    insertTable(payorArray, mpaText1);
                }
            
            }
            

            $('#assesmentTable').append('<tr class="overview-table-section-header"><td>PROCESS ATTRIBUTES</td><td colspan=100%></td></tr>');


            $.each(responseData.response.assessments, function(puindexDet, puelementDet) {
                var puniqunesss;
                if (responseData.response.assessments[puindexDet].processAttributes != undefined && responseData.response.assessments[puindexDet].processAttributes.uniqueness != undefined) {
                    puniqunesss = parseFloat(responseData.response.assessments[puindexDet].processAttributes.uniqueness);
                } else {
                    puniqunesss = "";

                }

                pruniqueness.push(puniqunesss);

            });
            insertTable(pruniqueness, puniquetext);

            $.each(responseData.response.assessments, function(peindexDet, peelementDet) {
                var peaseImpn;
                if (responseData.response.assessments[peindexDet].processAttributes != undefined && responseData.response.assessments[peindexDet].processAttributes.easeOfImplementation != undefined) {
                    peaseImpn = parseFloat(responseData.response.assessments[peindexDet].processAttributes.easeOfImplementation);

                } else {
                    peaseImpn = "";
                }

                preaseImpn.push(peaseImpn);

            });
            insertTable(preaseImpn, peaseImpnText);
            $.each(responseData.response.assessments, function(pgindexDet, pgelementDet) {
                var pgImpn;
                if (responseData.response.assessments[pgindexDet].processAttributes != undefined && responseData.response.assessments[pgindexDet].processAttributes.scalability != undefined) {

                    pgImpn = parseFloat(responseData.response.assessments[pgindexDet].processAttributes.scalability);

                } else {
                    pgImpn = "";

                }

                prgImpn.push(pgImpn);

            });
            insertTable(prgImpn, pscaleImpnText);
            
            $.each(responseData.response.assessments, function(psindexDet, pselementDet) {
                var pgoverLevel;
                if (responseData.response.assessments[psindexDet].processAttributes != undefined && responseData.response.assessments[psindexDet].processAttributes.governanceLevel != undefined) {

                    pgoverLevel = parseFloat(responseData.response.assessments[psindexDet].processAttributes.governanceLevel);

                } else {
                    pgoverLevel = "";

                }

                prscaleImpn.push(pgoverLevel);

            });
            insertTable(prscaleImpn, prgImpnText);

            $.each(responseData.response.assessments, function(paindexDet, paelementDet) {
                var labIntelligence;
                if (responseData.response.assessments[paindexDet].processAttributes != undefined && responseData.response.assessments[paindexDet].processAttributes.labIntelligence != undefined) {

                   labIntelligence = parseFloat(responseData.response.assessments[paindexDet].processAttributes.labIntelligence);

                } else {
                    labIntelligence = "";

                }

                labintellgience.push(labIntelligence);

            });
            insertTable(labintellgience, labText);
            $('#assesmentTable').append('<tr class="overview-table-section-header"><td>INTEGRATION</td><td colspan=100%></td></tr>');

            $.each(responseData.response.assessments, function(usindexDet, uselementDet) {


                var unityscoreJudge;
                if (responseData.response.unityScore != undefined) {
                    unityscoreJudge =  parseFloat(responseData.response.unityScore);
                } else {
                    unityscoreJudge = "";

                }

                unityscore.push(unityscoreJudge);

            });
            insertTable(unityscore, unityscoreText);




            $('tr:nth-child(9)').addClass('yellowStarIcon');
            $(".starIcons").append("<em class='abt-icon abt-icon-star-badge'></em>");
            $('tr').find('td:eq(0)').addClass('overview-table-row-header');
            $('<h4>JUDGING DETAILS</h4>').insertBefore('#assesmentTable');

        },



        error: function(error) {

        }
    });
}
$(document).ready(function() {


    if ($('#judge-details-table-score').length > 0) {
        showAssessmentDetails();
    }

    $(document).on("click", ".assesmentJudgeDet", function(e) {
        $('.loader-parent').show();
        var getassessId = $(this).parents('tr').find('.downloadFile').attr('id');
        var getassessTitle = $(this).parents('tr').find('td:last').text();
        localStorage.setItem('adminAssessmentID', getassessId);
        localStorage.setItem('adminAssessmentTitle', getassessTitle);
        $('.loader-parent').hide();
    });

     $('<h3>' + localStorage.getItem('adminAssessmentTitle') + '<a class="downloadFile" id='+localStorage.getItem('adminAssessmentID')+'><em class="abt-icon abt-icon-download"></em>DOWNLOAD APPLICATION PACKET</a></h3>').insertBefore('#judge-details-table-score table');
    $('#judge-details-table-score').parents('.text').addClass('titleParent');
    $('#section-judging-details-table').parent('.container').addClass('tableassesContainer');
	
    $(document).on("mouseenter", ".customtooltip", function(e) {
        $(this).parents('tr').find('.toolContent').show();
    });
    $(document).on("mouseleave", ".customtooltip", function(e) {
        $(this).parents('tr').find('.toolContent').hide();
    });
});


function insertTable(fristRow, tableHeadOne, descriptionYes) {
    var table = document.getElementById("assesmentTable");
    var headerCell;

    var row = table.insertRow();
    var firstTd = $('<td></td>');
    firstTd.text(tableHeadOne);
    firstTd.appendTo(row);
    for (var i = 0; i < fristRow.length; i++) {
       
        if (fristRow[i] == "YES") {
            headerCell = $('<td class="starIcons showValue">' + fristRow[i] + '<span class="toolContentInner" style="display: none;">' + descriptionYes[i] + '</span></td>');
        } 
        else if(fristRow[i] == "NO"){
            headerCell = $('<td class="noValue showValue">' + fristRow[i] + '<span class="toolContentInner" style="display: none;">' + descriptionYes[i] + '</span></td>');
        }
        else {
            headerCell = $('<td>' + fristRow[i] + '</td>');
        }
        
        
        headerCell.appendTo(row);

    }
    $('#assesmentTable tr:nth-child(8) td:first-child').replaceWith('<td class="overview-table-row-header"><div class="averageBorder">APPLICATION OF MERIT&nbsp;<em class="abt-icon abt-icon abt-icon-information customtooltip">&nbsp;</em></div><span class="toolContent" style="display: none;">Every effort is made to disqualify applications that do not meet the minimum program criteria. However, some applications that meet minimum criteria for the award may lack merit for association with the UNIVANTS of Healthcare Excellence brand. This creates a need to differentiate applications with and without merit.</span></td>');
    $('#assesmentTable tr:nth-child(9) td:first-child').replaceWith('<td class="overview-table-row-header"><div class="averageBorder">STANDOUT DESIGNATION&nbsp;<em class="abt-icon abt-icon abt-icon-information customtooltip">&nbsp;</em></div><span class="toolContent" style="display: none;">A standout application embodies the pinnacle of a transformative care initiative; one that integrates across disciplines and greatly improves the delivery of care and patient outcomes in a measurable way.</span></td>');
    $('#assesmentTable tr:nth-child(10) td:first-child').replaceWith('<td class="overview-table-row-header"><div class="averageBorder">TOTAL SCORE&nbsp;<em class="abt-icon abt-icon abt-icon-information customtooltip">&nbsp;</em></div><span class="toolContent" style="display: none;">Total Score = [(Measurable Impact Score + (MI Score / 2)) OR (Process Attributes Score + Measurable Impact Score), whichever is less]</span></td>');
    $('#assesmentTable td').each(function(indexHyphen){
        if( $(this).text() < 1){
        $(this).text('-');
      }
   });

   $(' #assesmentTable .overview-table-section-header td:eq(1)').text('');	
}

function getAssessmentStatus(assessmentStatus){
    $('#assesmentTable tr:nth-child(6) td').each(function(indexPercent){
		var getCompletion = $(this).text();
		if(indexPercent > 0){
			if((parseFloat(getCompletion) == 100) &&  (assessmentStatus[indexPercent-1] === "SUBMITTED")){
				$('#assesmentTable tr:eq(1) td:eq('+indexPercent+')').addClass('medium-green');
			}
			else if( parseFloat(getCompletion) <= 100){
				$('#assesmentTable tr:eq(1) td:eq('+indexPercent+')').addClass('yellow');
			}
			else{
				$('#assesmentTable tr:eq(1) td:eq('+indexPercent+')').addClass('red');
			}		
        }

    });
}

$(document).on("mouseenter", "#assesmentTable .showValue", function(e) {
    $(this).find('span').show();
});
$(document).on("mouseleave", "#assesmentTable .showValue", function(e) {
    $(this).find('span').hide();
 });