$(function() {
    const headerWrapper = $('.o-header');
    const langDropdown = headerWrapper.find('.lang-dropdown');
    const langSelector = headerWrapper.find('.lang-selector-icon');
    const langSwitcherContainer = headerWrapper.find('.language-switcher');
    const defaultLang = langDropdown.find('.m-link-stack__link');
    const langSearch = headerWrapper.find('.lang-search');
    const searchOverlay = headerWrapper.find('.o-header__search-overlay');
    const switchOverlay = headerWrapper.find('.switch-overlay');
    const menuRightOption = headerWrapper.find('.menu-right-option');
    const switchIcon = menuRightOption.find('.switch-icon');
    const switchContainer = menuRightOption.find('.switch.link.button');
    const switchContent = switchContainer.html();
    const cancelSearch = searchOverlay.find('.cancel-button');
    const submitSearch = searchOverlay.find('.submit-button');
    const menuSublinksContainer = headerWrapper.find('.o-header__utility-nav');
    const mobileOptions = headerWrapper.find('.header__mob-options');
    const mobileOptionsOverlay = headerWrapper.find('.mobile-menu-overlay');
    const mobMenuIcons_hamburger = mobileOptions.find('.abt-icon-hambuerger-menu');
    const mobMenuIcons_close = mobileOptions.find('.abt-icon-cross');

    //set switch
    if($(switchContent).find('.abt-icon').length || $(switchContent).find('.a-link__inner-text').text() !== ''){
        switchOverlay.html(switchContent); 
        switchOverlay.find('.abt-icon').addClass('d-none');
        //set country and language
        let countrySelected = $search.getLocalStorage('curr-country') ? $search.getLocalStorage('curr-country') : 
                    $globals.defaultCountryCode +' '+ $globals.defaultCountry;
        
        const languageSelected = $search.getLocalStorage('curr-lang') ? $search.getLocalStorage('curr-lang') : '';
        const langugeCode = $forms.getLanguageCode(languageSelected);
        let countrySelectedArr = countrySelected.trim().split("");
        countrySelectedArr[1] = countrySelectedArr[1].toLowerCase();
        countrySelected = countrySelectedArr.join("");
        $('.lang-selected').text(countrySelected +' ('+ langugeCode.charAt(0).toUpperCase() + langugeCode.slice(1) +')');
        $('.lang-selected').find('.abt-icon').addClass('d-none');
        $('.lang-search').removeClass('d-none');
    }

    //set submenu for mobile options
    if(menuSublinksContainer.find('.linkstack .js-m-link-stack').length){
        const menuSublinks = menuSublinksContainer.find('.linkstack .js-m-link-stack').html();
        const mobSublinkContainer = headerWrapper.find('.mob_menu_sublinks');
        mobSublinkContainer.html(menuSublinks);        
        mobSublinkContainer.find('.js-collapsable-links.m-link-stack--content').removeClass('d-none').removeClass('d-lg-block').removeClass('d-xl-block');
    }

    //set language toggle in mobile options
    if(langSelector.find('.abt-icon').length || langSelector.find('.a-link__inner-text').text() !== ''){
        const langRightMenu = $(langSelector).html();
        const langMobRightMenu = headerWrapper.find('.mob_lang_right_menu');
        langMobRightMenu.html(langRightMenu);
    }

    //initiate menu
    function setMenuIcon(){
        const isSwitchPresent = ($(switchContent).find('.abt-icon').length || 
            $(switchContent).find('.a-link__inner-text').text() !== '') ? true : false;
        const isSublinksPresent = menuSublinksContainer.find('.linkstack .js-m-link-stack').length ? true : false;
        const isLangIconPresent = (langSelector.find('.abt-icon').length || 
            langSelector.find('.a-link__inner-text').text() !== '') ? true : false;

        if((isSwitchPresent || isSublinksPresent) && isLangIconPresent){
            if(window.innerWidth < 992){
                mobileOptions.find('.menu-icons').removeClass('d-none');
                langSelector.addClass('d-none');
                langSwitcherContainer.addClass('lang-hamburger');
            }
            else{
                mobileOptions.find('.menu-icons').addClass('d-none');
                langSelector.removeClass('d-none'); 
                langSwitcherContainer.removeClass('lang-hamburger');
            }
        }
        else if((isSwitchPresent || isSublinksPresent) && !isLangIconPresent){
            if(window.innerWidth < 992){
                mobileOptions.find('.menu-icons').removeClass('d-none');
                langSelector.addClass('d-none');
                langSwitcherContainer.removeClass('lang-hamburger');
            }
            else{
                mobileOptions.find('.menu-icons').addClass('d-none');
                langSelector.addClass('d-none');
                langSwitcherContainer.removeClass('lang-hamburger'); 
            }
        }  
        else if(!isSwitchPresent && !isSublinksPresent && isLangIconPresent){
            mobileOptions.find('.menu-icons').addClass('d-none');
            langSelector.removeClass('d-none'); 
            langSwitcherContainer.removeClass('lang-hamburger');
        }
        else{
            mobileOptions.find('.menu-icons').addClass('d-none'); 
            langSelector.addClass('d-none');
            langSwitcherContainer.removeClass('lang-hamburger');
        }  
    }


    //language dropdown
    $(document).on('click', '.icon-lang' , function(){
        $(searchOverlay).css({'display': 'none'});
        $(switchOverlay).addClass('d-none');
        $(mobileOptionsOverlay).addClass('d-none');
        $(mobMenuIcons_hamburger).removeClass('d-none');
        $(mobMenuIcons_close).addClass('d-none');
        if($('.lang-dropdown .m-link-stack__dropdown-wrapper').is(':visible')){
           $('.lang-dropdown .m-link-stack__dropdown-wrapper').slideUp(500);
         
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').removeClass('keep_sticky');
            }
        }
        else{
            $(langDropdown).removeClass('d-none');
            $('.lang-dropdown .m-link-stack__dropdown-wrapper').slideDown('fast');
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').addClass('keep_sticky');
            }
        }
        if($(langSwitcherContainer).hasClass('lang-hamburger') &&
                 $('.lang-dropdown .m-link-stack__dropdown-wrapper').length){
            $(langDropdown).find('.close-mob-dropdown').removeClass('d-none');
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').addClass('keep_sticky');
            }
        }
        else{
            $(langDropdown).find('.close-mob-dropdown').addClass('d-none'); 
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').removeClass('keep_sticky');
            }
        }
        if(window.innerWidth < 897){
            $('.m-link-stack__dropdown-wrapper').addClass('m-link-stack__dropdown-wrapper-show');
            }
        $(defaultLang).find('.a-link.a-link--icon-right').addClass('d-none');
        setTimeout(function(){
            $(defaultLang).click();
        });
    });
    $(document).on('click', '.close-mob-dropdown' , function(){
        if(window.innerWidth < 897){
            $('.m-link-stack__dropdown-wrapper').removeClass('m-link-stack__dropdown-wrapper-show');
            }
        $(this).addClass('d-none'); 
    });
    $('body').click(function(e){
        if(!$(langSwitcherContainer).hasClass('lang-hamburger')){
            $('.m-link-stack__dropdown-wrapper').removeClass('m-link-stack__dropdown-wrapper-show');
        } 
    });
    //language search modal
    $(langSearch).click(function(){
        $(langDropdown).addClass('d-none');
        $(mobileOptionsOverlay).addClass('d-none');
        $(mobMenuIcons_hamburger).removeClass('d-none');
        $(mobMenuIcons_close).addClass('d-none');
        $(switchOverlay).addClass('d-none');
        if($(searchOverlay).is(':visible')){
            $(searchOverlay).css({'display': 'none'});
        }
        else{
            $(searchOverlay).css({'display': 'block'});
        }
    });

    //switch panel overlay
    $(switchIcon).click(function(e){
        e.preventDefault();
        $(langDropdown).addClass('d-none');
        $(searchOverlay).css({'display': 'none'});
        $(mobileOptionsOverlay).addClass('d-none');
        $(mobMenuIcons_hamburger).removeClass('d-none');
        $(mobMenuIcons_close).addClass('d-none');
        if($(switchOverlay).is(':visible')){
            $(switchOverlay).slideUp('fast');
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').removeClass('keep_sticky');
            }
        }
        else{
            $(switchOverlay).slideDown('fast').removeClass('d-none');
        }
    });

    //close search modal
    $(cancelSearch).click(function(){
        $(searchOverlay).slideUp();
        
        if(window.innerWidth > 767){
            $('.header').closest('.abbott-wrapper').removeClass('keep_sticky');
        }
    });

    $(submitSearch).click(function(e){
        e.preventDefault();
        const parent_country = $('.country-options fieldset.drop-down').find('.a-dropdown__container').find('select');
        const parent_language = $('.language-options fieldset.drop-down').find('.a-dropdown__container').find('select'); 
        const curr_lang = $search.getLocalStorage('curr-lang');
        const curr_cntry = $search.getLocalStorage('curr-country-cd');
        const isFormValid = $forms.validateHeaderForm();
        let url = $(this).find('a').attr('href');
        const target = $(this).find('a').attr('target') === '_blank' ? '_blank' : '_self';
        
        if(parent_country.find('option:selected').val() !== curr_cntry ||
            (parent_country.find('option:selected').val() === curr_cntry && 
                parent_language.find('option:selected').val() !== curr_lang)){
                    
            if(isFormValid){
                $search.setLocalStorage('curr-country-cd', parent_country.find('option:selected').val());
                $search.setLocalStorage('curr-country', parent_country.find('option:selected').text());
                $search.setLocalStorage('curr-lang', parent_language.find('option:selected').val());
                $search.setLocalStorage('selectedCountry', parent_country.find('option:selected').attr('data-country'));
                let country = $search.getName($search.getLocalStorage('selectedCountry')).id;
                let language = $search.getLocalStorage('curr-lang');
                let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
                country = country ? country.toUpperCase() : 'UNITEDSTATES';
                language = language ? language.toLowerCase() : 'english';
                role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
        
                sessionStorage.setItem('country', country);
                sessionStorage.setItem('language', language);
                sessionStorage.setItem('role', role);
                if(url){

                    if (role != "HCP"){
						url= url.replace(/hcp/, "nhcp");
                    }
                    window.open(url, target);
                }
                else{
                    window.location.reload();
                }
            }
        }
         else{
                    window.location.reload();
                }
    })

    //mobile menu 
    $(document).on('click', '.menu-icons', function(){
        if($(mobileOptionsOverlay).is(':visible')){
            $(mobileOptionsOverlay).addClass('d-none');
            $(mobMenuIcons_hamburger).removeClass('d-none');
            $(mobMenuIcons_close).addClass('d-none');
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').removeClass('keep_sticky');
            }
        }
        else{
            $(mobileOptionsOverlay).removeClass('d-none');
            $(mobMenuIcons_hamburger).addClass('d-none');
            $(mobMenuIcons_close).removeClass('d-none');
            if(window.innerWidth > 767){
                $('.header').closest('.abbott-wrapper').addClass('keep_sticky');
            }
        }
    });

    //Set active class in menu-sublinks
    function setActiveLink(){
        let isActiveFound = false;
        const links = menuSublinksContainer.find('li.a-link');
        if(window.innerWidth > 991){
            const urlLoaded = window.location.pathname;
            
            if(links.length >0){
                $(links).each(function(){
                    const url = $(this).find('a').length && $(this).find('a').attr('href');
                    const pg_name = url && url.split('/')[url.split('/').length -1];
                    if(pg_name && urlLoaded.includes(pg_name)){
                        $(this).addClass('active');
                        isActiveFound = true;
                    }
                })
            }
        }
        if(!isActiveFound){
            $(links).find('li.a-link').removeClass('active');
        }
        return isActiveFound;
    }

    function setHeaderSticky(){
        if(window.innerWidth > 767){
            $('.header').closest('.abbott-wrapper').removeClass('keep_sticky');
        }
        else{
            $('.header').closest('.abbott-wrapper').addClass('keep_sticky');
        }
    }

    setMenuIcon();
    setActiveLink();
    setHeaderSticky();
    $(window).resize(function(){
        setMenuIcon();
        setActiveLink();
        setHeaderSticky();
    });
});

$(document).on('scroll', '', function(e){
    if($('.lang-dropdown .m-link-stack__dropdown-wrapper').is(':visible')){
        $('.lang-dropdown .m-link-stack__dropdown-wrapper').removeClass('d-none');
        $('.lang-dropdown .m-link-stack__dropdown-wrapper').addClass('m-link-stack__dropdown-wrapper-show');
    }
});

//header globe icon click for language changes
$(document).on('click', '.lang-selector-icon a', function(e){
    e.preventDefault();
});

$(document).on('click', '.lang-dropdown .m-link-stack__list .m-link-stack__list-item', function(e){
    e.preventDefault();
    const lang = $(this).find('a.a-link__text').text() ? $(this).find('a.a-link__text').text().trim() : 'English';
    let url = $(this).find('a.a-link__text').attr('href');
    $search.setLocalStorage('curr-lang', lang);
    sessionStorage.setItem('language',  lang.toLowerCase());
    //set url to elabeling page
    if($globals.indexPageRedirectionPage){
        let currPath = url ? url.split('/') :  location.pathname ? location.pathname.split('/') : [];
        currPath.map((p,i) => {
            if(p.split('.html').length > 1){
                currPath[i] = $globals.indexPageRedirectionPage;
            }
            return true;
        });
        url = currPath.join('/').replace('/hcp','').replace('/nhcp','');
    }
    localStorage.removeItem('isHCP');
    localStorage.removeItem('curr-country-cd');
    localStorage.removeItem('curr-country');
    //removed curr-language to fix globe icon issue
    localStorage.removeItem('selectedCountry');
    window.open(url, '_self');
});

//On click of switch view, set default values for HCP/NHCP radio button
$(document).on('click', '.switch-overlay', function(e){
    e.preventDefault();
    let url = $(this).find('a.a-link__text').attr('href');
    localStorage.removeItem('isHCP');
    window.open(url, '_self');
});

//logo, header and footer menu link clicks
$(document).on('click', '.o-header__utility-nav .js-collapsable-links .a-link a, .footer .js-collapsable-links .a-link a, .a-logo-comp--link', function(e){
    e.preventDefault();
    let urlAuthored = $(this).attr('href');
    const target = $(this).attr('target') === '_blank' ? '_blank' : '_self';
    const paths = urlAuthored.split('/');
    const page = paths.length > 1 ? paths[paths.length-1] : 'home.html';
    if($globals.hcpAndNhcpUrlPages.includes(page)){
        const nhcpUrl = $globals.nhcpBaseUrl ? $globals.nhcpBaseUrl.indexOf('.html') > 1 ? $globals.nhcpBaseUrl : $globals.nhcpBaseUrl+'.html' : (urlAuthored && urlAuthored.replace('/hcp/','/nhcp/'));
        let role = $search.getLocalStorage('isHCP') ? $search.getLocalStorage('isHCP') : 'NHCP';
        role = role && (role.toUpperCase() === 'Y' || role.toUpperCase() === 'YES' || role.toUpperCase() === 'HCP' || role.toUpperCase() === 'TRUE') ? 'HCP' : 'NHCP';
        //set urls for redirection
        const url = (role === 'HCP') ? urlAuthored : nhcpUrl;
        window.open(url, target);
    }
    else{
        window.open(urlAuthored, target);
    }  
});

$(document).ready(function() {
            sortDropdown('.lang-dropdown', '.m-link-stack__list');
});
//to sort the languages in globeicon
function sortDropdown(ulclass, liclass) {
      let eleUl = $(ulclass).find(liclass);
      let eleLi = eleUl.children("li");
      if(eleLi && eleLi.length > 1) {
            eleLi.sort(function(a, b) {
                  let A = $(a).text().trim();
                  A = A.replace(A.substr(0,A.indexOf("(")+1),"").toUpperCase();
                  let B = $(b).text().trim();
                B=B.replace(B.substr(0,B.indexOf("(")+1),"").toUpperCase();
                 if(B!=='EN)')
                  return (A > B) ? 1 : ((A < B) ? -1 : 0);

            }).appendTo(eleUl);

            eleLi.map((i, el) => {    
                $(el.children[0]).css("margin-left", "5px")
                el.append(el.children[0]);
            });
      }
	  
}
// Fix for Bahasa language iso code issue 
$(document).ready(function () {
    $('.m-link-stack--dropdown .cmp-languagenavigation__item--langcode-in').each(function() {
        let aLink = $(this).find('.a-link');
        let aLinkLang = aLink.attr('lang');
        if(aLinkLang == 'in-ID' || aLinkLang == 'in' ) {
            $(this).find('.m-link-stack__lang').html(`(id)`);
            aLink.attr('lang', 'id');
        }
        let aLinktext = $(this).find('.a-link .a-link__text');
        let aLinktextLang = aLinktext.attr('lang');
        if(aLinktextLang == 'in-ID' || aLinktextLang == 'in') {
            aLinktext.attr('hreflang', 'id');
            aLinktext.attr('lang', 'id');
        }
    });
})


