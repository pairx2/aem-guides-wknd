function donateButtonFunction (){

    var urlLink = window.location.pathname
    var stuff = urlLink.split('/');
    var substring = 'donate';
    var bcaSub = 'bca';


    const donate_arrow = document.getElementsByClassName("abt-icon-arrow_circle");

    const ul = document.getElementsByClassName("navbar-nav");
    const lastChild = $(ul[0]).children(":last-child")

	donate_arrow[0].style.color = '#FFFFFF';

	const fourChildNode = lastChild[0].querySelector('.a-link__text');
    fourChildNode.style.color = '#FFFFFF';

    const mediaQuery = window.matchMedia('(min-width: 375px) and (max-width: 767px)')
	const mediaQuery1 = window.matchMedia('(min-width: 768px) and (max-width: 991px)')

	var bannerBtn = document.getElementById("banner-learn-btn");
    var donateHeadTitle = document.getElementById("donate-head-title");
    var globalFooter = document.getElementById("donate-global-footer");
    var locatorForm = document.getElementById("POI-locator-form");


    for(var i=0; i<stuff.length; i++){
        if(stuff[i].includes(substring)){

			locatorForm.style.marginTop = "0px";

            donate_arrow[0].style.display = "none";

            lastChild[0].style.backgroundColor = '#AA0061';
            lastChild[0].style.color = '#FFFFFF';
            lastChild[0].style.width = "108px";
            fourChildNode.style.paddingBottom= '5px';

            $(lastChild[0]).mouseenter(function(){
    			$(lastChild[0]).css("border-bottom","5px solid #AA0061");
            })



            $('a').each(function(){
            	$(this).addClass('donate-active'); $(this).parents('li').addClass('donate-active');
            });

            if (mediaQuery.matches) { 

				bannerBtn.style.marginTop = '150px';
				donateHeadTitle.style.marginTop = '78px'
  			}

        }
        else if (stuff[i].includes(bcaSub)){
                donate_arrow[0].style.display = "none";

				globalFooter.style.marginBottom = '-79px';

            	lastChild[0].style.backgroundColor = '#AA0061';
            	lastChild[0].style.color = '#FFFFFF';
            	lastChild[0].style.width = "108px";
            	fourChildNode.style.paddingBottom= '5px';

            	var bcaBanner = document.getElementById("page_main_hero_banner")
				bcaBanner.style.marginTop = '93px';

            	$(lastChild[0]).mouseenter(function(){
    				$(lastChild[0]).css("border-bottom","5px solid #AA0061");
                });

			$('a').each(function(){
            	$(this).addClass('donate-active'); $(this).parents('li').addClass('donate-active');
            });

            	if (mediaQuery.matches) { 
                   locatorForm.style.marginTop = '114px';
			       bannerBtn.style.marginTop = '140px';

				   globalFooter.style.marginBottom = '-157px';

				   donateHeadTitle.style.marginTop = '16px';

                   bcaBanner.style.marginTop = '-21px';

                   var donateMainTitleDesc = document.getElementById("donate-main-title-desc");
                   var donateMainTitleDescChild = donateMainTitleDesc.querySelector('p');
				   donateMainTitleDescChild.setAttribute('style', 'margin-bottom:-116px !important');


  				}
            	if (mediaQuery1.matches) {
					bannerBtn.style.marginTop = '0';
                    bcaBanner.style.marginTop = '0px';
            	}
        }
        else {
               lastChild[0].style.color = '#FFFFFF';
        }
    }
}


function homePageBreadcrumpFunction (){
    var urlLink = window.location.pathname;
    var stuff = urlLink.split('/');
    var substring = 'home.html';

	var pagelink = document.getElementsByClassName("abbott-breadcrumb");
    var breadCrump = document.getElementsByClassName("a-breadcrumb--active");

    var spanText = breadCrump[0].querySelector('span').innerHTML;


    for(var i=0; i<stuff.length; i++){
        if(stuff[i].includes(substring) || spanText == 'home' || spanText == 'Home'){
 			pagelink[0].style.display="none";
        }
    }

}

function activeHeaderMenu (){
 	$('a').each(function(){
            if ($(this).prop('href') == window.location.href) {
                $(this).addClass('active'); $(this).parents('li').addClass('active');
            }

     });
}

function disableErrorMessage (){
	const errorMsg = document.getElementsByClassName("m-poi-locator-search-bar__error");
    errorMsg[0].style.display="none";
}

$('#location-use').on('click',function(){
	disableErrorMessage()
});

function inputBoxFunction (){
	const errorMsg = document.getElementsByClassName("m-poi-locator-search-bar__error");
    var val = document.forms["POI-locator-form"]["q"].value;
  	if (val == "") {
    	errorMsg[0].style.display="block";
     }
}


$('#location-search').on('click',function(){
	inputBoxFunction();
});

/*Blood and Plasma sorting new CR*/
$("#plant-a-tree-checkbox-options").parent(".options").addClass("plant-a-tree-container");
$("#blood-plasma-checkboxes-options").parent(".options").addClass("blood-and-plasma-container");
$(".blood-and-plasma-container").next(".text").addClass("blood-and-plasma-error");
$(".blood-and-plasma-container .a-checkbox .a-checkbox__input").addClass("checked");
$(".blood-and-plasma-container .a-checkbox").change(function(){
    $(this).find(".a-checkbox__input").toggleClass("checked");
    if($(".checked").length == 0){
        $(".blood-and-plasma-container").next(".text").find("#donate-checkbox-msg").show();
        $("#location-search, #location-use").attr("disabled", true).addClass("bg-grey");
    }else{
        $(".blood-and-plasma-container").next(".text").find("#donate-checkbox-msg").hide();
        $("#location-search, #location-use").attr("disabled", false).removeClass("bg-grey");
    }
});

$(".plant-a-tree-container .a-checkbox").change(function(){
	$(this).find(".a-checkbox__input").toggleClass("checked");
});
/*Blood and Plasma sorting new CR*/

window.onload = function() {
  donateButtonFunction();
  homePageBreadcrumpFunction();
  activeHeaderMenu();
};

