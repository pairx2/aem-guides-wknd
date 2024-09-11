export class TextSlideUp {
  private textSlideUpWrapper: HTMLElement;
  private setUpAnimation: () => void;
  private appendAnimationWrapper: (element: Element) => void;

  constructor(wrapperElement: HTMLElement) {
    this.textSlideUpWrapper = wrapperElement;

    this.appendAnimationWrapper = (element: Element) => {
      const wrapperSpan = document.createElement('span');
      wrapperSpan.innerHTML = element.innerHTML;
      wrapperSpan.classList.add('slide-up-text');
      element.innerHTML = '';
      element.classList.add('slide-up-text-container');
      element.appendChild(wrapperSpan);
    };

    this.setUpAnimation = () => {
      const header = this.textSlideUpWrapper.querySelector('.m-hero__header');
      const paragraphs = header.querySelectorAll(':scope > p');
      let children = 1;

      this.textSlideUpWrapper.classList.add('animate-slide-up');

      if (paragraphs?.length > 0) {
        children = paragraphs.length;
        paragraphs.forEach((el) => {
          this.appendAnimationWrapper(el);
        });
      } else {
        this.appendAnimationWrapper(header);
      }

      setTimeout(() => {
        this.textSlideUpWrapper.classList.add('animate-fade-in');
      }, 350 * children);
    };

    this.setUpAnimation();
  }
}
