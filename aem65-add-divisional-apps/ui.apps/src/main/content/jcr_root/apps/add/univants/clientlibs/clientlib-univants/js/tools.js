$(document).ready(function() {

    var editorURL = window.location.href;
    var	wcm = window.location.search;
    var editorURLS  = editorURL.split('/');
    if(editorURLS.includes('content') && wcm != "?wcmmode=disabled")
    {
        $(function() {
            $("body *").each(function() {
                $(this).removeClass("hideForm mgForm cycleForm editCyclesForms opacityZero dNone");
                $('#cannot-be-edited').show();
                $('#section-edit-application-cycle').show();
                $('#edit-assessment-cycle').show();
                $('#section-application-cycle-aside').show();
                $('#edit-application-helptext1').show();
                $('#section-judge-assessment-cycle-aside').show();
                $('#edit-application-helptext2').show();
            });
        });
    }

    //Create application cycle error messages hidden
    $('[id=create-app-cycle-specific-error-messages]').addClass("create-app-cycle-specific-error-messages ht-zero");
    $('.create-app-cycle-specific-error-messages').hide();
    $('[id=create-app-cycle-generic-error-message]').hide();

    //Create Assessment cycle error messages hidden
    $('[id=create-assessment-cycle-specific-error-messages]').addClass("create-assessment-cycle-specific-error-messages ht-zero");
    $('.create-assessment-cycle-specific-error-messages').hide();
    $('[id=createassessment-general-error-message]').hide();

    //Edit app cycle error messages hidden
    $('[id=edit-app-cycle-specific-error-messages]').addClass("edit-app-cycle-specific-error-messages ht-zero");
    $('.edit-app-cycle-specific-error-messages').hide();
    $('[id=edit-app-cycle-general-error-message]').hide();

    //Edit assessment cycle error messages hidden
    $('[id=edit-assessment-cycle-specific-error-messages]').addClass("edit-assessment-cycle-specific-error-messages ht-zero");
    $('.edit-assessment-cycle-specific-error-messages').hide();
    $('[id=edit-assessment-cycle-general-error-message]').hide();

    $("#form-create-application-cycle .columncontrol:eq(1)").addClass('datePickerWidth');
    $("#section-welcome-admin-container").parent(".container").addClass("padLR-0");
    $("#section-edit-cycle, #section-manage-organization,  #section-create-report").parent(".container").addClass("zIndexNine");
    $("#section-addJudgeContainer, #section-manage-organization, #section-create-cycle, #section-edit-cycle").addClass('customRadio');

    $("#section-addJudgeContainer, #section-manage-organization, #section-create-cycle, #section-edit-cycle").parent(".container")
        .addClass("padLRTP hideForm");
    $("#section-create-report").parent(".container").addClass("paddingLeftRight hideForm");    
    $("#admintoolTitle .a-dropdown__field").addClass("admin_actions");
    $("#section-addJudgeContainer").attr("data-id", "add_judge");
    $("#section-manage-organization").attr("data-id", "manage_organization");
    $("#section-create-cycle").attr("data-id", "create_cycle");
    $("#section-edit-cycle").attr("data-id", "edit_cycle");
    $("#section-create-report").attr("data-id", "create-report");
    $("#welcome-admin").parent().addClass("marginNone");
    $("#section-welcome-admin-container").parent().addClass("paddingNone");
    $("#admintoolTitle .admin_actions ul li").click(function() {
        var adminValue = $(this).attr("data-optionvalue");
        $(".hideForm").hide();
        $("[data-id=" + adminValue + "]").parent(".container").show();
    });


    // Manage organisation radio buttons
    $("#form-add-organization, #form-deactivate-organization, #form-reactivate-organization").addClass("mgForm");
    $("#form-add-organization").show();
    $("#manage-organization .a-radio:eq(0)").find("label").addClass("mgbtn").attr('val', 'manage1');
    $("#manage-organization .a-radio:eq(1)").find("label").addClass("mgbtn").attr('val', 'manage2');
    $("#manage-organization .a-radio:eq(2)").find("label").addClass("mgbtn").attr('val', 'manage3');

    $("#form-add-organization").attr("data-org", "manage1");
    $("#form-deactivate-organization").attr("data-org", "manage2");
    $("#form-reactivate-organization").attr("data-org", "manage3");

    $('.mgbtn').on('change', function() {
        var mgVal = $(this).attr("val");
        $(".mgForm").hide();
        $("[data-org=" + mgVal + "]").show();
    });

    // Create Cycle radio buttons
    $("#form-create-application-cycle, #form-create-assessment-cycle").addClass("cycleForm");
    $("#form-create-application-cycle").show();
    $("#section-create-cycle .a-radio:eq(0)").find("label").addClass("ccbtn").attr('val', 'createCycle1');
    $("#section-create-cycle .a-radio:eq(1)").find("label").addClass("ccbtn").attr('val', 'createCycle2');
    $("#form-create-application-cycle").attr("data-cycle", "createCycle1");
    $("#form-create-assessment-cycle").attr("data-cycle", "createCycle2");

    $('.ccbtn').on('change', function() {
        var ccVal = $(this).attr("val");
        $(".cycleForm").hide();
        $("[data-cycle=" + ccVal + "]").show();
    });

    $("#section-addJudgeContainer, #section-manage-organization, #section-create-cycle, #section-edit-cycle, #section-create-report").parent(".container").addClass("cancelForm");

    $(".cancelForm #cancel-btn").addClass("cancelResetButton");
    $(".cancelResetButton").click(function(){
        $(this).closest(".cancelForm").hide();
        $("#admintoolTitle").find(".admin_actions span:eq(0)").removeClass("a-dropdown-selected").addClass("a-dropdown__placeholder").text("select");
        $("#admintoolTitle").find(".admin_actions .a-dropdown__menu li").removeClass("selected");
    });

    $("#addJudgeContainer .datepicker").append("<p class='requestFailed alert-danger'>Your request failed. Please try again later.</p>");
	$("#addJudgeContainer .requestFailed").hide();

});
$(document).on("keypress", function(event) {
    var keycode = event.keyCode || event.which;
    if((keycode == "13") && (event.target.nodeName!='TEXTAREA')) {
        setTimeout(function() { 
                ($("button[type=submit]").not("[disabled=disabled]")).each(function(){
                    $(this).click();
                });
        }, 500);
    }
});

