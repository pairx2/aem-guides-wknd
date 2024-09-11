$(document).ready(function () {
    $('.m-mega-menu__mobile .abt-icon-hamburger').on('click',function(e){
        if ($(this).parents('.navbar').find('.navbar-collapse').css("display") == "none") {
            $("body").css({"position":"fixed", "overflow":"hidden","height":"100%"});

            if(window.innerWidth>767 && window.innerWidth < 1025){
                let mobileMenuWidth = 300;
                $(".o-header__wrapper").animate({"left": -(mobileMenuWidth)+"px"});
                $("body").animate({"left": -(mobileMenuWidth)+"px"});
		    $(this).parents('.navbar').find('.navbar-collapse').animate({left: (window.innerWidth-mobileMenuWidth)+"px"});

            } else {
                 $(".o-header__wrapper").animate({ "left": -((window.innerWidth) - 80) + "px" });
                        $("body").animate({ "left": -((window.innerWidth) - 80) + "px" });
                        $(this).parents('.navbar').find('.navbar-collapse').animate({ left: 60 + "px" });

            }

        } else {
            hideMobileMenu();
        }

    });

    function hideMobileMenu(){
        $("body").css({"position":"relative", "overflow":"auto","height":"auto"});
        $(".o-header__wrapper").animate({"left": "0px"});
        $("body").animate({ "left": "0px" }, function () {
            $("body").css("position", "static");
        });
    }
});

