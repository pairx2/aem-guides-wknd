$(document).ready(function() {

    var noOfAccordians;
	var accordiansOpened;

    $("#faqTabs").parent(".tabs").addClass("faqTabsContainer");
    $(".faqTabsContainer").next(".button").addClass("faqDonationCenter");
    $("#learn-text").parent(".text").addClass("maxWidth-730");
    $("#learn-cards .row .col-12 .featurescard").addClass("bg-pink");
    $("#learn-cards .row .col-12 .featurescard").addClass("thumbnails");
    $("#learn-title").parent(".title").next(".text").addClass("make-an-imapct-text maxWidth-730");
    $("#section_learn-banner").parent(".m-hero").addClass("faqTabsContainer");
    $("#section_learn-banner").parents(".aem-Grid").addClass("learnBanner");
    $(".make-an-imapct-text").next(".button").addClass("makeAnImpact-donate");
    $("#section_faq-banner").parent(".m-hero--medium").addClass("faq-banner");

    $("#faqTabs .m-accordion__content-items .m-accordion__header").click(function(){
        //console.log("clicked individually");
        $(this).find("h3").toggleClass("bold");

		noOfAccordians = $("#faqTabs .cmp-tabs__tabpanel--active .m-accordion__content-items").length;
    	accordiansOpened = $("#faqTabs .cmp-tabs__tabpanel--active .m-accordion__content-items .m-accordion__body.collapse.show").length;

        /*console.log("noOfAccordians:", noOfAccordians);
        console.log("accordiansOpened:", accordiansOpened);*/

        if(noOfAccordians == accordiansOpened+1){
            //console.log("All opened");
            $("#faqTabs .m-accordion__options button.m-accordion__expand-title").hide();
			$("#faqTabs .m-accordion__options button.m-accordion__collapse-title").show();
        }else if(accordiansOpened == 1){
            //console.log("All closed");
            $("#faqTabs .m-accordion__options button.m-accordion__expand-title").show();
			$("#faqTabs .m-accordion__options button.m-accordion__collapse-title").hide();
        }	

    });

    $('.m-accordion__expand-title').click(function(){
        //console.log("You clicked expand all");
        $(".cmp-tabs__tabpanel--active").find(".m-accordion__content-items h3").addClass("bold");
        $(".cmp-tabs__tabpanel--active .m-accordion__options button.m-accordion__collapse-title").show();
        $(".cmp-tabs__tabpanel--active .m-accordion__options button.m-accordion__expand-title").hide();
    });

	$('.m-accordion__collapse-title').click(function(){
        //console.log("You clicked Collapse all");
        $(".cmp-tabs__tabpanel--active").find(".m-accordion__content-items h3").removeClass("bold");
        $(".cmp-tabs__tabpanel--active .m-accordion__options button.m-accordion__collapse-title").hide();
        $(".cmp-tabs__tabpanel--active .m-accordion__options button.m-accordion__expand-title").show();
    });

});