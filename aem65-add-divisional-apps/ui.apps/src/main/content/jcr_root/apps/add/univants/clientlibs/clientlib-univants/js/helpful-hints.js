$(document).ready(function() {

    $(".helpfullhint-device").prev(".columncontrol ").find(".container").addClass("applicationDashboard");

    $("#helpful-hint-entry-point .row").find("#section-helpful-hint-container").addClass('opacityZero');
    
    $(document).on( "mouseenter mouseleave","#helpful-hint-entry-point .row", function( event ) {
        $(this).find("#section-helpful-hint-container").toggleClass( "opacityZero" );
      });

	// $("#helpful-hint-entry-point .row").hover(function(){
	// 	$(this).find("#section-helpful-hint-container").removeClass("opacityZero");
	// }, function(){
	// 	$(this).find("#section-helpful-hint-container").addClass("opacityZero");
	// });

	/*Generic ids classes and styles for tab bodies*/
    $("#judge-assessment-tabs").addClass("customRadio");
    $("#section-process-attributes-tab-body").find(".columncontrol").addClass("m-0");
    $("#processatrribute-uniqueness .text:eq(0)").addClass("m-0");
    $("#processatrribute-easeofimplementation .text:eq(0)").addClass("m-0");
    $("#processatrribute-scalability .text:eq(0)").addClass("m-0");
    $("#processatrribute-governance .text:eq(0)").addClass("m-0");
    $("#processatrribute-labintelligence .text:eq(0)").addClass("m-0");
    $("#sectionBody .row").addClass("m-0");
    var tabBodyId = document.querySelectorAll("#sectionBody");

    $(tabBodyId).each(function() {
        $(this).find(".row:eq(0)").find(".col-12:eq(0)").addClass("sectionBody-left");
        $(this).find(".row:eq(0)").find(".col-12:eq(1)").addClass("sectionBody-right");
    });


	/*Previous and Next tab code*/
	$("#section-processatrribute-uniqueness, #section-processatrribute-easeofimplementation, #section-processatrribute-scalability," +
      "#section-processatrribute-governance, #section-processatrribute-labintelligence").parent(".container").addClass("dNone borderGrey processAttrTabs");

    $("#section-processatrribute-uniqueness").parent(".container").show();

    /*Addding id's to tabs heading*/
    $("#judge-assessment-tabs nav").find(".cmp-tabs__tab:eq(0)").attr('id','initiativeTab');
    $("#judge-assessment-tabs nav").find(".cmp-tabs__tab:eq(1)").attr('id','measureableImpactTab');
    $("#judge-assessment-tabs nav").find(".cmp-tabs__tab:eq(2)").attr('id','processAttributeTab');
    $("#judge-assessment-tabs nav").find(".cmp-tabs__tab:eq(3)").attr('id','submitTab');

    /*Addding id's to tab bodies*/
    $("#section-process-attributes-tab-body").closest(".cmp-tabs__tabpanel").attr('id','process-attributes-body-container');

    /*For Process attributes Continue Tabs*/
    $("#unique-continue").click(function(){
        $(this).closest("#section-processatrribute-uniqueness").parent(".container").hide().next().show();
    });

    $("#ease-continue").click(function(){
        $(this).closest("#section-processatrribute-easeofimplementation").parent(".container").hide().next().show();
    });

    $("#scalability-continue").click(function(){
        $(this).closest("#section-processatrribute-scalability").parent(".container").hide().next().show();
    });

    $("#governance-continue").click(function(){
        $(this).closest("#section-processatrribute-governance").parent(".container").hide().next().show();
    });

    $("#laboratory-continue").click(function(){
		$(this).closest("#process-attributes-body-container").removeClass("cmp-tabs__tabpanel--active active")
        .next().addClass("cmp-tabs__tabpanel--active active");
        $("#processAttributeTab").removeClass("cmp-tabs__tab--active show active");
        $("#submitTab").addClass("cmp-tabs__tab--active show active");
     });

    /*For Process attributes Previous Tabs*/

    $("#unique-prev").click(function(){
		$(this).closest("#process-attributes-body-container").removeClass("cmp-tabs__tabpanel--active active")
        .prev().addClass("cmp-tabs__tabpanel--active active");
        $("#processAttributeTab").removeClass("cmp-tabs__tab--active show active");
        $("#measureableImpactTab").addClass("cmp-tabs__tab--active show active");
	});

    $("#ease-prev").click(function(){
		$(this).closest("#section-processatrribute-easeofimplementation").parent(".container").hide().prev().show();
	});

    $("#scalability-prev").click(function(){
        $(this).closest("#section-processatrribute-scalability").parent(".container").hide().prev().show();
    });
    
    $("#governance-prev").click(function(){
        $(this).closest("#section-processatrribute-governance").parent(".container").hide().prev().show();
    });
    
    $("#laboratory-prev").click(function(){
        $(this).closest("#section-processatrribute-labintelligence").parent(".container").hide().prev().show();
    });		



});