
$('.a-container--headerpedialyte-co .m-mega-menu__side-nav .m-link-stack .a-link .m-mega-menu__item').hover(function () {   
    $(this).siblings(".m-mega-menu__side-nav-transparent").children('.m-mega-menu__nested-menu-img-list').addClass('d-flex');
});



//scroll
$(document).ready(function(){
    $('.a-container--headerpedialyte-cadr button.navbar-toggler').on('click', function () {
        setTimeout(() => {
                   if ($('.navbar-collapse').css('display') == 'block') {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    }, 0);
});

});



/*hero carousel*/

    $(".a-base-carousel.a-carousel--cadr .m-hero.m-hero-base .m-hero__content .m-hero__body").hover(
        function(e){
            $(".a-base-carousel.a-carousel--cadr .m-hero.m-hero-base .m-hero__content .m-hero__header").css("opacity","1");
            $(".a-base-carousel.a-carousel--cadr .m-hero.m-hero-base .m-hero__content h6").css("opacity","1");
            },
        function(e){
            $(".a-base-carousel.a-carousel--cadr .m-hero.m-hero-base .m-hero__content .m-hero__header").css("opacity","0");
            $(".a-base-carousel.a-carousel--cadr .m-hero.m-hero-base .m-hero__content h6").css("opacity","0");
        } 
    );


/*hero carousel height*/

function slider(){
    setTimeout(() => {
               $(".a-base-carousel.a-carousel--cadr .slick-slide").each(function(){
        if($(this).hasClass('slick-active')){
            let height = $(this).height();
            $(this).parents('.slick-list').css("height",height);
        }
    });    
}, 100);
}

function applyHeight(){
    setTimeout(() => {
               $(".a-base-carousel.a-carousel--cadr .slick-dots li").click(function(){
        $(".slick-slide").each(function(){
            if($(this).hasClass('slick-active')){
                let height = $(this).height();
                $(this).parents('.slick-list').css("height",height);
            }
        });    
        
    });
}, 100);
}

$(window).on('load',function() {
    applyHeight();
    slider();
});

$(window).on('resize', function(){
    slider();   
    applyHeight();
});


$(".a-base-carousel.a-carousel--cadr").bind("mousedown mouseup ", function (e) { 
slider();
});

$(".a-base-carousel.a-carousel--cadr").bind("touchstart touchend ", function (e) { 
slider();
});



















