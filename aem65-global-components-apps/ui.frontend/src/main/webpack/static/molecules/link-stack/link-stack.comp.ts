/**
 * @function
 * @desc class for the link stack default variation component
 */

  export class DefaultLinkStack {
        
        private subscribers: Array<any> = [];
        constructor(options){
            const $collapseIcon = $(options).find('.js-collapse-icon');
            const $faqDropdown = $(options).find('.m-link-stack--dropdown');
            const $link = $(options).find('.a-link');
            $collapseIcon.on('click', this.toggleLinkStack);
            $faqDropdown.on('click', this.toggleFaqLinkStack);
            $link.on('click', this.selectLink);
            $(document).on('click', this.closeFaqLinkStack);
        }
    
        /**
         * @function
         * @desc toggle default link stack on click
         * @param {Object} event
         */
    
        toggleLinkStack(e = event) {
            e.preventDefault();
            const collapsableParentEml = $(event.target).closest('.js-m-link-stack');
            const $collapse = collapsableParentEml?.find('.js-collapsable-links');
            const $collapseIcon = collapsableParentEml?.find('.js-collapse-icon');

            if ($collapse.length) {
                $collapse.toggleClass('d-none');
                $collapseIcon.toggleClass('rotate-upside');
            }
        }

        /**
         * @function
         * @desc toggle default link stack on click
         * @param {Object} event
         */
    
        toggleFaqLinkStack(e = event) {
            e.preventDefault();

            var $faqDropdownList = $(event.target).closest('.js-m-link-stack').find('.js-faq-links');
            var $faqDropdownItem = $(event.target).closest('.js-m-link-stack').find('.m-link-stack--dropdown');
            if ($faqDropdownList.length) {
                $faqDropdownItem.toggleClass('m-link-stack--dropdown-open');
                $faqDropdownList.toggleClass('d-none');
            }
        }

        closeFaqLinkStack(event) {
            var $faqDropdownList = $('.js-faq-links');
            var $faqDropdownItem = $('.m-link-stack--dropdown');
            if (!$faqDropdownItem.is(event.target) && $faqDropdownItem.has(event.target).length === 0) {
                $faqDropdownItem.removeClass('m-link-stack--dropdown-open');
                $faqDropdownList.addClass('d-none');
            }
        }

        selectLink(e = event) {
            var $dropVal =  $(event.target).closest('.js-m-link-stack').find('.m-link-stack--dropdown-value');
            var clickedLink = $(event.target).find('.a-link__text');
            var clickedLinkVal = clickedLink.text();
            $dropVal.html(clickedLinkVal);
        }

        onDataLoad(handler: Function) {
            this.subscribers.push(handler);
        }


    }

(function() {
    $(document).ready(function() {
        document.querySelectorAll('[data-js-component="default-link-stack"]').forEach(function (ele) {
            new DefaultLinkStack(ele);
        });
    })

})();



/**
 * @function
 * @desc class for the link stack default variation component
 */

  export class DefaultLinkStackSticky {
        
        constructor(options){
            const $collapseIcon = $(options).find('.js-collapse-icon-sticky');
            const $dropdownOption = $(options).find('.js-link-stack-sticky-dropdown-option');
            $collapseIcon.on('click', this.toggleLinkStackSticky);
            $dropdownOption.on('click', this.setMobileButtonText);
            $(document).on('click', this.closeMobileMenu);

            this.setSticky($(options));
        }
    
        /**
         * @function
         * @desc toggle default link stack on click
         * @param {Object} event
         */
    
        toggleLinkStackSticky(e = event) {
            e.preventDefault();
    
            var $collapse  = $(event.target).closest('.js-m-link-stack-sticky').find('.js-collapsable-links-sticky');
            var $headerIcon = $(event.target).closest('.js-m-link-stack-sticky').find('.js-link-stack-sticky-header-icon');
            
            if ($collapse.length) {
                $collapse.toggleClass('d-none');
                $headerIcon.toggleClass('arrow-rotated-up');
            }
        }

        setMobileButtonText(e = event){   
            window.setTimeout(function() {
                var text = $(e.target).html();
                $('.js-collapse-icon-sticky .m-link-stack-sticky__header-title').html(text);
              }, 0);    
        }

        setSticky(option){
            if(option.data('sticky') && !option.data('editMode') ){
                option.appendTo(".o-header__sticky-section");
                option.removeClass("d-none");
            }  
        }

        closeMobileMenu(event){
            var $dropdownList = $('.js-collapsable-links-sticky');
            var $dropdownIcon = $('.js-collapse-icon-sticky');
            var $headerIcon = $('.js-link-stack-sticky-header-icon');
            
            if (!$dropdownIcon.is(event.target) && $dropdownIcon.has(event.target).length === 0) { 
                $dropdownList.addClass('d-none');
                $headerIcon.toggleClass('arrow-rotated-up');
            }
        }

    }

(function() {
    $(document).ready(function() {
        document.querySelectorAll('[data-js-component="default-link-stack-sticky"]').forEach(function (ele) {
            new DefaultLinkStackSticky(ele);
        });
    })

})();






