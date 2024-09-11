/**
 * @function
 * @desc class for the link stack variation component
 */

 (function() {
    'use-strict';

    class LinkStackVariation {

        private elem: JQuery<HTMLElement>;
        private searchBar: JQuery<HTMLElement>;
        private li: JQuery<HTMLElement>;
        private anchor: JQuery<HTMLElement>;
        private languageList: JQuery<HTMLElement>;
        private languageTitle: JQuery<HTMLElement>;

        constructor(options) {
            this.elem = $(options),
            this.searchBar = this.elem.closest('.m-link-stack').find('[name="search"]'),
            this.li = this.elem.closest('.m-link-stack__country-select').find('.m-link-stack__list-item');
            this.elem.on('click', this.toggleLinkStackVariation.bind(this));
            this.searchBar.on('input', this.smartSearch.bind(this));
            $(document).on('click scroll', this.handleClickOutsideDropdown.bind(this));
            this.languageList = this.elem.closest('.m-link-stack__country-select').find('.m-link-stack__country-select__sort');
            this.languageTitle = this.elem.closest('.m-link-stack__country-select').find('.m-link-stack__link');
            if(this.languageList.length > 0){
                this.sortLanguageDropdown(this.languageList );
            }
        }

        closeDropdown() {
            var dd = $('.m-link-stack__dropdown-wrapper'),
                icon = $('.m-link-stack__link').find('.abt-icon'),
                border = $('.m-link-stack--dropdown'),
                text = $('.m-link-stack__link').find(".a-link__text");

            icon.each((i, item) => {
                $(item).removeClass('rotate-upside');
            });

            border.each((i, item) => {
                $(item).removeClass('m-link-stack--border');
            });

            text.each((i, item) => {
                $(item).removeClass('active');
            });

            for (var i = 0; i < dd.length; i++) {
                var x = dd[i];
                if (!x.classList.contains('d-none')) {
                    x.classList.add('d-none');
                }
            }
        }
        toggleLinkStackVariation(e = event) {
            e.preventDefault();
            e.stopPropagation();
            var $target = $(event.target),
                $collapse = $target.closest('.js-m-link-stack-dropdown').find('.js-collapsable-links-dropdown'),
                icon = $target,
                border = $target.closest('.m-link-stack--dropdown'),
                text = $target.closest('.a-link__text'),
                megaMenuItemSiblings = $target.closest('.m-mega-menu__mobile-item-wrapper').siblings();

            //check if any existing sibling(in the same parent container) link stack is,open then close it
            const isDropdownOpen = !!border.siblings('.m-link-stack--border').length;
            if (isDropdownOpen) this.closeDropdown()

            megaMenuItemSiblings.each(function (i, item) {
                let itemElHasDropdown = !!(item as HTMLElement).querySelector('.m-link-stack--border');
                if(itemElHasDropdown) this.closeDropdown();
            }.bind(this));

            //  Toggle the link  stack dropdown based on target clicked
            if ($collapse.length) {

                if (icon.hasClass('abt-icon')) {
                    icon.toggleClass('rotate-upside');
                } else if (icon.hasClass('a-link__text')) {
                    icon.find('.abt-icon').toggleClass('rotate-upside');
                }

                $collapse.toggleClass('d-none');
                text.toggleClass('active');
                border.toggleClass('m-link-stack--border');
            }
        }

        handleClickOutsideDropdown(event) {
            var dropdown = $('.m-link-stack__dropdown-wrapper, .m-link-stack__link');

            // Close the link  stack dropdown if the user clicks anywhere outside the dropdown
            if (!dropdown.is(event.target) && dropdown.has(event.target).length === 0) {
               this.closeDropdown();
            }
        }

        /**
         * @function
         * @desc Method for the smart search functionality in country sites dropdown
         */

        smartSearch(event) {
            var input, filter, a, i, span;
                input = event.target;
                filter = input.value.toUpperCase();

            // To check whether the entered input matches the country name or the language from the dropdown
            for (i = 0; i < this.li.length; i++) {

                a = this.li[i].getElementsByTagName('a')[0],
                span = this.li[i].getElementsByTagName('span')[0];

                if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || span.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    this.li[i].style.display = "";
                } else {
                    this.li[i].style.display = "none";
                }

            }
        }
        // Sort language navigation list alphabatically
        
        sortLanguageDropdown(ulElement: JQuery<HTMLElement>) {
            var elemUl = $(ulElement);
            var elemLi: any = elemUl.children("li");
            var navigationTitle = this.languageTitle.text().trim().replace(/\n/g,' ');
            var countryName = navigationTitle;
            
            // To get the country name of navigation title
            if(navigationTitle.indexOf("|") > -1){
                countryName = navigationTitle.split("|")[0].trim();
            }
            else if(navigationTitle.indexOf("(") > -1){
                countryName = navigationTitle.split("(")[0].trim();
            }

            // Sort list alphabatically and prefer corrosponding language first
            if(elemLi && elemLi.length > 1) {
                elemLi.sort(function(a, b) {
                    var A = $(a).find('.a-link__text').text().trim().toUpperCase();
                    var B = $(b).find('.a-link__text').text().trim().toUpperCase();
                    
                    if (A.indexOf(countryName.toUpperCase()) > -1) {
                        return -1;
                    } else if (B.indexOf(countryName.toUpperCase()) > -1) {
                        return 1;
                    } else {
                        if (A < B) {return -1;}
                        if (A > B) {return 1;}
                    }
                    return 0;
                }).appendTo(elemUl);
            }
        }

    }


    $(document).ready(function() {
        document.querySelectorAll('[data-js-component="link-stack-dropdown"]').forEach(function (ele) {
            new LinkStackVariation(ele);
        });
    })

})();
// Initialize component
