(() => {
  'use-strict';

  const namespace = 'header-v2';

  const events = {
    mounted: `${namespace}.mounted`,
    logout: `${namespace}.logout`,
  };

  const attributes = {
    position: 'data-position',
    authenticated: 'data-authenticated',
  };

  const classes = {
    sticky: 'sticky',
    open: 'open',
    searchOverlay: 'a-search__overlay',
    stickyPlaceHolderClass: `o-${namespace}-global__placeholder`
  };

  const selectors = {
    self: `[data-js-component="${namespace}"]`,
    headerSection: `.o-${namespace}-section`,
    stickySection: '[data-sticky="true"]',
    searchBar: '.a-search',
    searchInput: '.a-search__input',
    searchPlaceholderClass: 'a-search__input-placeholder',
    searchClose: '[data-search-close="close"]',
    searchOverlay: `.${classes.searchOverlay}`,
    navbar: '[data-js-component="mega-menu"]',
    navbarToggle: '.navbar-toggler',
    navbarDropdown: '.navbar-collapse',
    linkStack: '.m-link-stack.m-link-stack--dropdown',
    linkStackToggle: '.m-link-stack__link',
    linkStackDropdown: '.m-link-stack__dropdown-wrapper',
    logoutLink: '[href="#logout"], [name="logout"]',
    stickySectionPlaceHolder: `.${classes.stickyPlaceHolderClass}`
  };

  class HeaderV2 {
    private _isSticky: boolean;
    private _isStickyClassAdded: boolean;
    private _stickyTopOffset: number;

    public $ele: JQuery<Element>;
    public $stickySection: JQuery<Element>;
    public $searchBars: JQuery<Element>;
    public $navbars: JQuery<Element>;
    public $linkStacks: JQuery<Element>;
    public $logoutLinks: JQuery<Element>;

    public authenticate: (
      isAuthenticated: boolean
    ) => void = this.handleAuthentication.bind(this);

    constructor(ele: HTMLElement) {
      this.$ele = $(ele);
      this._isStickyClassAdded = false;
      this.$stickySection = this.$ele.find(selectors.stickySection);
      this.$searchBars = this.$ele.find(selectors.searchBar);
      this.$navbars = this.$ele.find(selectors.navbar);
      this.$linkStacks = this.$ele.find(selectors.linkStack);
      this.$logoutLinks = this.$ele.find(selectors.logoutLink);

      this._isSticky = this.$stickySection.length > 0;

      this.initializeSearch();
      this.initializeNavbars();
      this.initializeLinkStacks();

      if (this._isSticky) {
        this.initializeStickyHeader();
      }

      this.$logoutLinks.on('click', this.onLogoutClick.bind(this));
      this.$searchBars.on('click', this.onSearchClick.bind(this));

      window.addEventListener('scroll', this.onScroll.bind(this));
      window.addEventListener('resize', this.onResize.bind(this));
      window.addEventListener('click', this.onClick.bind(this));

      window.dispatchEvent(new CustomEvent(events.mounted, { detail: this }));
    }

    private initializeStickyHeader(): void {
      this._calculateStickyTopOffset();
      this._checkSticky();
    }

    private initializeSearch(): void {
      this.$searchBars.each((i, searchBar) => {
        const $searchBar = $(searchBar);

        if ($searchBar.find(selectors.searchOverlay).length === 0) {
          const $input = $searchBar.find(selectors.searchInput);
          const $overlay = $('<div>', {
            class: classes.searchOverlay,
          });
          const hasPlaceholder: boolean = $input.is('[placeholder]');

          if (hasPlaceholder) {
            $('<span></span>')
              .text($input.attr('placeholder'))
              .addClass(selectors.searchPlaceholderClass)
              .insertAfter($input);
          }

          $searchBar.append($overlay);
        }
      });
    }

    private initializeNavbars(): void {
      this.$navbars.each((i, navbar) => {
        const $navbar = $(navbar);
        const $toggle = $navbar.find(selectors.navbarToggle);

        if ($toggle.length === 0) return;

        const $dropdown = $navbar.find(selectors.navbarDropdown);

        $toggle.on('click', () => {
          if (!$dropdown.is(':hidden')) {
            const {
              position,
              width,
              toggleWidth,
            } = this._calculateDropdownProperties($toggle);

            $dropdown.attr(attributes.position, position);
            $dropdown.width(width - toggleWidth);
          }
        });
      });
    }

    private initializeLinkStacks(): void {
      this.$linkStacks.each((i, linkStack) => {
        const $linkStack = $(linkStack);
        const $toggle = $linkStack.find(selectors.linkStackToggle);
        const $dropdown = $linkStack.find(selectors.linkStackDropdown);

        $toggle.on('click', () => {
          if (!$dropdown.is(':hidden')) {
            const { position, width } = this._calculateDropdownProperties(
              $toggle
            );

            $dropdown.attr(attributes.position, position);
            $dropdown.css('maxWidth', width);
          }
        });
      });
    }

    private handleAuthentication(isAuthenticated: boolean = false): void {
      if (isAuthenticated) {
        this.$ele.attr(attributes.authenticated, '');
      } else {
        this.$ele.removeAttr(attributes.authenticated);
      }

      this.initializeNavbars();
      this.initializeLinkStacks();
    }

    private onSearchClick(event: JQuery.ClickEvent): void {
      event.preventDefault();

      const $target = $(event.target);
      const $searchBar = $target.closest(selectors.searchBar);

      if (this._isSearchCloseToggle($target)) {
        this._closeSearch($searchBar);
      } else {
        this._openSearch($searchBar);
      }
    }

    private onLogoutClick(event: JQuery.ClickEvent): void {
      event.preventDefault();
      this.authenticate(false);
      window.dispatchEvent(new CustomEvent(events.logout, { detail: this }));
    }

    private onResize(): void {
      this.$ele.find(selectors.navbarDropdown).width('');

    }

    private onScroll(): void {
      if (this._isSticky) {
        this._checkSticky();
      }
    }

    private onClick(): void {
      if (this._isSticky) {
        this._calculateStickyTopOffset();
      }
    }

    private _checkSticky(): void {
      const scrollTop: number = window.scrollY;

      if ((scrollTop > this._stickyTopOffset ) && !this._isStickyClassAdded) {
        this._isStickyClassAdded = true;
        const stickySectionHeight =  this.$stickySection?.outerHeight() ?? 0;
        this.$stickySection?.siblings(selectors.stickySectionPlaceHolder)?.css('height', `${stickySectionHeight}px`);
        this.$stickySection.addClass(classes.sticky);
      } else if((scrollTop < this._stickyTopOffset || scrollTop === this._stickyTopOffset) && this._isStickyClassAdded){
        this.$stickySection?.siblings(selectors.stickySectionPlaceHolder)?.css('height', `0px`);
        this.$stickySection.removeClass(classes.sticky);
        this._isStickyClassAdded = false;
      }
    }

    private _openSearch($searchBar: JQuery<Element>): void {
      $searchBar.addClass(classes.open);
      $searchBar.find(selectors.searchOverlay).show();
      $searchBar.find(selectors.searchInput).trigger('focus');
      $('body').css('overflow-y', 'hidden');
    }

    private _closeSearch($searchBar: JQuery<Element>): void {
      $searchBar.removeClass(classes.open);
      $searchBar.find(selectors.searchOverlay).hide();
      $('body').css('overflow-y', '');
    }

    private _calculateStickyTopOffset(): void {
      this._stickyTopOffset = this.$ele.offset().top;
    }

    private _calculateDropdownProperties(
      $toggle: JQuery<Element>
    ): { position: 'left' | 'right'; width: number; toggleWidth: number } {
      const $section = $toggle.closest(selectors.headerSection);

      const maxWidth: number = $section.outerWidth();
      const toggleWidth: number = $toggle.outerWidth();
      const toggleOffsetLeft: number =
        $toggle.offset().left - $section.offset().left;
      const toggleOffsetRight: number = Math.abs(
        maxWidth - (toggleWidth + toggleOffsetLeft)
      );
      const position: 'left' | 'right' =
        toggleOffsetLeft > toggleOffsetRight ? 'left' : 'right';
      const width: number =
        maxWidth - (position === 'left' ? toggleOffsetRight : toggleOffsetLeft);

      return {
        position,
        width,
        toggleWidth,
      };
    }

    private _isSearchCloseToggle($element: JQuery<Element>): boolean {
      return (
        $element.closest(selectors.searchClose).length > 0 ||
        $element.is(selectors.searchOverlay)
      );
    }
  }

  $(() => {
    $(selectors.self).each((i, ele) => {
      new HeaderV2(ele as HTMLElement);
    });
  });
})();
