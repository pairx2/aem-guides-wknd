
$(document).ready(function(){
	$('#section-tab-field-content').parent().addClass('tab-page-content');
	$('#discover-field-main').parent().addClass('discover-main');
	$('#features-text-main').parent().addClass('features-discover');
	$('#explore-field-main').parent().addClass('explore-main');
	$('#explore-text-main').parent().addClass('features-explore');
	$("#pageContent .m-hero.m-hero--light").parents("#pageContent").find(".abbott-breadcrumb").addClass("light-breadcrumb");
	$('#pageContent').children('.abbott-breadcrumb:nth-child(1)').hide();
    $('#section-globe_language').parents('.container').addClass('country-selector-container');
    $("#contact-us").parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
    $("#section-chromosome-table").parent(".container").addClass("table-chromosome");
    $("#popular-home").parents(".container").addClass("parent-popular-home");
    $("#section_knowledge-banner").parent().addClass("parent-knowledge-banner");
    $("#section_alinity-mp-banner").parent().addClass("parent-alinity-mp-banner");

    /***** Order-microscope-filters form*****/
    $("#no-to-hide").hide();
    $("#no-to-hide").addClass("hide-no");
    var no_radio = document.querySelector("#filter-order-form .a-radio--default .a-radio__custom");
    var yes_radio = document.querySelector("#filter-order-form .a-radio--selected .a-radio__custom");
    $(yes_radio).click(function(){
        $("#no-to-hide").hide();
    });
    $(no_radio).click(function(){
        $("#no-to-hide").show();
    });

	$('#bandpass-filter').addClass('bandpass-filter');
    $('#click-to-clone').addClass('addfilters');
    $('#bandpass-title').addClass('bandpass-title');
	
    //Alinity-m-instrument Video Banner*/
	var bannerAlinityContainer = $('#Banner-alinity-video').find('#banner-main--video').addClass('banner-main--video').hasClass('banner-main--video');
    if(bannerAlinityContainer == true){
        //Alinity-m-instrument Video Part//
        $("#banner-main--video").find(".a-video__player-source").attr('id', 'myVideo');
        var vid = document.getElementById("myVideo");
        vid.muted = true;
        vid.play();
    }

    $(document).on("click", ".bandpass-filter", function(e) { 
        var filterclone;
	    var countfilter;
        var titleclone;
        var countfilter1;
			countfilter = $('.addfilters:visible').length + 1;
            countfilter1 = $('.bandpass-title:visible').length + 1;
			if (countfilter <= 100) {
				filterclone = $('.addfilters:eq(0)').clone().addClass('addfilters');
                titleclone = $('.bandpass-title:eq(0)').clone().addClass('bandpass-title');
				filterclone.find('#bandpass-filter').show();
                titleclone.find('#bandpass-title').show();
				var newIDattr = $('.addfilters:eq(0)').attr('id');
                var newIDattr1 = $('.bandpass-title:eq(0)').attr('id');
				var Idreplaced = newIDattr.slice(0, -1) + (countfilter - 1);
                var Idreplaced1 = newIDattr1.slice(0, -1) + (countfilter1 - 1);
				filterclone.attr('id', Idreplaced);
                titleclone.attr('id', Idreplaced1);
                titleclone.insertAfter('.addfilters:last');
                $('#' + Idreplaced1).find(".titleadd").text(countfilter1);
                $('#' + Idreplaced1).find(".titlehide").addClass("d-none");
                filterclone.insertAfter('.bandpass-title:last');
            }
        e.preventDefault();
    });
    /***** Order-microscope-filters form*****/
    
    var redirect = $("#redirect-click-fun").find("h4").children("a").attr("href");
    var redirect1 = $("#redirect-click-fun1").find("h4").children("a").attr("href");
    var redirect2 = $("#redirect-click-fun2").find("h4").children("a").attr("href");
    $("#redirect-click-fun").click(function(){
        window.location.href = redirect;
    });
    $("#redirect-click-fun1").click(function(){
        window.location.href = redirect1;
    });
    $("#redirect-click-fun2").click(function(){
        window.location.href = redirect2;
    });

      /* vysis fish faq */

    $('.m-accordion__header').click(function(){
        var a = $(this).children('.m-accordion__icon-wrapper').children('.m-accordion-toggle').attr('data-toggle');
        if(a == 'expand'){
            $(this).parent('.m-accordion__content-items').addClass('accordionTitlebackground');
        }else{
            $(this).parent('.m-accordion__content-items').removeClass('accordionTitlebackground');
        }
    });
    $('#print').click(function(){
        window.print();
    });

      /* vysis fish faq */





	$('.cmp-container').each(function() {
		var $this = $(this);

	   if($(this).attr('style') == 'background-color:#d9d9d6;'){
		   console.log("inside");
			 //console.log($(this).attr('style') == 'background-color:#d9d9d6;');
		 $this.parents('.container').addClass("container-bg-color");
	   }
	 })

    /* attribute for max length in all input fields*/
    
    $('.fields input').attr("maxlength","40");
    $('.fields input[name="lastName"]').attr("maxlength","80");
    $('.fields input[name="street"]').removeAttr("maxlength","80");

});
$('#scroll-to-top').click(function() {
   $('html, body').animate({
        scrollTop: $("#section_text-top-function, #text-top-function").offset().top
    }, 1000);
});


$('#redirect-click-fun,  #redirect-click-fun1, #redirect-click-fun2').click(function(){
    $(this).addClass('color-changing');
    return false;
});

$(".o-form-container__success-msg").hide();


$('.options ul[name="state"]').parents('.options ').hide();
$('.options ul[name="state"]').parents(".a-dropdown").attr("data-required","false");

$('.options ul[name="state"], .options ul[name="shippingstate"]').parents('.options ').hide();
$('.options ul[name="state"], .options ul[name="shippingstate"]').parents(".a-dropdown").attr("data-required","false");

$('ul[name="country"] li').click(function(){
    var country = $(this).children("span:nth-child(1)").html();
    if(country == ' United States'){
        $('.form-container .options ul[name="state"]').parents('.options ').show();
        $('.options ul[name="state"]').parents(".a-dropdown").attr("data-required","true");
    }else{
        $('.form-container .options ul[name="state"]').parents('.options ').hide();
        $('.options ul[name="state"]').parents(".a-dropdown").attr("data-required","false");
    }
});

$('ul[name="shippingCountry"] li').click(function(){
    var country1 = $(this).children("span:nth-child(1)").html();
    if(country1 == ' United States'){
        $('.form-container .options ul[name="shippingstate"]').parents('.options ').show();
        $('.options ul[name="shippingstate"]').parents(".a-dropdown").attr("data-required","true");
    }else{
        $('.form-container .options ul[name="shippingstate"]').parents('.options ').hide();
        $('.options ul[name="shippingstate"]').parents(".a-dropdown").attr("data-required","false");
    }
});

$(".probeorderinfo").parent('.cmp-container').attr("id", "probeorderscroll");
$("#probeorderscroll").parents('body').prepend("<div class='loader-parent' style='display: none;'><em class='abt-icon abt-icon-spinner'></em></div>");
$("#alinityImage").parents(".image--align-left").css("border","0");

$(".probecontainer").attr("id", "probe-maps");
$(".ordercontainer").attr("id", "order-maps");
//scrolling issue fix
$(".tab-content ul li a").click(function(e){
    e.preventDefault();
    var currLink = $(this).attr("href");
    var linkoffset = $(currLink).offset();    
     var currLinkffset = (linkoffset.top)-130;    
     window.scrollTo(0,currLinkffset);
});
$('a').each(function(){
    if($(this).attr("href") == "#order-maps"){
        $(this).attr("id","viewOrdering");
    }
    else if($(this).attr("href") == "#probe-maps"){
        $(this).attr("id","viewProbeinfo");
    }
 });
 $(document).on("click", "#viewOrdering", function(e) {
     e.preventDefault();	
     var posoffset = $('#order-maps').offset();    
     var curroffset = (posoffset.top)-200;	
     window.scrollTo(0,curroffset);
 });
 $(document).on("click", "#viewProbeinfo", function(e) {
     e.preventDefault();	
     var probeposoffset = $('#probe-maps').offset();    
     var probecurroffset = (probeposoffset.top)-200;	
     window.scrollTo(0,probecurroffset);
 });
 $("#allFish-column .text p a").click(function(e){
    e.preventDefault();
    var currtabLink = $(this).attr("href");
    var taboffset = $(currtabLink).offset();    
     var currTabLinkffset = (taboffset.top)-275;    
     window.scrollTo(0,currTabLinkffset);
 });
 $("#urovysion-add-page ul li a").click(function(e){
    e.preventDefault();
    var curruroLink = $(this).attr("href");
    if(curruroLink.length>0){
        var taburoffset = $(curruroLink).offset();    
        var currUroLinkffset = (taburoffset.top)-125;    
        window.scrollTo(0,currUroLinkffset);
    }
    
});
var value = $("#tab-field-content").find("#navigation").find("p a");
$(value).click(function(){
    var hrefValue = $(this).attr("href");
    if(hrefValue == '#discovery'){
        $("#tab-field-content").find(".cmp-tabs__tablist a").removeClass("active show");
        $("#tab-field-content").find(".cmp-tabs__tablist a:first-child").addClass("active show");
        $("#tab-field-content").find(".tab-content .tab-pane").removeClass("active");
        $("#tab-field-content").find(".tab-content .tab-pane:first-child").addClass("active");
    }else if(hrefValue == '#analytics'){
        $("#tab-field-content").find(".cmp-tabs__tablist a").removeClass("active show");
        $("#tab-field-content").find(".cmp-tabs__tablist a:nth-child(2)").addClass("active show");
        $("#tab-field-content").find(".tab-content .tab-pane").removeClass("active");
        $("#tab-field-content").find(".tab-content .tab-pane:nth-child(2)").addClass("active");
    }else if(hrefValue == '#insights'){
        $("#tab-field-content").find(".cmp-tabs__tablist a").removeClass("active show");
        $("#tab-field-content").find(".cmp-tabs__tablist a:nth-child(3)").addClass("active show");
        $("#tab-field-content").find(".tab-content .tab-pane").removeClass("active");
        $("#tab-field-content").find(".tab-content .tab-pane:nth-child(3)").addClass("active");
    }else if(hrefValue == '#action'){
        $("#tab-field-content").find(".cmp-tabs__tablist a").removeClass("active show");
        $("#tab-field-content").find(".cmp-tabs__tablist a:nth-child(4)").addClass("active show");
        $("#tab-field-content").find(".tab-content .tab-pane").removeClass("active");
        $("#tab-field-content").find(".tab-content .tab-pane:nth-child(4)").addClass("active");
    }else if(hrefValue == '#monitoring'){
        $("#tab-field-content").find(".cmp-tabs__tablist a").removeClass("active show");
        $("#tab-field-content").find(".cmp-tabs__tablist a:nth-child(5)").addClass("active show");
        $("#tab-field-content").find(".tab-content .tab-pane").removeClass("active");
        $("#tab-field-content").find(".tab-content .tab-pane:nth-child(5)").addClass("active");
    }
});

var bioview = $("#application-details").children("a");
$(bioview).click(function(){
    var hrefValue = $(this).attr("href");
    if(hrefValue == "#applicationdetails"){
        $("#application-details").parents().find(".cmp-tabs__tablist a").removeClass("active show cmp-tabs__tab--active");
        $("#application-details").parents().find(".cmp-tabs__tablist a:nth-child(2)").addClass("active show cmp-tabs__tab--active");
        $("#application-details").parents().find(".tab-content .tab-pane").removeClass("active");
        $("#application-details").parents().find(".tab-content .tab-pane:nth-child(2)").addClass("active");
    }
});

var uroysin = $("#specifications").children("a");
$(uroysin).click(function(){
    var hrefValue = $(this).attr("href");
    if(hrefValue == "#specifications"){
        $("#specifications").parents().find(".cmp-tabs__tablist a").removeClass("active show cmp-tabs__tab--active");
        $("#specifications").parents().find(".cmp-tabs__tablist a:nth-child(2)").addClass("active show cmp-tabs__tab--active");
        $("#specifications").parents().find(".tab-content .tab-pane").removeClass("active");
        $("#specifications").parents().find(".tab-content .tab-pane:nth-child(2)").addClass("active");
    }
    var specOffset = $('.tabs a').offset();    
    var specOffsetVal = (specOffset.top)-150;	
    window.scrollTo(0,specOffsetVal); 
});

//Filter order form bandpass and flurophore dropdown functionality
$("ul[name = 'fluorophores']").parent(".a-dropdown__field").addClass("disabled");
$("ul[name = 'bandpass'] li:first-child").attr("data-optionvalue", "Dual");
$(document).on("click", "ul[name = 'bandpass'] li", function(){
    $("ul[name = 'fluorophores']").parent(".a-dropdown__field").children("span").empty().addClass("a-dropdown__placeholder").text("SELECT FLUROPHORES");
    var bandLi = $(this).attr("data-optionvalue");
    $("ul[name = 'fluorophores'] li").each(function(){
    $("ul[name = 'fluorophores']").parent(".a-dropdown__field").children("span").empty().addClass("a-dropdown__placeholder").text("SELECT FLUROPHORES");
        $("ul[name = 'fluorophores']").parent(".a-dropdown__field").removeClass("disabled");
        var dataList = $(this).attr("data-optionvalue");
        if (dataList.includes(bandLi) != true){
            $(this).hide();
        }else{
            $(this).show();
        }
    });
});
$('#request-form-modal .a-checkbox--vertical .a-checkbox__custom').click(function(e){
    e.preventDefault();
    $('.moda #request-form-modal').parents('body').addClass('modal-open')
})

//Alinity-m-instrument Video Banner*/
$(window).on('load', function(){
	$("#Banner-alinity-video").find(".a-video__player-source").removeAttr("controls");
    $('.modal #request-form-modal').parents('.modal').addClass('requestModal');
    $('.modal #hybrid-image-popup').parents('.modal').addClass('hybrid-image-popup');
    if($('.modal #hybrid-image-popup').parents('.modal').find('.hybrid-image-popup .generic-modal__content').height() > 450){
        $(this).css('overflow-y', 'scroll');
    }else{
        $(this).css('overflow-y', 'hidden');
    }
    $('.modal #site-entering-popup').parents('.modal').addClass('site-entering-popup');
});