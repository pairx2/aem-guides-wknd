/**
 * Mega Menu
 */
(function(){
    'use strict';
    class Megamenu {
        constructor(ele) {
            var $ele = $(ele),
                $sideLinkV1 = $ele.find('.m-mega-menu__default-wrapper .a-link'),
                $sideLinkV3 = $ele.find('.m-mega-menu__nested-menu-wrapper .a-link'),
                $toggleMobileItems = $ele.find('.m-mega-menu__mobile-item .m-mega-menu__mobile-header'),
                $hamburgerIcon = $ele.find('.navbar-toggler'),
                $tertiaryMenuTitle = $ele.find('.m-mega-menu__mobile-sub-head'),
                $buyNow = $ele.find('.m-mega-menu__mobile-buy-now'),
                mobileMenu = $ele.find('#navbarNavAltMarkup').get(0),
                $mainLi = $ele.find('.m-mega-menu__mobile-item-wrapper'),
                $var3Wrapper = $ele.find('.m-mega-menu__side-nav-transparent'),
                $megaMenuV1 = $ele.find('.m-mega-menu__default'),
                $megaMenuV2 = $ele.find('.m-mega-menu__list-var'),
                $megaMenuV3 = $ele.find('.m-mega-menu__nested-menu'),
                that,
                isMenuVisible = false;

                that = this;
                let $megaMenu = $mainLi.find('[data-js-component="mega-menu"]');

            // Mobile menu functionalities
            $hamburgerIcon.on('click', function(){
                that.showMobileMenu($hamburgerIcon, mobileMenu);
            });

            $toggleMobileItems.on('click', function() {
                that.toggleMobileContent.call(this, $toggleMobileItems);
            });

            $tertiaryMenuTitle.on('click', function() {
                that.expandTertiaryMenu.call(this, $tertiaryMenuTitle);
            });

            $buyNow.on('click', function(e) {
                that.customStyle(e, $buyNow);
            });
            // on scroll mega menu hiding.
            $(document).on('scroll', function(){
                if (isMenuVisible) {
                    $megaMenu.css('display','none');
                    isMenuVisible = false;
                }
            });

            // Show respective mega menu version on hover
            $mainLi.hover(function(e) {
                var targetEl = e.target,
                    respectiveLi = targetEl.closest('li');
                    isMenuVisible = true;
                    $(respectiveLi).find('[data-js-component="mega-menu"]').fadeIn();
                    $(respectiveLi).find('a.nav-item').attr('aria-expanded','true');

            }, function(e) {
                var targetEl = e.target,
                    respectiveLi = targetEl.closest('li');
                    isMenuVisible = false;
                $(respectiveLi).find('[data-js-component="mega-menu"]').fadeOut();
                $(respectiveLi).find('a.nav-item').removeAttr("aria-expanded");
            });

            // Show respective sub nav on hover for version 1
            $sideLinkV1.hover(function(e) {
                that.showSubMenu(e, $sideLinkV1, $sideLinkV3);
            }, function(e) {
                that.hideSubMenu(e, $sideLinkV3);
            });

            // Show respective sub nav on hover for version 3
            $sideLinkV3.hover(function(e) {
                that.showSubMenu(e, $sideLinkV1, $sideLinkV3);
                //$(this).find('.a-link__text').attr("aria-expanded", "true");
            }, function(e) {
                that.hideSubMenu(e, $sideLinkV3);
                $(this).find('.a-link__text').removeAttr("aria-expanded");
            });

            // Continue showing version 3 sub nav until present within the direct parent container
            $var3Wrapper.hover(function() {
                that.showTertiaryNav($var3Wrapper);
            }, function() {
                that.hideTertiaryNav($var3Wrapper);
            });

			// code to heightlight underline in primary menu
            var currPageName = window.location.pathname,
                linkItem = $(".m-mega-menu--underline .navbar-collapse-wrapper a[href*='" + currPageName + "']");
            if (linkItem.length > 0 && $(window).width() >= 1024) {
                linkItem.parents('.m-mega-menu__mobile-item-wrapper').addClass('m-mega-menu__mobile-item-wrapper--underline');
            }
        }


        /**
        * @function
        * @desc Show/hide mobile menu on hamburger click
        * @param {Object} event
        */

        showMobileMenu($hamburgerIcon, mobileMenu) {
            if($hamburgerIcon.length) {
                $hamburgerIcon.toggleClass('abt-icon-cancel');
                if (mobileMenu.style.display === "block") {
                    mobileMenu.style.display = "none";
                } else {
                    mobileMenu.style.display = "block";
                }
            }
        }

        /**
        * @function
        * @desc Expand secondary menu on click
        * @param {Object} event
        */

        toggleMobileContent($toggleMobileItems) {
            if($toggleMobileItems.length) {
                var headerElems = document.querySelectorAll('.m-mega-menu__mobile-header'),
                    menuItemElems = document.querySelectorAll('.m-mega-menu__mobile-item-wrapper'),
                    that;

                that = this;

                var menuLi = that.closest('li'),
                    mobProducts = that.nextElementSibling,
                    mobProductsAll = document.querySelectorAll('.m-mega-menu__mobile-products');

                headerElems.forEach(function(item) {
                    if(item !== that) {
                        item.classList.remove('active');
                    }
                });

                if(that.classList.contains('active')) {
                    that.classList.remove('active');
                    that.setAttribute("aria-expanded", "false");
                }else {
                    that.classList.add('active');
                    that.setAttribute("aria-expanded", "true");
                }


                menuItemElems.forEach(function(item) {
                    if(item !== menuLi) {
                        item.classList.remove('menu-active');
                    }
                });

                if(menuLi.classList.contains('menu-active')) {
                    menuLi.classList.remove('menu-active');
                }else {
                    menuLi.classList.add('menu-active');
                }

                mobProductsAll.forEach(function(item) {
                    if(item !== mobProducts) {
                        item.classList.add('d-none');
                    }
                });

                if(mobProducts.classList.contains('d-none')) {
                    mobProducts.classList.remove('d-none');
                }else {
                    mobProducts.classList.add('d-none');
                }

            }
        }

        /**
        * @function
        * @desc expand tertiary menu on arrow click
        * @param {Object} event
        */

        expandTertiaryMenu($tertiaryMenuTitle) {
            var tertiaryHeaderElems = document.querySelectorAll('.m-mega-menu__mobile-sub-head'),
                that;

                that = this;

            var mobTer = that.nextElementSibling,
                mobTerAll = document.querySelectorAll('.m-mega-menu__mobile-tertiary');

            if($tertiaryMenuTitle.length) {
                tertiaryHeaderElems.forEach(function(item) {
                    if(item !== that) {
                        item.classList.remove('active');
                    }
                });

                if(that.classList.contains('active')) {
                    that.classList.remove('active');
                }else {
                    that.classList.add('active');
                }

                mobTerAll.forEach(function(item) {
                    if(item !== mobTer) {
                        item.classList.add('d-none');
                    }
                });

                if(mobTer.classList.contains('d-none')) {
                    mobTer.classList.remove('d-none');
                }else {
                    mobTer.classList.add('d-none');
                }
            }
        }

        /**
        * @function
        * @desc Method to add custom style on buy now click
        */

        customStyle(e, $buyNow) {
            if($buyNow.length) {
                e.target.classList.toggle('active');
            }
        }


        /**
        * @function
        * @desc method to expand respective navigation for variation 1 & 3
        */

        showSubMenu(e, $sideLinkV1, $sideLinkV3) {
            var targetEl = e.target;
            //Show sub menu on hover in version  1
            if($sideLinkV1.length) {
                var terNav = e.target.querySelector('.m-mega-menu__nested-menu-img-list');
                if(terNav) {
                    terNav.classList.add('d-flex');
                }
            }

            //Show sub menu on hover in version 3
            if($sideLinkV3.length) {
                var terNav = e.target.querySelector('.m-mega-menu__nested-menu-img-list');
                if(terNav) {
                    terNav.classList.add('d-flex');
                }
            }
        }

        hideSubMenu(e, $sideLinkV3) {
            if($sideLinkV3.length) {
                var subsequentMenu = document.querySelectorAll('.m-mega-menu__nested-menu-img-list');
                subsequentMenu.forEach(function(item) {
                    item.classList.remove('d-flex');
                });
            }
        }


        /**
        * @function
        * @desc Method to continue showing tertiary nav on hover in version 3
        */

        showTertiaryNav($var3Wrapper) {
            if($var3Wrapper.length) {
                $(this).find('.m-mega-menu__nested-menu-img-list').addClass('d-flex');
            }
        }

        hideTertiaryNav($var3Wrapper) {
            if($var3Wrapper.length) {
                $(this).find('.m-mega-menu__nested-menu-img-list').removeClass('d-flex');
            }
        }

    }

    $(document).ready(function(){
        document.querySelectorAll('[data-js-component="mega-menu"]').forEach(function(ele){
            new Megamenu(ele);
        });

        // Compact Mobile Header
        let $compactHeaderNavbarToggle = $('.compact-mobile .o-header__col-mega-menu-mobile .navbar-toggler');
        if ($compactHeaderNavbarToggle) {
          $compactHeaderNavbarToggle.on('click', function (e) {
            e.preventDefault();
            $('.o-header__mega-menu .navbar-toggler').first().trigger('click');
            $('.o-header__mega-menu').toggleClass('open');
            $(e.currentTarget).toggleClass('abt-icon-cancel');
          });
        }
    });

})();
