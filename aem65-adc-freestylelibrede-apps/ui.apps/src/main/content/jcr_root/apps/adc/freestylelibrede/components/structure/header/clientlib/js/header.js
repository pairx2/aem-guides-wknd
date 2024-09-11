jQuery.noConflict();

function handleHeaderMobileNav(navInnerContainer) {
    jQuery('.header-mobile-nav-icons-left').click(function () {
        if (jQuery(this).hasClass('active')) {
            jQuery(this).removeClass('active');
            navInnerContainer.css({
                left: '-100%',
                transition: '0.3s'
            });
            jQuery(this).find('.header-mobile-nav-icon-bar').show();
            jQuery(this).find('.header-mobile-nav-icon-close').hide();
        } else {
            jQuery(this).addClass('active');
            navInnerContainer.css({
                left: '0',
                transition: '0.3s'
            });
            jQuery(this).find('.header-mobile-nav-icon-bar').hide();
            jQuery(this).find('.header-mobile-nav-icon-close').show();
        }
    });
}

function handleNavItemHover(navItem, navDropdownContainer) {
    navItem.hover(function () {
        if (!(jQuery(this).hasClass('loginHeaderLi'))) {
            navDropdownContainer.removeClass('active').css('display', '');
            const currentId = jQuery(this).attr('data-tab');
            if (!(jQuery(this).hasClass('active'))) {
                navItem.removeClass('active');
                jQuery(this).addClass('active');
                jQuery('.nav-dropdown-container#' + currentId).addClass('active');
                jQuery('.nav-dropdown-container#' + currentId).hover(
                    function () {
                        jQuery('.nav-dropdown-container#' + currentId).addClass('active');
                        jQuery('li[data-tab = '+currentId+']').addClass('active');
                },
                    function () {
                        jQuery('.nav-dropdown-container#' + currentId).removeClass('active').css('display','');
                        jQuery('li[data-tab = '+currentId+']').removeClass('active');
                });
            } else {
                jQuery(this).removeClass('active').css('display', '');
            }
        }
    });  
}

function handleNonTabbing(navItem, navDropdownContainer) {
    navItem.click(function () {
        if (!(jQuery(this).hasClass('loginHeaderLi'))) {
            navDropdownContainer.removeClass('active').css('display', '');
            const currentId = jQuery(this).attr('data-tab');
            if (!(jQuery(this).hasClass('active'))) {
                navItem.removeClass('active');
                jQuery(this).addClass('active');
                jQuery('.nav-dropdown-container#' + currentId).addClass('active').css('display','block');
            } else {
                jQuery(this).removeClass('active').css('display', '');
                jQuery(this).mouseleave(function() {
                    jQuery(this).removeClass('active');
                    jQuery('.nav-dropdown-container#' + currentId).removeClass('active').css('display', '');
                  });
            }
        }
    })
}

function handleTabbing(tabOnly, navItem, navDropdownContainer) {
    if(tabOnly){
        navItem.click(function () {
            if (!(jQuery(this).hasClass('loginHeaderLi'))) {
                navDropdownContainer.removeClass('active').css('display', '');
                const currentId = jQuery(this).attr('data-tab');
                if (!(jQuery(this).hasClass('active'))) {
                    navItem.removeClass('active');
                    jQuery(this).addClass('active');
                    jQuery('.nav-dropdown-container#' + currentId).addClass('active').css('display','block');
                } else {
                    jQuery(this).removeClass('active').css('display', '');
                }
            }
        })
    }
    else{
        handleNonTabbing(navItem, navDropdownContainer); 
        handleNavItemHover(navItem, navDropdownContainer);
    }
}

function handleMobileTabbing(maxTab, navItem, mobileNavBackBtn, tabPanel) {
    if (maxTab) {
        navItem.click(function () {
            if (!(jQuery(this).hasClass('loginHeaderLi'))) {
                navItem.hide();
                mobileNavBackBtn.show();
                jQuery(this).css({
                    'display': 'flex',
                    'fontSize': '28px',
                    'lineHeight': '34px'
                }).find('img').hide();
                jQuery(this).css('pointer-events', 'none');
            }
        })
        // back button click
        mobileNavBackBtn.click(function () {
            navItem.css({
                'display': 'flex',
                'pointerEvents': 'auto',
                'fontSize': '18px',
                'lineHeight': '15px'
            }).find('img').css('display', 'inline');
            tabPanel.hide();
            jQuery(this).hide();
            navItem.removeClass("active");
        });
    }
}

function handleTabOnly(tabOnly) {
    if (tabOnly) {
        jQuery('.header-search-icon').click(function () {
            if (!(jQuery(this).hasClass('active'))) {
                jQuery(this).addClass('active');
                jQuery('.adc-search-container').show();
            } else {
                jQuery(this).removeClass('active');
                jQuery('.adc-search-container').hide();
            }
        }) 
    }
}

function handleCartDropdown(cartHeaderDropdown) {
    jQuery(document).on('click', '.nav-cart', function (e) {
        if (jQuery(this).hasClass('active')) {
            jQuery('.cart-header-dropdown').removeClass('active');
            jQuery(this).removeClass('active');
            jQuery('.cart-header-dropdown').hide();
        } else {
            jQuery('.cart-header-dropdown').addClass('active');
            jQuery(this).addClass('active');
            jQuery('.cart-header-dropdown').show();
        }
        let cartPositionTop = jQuery(this).position().top + 75;
        cartHeaderDropdown.css({            
            top: cartPositionTop + 'px'
        });
        e.stopPropagation();
    });
}

function handleMobileCartDropdown(cartHeaderDropdown) {
    jQuery(document).on('click', '.mobile-cart-icon', function(e) {
        if(!jQuery(this).hasClass('on-checkout')){
            if (jQuery(this).hasClass('active')) {
                jQuery(this).removeClass('active');
                cartHeaderDropdown.css({
                    'right': '-410px',
                    'transition': 'all 0.3s ease-in-out',
                    'display': 'none'
                });
            } else{
                jQuery(this).addClass('active');
                cartHeaderDropdown.css({
                    'right': 0,
                    'display': 'block',
                    'transition': 'all 0.3s ease-in-out'
                });
            }
        }
        e.stopPropagation();
    }) 
}

jQuery(document).ready(function () {
    let header = document.getElementById("headerTop");
    let rootpos = jQuery('.SiteContainer').children('.responsivegrid')
    if (header) {
        header.style.position = "fixed";
        rootpos[0].style.position = 'relative';
       rootpos.css("margin-top",(header.offsetHeight - jQuery('.experiencefragment')[0].offsetHeight ) + 'px');
    }

    if (jQuery('#headerTop').position()) {

        // Horizontal account menu list items(In Mobile View) scroll to top on click 
        document.querySelectorAll('.adc-sidebar__list-item').forEach((itemInList) => {
            itemInList.addEventListener('click', () => { window.scrollTo(0, 0) })
        });

    }
    let navItem = jQuery('.navbar-nav .nav-item');
    let navDropdownContainer = jQuery('.nav-dropdown-container');
    let mobileNavBackBtn = jQuery('.mobile-nav-back-btn');
    let navInnerContainer = jQuery('.nav-inner-container');
    let tabPanel = jQuery('.nav-dropdown-container');
    let maxTab = jQuery(window).width() < 768;
    let tabOnly = jQuery(window).width() < 991;

    handleHeaderMobileNav(navInnerContainer);

    jQuery(document).on('click', function (event) {
        if (!jQuery(event.target).closest('.nav-menu').length) {
            navInnerContainer.css({
                left: '-100%',
                transition: '0.3s'
            });
            jQuery('.header-mobile-nav-icons-left').removeClass('active');
            jQuery(this).find('.header-mobile-nav-icon-bar').show();
            jQuery(this).find('.header-mobile-nav-icon-close').hide();
        }
    });
    //hamburger end
    navItem.on('show.bs.dropdown', function () {
        jQuery(this).find('.dropdown-menu').first().slideToggle(500);
    })
    navItem.on('hide.bs.dropdown', function () {
        jQuery(this).find('.dropdown-menu').first().slideToggle(500);
    })
    // tabbing
    handleTabbing(tabOnly, navItem, navDropdownContainer);

    jQuery('.navlinks').click(function () {
        if (jQuery('.header-mobile-nav-icons-left').hasClass('active')) {
            jQuery('.header-mobile-nav-icons-left').removeClass('active');
            navInnerContainer.css({
                left: '-100%',
                transition: '0.3s'
            });
            jQuery('.header-mobile-nav-icon-bar').show();
            jQuery('.header-mobile-nav-icon-close').hide();
        } 
    });
    // /tabbing
    handleTabOnly(tabOnly);
    // for mobile
    handleMobileTabbing(maxTab, navItem, mobileNavBackBtn, tabPanel);
    // mobile end

    // header cart dropdown
    let cartHeaderDropdown = jQuery('.cart-header-dropdown');
    handleCartDropdown(cartHeaderDropdown);
    handleMobileCartDropdown(cartHeaderDropdown);
    jQuery('.cart-header-icon-cross').click(function () {
        jQuery('.mobile-cart-icon').removeClass('active');
        cartHeaderDropdown.css({
            'right': '-410px',
            'display': 'none',
            'transition': 'all 0.3s ease-in-out'
        });
    });
     
    // /header cart dropdown

    jQuery(document).click(function (e) {
        setTimeout(function () {
            if (!jQuery(e.target).is('.cart-header-dropdown.header-dropdown, .cart-header-dropdown.header-dropdown *') && !jQuery(e.target).is('img')) {
                cartHeaderDropdown.hide();
                jQuery('.nav-cart').removeClass('active');
            }
        });
    });
    let checkNewProductTemplate = document.querySelector("#adcde-nextGen-productPage");
    let socailshare = document.querySelector(".social-share");
    if(checkNewProductTemplate){
        socailshare.style.display = "none"
    }

});