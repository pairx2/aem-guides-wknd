$(document).ready(function(){    

    var imagePath = '/content/dam/add/molecular/flag-usa.png';
    $("#flag-icon").attr("src", "imagePath");
    
    /*append*/
    $('.o-header__utility-nav').append('<a href="/us/en/country-selector.html" class="flag"><img id="theImg" class="theflagImage" src=' + imagePath + ' /></a>');
    $('.o-header__utility-nav').append('<a href="/int/en/country-selector.html" class="globe"><em class="abt-icon abt-icon-globe"></em></a>');
    /*icons for mobile view*/
    $('.o-header .m-mega-menu__mobile .navbar').append('<a href="/us/en/country-selector.html" class="flag"><img id="theImg" class="theflagImage" src=' + imagePath + ' /></a>');
    $('.o-header .m-mega-menu__mobile .navbar').append('<a href="/int/en/country-selector.html" class="globe"><em class="abt-icon abt-icon-globe"></em></a>');
    /*functional*/
    
    var windowWidth = $(window).width();   
    var domain;
    if (window.location.href.indexOf("us/en") > -1) {
        domain = "us";
     }
    else  if (window.location.href.indexOf("int/en") > -1) {
        domain = "int";
    }
    
    if(domain=='us') {
        $('.abt-icon-down-arrow').hide();
        $('.m-link-stack__dropdown-wrapper').hide();
        $('.theflagImage').show();
        $('.mega-menu.megamenu.carousel .flag .theflagImage').hide();
        $(".m-link-stack__country-select .a-link__text").html("USA | ENG");
        $(".m-link-stack__country-select .a-link__text").attr("href","/us/en/country-selector.html");
        $('.abt-icon-globe').hide();
        $(".o-header__utility-nav").css("margin-right", "12px");
    }
    else{
        $('.abt-icon-globe').show();
        $('.mega-menu.megamenu.carousel .globe').hide();
        $('#theImg').hide();
        if((windowWidth > 1181)){
            $(".m-link-stack__country-select .m-link-stack__link").append('<div class="a-link a-link--icon-right"> <a class="a-link__text" href="/int/en/country-selector.html" target="">INT | ENG</a> </div>')
         }
         else{
            $(".m-link-stack__country-select .a-link__text").html("INT | ENG");
            $(".m-link-stack__country-select .a-link__text").attr("href","/int/en/country-selector.html");
        }
        $('.o-header__utility-nav .abt-icon-down-arrow').show();
        $('.m-link-stack__dropdown-wrapper').hide();
    }


    if((windowWidth < 1181) && (domain=='us')){
        $('.abt-icon-down-arrow').hide();
        $('.m-link-stack__dropdown-wrapper').hide();
        $('.mega-menu.megamenu.carousel .flag .theflagImage').show();

        $('.abt-icon-globe').hide();
        $(".o-header__utility-nav").css("margin-right", "12px");
    }
    else if((windowWidth < 1181) && (domain=='int')){
        $('.mega-menu.megamenu.carousel .globe').show();
        $('.mega-menu.megamenu.carousel .flag').hide();
        $('.o-header__utility-nav .abt-icon-down-arrow').show();
        $('.m-link-stack__dropdown-wrapper').hide();
    }

    else
    {
       console.log('else apart');
    }
    $(".m-link-stack__country-select .a-link__text").click(function(e){
        e.preventDefault();
        window.location.href = $(this).attr("href");
        console.log($(this).attr("href"));
        
    });
        
});


