/*---------------Breadcrumb Changes-----------------*/
$(".abbott-breadcrumb").addClass('breadcrumb');
$('#top-blue-banner').addClass('top-blue-banner');
$('.top-blue-banner').closest('.container').addClass('bgBlue');


/*--------------- Common alignment classes -----------------*/
$("#intelligent-insights, #listening-to-needs").closest("section").parent(".container").addClass("container-full-width");
$("#intelligent-insights").closest("section").addClass("insights-banner-conatiner");

/*--------------- Body Content-----------------*/
$("#resourceful-3peopleimage, #tools-and-professional-services, #listening-to-needs").addClass("bodyContent");
$("#section_discovery-banner").parent(".aem-GridColumn").addClass("m-0 p-0 h-auto");
$(".bodyContent").parent().next().next(".a-container__media__mobile").hide();
$("#tools-and-professional-services").closest(".a-container__content").next().next(".a-container__media__mobile").hide();

/*--------------- Banners in the body Content-----------------*/
$("#section_discovery-banner").addClass("bannerSection");

/*---------------Prism-Director-----------------*/
$('#accordion-prism-director-text-panel').parent('.text').parent('.cmp-accordion__panel').parent('.m-accordion__body').removeClass('show');
$('#accordion-prism-director').find('.abt-icon-plus').parent('.m-accordion-icon').addClass('icon-visible');
$('#accordion-prism-director').find('.abt-icon-minus').parent('.m-accordion-icon').removeClass('icon-visible');
$('#prism-director-ainIQ-btn').parent('.button').addClass('explore-btn-blue');

$('#accordion-prism-director .abt-icon-plus').click(function(){
  $('#accordion-prism-director').css('background-color', '#d4f2ff');
});
$('#accordion-prism-director .abt-icon-minus').click(function(){
  $('#accordion-prism-director').css('background-color', '#ffffff');
});
//---------------------------------------
$('#accordion-prism-next-text-panel').parent('.text').parent('.cmp-accordion__panel').parent('.m-accordion__body').removeClass('show');
$('#accordion-prism-next-1').find('.abt-icon-plus').parent('.m-accordion-icon').addClass('icon-visible');
$('#accordion-prism-next-1').find('.abt-icon-minus').parent('.m-accordion-icon').removeClass('icon-visible');

$('#accordion-prism-next-1 .abt-icon-plus').click(function(){
  $('#accordion-prism-next-1').css('background-color', '#d4f2ff');
});
$('#accordion-prism-next-1 .abt-icon-minus').click(function(){
  $('#accordion-prism-next-1').css('background-color', '#ffffff');
});
//--------------------------------------------------------
$('#accordion-prism-next-2-text-panel').parent('.text').parent('.cmp-accordion__panel').parent('.m-accordion__body').removeClass('show');
$('#accordion-prism-next-2').find('.abt-icon-plus').parent('.m-accordion-icon').addClass('icon-visible');
$('#accordion-prism-next-2').find('.abt-icon-minus').parent('.m-accordion-icon').removeClass('icon-visible');

$('#accordion-prism-next-2 .abt-icon-plus').click(function(){
  $('#accordion-prism-next-2').css('background-color', '#d4f2ff');
});
$('#accordion-prism-next-2 .abt-icon-minus').click(function(){
  $('#accordion-prism-next-2').css('background-color', '#ffffff');
});

$('#accordion-prism-next-1').parent('.accordion').addClass('remove-btm-padding');
$('#accordion-prism-next-2').parent('.accordion').addClass('remove-tp-padding');

$('#prism-director-container').addClass('top-blue-banner');
$('.top-blue-banner').closest('.container').addClass('bgBlue');
$('#director-discover-bar').parent('.title').addClass('middle-title');

const mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
const mediaQuery1 = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)')
const mediaQuery2 = window.matchMedia('(min-width: 480px) and (max-width: 767px)')

$('#section-prism-director-img-container').parent('.container').addClass('add-max-with');
$('#section-test-menu-container').parent('.container').addClass('add-max-with');

if (mediaQuery.matches) { 
	$('#section-prism-director-integrated-container').parent('.container').addClass('add-max-with');
}
if (mediaQuery2.matches) { 
	$('#section-prism-director-integrated-container').parent('.container').addClass('add-max-with');
    $('#section-prism-director-img-container').parent('.container').addClass('add-max-with');
    $('#section-process-automation-container').parent('.container').addClass('add-max-with');
    $('#section-test-menu-container').parent('.container').addClass('add-max-with');

    $('#section-contact-us-info-container').parent('.container').addClass('add-max-with');

    $('#section-alinity-new-potential-container').parent('.container').addClass('add-max-with');
 	$('#section-alinity-greater-capacity-container').parent('.container').addClass('add-max-with');

   $('#section-about-personalized-solution-container').parent('.container').addClass('add-max-with');
   $('#section-innovation-card-container').parent('.container').addClass('add-max-with');


}

/*--------------Error page------------------*/
$("#section-error-page-banner-container").parent('.container').addClass('bg-background-color');

/*---------------Prism-Next-----------------*/
$('#abbott-prism-next-container').addClass('top-blue-banner');
$('.top-blue-banner').closest('.container').addClass('bgBlue');
$('#section-process-automation-container').parent('.container').addClass('add-max-with');

/*---------------Alinity-----------------*/
$('#alinity-main-title-container').addClass('top-blue-banner');
$('.top-blue-banner').closest('.container').addClass('bgBlue');
$('#alinity-greater-find-more-btn').parent('.button').addClass('explore-btn-blue');

/*---------------News-Events-----------------*/
$('#news-event-in-the-news').parent('.title').addClass('middle-title');
$('#news-event-calebder-event-bar').parent('.title').addClass('middle-title');
$('#read-abbott-news-btn-1').parent('.a-link').addClass('a-button--tertiary');
$('#read-abbott-news-btn-2').parent('.a-link').addClass('a-button--tertiary');


/*---------------About-Us-Medicine-----------------*/
$('#personalized-solution-button').parent('.button').addClass('explore-btn-green');
$('#personalized-solution-button-1').parent('.button').addClass('explore-btn-green');
$('#personalized-solution-button-2').parent('.button').addClass('explore-btn-green');
$('#about-read-policy-btn').parent('.button').addClass('explore-btn-blue');
$('#cutomer-contact-us-btn').parent('.button').addClass('explore-btn-blue');
$('#about-register-now-btn').parent('.button').addClass('explore-btn-blue');
$('#personalized-contact-us-button').parent('.button').addClass('explore-btn-blue');
$('#personalized-solution-bar').parent('.title').addClass('middle-title');
$('#personalized-customer-bar').parent('.title').addClass('middle-title');

/*---------------Discover Greater Section-----------------*/
$("#discover-greater-section").addClass("discover-greater-section");
$("#section-discover-greater-section").parent(".container").addClass("discover-greater");

/*---------------Listening to your needs in Harmonized Systems-----------------*/
$("#listening-to-needs").closest("section").addClass("listening-container");

/*---------------Unlock Potential Banner in Harmonized Systems-----------------*/
$("#unlock-potential").addClass("unlock-potential");
$("#unlock-potential").closest("section").addClass("unlock-potential-container");


/*---------------PURPOSE-BUILT GREATER Banner in Harmonized Systems-----------------*/
$("#purpose-built-header").parent(".title").addClass("m-0");
$("#purpose-built-section").addClass("purpose-built-section");
$(".purpose-built-section").parent(".columncontrol").addClass("m-0");


/*---------------Back to top-----------------*/
$("#back-to-top").addClass("back-to-top");

/*---------------Prismnext section in Harmonized Systems-----------------*/
$("#prismnext-section").addClass("prismnext-section");
$("#prismnext-section").closest("section").addClass("prismnext-container");


/*--------------- Section Flexibity Banner -----------------*/
$("#section_flexbility-banner").parent(".m-hero--medium").addClass("flexbilityContainer");


function calendarCssFunction (){
    var urlLink = window.location.pathname;
    var stuff = urlLink.split('/');
    var substring = 'news-events.html';

    for(var i=0; i<stuff.length; i++){
        if(stuff[i].includes(substring)){

			setTimeout(function() {
    			$('.litepicker').addClass("open-calendar");
   				const litepicker = document.getElementsByClassName("litepicker");
   				litepicker[0].style.display = "block";
    			litepicker[0].style.position = "absolute";
    			litepicker[0].style.top = "1165.94px";
    			litepicker[0].style.left = "59%";
  		}, 300);

      }
    }
}

$(document).on("click", function (e) {
    e.stopPropagation();
  	$('.litepicker').show();
})

window.onload = function() {
  calendarCssFunction();
};