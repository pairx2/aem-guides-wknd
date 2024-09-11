
var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var parentTableName, headerKeys;
var awardApplicationId = '';
var preventAPI = false; 

function toDoList() {
    $.ajax({        
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=ApplicationListForJudge',
		dataType: "json",
        type: "GET",
       	 contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken            
        },
        beforeSend: function() {
            // Show image container
			$(".loader").show();
            $('ul[name="draft-assessments-list"]').hide();
		},
        success: function(responseVal) { 

			if (responseVal.errorCode == 0) {
            	$(".loader").hide();

            for (var i = 0; i < responseVal.response.data.length; i++) {
				var judgepefixIdval = leftPad(responseVal.response.data[i].id, 10)
              if (responseVal.response.data[i].flag.length == 1){
                if (responseVal.response.data[i].flag[0] == 'START') {
                    if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == false ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="start-app"><a id="start-btn" href="" data-awardApplication-id="' + responseVal.response.data[i].id + '">Start</a></span></li>');
                    }else if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == true ){
                        $('ul[name="draft-assessments-list"]').append('<li><p><a id="judgePopIcon" class="btn"><span class="judgeNotes" id="'+responseVal.response.data[i].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="start-app"><a id="start-btn" href="" data-awardApplication-id="' + responseVal.response.data[i].id + '">Start</a></span></li>');
                    }
                 }

                else if (responseVal.response.data[i].flag[0] == 'CONTINUE'){
                     if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == false ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="continue-app"><a id="score_btn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].id + '" data-JudgeAssessment-id="' + responseVal.response.data[i].JudgeAssessment + '" >continue Scoring</a></span></li>');
                    }else if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == true ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><a id="judgePopIcon" class="btn "><span class="judgeNotes" id="'+responseVal.response.data[i].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="continue-app"><a id="score_btn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].JudgeAssessment + '">continue Scoring</a></span></li>');
                    }
                } else if (responseVal.response.data[i].flag[0] == 'INPROGRESS'){
                    if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == false ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="judgeTodoInprogress"><a id="" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].id + '">IN PROGRESS BY ANOTHER JUDGE</a></span></li>');
                    }else if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == true ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><a id="judgePopIcon" class="btn "><span class="judgeNotes" id="'+responseVal.response.data[i].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="judgeTodoInprogress"><a id="" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].id + '" >IN PROGRESS BY ANOTHER JUDGE</a></span></li>');
                    }
                }
               }
			else if(responseVal.response.data[i].flag.length == 2){
                 if ( ( (responseVal.response.data[i].flag[0] == 'INPROGRESS') && (responseVal.response.data[i].flag[1] == 'CONTINUE') ) || ( (responseVal.response.data[i].flag[1] == 'INPROGRESS') && (responseVal.response.data[i].flag[0] == 'CONTINUE') ) ) {

                    if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == false ){
                        $('ul[name="draft-assessments-list"]').append('<li class="twoFlag"><p><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="continue-app"><a id="inprogreScore_btn" data-awardApplication-id="' + responseVal.response.data[i].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].JudgeAssessment + '">continue Scoring</a></span><span class="judgeTodoInprogress">IN PROGRESS BY ANOTHER JUDGE</span></li>');
                    }else if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == true ){
                        $('ul[name="draft-assessments-list"]').append('<li class="twoFlag"><p><a id="judgePopIcon" class="btn "><span class="judgeNotes" id="'+responseVal.response.data[i].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="continue-app"><a id="inprogreScore_btn" data-awardApplication-id="' + responseVal.response.data[i].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].JudgeAssessment + '">continue Scoring</a></span><span class="judgeTodoInprogress">IN PROGRESS BY ANOTHER JUDGE</span></li>');
                    }
                }
                else if ( ( (responseVal.response.data[i].flag[0] == 'COMPLETED') && (responseVal.response.data[i].flag[1] == 'CONTINUE') ) || ( (responseVal.response.data[i].flag[1] == 'COMPLETED') && (responseVal.response.data[i].flag[0] == 'CONTINUE') ) ){
                    if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == false ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="continue-app"><a id="score_btn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].id + '" data-JudgeAssessment-id="' + responseVal.response.data[i].JudgeAssessment + '" >continue Scoring</a></span></li>');
                    }else if((responseVal.response.data[i]).hasOwnProperty('judgeNotes') == true ){
                    	$('ul[name="draft-assessments-list"]').append('<li><p><a id="judgePopIcon" class="btn "><span class="judgeNotes" id="'+responseVal.response.data[i].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a><strong>' + responseVal.response.data[i].name + '</strong></p><p>ID Number: ' + judgepefixIdval + '</p><span class="continue-app"><a id="score_btn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].JudgeAssessment + '">continue Scoring</a></span></li>');
                    }
                }
            }
            }
            }
        },
        complete: function(data) {
            // Hide image container
            $('ul[name="draft-assessments-list"]').show();
        },
        error: function(error, textStatus) {
        }
    });
}

function completedAssessmentList() {
    var userKeyVal = localStorage.getItem('userKey');
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessment&createdBy=' + userKeyVal + '&status=SUBMITTED',
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
            $('ul[name="submitted-awardApplication-list"]').hide();
		},
        success: function(responseVal) {

            if (responseVal.errorCode == 0) {
            $(".loader").hide();
            for (var i = 0; i < responseVal.response.data.length; i++) {
                if(responseVal.response.data[i].links[0].category == 'present') {
                    if((responseVal.response.data[i].links[1]).hasOwnProperty('judgeNotes') == false ){	
                    	if(responseVal.response.data[i].body.isStandout == 'NO' || responseVal.response.data[i].body.isStandout == 'true') {
                            $('ul[name="submitted-awardApplication-list"]').append('<li><p><i class="abt-icon abt-icon-star-badge"></i></p><p><strong>' + responseVal.response.data[i].links[1].name + '</strong></p><p>ID Number: ' + '000000' + responseVal.response.data[i].links[1].id + '</p><p>Score: ' + responseVal.response.data[i].totalScore + '</p><span class="continue-app"><a id="score_editBtn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].links[1].id + '"  data-JudgeAssessment-id="' +  responseVal.response.data[i].id + '">EDIT</a></span></li>');	
                        }
                        else if(responseVal.response.data[i].body.isStandout == 'YES' || responseVal.response.data[i].body.isStandout == 'false') {
                    		$('ul[name="submitted-awardApplication-list"]').append('<li><p><strong>' + responseVal.response.data[i].links[1].name + '</strong></p><p>ID Number: ' + '000000' + responseVal.response.data[i].links[1].id + '</p><p>Score: ' + responseVal.response.data[i].totalScore + '</p><span class="continue-app"><a id="score_editBtn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + '000000' + responseVal.response.data[i].links[1].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].id + '">EDIT</a></span></li>');	
                        }
                    }else if((responseVal.response.data[i].links[1]).hasOwnProperty('judgeNotes') == true ){
                        if(responseVal.response.data[i].body.isStandout == 'NO' || responseVal.response.data[i].body.isStandout == 'true') {
                        	$('ul[name="submitted-awardApplication-list"]').append('<li><p><a id="judgePopIcon" class="btn " style="float: left;margin-right: 10px;"><span class="judgeNotes" id="'+responseVal.response.data[i].links[1].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a><i class="abt-icon abt-icon-star-badge"></i></p><p><strong>' + responseVal.response.data[i].links[1].name + '</strong></p><p>ID Number: ' + '000000' + responseVal.response.data[i].links[1].id + '</p><p>Score: ' + responseVal.response.data[i].totalScore + '</p><span class="continue-app"><a id="score_editBtn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].links[1].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].id + '">EDIT</a></span></li>');	
                    	}else if(responseVal.response.data[i].body.isStandout == 'YES' || responseVal.response.data[i].body.isStandout == 'false') {
                        	$('ul[name="submitted-awardApplication-list"]').append('<li><p><a id="judgePopIcon" class="btn " style="float: left;margin-right: 10px;    float: initial;"><span class="judgeNotes" id="'+responseVal.response.data[i].links[1].judgeNotes+'"></span><em class="abt-icon abt-icon-speech-bubbles"></em></a></p><p><strong>' + responseVal.response.data[i].links[1].name + '</strong></p><p>ID Number: ' + '000000' + responseVal.response.data[i].links[1].id + '</p><p>Score: ' + responseVal.response.data[i].totalScore + '</p><span class="continue-app"><a id="score_editBtn" href="/en/secure/judge/assessment.html" data-awardApplication-id="' + responseVal.response.data[i].links[1].id + '"  data-JudgeAssessment-id="' + responseVal.response.data[i].id + '">EDIT</a></span></li>');	
                    	}
                    }
                }
                }
            }
           },
            complete: function(data) {
                // Hide image container
                $('ul[name="submitted-awardApplication-list"]').show();
            },


        error: function(error) {}

});
}


function assessmentTodo(storeStartsId, storeAssessmentsId) {
    if(!preventAPI){
        var data = {
            type: "JudgeAssessment",
            status: "DRAFT",
             id: storeAssessmentsId,
            links: [
            {
                "type": "JudgeAssessmentCycle",
                "id": judgeAssessmentId
            },
            {
    
                "type": "AwardApplication",
                "id": storeStartsId
            }
        ]
        }
        $.ajax({
            url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessment',
            type: "POST",
                dataType: 'json',
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(data),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPreferredLanguage,
                "x-id-token": jwtToken,
                "Content-Type": 'application/json'            
            },
            success: function(response) {
               if (response.errorCode == 0) {
    
    
            localStorage.setItem('storeAwardApplicationVal', storeStartsId);
            localStorage.setItem('JudgeAssessmentIdVal', response.response.id);
            localStorage.setItem('assessmentHashedContent', response.response._hashedContent);
                 window.location.href = "/en/secure/judge/assessment.html";
               }
            },
            error: function(error) {}
        });
    }
    else{
        window.location.href = "/en/secure/judge/assessment.html";
    }
}


$(document).ready(function() {
	var judgeContainer =  $('#todo-assessments').parents('#login-container').addClass('judge-container').hasClass('judge-container');
	$('.judge-container').find('#accordion-date').addClass('judgeAccordionDate').children().children('.col-lg-7').addClass('judgeFirstGrid');
    $('.judge-container').find('#accordion-date').children().children('.col-lg-5').addClass('judgeSecondGrid');
    $('#submitted-assessments, #todo-assessments').append("<div class='loader' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
$('.judge-container').parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
	if(judgeContainer == true){

    $('#todo-judge-assessment').parents('#accordion-date').addClass('addColumn');
	$("#todo-assessments").append('<ul class="a-dropdown__menu" name="submittted-assessments-list"></ul>');
    $("#todo-assessments").append('<ul class="a-dropdown__menu" name="draft-assessments-list"></ul>');
    toDoList();

    $("#submitted-assessments").append('<ul class="a-dropdown__menu" name="submitted-awardApplication-list"></ul>');
    $("#submitted-assessments").append('<ul class="a-dropdown__menu" name="complete-assessments-list"></ul>');

	completedAssessmentList();
	getJudgeAssessmentId();


    }

	$('#judge-notes-from-team').wrap(' <div class="modal generic-modal" id="judgeNotes-from-team"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#judge-notes-from-team');
	$('#judge-notes-from-team').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#judge-notes-from-team').closest('body').find('.modal-backdrop.show').hide();
    $(document).on("click", "#judgePopIcon",function(e) { 
		e.preventDefault(); 
		var judgeNote = $(this).find('.judgeNotes').attr('id');
		$('#judge-notes-from-team').find('h3').parents('.text').siblings().eq(0).addClass('judge-desc');
        $('#judge-notes-from-team').find('h3').parents('.text').siblings().eq(1).addClass('judge-indent');
		$('#judgeNotes-from-team').show();
		$('#judge-notes-from-team').closest('body').find('.modal-backdrop.show').show();
        $('.judge-indent').find('p').text(judgeNote);
	});

    $('#inprogress-judge-message').wrap(' <div class="modal generic-modal" id="inprogressJudge-message"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
	$('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#inprogress-judge-message');
	$('#inprogress-judge-message').closest('body').append('<div class="modal-backdrop show"></div>');
	$('#inprogress-judge-message').closest('body').find('.modal-backdrop.show').hide();
    $(document).on("click", ".twoFlag .continue-app #inprogreScore_btn",function(e) { 
        $(".loader-parent").hide();
        preventAPI = true;
		e.preventDefault();
		$('#inprogress-judge-message').find('h4').parents('.text').eq(0).addClass('inProgress-heading');
       	$('#inprogress-judge-message').find('h4').parents('.text').eq(1).addClass('inProgress-para');
		$('#inprogressJudge-message').show();
		$('#inprogress-judge-message').closest('body').find('.modal-backdrop.show').show();
		let storeStartId = $(this).attr('data-awardApplication-id');
        let JudgeAssessmentId = $(this).attr('data-JudgeAssessment-id');
        var judgeNote = $(this).parent().siblings('p').children('#judgePopIcon').find('.judgeNotes').attr('id');
        var appName = $(this).closest('li').find('p strong').text();
        localStorage.setItem('judgeAssessmentNotes', judgeNote);
        localStorage.setItem('storeAwardApplicationVal', storeStartId);
        localStorage.setItem('JudgeAssessmentIdVal', JudgeAssessmentId);
        localStorage.setItem('applicationName', appName);
        $(".loader-parent").hide(); 
	});

    $(document).on("click", ".twoFlag .judgeTodoInprogress a, .judgeTodoInprogress a",function(e) {
		e.preventDefault();
        $('#inprogress-judge-message').closest('body').find('.modal-backdrop.show').show();
        $('#inprogressJudge-message').show();
        var storeAwardApplicationId = $(this).attr('data-awardapplication-id');
		localStorage.setItem('storeAwardApplicationVal', storeAwardApplicationId);
        $('.inProgress-heading').parents('section').parent().addClass('inProgress-container');
        $('.inProgress-heading').next().addClass('columnControllButton');
        var judgeNote = $(this).parent().siblings('p').children('#judgePopIcon').find('.judgeNotes').attr('id');
        var appName = $(this).closest('li').find('p strong').text();
        localStorage.setItem('judgeAssessmentNotes', judgeNote);
        localStorage.setItem('applicationName', appName);
    });
    
    $('#judge-assessment-in-progress-no, #judge-notes-from-team .btn span').click(function(){
		$('#inprogress-judge-message, #judgeNotes-from-team').closest('body').find('.modal-backdrop.show').hide();
        $('#inprogressJudge-message, #judgeNotes-from-team').hide();
    });

    $('#judge-assessment-in-progress').click(function(){
		var storeStartsId =  localStorage.getItem('storeAwardApplicationVal');
		$('#inprogress-judge-message').closest('body').find('.modal-backdrop.show').hide();
        $('#inprogressJudge-message').hide();
        assessmentTodo(storeStartsId);
    });

    $(document).on("click", ".continue-app a#score_btn", function(e) {         
        $('.loader-parent').show();     
        e.preventDefault();
        window.location.href = "/en/secure/judge/assessment.html";
        let storeStartId = $(this).attr('data-awardApplication-id');
        let JudgeAssessmentId = $(this).attr('data-JudgeAssessment-id');
        var judgeNote = $(this).parent().siblings('p').children('#judgePopIcon').find('.judgeNotes').attr('id');
        var appName = $(this).closest('li').find('p strong').text();
        localStorage.setItem('judgeAssessmentNotes', judgeNote);
        localStorage.setItem('storeAwardApplicationVal', storeStartId);
        localStorage.setItem('JudgeAssessmentIdVal', JudgeAssessmentId);
        localStorage.setItem('applicationName', appName);
    });

    $(document).on("click", ".continue-app a#score_editBtn", function(e) {   
        e.preventDefault();
        $('.loader-parent').show();
        let storeStartId = $(this).attr('data-awardApplication-id');
        let JudgeAssessmentId = $(this).attr('data-JudgeAssessment-id');
        var judgeNote = $(this).parent().siblings('p').children('#judgePopIcon').find('.judgeNotes').attr('id');
        var appName = $(this).closest('li').find('p strong').text();
        localStorage.setItem('judgeAssessmentNotes', judgeNote);
        localStorage.setItem('storeAwardApplicationVal', storeStartId);
        localStorage.setItem('JudgeAssessmentIdVal', JudgeAssessmentId);
        localStorage.setItem('applicationName', appName);
        assessmentTodo(storeStartId, JudgeAssessmentId);

    });

     $(document).on("click", ".start-app a#start-btn", function(e) {
        e.preventDefault();
         $('.loader-parent').show();
        let storeStartsId = $(this).attr('data-awardApplication-id');
        var judgeNote = $(this).parent().siblings('p').children('#judgePopIcon').find('.judgeNotes').attr('id');
         var appName = $(this).closest('li').find('p strong').text();
        localStorage.setItem('judgeAssessmentNotes', judgeNote);
        localStorage.setItem('applicationName', appName);
        assessmentTodo(storeStartsId);
    });

    $(document).on('mouseenter', '.assessment-measurable-impact-left .a-tooltip .abt-icon-information', function() {
        var getTooltipValue = $(this).parent(".a-tooltilp__wrapper").attr("data-original-title");
        $(this).closest(".assessment-measurable-impact-left").find(".form-label__align").append('<div class="tooltip-added"> '+ getTooltipValue +' </div>');
    });
    $(document).on('mouseleave', '.assessment-measurable-impact-left .a-tooltip .abt-icon-information', function() {
        $(this).closest(".assessment-measurable-impact-left").find(".form-label__align .tooltip-added").remove();
    });

});

