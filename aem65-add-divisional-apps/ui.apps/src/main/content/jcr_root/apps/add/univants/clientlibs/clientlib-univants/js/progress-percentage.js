function progressPercentage() {

    var fieldCount = 0;
    $(".reqFieldClass").each(function() {

        var dropDownFilled = $(this).find(".a-dropdown__field span:eq(0)").hasClass("a-dropdown-selected");

        if (
            dropDownFilled == true ||

			$(this).find("input[type='radio']").hasClass("selected") ||

			(($.trim($(this).val()) != "" && typeof $.trim($(this).val()) !== "undefined" && typeof $.trim($(this).val()) != undefined) &&
            (!$(this).hasClass('selected') && $(this).attr('type') != 'radio' && $(this).attr('type') != 'checkbox')) ||

            ($(this).attr('aria-checked') == "true")

            ){
                if( $(this).closest(".validation-require").length == 0 && $(this).closest(".validation-regex").length == 0
                && $(this).closest(".validation-error").length == 0){
                    fieldCount++;
                } 
            }

    });

    /*console.log("fieldCount***: ", fieldCount);*/

    var reqClassCount = $(".reqFieldClass").length;
    var percentage;
    var totalPercentage;

    /*console.log("reqClassCount: ", reqClassCount);*/

    if (fieldCount != 0) {
        percentage = (fieldCount / reqClassCount) * 100;
        totalPercentage = Math.round(percentage);
        /*console.log("If percentage: ", totalPercentage);*/
    } else {
        //percentage = fieldCount;
        totalPercentage = fieldCount;
        /*console.log("else percentage: ", totalPercentage);*/
    }

    $(".progressBar .displayPercent").text(totalPercentage);

    //$(".progressBar").loading(totalPercentage);

    /*Project Team tick mark code*/
	var ptMarkCount = 0;
    var ptReqCount;
    $("#application-container-item-0 .reqFieldClass").each(function() {
        var dropDownFilled = $(this).find(".a-dropdown__field span:eq(0)").hasClass("a-dropdown-selected");
        if (
            dropDownFilled == true ||

			$(this).find("input[type='radio']").hasClass("selected") ||

			(($.trim($(this).val()) != "" && typeof $.trim($(this).val()) !== "undefined" && typeof $.trim($(this).val()) != undefined) &&

            (!$(this).hasClass('selected') && $(this).attr('type') != 'radio' && $(this).attr('type') != 'checkbox'))

            ){
				if( $(this).closest(".validation-require").length == 0 && $(this).closest(".validation-regex").length == 0
                && $(this).closest(".validation-error").length == 0){
                    ptReqCount = ptMarkCount++;
                    if($("#application-container-item-0 .reqFieldClass").length == ptReqCount+1){
                        $("#application-container-item-0-tab").addClass("verified");
                    }else{
                        $("#application-container-item-0-tab").removeClass("verified");
                    }
                }
            }
    });

    /*initiative Tab tick mark code*/
	 $("#application-container-item-1 .reqFieldClass").each(function() {
        if (

			$(this).val() != ""

            ){
				if( $(this).closest(".validation-require").length == 0 && $(this).closest(".validation-regex").length == 0){
                     $("#application-container-item-1-tab").addClass("verified");
                }else{
                     $("#application-container-item-1-tab").removeClass("verified");
              	}
            }else{
                $("#application-container-item-1-tab").removeClass("verified");
           }
    });




    /*Measurable Impact Tab tick mark code*/
	var miMarkCount = 0;
    var miReqCount;
    $("#application-container-item-2 .reqFieldClass").each(function() {
        var dropDownFilled = $(this).find(".a-dropdown__field span:eq(0)").hasClass("a-dropdown-selected");
        if (
            dropDownFilled == true ||

			$(this).find("input[type='radio']").hasClass("selected") ||

			(($.trim($(this).val()) != "" && typeof $.trim($(this).val()) !== "undefined" && typeof $.trim($(this).val()) != undefined) &&

            (!$(this).hasClass('selected') && $(this).attr('type') != 'radio' && $(this).attr('type') != 'checkbox'))

            ){
				if( $(this).closest(".validation-require").length == 0 && $(this).closest(".validation-regex").length == 0
                && $(this).closest(".validation-error").length == 0){
                    miReqCount = miMarkCount++;
                    if($("#application-container-item-2 .reqFieldClass").length == miReqCount+1){
                        $("#application-container-item-2-tab").addClass("verified");
                    }else{
                        $("#application-container-item-2-tab").removeClass("verified");
                    }
                }
            }
    });

    /*Process attributes Tab tick mark code*/
    var paMarkCount = 0;
    var paReqCount;
    $("#application-container-item-3 .reqFieldClass").each(function() {
        var dropDownFilled = $(this).find(".a-dropdown__field span:eq(0)").hasClass("a-dropdown-selected");
        if (
            dropDownFilled == true ||

			$(this).find("input[type='radio']").hasClass("selected") ||

			(($.trim($(this).val()) != "" && typeof $.trim($(this).val()) !== "undefined" && typeof $.trim($(this).val()) != undefined) &&

            (!$(this).hasClass('selected') && $(this).attr('type') != 'radio' && $(this).attr('type') != 'checkbox'))

            ){
                if( $(this).closest(".validation-require").length == 0 && $(this).closest(".validation-regex").length == 0
                && $(this).closest(".validation-error").length == 0){
                	paReqCount = paMarkCount++;
                    if($("#application-container-item-3 .reqFieldClass").length == paReqCount+1){
                        $("#application-container-item-3-tab").addClass("verified");
                    }else{
                        $("#application-container-item-3-tab").removeClass("verified");
                    }
                }
            }
    });

    /*Confirmation Tab tick mark code*/
    var confirmationMarkCount = 0;
    var confirmationReqCount;
    $("#application-container-item-4 .reqFieldClass").each(function() {

        if ( 
			$(this).attr('aria-checked') == "true"
           ){
				if( $(this).closest(".validation-require").length == 0 ){
                	confirmationReqCount = confirmationMarkCount++;
                    if($("#application-container-item-4 .reqFieldClass").length == confirmationReqCount+1){
                        $("#application-container-item-4-tab").addClass("verified");
                    }else{
                        $("#application-container-item-4-tab").removeClass("verified");
                    }
              }else{
                        $("#application-container-item-4-tab").removeClass("verified");
                    }
            }
    });

}


$(document).ready(function() {
	$("#application-container .cmp-tabs__tab").addClass("application-save-draft");

    var initialPercentage = 0;

    $("#contact-award").prepend("<div class='progressBar'><div class='displayPercent'> " + initialPercentage + " </div></div>");
    $(".progressBar").append("<h6 class='yourProgress'>Your Progress</h6>");

    $("#application-form-container, #thank-you-container").closest("#section-login-container").parent(".container").nextAll(".experiencefragment:eq(1)").find("#contact-award .progressBar").show();
	$("#thank-you-container").closest("#section-login-container").parent(".container").nextAll(".experiencefragment:eq(1)").find("#contact-award .progressBar .displayPercent").text("100");

    /*$("#application-form-container").append("<div class='progressBar'></div>");
    $(".progressBar").append("<div>Your Progress<div>");*/

    $("#add-partner").addClass("showFields");
    $("#application-container-item-2 .m-accordion__content").find(".m-accordion__content-items:eq(0)").find(".m-accordion__header").addClass("showPatientFields");
    $("#application-container-item-2 .m-accordion__content").find(".m-accordion__content-items:eq(1)").find(".m-accordion__header").addClass("showClinicianFields");
    $("#application-container-item-2 .m-accordion__content").find(".m-accordion__content-items:eq(2)").find(".m-accordion__header").addClass("showAdminFields");
    $("#application-container-item-2 .m-accordion__content").find(".m-accordion__content-items:eq(3)").find(".m-accordion__header").addClass("showPayorFields");

    $(".showPatientFields, .showClinicianFields, .showAdminFields, .showPayorFields").next(".m-accordion__body").addClass("miTabs");

    $("#remove-partner").addClass("hideFields");

    $("#application-container-item-0").addClass("application-form-container");
    $("#application-container-item-2").addClass("application-form-container2");
    $("#application-container-item-3").addClass("application-form-container3");

    $("#application-container-item-0 input[type='radio']").closest("fieldset").addClass("reqFieldClass");
    $(".application-form-container2 input[type='radio']").closest("fieldset").addClass("reqFieldClass");
    $(".application-form-container3 input[type='radio']").closest("fieldset").addClass("reqFieldClass");

    /*For First Tab*/
    $(".application-form-container input[required], .application-form-container textarea[required], .application-form-container .a-dropdown[data-required='true']")
        .each(function(reqdValIndex, reqdVal) {
            $(reqdVal).filter(':visible').addClass('reqFieldClass');
        });

    $(".showFields").click(function() {
        $(".application-form-container input[required], .application-form-container textarea[required], .application-form-container .a-dropdown[data-required='true']")
            .each(function(reqdValIndex, reqdVal) {
                $(reqdVal).filter(':visible').addClass('reqFieldClass');
            });
    });

    $(".hideFields").click(function() {
        $(".application-form-container input[required], .application-form-container textarea[required], .application-form-container .a-dropdown[data-required='false']")
            .each(function(reqdValIndex, reqdVal) {
                $(reqdVal).filter(":hidden").removeClass('reqFieldClass');
            });
    });

    /*For initiative Tab*/
    $("#application-container-item-1 textarea[required]").addClass('reqFieldClass');

    /*For Third Tab*/
    $(".application-form-container2 input[required], .application-form-container2 textarea[required], .application-form-container2 .a-dropdown[data-required='true']")
        .each(function(reqdValIndex, reqdVal) {
            $(reqdVal).addClass('reqFieldClass');
        });

    $(".showPatientFields, .showClinicianFields, .showAdminFields, .showPayorFields").on('click', function() {

        $(this).next().find(".a-radio:eq(0)").addClass("quantitative");
        $(this).next().find(".a-radio:eq(1)").addClass("qualitative");

        $(this).next().find("#section-patient0-quantitative-measure-container").addClass("quantitativeContainer");
        $(this).next().find("#section-patient0-qualitative-measure-container").addClass("qualitativeContainer");

        $(document).on('click', ".quantitative .a-radio__label", function() {
            $(this).closest(".options").nextAll(".container:eq(0)").find(".quantitativeContainer").find("textarea[required]").addClass('reqFieldClass');
            $(this).closest(".options").nextAll(".container:eq(1)").find(".qualitativeContainer").find("textarea[required]").removeClass('reqFieldClass');
            $(this).closest(".options").find(".qualitative input[type='radio']").removeClass('reqFieldClass');
        });

        $(document).on('click', ".qualitative .a-radio__label", function() {
            $(this).closest(".options").nextAll(".container:eq(0)").find(".quantitativeContainer").find("textarea[required]").removeClass('reqFieldClass');
            $(this).closest(".options").nextAll(".container:eq(1)").find(".qualitativeContainer").find("textarea[required]").addClass('reqFieldClass');
            $(this).closest(".options").find(".quantitative input[type='radio']").removeClass('reqFieldClass');
        });

    });

    /*For Fourth Tab*/
    $(".application-form-container3 input[required], .application-form-container3 textarea[required], .application-form-container3 .a-dropdown[data-required='true']")
        .each(function(reqdValIndex, reqdVal) {
            $(reqdVal).addClass('reqFieldClass');
        });


    $("#confirmation-tab").find(".a-checkbox__custom").addClass("reqFieldClass");


    function confirmationCheckBox(allCheckboxes){
		var allcheckbox = allCheckboxes.length;
		var confirmationCheckBoxCount = 1;
        $(allCheckboxes).each(function(){
            if($(this).attr('aria-checked') == 'true'){
                var checkCount = confirmationCheckBoxCount++;
                if(checkCount == allcheckbox){
                    $("#confirmation-tab").find("fieldset").removeClass("validation-require");
                }
            }
        });
    }

    $("#confirmation-tab .a-checkbox__label").change(function(){
       confirmationCheckBox($("#confirmation-tab .a-checkbox__label .reqFieldClass"));
    });



    /*console.log("reqFieldClass length: ", $(".reqFieldClass").length);*/

    $(".application-save-draft").click(function() {
        progressPercentage();
    });

    $(".miTabs").click(function(){
        $(".miTabs .a-radio__input").each(function(radioI, radioBtn) {
            if (($(radioBtn).attr('value') == "quantitative") && ($(radioBtn).hasClass("selected"))) {
                $(this).closest(".options").nextAll(".container:eq(0)").find("section").find("textarea[required]").addClass('reqFieldClass');
                $(this).closest(".options").nextAll(".container:eq(1)").find("section").find("textarea[required]").removeClass('reqFieldClass');
            }else if (($(radioBtn).attr('value') == "qualitative") && ($(radioBtn).hasClass("selected"))) {
                $(this).closest(".options").nextAll(".container:eq(0)").find("section").find("textarea[required]").removeClass('reqFieldClass');
                $(this).closest(".options").nextAll(".container:eq(1)").find("section").find("textarea[required]").addClass('reqFieldClass');
            }
        });
    })
    //$(".progressBar").loading(initialPercentage);

});
