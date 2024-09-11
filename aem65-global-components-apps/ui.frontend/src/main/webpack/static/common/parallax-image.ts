interface IParallaxOptions {
  imageSelector: string;
  parallaxSpeed?: number;
  activeClass?: string;
}

export class ParallaxImage {
  private parallaxWrapper: HTMLElement;
  private parallaxElement: HTMLElement;
  private options: IParallaxOptions;
  private intersectionObserver: IntersectionObserver;
  private useReducedMotion: boolean;
  private scrollHandler: (e: Event) => void;

  constructor(wrapperElement: HTMLElement, options: IParallaxOptions) {
    this.options = {
      imageSelector: options.imageSelector,
      parallaxSpeed: options.parallaxSpeed || 0.25,
      activeClass: options.activeClass || 'active',
    };
    this.useReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || false;
    this.parallaxWrapper = wrapperElement;
    this.parallaxElement = this.parallaxWrapper.querySelector(
      this.options.imageSelector
    );
    this.intersectionObserver = new IntersectionObserver(
      (e) => {
        e.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            // Target has entered the viewport
            target.classList.add(this.options.activeClass);
          } else {
            // Target has left the viewport
            target.classList.remove(this.options.activeClass);
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    this.scrollHandler = (e: Event) => {
      const isActive = this.parallaxWrapper.classList.contains(
        this.options.activeClass
      );

      if (isActive) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const parallaxImageHeight = this.parallaxElement.getBoundingClientRect()
          .height;
        const wrapperHeight = this.parallaxWrapper.getBoundingClientRect()
          .height;
        const imageHeightDifference = parallaxImageHeight - wrapperHeight;
        const wrapperDistanceToTop = this.parallaxWrapper.getBoundingClientRect()
          .top;
        const topSpacing =viewportWidth > 992 ? imageHeightDifference * 2 : imageHeightDifference;
        const yvalue =
          (viewportHeight - wrapperDistanceToTop - topSpacing) *
          this.options.parallaxSpeed;

        if (Math.abs(yvalue) >= imageHeightDifference) {
          // Do not shift parallax image any further if bottom lines up with wrapper bottom
          return;
        }

        this.animatePosition(this.parallaxElement, yvalue);
      }
    };

    if (!this.useReducedMotion && this.parallaxElement) {
      this.startParallax();
    }
  }

  public startParallax(): void {
    document.addEventListener('scroll', this.scrollHandler);
    this.intersectionObserver.observe(this.parallaxWrapper);
  }

  public stopParallax(): void {
    document.removeEventListener('scroll', this.scrollHandler);
    this.intersectionObserver.disconnect();
  }

  private animatePosition(image: HTMLElement, yvalue: number): void {
    image.style.transform = `translateY(${yvalue}px)`;
  }
}
