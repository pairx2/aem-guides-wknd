var searchUserurl = new URL($('#session-api-url').val());
var searchUserurlOrigin = searchUserurl.origin;
var parentTableName, headerKeys;

function populateAwardCycle() {
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplicationCycle&category=present,past',
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-application-access-key": "admin1#Admin",
            "x-id-token": jwtToken
        },
        success: function(response) {
            $('ul[name="application-award-cycle"]').empty();
            $.each(response.response.data, function(awardcycleIndex, awardcyleIndexVal) {
                var currentCycleName;
                if (response.response.data[awardcycleIndex].category == 'present') {
                    currentCycleName = response.response.data[awardcycleIndex].name;
                    $('ul[name="application-award-cycle"]').siblings('.a-dropdown__placeholder').text(currentCycleName);
                    $('ul[name="application-award-cycle"]').siblings('.a-dropdown__placeholder').addClass('a-dropdown-selected');
                    $('ul[name="application-award-cycle"]').append('<li data-id=' + awardcyleIndexVal.id + ' class="present-cycle"><span>' + awardcyleIndexVal.name + '</span></li>');
                    $('.present-cycle').addClass('active selected');
                    
                }
                else{
                $('ul[name="application-award-cycle"]').append('<li data-id=' + awardcyleIndexVal.id + '><span>' + awardcyleIndexVal.name + '</span></li>'); 
                }             
               
            });
        },
        error: function(error) {}
    });
}

function populateAwardStatus(applicationCycleId) {
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
            "x-id-token": getCookie('id.token'),
            "x-application-access-key": "admin1#Admin"
        },
        success: function(response) {
            $(".loader-parent").hide();
            $.each(response.response.data, function(applicationIndex, applicationIndexVal) {
				var showStatus;
                if (response.response.data[applicationIndex].hasOwnProperty('links')) {
                    var linksId = response.response.data[applicationIndex].links[0].id;
                    if (applicationCycleId == linksId) {
                        var applicationStatus = applicationIndexVal.status;
                        var applicationID = applicationIndexVal.id;
                        if (applicationStatus == 'DRAFT') {
                            showStatus = 'In Progress';
                            $(" .formcontainer #application-cycle-popup").find("#applicationStatus-options").append("<div class='a-radio a-radio--vertical a-radio--default'><label class='a-radio__label' for='application" + applicationID + "'><span class='a-radio__text'><span class='appName'>" + applicationIndexVal.name + "</span>Status: " + showStatus + "</span><input type='radio' class='a-radio__input' name='applicationStatus' value='" + applicationID + "' id='application" + applicationID + "' data-required='true' required='required'><span class='a-radio__custom'></span></label></div>");
                        } else if (applicationStatus == 'INCOMPLETE') {
                            showStatus = 'Incomplete';
                            $(" .formcontainer #application-cycle-popup").find("#applicationStatus-options").append("<div class='a-radio a-radio--vertical a-radio--default'><label class='a-radio__label' for='application" + applicationID + "'><span class='a-radio__text'><span class='appName'>" + applicationIndexVal.name + "</span>Status: " + showStatus + "</span><input type='radio' class='a-radio__input' name='applicationStatus' value='" + applicationID + "' id='application" + applicationID + "' data-required='true' required='required'><span class='a-radio__custom'></span></label></div>");
                        } else if ((applicationStatus == 'SUBMITTED') || (applicationStatus == 'RELEASED') || (applicationStatus == 'DISQUALIFIED') || (applicationStatus == 'NA')) {
                            showStatus = 'Submitted';
                            $(" .formcontainer #application-cycle-popup").find("#applicationStatus-options").append("<div class='a-radio a-radio--vertical a-radio--default'><label class='a-radio__label' for='application" + applicationID + "'><span class='a-radio__text'><span class='appName'><a id='downLoad'>" + applicationIndexVal.name + "</a></span>Status: " + showStatus + "</span><input type='radio' class='a-radio__input' name='applicationStatus' value='" + applicationID + "' id='application" + applicationID + "' data-required='true' required='required'><span class='a-radio__custom'></span></label></div>");
                        }						

                    }
                }
            });
            $(" .formcontainer #application-cycle-popup").find("#applicationStatus-options").append("<span class='radio--text-require'><em class='abt-icon abt-icon-exclamation'></em>Please select an application to copy.</span>");
			customRadio("applicationStatus");

        },
        error: function(error) {}
    });
}

$(window).on('load', function(e) {
    $("#application-cycle-popup").parent().closest(".modal-dialog-centered").addClass("getHeadPopup");
    $(".getHeadPopup").each(function(index) {
        $(this).parent().addClass("applicationModal" + index);
    });
});

$(document).ready(function() {
    $("#application-cycle-popup").css("display", "none");
    $("#application-cycle-popup").addClass("award-cycle-popup");
    $("#award-cycle-options").addClass("award-cycle-dropdown");
    $("#application-cycle-popup").find("#applicationStatus-options").find(".a-radio--vertical").remove();
    $("#application-cycle-popup").find("#applicationStatus-options").find(".radio--text-require").remove();
    $("#application-cycle-popup").find("#award-cycle-options").find(".a-dropdown__field ul").remove();
    $("#application-cycle-popup").find("#award-cycle-options").find(".a-dropdown__field").append('<ul class="a-dropdown__menu" name="application-award-cycle"></ul>');
    $('ul[name="application-award-cycle"]').siblings('.a-dropdown__placeholder').text('Select');
    populateAwardCycle();

    $(document).on('click', '#application-cycle-popup #award-cycle-options .a-dropdown__field .a-dropdown__menu li', function(e) {
        $('ul[name="application-award-cycle"] li').removeClass('selected');
        $(this).addClass('selected');
        $(this).attr('aria-selected', true);
        var selectedawardText = $(this).find('span').text();
        $(this).closest('.a-dropdown__field').find('.a-dropdown__placeholder').addClass('a-dropdown-selected').removeClass('a-dropdown__placeholder');
        $(this).closest('.a-dropdown__field').find('.a-dropdown-selected').text(selectedawardText);
        var applicationCycleId;
        applicationCycleId = $(this).attr("data-id");
        $("#application-cycle-popup").find("#applicationStatus-options").find(".a-radio--vertical").remove();
        $("#application-cycle-popup").find("#applicationStatus-options").find(".radio--text-require").remove();
        populateAwardStatus(applicationCycleId);
    });

    $(document).on('click', '#start-new-application', function (e) {
        createNewApplication();
    });

    function createNewApplication() {
        var data = {
            type: "AwardApplication",
            status: "DRAFT",
            name: "",

            links: [{
                type: "AwardApplicationCycle",
                id: presentApplicationId
            }]
        }
        $.ajax({
            url: searchUserurlOrigin + '/api/private/eform/eforms',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPreferredLanguage,
                "x-id-token": jwtToken,
                "x-application-access-key": "user1#Applicant"
            },
            beforeSend: function() {
                // Show image container
                $(".loader-parent").show();
            },
            success: function(response) {
                if (response.errorCode == 0) {
                    localStorage.setItem('storeContinueAppVal', response.response.id);
                    localStorage.setItem('applicationHashContent', response.response._hashedContent);
                    window.location.href = "/en/secure/applicant/application.html";
                }
            },
            error: function(error) {}
        });
    }

    $(document).on("click", "#start-new-application-radio", function() {        
        var applicationCycleId = $('#application-cycle-popup #award-cycle-options .a-dropdown__field .a-dropdown__menu li.active').attr("data-id");customRadio("start-application-select");
		 customRadio("start-application-select");
        if ($('input[name="start-application-select"]:checked').length > 0) {
            $('#start-application-select-options .radio--text-require').css('display', 'none');
            if (document.querySelector('input[name="start-application-select"]:checked').value == "startNew") {
                createNewApplication();
            } else if (document.querySelector('input[name="start-application-select"]:checked').value == "startCopy") {
				populateAwardStatus(applicationCycleId);
                $('#application-cycle-popup1').closest('body').find('.modal-backdrop.show').show();
                $('#application-cycle-popup1').show();
                $('#application-cycle-popup').addClass('show-pop');
            }
        } else {

            $("#start-application-select-options .radio--text-require").css("display", "block");
        }

    });
	
	
    $('#get-a-headstart-thankyou').wrap(' <div class="modal generic-modal" id="get-a-headstart-thankyou-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
    $('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#get-a-headstart-thankyou');


    $('#application-cycle-popup').wrap('<div class="modal generic-modal" id="application-cycle-popup1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
    $('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#application-cycle-popup');
    $('#application-cycle-popup').closest('body').append('<div class="modal-backdrop show"></div>');
    $('#application-cycle-popup').closest('body').find('.modal-backdrop.show').hide();

    $('#start-from-copy-thankyou').wrap(' <div class="modal generic-modal" id="start-from-copy-thankyou-popup"><div class="modal-dialog modal-dialog-centered"><div class="modal-content generic-modal__content"><div class="modal-body generic-modal__content-body"></div></div></div></div>');
    $('<div class="modal-header generic-modal__header"><span class="generic-modal--close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="abt-icon abt-icon-cancel"></i></span></div>').insertBefore('#start-from-copy-thankyou');
    $("#application-cycle-popup").find("#applicationStatus-options").addClass("customRadio");
    $(document).on('click', '#get-a-headstart-btn', function(e) {
        $('#application-cycle-popup1').show();
        $('#application-cycle-popup').addClass('show-pop');
        $('#application-cycle-popup1').closest('body').find('.modal-backdrop.show').show();
        $("#application-cycle-popup").find("#applicationStatus-options").find(".a-radio--vertical").remove();
        $("#application-cycle-popup").find("#applicationStatus-options").find(".radio--text-require").remove();
        $("#application-cycle-popup").find("#applicationStatus-options").addClass("customRadio");
        var applicationCycleId = $('#application-cycle-popup #award-cycle-options .a-dropdown__field .a-dropdown__menu li.active').attr("data-id");
        populateAwardStatus(applicationCycleId);

    });

    $(document).on('click', '#copy-application', function(e) {
			window.location.href = "/en/secure/applicant/application.html";
				$("#application-container").load(function() {
					dataApplication();
				});
		});
		
    $(document).on('click', '#replace-refresh-application', function(e) {
    var getApplicationId = localStorage.getItem('storeContinueAppVal');
    window.location.href = "/en/secure/applicant/application.html";
    dataApplication();
    var data = {
        type: "AwardApplication",
        status: "DRAFT",
        id: getApplicationId,
        links: [{
            type: "AwardApplicationCycle",
            id: presentApplicationId
        }]
    }
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
            "x-id-token": jwtToken,
            "x-application-access-key": "user1#Applicant"
        },
        success: function(response) {        
            if (response.errorCode == 0) {
                localStorage.setItem('storeContinueAppVal', response.response.id);
                localStorage.setItem('applicationHashContent', response.response._hashedContent);                
            }
        },
        error: function(error) {}
    });

});
    $(document).on('click', '.applicationModal0 .generic-modal--close', function(e) {
        $("#application-cycle-popup").find("#applicationStatus-options").find(".a-radio--vertical").remove();
    });

    $("#applicationConfirm-options .a-checkbox__input").click(function(){          
       if($('input[name="applicationStatus"]').hasClass("selected") == false){
            $("#applicationStatus-options .radio--text-require").css("display", "block");
            $("#applicationStatus-options").addClass("validation-require");
            $("#application-copy-submit").attr("disabled","true");        
		}
        else{
            $("#applicationStatus-options .radio--text-require").css("display", "none");            
        }
    });

	$(document).on('click', 'input[name="applicationStatus"]', function(e) {        
        e.preventDefault();
        $("#applicationStatus-options .radio--text-require").css("display", "none");
        $("#applicationStatus-options").removeClass("validation-require");
        $("#application-copy-submit").removeAttr("disabled");
    });
});
