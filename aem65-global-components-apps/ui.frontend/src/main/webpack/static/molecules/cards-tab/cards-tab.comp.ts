import "slick-carousel";

class CardsTab {

    private container: HTMLElement;
    private $container: JQuery<HTMLElement>;
    private cardsItem: NodeListOf <HTMLElement>;

    /**
     *Creates an instance of Cards Tab Carousel.
     * @param {HTMLElement} ele
     * @memberof Carousel
     * @requires jQuery
     * @requires slickJS
     */
    constructor(ele: HTMLElement) {

        this.container = ele;
        this.$container = $(ele);

        this.setCardsHeight();
        this.cardsTabCarousel(ele);
    }

    /**
     * @function
     * @desc funtion to set equal height for all cards tab
     * @param {Object} event
     */
    private setCardsHeight() {
        const container = this.container;
        this.cardsItem = container.querySelectorAll('.m-cards-tab__nav-item');

        let maxHeight = 0;
        this.cardsItem.forEach((elm: HTMLDivElement) => {
            elm.style.height = "auto";
            if (elm.clientHeight > maxHeight) {
                maxHeight = elm.clientHeight;
            }
        });
        this.cardsItem.forEach((elem: HTMLDivElement) => {
            elem.style.height = (maxHeight > 0) ? `${maxHeight}px`: "auto";
        });
    }

    /**
     * @function
     * @desc funtion to set and initialise the carousel
     * @param {Object} event
     */
    private cardsTabCarousel(ele: HTMLElement) {

        const leftIcon = ele.dataset.leftIcon || "abt-icon-left-arrow";
        const rightIcon = ele.dataset.rightIcon || "abt-icon-right-arrow";

        const cardTabClassList = ele.closest('.cardstab.m-cards-tab')?.classList;

        const isLarge = cardTabClassList?.contains('m-cards-tab--large');
        const isSmall = cardTabClassList?.contains('m-cards-tab--small');
        const cardsPerScreen = isLarge ? +ele.dataset.cardsPerScreen : +ele.dataset.cardsPerScreen + 1;

        const responsive = [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: +ele.dataset.tabletCardsPerScreen || 2,
                    slidesToScroll: +ele.dataset.tabletCardsPerScroll || 1,
                    arrows: false,
                    swipeToSlide: true,
                    centerMode: true,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: +ele.dataset.tabletCardsPerScreen || 2,
                    slidesToScroll: +ele.dataset.tabletCardsPerScroll || 1,
                    arrows: false,
                    swipeToSlide: true,
                    centerMode: true,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
                    slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1,
                    arrows: false,
                    swipeToSlide: true,
                    centerMode: true,
                    centerPadding: "30px",
                },
            },
        ];

        const options: JQuerySlickOptions = {
            dots: ele.dataset.noIndicators !== "true",
            rtl: document.querySelector("html").dir === "rtl",
            slidesToShow: cardsPerScreen || 1,
            slidesToScroll: +ele.dataset.cardsPerScroll || 1,
            prevArrow: '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow ' + leftIcon + '"><span class="sr-only">Previous</span></button>',
            nextArrow: '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow ' + rightIcon + '"><span class="sr-only">Next</span></button>',
            responsive: ele.dataset.responsive === "true" ? responsive : "none",
            swipeToSlide: true,
        };

        this.$container.slick(options);

        // attach click event to each card-tab after the slick carousel init
        this.attachEvents();
    }

    /**
     * @function
     * @desc Attach eventhandlers with the respective event on click or change etc
     * @param {Object} event
     */
    private attachEvents() {
        const container = this.container;
        this.cardsItem = container.querySelectorAll('.m-cards-tab__nav-item');

        this.cardsItem.forEach(function(ele: HTMLInputElement) {
            ele.addEventListener('click', this.cardsTabClickHandle.bind(this));
        }.bind(this));
    }

    /**
     * @function
     * @desc handles click on the card tab to add/remove 'active' class
     * @param evt {Event}
     */
    private cardsTabClickHandle(event: Event) {
        event.preventDefault();
        let card = $(event.currentTarget);
        let cardAriaControlId = card.attr('aria-controls');

        let cardsTabs = this.$container.find('.m-cards-tab__nav-item');
        let cardsTabPane = this.$container.parent().find('.m-cards-tab__content .m-cards-tab__tab-pane');

        cardsTabs.removeClass('cmp-tabs__tab--active active');
        card.addClass('cmp-tabs__tab--active active');

        cardsTabPane.removeClass('cmp-tabs__tabpanel--active active');
        cardsTabPane.parent().find('#'+cardAriaControlId).addClass('cmp-tabs__tabpanel--active active');

    }

}

$(function () {
    document.querySelectorAll('[data-js-component="cards-tab"]').forEach((e) => {
        if (!$(e).hasClass("slick-initialized")) {
            new CardsTab(e as HTMLElement);
        }
    });
});
