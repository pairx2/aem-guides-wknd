/**
 * Header component
 */
 (function() {
    'use-strict';
    class Header {
        private _isSticky: boolean;
        private _stickyTopPos: number;
        public $ele: JQuery<Element>;
        private _stickySection: JQuery<Element>;
        private pwaCheckHideSearchInput: JQuery<Element>;
        private searchIcon: JQuery<Element>;
        public userActivityNav: JQuery<Element>;
        public utilityNav: JQuery<Element>;
        public searchForm: JQuery<Element>;
        public searchOverlay: JQuery<Element>;
        public searchCloseIcon: JQuery<Element>;
        private _searchIcon: JQuery<Element>;
        private _mobHeaderSearchExpand: JQuery<Element>;
        private stickySearch: JQuery<Element>;
        private logoSection: JQuery<Element>;
        private desktopSearch: JQuery<Element>;
        private searchCont: JQuery<Element>;
        private stickySearchIcon: JQuery<Element>;
        private stickyClose: JQuery<Element>;
        private stickySearchInput: JQuery<Element>;
        private stickySection: JQuery<Element>;
        private stickyMenu: JQuery<Element>;
        private searchPlaceholderText: string;
		private _alertBar: Element;
        private _alertHeight: any;

        constructor(ele) {
            this.$ele = $(ele);
            this._stickySection = this.$ele.find('[data-sticky="true"]');
            this._isSticky= false;
            this._stickyTopPos = this.$ele.offset().top;

            //Header search
            this.pwaCheckHideSearchInput = this.$ele.find('#pwaHideSearchInNav');
            this.searchIcon = this.$ele.find('.o-header__search .a-search__input');
            this.userActivityNav = this.$ele.find('.o-header__user-activity');
            this.utilityNav = this.$ele.find('.o-header__utility-nav');
            this.searchForm = this.$ele.find('.a-search');
            this.searchOverlay = this.$ele.find('.o-header__search-overlay');
            this.searchCloseIcon = this.$ele.find('[data-search-close="close"]');
            this._mobHeaderSearchExpand = this.$ele.find('.o-header__mob-search');
            this.searchPlaceholderText = this.searchIcon?.attr('data-placeholder');
            this.logoSection = this.$ele.find('.o-header__logo-section .container');
            this.stickySection = this.$ele.find('.o-header__sticky-section');
            this.stickyMenu = this.$ele.find('.m-mega-menu__mobile .navbar');
            this.stickySearch = this.$ele.find('.o-header__sticky-search');
            this.stickySearchInput = this.$ele.find('.o-header__sticky-search .a-search__input');
            this.stickySearchIcon = this.stickySearch.find('[data-search-click="click"]');
            this.stickyClose = this.stickySearch.find('[data-search-close="close"]');
            this.desktopSearch = this.$ele.find('.o-header__search');
            this.searchCont = this.$ele.find('[data-search-icon="search"]');

            this._searchIcon = this.searchCont.find('[data-search-click="click"]');

            var $this;
            $this = this;
            $(window).on('scroll', () => $this.onScroll());


            //Header search events
            this.searchPlaceholderWidthChange();
            $this.searchOverlay.on('click', (e) => $this.onOutsideClickHeader(e));
            $this.searchIcon.on('click', () =>  $this.onClickSearchIcon(event));
            $this._searchIcon.on('click', () =>  $this.onClickSearchIcon(event));
            $this.searchCloseIcon.on('click', () =>  $this.onClickSearchClose());
            $this.stickySearchInput.on('click', () => $this.onStickySearchClick(event));
            $this.stickySearchIcon.on('click', () => $this.onStickySearchClick(event));
            $this.stickyClose.on('click', () => $this.onStickySearchClose(event));
            $this._searchIcon.on('keyup', () =>  $this.onSearchEnter());
            $this.stickySearchIcon.on('keyup', () => $this.onSearchEnter());
            this.adjustAlertBar();
            this.handleSearchForPwa($this.pwaCheckHideSearchInput);
        }

        /**
       * @function
       * @desc hide search for pwa when user is offline
       * @param {Object} pwaCheckHideSearchInput hidden input field
       */

        private handleSearchForPwa(pwaCheckHideSearchInput) {
            if (pwaCheckHideSearchInput && pwaCheckHideSearchInput.length > 0) {
                var pwaHideSearchEnable = pwaCheckHideSearchInput.val();
                if (pwaHideSearchEnable === 'true') {
                    window.addEventListener('offline', (event) => {
                        this.searchForm.addClass('d-none');
                    });
                    window.addEventListener('online', (event) => {
                        this.searchForm.removeClass('d-none');
                    });
                }
            }
        }

        private searchPlaceholderWidthChange() {
            if(!this.searchPlaceholderText) {
                return;
            }

            var scalingFactor = (this.searchPlaceholderText.length> 55)? ((this.searchPlaceholderText.length/100)*90):0;
            if(this.searchPlaceholderText.length < 10) {
                let offset = (this.searchPlaceholderText?.length * (-13));
                this.searchForm.css('left', offset);
                this.userActivityNav
                  .css('left', offset)
                  .css('margin-left', -offset);

            } else {
                this.searchIcon.width((this.searchPlaceholderText?.length * 5.7) + 125);
                let offset = (this.searchPlaceholderText?.length * (-4.2))+(-125)-scalingFactor;
                this.searchForm.css('left', offset);
                this.userActivityNav
                  .css('left', offset)
                  .css('margin-left', -offset);
            }
        }

         /**
        * @function
        * @desc Close search on outside click
        * @param {Object} event
        */

       private onOutsideClickHeader(e) {
        event.preventDefault();
         this.onStickySearchClose(e);
         this.onClickSearchClose();


    }

	// Alert and header combination
    public adjustAlertBar() {
        this._alertBar = document.querySelector('.m-alert--sticky');
        if(this._alertBar) {
            this._alertHeight = this._alertBar.clientHeight;

            if(this._alertBar.classList.contains('m-alert--hide')) {
                this.$ele.removeClass('o-header__sticky-parent');
                this.$ele.css('top', 0);
            }else {
                this.$ele.addClass('o-header__sticky-parent');
                this.$ele.css('top', this._alertHeight);
            }
        }
    }

        /**
        * @function
        * @desc Sticky header behaviour on page scroll
        * @param {Object} event
        */

        private onScroll () {

            //  Make the header sticky
            if (window.pageYOffset > this._stickyTopPos && !this._isSticky) {
                this._isSticky = true;
                this._stickySection.addClass('sticky');
                this.stickySearch.addClass("show");
                this._stickySection.siblings('.o-header__secondary-top-nav').removeClass('d-lg-block');
                //  Check alert height again as it might be closed by the user
                if(this._alertBar) {
                    if(this._alertBar.scrollHeight != 0) {
                        this._stickySection.css('top', this._alertHeight);
                    }
                    else {
                        this._stickySection.css('top', 0);
                    }
                }else {
                    this._stickySection.css('top', 0);
                }

            } else if((window.pageYOffset < this._stickyTopPos || window.pageYOffset === this._stickyTopPos) && this._isSticky) {
                this._isSticky = false;
                this._stickySection.removeClass('sticky');
                this.stickySearch.removeClass("show");
                this._stickySection.siblings('.o-header__secondary-top-nav').addClass('d-lg-block');
            }

        }

        public onClickSearchIcon(event) {
            event.preventDefault();
            this.$ele.addClass('o-header--full-width');
            this.utilityNav.addClass('d-none');
            this.searchForm.addClass('a-search--expand');
            this.searchIcon.css('width', '');
            this.searchIcon.css('background-color', '#fff');
            this.searchIcon.focus();
            this.searchOverlay.addClass('d-block');
            this.stickySection?.addClass('show');
            this._mobHeaderSearchExpand.addClass('expand');
            $('body').addClass('no-scroll-y');
        }

        public onStickySearchClick(event) {
            event.preventDefault();
            this.stickySearch?.addClass('sticky-pos');
            this.logoSection.addClass('o-header__sticky--full-width');
            this.stickySection.addClass('show');
            this.stickyMenu.addClass('show');
            this.searchForm.addClass('a-search--expand');
            this.stickySearchInput.css('background-color', '#fff');
            this.stickySearchInput.select();
            this.stickySearchInput.css('width', '');
            this.searchOverlay.addClass('d-block');
            $('body').addClass('no-scroll-y');
        }

        public onStickySearchClose(event) {
            event.preventDefault();
            event.stopPropagation();
            this.stickySearch?.removeClass('sticky-pos');
            this.logoSection.removeClass('o-header__sticky--full-width');
            this.searchForm.removeClass('a-search--expand');
            this.searchOverlay.removeClass('d-block');
            this.stickySection.removeClass('show');
            this.stickyMenu.removeClass('show');
            this.stickySearchInput.css('background-color', 'transparent');
            this.searchOverlay.removeClass('d-block');

        }


        public onClickSearchClose() {
            this.$ele.removeClass('o-header--full-width');
            this.utilityNav.removeClass('d-none');
            this.searchForm.removeClass('a-search--expand');
            this.searchOverlay.removeClass('d-block');
            this.searchIcon.css('background-color', 'transparent');
            this._mobHeaderSearchExpand.removeClass('expand');
            this.stickySection?.removeClass('show');
            this.searchIcon.val('');
            $('body').removeClass('no-scroll-y');
            this.searchPlaceholderWidthChange();
        }

        public onSearchEnter(e) {
            var searchtext = this.$ele.find('.a-search__input').val();
            var searchInputName = this.$ele.find('.a-search__input').attr('name');
            window.location.href = `?${searchInputName}=${searchtext}`;
        }

    }

    $(document).ready(function() {
        document.querySelectorAll('[data-js-component="header"]').forEach(function (ele) {
            new Header(ele);
        });
    })

})();

