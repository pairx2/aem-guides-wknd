let previewIcon = $('.preview-program-icon').closest('.link').clone().html();
let deleteIcon = $('.all-program-delete').closest('.link').clone().html();
let advancedSearchAccordion = $('.advanced-search-accordion').closest('.accordion').clone();
let programStatusDropdown = $('.program-status').closest('.options').clone().html();
let programTitleTable;
let allProgramsTable;
let manageMyProgramsTable;
let currentPage = window.location.href;
let idleTime = 0;
let savedAttachments = [];
let postalRegexCall = false;
let isAppended = false;
let trueVar = true;
let falseVar = false;
let programId;
let isClosedAppended = false;
$('.overdue-popup-btn').closest('.link').hide();
$(function () {
    $(".close-program.disabled").closest(".action-wrapper").find(".m-popup .abt-icon-delete").css("color", "gray");
    if (currentPage.includes(".org/secure/")) {
        if(getSessionStorage('jwtToken') == "" || getSessionStorage('jwtToken') == null || getSessionStorage('jwtToken') == undefined){
            window.location.href = "/login";
        }
    }
    if (currentPage.includes("/all-programs")) {
        showLoading();
        loadAllPrograms();
    }
    if (currentPage.includes("/manage-my-programs")) {
        loadMyPrograms();
    }
    if (currentPage.includes("/schedule-program?requestId=")) {
        getDraftProgramDetails();
    }

    if (currentPage.includes("/territory-request")) {
        if(userInfo?.additionalProperties?.territoryId){
            $("[name='territoryId']").val(userInfo?.additionalProperties?.territoryId);
            $(".btn[name='territoryUpdate']").attr("disabled", "disabled");
        }
    }
    // adjust the padding bottom of the table
    if (window.matchMedia('(max-width: 767px)').matches) {
        if($(".dataTables_paginate").is(":visible")){
            $( ".anhi-datatable .dataTables_wrapper").css("padding-bottom", "125px");
            $(".anhi-datatable .dataTables_length").css("bottom","85px");
        }
        else{
            $( ".anhi-datatable .dataTables_wrapper").css("padding-bottom", "75px");
            $(".anhi-datatable .dataTables_length").css("bottom","18px");
        }
    }
});
$(function () {
    $("[name='territoryId']").on('keyup', function(){
        if($("[name='territoryId']").val().length == 7){
            if($("[name='territoryId']").val() == '9999999' || 
            $("[name='territoryId']").val().includes(".") ||
            $("[name='territoryId']").val().includes("+")||
            $("[name='territoryId']").val().includes("e") ||
            $("[name='territoryId']").val().includes("-")){
                $(".form-group").addClass("validation-regex");
                $(".btn[name='territoryUpdate']").attr("disabled", "disabled");
            }else{
                $(".btn[name='territoryUpdate']").removeAttr("disabled");
            }
        }else if($("[name='territoryId']").val().length > 7 || $("[name='territoryId']").val().length < 7){
            $(".form-group").addClass("validation-regex");
            $(".btn[name='territoryUpdate']").attr("disabled", "disabled");
        }else{
            $(".form-group").addClass("validation-require");
            $(".btn[name='territoryUpdate']").attr("disabled", "disabled");
        }
    });
    if (currentPage.includes("/secure/close-program?reqId")) {
        $('[name="Dietitians"]').attr("disabled", true);
        $('[name="Nurses"]').attr("disabled", true);
        $('[name="nursePractitioners"]').attr("disabled", true);
        $('[name="Pharmacists"]').attr("disabled", true);
        $('[name="Physicians"]').attr("disabled", true);
        $('[name="physicianAssociates"]').attr("disabled", true);
        $('[name="Other"]').attr("disabled", true);
        $(".uploadBtn").attr("disabled", true);
        $(".finalSubmit").attr("disabled", true);
        $('input').on('input', function() {
            checkFields();
        });
        let req = currentPage.split("reqId=")[1];
        $(".a-button--secondary a").attr("href", "/secure/program-detail?reqId="+req+"");
        loadCloseProgramDetails();
    }
    if (currentPage.includes("/program-detail")) {
        loadCloseProgramDetails();
        let status = window.location.href.split("&")[1]?.split("=")[1];
        let reqId = window.location.href.split("&")[0].split("reqId=")[1];
        if(status == "Draft"){
            $("#programdetailspage-start").find(".pg-close span").text("Edit");
            $(".pg-close").attr("href", "/secure/schedule-program?requestId=" + reqId + "");
            $(".pg-close").find(".a-button--primary span").text("Edit");
            $("#programdetailspage-start").find(".text:last-child .pg-close").hide();
            $(".pg-close").find(".a-button--primary a").attr("href", "/secure/schedule-program?requestId=" + reqId + "");
        }
        $(".pg-attendance-info").closest(".container").addClass("d-none");
        $(".closedLogo").addClass("d-none");
    }
    if (currentPage.includes("/schedule-program")) {
        getProgramCategory();        
        $(".errorRes").html("");
        $(".errorRes").hide();
    }
});
$(function () {
    if (isModifyCloseProgram) {
        fetchClosedProgramDetails();
        $(".uploadBtn").attr("disabled", true);
        $('input').on('input', function() {
            checkFields();
        });
    }
    //delete file feature
    $('body').delegate('.abt-icon-freestyle-delete', 'click', function() {
        if(isModifyCloseProgram){
            $(this).closest('div').remove();
        }
    });

    $('body').delegate('.ce-instructions-link', 'click', function() {
        $('#ce-instructions-pdf').click();
    });
    
    $('body').delegate('.territory-update-user', 'click', function() {
        if(userInfo.additionalProperties?.group.includes("Users") && !userInfo.additionalProperties?.group.includes("Admins")){
            window.location.href = window.location.origin + "/secure/territory-request";
        }
    });
    $('body').delegate('.uploadBtn', 'click', function() {
        fileUploadToBucket();
        $(".wizard-step[data-wizard='0'] ").removeClass("a-wizard-step--active");
        $(".wizard-step[data-wizard='1'] ").addClass("a-wizard-step--active");
    });
    $('body').delegate('.finalSubmit', 'click', function() {
        submitCloseProgram();
    });
    $("body").delegate('.m-accordion__header', "click", function() { 
        $('.m-accordion__header').not(this).removeClass('active');
        $(this).toggleClass('active');
        let isExpanded = $(this).find('.m-accordion__icon-wrapper').attr('aria-expanded');
        if(isExpanded == 'true'){
            $(this).find('.m-accordion__icon-wrapper').attr('aria-expanded', 'false');
            $(this).find('.m-accordion__icon-wrapper').find('.m-accordion-toggle').attr('data-toggle', 'expand');
            $(this).find('.m-accordion__icon-wrapper').find('.m-accordion-toggle').find('[data-icon="expand"]').addClass('icon-visible');
            $(this).find('.m-accordion__icon-wrapper').find('.m-accordion-toggle').find('[data-icon="collapse"]').removeClass('icon-visible');
        }else{
            $(this).find('.m-accordion__icon-wrapper').attr('aria-expanded', 'true');
            $(this).find('.m-accordion__icon-wrapper').find('.m-accordion-toggle').attr('data-toggle', 'collapse');
            $(this).find('.m-accordion__icon-wrapper').find('.m-accordion-toggle').find('[data-icon="collapse"]').addClass('icon-visible');
            $(this).find('.m-accordion__icon-wrapper').find('.m-accordion-toggle').find('[data-icon="expand"]').removeClass('icon-visible');
        }
        $(this).closest('.m-accordion__content-items').find('.collapse').toggleClass('show');
        getProgramCategory("search");
    });
    $('body').delegate('#all-programs-table tr td:first-child, #manage-my-programs-table tr td:first-child', 'click', function() {
        if($(this).closest('tr').find('.draft-program').length == 0){
            let reqId = $(this).closest("tr").find(".action-wrapper").attr("data-program-request-id");
            let status = $(this).closest("tr").find("td:nth-child(3)").text();
            window.location.href = "/secure/program-detail?reqId="+reqId+"&status="+status+"";
        }
    });
    // dropdown ul hide when we click other dropdown
    $('.a-dropdown__field').addClass('a-dropdown__field-1');
    $('fieldset .a-dropdown__field-1').on('click', function() {
        let _currentEle = $(this);
        if($(_currentEle).hasClass('active')){
            $('.a-dropdown__field').removeClass('active');
        }else{
        $('.a-dropdown__field').removeClass('active');
        setTimeout(function() {
            $(_currentEle).addClass('active');
        }, 100);
    }
    });
});
$(function () {
    $('body').delegate('fieldset .a-dropdown__field li', 'click', function() {
        $(this).closest('.a-dropdown__menu').find('li').not($(this)).removeClass('selected').removeAttr('aria-selected');
        setTimeout(() => {
            $(this).addClass('selected').attr('aria-selected', 'true').closest('.a-dropdown__field').removeClass('active');
            $(this).closest('.a-dropdown').find('.a-dropdown__field>span').removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
        }, 111);
        setTimeout(() => {
            $(this).closest('.a-dropdown').find('.a-dropdown__field>span').text($(this).find('span').text())
        }, 211);        
    });


    $('input[name="state-text"]').attr('data-val-length-max',"50");
    $('input[name="new-location"]').attr('data-val-length-max',"60");
    $('input[name="address"]').attr('data-val-length-max',"60");
    $('input[name="city"]').attr('data-val-length-max',"50");
    // input validation
    $(".a-input-field input").on('keyup', function(){
        let count_val = $(this).val().length;
        let max_val = parseInt($(this).attr('data-val-length-max'));
        if(count_val > max_val || count_val === 0){
            $(this).closest(".form-group").addClass("validation-regex");
            $('.btn[name="next"]').addClass('disabled').attr('disabled',true);
            $('.save-and-exit').addClass('disabled').attr('disabled',true);
        } else{
            $(this).closest(".form-group").removeClass("validation-regex");
        }
    }); 
});
$(function () {
    // restrict special characters
    $('input[name="address"], input[name="postal-code"]').bind('keypress', function(e) { 
        if(!((e.which == 18) || (e.which == 45) || (e.which == 32) || (e.which == 44) || (e.which == 46) || (e.which == 58) || (e.which == 39) || (e.which == 34) || (e.which == 47) || (e.which == 95))){
            return /[a-z0-9]/i.test(String.fromCharCode(e.charCode || e.keyCode)) || !!(!e.charCode && ~[8,37,39,46,9].indexOf(e.keyCode));
        }
    });
    // restrict number and special characters
    $('input[name="city"]').bind('keypress', function(e){
        if(!((e.which == 45) || (e.which == 32) || (e.which == 44) || (e.which == 46) || (e.which == 58) || (e.which == 39) || (e.which == 34) || (e.which == 47) || (e.which == 95))){
            return /[a-z]/i.test(String.fromCharCode(e.charCode || e.keyCode)) || !!(!e.charCode && ~[8,37,39,46,9].indexOf(e.keyCode));
        }
    });

    //program details page validation
    $('#attendeesForm input[type="number"]').bind('keypress', function(e) {     
        return /\d/i.test(String.fromCharCode(e.charCode || e.keyCode)) || !!(!e.charCode && ~[8,37,39,46,9].indexOf(e.keyCode));    
    });

        $("input[name='starttime']").val("11:30 AM");
        $("input[name='endtime']").val("12:30 PM");
        // time picker click function
        $('body').on('click', '.time-picker', function(){
            timeCompare();
            let _getAttribute = $(this).closest('.form-group').find('input').attr('name');
            let attribute_selector;
            if(_getAttribute == "starttime"){
                attribute_selector = $("input[name='starttime']");
            }
            else{
                attribute_selector = $("input[name='endtime']");
            }
            validationCheck(attribute_selector);
        });
});
$(function(){
    if(isModifyCloseProgram){
        let req = currentPage.split("reqId=")[1];
        $(".a-button--secondary a").attr("href", "/secure/program-detail?reqId="+req+"&status=Closed"); 
    }
    $('body').delegate('#closepopup-modal-modal .abt-icon-cancel', 'click', function() {
        $(this).closest('.modal').find('.cp-video .vjs-play-control.vjs-playing').click();
    });
})
// theme function for time regex
function TimeRegexAdd(){
    $('input[name="starttime"]').closest(".form-group").addClass("validation-regex");
    $('input[name="endtime"]').closest(".form-group").addClass("validation-regex");
    $('input[name="starttime"]').closest(".form-group").find("span.a-input-field--text-error").css({'display':'block','color':'#aa0061','width':'200%'});
}

function TimeRegexRemove(){
    $('input[name="starttime"]').closest(".form-group").removeClass("validation-regex");
    $('input[name="endtime"]').closest(".form-group").removeClass("validation-regex");
    $('input[name="starttime"]').closest(".form-group").find("span.a-input-field--text-error").css({'display':'none'});
}
        // function Time comparision
    // function Time comparision
function timeCompare() {
    let current_date = new Date();
    let current_time_ampm = current_date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).split(" ")[1]
    let input_date = $('input[name=date]').val();
    let formate_date = new Date(input_date).toISOString().slice(0, 10);
    let start_time = $('[name=starttime]').val().split(" ")[0];
    let end_time = $('[name=endtime]').val().split(" ")[0];
    let start_time_ampm = $('[name=starttime]').val().split(" ")[1];
    let actual_start_time = new Date(formate_date + "T" + start_time);
    let actual_end_time = new Date(formate_date + "T" + end_time);
    let start_time_milli = actual_start_time.getTime();
    let end_time_milli = actual_end_time.getTime();
    // current time is less than start time
    if(((current_time_ampm == "AM") && (start_time_ampm == "PM")) || ((current_time_ampm == "AM") && (start_time_ampm == "AM")) || ((current_time_ampm == "PM") && (start_time_ampm == "PM")) || ((current_time_ampm == "PM") && (start_time_ampm == "AM"))){
        if(start_time_milli < end_time_milli){
            // current time is less than start time is true
            // start time is less than end time
            timeCompareStep();
        }
        else if(start_time_milli >= end_time_milli){
            timeCompareMilli();          
        }
        else{
            // start time is equal to end time
            TimeRegexAdd();
        }
    }
    else{
        // current time is greater than or equal to start time
        TimeRegexAdd();
    }
}
function timeCompareMilli(){
    let start_time_ampm = $('[name=starttime]').val().split(" ")[1];
    let end_time_ampm = $('[name=endtime]').val().split(" ")[1];
    if(((start_time_ampm == "AM") && (end_time_ampm == "PM"))){
        //start time earlier than end time
        TimeRegexRemove();
    }
    else{
        // start time later than end time
        TimeRegexAdd();
    } 
}
function timeCompareStep(){
    let start_time_ampm = $('[name=starttime]').val().split(" ")[1];
    let end_time_ampm = $('[name=endtime]').val().split(" ")[1];
    if(((start_time_ampm == "AM") && (end_time_ampm == "PM")) || ((start_time_ampm == "AM") && (end_time_ampm == "AM")) || ((start_time_ampm == "PM") && (end_time_ampm == "PM"))){
        // start time earlier than end time"
        TimeRegexRemove();
    }
    else{
        // start time later than end time
        TimeRegexAdd();
    } 
}
$(function (){
    if (currentPage.includes("/secure/") && $(`#wcmMode`).val() === 'false') {
        // Increment the idle time counter every minute.
        setInterval(timerIncrement, 60000); // 1 minute

        // Zero the idle timer on mouse action or keyboard action.
        function resetTimer() {
            idleTime = 0;
        }

        window.addEventListener('load', resetTimer, true);
        window.addEventListener('mousemove', resetTimer, true);
        window.addEventListener('mousedown', resetTimer, true);
        window.addEventListener('touchstart', resetTimer, true);
        window.addEventListener('touchmove', resetTimer, true);
        window.addEventListener('click', resetTimer, true);
        window.addEventListener('keydown', resetTimer, true);
        window.addEventListener('scroll', resetTimer, true);

        function timerIncrement() {
            idleTime++;
            setSessionStorage('idleTime',idleTime);
            if (idleTime > 14) { // 15 minutes
                window.location.href = "/login"
            }
        }
    }

    $('.home-banner-content-container').closest('.container').addClass('p-0');
    $('.login-bg-container').closest('.container').addClass('p-0');
   
    $('body').delegate('.anhi-datatable .a-dropdown__field', 'click', function(e) {
        e.stopPropagation();
        $('.anhi-datatable  .a-dropdown__field').not($(this)).removeClass('active');
        setTimeout(() => {
            $(this).toggleClass('active');
        }, 100);
    })
});
$(function () {
    $('body').delegate('.anhi-datatable .a-dropdown__field li', 'click', function() {
        $(this).closest('.a-dropdown__menu').find('li').not($(this)).removeClass('selected').removeAttr('aria-selected');
        setTimeout(() => {
            $(this).addClass('selected').attr('aria-selected', 'true').closest('.a-dropdown__field').removeClass('active');
            $(this).closest('.a-dropdown').find('.a-dropdown__field>span').removeClass('a-dropdown__placeholder').addClass('a-dropdown-selected');
        }, 111);
        setTimeout(() => {
            $(this).closest('.a-dropdown').find('.a-dropdown__field>span').text($(this).find('span').text())
        }, 211);
    })
    if($(`#wcmMode`).val() === 'false'){
        $('.preview-program-icon').closest('.link').remove();
        $('.all-program-delete').closest('.link').remove();
        $('.advanced-search-accordion').closest('.accordion').remove();
        $('.program-status').closest('.options').remove();
        $('.delete-popup-btn').hide();
        $('.delete-popup-btn').closest('.a-button').hide();
        $('.preview-program-icon').hide();
    }
    $('.a-tile__para p:empty').remove();
    $('.select-program-container [name="state"]').closest('.a-dropdown__field').addClass('disabled');
    $('#program-title-table table,#all-programs-table table, #manage-my-programs-table table').css('opacity','0');
    
    $('.m-accordion__header').each(function(){
        if($(this).find('.m-accordion__icon-wrapper[aria-expanded="true"]').length > 0){
            $(this).addClass('active');
        }
    });
    $('[name="state-text"]').closest('.fields').addClass('d-none');
    $('[name="new-location"]').closest('.fields').addClass('d-none');
    $('.reset-location-btn').closest('.button').addClass('d-none');
    $('[name="address"]').attr('readonly',true);
    $('[name="city"]').attr('readonly',true);
    $('[name="postal-code"]').attr('readonly',true);
    //state-text-field
    
    $('[name="country"]').closest('.a-dropdown__field').find('li').each(function(){
        $(this).on('click', function() {
             let selectValue = $(this).find('>span')?.text()?.trim();
             countryDropdownModified(selectValue);
         })
     })
});
$(function(){
    $('[name="state"]').closest('.a-dropdown__field').find('li').each(function(){
        $(this).on('click', function() {
         $(".errorRes")?.hide();
         let currentStateValue =  $(this).find('>span')?.text()?.trim();
         stateDropdownModified(currentStateValue);
        });
     });

     $('body').delegate('.program-status .a-dropdown__field li', 'click', function() {
        let selectValue =  $(this).find('>span')?.text()?.trim();
        programStatusModified(selectValue);
        hideLoading();
    });

    $('body').delegate('.advanced-status .a-dropdown__field li', 'click', function() {
        let selectValue =  $(this).find('>span')?.text()?.trim();
        advancedStatusModified(selectValue);
    });
    $('.add-new-location-btn').click(function(){
        let __this =  $(this);
        $('.reset-location-btn').closest('.button').removeClass('d-none');
        $('.add-new-location-btn').closest('.button').addClass('d-none');
        $('[name="new-location"]').closest('.fields').removeClass('d-none');
        $('[name="address"]').removeAttr('readonly');
        $('[name="city"]').removeAttr('readonly');
        $('[name="postal-code"]').removeAttr('readonly');
        $('[name="address"]').val('');
        $('[name="city"]').val('');
        $('[name="postal-code"]').val('');
        $('.location').closest('.options').addClass('d-none');
        if($('[name="state"].a-dropdown__menu').find('li.selected').length == 0){
            $('.location').find('[name="location"]').remove();
        }
        setTimeout(function(){
            __this.closest('.o-wizard__content').find('.btn[name="next"]').addClass('disabled').attr('disabled',true);
            __this.closest('.o-wizard__content').find('.save-and-exit').addClass('disabled').attr('disabled',true);
        },100)
        $('.o-wizard__container').attr("buildingID", "");
        $(".content-custom-location").parent().css("display","block");
    });
    $('.reset-location-btn').click(function(){
        let __this =  $(this);
        $('.add-new-location-btn').closest('.button').removeClass('d-none');
        $('.reset-location-btn').closest('.button').addClass('d-none');
        $('[name="new-location"]').closest('.fields').addClass('d-none');
        $('.location').closest('.options').removeClass('d-none');
        if($('[name="state"].a-dropdown__menu').find('li.selected').length == 0){
            $('.location').find('[name="location"]').remove();
        }
        if ($('[name="country"]').closest('.a-dropdown__field').find('>span').text() != ' United States' && $('[name="country"]').closest('.a-dropdown__field').find('.a-dropdown__placeholder').length == 0) {
            $('[name="state"]').closest('.options').addClass('d-none');
            $('[name="state-text"]').closest('.fields').removeClass('d-none');
            $('.location').find('[name="location"]').remove();
            $('[name="new-location"]').closest('.fields').removeClass('d-none');
            $('.location').closest('.options').addClass('d-none');
        }
        $('[name="new-location"]').val('');
        $('[name="address"]').val('');
        $('[name="city"]').val('');
        $('[name="postal-code"]').val('');
        $('[name="address"]').attr('readonly',true);
        $('[name="city"]').attr('readonly',true);
        $('[name="postal-code"]').attr('readonly',true);
        $(".content-custom-location").parent().css("display","none");
        $('input').closest(".form-group").removeClass("validation-regex");
        $('.o-wizard__container').attr("buildingID", "");
        setTimeout(function(){
            __this.closest('.o-wizard__content').find('.btn[name="next"]').addClass('disabled').attr('disabled',true);
            __this.closest('.o-wizard__content').find('.save-and-exit').addClass('disabled').attr('disabled',true);
        },100)
        inputStyleData();
    });


    let tempBtn;
    $('.save-and-exit').each(function(){
        tempBtn = $(this).closest('.button').clone();
        $(this).closest('.button').next('.o-wizard__btn').find('.button-div:last').before(tempBtn);
        $(this).closest('.button').remove();
    })

    let tempDeleteBtn;
    $('.deleteprogram').each(function(){
        tempDeleteBtn = $(this).closest('.button').clone();
        $(".button button[name='schedule']").closest('.button-div').after(tempDeleteBtn);
        $(this).closest('.button').remove();
    })
});
$(function () {
    let currURL = window.location.href;
    if (currURL.indexOf('#') > 0) {
        let hashValue = '#' + currURL.split('#')[1];
        setTimeout(function(){
             $('html, body').animate({
                scrollTop: $(hashValue)?.offset().top - $('.o-header-v2-global__sticky-section')?.height()
            }, 200);
        },1000)
    }


    // schedule program content show/hide
    function showHide(){
        // scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if($(`#wcmMode`).val() === 'false'){
            $(".schedule-program-container, .schedule-program-wizard-tile").parent().css("display","none");
            let contentShow = $(".select-program-container .a-wizard-step--active").attr("data-wizard");
            $("#schedule-program-content-container-"+contentShow).parent().css("display","block");
            $("#schedule-program-wizard-tile-"+contentShow).parent().css("display","block");
        }
    }
    
    wizardShowHide();
    showHide();
    bindevents();
    $(".btn[name=next], .btn[name=Previous]").click(function(){
        setTimeout(function(){
            showHide();
            wizardShowHide();
            bindevents();
        },1000);
        $('html, body').animate({
            scrollTop: $(this).closest('.o-wizard__content').offset().top - ($('.o-header-v2-global__sticky-section')?.height() + 100)
        }, 1000);
    });

    
    $('.o-wizard__content').each(function(){
        $(this).find('.btn[name="next"]').addClass('disabled').attr('disabled',true);
        $(this).find('.save-and-exit').addClass('disabled').attr('disabled',true);
    });

    
    $(".btn[name='next']").click(function(){
        let _this = $(this);
        nextClick(_this);
    })

    $('body').delegate('.all-program-delete, .pg-close .a-link', 'click', function() {
        let programReqID = $(this).closest('.action-wrapper').attr('data-program-request-id')
        $('.delete-popup-btn').closest('.m-popup').attr('programReqID', programReqID);
        $('.manage-program_popup-modal-container').show();
        $('.manage-program_popup-modal-container').next('h3').remove();
        $('.delete-popup-btn').closest('.m-popup').click();
    });

    $('body').delegate('.preview-program-icon', 'click', function() {
        let requestId = $(this).closest("tr").find("td:last-child").text();
        loadCloseProgramTitleDetails(requestId);
    });
});
$(function () {
    $("#program-title-table").delegate('[name="selectedProgram"]', "change", function() {    
        $('#program-title-table table tr').removeClass('selectedRow')
        if($(this).is(':checked')){
            $(this).closest('tr').addClass('selectedRow')
        }
    })
    setTimeout(function(){
        autoHeightForColumn();
        hideLoading();
    },1700);
    $('.schedule-program-submit').on('click', function(e){
        e.preventDefault();
        scheduleSubmit();
    })
    $('body').delegate('.manage-program_popup-modal-container .a-button--danger', 'click', function(){
        if (currentPage.includes("/all-programs")) {
            deleteProgram('All programs');
        }else if (currentPage.includes("/manage-my-programs")) { 
            deleteProgram('Manage my programs');
        }else if (currentPage.includes("/schedule-program")) { 
            deleteProgram('Schedule program');
        }else{
            let reqId = currentPage.split("=")[1]?.split("&")[0];
            deleteProgram(reqId);
        }
    });
    $('body').delegate('.advanced-search-submit', 'click', function(){
        $(".m-accordion__header").click();
        if (currentPage.includes("/all-programs")) {
            searchTableAdvanced('All programs');
        }else if (currentPage.includes("/manage-my-programs")) { 
            searchTableAdvanced('Manage my programs');
        }
    });
});
function autoHeightForColumn(){
    $('#data-programdetails .columncontrol__column:nth-child(2) .text').each(function(index){
        showLoading();
        let textHeight = $(this).outerHeight();
        let textHeight1 = $('#data-programdetails .columncontrol__column:nth-child(1) .text').eq(index).outerHeight();
        if(textHeight > textHeight1){
            $('#data-programdetails .columncontrol__column:nth-child(1) .text').eq(index).css('height', textHeight);
        }
        else if(textHeight < textHeight1){
            $('#data-programdetails .columncontrol__column:nth-child(2) .text').eq(index).css('height', textHeight1);
        }  
    });
}
function scheduleSubmit(){
    let scheduleData = {
        "action": "schedule",
        "requestId": $('.o-wizard__container').attr('currRequestID'),
        "lastModifiedBy": userInfo?.email
    };
    showLoading();
    $.ajax({
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        type: "POST",
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(scheduleData),
        "headers": {
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-id-token": getSessionStorage('jwtToken'),
            "x-preferred-language": xPrefLang
        },
        success: function(dataRes) {
            hideLoading();
            if(dataRes.errorCode == 0 && dataRes.status == trueVar){
                $('.o-wizard-container__success-msg').text('Scheduled the program Successfuly')
                setTimeout(function(){
                    window.location.href="/secure/manage-my-programs";
                },1000)
            }else{
                $(".selectProgram").append("<p class='text-center errorRes'><span>"+dataRes.response?.statusReason+"</span></p>");
                $(".errorRes").show();
            }
        },
        error: function(error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}
function nextClick(source){
    if(source.closest('.o-wizard__content').attr('data-wizarditem') == "0"){
        let programCategoryId = $('[name="program-category"]').find('li.selected').attr("data-optionvalue").trim();
        loadProgramTitle(programCategoryId);
    }
    if(source.closest('.o-wizard__content').attr('data-wizarditem') == "3"){
        let summaryProgramType = $('[name="course"]').find('li.selected>span').text().trim();
        let summaryProgramCategory = $('[name="program-category"]').find('li.selected>span').text().trim();
        let summaryProgramTitle = $('[name="program-title"]').val().trim();
        let summaryLocationName;
        if($('[name="country"]').find('li.selected>span').text().trim() == 'United States' && $('[name="location"]').find('li.selected>span').text().length>0){
            summaryLocationName = $('[name="location"]').find('li.selected>span').text() + ', ' + $('[name="address"]').val() + ', ' + $('[name="city"]').val()+ ', ' +$('[name="state"]').find('li.selected>span').text()+', '+$('[name="postal-code"]').val()+ ', ' +$('[name="country"]').find('li.selected>span').text();
        }else if($('[name="location"]').find('li.selected>span').text().length == 0  && $('[name="country"]').find('li.selected>span').text().trim() == 'United States'){
            summaryLocationName = $('[name="new-location"]').val() + ', ' + $('[name="address"]').val() + ', ' + $('[name="city"]').val() + ', ' +$('[name="state"]').find('li.selected>span').text()+', '+$('[name="postal-code"]').val()+ ', ' +$('[name="country"]').find('li.selected>span').text();
        }else{
            summaryLocationName = $('[name="new-location"]').val() + ', ' + $('[name="address"]').val() + ', ' + $('[name="city"]').val() + ', ' +$('[name="state-text"]').val()+', '+$('[name="postal-code"]').val()+ ', ' +$('[name="country"]').find('li.selected>span').text();
        }

        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let summaryDate = new Date(Date.parse($('[name="date"]').val()));
        let month = summaryDate.toLocaleString('default', {month:'long'});
        let finalDate = week[summaryDate.getDay()] +", "+ month + " "+ summaryDate.getDate()+", "+summaryDate.getFullYear();
        let summaryTime = $('[name="starttime"]').val() +' - '+$('[name="endtime"]').val(); 
        let summaryTimezone = $('[name="timezone"]').find('li.selected>span').text().trim();
        $('.program-summary-type h3>span').text(summaryProgramType);
        $('.program-summary-category h3>span').text(summaryProgramCategory);
        $('.program-summary-title h3>span').text(summaryProgramTitle);
        $('.program-summary-location h3>span').text(summaryLocationName);
        $('.program-summary-date h3>span').text(finalDate);
        $('.program-summary-time h3>span').text(summaryTime);
        $('.program-summary-timezone h3>span').text(summaryTimezone);
        setTimeout(function(){
            $('.finalize-program-columncontrol .columncontrol__column:nth-child(2) .text').each(function(index){
                let textHeight = $(this).outerHeight();
                let textHeight1 = $('.finalize-program-columncontrol .columncontrol__column:nth-child(1) .text').eq(index).outerHeight();
                    if(textHeight > textHeight1){
                        $('.finalize-program-columncontrol .columncontrol__column:nth-child(1) .text').eq(index).css('height', textHeight);
                    }
                    else if(textHeight < textHeight1){
                        $('.finalize-program-columncontrol .columncontrol__column:nth-child(2) .text').eq(index).css('height', textHeight1);
                    }  
                });
        },200)
    } 
}
// wizard content hide on mobile devices
function wizardShowHide(){
    let isMobiledevice = window.matchMedia("only screen and (max-width: 767.98px)").matches;
    if (isMobiledevice) {
      $(".schedule-program-wizard-tile").css("display","none");
      $(".o-wizard__container .a-wizard__steps .wizard-step .a-wizard__label").css("visibility","hidden");
      if($(".o-wizard__container .a-wizard__steps .wizard-step").hasClass("a-wizard-step--active")){
        $(".o-wizard__container .a-wizard__steps .wizard-step.a-wizard-step--active .a-wizard__label").css("visibility","visible");
      }
    }
    else{
      $(".schedule-program-wizard-tile").css("display","block");
      $(".o-wizard__container .a-wizard__steps .wizard-step .a-wizard__label").css("visibility","visible");
    }
  }
function advancedStatusModified(source){
    if (source != 'All') {
        if ($('#all-programs-table').length > 0) {
            allProgramsTable.columns(2).search("^" + source + "$", true, false, true).draw();
        }
        if($('#manage-my-programs-table').length > 0){
            manageMyProgramsTable.columns(2).search("^" + source + "$", true, false, true).draw();
        }
    } else {
        if ($('#all-programs-table').length > 0) {
            allProgramsTable.search('').draw();
        }
        if ($('#manage-my-programs-table').length > 0) {
            manageMyProgramsTable.search('').draw();
        }
    }
    hideLoading();
}
function programStatusModified(source){
    if(source == "Closed"){
        $(".dataTable").html("");
        $(".dataTables_paginate").html("");
        if(currentPage.includes("/all-programs")){
            loadAllPrograms(source);
            return false;
        }
        if(currentPage.includes("/manage-my-programs")){
            loadMyPrograms(source);
            return false;
        }
    }
    if (source != 'All') {
        if ($('#all-programs-table').length > 0) {
            allProgramsDraw(source);
        }
        if($('#manage-my-programs-table').length > 0) {
            manageProgramDraw(source);
        }
    } else {
        if ($('#all-programs-table').length > 0) {
            allProgramsTable.search('').draw();
        }
        if($('#manage-my-programs-table').length > 0) {
            manageMyProgramsTable.search('').draw();
        }
    }
}
function allProgramsDraw(source){
    if(!$("#all-programs-table").find("td:nth-child(3)").text().includes("Closed")){
        allProgramsTable.columns(2).search("^" + source + "$", true, false, true).draw();
    }else if($("#all-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#all-programs-table").find("td:nth-child(3)").text().includes("Draft") ||
    $("#all-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#all-programs-table").find("td:nth-child(3)").text().includes("Due") ||
    $("#all-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#all-programs-table").find("td:nth-child(3)").text().includes("Overdue") ||
    $("#all-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#all-programs-table").find("td:nth-child(3)").text().includes("Scheduled")){
        allProgramsTable.columns(2).search("^" + source + "$", true, false, true).draw();
    }else{
        $(".dataTable").html("");
        $(".dataTables_paginate").html("");
        loadAllPrograms(source);
    }
}
function manageProgramDraw(source){
    if(!$("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Closed")){
        manageMyProgramsTable.columns(2).search("^" + source + "$", true, false, true).draw();
    }else if($("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Draft") ||
    $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Due") ||
    $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Overdue") ||
    $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Closed") && $("#manage-my-programs-table").find("td:nth-child(3)").text().includes("Scheduled")){
        manageMyProgramsTable.columns(2).search("^" + source + "$", true, false, true).draw();
    }else{
        $(".dataTable").html("");
        $(".dataTables_paginate").html("");
        loadMyPrograms(source);
    }
}
    function countryDropdownModified(source){
    if(source != ''){
        if(source !== 'United States'){
            $('[name="state"]').closest('.options').addClass('d-none');
            $('[name="state-text"]').closest('.fields').removeClass('d-none');
            if($('[name="state"].a-dropdown__menu').find('li.selected').length == 0){
                $('.location').find('[name="location"]').remove();
            }
            $('[name="address"]').val('');
            $('[name="city"]').val('');
            $('[name="postal-code"]').val('');
            $('[name="postal-code"]').attr("placeholder","Postal Code");
            $(".add-new-location-btn").click();
        } else{
            setTimeout(function () {
                $('[name="state"]').closest('.options').removeClass('d-none');
                $('.select-program-container [name="state"]').closest('.a-dropdown__field').removeClass('disabled');
                $('[name="state-text"]').closest('.fields').addClass('d-none');
                $('[name="postal-code"]').attr("placeholder", "Zip/Postal Code");
                $(".reset-location-btn").click();
            },600)
        }
    }
}
function stateDropdownModified(source){
    if(source != ''){
        let stateDataValue;
        $('[name="state"]').find('li').each(function(){
            if($(this).find('span')?.text()?.trim() == source){
                stateDataValue = $(this).attr('data-optionvalue')?.trim();
            }
        });
        let stateAPIData = {
            "action": "listLocation",
            "email": userInfo?.email,
            "upi": userInfo?.additionalProperties?.UPI,
            "state": stateDataValue
        };
        showLoading();
        $.ajax({
            url: searchUserurlOrigin + '/api/v2/private/learning/programlocation',
            type: "POST",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(stateAPIData),
            "headers": {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": getSessionStorage('jwtToken')
            },
            success: function(dataRes) {
                if(dataRes.errorCode == 0){
                    let locationArrayObj = dataRes.response;
                    $(".errorRes").html("");
                    $('[name="location"]').remove();
                    $('.location').find(".a-dropdown-selected").text("");
                    let locationAppendValue = '<ul class="a-dropdown__menu" name="location" aria-expanded="true">';
                    for (let curLoc of locationArrayObj) {
                        locationAppendValue += `<li data-location="${curLoc.locationName}" data-optionvalue="${curLoc.locationID}" class="">
                            <span class="a-dropdown__option-text">${curLoc.locationName} - ${curLoc.locationAddress}</span>
                        </li>`;
                    }
                    locationAppendValue += `</ul>`
                    $('.location').find('.a-dropdown__field').append(locationAppendValue);
                    hideLoading();
                    bindLocationDetailsEvent();
                }else{
                    stateErrortext(dataRes);
                    hideLoading();
                }
            },
            error: function(error) {
                checkUnauthorized(error);
                if(error.responseJSON?.errorCode != 0){
                    stateErrortext(error);
                    hideLoading();
                }
            }
        });
    }
}
function stateErrortext(source){
    let errorRes;
    $(".errorRes").html("");
    $('[name="location"]').remove();
    $('.location').find(".a-dropdown-selected").text("");
    if(source?.response?.statusReason || source?.responseJSON?.response){
        errorRes = "<span class='errorRes'>No locations are available for the selected State/Province. Please add a new location to proceed.</span>"
    }
    $(".location").find(".a-dropdown").append(errorRes);
    $(".location").find(".errorRes").show();
}

function bindLocationDetailsEvent(){
    $(".errorRes")?.hide();
    let locationPlaceholder = $('.location').find('.a-dropdown__field').find('span').text()
    $('[name="location"]').closest('.a-dropdown__field').find('li').each(function(){
        $(this).on('click', function() {
            let currentLocationValue = $(this)?.attr('data-optionvalue');
            if (currentLocationValue != '' && currentLocationValue != locationPlaceholder) {
                showLoading();
                let locationAPIData = {
                    "action": "getLocation",
                    "locationID": currentLocationValue
                };
                $.ajax({
                    url: searchUserurlOrigin + '/api/v2/private/learning/programlocation',
                    type: "POST",
                    dataType: 'json',
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(locationAPIData),
                    "headers": {
                        "x-application-id": xApplicationId,
                        "x-country-code": xCountryCode,
                        "x-preferred-language": xPrefLang,
                        "x-id-token": getSessionStorage('jwtToken')
                    },
                    success: function(dataRes) {
                        if(dataRes.errorCode == 0){
                            let addressArrayObj = dataRes.response;
                            let locAddress = addressArrayObj.address;
                            let locCity = addressArrayObj.city;
                            let locPostalCode = addressArrayObj.postalCode;
                            $('[name="address"]').val(locAddress);
                            $('[name="city"]').val(locCity);
                            $('[name="postal-code"]').val(locPostalCode);
                            validationCheck($('[name="postal-code"]'));
                        }else{
                            $(".selectProgram").append("<p class='text-center errorRes'><span>"+data.statusReason+"</span></p>");
                            $(".errorRes").show();
                        }
                        hideLoading();
                    },
                    error: function(error) {
                        checkUnauthorized(error);
                        hideLoading();
                    }
                });
            }
        });
    });
}

function emptyValidationCheck(ele){
    let currForm = ele.closest('.o-wizard__content');
    let radioFieldChecked = false;
    if(currForm.attr('data-wizarditem') == "1"){
        currForm.find('#program-title-table [type="radio"]:visible').each(function(){
            if($(this).is(':checked')){
                radioFieldChecked = true;
            }
        });
        if(radioFieldChecked){
            currForm.find('.btn[name="next"]').removeClass('disabled').attr('disabled',false);
            currForm.find('.save-and-exit').removeClass('disabled').attr('disabled',false);
        }
        else{
            currForm.find('.btn[name="next"]').addClass('disabled').attr('disabled',true);
            currForm.find('.save-and-exit').addClass('disabled').attr('disabled',true);
        }
    }
}
function validationCheck(ele){
    let dropdownSet = true;
    let textfieldFilled = true;
    let currForm = ele.closest('.o-wizard__content');
    if(currForm.attr('data-wizarditem') == "0" || currForm.attr('data-wizarditem') == "2" || currForm.attr('data-wizarditem') == "3"){
        currForm.find('.a-dropdown[data-required="true"]:visible').each(function(){
            if($(this).find('ul li.selected').length == 0){
                dropdownSet = false;
            }
        });
        currForm.find('.fields .a-input-field[data-required="true"]:visible, .datepicker .a-input-field[data-required="true"]:visible').each(function(){
            if(($(this).find('input').val().length == 0) || ($(this).find('.form-group').hasClass('validation-regex'))) {
                textfieldFilled = false;
            }
        });
        if(dropdownSet && textfieldFilled){
            currForm.find('.btn[name="next"]').removeClass('disabled').attr('disabled',false);
            currForm.find('.save-and-exit').removeClass('disabled').attr('disabled',false);
        }
        else{
            currForm.find('.btn[name="next"]').addClass('disabled').attr('disabled',true);
            currForm.find('.save-and-exit').addClass('disabled').attr('disabled',true);
        }
    }
}
function inputStyleData(){
    $(".formcontainer input.form-control").each(function(index){
      let input_val = $(this).val();
      let placeholder_val = $(this).attr("placeholder");
      if((input_val == placeholder_val) || (input_val == "")){
        $(this).css({"font-family":"BrandonTextWeb-Regular","font-weight":"390","color":"#63666a"});
      }
      else{
        $(this).css({"font-family":"BrandonTextWeb-Medium","font-weight":"420","color":"#222731"});
      }
    });
}
function bindevents(){
    let _this;
    setTimeout(function() {
        $('.o-wizard__content').find('.a-dropdown__field:visible').find('li').each(function(){
            $(this).on('click', function() {
                _this = $(this).closest('.a-dropdown__field').find('>span');  
                setTimeout(function() {
                    validationCheck(_this);
                }, 100)
            })
        })
    }, 1000)
    $('.o-wizard__content:visible').find('input').each(function(){
        $(this).on('keyup change', function(){
            _this = $(this);
            setTimeout(function(){
                validationCheck(_this);
            },100)
        })
    })
    
    $("#program-title-table").delegate('[type="radio"]', "change", function() { 
        _this = $(this);
        $('[name="program-title"]').val(_this.closest('tr').find('td:first-child').text());
        $('[name="program-id"]').val(_this.closest('tr').find('td:last-child').text());
        setTimeout(function(){
            emptyValidationCheck(_this);
        },100)
    });
}

function loadProgramTitle(action){
    setTimeout(function(){
        showLoading()
    }, 100);
    $(".errorRes")?.hide();
    let apiData = {
        "action": "listProgram",
        "category_ID": action
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            'Content-Type': 'application/json',
            "x-id-token": getSessionStorage('jwtToken')
        },
        data: JSON.stringify(apiData),
        success: function (response) {
            let data = response.response;
            if(response.errorCode == 0){
                $(".errorRes").hide();
                if(programTitleTable){
                    programTitleTable.destroy();
                    isAppended = false;
                }
                programTitleTable = $('#program-title-table table').DataTable({
                    paging: true,
                    ordering: true,
                    pageLength: 12,
                    data: data,
                    'fnDrawCallback': function () {
                        if(!isAppended){
                            $('.dataTables_filter').each(function () {
                                $(this).find('label').text().replace('Search:','')
                                $(this).find('label').addClass('abt-icon').addClass('abt-icon-search');
                                $(this).find('label').find('input').attr('placeholder','Search');
                                $(this).append('<div class="button link a-button a-button--secondary a-button--sm"><a class="btn resetSearch" onclick="btnClearSearch()" ><span>RESET</span></a></div>');
                            });
                            isAppended = true;
                        }
                        let savedProgramID = $('.o-wizard__container').attr('userDraftProgramId');
                        chaeckSavedProgram(savedProgramID);
                        let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                        pagination.toggle(this.api().page.info().pages > 1);
                        $('.dataTables_length').find('select').find('option').each(function(index){
                            $(this).html(12*(index+1));
                            $(this).attr('value', 12*(index+1));
                       });
                       emptyValidationCheck($('#program-title-table table'));
                    },
                    columns: [
                        
                        { 'data': 'programName' },
                        {"render": function ( data, type, full, meta ) {
                            return previewIcon;
                        }},
                        {"render": function ( data, type, full, meta ) {
                            return '<label><input type="radio" name="selectedProgram"> Select</label>';
                            }},
                        { 'data': 'programID' }
                    ]
                });
                setTimeout(function(){
                    $('#program-title-table table').css('opacity','1');
                    $("#program-title-table .dataTables_length select option:contains('12')").prop('selected', true);
                    $("#program-title-table .dataTables_length select").after("<span>per page</span>");
                    $("#program-title-table .dataTables_length select").before("<span>Show</span>");
                    hideLoading();
                },100)
            }else{
                hideLoading();
                $(".selectProgram").append("<p class='text-center errorRes'><span>"+data.statusReason+"</span></p>");
                $(".errorRes").show();
            }
            
        },
        error: function (error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}
function chaeckSavedProgram(savedProgramID){
    $('#program-title-table tbody tr').each(function(){
        if($(this).find('td:last-child').text() == savedProgramID){
            $(this).find('td:nth-child(3) label').click();
        }
    });
    if(savedProgramID != "" && savedProgramID){
        for(let i=1 ; i <= $(".paginate_button ").length; i++){
            if($(".selectedRow:visible").length == 0){
                $(".paginate_button.next").click();
            }
        }
        $('.o-wizard__content:visible').find('.btn[name="next"]').removeClass('disabled').attr('disabled', false);
        $('.o-wizard__content:visible').find('.save-and-exit').removeClass('disabled').attr('disabled', false);
    }
}
function btnClearSearch()
{
    $('.program-status')?.find('li[data-optionvalue="all"]').click();
    allProgramsTable?.search('').draw();
    manageMyProgramsTable?.search('').draw();
    programTitleTable?.search('').draw();
}

function loadAllPrograms(source){
    setTimeout(function(){
        showLoading()
    }, 100);
    let apiData = {
        "action": "viewAll"
    };
    if(source == "Closed"){
        apiData.status = source;
        isAppended = false;
    }
    if(source != "Closed"){
        isAppended = false;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            let tableData = data.response.programList;
            if(allProgramsTable){
                allProgramsTable.destroy();
            }
            allProgramsTable = $('#all-programs-table table').DataTable({
                paging: true,
                order: [],
                pageLength: 12,
                data: tableData,
                'fnDrawCallback': function () {
                    // to do - Move before API call
                    if(!isAppended){
                        $('.dataTables_filter').each(function () {
                            $(this).find('label').text().replace('Search:','')
                            $(this).find('label').addClass('abt-icon').addClass('abt-icon-search');
                            $(this).find('label').find('input').attr('placeholder','Search');
                            $(this).append(programStatusDropdown);
                            $(this).find('.program-status').find('label').remove();
                        });
                        isAppended = true;
                    }
                    // to do - Move before API call
                      $('#all-programs-table tbody tr td:nth-child(3)').each(function(){
                        if($(this).text().toLowerCase().indexOf('draft') >= 0){
                            let pRequestID = $(this).closest('tr').find('.action-wrapper').attr('data-program-request-id');
                            let urlArray = window.location.pathname.split('/');
                            urlArray[urlArray.length-1] = 'schedule-program';
                            let draftURL = urlArray.join('/');
                            $(this).addClass('draft-program');
                            $(this).closest('tr').find('td:first-child').addClass('draft');
                            $(this).closest('tr').find('.action-wrapper').find('.button').removeClass('a-button--primary').addClass('a-button--secondary');
                            $(this).closest('tr').find('.action-wrapper').find('.button span').text('EDIT');
                            $(this).closest('tr').find('.action-wrapper').find('.btn').attr('href',draftURL+'?requestId='+pRequestID)
                        }
                        if($(this).text().toLowerCase().indexOf('overdue') >= 0){
                            $(this).addClass('overdue-program');
                        }
                      })
                      // To da - Review and move out before Ajax
                      $('.paginate_button.previous').html('<');
                      $('.paginate_button.next').html('>');
                      $('#all-programs-table .dataTables_filter').after(advancedSearchAccordion);
                      let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                      pagination.toggle(this.api().page.info().pages > 1);
                      $('.dataTables_length').find('select').find('option').each(function(index){
                            $(this).html(12*(index+1));
                            $(this).attr('value', 12*(index+1));
                       });
                 },
                columns: [
                    
                    { 'data': 'programTitle',
                    'defaultContent': '<i>NA</i>' },
                    { 'data': 'programStartDate',
                        'defaultContent': '<i>NA</i>',
                        "render": function (data) {
                            return dateRenderData(data);
                        }
                    },
                    { 'data': 'status',
                    'defaultContent': '<i>NA</i>' },
                    {"render": function ( data, type, full, meta ) {
                        return conditionAllUserStatus( data, type, full, meta );
                    }}
                ],
            });
            setTimeout(function(){
                $('#all-programs-table table').css('opacity','1');
                $("#all-programs-table .dataTables_length select option:contains('12')").prop('selected', true);
                $("#all-programs-table .dataTables_length select").after("<span>per page</span>");
                $("#all-programs-table .dataTables_length select").before("<span>Show</span>");
                $('.a-spinner:first').addClass('d-none');
                checkClosedStatus(source);
            }, 200)
            hideLoading();

        },
        error: function (error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}
function conditionAllUserStatus( data, type, full, meta ){
    if((userInfo.additionalProperties?.group.includes("Users") && userInfo.email == full.createdBy) || userInfo.additionalProperties?.group.includes("Admins")){
        if(full.status == 'Scheduled'){
            return '<div class="action-wrapper"  data-program-request-id="'+full.requestId+'"><div class="button link a-button a-button--primary a-button--sm"><a class="btn close-program disabled" disabled><span>CLOSE</span></a></div>'+deleteIcon+'</div>';
        }else if(full.status == 'Closed'){
            return '<div class="action-wrapper" disabled  data-program-request-id="' + full.requestId + '"><div class="button link a-button a-button--primary a-button--sm"><a class="btn close-program disabled" disabled><span>CLOSE</span></a></div>' + deleteIcon + '</div>';
        }else{
            return '<div class="action-wrapper"  data-program-request-id="'+full.requestId+'"><div class="button link a-button a-button--primary a-button--sm"><a href="/secure/close-program?reqId='+full.requestId+'" class="btn close-program" ><span>CLOSE</span></a></div>'+deleteIcon+'</div>';
        }
    }
    if(userInfo.additionalProperties?.group.includes("Users") && userInfo.email != full.createdBy){
        return '<div class="action-wrapper" disabled  data-program-request-id="'+full.requestId+'"><div class="button link a-button a-button--primary a-button--sm"><a class="btn close-program disabled" disabled><span>CLOSE</span></a></div>'+deleteIcon+'</div>';
    }
}
function loadMyPrograms(source){
    setTimeout(function(){
        showLoading()
    }, 100);
    let apiData = {
        "action": "viewMyProgram",
        "email": userInfo?.email,
        "upi": userInfo?.additionalProperties?.UPI
    };
    checkStatusClosed(source, apiData);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            let tableData = data.response.programList;
            if(manageMyProgramsTable){
                manageMyProgramsTable.destroy();
            }
            manageMyProgramsTable = $('#manage-my-programs-table table').DataTable({
                paging: true,
                order: [],
                pageLength: 12,
                data: tableData,
                'fnDrawCallback': function () {
                    if(!isAppended || !isClosedAppended){
                        $('.dataTables_filter').each(function () {
                            $(this).find('label').text().replace('Search:','')
                            $(this).find('label').addClass('abt-icon').addClass('abt-icon-search');
                            $(this).find('label').find('input').attr('placeholder','Search');
                            $(this).append(programStatusDropdown);
                            $(this).find('.program-status').find('label').remove();
                        });
                        isAppended = true;
                        isClosedAppended = true;
                    }
                      $('#manage-my-programs-table tbody tr td:nth-child(3)').each(function(){
                        if($(this).text().toLowerCase().indexOf('draft') >= 0){
                            let pRequestID = $(this).closest('tr').find('.action-wrapper').attr('data-program-request-id');
                            let urlArray = window.location.pathname.split('/');
                            urlArray[urlArray.length-1] = 'schedule-program';
                            let draftURL = urlArray.join('/');
                            $(this).addClass('draft-program');
                            $(this).closest('tr').find('td:first-child').addClass('draft');
                            $(this).closest('tr').find('.action-wrapper').find('.button').removeClass('a-button--primary').addClass('a-button--secondary');
                            $(this).closest('tr').find('.action-wrapper').find('.button span').text('EDIT');
                            $(this).closest('tr').find('.action-wrapper').find('.btn').attr('href',draftURL+'?requestId='+pRequestID)
                        }
                        if($(this).text().toLowerCase().indexOf('overdue') >= 0){
                            $(this).addClass('overdue-program');
                        }
                      })
                      $('.paginate_button.previous').html('<');
                      $('.paginate_button.next').html('>');
                      $('#manage-my-programs-table .dataTables_filter').after(advancedSearchAccordion);
                      let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                      pagination.toggle(this.api().page.info().pages > 1);
                      $('.dataTables_length').find('select').find('option').each(function(index){
                            $(this).html(12*(index+1));
                            $(this).attr('value', 12*(index+1));
                       });
                 },
                columns: [
                    
                    { 'data': 'programTitle',
                    'defaultContent': '<i>NA</i>' },
                    { 'data': 'programStartDate',
                    'defaultContent': '<i>NA</i>',
                    "render": function (data) {
                        return dateRenderData(data);
                    }
                    },
                    { 'data': 'status',
                    'defaultContent': '<i>NA</i>' },
                    {"render": function ( data, type, full, meta ) {
                        return conditionMyUserStatus( data, type, full, meta );
                    }}
                ],
            });
            setTimeout(function(){
                $('#manage-my-programs-table table').css('opacity','1');
                $("#manage-my-programs-table .dataTables_length select option:contains('12')").prop('selected', true);
                $("#manage-my-programs-table .dataTables_length select").after("<span>per page</span>");
                $("#manage-my-programs-table .dataTables_length select").before("<span>Show</span>");
                $('.a-spinner:first').addClass('d-none');
                checkClosedStatus(source);
            }, 200);
            hideLoading();
            
        }
    });
}
function checkStatusClosed(source, apiData){
    if(source == "Closed"){
        apiData.status = source;
        isClosedAppended = false;
    }
    if(source != "Closed"){
        isClosedAppended = false;
    }
}
function checkClosedStatus(source){
    let programStatus = $(".program-status").find(".a-dropdown__field li");
    if(source != "Closed"){
        $(programStatus).each(function(index, element){
            if(element.innerText.trim() == source){
                $(this).click();
            }
        });
    }else{
        $(programStatus).each(function(index, element){
            if(element.innerText.trim() == source){
                $(this).addClass("selected");
                $(this).closest(".a-dropdown__field").find(".a-dropdown__placeholder").text(source);
            }
        });
    }
}
function dateRenderData(data){
    if(data && data != ''){
        let newdate = new Date(Date.parse(data));
        let dateMonth = newdate.toLocaleString('default', {month:'long'});
        let formattedDate = dateMonth + " "+ newdate.getDate()+", "+newdate.getFullYear();
        return formattedDate;
    }
}
function getDayName(dateStr, locale)
{
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}
function conditionMyUserStatus( data, type, full, meta ){
    if(full.status == 'Scheduled'){
        return '<div class="action-wrapper"  data-program-request-id="'+full.requestId+'"><div class="button link a-button a-button--primary a-button--sm"><a class="btn close-program disabled" disabled><span>CLOSE</span></a></div>'+deleteIcon+'</div>';
    }else if(full.status == 'Closed'){
        return '<div class="action-wrapper" disabled  data-program-request-id="'+full.requestId+'"><div class="button link a-button a-button--primary a-button--sm"><a class="btn close-program disabled" disabled><span>CLOSE</span></a></div>'+deleteIcon+'</div>';
    }else{
        return '<div class="action-wrapper"  data-program-request-id="'+full.requestId+'"><div class="button link a-button a-button--primary a-button--sm"><a href="/secure/close-program?reqId='+full.requestId+'" class="btn close-program" ><span>CLOSE</span></a></div>'+deleteIcon+'</div>';
    }
}

function getDraftProgramDetails(){
    setTimeout(function(){
        showLoading()
    }, 100);
    let requestId = window.location.href.split('?requestId=')[1];
    $('.o-wizard__container').attr('currRequestID', requestId);
    let apiData = {
        "action": "getDraftDetails",
        "requestId":requestId
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            if(data.errorCode == 0){
                let userDraftData = data.response;
                setLocalStorage('userDraftData_'+requestId,userDraftData);
                let userDraftProgramId = userDraftData.programId;
                let userDraftLocationName = userDraftData.locationName;
                let userDraftCity = userDraftData.city;
                let userDraftCountry = userDraftData.country;
                let userDraftAddress = userDraftData.address;
                let userDraftState = userDraftData.state;
                let userDraftZipCode = userDraftData.zipCode;
                let userDraftProgramStartDate = userDraftData.programStartDate;
                let userDraftStartTime = userDraftData.startTime;
                let userDraftEndTime = userDraftData.endTime;
                let userDraftTimezone = userDraftData.timezone;
                $('.o-wizard__container').attr('userDraftProgramId', userDraftProgramId);
                $('#program-title-table tbody tr').each(function(){
                    if($(this).find('td:last-child').text() == userDraftProgramId){
                        $(this).find('td:nth-child(3) label').click();
                    }
                });
                getdraftdropdown(userDraftData);
                if(userDraftCountry == "United States"){
                    fetchDataUs(userDraftData);
                }else{
                    $("[name='state-text']").val(userDraftState);
                    $(".add-new-location-btn").click();
                    setTimeout(() => {  
                        $("[name='new-location']").val(userDraftLocationName);
                        $('[name="city"]').val(userDraftCity);
                        $('[name="postal-code"]').val(userDraftZipCode);
                        $('[name="address"]').val(userDraftAddress);
                        validationCheck($("[name='new-location']"));
                    }, 500);
                }
                $('[name="date"]').val(userDraftProgramStartDate);
                $('[name="starttime"]').val(userDraftStartTime);
                $('[name="endtime"]').val(userDraftEndTime);
                
                $("[name='timezone'] li").each(function(){ 
                    let programTimezone = $(this).attr('data-optionvalue');
                    if(programTimezone == userDraftTimezone){
                        $(this).click();
                        $(this).closest("ul").click();
                    }
                });
                validationCheck($("[name='timezone']"));
                $(this).closest('.o-wizard__content').find('.btn[name="next"]').removeClass('disabled').attr('disabled',false);
                $(this).closest('.o-wizard__content').find('.save-and-exit').removeClass('disabled').attr('disabled',false);
            }
            hideLoading();
        },
        error: function (error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}
function getdraftdropdown(userDraftData){
    $("[name='course'] li").each(function(){ 
        let programTitleType = $(this).attr('data-optionvalue');
        if(programTitleType == userDraftData.programType){
            $(this).click();
            $(this).closest("ul").click();
        }
    });
    setTimeout(() => { 
        $("[name='program-category'] li").each(function() {
            let programCategory = $(this).find("span").text().trim();
            if (programCategory == userDraftData.programCategory) { 
                $(this).click();
                $(this).closest("ul").click();
            }
        });
    }, 1000);
    
    $("[name='country'] li").each(function(){ 
        let programCountry = $(this).attr('data-optionvalue');
        if(programCountry == userDraftData.country){
            $(this).click();
            $(this).closest("ul").click();
        }
    });

}
function fetchDataUs(source){
    $("[name='state'] li").each(function(){ 
        let programState = $(this).attr('data-optionvalue');
        if(programState == source.state){
            $(this).click();
            $(this).closest("ul").click();
        }
    });
    setTimeout(() => {                    
        $("[name='location'] li").each(function() {
            let programLocation = $(this).find("span").text();
            if (programLocation == source.locationName || programLocation.split('-')[0] == source.locationName) {
                $(this).click();
                $(this).closest("ul").click();
                $(this).closest('.o-wizard__content').find('.btn[name="next"]').removeClass('disabled').attr('disabled', false);
                $(this).closest('.o-wizard__content').find('.save-and-exit').removeClass('disabled').attr('disabled', false);
            }
            validationCheck($("[name='location']"));
        });
    }, 2500);
}
function deleteProgram(source){
    setTimeout(function(){
        showLoading();
    }, 100);
    let reqId;
    if(source == 'All programs' || source == 'Manage my programs'){
        reqId = $('.delete-popup-btn').closest('.m-popup').attr('programReqID');
    }else if(source == 'Schedule program'){
        reqId = $('.o-wizard__container').attr('currRequestID');
    }else{
        reqId = source;
    }
    let apiData =  {
        "action":"delete",
        "requestId":reqId
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            if(data.errorCode == 0){
                $('.manage-program_popup-modal-container').hide();
                $('.manage-program_popup-modal-container').after('')
                $('.manage-program_popup-modal-container').after('<h3>Program deleted successfuly.</h3>');
                deleteRedirect(source);
            }
            hideLoading();
        },
        error: function (error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}
function deleteRedirect(source){
    if(source == 'All programs'){
        loadAllPrograms();
    }
    if(source == 'Manage my programs'){
        loadMyPrograms();
    }
    if(source == 'Schedule program' || currentPage.includes("/program-detail")){
        setTimeout(function(){
            window.location.href="/secure/manage-my-programs";
        },1000)
    }
}

function searchTableAdvanced(source){
    showLoading();
    let apiData =  {
        "action": "advancedSearch",
        "locationName": $('[name="location-name"]').val(),
        "address": $('[name="address"]').val(),
        "city": $('[name="city"]').val(),
        "state": $('[name="state"]').val(),
        "country": $('[name="country"]').find('li.selected').attr('data-optionvalue'),
        "eventId": $('[name="eventId"]').val(),
        "programType": $('[name="program-type"]').find('li.selected').attr('data-optionvalue'),
        "programCategory": $('[name="program-category"]').find('li.selected span').text(),
        "lastName": $('[name="lastName"]').val(),
        "email": $('[name="email"]').val(),
        "territoryId": $('[name="territory-id"]').val()
    }
    if(source == 'Manage my programs'){
        apiData.createdBy =  userInfo.email
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            let tableSearchedData;
            tableSearchedData = data.response.programList;
            if(tableSearchedData == undefined){
                tableSearchedData = {};
            }
            if(source == 'All programs'){
                advancedAllProgram(tableSearchedData);
            }
            if(source == 'Manage my programs'){
                advancedMyprograms(tableSearchedData);
            }
        },
        error: function (error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}
function advancedAllProgram(source){
    if(allProgramsTable){
        allProgramsTable.destroy();
    }
    allProgramsTable = $('#all-programs-table table').DataTable({
        paging: true,
        order: [],
        pageLength: 12, 
        data: source,
        'fnDrawCallback': function () {
            showLoading();
            if(isAppended){
                $('.dataTables_filter').each(function () {
                    $(this).find('label').text().replace('Search:','')
                    $(this).find('label').addClass('abt-icon').addClass('abt-icon-search');
                    $(this).find('label').find('input').attr('placeholder','Search');
                    $(this).append(programStatusDropdown);
                    $(this).find('.program-status').addClass("advanced-status");
                    $(this).find('.advanced-status').removeClass("program-status");
                    $(".advanced-status").attr("style", "min-width: 163px; text-align: left;");
                    $(this).find('.program-status').find('label').remove();
                });
                isAppended = false;
            }
            $('#all-programs-table tbody tr td:nth-child(3)').each(function(){
                if($(this).text().toLowerCase().indexOf('draft') >= 0){
                    let pRequestID = $(this).closest('tr').find('.action-wrapper').attr('data-program-request-id');
                    let urlArray = window.location.pathname.split('/');
                    urlArray[urlArray.length-1] = 'schedule-program';
                    let draftURL = urlArray.join('/');
                    $(this).addClass('draft-program');
                    $(this).closest('tr').find('td:first-child').addClass('draft');
                    $(this).closest('tr').find('.action-wrapper').find('.button').removeClass('a-button--primary').addClass('a-button--secondary');
                    $(this).closest('tr').find('.action-wrapper').find('.button span').text('EDIT');
                    $(this).closest('tr').find('.action-wrapper').find('.btn').attr('href',draftURL+'?requestId='+pRequestID)
                }
                if($(this).text().toLowerCase().indexOf('overdue') >= 0){
                    $(this).addClass('overdue-program');
                }
            })
            $('.paginate_button.previous').html('<');
            $('.paginate_button.next').html('>');
            $('#all-programs-table .dataTables_filter').after(advancedSearchAccordion);
            let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
            pagination.toggle(this.api().page.info().pages > 1);
            $('.dataTables_length').find('select').find('option').each(function(index){
                $(this).html(12*(index+1));
                $(this).attr('value', 12*(index+1));
        });
        },
        columns: [
            
            { 'data': 'programTitle',
            'defaultContent': '<i>NA</i>' },
            { 'data': 'programStartDate',
            'defaultContent': '<i>NA</i>',
            "render": function (data) {
                if(data && data != ''){
                    return dateRenderData(data);
                }
            }
            },
            { 'data': 'status',
            'defaultContent': '<i>NA</i>' },
            {"render": function ( data, type, full, meta ) {
                return conditionAllUserStatus( data, type, full, meta );
            }}
        ],
    });
    setTimeout(function(){
        $('#all-programs-table table').css('opacity','1');
        $("#all-programs-table .dataTables_length select option:contains('12')").prop('selected', true);
        $("#all-programs-table .dataTables_length select").after("<span>per page</span>");
        $("#all-programs-table .dataTables_length select").before("<span>Show</span>");
        hideLoading();
    },100)
}
function advancedMyprograms(source){
    if(manageMyProgramsTable){
        manageMyProgramsTable.destroy();
    }
    manageMyProgramsTable = $('#manage-my-programs-table table').DataTable({
        paging: true,
        order: [],
        pageLength: 12,
        data: source,
        'fnDrawCallback': function () {
            showLoading();
            if(isAppended){
                $('.dataTables_filter').each(function () {
                    $(this).find('label').text().replace('Search:','')
                    $(this).find('label').addClass('abt-icon').addClass('abt-icon-search');
                    $(this).find('label').find('input').attr('placeholder','Search');
                    $(this).append(programStatusDropdown);
                    $(this).find('.program-status').addClass("advanced-status");
                    $(this).find('.advanced-status').removeClass("program-status");
                    $(".advanced-status").attr("style", "min-width: 163px; text-align: left;");
                    $(this).find('.program-status').find('label').remove();
                });
                isAppended = false;
            }
            $('#manage-my-programs-table tbody tr td:nth-child(3)').each(function(){
                if($(this).text().toLowerCase().indexOf('draft') >= 0){
                    let pRequestID = $(this).closest('tr').find('.action-wrapper').attr('data-program-request-id');
                    let urlArray = window.location.pathname.split('/');
                    urlArray[urlArray.length-1] = 'schedule-program';
                    let draftURL = urlArray.join('/');
                    $(this).addClass('draft-program');
                    $(this).closest('tr').find('td:first-child').addClass('draft');
                    $(this).closest('tr').find('.action-wrapper').find('.button').removeClass('a-button--primary').addClass('a-button--secondary');
                    $(this).closest('tr').find('.action-wrapper').find('.button span').text('EDIT');
                    $(this).closest('tr').find('.action-wrapper').find('.btn').attr('href',draftURL+'?requestId='+pRequestID)
                }
                if($(this).text().toLowerCase().indexOf('overdue') >= 0){
                    $(this).addClass('overdue-program');
                }
            })
            $('.paginate_button.previous').html('<');
            $('.paginate_button.next').html('>');
            $('#manage-my-programs-table .dataTables_filter').after(advancedSearchAccordion);
            let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
            pagination.toggle(this.api().page.info().pages > 1);
            $('.dataTables_length').find('select').find('option').each(function(index){
                $(this).html(12*(index+1));
                $(this).attr('value', 12*(index+1));
        });
        },
        columns: [
            
            { 'data': 'programTitle',
            'defaultContent': '<i>NA</i>' },
            { 'data': 'programStartDate',
            'defaultContent': '<i>NA</i>',
            "render": function (data) {
                if(data && data != ''){
                    return dateRenderData(data);
                }
            }
            },
            { 'data': 'status',
            'defaultContent': '<i>NA</i>' },
            {"render": function ( data, type, full, meta ) {
                return conditionMyUserStatus( data, type, full, meta );
            }}
        ],
    });
    setTimeout(function(){
        $('#manage-my-programs-table table').css('opacity','1');
        $("#manage-my-programs-table .dataTables_length select option:contains('12')").prop('selected', true);
        $("#manage-my-programs-table .dataTables_length select").after("<span>per page</span>");
        $("#manage-my-programs-table .dataTables_length select").before("<span>Show</span>");
        hideLoading();
    },100)
}

//To upload file to s3 bucket

$('.filepond--root').on(
    'dragover',
    function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
)
$('.filepond--root').on(
    'dragenter',
    function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
)
$('body').delegate('.filepond--root', 'drop', function() {
    dragfunation($(this))
});
$('body').delegate('.filepond--root', 'change', function() {
    dragfunation($(this))
});
function dragfunation(index){
    showLoading();
    setTimeout(() => {
        let getBlob = $("input[name=uploaded-file").val();
        let getName = $(".m-file-uploader__name").text();
        let removeBtn =  $(".m-file-uploader__removefile").clone().html();
        $(".green-success").remove();
        if(isModifyCloseProgram){
            $(this).find(".error").addClass("d-none");
            $(this).find(".success").addClass("d-none");
        }
        $(".m-file-uploader").append('<div class="fileList"><p data-blob-url="'+getBlob+'">'+getName+'</p><span class="m-file-uploader__removefile">'+removeBtn+'</span></div>');
        $(".m-file-uploader__filename").addClass("d-none");
        $(".m-file-uploader__removefile").addClass("d-none");
        $(".fileList").find(".m-file-uploader__removefile").removeClass("d-none");
        index.removeClass("d-none");
        index.find(".filepond--drop-label").css("pointer-events", "auto");
        $(".uploadBtn").removeClass("disabled").removeAttr("disabled");
        $(".fileList").find(".abt-icon-freestyle-delete").css("cursor", "pointer");
        $(".fileList").find(".abt-icon-freestyle-delete").on("click", function(){
            $(this).closest(".fileList").remove();
            if($(".fileList").length == 0){
                $(".uploadBtn").addClass("disabled").attr("disabled", "disabled");
            }else{
                $(".uploadBtn").removeClass("disabled").removeAttr("disabled");
            }
            if(isModifyCloseProgram){
                $(".modify-file-upload").find(".success").addClass("d-none");
                $(".modify-file-upload").find(".error").removeClass("d-none");
            }
            $(".green-success").remove();
            $(".o-wizard__content[data-wizarditem='0']").append("<p class='green-success' style='color:#008924;'>File deleted successfully<p>");
        });
    }, 3500);
    hideLoading();
};

function checkFields() {
    let allFilled = true;
    $('input[name="Dietitians"], input[name="Nurses"], input[name="nursePractitioners"], input[name="Pharmacists"], input[name="Physicians"], input[name="physicianAssociates"], input[name="Other"]').each(function() {
        if ($(this).val() === '') {
            allFilled = false;
            return false;
        }
    });

    if (allFilled) {
        $('.finalSubmit').removeAttr('disabled');
    } else {
        $('.finalSubmit').attr('disabled', 'disabled');
    }
}

function fileUploadToBucket(){
    $(".fileList").each(function () {
        showLoading();
        let blobUrl = $(this).find("p").attr("data-blob-url");
        let fileName = $(this).find("p").text();
        let getFile = new File([blobUrl], fileName);
        let apiData = {
            "completeObjectKey": getFile.name
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: searchUserurlOrigin + '/api/private/profile/signed-url',
            dataType: 'json',                   
            headers: { 
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": getSessionStorage('jwtToken'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(apiData),
            success: function (data) {
                if(data.errorCode == 0){
                    showLoading();
                    $(".green-success").remove();
                    $(".o-wizard__content[data-wizarditem='0']").append("<p class='green-success' style='color:#008924;'>File added successfully<p>");
                    let receivedFilename = data.response.fileName;
                    let filesObj = {
                        'fileName': receivedFilename,
                        'displayName': fileName,
                    }

                    if(isModifyCloseProgram){
                        filesObj = {
                            ...filesObj, 
                            'uploadBy': userInfo?.email,
                        }
                        const div = $(".uploadBtn").closest("div").parent();
                        div.append("<p class='green-success' style='color:#008924;'>File added successfully<p>")
                        
                    }
                    setSessionStorage('fileName',fileName);
                    savedAttachments.push(filesObj);
                    let storeSigned = data.response.signedUrl;
                    secondAjaxCall(storeSigned, getFile);
                    $('.m-file-uploader__removefile').hide();
                    enableAttendeesCount(); 
                }else{
                    $(".green-success").remove();
                    $(".o-wizard__content[data-wizarditem='0']").append("<p cloass='green-success' style='color:#aa0061;'>File failed to upload<p>");
                }
                hideLoading();
            },
            error: function (error) {
                checkUnauthorized(error);
                hideLoading();
            }
        });
    })
}

function secondAjaxCall(storeSigned, attachmentfn) {
    const putData = async () => {
        const response = await fetch(storeSigned, {
            method: 'PUT',
            headers: {
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": getSessionStorage('jwtToken')
            },
            body: attachmentfn
        });
        // Return response data    
        return response;
    };
    putData();
}
const isModifyCloseProgram = currentPage?.includes("/modify-closed-program");

const commonHeadersObj = {
  "x-application-id": xApplicationId,
  "x-country-code": xCountryCode,
  "x-preferred-language": xPrefLang,
  "x-id-token": getSessionStorage("jwtToken"),
  "Content-Type": "application/json",
};

function submitCloseProgram() {
    setTimeout(function(){
        showLoading();
    }, 100);
    const successPopupId = isModifyCloseProgram
      ? "#success-popup"
      : "#successPopup";
    
    let reqId = currentPage.split("reqId=")[1];
    let dietietionCount = $('[name="Dietitians"]').val();
    let nursesCount = $('[name="Nurses"]').val();
    let nursePractitioners = $('[name="nursePractitioners"]').val();
    let pharmacistsCount = $('[name="Pharmacists"]').val();
    let physiciansCount = $('[name="Physicians"]').val();
    let physiciansAssoCount = $('[name="physicianAssociates"]').val();
    let others = $('[name="Other"]').val();
  
    let apiData = {
      "action": isModifyCloseProgram ? "updateClosedProgram" : "close",
      "requestId": reqId,
      "files": savedAttachments,
      "dietitiansCount": dietietionCount,
      "nursesCount": nursesCount,
      "nursePractitionersCount": nursePractitioners,
      "pharmacistsCount": pharmacistsCount,
      "physiciansCount": physiciansCount,
      "physicianAssociatesCount": physiciansAssoCount,
      "othersCount": others,
      "uploadBy": userInfo?.email,
      "lastModifiedBy": userInfo?.email,
    };
  
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: searchUserurlOrigin + "/api/v2/private/learning/program",
      dataType: "json",
      headers: {
        "x-application-id": xApplicationId,
        "x-country-code": xCountryCode,
        "x-preferred-language": xPrefLang,
        "x-id-token": getSessionStorage("jwtToken"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(apiData),
      success: function (data) {
        if (data.errorCode == 0) {
          $(successPopupId).closest(".m-popup").click();
          $(".manage-program_popup-modal-container").closest(".modal-dialog").find(".generic-modal--close").hide();
        }else{
            if(isModifyCloseProgram){
                $("#close-program").append("<p class='errorRes text-center'>"+data.response.statusReason+"</p>")
            }
        }
        hideLoading();
      },
      error: function (error) {
        checkUnauthorized(error);
        hideLoading();
      },
    });
}
  
  //function to enable attendees count section
  function enableAttendeesCount() {
    $('[name="Dietitians"]').removeAttr("disabled");
    $('[name="Nurses"]').removeAttr("disabled");
    $('[name="nursePractitioners"]').removeAttr("disabled");
    $('[name="Pharmacists"]').removeAttr("disabled");
    $('[name="Physicians"]').removeAttr("disabled");
    $('[name="physicianAssociates"]').removeAttr("disabled");
    $('[name="Other"]').removeAttr("disabled");
  }
  
  //function to fetch url from S3 bucket
  function fetchUrlFromS3Bucket(fileName, displayName, section) {
    showLoading();
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: searchUserurlOrigin + "/api/private/profile/signed-url",
      dataType: "json",
      headers: commonHeadersObj,
      data: JSON.stringify({
        action: "download",
        completeObjectKey: fileName,
      }),
      success: function (data) {
        if (data.errorCode == 0) {
          const href = data?.response?.signedUrl;
          const pTag = $(
            `<p><img class="a-logo-comp--image img-fluid" src="/content/dam/an/groupportal/icon/Add%20Attachment.svg" alt="Logo Image"><a style="color:#008924" href=${href} target="_blank">${displayName}</a></p>`
          );
          section.append(pTag);
        }
        hideLoading();
      },
      error: function (error) {
        checkUnauthorized(error);
        hideLoading();
      },
    });
  }
  
  function prepopulateAttendeesCountAndOldFiles(res) {
    $('[name="Dietitians"]').prop("value", res?.dietitiansCount);
    $('[name="Nurses"]').prop("value", res?.nursesCount);
    $('[name="nursePractitioners"]').prop(
      "value",
      res?.nursePractitionersCount
    );
    $('[name="Pharmacists"]').prop("value", res?.pharmacistsCount);
    $('[name="Physicians"]').prop("value", res?.physiciansCount);
    $('[name="physicianAssociates"]').prop(
      "value",
      res?.physicianAssociatesCount
    );
    $('[name="Other"]').prop("value", res?.othersCount);
    $(".program-title h3").text(res?.programTitle);
     //fetch already uploaded files and display it on the UI
     const section = $("#old-files");
     section.html("");

     res?.files?.forEach((file) => {
       fetchUrlFromS3Bucket(file?.fileName, file?.displayName, section);
     });    

     savedAttachments?.push(...res?.files);
  }

  function displayClosedProgramDetails(res) {
    let location = `${res.locationName} </br> ${res.address}, ${res.city}, ${res?.state}, </br> ${res?.zipCode}, ${res?.country}`
    $(".gp-type").find("p").text(res?.programType);
    $(".gp-category").find("p").text(res?.programCategory);
    $(".gp-date").find("p").text(res?.programStartDate);
    $(".gp-time").find("p").text(res?.startTime + "-" + res.endTime);
    $(".gp-eventId").find("p").text(res?.eventIdDisplay);
    $(".gp-location").find("p").html(location);
    $(".gp-user").find("p").text(res?.firstName + " " + res.lastName);
    $(".gp-territory").find("p").text(res?.territoryId);
    $('#data-programdetails .columncontrol__column:nth-child(2) .text').each(function(index){
        let textHeight = $(this).outerHeight();
        let textHeight1 = $('.finalize-program-columncontrol .columncontrol__column:nth-child(1) .text').eq(index).outerHeight();
        if(textHeight > textHeight1){
            $('.finalize-program-columncontrol .columncontrol__column:nth-child(1) .text').eq(index).css('height', textHeight);
        }
        else if(textHeight < textHeight1){
            $('.finalize-program-columncontrol .columncontrol__column:nth-child(2) .text').eq(index).css('height', textHeight1);
        }
    });
  }

  //update view closed program details screen
  function viewClosedProgramAttendees(res){
    //check if logged in user is non admin && non owner
    const shouldDisableLinks = (userInfo.firstName != res.firstName && !userInfo.additionalProperties?.group?.includes("Admins"));
    displayClosedProgramDetails(res);
    $("#programdetailspage-start").find(".text strong").text(res?.programTitle);
    $(".cp-dietitians").find("p").text(res?.dietitiansCount)
    $(".cp-nurse").find("p").text(res?.nursesCount);
    $(".cp-nursePractitioner").find("p").text(res?.nursePractitionersCount);
    $(".cp-pharmacist").find("p").text(
      res?.pharmacistsCount
    );
    $(".cp-physician").find("p").text(res?.physiciansCount);
    $(".cp-physicianAsso").find("p").text(
      res?.physicianAssociatesCount
    );
    $(".cp-other").find("p").text( res?.othersCount);
    const section = $(".cp-files");
    section.html("");
    if(shouldDisableLinks){
        res?.files?.forEach((file) => {
            const html = `<p style="color: #222731 !important"><img class="a-logo-comp--image img-fluid" src="/content/dam/an/groupportal/icon/AddAttachment.png" alt="Logo Image">${file?.displayName}</p>`;
            section.append(html);
        });
    }else{
        res?.files?.forEach((file) => {
            fetchUrlFromS3Bucket(file?.fileName, file?.displayName, section);
        });
    }
     
  }

  // fetch closed program details
  // prepopulate closed program details using API response
  function fetchClosedProgramDetails(isViewClosedProgram) {
    setTimeout(function(){
        showLoading();
    }, 100);
    let reqId = currentPage.split("=")[1].split("&")[0];
    let apiData = {
      action: "viewClosePrograms",
      requestId: reqId,
    };
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: searchUserurlOrigin + "/api/v2/private/learning/program",
      dataType: "json",
      headers: commonHeadersObj,
      data: JSON.stringify(apiData),
      success: function (data) {
        if (data.errorCode == 0) {
          //display closed program details
          const res = data?.response;
          if(isViewClosedProgram){
            //populate attendance section on view closed program details screen
            viewClosedProgramAttendees(res);
          }else{
            displayClosedProgramDetails(res);
            //prepopulate attendees count and previously uploaded attendence sheet by user/admin
            prepopulateAttendeesCountAndOldFiles(res);
          }
        }else{
            if(isModifyCloseProgram){
                $("#close-program").append("<p class='errorRes text-center'>"+data.response.statusReason+"</p>")
            }
        }
        hideLoading();
      },
      error: function (error) {
        checkUnauthorized(error);
        hideLoading();
      },
    });
  }

//close program details

function loadCloseProgramDetails(){
    setTimeout(function(){
        showLoading();
    }, 100);
    let reqId = currentPage.split("=")[1].split("&")[0];
    let apiData = {
        "action": "getProgramDetails",
        "requestId":reqId
    };
    $(".pg-close").attr("href", "/secure/close-program?reqId="+reqId+"");
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            let getStatus = window.location.href.split("&")[1]?.split("=")[1];
            if(data.errorCode == 0){
                let res = data.response;
                $('[name="data-cookie-expire-period"]').attr("programId", res.programId);
                localStorage.setItem('currProgEventID',res.eventId);
                $(".gp-type").find("p").text(res.programType?res.programType:"NA");
                $(".gp-category").find("p").text(res.programCategory?res.programCategory:"NA");
                $(".gp-date").find("p").text(res.programStartDate?res.programStartDate:"NA");
                $("#programdetailspage-start").find(".text strong").text(res.programTitle);
                $('#close-program .title + .text h3')?.text(res.programTitle);
                fetchEventId(res);
                $(".gp-territory").find("p").text(res.territoryId?res.territoryId:"NA");
                fetchProgramDescription(res);
                conditionDraftProgram(getStatus);
                $(".edit-link").find("a").attr("href", "/secure/modify-closed-program?reqId="+reqId+"");
                conditionClosedProgram(getStatus, res);
                conditionScheduledProgram(getStatus, res);
                loadCloseProgramTitleDetails(res.programId);
                generateAndDownloadPDF(res);
            }else{
                $("#programdetailspage").append("<p class='errorRes text-center'>"+data.response.statusReason+"</p>")
            }
            hideLoading();
        },
        error: function (error) {
            checkUnauthorized(error);
            hideLoading();
        }
    });
}

function fetchEventId(source){
    let location ;
    if(source.locationName){
        location = ""+source.locationName+", "+source.address+", "+source.city+", "+source.state+", "+source.zipCode+"";
    }else{
        location = "NA";
    }
    $(".gp-location").find("p").text(location);
    if(source.eventId || source.eventIdDisplay){
        $(".gp-eventId").find("p").text(source.eventIdDisplay?source.eventIdDisplay:source.eventId);
    }else{
        $(".gp-eventId").find("p").text("NA");
    }
    if(source.startTime){
        $(".gp-time").find("p").text(source.startTime+'-'+source.endTime);
    }else{
        $(".gp-time").find("p").text("NA");
    }
    if(source.firstName && source.lastName){
        $(".gp-user").find("p").text(source.firstName + ' ' + source.lastName);
    }else{
        $(".gp-user").find("p").text("NA");
    }
}
function fetchProgramDescription(res){
    if (res.description && $(".gp-description").length > 0) {
        let splitDescrip = res.description.split("</p>");
        let ul = $('<ul/>');
        let getImg = $(".gp-description").find("li:first-child img").attr("src");
        let formalText = $('<div/>')
        $(splitDescrip).each(function(index, element) {
            if(!element.includes("</a>") && !element.includes("br>")){
                formalText.append(element);
            }else if(element.includes("</a>")){
                ul.append("<li><img src=" + getImg + ">" + element + "</p></li>");
            }
        })
        $(".gp-description").html("");                          
        $(".gp-description").append(formalText); 
        $(".gp-description").append(ul);
        $(".gp-description").find("div p").css("margin-left", "-15px");
        $(".gp-description ul").addClass("green-list");
        $(".gp-description li a").css("display", "block");
        $(".gp-description ul").append(`<li><img src="/content/dam/an/groupportal/icon/Right.svg"><p><a rel="noopener noreferrer" class="ce-instructions-link">CE Instructions  </a>
            - Distribute to participants so they can claim credit&nbsp;</p></li>`);
        $('.green-list').find('br')?.remove()
    }
}
function conditionScheduledProgram(source, res){
    if(source == "Scheduled"){
        let date = new Date().toISOString().slice(0, 10).split("-")
        let currentDate = date[1]+'/'+date[2]+'/'+date[0];
        let programDate = res.programStartDate;
        if(Date.parse(currentDate) <= Date.parse(programDate)){
            $(".pg-close").addClass("disabled");
            $(".pg-close").find(".a-button--primary a").addClass("disabled");
        }
    }
}
function conditionClosedProgram(source, res){
    if(source != "Closed"){
        conditionClosed(res);
    }else{
        if(userInfo.firstName == res.firstName || userInfo.additionalProperties?.group.includes("Admins")){
            $(".edit-link").addClass("d-none");
            $(".gp-description").removeClass("d-none");
            $(".gp-description p").css("font-size", "0");
            $(".gp-description p").css("line-height", "0px");
            $(".gp-description p a").css("font-size", "20px");
            $(".pg-attendance-info").closest(".container").removeClass("d-none");
            $("#programdetailspage #green-content #attendance-sheet .row .col-12 .text .cmp-text p").attr('style', 'color: #008924 !important');
            $("#programdetailspage #green-content #attendance-sheet .row .col-12 .text .cmp-text p img").attr('src', '/content/dam/an/groupportal/icon/Add%20Attachment.svg');
        }
        if(userInfo.firstName != res.firstName){
            $("#programdetailspage #green-content #attendance-sheet .row .col-12 .text .cmp-text p").attr('style', 'color: #222731 !important');
            $("#programdetailspage #green-content #attendance-sheet .row .col-12 .text .cmp-text p img").attr('src', '/content/dam/an/groupportal/icon/AddAttachment.png');
            $(".gp-description").closest(".columncontrol__column").addClass("d-none");
            $(".pg-attendance-info").closest(".container").removeClass("d-none");
            $(".edit-link").addClass("d-none");
            if(userInfo.additionalProperties?.group.includes("Admins")){
                $(".gp-description").closest(".columncontrol__column").removeClass("d-none");
                $(".gp-description").removeClass("d-none");
                $(".gp-description p").css("font-size", "0");
                $(".gp-description p a").css("font-size", "20px");
            }
        }
        if(userInfo.additionalProperties?.group.includes("Admins")){
            $(".edit-link").removeClass("d-none");
        }

        //show attendance container on closed program view screen
        $(".pg-attendance-info").closest(".container").removeClass("d-none");
        //fill attendance section
        fetchClosedProgramDetails(true)

        //remove close program button for all users onces program is closed and show closed logo
        $(".closedLogo").removeClass("d-none");
        $(".pg-close").closest("div").addClass("d-none");
        $("#section-programCloseButton").closest("div").addClass("d-none");

    }
}
function conditionClosed(res){
    if(userInfo.additionalProperties?.group.includes("Users") && !userInfo.additionalProperties?.group.includes("Admins") && userInfo.firstName != res.firstName){
        $(".pg-close").addClass("d-none");
        $(".pg-material").addClass("d-none");
        $(".pg-download").addClass("d-none");
        $(".gp-description").closest(".columncontrol__column").addClass("d-none");
        $(".closedLogo").addClass("d-none");
    }else{
        $(".pg-close").removeClass("d-none");
        $(".pg-material").removeClass("d-none");
        $(".pg-download").removeClass("d-none");
    }
}
function conditionDraftProgram(source){
    let reqId = currentPage.split("=")[1].split("&")[0];
    if(source != "Draft"){
        $(".pg-close").attr("href", "/secure/close-program?reqId=" + reqId + "");
        $(".pg-close").find(".a-button--primary a.btn").attr("href", "/secure/close-program?reqId=" + reqId + "");
    }else{
        $(".pg-close").attr("href", "/secure/schedule-program?requestId=" + reqId + "");
        $(".pg-close").find(".a-button--primary a.btn").attr("href", "/secure/schedule-program?requestId=" + reqId + "");
    }
}

// programdetail, schedule program popup
function loadCloseProgramTitleDetails(req){
    setTimeout(function(){
        showLoading();
    }, 100);
    setTimeout(function() {
        let apiData = {
            "action": "getProgramTitle",
            "programId": req
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: searchUserurlOrigin + '/api/v2/private/learning/program',
            dataType: 'json',                   
            headers: { 
                "x-application-id": xApplicationId,
                "x-country-code": xCountryCode,
                "x-preferred-language": xPrefLang,
                "x-id-token": getSessionStorage('jwtToken'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(apiData),
            success: function (data) {
                if(data.errorCode == 0){
                    showLoading();
                    let creditDetails = data.response.creditDetails;
                    let ul=  $('<ul/>');
                    $(creditDetails).each(function(index, element){
                        ul.append('<li>'+element+'</li>');
                    });
                    $(".cp-credit").html("").append(ul);
                    autoHeightForColumn();
                    $("#programdetailspage-end").find(".video").remove();
                    let videoId= data.response?.pgmAssetLaptop?.split("/")[2];
                    if(videoId){
                        toAppendVideo(videoId);
                    }else{
                        setTimeout(function(){
                            $('.green-list li').each(function(){
                               if($(this).find('a').text().indexOf('CE Video') >= 0){
                                   $(this).addClass('d-none');
                               }
                           })
                       },1000)
                    }
                   
                    if(req){
                        $('#closepopup-modal').closest('.m-popup').click();
                    }
                    $(".programTitleTop p strong").text(data.response.programTitle);
                    $(".programTitleMid h3").text(data.response.programTitle);
                }
                hideLoading();
            },
            error: function (error) {
                checkUnauthorized(error);
                hideLoading();
            }
        });
    }, 2000);
}
function toAppendVideo(videoId){
    let videoHtml = '<div><video id="'+videoId+'" style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px; background:#fff;" data-video-id="'+videoId+'" data-player="BkVJxEGT" data-embed="default" data-application-id class="video-js" controls> </video><script src="https://players.brightcove.net/1336131408001/BkVJxEGT_default/index.min.js"></script><span class="downloadVideo"></span></div>'
    $(".cp-video").html('').append(videoHtml);
    setTimeout(function(){
       window.parent.initDownloadVideo();
   },1500);
}
function getProgramCategory(source){
    setTimeout(function(){
        showLoading();
    }, 100);
    $(".errorRes")?.hide();
    let apiData = {
        "action": "programCategory",
        "email":userInfo?.email,
        "territoryId":userInfo?.additionalProperties?.territoryId
    };
    if(source == "search"){
        apiData.isSearch = "true"
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: searchUserurlOrigin + '/api/v2/private/learning/program',
        dataType: 'json',                   
        headers: { 
            "x-application-id": xApplicationId,
            "x-country-code": xCountryCode,
            "x-preferred-language": xPrefLang,
            "x-id-token": getSessionStorage('jwtToken'),
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(apiData),
        success: function (data) {
            if(data.errorCode == 0){
                showLoading();
                $(".errorRes").hide();
                if(data.response.categoriesList){
                    let res = data.response.categoriesList;
                    let getUl = $('[name="program-category"]').html("");
                    $(res).each(function(index, element){
                        getUl.append('<li data-optionvalue='+element['pgmCategoryId']+'><span class="a-dropdown__option-text">'+element['pgmCategoryName']+'</span></li>');
                    });
                }else{
                    $(".overdueProgramPopup").closest('.m-popup').click();
                    $(".manage-program_popup-modal-container").closest(".modal-dialog").find(".generic-modal--close").hide();
                    $('[name="program-category"]').closest(".a-dropdown__field").addClass("disabled");
                    $('[name="course"]').closest(".a-dropdown__field").addClass("disabled");
                }
            }else{
                $('[name="program-category"]').html("");
                $(".selectProgram").append("<p class='text-center errorRes'><span>"+data.response.statusReason+"</span></p>");
                $(".errorRes").show();
            }
            hideLoading();

        },
        error: function (error) {
            checkUnauthorized(error);
            $('[name="program-category"]').html("");
            $(".selectProgram").append("<p class='text-center errorRes'><span>" + error.responseJSON.response + "</span></p>");
            $(".errorRes").show();
            hideLoading();
        }
    });
}

function checkUnauthorized(error){
    if(error.responseJSON.message == "UNAUTHORIZED"){
        window.location.href = '/login';
    }
  }

function generateAndDownloadPDF(response){
    let eventDate = getDayName(response.programStartDate) + ', ' + dateRenderData(response.programStartDate);
    let claimDate =  new Date(response.programStartDate);
    claimDate = new Date(claimDate.setDate(claimDate.getDate() + 30));
    let claimDateDay = claimDate.toLocaleDateString("en", { weekday: 'long' });
    claimDate = claimDate.toString().split(' ');
    claimDate.splice(-5)
    claimDate[0] =  claimDateDay+',';
    claimDate[2] =  claimDate[2]+',';
    claimDate = claimDate.join(' ');

    setTimeout(function(){
        $('#ce-instructions-pdf-modal .event-title').text(response.programTitle);
        $('#ce-instructions-pdf-modal [name="event-date"]').val(eventDate);
        $('#ce-instructions-pdf-modal [name="event-time"]').val(response.startTime+' - '+response.endTime);
        $('#ce-instructions-pdf-modal [name="event-location"]').val(response.locationName+', '+response.address+", "+response.city+", "+response.state+", "+response.zipCode);
        $('#ce-instructions-pdf-modal [name="event-credit"]').val((response.creditDetails.join('/')));
        $('#ce-instructions-pdf-modal #claim').val(claimDate);
        $('#ce-instructions-pdf-modal [name="event-short-id"]').text(response.eventIdDisplay?response.eventIdDisplay:response.eventId);
        
        $('#ce-instructions-pdf').on('click', function(e){
            $('#generatePDF').click();
            e.preventDefault();
            e.stopPropagation();
        })

        $('#generatePDF').click(function () {
            const { jsPDF } = window.jspdf;
            let doc = new jsPDF('p', 'pt', 'a4')
            let pdfjs = document.querySelector('#htmlContent');
            doc.html(pdfjs,{
                html2canvas: {
                    scale: 0.60
                },
                callback: function(doc) {
                    doc.save('ANHI-Program-'+getTodayDateShort()+'-'+localStorage.getItem('currProgEventID')+'.pdf');
                },
                x: -8,
                y: 30
            });
        });
    },1000)
}

function getTodayDateShort(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm+dd+yyyy;
    return formattedToday;
}