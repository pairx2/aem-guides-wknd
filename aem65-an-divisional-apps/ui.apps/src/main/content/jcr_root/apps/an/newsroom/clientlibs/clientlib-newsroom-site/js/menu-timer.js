function selfQuizV1() {    
    $(".o-form-container--selfquiz .btn").click(function(){
        let value=$("input[name='choice']:checked").val();
        if(value=="val1"){
         let result=$("input[name='successMessage']").val();

            let result1 = result.split(" ");
            let text="";
            for(let _i=3;_i<result1.length;_i++){
                text=text+result1[_i]+" ";
            }
           $(".o-form-container--selfquiz .radio .a-radio-label").append('<div class="content-true"></div>');
           $( ".content-true" ).html( "<p>" + result1[0]+" " +result1[1]+" " +result1[2] + "</p>");
           $(".content-true").after('<div class="content-true-text"></div>');
           $( ".content-true-text" ).html( "<p>" + text + "</p>");

             $(".o-form-container--selfquiz .a-radio--vertical").css("display","none");
             $(".o-form-container--selfquiz .a-button").css("display","none");
        }

        if(value=="val2"){
           let resultt=$("input[name='failureMessage']").val();
             let result_1 = resultt.split(" ");
            let _text="";
            for(let __i=3;__i<result_1.length;__i++){
                _text=_text+result_1[__i]+" ";
            }
           $(".o-form-container--selfquiz .radio .a-radio-label").append('<div class="content-false"></div>');
           $( ".content-false" ).html( "<p>" + result_1[0]+" "+result_1[1]+" "+ result_1[2] + "</p>");
           $(".content-false").after('<div class="content-false-text"></div>');
           $( ".content-false-text" ).html( "<p>" + _text + "</p>");
              $(".a-radio--vertical").css("display","none");
             $(".a-button").css("display","none");
        }
    });
}
function selfQuizV2ProgressBar() {    
    //progress bar 60%-40%
    $(".o-form-container--selfquizv2.o-progressbar-60-40 .btn").click(function(){
        let value=$("input[name='choice']:checked").val();
        if(value=="val1"||value=="val2"){
           $(".o-form-container--selfquizv2.o-progressbar-60-40 .radio .a-radio-label").append('<div class="result"></div>');
           $( ".o-progressbar-60-40 .result" ).append('<div class="yes">Yes</div>');
           $( ".o-progressbar-60-40 .result" ).append('<div class="ans1"></div>');
           $( ".o-progressbar-60-40 .ans1" ).append('<div class="progress-bar1"></div>');
           $( ".o-progressbar-60-40 .ans1" ).append('<span class="percent-view-yes">(40%)</div>');

           $( ".o-progressbar-60-40 .result" ).append('<div class="No">No</div>');
           $( ".o-progressbar-60-40 .result" ).append('<div class="ans2"></div>');
           $( ".o-progressbar-60-40 .ans2" ).append('<div class="progress-bar2"></div>');
           $( ".o-progressbar-60-40 .ans2" ).append('<span class="percent-view-no">(60%)</div>');

             $(".o-form-container--selfquizv2.o-progressbar-60-40 .a-radio--vertical").css("display","none");
             $(".o-form-container--selfquizv2.o-progressbar-60-40 .a-button").css("display","none");
        }

     });
   //progress bar 75%-25%
      $(".o-form-container--selfquizv2.o-progressbar-75-25 .btn").click(function(){
        let value=$("input[name='choice']:checked").val();
        if(value=="val1"||value=="val2"){
           $(".o-form-container--selfquizv2.o-progressbar-75-25 .radio .a-radio-label").append('<div class="result"></div>');
           $( ".o-progressbar-75-25 .result" ).append('<div class="yes">Yes</div>');
           $( ".o-progressbar-75-25 .result" ).append('<div class="ans1"></div>');
           $( ".o-progressbar-75-25 .ans1" ).append('<div class="progress-bar1"></div>');
           $( ".o-progressbar-75-25 .ans1" ).append('<span class="percent-view-yes">(75%)</div>');

           $( ".o-progressbar-75-25 .result" ).append('<div class="No">No</div>');
           $( ".o-progressbar-75-25 .result" ).append('<div class="ans2"></div>');
           $( ".o-progressbar-75-25 .ans2" ).append('<div class="progress-bar2"></div>');
           $( ".o-progressbar-75-25 .ans2" ).append('<span class="percent-view-no">(25%)</div>');

             $(".o-form-container--selfquizv2.o-progressbar-75-25 .a-radio--vertical").css("display","none");
             $(".o-form-container--selfquizv2.o-progressbar-75-25 .a-button").css("display","none");
        }

     });
   //progress bar 45%-21%-33%
        $(".o-form-container--selfquizv2.o-progressbar-45-21-33 .btn").click(function(){
        let value=$("input[name='choice']:checked").val();
        if(value=="val1"||value=="val2"|| value=="val3"){
           $(".o-form-container--selfquizv2.o-progressbar-45-21-33 .radio .a-radio-label").append('<div class="result"></div>');
           $( ".o-progressbar-45-21-33 .result" ).append('<div class="value-4-5">4-5</div>');
           $( ".o-progressbar-45-21-33 .result" ).append('<div class="ans1"></div>');
           $( ".o-progressbar-45-21-33 .ans1" ).append('<div class="progress-bar1"></div>');
           $( ".o-progressbar-45-21-33 .ans1" ).append('<span class="percent-view-45">(45%)</div>');

           $( ".o-progressbar-45-21-33 .result" ).append('<div class="value-6-7">6-7</div>');
           $( ".o-progressbar-45-21-33 .result" ).append('<div class="ans2"></div>');
           $( ".o-progressbar-45-21-33 .ans2" ).append('<div class="progress-bar2"></div>');
           $( ".o-progressbar-45-21-33 .ans2" ).append('<span class="percent-view-21">(21%)</div>');

           $( ".o-progressbar-45-21-33 .result" ).append('<div class="value-8-more">8 or more</div>');
           $( ".o-progressbar-45-21-33 .result" ).append('<div class="ans3"></div>');
           $( ".o-progressbar-45-21-33 .ans3" ).append('<div class="progress-bar3"></div>');
           $( ".o-progressbar-45-21-33 .ans3" ).append('<span class="percent-view-33">(33%)</div>');

             $(".o-form-container--selfquizv2.o-progressbar-45-21-33 .a-radio--vertical").css("display","none");
             $(".o-form-container--selfquizv2.o-progressbar-45-21-33 .a-button").css("display","none");
        }

     });
}
function dropDownClick() {    
   let i_ = 0;
   $('.dropdown').on("click",function(){

       $(".dropdown-active").each(function(){
           if ($(".dropdown").parents(".m-mega-menu__mobile-item").hasClass('dropdown-active')) {
               $(".dropdown").parents(".m-mega-menu__mobile-item").removeClass("dropdown-active");
           }
       });

          i_++;

       if(i_==3){
          i_ = 1;
       }
       if(i_ ==1){
             $(this).parents(".m-mega-menu__mobile-item").addClass("dropdown-active");
       }else{
            $(this).parents(".m-mega-menu__mobile-item").removeClass("dropdown-active")
       }
   });
}
function h1(){
    $('.active-submenu a').css({backgroundColor: "#a6a8aa", color: "#fff" });
}
function nutritionCare(url1, url2) {
    
    if(url1.includes("index") ||url2.includes("index")){
		$(".m-mega-menu__mobile-item-wrapper").removeClass("active");
		}
	if(url1.includes("illness") ||url2.includes("illness")){     
        $("#nutrition-care-submenu-01").addClass("active-submenu");
          $("#nutrition-care-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("surgery-hospitalization") ||url2.includes("surgery-hospitalization")){
        $("#nutrition-care-submenu-02").addClass("active-submenu");
          $("#nutrition-care-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("chronic-conditions") ||url2.includes("chronic-conditions")){ 
        $("#nutrition-care-submenu-03").addClass("active-submenu");
          $("#nutrition-care-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }
}
function pregnancyChildHood(url1, url2) {    
    if(url1.includes("prenatal-breastfeeding") ||url2.includes("prenatal-breastfeeding")){ 
        $("#pregrency-submenu-01").addClass("active-submenu");
           $("#pregnancy-childhood-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("infant-toddler") ||url2.includes("infant-toddler")){ 
        $("#pregrency-submenu-02").addClass("active-submenu");
          $("#pregnancy-childhood-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("kids-growth") ||url2.includes("kids-growth")){ 
        $("#pregrency-submenu-03").addClass("active-submenu");
          $("#pregnancy-childhood-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }
}
function healthyLiving(url1, url2) {    
    if(url1.includes("diet-wellness") ||url2.includes("diet-wellness")){ 
        $("#healty-living-submenu-01").addClass("active-submenu");
          $("#healthy-living-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("active-lifestyle") ||url2.includes("active-lifestyle")){ 
        $("#healty-living-submenu-02").addClass("active-submenu");
          $("#healthy-living-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("aging-well") ||url2.includes("aging-well")){ 
        $("#healty-living-submenu-03").addClass("active-submenu");
          $("#healthy-living-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

}
function malNutrition(url1, url2) {
    if(url1.includes("global-issue") ||url2.includes("global-issue")){ 
        $("#malnutrition-submenu-01").addClass("active-submenu");
         $("#malnutrition-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }
}
function newsResearch(url1, url2) {
    if(url1.includes("science-news") ||url2.includes("science-news")){ 
        $("#newssearch-submenu-01").addClass("active-submenu");
          $("#news-research-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("expert-views") ||url2.includes("expert-views")){ 
        $("#newssearch-submenu-02").addClass("active-submenu");
          $("#news-research-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("global-nutrition") ||url2.includes("global-nutrition")){ 
        $("#newssearch-submenu-03").addClass("active-submenu");
          $("#news-research-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }
}
function mediaCenter(url1, url2) {
    if(url1.includes("our-experts") ||url2.includes("our-experts")){ 
        $("#media-center-submenu-01").addClass("active-submenu");
         $("#media-center-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("press-releases") ||url2.includes("press-releases")){ 
        $("#media-center-submenu-02").addClass("active-submenu");
         $("#media-center-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("asset-library") ||url2.includes("asset-library")){ 
        $("#media-center-submenu-03").addClass("active-submenu");
         $("#media-center-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }

    if(url1.includes("press-contacts") ||url2.includes("press-contacts")){ 
        $("#media-center-submenu-04").addClass("active-submenu");
         $("#media-center-menu").parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
        h1();
    }
}

$(document).ready(function() {
    $(".a-radio__label").click(function(){            
            $('input[name="choice"]').attr("checked", "checked");
        });
	let checkboxLabel = $('.options.o-form-option--base label');
    for(const element of checkboxLabel) {
        if(!(element.textContent)) {
			element.className = 'd-none';
        }
    }
    //selfquiz v1
    selfQuizV1();

    //self quiz v2
    selfQuizV2ProgressBar();

    $(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
                let targetEl = e.target, respectiveLi = targetEl.closest('li');
                $(respectiveLi).find('[data-js-component="mega-menu"]').show();
                $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
            }, function (e) {
                let targetEl = e.target, respectiveLi = targetEl.closest('li');
                $(respectiveLi).find('[data-js-component="mega-menu"]').hide();
                $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
            });

    /*remove href for nutrition text*/
    $(".o-header .m-signup .a-link__text").removeAttr("href");


    /*remove filter*/
    $("#removealfilter").click(function(){
    $(".a-checkbox__input").prop('checked', false);
    });

    /*Breadcrumb */
    $('.a-breadcrumb--active').prev().css("display","block");

    //article headline href

    $('.a-contentfragment--base .article-ahnchor').click(function(){ return false});

 //scroll
    $('button.navbar-toggler').on('click', function () {
        setTimeout(() => {
            if ($('.navbar-collapse').css('display') == 'block') {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'auto');
            }
        }, 0);
    });



    /*Email subscription*/
     $('.subscribe-btn').attr('formtarget', '_blank');

    //MEGA-MENU
    $(".m-mega-menu__item.m-mega-menu__mobile-item .m-mega-menu__mobile-header").after('<div class="dropdown"></div>');
    dropDownClick();

    //link 
    $(".m-mega-menu__mobile-header").click(function(){
        let link=$(this).parent().siblings(".m-mega-menu__item ").children("a").attr("href");
        $(this).attr("href", link);

    });    

    // header navigation 
    let pgurl = $(location).attr('href').split( '/' );
    let url1=pgurl[ pgurl.length - 1 ] ; 
    let url2=pgurl[ pgurl.length - 2 ] ;

    //nutrition-care
    nutritionCare(url1, url2);

    //pregnancy & childwood
    pregnancyChildHood(url1, url2);


    //healthy living
    healthyLiving(url1, url2);

    //malnutrition
    malNutrition(url1, url2);

    //news & research 
    newsResearch(url1, url2);

    //media-center
    mediaCenter(url1, url2);

//header mega-menu

      $('.a-logo-comp--image').click(function (){ 
         localStorage.clear();
         $(".m-mega-menu__mobile-item-wrapper").removeClass("active");
    });

     $("#nutrition-care-menu").click(function () {
        let id = "nutrition-care-menu";
         localStorage.clear();
         localStorage.setItem("item", id);

    });
    $("#pregnancy-childhood-menu").click(function () {      
        let id = "pregnancy-childhood-menu";
         localStorage.clear();
         localStorage.setItem("item", id);

    });

     $("#healthy-living-menu").click(function () {      
        let id = "healthy-living-menu";
         localStorage.clear();
         localStorage.setItem("item", id);

    });
      $("#malnutrition-menu").click(function () {      
        let id = "malnutrition-menu";
         localStorage.clear();
         localStorage.setItem("item", id);

    });
      $("#news-research-menu").click(function () {      
        let id = "news-research-menu";
         localStorage.clear();
         localStorage.setItem("item", id);

    });
      $("#media-center-menu").click(function () {      
        let id = "media-center-menu";
         localStorage.clear();
         localStorage.setItem("item", id);

    });


 let item = localStorage.getItem('item');
            if (item !=null) {
            $('#' + item).find("active").removeClass("active");
            $('#' + item).parents(".m-mega-menu__mobile-item-wrapper").addClass("active");
			localStorage.clear();
            return;
        }

$('.o-base--resource.featurescard').each(function() {
	let featureHref = $(this).find('.cmp-title__link').attr('href');
	$(this).find('.o-features-card').attr("href",featureHref);
	$(this).find('.o-features-card').click(function () {
		window.open($(this).attr("href"), '_self');
	});
});
});
