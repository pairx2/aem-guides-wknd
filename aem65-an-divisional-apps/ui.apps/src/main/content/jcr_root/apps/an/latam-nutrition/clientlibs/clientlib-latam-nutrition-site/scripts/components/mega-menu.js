function setPaddingTop(){
    if($('#header-user-name').length) {
    	$($('#header-user-name').parent()).css("paddingTop", "15px")
    }
}
function loginSuccess(successfulLogin){
    if(successfulLogin) {
        let firstName = getItemLocalStorage('username',true);
         $('#header-user-name')[0].innerText = "HOLA"+ " "+ firstName;
		$('.a-link--base.a-link--register').addClass('d-none');
        $('.a-link--base.a-link--login').addClass('d-none');
        $('#header-user-name').removeClass('d-none');
        $('#header-user-logout').removeClass('d-none');
        $('#form-latam-login-logout').removeClass('d-none');
    } else {
		$('.a-link--base.a-link--register').removeClass('d-none');
        $('.a-link--base.a-link--login').removeClass('d-none');
        $('#header-user-name').addClass('d-none');
        $('#header-user-logout').addClass('d-none');
        $('#form-latam-login-logout').addClass('d-none');
    }
}
function showHideHeaderContainer(){
    $('.abt-icon, .o-header__search-overlay').on("click", function () {
        setTimeout(() => {
            if ($('.a-search').hasClass('a-search--expand') ) {
                $('.a-container--header').css('display', 'none');
            }
            else {
                $('.a-container--header').css('display', 'block');
            }
        }, 0);
    });
}
function showHideNavbar(){
    $('button.navbar-toggler').on('click', function () {
        setTimeout(() => {
            if ($('.navbar-collapse').css('display') == 'block') {
                $('.a-container--header').css('display', 'none');
            } else {
                 $('.a-container--header').css('display', 'block');
            }
        }, 0);
    });
}
function primaryDropdownActive(){
    let i = 0;
    $('.m-mega-menu-dynamic--base .dropdown').on("click",function(){
        $(".m-mega-menu-dynamic--base .dropdown-active").each(function () {
            if ($(".dropdown").parents(".m-mega-menu__mobile-item").hasClass('dropdown-active')) {
                $(".dropdown").parents(".m-mega-menu__mobile-item").removeClass("dropdown-active");
            }
        });
           i++;
        if(i==3){
	       i = 1;
        }
        if(i ==1){
              $(this).parents(".m-mega-menu__mobile-item").addClass("dropdown-active");
        }else{
             $(this).parents(".m-mega-menu__mobile-item").removeClass("dropdown-active")
        }
    });
}
function tertiaryDropdownActive(){
    let j= 0;
    $('.m-mega-menu-dynamic--base .dropdown2').on("click",function(){
          $(".m-mega-menu__mobile-item.m-mega-menu__tertiary").each(function(){
              if ($(".dropdown2").parents(".m-mega-menu__tertiary").hasClass('dropdown-active2')) {
                  $(".dropdown2").parents(".m-mega-menu__tertiary").removeClass("dropdown-active2");
              }
          });
           j++;
        if(j==3){
	       j = 1;
        }
        if(j ==1){
              $(this).parents(".m-mega-menu__tertiary").addClass("dropdown-active2");
        }else{
             $(this).parents(".m-mega-menu__tertiary").removeClass("dropdown-active2")
        }
    }
    );
}
function navbarOverflow(){
    $('button.navbar-toggler').on('click', function () {
        setTimeout(() => {
            if ($('.navbar-collapse').css('display') == 'block') {
                $('body').css('overflow', 'hidden');
            } else {
                $('body').css('overflow', 'auto');
            }
        }, 0);
    });
}

$(document).ready(function() {
    let successfulLogin = getItemLocalStorage('cJwt',true);
    setPaddingTop();
    loginSuccess(successfulLogin); 	
	$(".navbar-collapse .m-mega-menu__mobile-item-wrapper").hover(function (e) {
	let targetEl = e.target, respectiveLi = targetEl.closest('li');
	$(respectiveLi).find('[data-js-component="mega-menu"]').show();
	$(respectiveLi).find('a.nav-item').attr('aria-expanded', 'true');
}, function (e) {
	let targetEl = e.target, respectiveLi = targetEl.closest('li');
	$(respectiveLi).find('[data-js-component="mega-menu"]').hide();
	$(respectiveLi).find('a.nav-item').attr('aria-expanded', 'false');
	});


//BLOG
$(".m-mega-menu__mobile-item-wrapper .a-link__inner-text").addClass("nav-link");

//site map
$('.m-megamenu-dynamic--base.m-megamenu-dynamic--sitemap .a-link__text').attr('aria-expanded','true')

//ensure-container
    showHideHeaderContainer();
    showHideNavbar();
 
  //MEGA-MENU
    $(".m-mega-menu-dynamic--base .m-mega-menu__item .nav-link").after('<div class="arrow"></div>')
    $(".m-mega-menu-dynamic--base .m-mega-menu__item .a-link__text").after('<div class="submenu-arrow"></div>')
    $(".m-mega-menu-dynamic--base .m-mega-menu__item.m-mega-menu__mobile-item .m-mega-menu__mobile-header").after('<div class="dropdown"></div>');
    $(".m-mega-menu-dynamic--base .m-mega-menu__mobile-sub-head").after('<div class="dropdown2"></div>');

//header sticky section 
$('.o-header__sticky-section').addClass('sticky_header');



$('.m-mega-menu-dynamic--base .m-mega-menu__side-nav .m-link-stack .a-link .m-mega-menu__item').hover(function () {    
    $(this).siblings(".m-mega-menu__side-nav-transparent").children('.m-mega-menu__nested-menu-img-list').addClass('d-flex');
});

//hidden dropdown
 $(".m-mega-menu-dynamic--base .m-mega-menu__mobile-products.d-none").each(function(){  
   let count=$(this).children().length;     
  if(count==0) {
    $(this).siblings(".dropdown").css('display','none');
 }
 });

 $(".m-mega-menu-dynamic--base .m-mega-menu__nested-menu").each(function(){  
    $(this).siblings(".m-mega-menu__item ").children(".arrow").css('display','block');

 });
 $(".m-mega-menu-dynamic--base .m-mega-menu__side-nav-transparent").each(function(){  
    $(this).siblings(".m-mega-menu__item ").children(".submenu-arrow").css('visibility','visible');

 });
//primary
    primaryDropdownActive();
//Tertiary mega-menu
    tertiaryDropdownActive();
//link 
$(".m-mega-menu-dynamic--base .m-mega-menu__mobile-header").click(function(){
    let link=$(this).parent().siblings(".m-mega-menu__item ").children("a").attr("href");
     $(this).attr("href", link);

});

function mobileredirectlink(index){
    $(`.m-mega-menu__tertiary:nth-child(${index}) .m-mega-menu__mobile-sub-head`).click(function(){
        let link1=$(this).parents(".m-mega-menu__mobile-item ").siblings(".m-mega-menu__nested-menu").find(`.a-link:nth-child(${index}) a`).attr("href");

   $(this).attr("href", link1);
});
}
mobileredirectlink(1);
mobileredirectlink(2);
mobileredirectlink(3);
mobileredirectlink(4);
mobileredirectlink(5);
mobileredirectlink(6);

$(".submenu-arrow").click(function(){
    $(".m-mega-menu__nested-menu-img-list").css('display','none');
    $(this).parents(".m-mega-menu__item").siblings(".m-mega-menu__side-nav-transparent").children(".m-mega-menu__nested-menu-img-list").css('display','block');

});

//scroll
    navbarOverflow();
});

//scroll
$(window).scroll(function() {
    let scroll = $(window).scrollTop();
    if (scroll >= 1) { 
    $('#a-container-ensure-header').addClass('a-header-scroll');
    $('.o-header__sticky-section').addClass('a-scroll');

}
    else{
     $('#a-container-ensure-header').removeClass('a-header-scroll');
     $('.o-header__sticky-section').removeClass('a-scroll');

}
});

$(document).ready(function(){
    $('.m-mega-menu-dynamic--base.m-mega-menu-new-tab .a-link:first-child .a-link__text').attr('target', '_blank');
    
    $('.m-mega-menu-dynamic--base.m-megamenu-dynamic--main-newtab .m-mega-menu__item .nav-item').attr('target', '_blank');
    $('.m-mega-menu-dynamic--base.m-megamenu-1st--main-newtab .a-link:first-child .a-link__text').attr('target', '_blank');
    $('.m-mega-menu-dynamic--base.m-megamenu-2nd--main-newtab .a-link:nth-child(2) .a-link__text').attr('target', '_blank');
    $('.m-mega-menu-dynamic--base.m-megamenu-3rd--main-newtab .a-link:nth-child(3) .a-link__text').attr('target', '_blank');
    $('.m-mega-menu-dynamic--base.m-megamenu-4th--main-newtab .a-link:nth-child(4) .a-link__text').attr('target', '_blank');  
    
});


$(document).ready(function () {  
let desktopId = $(".m-signup .a-link__text").attr("id"); 


$(window).on("resize", function (e) {
        checkScreenSize();
    });

     setTimeout(function (){
    checkScreenSize();
     }, 1000)


    function checkScreenSize(){
        let newWindowWidth = $(window).width();
            if (newWindowWidth < 768) {
                $('.m-signup .a-link__text').attr('id', 'shopping-cart-mobile');
            }
           else
           {
              $('.m-signup .a-link__text').attr('id', desktopId);
           }
    
        }

});

$('.a-contentfragmentlist--base .cmp-contentfragment__element--mainimage img').attr('alt','abbott');