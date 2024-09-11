function populateNameOfApplicationCycle() {    
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
        },
        success: function(response) {
            $.each(response.response.data, function(appIndex, appVal) {
                var id = appVal.id;
                var sDate = appVal.startDate;
                var eDate = appVal.endDate;
                $('ul[name="name-application-cycle"]').append('<li data-sdate=' + sDate + ' data-edate=' + eDate + ' data-id=' + id + ' data-hashedContent=' + appVal._hashedContent + '><span>' + appVal.name + '</span></li>');
            });
        },
        error: function(error) {}
    });
}

function editPopulateNameOfApplicationCycle(){
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=AwardApplicationCycle&category=present,future',
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
        	"x-id-token": jwtToken,
        },
        success: function(response) {
            let applicationCount  = $('ul[name="name-application-cycle"] li').length;
            if(applicationCount > 0)
            {
                $('ul[name="name-application-cycle"]').empty();
            }
            $.each(response.response.data, function(appIndex, appVal) {
                var id = appVal.id;
                var sDate = appVal.startDate;
                var eDate = appVal.endDate;
                $('ul[name="name-application-cycle"]').append('<li data-sdate=' + sDate + ' data-edate=' + eDate + ' data-id=' + id + ' data-hashedContent=' + appVal._hashedContent + '><span>' + appVal.name + '</span></li>');
            });
        },
        error: function(error) {}
    });
}

function populateJudgeAssessmentCycle() {
    $.ajax({
        url: searchUserurlOrigin + '/api/private/eform/eforms?type=JudgeAssessmentCycle&category=present,future',
        type: "GET",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPreferredLanguage,
        	"x-id-token": jwtToken,
        },
        success: function(response) {

            let judgeCount = $('ul[name="name-assessment-cycle"] li').length;
            if(judgeCount > 0)
            {
                $('ul[name="name-assessment-cycle"]').empty();
            }
            
            $.each(response.response.data, function(judgeIndex, judgeVal) {
				          var affname;
                 $.each(judgeVal.links, function(affIndex, affValue){
					          affname = affValue.name;
                 });
                var id = judgeVal.id;
                var judgesDate = judgeVal.startDate;
                var judgeeDate = judgeVal.endDate;
                $('ul[name="name-assessment-cycle"]').append('<li data-sdate=' + judgesDate + ' data-edate=' + judgeeDate + ' data-id=' + id + ' data-hashedContent=' + judgeVal._hashedContent + ' data-affname="' + affname + '"><span>' + judgeVal.name + '</span></li>');
            });
        },
        error: function(error) {}
    });
}

$(document).ready(function() {

    $(".admin_actions .a-dropdown__menu li").each(function(){
        if($(this).attr('data-optionvalue') == "add_judge"){
            $(this).addClass("addJudgeAction");
        }else if($(this).attr('data-optionvalue') == "manage_organization"){
            $(this).addClass("manageOrgAction");
        }else if($(this).attr('data-optionvalue') == "create_cycle"){
            $(this).addClass("createCycleAction");
        }else if($(this).attr('data-optionvalue') == "edit_cycle"){
            $(this).addClass("editCycleAction");
        }else if($(this).attr('data-optionvalue') == "create-report"){
            $(this).addClass("createReport");
        }
    });

    // Edit Cycle radio buttons
    $("#section-application-cycle-aside, #section-judge-assessment-cycle-aside").addClass("editSidebar");
    $("#name-of-app-cycle-options, #name-of-assesment-cycle-options").addClass("editCyclesForms");
    $("#name-of-app-cycle-options").show();
    $("#edit-cycle").find("#editApplicationCycleType-options .a-radio:eq(0)")
        .find("label").addClass("editCycleBtn").attr('val', 'editCycle1');
    $("#edit-cycle").find("#editApplicationCycleType-options .a-radio:eq(1)")
        .find("label").addClass("editCycleBtn").attr('val', 'editCycle2');

    $("#name-of-app-cycle-options").attr("edit-cycle", "editCycle1");
    $("#name-of-assesment-cycle-options").attr("edit-cycle", "editCycle2");

    /*For hiding generic API error in application which is opend in Judge assessment cycle*/
    $("#editApplicationCycleType-options .editCycleBtn:eq(0)").on('change', function(){
        $("#edit-assessment-cycle-general-error-message").hide();
    });

    $("#editApplicationCycleType-options .editCycleBtn:eq(1)").on('change', function(){
        if($("#edit-assessment-cycle-general-error-message").find("#general-api-error").hasClass("alert-danger")){
             $("#edit-assessment-cycle-general-error-message").show();
        }else{
             $("#edit-assessment-cycle-general-error-message").hide();
        }
    });

    $('.editCycleBtn').on('change', function() {
        var editCycleVal = $(this).attr("val");
        $(".editCyclesForms").hide();
        $("[edit-cycle=" + editCycleVal + "]").show();
    });

    // Name of ApplicationCycle dropdown population
    $("#application-cycle-aside p:eq(1)").addClass("appCycleName");
    $("#application-cycle-aside p:eq(3)").addClass("startDate");
    $("#application-cycle-aside p:eq(5)").addClass("endDate");
    $("#form-application-edit-cycle").find("#name-of-app-cycle-options").find(".a-dropdown__field ul").remove();
    $("#form-application-edit-cycle").find("#name-of-app-cycle-options").find(".a-dropdown__field").append('<ul class="a-dropdown__menu" name="name-application-cycle"></ul>');

    $(".editCycleAction").click(function(){
        editPopulateNameOfApplicationCycle();
    });
    
    $(".createReport").click(function(){
        populateNameOfApplicationCycle();
    });


    //Iterating values to sidebar based on Name of ApplicationCycle dropdown population

    $("#name-of-app-cycle-options .a-dropdown__field").click(function() {

        $("#name-of-app-cycle-options .a-dropdown__field").find(".a-dropdown__menu li").addClass("appCycleList");

        $(".appCycleList").click(function() {

            var appListName = $(this).text().trim();
            var startDate = $(this).attr("data-sdate");
            var endDate = $(this).attr("data-edate");

            $(".appCycleName").html('');
            $(".appCycleName").append(appListName);

            $(".startDate").html('');
            $(".startDate").append(startDate);

            $(".endDate").html('');
            $(".endDate").append(endDate);

            if ($(this).text().trim() !== "SELECT") {
                $("#section-edit-application-cycle, #section-application-cycle-aside, #edit-application-helptext1").show();
            } else {
                $("#section-edit-application-cycle, #section-application-cycle-aside, #edit-application-helptext1").hide();
            }

            $('label[val="editCycle2"]').click(function() {
                $("#section-edit-application-cycle, #section-application-cycle-aside, #edit-application-helptext1").hide();
            });

            $('label[val="editCycle1"]').click(function() {
                $("#section-edit-application-cycle, #section-application-cycle-aside, #edit-application-helptext1").show();
            });

            /* Disable the respective calenders if the selected date is in the past*/
            var selectedStartDate = startDate;
            var currentDate = new Date();
            selectedStartDate = new Date(selectedStartDate);
            if(selectedStartDate > currentDate){
                $("#edit-application-cycle").find('input[name="applicationCycleStartDate"]').prop("disabled", false).removeClass("disable");
                $("#edit-application-cycle").find('#cannot-be-edited').hide();
                $("#edit-application-cycle").find('#applicationCycleStartDate').next(".default-icon").css('pointer-events','');                
                $("#edit-application-cycle").find('input[name="applicationCycleStartDate"]').val('');

            }else{
				$("#edit-application-cycle").find('input[name="applicationCycleStartDate"]').prop("disabled", true).addClass("disable");
                $("#edit-application-cycle").find('#cannot-be-edited').show();
                $("#edit-application-cycle").find('#applicationCycleStartDate').next(".default-icon").css('pointer-events','none');
                $("#edit-application-cycle").find('input[name="applicationCycleStartDate"]').val(startDate);
            }


            if($("#edit-application-cycle #applicationCycleStartDate").hasClass("disable")){
                $(".disable").closest(".a-input-field").attr("data-required", "false");
            }else{
                $("#edit-application-cycle #applicationCycleStartDate").closest(".a-input-field").attr("data-required", "true");
            }

        });

    });

    // Name of Judge assessmentCycle dropdown population
    $("#section-judge-assessment-cycle-aside p:eq(1)").addClass("judgeCycleName");
    $("#section-judge-assessment-cycle-aside p:eq(3)").addClass("judgeAffName");
    $("#section-judge-assessment-cycle-aside p:eq(5)").addClass("judgeStartDate");
    $("#section-judge-assessment-cycle-aside p:eq(7)").addClass("judgeEndDate");
    $("#form-assessment-edit-cycle").find("#name-of-assesment-cycle-options").find(".a-dropdown__field ul").remove();
    $("#form-assessment-edit-cycle").find("#name-of-assesment-cycle-options").find(".a-dropdown__field").append('<ul class="a-dropdown__menu" name="name-assessment-cycle"></ul>');

    $("#editApplicationCycleType-options .editCycleBtn:eq(1)").on('change', function(){
        populateJudgeAssessmentCycle();
    });

    //Iterating values to sidebar based on Name of Judge assessmentCycle dropdown population

    $("#name-of-assesment-cycle-options .a-dropdown__field").click(function() {

        $("#name-of-assesment-cycle-options .a-dropdown__field").find(".a-dropdown__menu li").addClass("judgeCycleList");

        $(".judgeCycleList").click(function() {

            var judgeListName = $(this).text().trim();
			var judgeStartDate = $(this).attr("data-sdate");
            var judgeEndDate = $(this).attr("data-edate");
            var judgeAffName = $(this).attr("data-affname");

            $(".judgeCycleName").html('');
            $(".judgeCycleName").append(judgeListName);

            $(".judgeAffName").html('');
            $(".judgeAffName").append(judgeAffName);

            $(".judgeStartDate").html('');
            $(".judgeStartDate").append(judgeStartDate);

            $(".judgeEndDate").html('');
            $(".judgeEndDate").append(judgeEndDate);

            if ($(this).text().trim() !== "SELECT") {
                $("#edit-assessment-cycle, #section-judge-assessment-cycle-aside, #edit-application-helptext2").show();
            } else {
                $("#edit-assessment-cycle, #section-judge-assessment-cycle-aside, #edit-application-helptext2").hide();
            }

            $('label[val="editCycle2"]').click(function() {
                $("#edit-assessment-cycle, #section-judge-assessment-cycle-aside, #edit-application-helptext2").show();
            });

            $('label[val="editCycle1"]').click(function() {
                $("#edit-assessment-cycle, #section-judge-assessment-cycle-aside, #edit-application-helptext2").hide();
            });

            /* Disable the respective calenders if the selected date is in the past*/
            var selectedjudgeStartDate = judgeStartDate;
            var currentDate = new Date();
            selectedjudgeStartDate = new Date(selectedjudgeStartDate);
                      
            if(selectedjudgeStartDate > currentDate){
                $("#edit-assessment-cycle").find('input[name="applicationCycleStartDate"]').prop("disabled", false).removeClass("disable");
                $("#edit-assessment-cycle").find('#cannot-be-edited').hide();
                $("#edit-assessment-cycle").find('#applicationCycleStartDate').next(".default-icon").css('pointer-events','');                              
                $("#edit-assessment-cycle").find('input[name="applicationCycleStartDate"]').val('');
            }else{
				$("#edit-assessment-cycle").find('input[name="applicationCycleStartDate"]').prop("disabled", true).addClass("disable");
                $("#edit-assessment-cycle").find('#cannot-be-edited').show();
               	$("#edit-assessment-cycle").find('#applicationCycleStartDate').next(".default-icon").css('pointer-events','none');                
                $("#edit-assessment-cycle").find('input[name="applicationCycleStartDate"]').val(judgeStartDate);
            }

            if($("#edit-assessment-cycle #applicationCycleStartDate").hasClass("disable")){
                $(".disable").closest(".a-input-field").attr("data-required", "false");
            }else{
                $("#edit-assessment-cycle #applicationCycleStartDate").closest(".a-input-field").attr("data-required", "true");
            }

        });

    });

});