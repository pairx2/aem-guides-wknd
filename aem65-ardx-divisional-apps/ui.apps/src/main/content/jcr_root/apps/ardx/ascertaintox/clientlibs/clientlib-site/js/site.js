$(document).ready(function () {
	$('.navbar-toggler').click(function(){
		const result = $(this).attr("class");
		if(result == "navbar-toggler abt-icon-cancel"){
			$('.o-header-v2-section--alignGroupsBetween').find('.group:nth-child(2)').hide();
		}else{
			$('.o-header-v2-section--alignGroupsBetween').find('.group:nth-child(2)').show();
		}
	});

    const navigationLink = $(".megamenu").find(".nav-link");

    $(navigationLink).hover(function(){

        const subNavLink =  $(".megamenu").find(".a-link");
        
        for(const subNavigation of subNavLink)
        { 
            activeLinkState($(subNavigation).find("a"));
        }

    })	

	
    const sidveNaveActive = $("#side_navigation").find(".nav-link");
    activeLinkState(sidveNaveActive)
    const headerNaveActive = $(".megamenu").find(".nav-link");
   	activeLinkState(headerNaveActive)

    const searchForm = $(".headersearch").find("form");

    $(".a-search--icon-left").click(function(){

		$(searchForm).submit();
    })
	customHeaderNav();


});

function activeLinkState(sidveNaveActiveArr){
	const activePageUrl = window.location.href;
    for(const activeArrayact of sidveNaveActiveArr)
        {
        const activeUrl = $(activeArrayact).attr('href').split(".")[0];
        if(activePageUrl.indexOf(activeUrl)>-1)
        {
            $(activeArrayact).addClass("active");
        }
    }
}

function customHeaderNav() {
    $(".m-mega-menu__mobile-item").has(".m-mega-menu__mobile-products div").addClass("has-child");
    $(".m-mega-menu__mobile-item-wrapper").has(".m-mega-menu__nested-menu").addClass("has-child");
    let nestedNavItem = $(".m-mega-menu__mobile-products").find(".m-mega-menu__mobile-item").find(".m-mega-menu__mobile-item-link");
    nestedNavItem.on('click',function(event){
		event.stopPropagation();
    })
    let navItems = $('.m-mega-menu__mobile-item-wrapper');
    navItems.each(function() {
        let navDesktop = $(this).find('.m-mega-menu__item.d-none.d-lg-block');
        let navLinkDesktop = navDesktop.find('.nav-item').attr('href');
        let navMobile = $(this).find('.m-mega-menu__item.m-mega-menu__mobile-item');

        if (navLinkDesktop) {
            navMobile.find('.m-mega-menu__mobile-header').attr('href',navLinkDesktop);
        }
		navMobile.on('click', function(event) {
            if($(this).hasClass("active")){
				$(this).removeClass('active');	
            }else{
				$('.m-mega-menu__item.m-mega-menu__mobile-item.has-child').removeClass('active');
                $(this).addClass('active');

            }
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-header').removeClass('active');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-products').addClass('d-none');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').siblings().removeClass('menu-active');
            $(this).find('.m-mega-menu__mobile-header').toggleClass('active');
            $(this).find('.m-mega-menu__mobile-products').toggleClass('d-none');
            $(this).parents('.m-mega-menu__mobile-item-wrapper').toggleClass('menu-active');

        })
    });


}

	

