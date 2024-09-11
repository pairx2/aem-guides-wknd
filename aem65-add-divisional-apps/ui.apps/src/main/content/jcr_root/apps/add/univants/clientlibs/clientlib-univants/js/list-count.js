var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;

/*---common api function of table----*/
function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}


function commonAjax(url, tabName) {
	$.ajax({
		url: searchUserurlOrigin + url,
		type: "GET",
		"headers": {
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPreferredLanguage,
			"x-id-token": jwtToken,
			"Content-Type": 'application/json',
			"x-application-access-key": "admin1#Admin"
		},
		beforeSend: function() {

		},
		success: function(responseData) {
            if (responseData.errorCode == 0) {
				$('.tableloader').hide();

			$('#organization-country-name').append('<p>'+ responseData.response.firstName +','+responseData.response.lastName+'</p><p>'+responseData.response.judgeOrganization+'</p>');
			var recordData = '';
			var tableId = '';
			if (tabName == 'APPLICATION CYCLES') {

				tableId = $('#applicationCycle').attr('id');
				$.each(responseData.response.data, function(key, value) {

                    var startDateTrained = value.startDate;
                    var appStartTempDate = new Date(startDateTrained);
					appStartTempDate.setMinutes(appStartTempDate.getMinutes() + appStartTempDate.getTimezoneOffset());
                    var appStartDateTrained = [appStartTempDate.getMonth() + 1, appStartTempDate.getDate(), appStartTempDate.getFullYear()].join('/');

                    var endDateTrained = value.endDate;
                    var appEndTempDate = new Date(endDateTrained);
                    appEndTempDate.setMinutes(appEndTempDate.getMinutes() + appEndTempDate.getTimezoneOffset());
                    var appEndDateTrained = [appEndTempDate.getMonth() + 1, appEndTempDate.getDate(), appEndTempDate.getFullYear()].join('/');

                    var lastModifiyDateTrained = value.modifiedDate;
                    var appLastTempDate = new Date(lastModifiyDateTrained);
                    appLastTempDate.setMinutes(appLastTempDate.getMinutes() + appLastTempDate.getTimezoneOffset());
                    var applastModifiyDateTrained = [appLastTempDate.getMonth() + 1, appLastTempDate.getDate(), appLastTempDate.getFullYear()].join('/');

                    var lastCreatedDateTrained = value.createdDate;
                    var appCreateTempDate = new Date(lastCreatedDateTrained);
                    appCreateTempDate.setMinutes(appCreateTempDate.getMinutes() + appCreateTempDate.getTimezoneOffset());
                    var applastCreatedDateTrained = [appCreateTempDate.getMonth() + 1, appCreateTempDate.getDate(), appCreateTempDate.getFullYear()].join('/');

                    var lastModifiedName = ''
					var lastModifiedDates = ''
                    if(value.modifiedBy != undefined){
						lastModifiedName = value.modifiedBy;
                        lastModifiedDates = applastModifiyDateTrained;
                    }else{
						lastModifiedName = value.createdBy;
                        lastModifiedDates = applastCreatedDateTrained;
                    }
                    recordData += '<tr>';
					recordData += '<td>' + value.name + '</td>';
					recordData += '<td>' + appStartDateTrained + '</td>';
					recordData += '<td>' + appEndDateTrained + '</td>';
					recordData += '<td><p>' + lastModifiedDates + '</p><a href="mailto:' + lastModifiedName + '">' + lastModifiedName + '</a></td>';
					recordData += '</tr>';

				});
				$('#' + tableId).find('table').append(recordData);
			} else if (tabName == 'JUDGE ASSESSMENTS') {
				tableId = $('#judge-table').attr('id');
                $('#judge-table').show();
				$.each(responseData.response.data, function(key, value) {
                    var judgeAssDateTrained = value.applicationSubmissionDate;
                    var judgeAssTempDate = new Date(judgeAssDateTrained);
                    judgeAssTempDate.setMinutes(judgeAssTempDate.getMinutes() + judgeAssTempDate.getTimezoneOffset());
                    var judgeAssTrainedDate = [judgeAssTempDate.getMonth() + 1, judgeAssTempDate.getDate(), judgeAssTempDate.getFullYear()].join('/');

                    var judgeReleaseDateTrained = value.applicationReleaseDate;
                    var judgeReleaseTempDate = new Date(judgeReleaseDateTrained);
                    judgeReleaseTempDate.setMinutes(judgeReleaseTempDate.getMinutes() + judgeReleaseTempDate.getTimezoneOffset());
                    var judgeReleaseTrained = [judgeReleaseTempDate.getMonth() + 1, judgeReleaseTempDate.getDate(), judgeReleaseTempDate.getFullYear()].join('/');
					var prefixIdval = leftPad(value.applicationId, 10)
					recordData += '<tr>';
					recordData += '<td><a class="downloadFile" href="" id="' + value.applicationId + '">' + prefixIdval + '<em class="abt-icon abt-icon-download"></em></a></td>';
					recordData += '<td>' + judgeAssTrainedDate + '</td>';
					if (value.adminNotes != "") {
						recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/>' + judgeReleaseTrained + '<a href="#" class="editAssessmentNotes editAssessmentNotesRef"><p><em style="color:#009cde"; class="abt-icon abt-icon-speech-bubbles"></em></p></a></td>';
					} else if (value.adminNotes != undefined || value.adminNotes == "") {
						recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/>' + judgeReleaseTrained + '<a href="#" class="editAssessmentNotes editAssessmentNotesRef"><p><em style="color:grey"; class="abt-icon abt-icon-speech-bubbles"></em></p></a></td>';
					}
					recordData += '<td>' + value.assessmentSubmitted + ' Judges</br/><a class="assesmentJudgeDet" href="/en/secure/administration/judge-details.html">Details</a></td>';
					recordData += '<td>' + value.merit + '</td>';
					recordData += '<td>' + value.standout + '</td>';
					recordData += '<td>' + value.avgJudgeScore + '</td>';
					recordData += '<td>' + value.selfScore + '</td>';
					recordData += '<td>' + value.applicantCountry + '</td>';
					recordData += '<td>' + value.applicationTitle + '</td>';
					recordData += '</tr>';

				});
				$('#' + tableId).find('table').append(recordData);
			} else if (tabName == 'JUDGE ASSESSMENT CYCLES') {
				tableId = $('#judgeAssessmentsCycle').attr('id');
				$.each(responseData.response.data, function(key, value) {
                    var startDateTrained = value.startDate;
                    var judgeStartTempDate = new Date(startDateTrained);
                    judgeStartTempDate.setMinutes(judgeStartTempDate.getMinutes() + judgeStartTempDate.getTimezoneOffset());
                    var judgeStartDateTrained = [judgeStartTempDate.getMonth() + 1, judgeStartTempDate.getDate(), judgeStartTempDate.getFullYear()].join('/');

                    var endDateTrained = value.endDate;
                    var judgeEndTempDate = new Date(endDateTrained);
                    judgeEndTempDate.setMinutes(judgeEndTempDate.getMinutes() + judgeEndTempDate.getTimezoneOffset());
                    var judgeEndDateTrained = [judgeEndTempDate.getMonth() + 1, judgeEndTempDate.getDate(), judgeEndTempDate.getFullYear()].join('/');

                    var lastModifiyDateTrained = value.modifiedDate;
                    var judgeLastTempDate = new Date(lastModifiyDateTrained);
                    judgeLastTempDate.setMinutes(judgeLastTempDate.getMinutes() + judgeLastTempDate.getTimezoneOffset());
                    var judgelastModifiyDateTrained = [judgeLastTempDate.getMonth() + 1, judgeLastTempDate.getDate(), judgeLastTempDate.getFullYear()].join('/');

                    var lastjudgeCreatedDateTrained = value.createdDate;
                    var judgeCreateTempDate = new Date(lastjudgeCreatedDateTrained);
                    judgeCreateTempDate.setMinutes(judgeCreateTempDate.getMinutes() + judgeCreateTempDate.getTimezoneOffset());
                    var judgelastCreatedDateTrained = [judgeCreateTempDate.getMonth() + 1, judgeCreateTempDate.getDate(), judgeCreateTempDate.getFullYear()].join('/');

                    var lastjudgeModifiedName = ''
					var lastjudgeModifiedDates = ''
                    if(value.modifiedBy != undefined){
						lastjudgeModifiedName = value.modifiedBy;
                        lastjudgeModifiedDates = judgelastModifiyDateTrained;
                    }else{
						lastjudgeModifiedName = value.createdBy;
                        lastjudgeModifiedDates = judgelastCreatedDateTrained;
                    }

					recordData += '<tr>';
					recordData += '<td>' + value.name + '</td>';
					recordData += '<td>' + value.links[0].name + '</td>';
					recordData += '<td>' + judgeStartDateTrained + '</td>';
					recordData += '<td>' + judgeEndDateTrained + '</td>';
					recordData += '<td><p>' + lastjudgeModifiedDates + '</p><a href="mailto:' + lastjudgeModifiedName + '">' + lastjudgeModifiedName + '</a></td>';
					recordData += '</tr>';

				});
				$('#' + tableId).find('table').append(recordData);
			} else if (tabName == 'APPLICATIONS') {
                 $('#application-table').show();
				tableId = $('#application-table').attr('id');
				//getdata start--making ajax call only for APPLICATIONS TAB
				let storeListValId = url.split('=')[2];
				let firstresponse='';
				$.ajax({
					url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessmentCycle&category=past,present,future&AwardApplicationCycle=' + storeListValId,
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
					success: function(responseNew) {
						
						let firstresponse = '';
						firstresponse = responseNew;
						$.each(responseData.response.data, function(key, value) {
							var appSubDateTrained = value.applicationSubmissionDate;
							var appSubTempDate = new Date(appSubDateTrained);
							appSubTempDate.setMinutes(appSubTempDate.getMinutes() + appSubTempDate.getTimezoneOffset());
							appSubDateTrained = [appSubTempDate.getMonth() + 1, appSubTempDate.getDate(), appSubTempDate.getFullYear()].join('/');
						
							var appprefixIdval = leftPad(value.applicationId, 10)
						
							var appSubMission = ''
							
							if(appSubDateTrained != "NaN/NaN/NaN"){
								appSubMission = appSubDateTrained;
							}
						
							recordData += '<tr>';
							if (value.applicationStatus == 'SUBMITTED' || value.applicationStatus == 'RELEASED' || value.applicationStatus == 'DISQUALIFIED') {
									recordData += '<td><a class="downloadFile" href="" id="' + value.applicationId + '">' + appprefixIdval + ' <em class="abt-icon abt-icon-download"></em></a></td>';
							}
							else {
								if(value.applicationReopened == 'true'){
									recordData += '<td><a class="downloadFile" href="" id="' + value.applicationId + '">' + appprefixIdval + ' <em class="abt-icon abt-icon-download"></em></a></td>';
								}else{
									recordData += '<td>' + appprefixIdval + '</td>';
								}
							}                    
						
							recordData += '<td>' + appSubMission + '</td>';
							recordData += '<td><p style="margin-bottom: 0px;">' + value.applicantName + '</p><a href="mailto:' + value.applicantEmail + '">' + value.applicantEmail + '</a></td>';
							recordData += '<td>' + value.applicantCountry + '</td>';
							recordData += '<td>' + value.selfScore + '</td>';
						
							if (value.applicationStatus == 'DRAFT') {
								recordData += '<td> <input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/> IN PROGRESS</td>';
							} else if (value.applicationStatus == 'SUBMITTED') {
								if (value.adminNotes != "") {
									if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
									}
									else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
										if(firstresponse.response.JudgeAssessmentCycle.length>0)
										{
											if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
											}
											else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
											}
										}
										else{
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
										}
										
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
									}
										
								} else if (value.adminNotes != undefined || value.adminNotes == "") {
									if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW</a></td>';
									}
									else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
										if(firstresponse.response.JudgeAssessmentCycle.length>0)
										{
											if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
												recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW</a></td>';
											}
											else {
												recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW</a></td>';
											}
										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW</a></td>';
										}
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW</a></td>';
									}
								}	
							} else if (value.applicationStatus == 'RELEASED') {
								if (value.adminNotes != "") {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="released">RELEASED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								} else if (value.adminNotes != undefined || value.adminNotes == "") {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="released">RELEASED</a></td>';
								}
							} else if (value.applicationStatus == '0') {
								recordData += '<td></td>';
							} else if (value.applicationStatus == 'REOPENED') {
								if (value.adminNotes != "") {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="reopened">RE OPEN<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								} else if (value.adminNotes != undefined || value.adminNotes == "") {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="reopened">RE OPEN</a></td>';
						
								}
							} else if (value.applicationStatus == 'INCOMPLETE') {
								recordData += '<td>INCOMPLETE</td>';
							} else if (value.applicationStatus == 'NA') {
								if (value.adminNotes != "") {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="notApplicable">NOT APPLICABLE<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								} else if (value.adminNotes != undefined || value.adminNotes == "") {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="notApplicable">NOT APPLICABLE</a></td>';
								}
							} else if (value.applicationStatus == 'DISQUALIFIED') {
								if (value.adminNotes != "") {
									if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
									}
									else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
										if (firstresponse.response.JudgeAssessmentCycle.length > 0) {
											if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
												recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
											}
											else {
												recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
											}
										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
										}
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
									}
								} else if (value.adminNotes != undefined || value.adminNotes == "") {
									if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED</a></td>';
									}
									else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
										if (firstresponse.response.JudgeAssessmentCycle.length > 0) {
											if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
												recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED</a></td>';
											}
											else {
												recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED</a></td>';
											}
										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED</a></td>';
						
										}
						
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED</a></td>';
									}
						
								}
							}
							if(value.applicationStatus == 'DRAFT') {
								recordData += '<td style="text-align: center;"><a href="#" class="tooltip-list"><em class="delet-admin-action abt-icon abt-icon-delete"></em><span class="tooltiptext"> Delete Application </span></a> </td>';
							}else {
								recordData += '<td style="text-align: center;" > - </td>';						
							}
							recordData += '</tr>';
						 });
						$('#' + tableId).find('table').append(recordData);
					},
					error: function(error) {}
				});
			
			} else if (tabName == 'Assessed Application Report') {
				tableId = $('#assessments-completed-table').attr('id');
				var appReportDateTrained;
				$.each(responseData.response.assessments, function(key, value) {
                    appReportDateTrained = value.judgeSubmissionDate;
                    var appReportTempDate = new Date(appReportDateTrained);
                    appReportTempDate.setMinutes(appReportTempDate.getMinutes() + appReportTempDate.getTimezoneOffset());
                    appReportDateTrained = [appReportTempDate.getMonth() + 1, appReportTempDate.getDate(), appReportTempDate.getFullYear()].join('/');
					var reportprefixIdval = leftPad(value.applicationId, 10);

                    var meritsVal;
                    if(value.isMerit == 'Yes') {
						meritsVal = '<em class="abt-icon abt-icon-star-badge yesMerits"></em>';
                    }else if(value.isMerit == 'No'){
						meritsVal = 'No';
                    }

                    var standoutVal;
                    if(value.isStandout == 'Yes') {
						standoutVal = '<em class="abt-icon abt-icon-star-badge yeStandout"></em>';
                    }else if(value.isStandout == 'No'){
						standoutVal = 'No';
                    }

                    var daysInReview;
                    if(parseInt(value.daysInReview) == 1) {
						daysInReview = value.daysInReview +' Day';
                    }else if(parseInt(value.daysInReview) >= 2){
						daysInReview = value.daysInReview +' Days';
                    }
					recordData += '<tr>';
					recordData += '<td><a class="downloadFile" href="" id="' + value.applicationId + '">' + reportprefixIdval + '<em class="abt-icon abt-icon-download"></em></a></td>';
					recordData += '<td>' + meritsVal + '</td>';
					recordData += '<td>' + standoutVal + '</td>';
					recordData += '<td>' + value.totalScore + '</td>';
					recordData += '<td>' + value.averageJudgeScore + '</td>';
					recordData += '<td>' + daysInReview + '</td>';
					recordData += '<td>' + appReportDateTrained + '</td>';
					recordData += '</tr>';

				});
				$('#' + tableId).find('table').append(recordData);
			}
            }
		},
		complete: function(data) {
			
		},
		error: function(error) {}
	});
	
}

/*---total count function----*/
function totalCount(url, tabName) {
	$.ajax({
		url: searchUserurlOrigin + url,
		type: "GET",
		"headers": {
			"x-application-id": xApplicationId,
			"x-country-code": xCountryCode,
			"x-preferred-language": xPreferredLanguage,
			"x-id-token": jwtToken,
			"Content-Type": 'application/json',
			"x-application-access-key": "admin1#Admin"
		},
		success: function(responseVal) {

			if (tabName == 'application cycle') {
				$('#totalNumberOfCount').text(responseVal.response.count);
			} else if (tabName == 'judge assessments cycle') {
				$('#judgeTotalNumberOfCount').text(responseVal.response.count);
			} else if (tabName == 'Assessed Application Report') {
				$('#assessedReportTotalNumberOfCount').text(responseVal.response.countOfApplications);
			}
		},
		error: function(error) {}
	});
}


/*---common dynamic table structure----*/
function commonTableFormat(parentTableName, headerKeys) {
	var table = document.createElement('table');
	var myhead = table.createTHead();
	let headerRow = document.createElement('tr');
	headerKeys.forEach(headerText => {
		let header = document.createElement('th');
		let textNode = document.createTextNode(headerText);
		header.appendChild(textNode);
		headerRow.appendChild(header);
	});
	table.appendChild(myhead);
	myhead.appendChild(headerRow);
	table.createTBody();
	parentTableName.appendChild(table);
	$(".loader-parent").hide(); 
}

/*---sort method of table----*/
function commonSorting() {
	$('.table-sortable thead th').each(function(col) {
		$(this).hover(
			function() {
				$(this).addClass('focus');

			},
			function() {
				$(this).removeClass('focus');
			}
		);

		$(this).click(function() {
			var sortOrder;
			if ($(this).is('.asc')) {
				$(this).removeClass('asc');
				$(this).addClass('desc selected');
				sortOrder = -1;
			} else {
				$(this).addClass('asc selected');
				$(this).removeClass('desc');
				sortOrder = 1;
			}

			var arrData = $('table').find('tbody >tr:has(td)').get();

			arrData.sort(function(a, b) {
				var val1 = $(a).children('td').eq(col).text().toUpperCase();
				var val2 = $(b).children('td').eq(col).text().toUpperCase();
				if ($.isNumeric(val1) && $.isNumeric(val2))
					return sortOrder == 1 ? val1 - val2 : val2 - val1;
				else
					if (val1.includes("/") && val2.includes("/")){
						var date1 = new Date(val1);
						var date2 = new Date(val2);
						return sortOrder == 1 ? date1 - date2 : date2 - date1;
					}
					else{
						return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
					}
			});
			$.each(arrData, function(index, row) {
				$('tbody').append(row);
			});
		});
	});
}


function populateNameOfApplicationCycleDropdown() {
	let activecycleFlag=false;
	$.ajax({
		url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplicationCycle&category=past,present,future',
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

			$('ul[name="name-application-cycle-dropdown"]').empty();
			
			$.each(response.response.data, function(appIndex, appVal) {
				var name;

				if (response.response.data[appIndex].category == 'present') {
					activecycleFlag = true;
					name = response.response.data[appIndex].name;

                    var presentId = response.response.data[appIndex].id ? response.response.data[appIndex].id : '';
                    var getPathName = window.location.pathname;
                    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
                    var lastElementVal = getLastItem(getPathName);
                    var getVal = lastElementVal.split('.')[0];
                
                    if (getVal == 'administration') {
                
                        var parentApp1TableName = document.querySelector('#application-table');
                        var headerApp1Keys = ['Unique ID', 'Application Submission', 'Applicant Name & Email', 'Country/Area', 'Self-Rating', 'Status', 'ADMIN ACTIONS'];
                        commonTableFormat(parentApp1TableName, headerApp1Keys);
                        $('#application-table').addClass('table-responsive').children('table').addClass('table-sortable');
                        $('.table-sortable thead th').addClass('asc');
                        /*---ajax call----*/
                        commonAjax('/api/private/eform/eforms?type=REPORT_APPLICATION&AwardApplicationCycle=' + presentId, 'APPLICATIONS');
                        totalCount('/api/private/eform/eforms?type=REPORT_APPLICATION&AwardApplicationCycle=' + presentId, 'application cycle');
                        commonSorting();
                    }



				}
				
				$('ul[name="name-application-cycle-dropdown"]').siblings('.a-dropdown__placeholder').text(name);
				var id = appVal.id;
				$('ul[name="name-application-cycle-dropdown"]').append('<li data-id=' + id + '><span>' + appVal.name + '</span></li>');
				if (name == appVal.name) {
					$('ul[name="name-application-cycle-dropdown"] li:last-child').addClass('selected');
				}

			});
			if(activecycleFlag == false)
				{
					var parentApp1TableName = document.querySelector('#application-table');
                        var headerApp1Keys = ['Unique ID', 'Application Submission', 'Applicant Name & Email', 'Country/Area', 'Self-Rating', 'Status', 'Admin Actions'];
                        commonTableFormat(parentApp1TableName, headerApp1Keys);
                        $('#application-table').addClass('table-responsive').children('table').addClass('table-sortable');
                        $('.table-sortable thead th').addClass('asc');
				}
		},
		error: function(error) {}
	});
}


/*---calling methods----*/
$(document).ready(function() {
	/* add count badge of admin */
	$('#administration-content').find('.cmp-text').children('h3').append('<span class="badgesOfCount">Total: <span id="totalNumberOfCount"></span></span>');
	$('#judge-content').find('.cmp-text').children('h3').append('<span class="badgesOfCount">Total: <span id="judgeTotalNumberOfCount"></span></span>');
	$('#assessments-completed').find('h3').append('<span class="badgesOfCount">Total: <span id="assessedReportTotalNumberOfCount"></span></span>');
	$('.badgesOfCount').parents('.text').css('margin-bottom', '0px');
	if  (document.getElementsByClassName('application-table')) {
        $('<div class="tableloader"><em class="abt-icon abt-icon-spinner"></em><p>Loading...</p></div>').insertAfter('.tab-pane.active #application-table, .tab-pane.active #judge-table');
        $('#application-table').hide();
    }else if (document.getElementById('judge-table')){
		$('<div class="tableloader"><em class="abt-icon abt-icon-spinner"></em><p>Loading...</p></div>').insertAfter('.tab-pane.active #judge-table');
        $('#judge-table').hide();
    }
    /*---list of table call----*/



	$("#app-cycle-options").find(".a-dropdown__field ul").remove();
	$("#app-cycle-options").find(".a-dropdown__field").append('<ul class="a-dropdown__menu" name="name-application-cycle-dropdown"></ul>');
	$('ul[name="name-application-cycle-dropdown"]').siblings('.a-dropdown__placeholder').text('Select');
	$('#welcome-admin-container').parents('#login-container').addClass('callListApplicationApi');
    if($("#welcome-admin-container").parents('#login-container').hasClass("callListApplicationApi")){
		populateNameOfApplicationCycleDropdown();
    }


	/*---click on tab then accordingly data populate----*/
	$('.a-tabs__nav-text').click(function() {

		$('table').remove();
		var tabName = $.trim($(this).text());
		if (tabName == 'APPLICATIONS') {
            var presentId = $('#app-cycle-options ul.a-dropdown__menu li.selected').attr('data-id');
			var parentAppTableName = document.querySelector('#application-table');
			var headerAppKeys = ['Unique ID', 'Application Submission', 'Applicant Name & Email', 'Country/Area', 'Self-Rating', 'Status', 'ADMIN ACTIONS'];
			commonTableFormat(parentAppTableName, headerAppKeys);
			$('#application-table').addClass('table-responsive').children('table').addClass('table-sortable');
			$('.table-sortable thead th').addClass('asc');
			totalCount('/api/private/eform/eforms?type=REPORT_APPLICATION&AwardApplicationCycle=' + presentId, 'application cycle');
			commonAjax('/api/private/eform/eforms?type=REPORT_APPLICATION&AwardApplicationCycle=' + presentId, 'APPLICATIONS');
			commonSorting();
		} else if (tabName == "JUDGE ASSESSMENTS") {
            var presentJudgeId = $('#app-cycle-options ul.a-dropdown__menu li.selected').attr('data-id');
			var parentJudgeTableName = document.querySelector('#judge-table');
			var headerJudgeKeys = ['Unique ID', 'Application Submission', 'Application Release', 'Assessments Submitted', 'Judge Enjoyment', 'Judge Standout', 'Avg. Judge Score', 'Self-Rating', 'Country/Area', 'Application Title'];
			commonTableFormat(parentJudgeTableName, headerJudgeKeys);
			$('#judge-table').addClass('table-responsive').children('table').addClass('table-sortable');
			$('.table-sortable thead th').addClass('asc');
			totalCount('/api/private/eform/eforms?type=REPORT_ASSESSMENT&AwardApplicationCycle=' + presentJudgeId, 'judge assessments cycle');
			commonAjax('/api/private/eform/eforms?type=REPORT_ASSESSMENT&AwardApplicationCycle=' + presentJudgeId, 'JUDGE ASSESSMENTS');
			commonSorting();
		} else if (tabName == 'APPLICATION CYCLES') {
			var parentAppCycleTableName = document.querySelector('#applicationCycle');
			var headerAppCycleKeys = ['Application Cycle', 'Start Date', 'End Date', 'Last Modified'];
			commonTableFormat(parentAppCycleTableName, headerAppCycleKeys);
			$('#applicationCycle').addClass('table-responsive').children('table').addClass('table-sortable');
			$('.table-sortable thead th').addClass('asc');
			commonAjax('/api/private/eform/eforms?type=AwardApplicationCycle', 'APPLICATION CYCLES');
			commonSorting();
		} else if (tabName == 'JUDGE ASSESSMENT CYCLES') {
			var parentJudgeCycleTableName = document.querySelector('#judgeAssessmentsCycle');
			var headerJudgeCycleKeys = ['Judge Assessment Cycle', 'Application Cycle', 'Start Date', 'End Date', 'Last Modified'];
			commonTableFormat(parentJudgeCycleTableName, headerJudgeCycleKeys);
			$('#judgeAssessmentsCycle').addClass('table-responsive').children('table').addClass('table-sortable');
			$('.table-sortable thead th').addClass('asc');
			commonAjax('/api/private/eform/eforms?type=JudgeAssessmentCycle&category=past,present,future', 'JUDGE ASSESSMENT CYCLES');
			commonSorting();
		}
	});

	// delete - pop-up
	
	$('#delete-admin-popup').wrap(' <div class="modal generic-modal" id="delete-table-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#delete-admin-popup');
	$('#delete-admin-popup').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#delete-admin-popup').closest('body').find('.modal-backdrop.show').hide();

	$(document).on("click", ".delet-admin-action",function(e) { 
		e.preventDefault(); 

		$("#application-table").find('tbody').find("tr").removeAttr("data-delete-row")
		$('#delete-table-popup').show();
		$('#delete-admin-popup').closest('body').find('.modal-backdrop.show').show();
		$(this).closest("tr").attr("data-delete-row", "selected");		
	});


	$(document).on("click", "#delete-popup-btn",function(e) { 
		e.preventDefault(); 
		var dataAppId = $("#application-table").find('tbody').find('[data-delete-row="selected"]').find('input[name="applicantID"]').val();
		var dataHashContext = $("#application-table").find('tbody').find('[data-delete-row="selected"]').find('input[name="applicantHash"]').val();
		var dataObj = {
			"type":"AwardApplication",
			"id":dataAppId,
			"_hashedContent": dataHashContext,
			"action":"DELETE"
		}
		
		$.ajax({
              url: searchUserurlOrigin + '/api/private/eform/eforms',
              type : "POST",
               dataType: 'json',
               contentType: "application/json;charset=UTF-8", 
               data: JSON.stringify(dataObj),
               "headers": {
                   "x-application-id": xApplicationId,
					"x-country-code": xCountryCode,
					"x-preferred-language": xPreferredLanguage,
					"x-id-token": jwtToken,
					"x-application-access-key": "admin1#Admin"
                },            
              success: function(response) {
					$('#delete-table-popup').hide();
					$('#delete-admin-popup').closest('body').find('.modal-backdrop.show').hide();
					window.location.reload(true);
              },
               error: function(error) {
					$('#delete-table-popup').hide();
					$('#delete-admin-popup').closest('body').find('.modal-backdrop.show').hide();
            }
           });


	});

	var reportAdminNotes, reportJudgeNotes;

	function getReportApplicationID(applicantID) {

		$.ajax({
			url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplication&id=' + applicantID,
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
				if (response.errorCode == 0) {
					reportAdminNotes = response.response.data[0].adminNotes;
					reportJudgeNotes = response.response.data[0].judgeNotes;
					$('#admin-action-popup textarea[name="notesforadminreference"]').val(reportAdminNotes);
					$('#admin-action-popup textarea[name="notesforjudgereference"]').val(reportJudgeNotes);
					$('#assessment-notes-reference textarea[name="notesforadminreference"]').val(reportAdminNotes);
					if (reportJudgeNotes == undefined || reportJudgeNotes == "") {
						$('#assessment-notes-reference textarea[name="notesforjudgereference"]').parents('.fields').hide();
                        $('#assessment-notes-reference textarea[name="notesforjudgereference"]').parents('.fields').next('.title').hide();
					} else if (reportJudgeNotes != "") {
						$('#assessment-notes-reference textarea[name="notesforjudgereference"]').parents('.fields').show();
                        $('#assessment-notes-reference textarea[name="notesforjudgereference"]').parents('.fields').next('.title').show();
						$('#assessment-notes-reference textarea[name="notesforjudgereference"]').val(reportJudgeNotes);
					}
				}
			},
			error: function(error) {}
		});
	}

	$('ul[name="applicationstatus"] li').click(function() {
		var releasedSelect = $(this).attr('data-optionvalue');
		if (releasedSelect == 'RELEASED') {
			$('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').show();
            $('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').next('.title').show();
		} else {
			$('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').hide();
            $('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').next('.title').hide();
		}
	});

	$("#continue-editing").addClass("editAssessmentNotesRef");
	$(document).on("click", "#continue-editing", function(e) {
		e.preventDefault();
		var applicantID = $(this).closest('#notes-reference').find('input[name="applicantidvaluenotes"]').val();
		getReportApplicationID(applicantID);
		$('#notes-reference-success-popup').hide();
	});

	$(document).on("click", ".downloadFile", function(e) {
		$(".downloadFile").parents('body').prepend("<div class='loader-parent' style='display: block;'><em class='abt-icon abt-icon-spinner'></em></div>");
		e.preventDefault();
		let previousAppId = $(this).attr('id');
		commonDownload(previousAppId);
	});

	$(document).on("click", "#downloadPacket", function(e) {
		e.preventDefault();
        var adminAssessmentIDVal = localStorage.getItem('adminAssessmentID');
		commonDownload(adminAssessmentIDVal);
	});


	/* Notes reference popup */
	$('#notes-reference .o-form-container__wrapper').wrap(' <div class="modal generic-modal" id="assessment-notes-reference"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#notes-reference .o-form-container__wrapper');
	$('#assessment-notes-reference').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#assessment-notes-reference').closest('body').find('.modal-backdrop.show').hide();

	/*Continue editing notes popup */
	$('#notes-reference-success').wrap(' <div class="modal generic-modal" id="notes-reference-success-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#notes-reference-success');
	$('#notes-reference-success-popup').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#notes-reference-success-popup').closest('body').find('.modal-backdrop.show').hide();

	$(document).on("click", ".editAssessmentNotesRef", function(e) {
		e.preventDefault();
		var applicantID;
		if($(this).attr('id') !== 'continue-editing') {
			applicantID = $(this).closest('tr').find('input[name="applicantID"]').val();
			getReportApplicationID(applicantID);			
		}
		else {
			applicantID = $(this).closest('#notes-reference').find('input[name="applicantidvaluenotes"]').val();
		}

		var applicanthash = $(this).closest('tr').find('input[name="applicantHash"]').val();
		$('#assessment-notes-reference input[name="applicantidvaluenotes"]').val(applicantID);
		$('#assessment-notes-reference input[name="applicanthashvaluenotes"]').val(applicanthash);
		$('#assessment-notes-reference textarea[name="notesforadminreference"]').val('');
		$('#assessment-notes-reference textarea[name="notesforjudgereference"]').val('');
		$('#assessment-notes-reference textarea[name="notesforjudgereference"]').show();
		$('#assessment-notes-reference textarea[name="notesforjudgereference"]').attr('readonly', true);
		$('#assessment-notes-reference').closest('body').find('.modal-backdrop.show').show();
		$('#assessment-notes-reference').show();
	});

	/* Admin actions popup */
	$('#admin-action .o-form-container__wrapper').wrap(' <div class="modal generic-modal" id="admin-action-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#admin-action .o-form-container__wrapper');
	$('#admin-action-popup').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#admin-action-popup').closest('body').find('.modal-backdrop.show').hide();
	$(document).on("click", ".notApplicable, .disqualify, .released, .reopened, .submitted", function(e) {
		e.preventDefault();
		var selectedtablestatus = $(this).text();
		var selectedstatus = $('#admin-action-popup ul[name="applicationstatus"] li');
		var releasedSelect = $(this).attr('data-optionvalue');
		if (releasedSelect == 'RELEASED') {
			$('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').show();
            $('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').next('.title').show();
		} else {
			$('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').hide();
            $('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').next('.title').hide();
		}
		var applicantID = $(this).closest('tr').find('input[name="applicantID"]').val();
		var applicanthash = $(this).closest('tr').find('input[name="applicantHash"]').val();
		getReportApplicationID(applicantID);
		var newselectVal;
		if (selectedtablestatus == 'RELEASED') {
			$('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').show();
            $('#admin-action-popup textarea[name="notesforjudgereference"]').parents('.fields').next('.title').show();
			$('#admin-action-popup ul[name="applicationstatus"] li:eq(4)').addClass('selected');
			newselectVal = $('#admin-action-popup ul[name="applicationstatus"] li:eq(4)').text();
		} else if (selectedtablestatus == 'DISQUALIFIED') {
			$('#admin-action-popup ul[name="applicationstatus"] li:eq(1)').addClass('selected');
		    newselectVal = $('#admin-action-popup ul[name="applicationstatus"] li:eq(1)').text();
		} else if (selectedtablestatus == 'NOT APPLICABLE') {
			$('#admin-action-popup ul[name="applicationstatus"] li:eq(2)').addClass('selected');
			newselectVal = $('#admin-action-popup ul[name="applicationstatus"] li:eq(2)').text();
		} else {
			$('#admin-action-popup ul[name="applicationstatus"] li:eq(0)').addClass('selected');
			newselectVal = $('#admin-action-popup ul[name="applicationstatus"] li:eq(0)').text();
		}
		selectedstatus.closest('.a-dropdown__field ').find('span:eq(0)').removeClass('.a-dropdown__placeholder');
		selectedstatus.closest('.a-dropdown__field').find('span:eq(0)').addClass('a-dropdown-selected');
		selectedstatus.closest('.a-dropdown__field ').find('span:eq(0)').text(newselectVal);
		selectedstatus.attr('aria-selected', true);
		$('#admin-action-popup input[name="applicantidvalue"]').val(applicantID);
		$('#admin-action-popup input[name="applicanthashvalue"]').val(applicanthash);
		$('#admin-action-popup textarea[name="notesforadminreference"]').val('');
		$('#admin-action-popup textarea[name="notesforjudgereference"]').val('');
		$('#admin-action-popup').closest('body').find('.modal-backdrop.show').show();
		$('#admin-action-popup').show();
	});

	$(document).on("click", 'ul[name="name-application-cycle-dropdown"] li', function(e) {
		e.preventDefault();
		var storeListVal = $(this).text();
		var storeListValId = $(this).attr('data-id');
		var storeListWithoutVal = $.trim($(this).text());
		$(this).parents('ul[name="name-application-cycle-dropdown"]').siblings('.a-dropdown__placeholder').text(storeListVal);
		$('ul[name="name-application-cycle-dropdown"] li').removeClass('active');

		if ($('#application-table').parents('.a-tabs__content').siblings('nav').children('a[aria-label="APPLICATIONS"]').hasClass('show active') == true) {
			let firstresponse = '';
			getdata(storeListValId, function (resp) {
				firstresponse = resp;

				$.ajax({
					url: searchUserurlOrigin + '/api/private/eform/eforms?type=REPORT_APPLICATION&AwardApplicationCycle=' + storeListValId,
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
					success: function(responseData) {
	
						$('#totalNumberOfCount').text(responseData.response.count);
						var recordData = '';
						var tableId = '';
						$('#application-table table tbody').empty();
						tableId = $('#application-table').attr('id');
						$.each(responseData.response.data, function(key, value) {
						var appSubDateTrained = value.applicationSubmissionDate;
						var appSubTempDate = new Date(appSubDateTrained);
						appSubTempDate.setMinutes(appSubTempDate.getMinutes() + appSubTempDate.getTimezoneOffset());
						appSubDateTrained = [appSubTempDate.getMonth() + 1, appSubTempDate.getDate(), appSubTempDate.getFullYear()].join('/');
	
						var appprefixIdval = leftPad(value.applicationId, 10)
	
						var appSubMission = ''
						
						if(appSubDateTrained != "NaN/NaN/NaN"){
							appSubMission = appSubDateTrained;
						}
	
						recordData += '<tr>';
						if (value.applicationStatus == 'SUBMITTED' || value.applicationStatus == 'RELEASED' || value.applicationStatus == 'DISQUALIFIED') {
								recordData += '<td><a class="downloadFile" href="" id="' + value.applicationId + '">' + appprefixIdval + ' <em class="abt-icon abt-icon-download"></em></a></td>';
	
						}else {
							recordData += '<td>' + appprefixIdval + '</td>';
	
						}                    
	
					
						recordData += '<td>' + appSubMission + '</td>';
						recordData += '<td><p style="margin-bottom: 0px;">' + value.applicantName + '</p><a href="mailto:' + value.applicantEmail + '">' + value.applicantEmail + '</a></td>';
						recordData += '<td>' + value.applicantCountry + '</td>';
						recordData += '<td>' + value.selfScore + '</td>';
	
						if (value.applicationStatus == 'DRAFT') {
							recordData += '<td> <input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/> IN PROGRESS</td>';
						} else if (value.applicationStatus == 'SUBMITTED') {
							if (value.adminNotes != "") {
								if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								}
								else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
									if (firstresponse.response.JudgeAssessmentCycle.length > 0) {
										if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';

										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
										}
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';

									}

								}
								else {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								}

							} else if (value.adminNotes != undefined || value.adminNotes == "") {
								if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW</a></td>';
								}
								else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
									if (firstresponse.response.JudgeAssessmentCycle.length > 0) {
										if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW</a></td>';
										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW</a></td>';
										}
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">READY FOR REVIEW</a></td>';

									}

								}
								else {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="submitted">READY FOR REVIEW</a></td>';
								}

							}
						} else if (value.applicationStatus == 'RELEASED') {
							if (value.adminNotes != "") {
								recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="released">RELEASED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
							} else if (value.adminNotes != undefined || value.adminNotes == "") {
								recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="released">RELEASED</a></td>';
							}
						} else if (value.applicationStatus == '0') {
							recordData += '<td></td>';
						} else if (value.applicationStatus == 'REOPENED') {
							if (value.adminNotes != "") {
								recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="reopened">RE OPEN<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
							} else if (value.adminNotes != undefined || value.adminNotes == "") {
								recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="reopened">RE OPEN</a></td>';
	
							}
						} else if (value.applicationStatus == 'INCOMPLETE') {
							recordData += '<td>INCOMPLETE</td>';
						} else if (value.applicationStatus == 'NA') {
							if (value.adminNotes != "") {
								recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="notApplicable">NOT APPLICABLE<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
							} else if (value.adminNotes != undefined || value.adminNotes == "") {
								recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="notApplicable">NOT APPLICABLE</a></td>';
							}
						} else if (value.applicationStatus == 'DISQUALIFIED') {
							if (value.adminNotes != "") {
								if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								}
								else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
									if (firstresponse.response.JudgeAssessmentCycle.length > 0) {
										if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
										}
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
									}
								}
								else {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED<span class="noteIcon"><em class="abt-icon abt-icon-speech-bubbles"></em></span></a></td>';
								}
							} else if (value.adminNotes != undefined || value.adminNotes == "") {
								if (firstresponse.response.AwardApplicationCycle[0].category == 'past') {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED</a></td>';
								}
								else if ((firstresponse.response.AwardApplicationCycle[0].category == 'previous')) {
									if (firstresponse.response.JudgeAssessmentCycle.length > 0) {
										if ((firstresponse.response.JudgeAssessmentCycle[0].category == 'previous') || (firstresponse.response.JudgeAssessmentCycle[0].category == 'past')) {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED</a></td>';
										}
										else {
											recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED</a></td>';
										}
									}
									else {
										recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="javascript:void(0)" class="greyed-out">DISQUALIFIED</a></td>';

									}

								}
								else {
									recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/><a href="#" class="disqualify">DISQUALIFIED</a></td>';
								}

							}
						}
						if(value.applicationStatus == 'DRAFT') {
							recordData += '<td style="text-align: center;" ><a href="#" class="tooltip-list"><em class="delet-admin-action abt-icon abt-icon-delete"></em><span class="tooltiptext"> Delete Application </span></a> </td>';
						}else {
							recordData += '<td style="text-align: center;" > - </td>';						
						}
						recordData += '</tr>';
					});
						$('#' + tableId).find('table').append(recordData);
						//showing Table for past
						$('#application-table').show();
						$('.tableloader').hide();
					},
					error: function(error) {}
				});
			})
			

		} else if ($('#judge-table').parents('.a-tabs__content').siblings('nav').children('a[aria-label="JUDGE ASSESSMENTS"]').hasClass('show active') == true) {
			$.ajax({
				url: searchUserurlOrigin + '/api/private/eform/eforms?type=REPORT_ASSESSMENT&AwardApplicationCycle=' + storeListValId,
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
				success: function(responseData) {

					$('#judgeTotalNumberOfCount').text(responseData.response.count);
					var recordData = '';
					var tableId = '';
					$('#judge-table table tbody').empty();

					tableId = $('#judge-table').attr('id');
					$.each(responseData.response.data, function(key, value) {
                    var judgeAssDateTrained = value.applicationSubmissionDate;
                    var judgeAssTempDate = new Date(judgeAssDateTrained);
                    judgeAssTempDate.setMinutes(judgeAssTempDate.getMinutes() + judgeAssTempDate.getTimezoneOffset());
                    var judgeAssTrainedDate = [judgeAssTempDate.getMonth() + 1, judgeAssTempDate.getDate(), judgeAssTempDate.getFullYear()].join('/');

                    var judgeReleaseDateTrained = value.applicationReleaseDate;
                    var judgeReleaseTempDate = new Date(judgeReleaseDateTrained);
                    judgeReleaseTempDate.setMinutes(judgeReleaseTempDate.getMinutes() + judgeReleaseTempDate.getTimezoneOffset());
                    var judgeReleaseTrained = [judgeReleaseTempDate.getMonth() + 1, judgeReleaseTempDate.getDate(), judgeReleaseTempDate.getFullYear()].join('/');
					var prefixIdval = leftPad(value.applicationId, 10)
					recordData += '<tr>';
					recordData += '<td><a class="downloadFile" href="" id="' + value.applicationId + '">' + prefixIdval + '<em class="abt-icon abt-icon-download"></em></a></td>';
					recordData += '<td>' + judgeAssTrainedDate + '</td>';
					if (value.adminNotes != "") {
						recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/>' + judgeReleaseTrained + '<a href="#" class="editAssessmentNotes editAssessmentNotesRef"><p><em style="color:#009cde"; class="abt-icon abt-icon-speech-bubbles"></em></p></a></td>';
					} else if (value.adminNotes != undefined || value.adminNotes == "") {
						recordData += '<td><input type="hidden" value=' + value.applicationId + ' name="applicantID"/><input type="hidden" value=' + value._hashedContent + ' name="applicantHash"/>' + judgeReleaseTrained + '<a href="#" class="editAssessmentNotes editAssessmentNotesRef"><p><em style="color:grey"; class="abt-icon abt-icon-speech-bubbles"></em></p></a></td>';
					}
					recordData += '<td>' + value.assessmentSubmitted + ' Judges</br/><a class="assesmentJudgeDet" href="/en/secure/administration/judge-details.html">Details</a></td>';
					recordData += '<td>' + value.merit + '</td>';
					recordData += '<td>' + value.standout + '</td>';
					recordData += '<td>' + value.avgJudgeScore + '</td>';
					recordData += '<td>' + value.selfScore + '</td>';
					recordData += '<td>' + value.applicantCountry + '</td>';
					recordData += '<td>' + value.applicationTitle + '</td>';
					recordData += '</tr>';

				});
					$('#' + tableId).find('table').append(recordData);
				},
				error: function(error) {}
			});
		}

	});

	$(document).on('click', '#report_type-options ul li', function() {
			var liValue = $(this).attr('data-optionvalue');
			if(liValue === 'Assessment' || liValue === 'AssessmentDetails') {
        		assessmentFilter();
			}
			else{
				$('#cycle-options .a-dropdown__field .a-dropdown__menu li').show();
				$('#cycle-options .a-dropdown__field .a-dropdown__menu li.assessment-list-name').hide();
			}
	});

	function assessmentFilter() {
		$.ajax({
			url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessmentCycle&category=past,present,future',
			type: "GET",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			"headers": {
				"x-application-id": xApplicationId,
				"x-country-code": xCountryCode,
				"x-preferred-language": xPreferredLanguage,
				"x-id-token": getCookie('id.token'),
				"x-application-access-key": "admin1#Admin"
			},
			success: function(responseData) {
				if (responseData.errorCode == 0) {	
				$('#cycle-options .a-dropdown__field .a-dropdown__menu li').hide();
				$.each(responseData.response.data, function(key, value) {						
					var assessmentName = value.name;
					$('#cycle-options .a-dropdown__field .a-dropdown__menu').append('<li class="assessment-list-name"><span>' + assessmentName + '</span></li>');				

				});
				}
			},
			error: function(error) {}
		});
	}

	function getdata(storeListValId, callback) {
		$.ajax({
			url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessmentCycle&category=past,present,future&AwardApplicationCycle=' + storeListValId,
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
			success: callback,
			error: function (request, status, error) {
				console.log(status);
			}
		});
	}
});