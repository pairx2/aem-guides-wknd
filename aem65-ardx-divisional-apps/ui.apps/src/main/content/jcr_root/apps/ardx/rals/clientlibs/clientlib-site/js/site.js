$(document).ready(function () {
    $("#take-a-look-btn").parent().css("text-align", "center");
	let _headerClass = $('.genericpage').find('.abbott-wrapper');
    $(_headerClass[0]).find(".xf-content-height").addClass("rals-header");
	$('.navbar-toggler').click(function(){
		let result = $(this).attr("class");
		if(result == "navbar-toggler abt-icon-cancel"){
			$('.o-header-v2-section--alignGroupsBetween').find('.group:nth-child(2)').hide();
		}else{
			$('.o-header-v2-section--alignGroupsBetween').find('.group:nth-child(2)').show();
		}
	});

    const searchForm = $(".headersearch").find("form");

    $(".a-search--icon-left").click(function(){

	        $(searchForm).submit();
    })
    
	 const navigationLink = $(".o-header-v2-group").find("a");
    $(navigationLink).hover(function(){
        const subNavLink =  $(".o-header-v2-group").find(".a-link");
       
        for(const subNavigation of subNavLink)
        {
          
	    const subNav = $(subNavigation).find("div");
            if(subNav.length === 0){
				$(subNavigation).addClass('remove-after')
            }
        }
    })
    const sidveNaveActive =$("#section-nav").find(".navigation").find(".nav-link");
    activeLink(sidveNaveActive);
    const sideNav_title =$("#section-nav").find(".cmp-title__link");
    activeLink(sideNav_title);
    const headerNaveActive =$(".megamenu").find(".navigation").find(".nav-link");
    activeLink(headerNaveActive)
    customHeaderNav();


});
function activeLink(activeArray){
	if(activeArray.length>0)
    {
        const activePageUrl = window.location.href;    
        
        for(const activeArrayact of activeArray)
        {
            const activeUrl = $(activeArrayact).attr('href').split(".")[0];
            if(activePageUrl.indexOf(activeUrl)>-1)
            {
                $(activeArrayact).addClass("active");
            }
	    
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
        let navMobile = $(this).find('.m-mega-menu__mobile-item');

        if (navLinkDesktop) {
            navMobile.find('.m-mega-menu__mobile-header').attr('href',navLinkDesktop);
        }
		let navMobile_event = $(this).find('.m-mega-menu__item.has-child');

        navMobileevent(navMobile_event);
		
    });

    let netstedMenuItem = $(".m-mega-menu__nested-menu").find(".m-mega-menu__nested-menu-wrapper").find(".m-link-stack--content.d-none").find(".a-link").find("> a")

    let netsedMenuItem_mobile = $(".m-mega-menu__mobile-products").find(".m-mega-menu__mobile-item").find("> a");

    for(let i=0;i<netstedMenuItem.length;i++){
			const mobileNestedMenu_URL= $(netstedMenuItem[i]).attr('href');
            if (mobileNestedMenu_URL) {
                $(netsedMenuItem_mobile[i]).attr('href',mobileNestedMenu_URL);
            }

    }

}

function navMobileevent(navMobile_event){
    navMobile_event.click(function(event) {
        if(event.target.tagName==="A"){
            return;
        }

        event.stopPropagation()

        if(event.target !== event.currentTarget){
            event.stopPropagation();
            event.preventDefault();
           if($(event.target).hasClass("active")){
               $(event.target).removeClass('active');
               $(event.target).find(">a").removeClass("active");
               $(event.target).find(".m-mega-menu__mobile-tertiary").addClass('d-none');
            }else{
            $('.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child').removeClass('active');
            $('.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child').find("> a").removeClass('active');
            $('.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child').find(".m-mega-menu__mobile-tertiary").addClass("d-none");
             $(event.target).addClass("active");
             $(event.target).find(">a").addClass("active");
             $(event.target).find(".m-mega-menu__mobile-tertiary").removeClass('d-none');
             $(event.target).find(".m-mega-menu__item.m-mega-menu__mobile-item.m-mega-menu__tertiary.has-child").addClass('active');
            }
            return;
        }
        megaMenuthis(this, event);
        
    })
}

function megaMenuthis(_this, e){
    if($(_this).hasClass("m-mega-menu__mobile-item") && !$(_this).hasClass("m-mega-menu__tertiary") && $(_this).hasClass("has-child"))
        {
            e.preventDefault();
        if($(_this).hasClass("active")){
            $(_this).removeClass('active');
        }else{
            $('.m-mega-menu__item.m-mega-menu__mobile-item.has-child').removeClass('active');
            $(_this).addClass('active');

        }
        $(_this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-header').removeClass('active');
        $(_this).parents('.m-mega-menu__mobile-item-wrapper').siblings().find('.m-mega-menu__mobile-products').addClass('d-none');
        $(_this).parents('.m-mega-menu__mobile-item-wrapper').siblings().removeClass('menu-active');
        $(_this).find('.m-mega-menu__mobile-header').toggleClass('active');
        $(_this).find('.m-mega-menu__mobile-products').toggleClass('d-none');
        $(_this).parents('.m-mega-menu__mobile-item-wrapper').toggleClass('menu-active');
        }
}