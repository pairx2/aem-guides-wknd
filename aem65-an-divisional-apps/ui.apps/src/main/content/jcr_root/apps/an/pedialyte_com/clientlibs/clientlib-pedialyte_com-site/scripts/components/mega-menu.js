function hideHCP() {    
    $('.o-header__search .abt-icon').on("click", function () {
        setTimeout(() => {
            if (window.innerWidth >= 992) {
                if ($('.a-search').hasClass('a-search--expand')) {
                    $('.a-container--base.a-container--header .a-container--base').css('display', 'none');
                }
                else {
                    $('.a-container--base.a-container--header .a-container--base').css('display', 'flex');
                }
            }
        }, 0);
    });

    $('.o-header__search-overlay').on("click", function () {
        setTimeout(() => {
            if (window.innerWidth >= 992) {
                if ($('.a-search').hasClass('a-search--expand')) {
                    $('.a-container--base.a-container--header .a-container--base').css('display', 'none');
                }
                else {
                    $('.a-container--base.a-container--header .a-container--base').css('display', 'flex');
                }
            }
        }, 0);
    });
}

function addHeaderClass() {
    let pgurl = $(location).attr('href').split( '/' );
    let url1=pgurl[ pgurl.length - 1 ] ; 
    let url2=pgurl[ pgurl.length - 2 ] ;
    let url3=pgurl[ pgurl.length - 3 ]; 

    if(url1.includes("products") ||url2.includes("products") ||url3.includes("products")){
        $("#Pedialyte-01").addClass("active");
        $(".a-container--headerpedialyte_com").addClass('tablet_height');
    }
    if(url1.includes("dehydration-symptoms-causes") ||url2.includes("dehydration-symptoms-causes") ||url3.includes("dehydration-symptoms-causes")){
        $("#Pedialyte-02").addClass("active");
        $(".a-container--headerpedialyte_com").addClass('tablet_height_2');
    }
    if(url1.includes("what-is-pedialyte") ||url2.includes("what-is-pedialyte") ||url3.includes("what-is-pedialyte")){
        $("#Pedialyte-03").addClass("active");
    }
    if(url1.includes("where-to-buy") ||url2.includes("where-to-buy") ||url3.includes("where-to-buy")){
        $("#Pedialyte-04").addClass("active");
    }
}

$(function() {
    $("#col-cntl-4").parents(".container.responsivegrid").addClass("container-mobile");
    $("#signup_save").parents(".m-mega-menu__mobile-item-wrapper").addClass("signup-save-menu")
    $("#hcpMobile").parents(".m-mega-menu__mobile-item-wrapper").addClass("hcp-mobile-link");
    const currentPagePath = window.location.pathname;
          $('.header .o-header__wrapper .m-mega-menu__mobile .navbar-collapse-wrapper .m-mega-menu__mobile-item-wrapper a').each(function () {
            let linkURL = $(this).attr('href');
            if (linkURL && linkURL.length) {
                if (linkURL == currentPagePath) {
                    $(this).closest(".m-mega-menu__mobile-item-wrapper").addClass('active-border');
                }
            }
        });
	$(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
        let targetEl = e.target, respectiveLi = targetEl.closest('li');
        $(respectiveLi).find('[data-js-component="mega-menu"]').show();
        $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
    }, function (e) {
        let targetEl = e.target, respectiveLi = targetEl.closest('li');
        $(respectiveLi).find('[data-js-component="mega-menu"]').hide();
        $(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
	});
    
    // Hide HCP Link when search-overlay is displayed
    hideHCP();

    //bugherd defect #359
    $('.a-container--base.a-container--header .a-container--base').on("click", function () {
        $(".a-container--base.a-container--header .header .o-header__wrapper .o-header__secondary-top-nav .o-header__search .a-search .a-search__input").focus();
    });


    // header navigation
    addHeaderClass();

//link 
$(".m-mega-menu__mobile-header").click(function(){
    let link=$(this).parent().siblings(".m-mega-menu__item ").children("a").attr("href");
 $(this).attr("href", link);

});

$(".m-mega-menu__mobile-header").after('<div class="dropdown"></div>');


//primary
   $('.m-mega-menu__item .dropdown').on("click", function() {
    $(this).parents(".m-mega-menu__mobile-item").toggleClass("dropdown-active");
});

    
    $(document).on('click', '.m-mega-menu__item .dropdown', function(e){
        e.preventDefault();
    $(this).siblings('.m-mega-menu__mobile-products').toggleClass('d-none');
        })
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
});