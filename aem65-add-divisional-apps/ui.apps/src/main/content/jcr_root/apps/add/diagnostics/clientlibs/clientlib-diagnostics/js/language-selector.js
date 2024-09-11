var imagePath = '/content/dam/add/diagnostics/home/flag-usa.png';
$("#flag-icon").attr("src","imagePath");

/*append*/
$('.o-header__utility-nav').append('<a href="/us/en/country-selector.html" class="flag"><img id="theImg" src='+imagePath+' /></a>');
$('.o-header__utility-nav').append('<a class="globe"><em class="abt-icon abt-icon-globe"></em></a>');

/*icons for mobile view*/
$('.o-header .m-mega-menu__mobile .navbar').append('<a href="/us/en/country-selector.html" class="flag"><img id="theImg" src='+imagePath+' /></a>'); //append the icon to html
$('.o-header .m-mega-menu__mobile .navbar').append('<a href="/int/en/country-selector.html" class="globe"><em class="abt-icon abt-icon-globe"></em></a>'); //append the icon to html

var windowWidth = $(window).width();
let ResponseURL = window.location.pathname
    domain = ResponseURL.split('/');
    domain=(domain[domain.length-3]);

    $('.globe').click(function(){
       var finalVal=  ResponseURL.slice(0, ResponseURL.lastIndexOf('/'));
       var langURL = finalVal + '/country-selector.html';
       $(this).attr('href', langURL);
        });

if((windowWidth < 1181) && (domain=='us')){
        $('.abt-icon-down-arrow').hide();
        $('.m-link-stack__dropdown-wrapper').hide();
        $('#theImg').show();

        $('.abt-icon-globe').hide();
        $(".o-header__utility-nav").css("margin-right", "12px");
    }
    else if((windowWidth < 1181) && (domain=='int')){
        $('.mega-menu.megamenu.carousel .globe').show();
        $('.mega-menu.megamenu.carousel .flag').hide();
        $('.abt-icon-down-arrow').show();
        $('.m-link-stack__dropdown-wrapper').show();
    }
    else if(domain=='us'){
        $(".m-link-stack__country-select a.a-link__text").attr("href", "/content/add/diagnostics/us/en/country-selector.html")
    }

    else
    {
       console.log('else apart');
    }
/*functional*/
ResponseURL = window.location.pathname
var domain = ResponseURL.split('/');
domain=(domain[domain.length-3]);
if(domain=='us'){
$('.abt-icon-down-arrow').hide();
$('.m-link-stack__dropdown-wrapper').hide();
$('#theImg').show();
$('.abt-icon-globe').hide();
$(".o-header__utility-nav").css("margin-right", "12px");
}
else{
$('.abt-icon-globe').show();
$('#theImg').hide();
$('.abt-icon-down-arrow').show();
$('.m-link-stack__dropdown-wrapper').show();
}

//error page
// $("#section-error_page_section_1").parent().addClass('error-bg-white');
$("#section-error_page_banner_1").parent().addClass('cyan-bg p-0 error-bg-white');
$("#section-error_page_banner_1").addClass('align-container-middle');
$("#section-error_page_section_1").parent().addClass('white-bg p-0');