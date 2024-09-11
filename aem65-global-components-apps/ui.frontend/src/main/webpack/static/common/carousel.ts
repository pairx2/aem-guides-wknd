import 'slick-carousel';
class Carousel{

  private $container: JQuery<HTMLElement>;

  /**
   *Creates an instance of HeroCarousel.
   * @param {HTMLElement} ele
   * @memberof HeroCarousel
   * @requires jQuery
   * @requires slickJS
   */
  constructor(ele: HTMLElement) {
    const leftIcon = ele.dataset.leftIcon || 'abt-icon-left-arrow';
    const rightIcon = ele.dataset.rightIcon || 'abt-icon-right-arrow';

    const responsive =  [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: +ele.dataset.tabletCardsPerScreen || 2,
          slidesToScroll: +ele.dataset.tabletCardsPerScroll || 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
          slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
          slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1
        }
      }
    ];

    const isCardCarousel = ele.closest('.o-cards-carousel') !== null;
	const isDynamicCardList = ele.closest('.o-dynamic-card-list') !== null;

    let options: JQuerySlickOptions = {
      dots: ele.dataset.noIndicators !== 'true',
      rtl: document.querySelector('html').dir === 'rtl',
      pauseOnHover: ele.dataset.autopauseDisabled !== 'true',
      autoplay: ele.dataset.transitionAutoplay === 'true',
      autoplaySpeed: +ele.dataset.transitionDelay,
      slidesToShow: +ele.dataset.cardsPerScreen || 1,
      slidesToScroll: +ele.dataset.cardsPerScroll || 1,
      prevArrow: '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow '+leftIcon+'"><span class="sr-only">Previous</span></button>',
      nextArrow: '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow '+rightIcon+'"><span class="sr-only">Next</span></button>',
      responsive: ele.dataset.responsive === 'true' ? responsive : 'none'
    };
    if (isDynamicCardList) {
      options.centerMode = false,
      options.arrows = false,
      options.variableWidth = true
    }
    if (isCardCarousel || isDynamicCardList) {
      options.responsive =  [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: +ele.dataset.cardsPerScreen,
            slidesToScroll: +ele.dataset.cardsPerScroll || 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: +ele.dataset.tabletCardsPerScreen || 2,
            slidesToScroll: +ele.dataset.tabletCardsPerScroll || 1
          }
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: +ele.dataset.mobileCardsPerScreen || 1,
            slidesToScroll: +ele.dataset.mobileCardsPerScroll || 1
          }
        }
      ];
      options.mobileFirst = true;
      options.rows = 0;
    }

    $(ele).on('init', () => {
      //check if its card carousel and then dispatch custom Event
      if (isCardCarousel ||isDynamicCardList) {
        setTimeout(function() {
          document.dispatchEvent(new Event('carousel:initialised'));
        }, 2000);
      }

    });

    this.$container = $(ele);
    this.$container.slick(options);
  }
}


$(function() {
  const refreshHiddenCarousel = (nodes) => {
    if (nodes.length) {
      nodes.forEach((el) => {
        const $carousels = el.querySelectorAll('[data-js-component="carousel"]');

        $carousels.forEach((carousel) => {
          $(carousel).slick('refresh');
        });
      });
    }
  };

  document.querySelectorAll('[data-js-component="carousel"]').forEach((e)=>{
    if(!$(e).hasClass('slick-initialized')) {
      new Carousel(e as HTMLElement);
    }
  });

  // Carousels hidden in collapsed Accordion panels are wrongly initialized by slick.
  // Refresh such Carousels after the Accordion tab is opened.
  document.addEventListener('accordion:expanded', () => {
    const $expandedAccordionPanels = document.querySelectorAll('.m-accordion__body.show');

    refreshHiddenCarousel($expandedAccordionPanels);
  }, false);

  // Carousels hidden inside inactive tab panels are wrongly initialized by slick.
  // Refresh such Carousels after the Tab panel is activated.
  document.addEventListener('tabpanel:activated', () => {
    const $activatedTabPanel = document.querySelectorAll('.cmp-tabs__tabpanel--active');

    refreshHiddenCarousel($activatedTabPanel);
  }, false);
});
