import React, { useEffect, useRef } from 'react';
import 'slick-carousel';
import { onAEMauthor } from '../../utils/common';

function ColumnControlCarousel() {
  const columnControlRef = useRef(null);

  const createCarousel = (columnsParent) => {
    const smallScreen = window.innerWidth < 992;
    if (
      !columnsParent?.classList.contains('slick-initialized') &&
      smallScreen
    ) {
      columnsParent.classList.add('o-hero-carousel');
      columnsParent.setAttribute('data-js-component', 'carousel');

      const options = {
        dots: true,
        mobileFirst: true,
        rtl: document.querySelector('html').dir === 'rtl',
        prevArrow:
          '<button type="button" aria-label="Previous" class="abt-icon slick-prev slick-arrow abt-icon-left-arrow"><span class="sr-only">Previous</span></button>',
        nextArrow:
          '<button type="button" aria-label="Next" class="abt-icon slick-next slick-arrow abt-icon-right-arrow"><span class="sr-only">Next</span></button>',
        swipeToSlide: true,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 1,
        slidesToScroll: 1,
      };

      $(columnsParent).slick(options);
    } else if (
      columnsParent?.classList.contains('slick-initialized') &&
      !smallScreen
    ) {
      $(columnsParent).slick('unslick');
    }
  };

  useEffect(() => {
    const columns = columnControlRef.current.parentElement.querySelectorAll(
      '.columncontrol__column '
    );
    const columnsParent = columns[0]?.parentElement;

    if (columnsParent && !onAEMauthor()) {
      createCarousel(columnsParent);
      window.addEventListener('resize', () => createCarousel(columnsParent));

      return () =>
        window.removeEventListener('resize', () =>
          createCarousel(columnsParent)
        );
    }
  }, []);

  return <span ref={columnControlRef} />;
}

export default ColumnControlCarousel;
