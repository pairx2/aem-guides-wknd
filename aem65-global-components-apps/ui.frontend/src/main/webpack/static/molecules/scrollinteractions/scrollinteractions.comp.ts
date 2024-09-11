import * as ScrollMagic from 'scrollmagic';
import { gsap, TweenMax, TimelineMax } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugins';

class scrollInteractions {
  private controller = new ScrollMagic.Controller();
  private tweenTarget: NodeListOf<Element>;
  private container: HTMLElement;
  private bgContainer: HTMLElement;
  private mediaContainer: HTMLElement;
  private panels: NodeListOf<HTMLElement>;
  private panelsLength: number;
  private containerHeight: number;
  private titleHeight: number = 140;
  private windowHeight: number = window.innerHeight;
  private windowWidth: number = window.innerWidth;
  private headerHeight: number = 92;
  private breakpoint: number = 992; //This number is set via the bootstrap breakpoints
  private windowHeightLowRange: number = 720;
  private windowHeightHighRange: number = 1000;

  constructor(elem: HTMLElement) {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    ScrollMagicPluginGsap(ScrollMagic, gsap, TimelineMax, TweenMax);
    this.tweenTarget = document.querySelectorAll(
      '.js-scrollinteractions-fade-target'
    );
    this.init();

    /*
     * Destroy and re-initialize on window resize
     *
     * destroy(true) will reset every scene within the controller
     * before it recalculates everything and attaches new scenes.
     */
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        this.controller.destroy(true);

        this.controller = new ScrollMagic.Controller();
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;

        // Reset opacities to 1 to avoid desktop targets from remaining hidden:
        this.tweenTarget.forEach((element) => {
          TweenMax.set(element, { opacity: 1 });
        });

        this.init();
      }, 100);
    });
  }

  /*
   * This gets the heght of the browsers, window width and height
   * and sets parameters for the component. With this it allows
   * the component to be "smart" on cetain ranges regarding the
   * text and background colors per panel
   *
   * All calculations for offset are based on a 800px panel height.
   * So this.windowHeight * .25 = 200, then when the screen is taller/smaller,
   * it scales porportionally
   */
  private initSettings() {
    this.container = document.querySelector('.js-scrollcontainer');
    this.bgContainer = document.querySelector('.js-scroll-bg');
    this.mediaContainer = document.querySelector('.js-scroll-media-layers');
    this.panels = this.container.querySelectorAll('.m-scroll-interactions');
    this.panelsLength = this.panels.length;

    this.checkWindowHeightRange();

    //Sets the heights based on view height (vh)
    this.bgContainer.style.height = this.setBackgroundHeight() + this.headerHeight + 'px';

    this.mediaContainer.style.height =
      this.windowHeight - (this.titleHeight + this.headerHeight) + 'px';

    for (var i = 0; i < this.panels.length; i++) {
      const elem: HTMLElement = this.panels[i];
      elem.style.height = this.windowHeight + 'px';
    }

    let panelsHeight: number = 0;
    for (let index = 0; index < this.panels.length; index++) {
      const element: HTMLElement = this.panels[index];
      panelsHeight += element.clientHeight;
    }
    this.containerHeight = panelsHeight + this.titleHeight;
    this.container.style.height = this.containerHeight + 'px';
  }

  private setBackgroundHeight() {
    var $win: number  = window.innerHeight;
    var size: number = this.windowHeight;

    if ( $win > 1000 ) {
      size = $win;
    }

    return size;
  }

  /*
  * Helper function to check and set the height ranges of the component
  */
  private checkWindowHeightRange() {
    if ( this.windowHeight < this.windowHeightLowRange ) {
      this.windowHeight = this.windowHeightLowRange;
    }

    if ( this.windowHeight > this.windowHeightHighRange ) {
      this.windowHeight = this.windowHeightHighRange;
    }
  }

  /*
   * This function loops through the data attributes
   * calculates the position based on dyanmic class variable
   * then fires off the createScene method
   * Helper: createBackgroundColorChangeScenes
   */
  private getAndSetPanelBackgroundScenes(targetElem: Element) {
    let currentPanelOffset: number = this.titleHeight;

    for (var i = 1; i <= this.panelsLength; i++) {
      const elem: HTMLElement = this.panels[i - 1];

      const tempKey = 'panelbg' + i;
      const tempOffset = currentPanelOffset + elem.clientHeight;

      this.createBackgroundColorChangeScenes(
        targetElem,
        currentPanelOffset,
        this.bgContainer.dataset[tempKey],
        i
      );
      currentPanelOffset = tempOffset;
    }
  }

  private createBackgroundColorChangeScenes(
    targetElem: Element,
    start: Number,
    colorValue: String,
    panelNumber: Number
  ) {
    const bgTween = new TimelineMax().to(this.bgContainer, 1, {
      background: colorValue,
      opacity: 1,
    });

    /*Because the this.bgContainer is a slide of hand
     * trick, we 'trick' the first panels scene in to
     * starting well before the component is within
     * screen view. We add the extra "100" just as a
     * buffer zone for the fix. Since its X amount of
     * pixels before the timeline, its a negaitve number
     */
    if (panelNumber === 1) {
      start = (this.windowHeight + 100) * -1;
    }

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      triggerHook: 0.4,
      duration: 150,
      offset: start,
    })
      .setTween(bgTween)
      .addTo(this.controller);
  }

  /*
   * This function loops through the amount of panels inside
   * the .scrollinteractionscontainer class, then creates a
   * textFade scene on all but the last panel within the container
   * Helper: createTextFadeOutScenes
   */
  private getAndSetPanelFadeOuts(targetElem: Element) {
    let currentPanelOffset: number = this.titleHeight;
    for (var i = 0; i < this.panels.length; i++) {
      const elem: HTMLElement = this.panels[i];
      const tempOffset = currentPanelOffset + elem.clientHeight;
      if (i + 1 != this.panels.length) {
        this.createTextFadeOutScenes(targetElem, currentPanelOffset, i);
        currentPanelOffset = tempOffset;
      }
    }
  }

  private createTextFadeOutScenes(
    targetElem: Element,
    offsetValue: Number,
    arrayIndex: number
  ) {
    const textTween = new TimelineMax().to(this.tweenTarget[arrayIndex], 1, {
      opacity: 0,
    });

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 100,
      triggerHook: 0,
      offset: offsetValue,
    })
      .setTween(textTween)
      .addTo(this.controller);
  }

  /*
   * This function loops through the amount of panels inside
   * the .scrollinteractionscontainer class, then creates a
   * textFade scene on all but the last panel within the container
   * THIS IS FOR < this.breakpoint VAR breakpoints specifically.
   * Helper: createFadeInAndFadeOutScenesForMobile
   * Helper: createTextFadeOutScenes
   */
  private getAndSetPanelFadeOutsForMobile(targetElem: Element) {
    let currentPanelOffset: number = 0;

    for (var i = 0; i < this.panels.length; i++) {
      const elem: HTMLElement = this.panels[i];
      const tempOffset = currentPanelOffset + elem.clientHeight;
      const fadeInOffset = currentPanelOffset - 50;

      if (i != 0) {
        this.createFadeInScenesForMobile(targetElem, i, fadeInOffset);
      }

      if (i + 1 != this.panels.length) {
        this.createTextFadeOutScenes(targetElem, i, currentPanelOffset);
      }

      currentPanelOffset = tempOffset;
    }
  }

  private createFadeInScenesForMobile(
    targetElem: Element,
    index: number,
    fadeInOffset: number
  ) {
    const fadeInTween = new TimelineMax().to(this.tweenTarget[index], 1, {
      opacity: 1,
    });
    this.tweenTarget[index].style.opacity = '0';

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 100,
      triggerHook: 0,
      offset: fadeInOffset,
    })
      .setTween(fadeInTween)
      .addTo(this.controller);
  }

  /*
   * This function loops through the amount of panels inside
   * the .scrollinteractionscontainer class, then creates a
   * media fade scenes for extra panels within the container
   * Helper: createMediaFadeScenes
   */
  private getAndSetMediaFadeOuts(targetElem: Element) {
    for (var i = 0; i < this.panels.length; i++) {
      const mediaTarget = this.panels[i].querySelector(
        '.js-scrollinteractions-media-target'
      );

      if (mediaTarget) {
        this.createMediaFadeScenes(targetElem, mediaTarget, i);
      }
    }
  }

  private createMediaFadeScenes(
    targetElem: Element,
    mediaTarget: Element,
    panelNum: number
  ) {
    let panelsHeight: number = 0;
    for (let index = 0; index < panelNum; index++) {
      const elem: HTMLElement = this.panels[index];
      panelsHeight += elem.clientHeight;
    }

    const calculatedOffset =
      panelsHeight + this.titleHeight + this.headerHeight;
    new ScrollMagic.Scene({
      triggerElemet: targetElem,
      triggerHook: 0.1,
      offset: calculatedOffset,
    })
      .setClassToggle(mediaTarget, 'visible')
      .addTo(this.controller);
  }

  /*
   * This function pins the .js-scroll-bg element
   * once we get past the extra spacing that the title creates
   * It is also applied an equal height to the panels
   * int the initSettings() function
   */
  private createBackgroundPinScene(targetElem: Element) {
    let duration: number = 0;

    if ( window.innerHeight > this.windowHeightHighRange ) {
      duration = this.containerHeight - window.innerHeight;
    } else {
      for (let index = 1; index < this.panels.length; index++) {
        const element = this.panels[index];
        duration += element.clientHeight;
      }
    }

    new ScrollMagic.Scene({
      container: this.container,
      triggerElement: targetElem,
      triggerHook: 0.1,
      duration,
      offset: this.titleHeight,
    })
      .setPin(this.bgContainer)
      .addTo(this.controller);
  }

  /*
   * This function pins the entire .js-scroll-pin section
   * that includes all the media__layers for datapoints,
   * parallax, main and background imagery.
   * Datapoints: createDatapointRightScenes, createDatapointBottomScenes
   * Parallax: createMediaLayerParallaxScene
   * Background: createMediaLayerFadeOut
   * Main: createMainImageZoomScene,
   */
  private createMediaLayerPinScene(targetElem: Element) {
    let pinOffset: string = '-92';
    if (this.windowWidth < this.breakpoint) {
      pinOffset = '10';
    }
    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 1000,
      triggerHook: 0,
      offset: pinOffset
    })
      .setPin('.js-scroll-pin')
      .addTo(this.controller);
  }

  private createMediaLayerParallaxScene(targetElem: Element) {
    const parallaxTween = new TimelineMax().to('.js-scroll-parallax-image', 1, {
      y: 200,
      opacity: 0,
    });

    const offsetStart = this.windowHeight * .225;

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 300,
      triggerHook: 0,
      offset: offsetStart
    })
      .setTween(parallaxTween)
      .addTo(this.controller);
  }

  private createMediaLayerFadeOut(targetElem: Element) {
    const scaleTween = TweenMax.to('.js-scroll-fade-image', 1, { scale: 1.75 });
    const fadeTween = new TimelineMax().to('.js-scroll-fade-image', 1, {
      opacity: 0,
    });

    const offsetStart = this.windowHeight * .475;
    const offsetEnd = this.windowHeight * 1.8;

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 150,
      triggerHook: 0,
      offset: offsetStart
    })
      .setTween(scaleTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 100,
      triggerHook: 0.5,
      offset: offsetEnd
    })
      .setTween(fadeTween)
      .addTo(this.controller);
  }

  private createMainImageScenes(targetElem: Element) {
    const scaleTween = TweenMax.to('.js-scroll-main-image', 1, { scale: 1.75 });
    const fadeOutImage = TweenMax.to('.js-scroll-main-image', 1, { opacity: 0 });
    const offsetStart = this.windowHeight * .475;
    const offsetEnd = this.windowHeight * 1.8;

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 150,
      triggerHook: 0,
      offset: offsetStart
    })
      .setTween(scaleTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      duration: 100,
      triggerHook: 0.5,
      offset: offsetEnd
    })
      .setTween(fadeOutImage)
      .addTo(this.controller);
  }

  /*
   * This functions creates fade-in and fade-out scenes
   * for the datapoint-right class. It is positioned by CSS
   * class .media__layer--data-right and uses the offset in
   * the scrolling past .js-scrollcontainer to trigger the scenes
   */
  private createDatapointRightScenes(targetElem: Element) {
    const dataRightTween = new TimelineMax().to('.js-scroll-data-right', 1, {
      opacity: 1,
    });
    const dataRightTweenOut = new TimelineMax().to('.js-scroll-data-right', 1, {
      opacity: 0,
    });
    const offsetStart = this.windowHeight * .60;
    const offsetEnd = this.windowHeight * 1.03;

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      triggerHook: 0,
      duration: 150,
      offset: offsetStart
    })
      .setTween(dataRightTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      triggerHook: 0,
      duration: 150,
      offset: offsetEnd
    })
      .setTween(dataRightTweenOut)
      .addTo(this.controller);
  }

  /*
   * This functions creates fade-in and fade-out scenes
   * for the datapoint-right class. It is positioned by CSS
   * class .media__layer--data-bottom and uses the offset in
   * the scrolling past .js-scrollcontainer to trigger the scenes
   */
  private createDatapointBottomScenes(targetElem: Element) {
    const dataBottomTween = new TimelineMax().to('.js-scroll-data-bottom', 1, {
      opacity: 1,
    });
    const dataBottomTweenOut = new TimelineMax().to(
      '.js-scroll-data-bottom',
      1,
      { opacity: 0 }
    );
    const offsetStart = this.windowHeight * .70;
    const offsetEnd = this.windowHeight * 1.15;

    /* Datapoint Bottom */
    new ScrollMagic.Scene({
      triggerElement: targetElem,
      triggerHook: 0,
      duration: 150,
      offset: offsetStart
    })
      .setTween(dataBottomTween)
      .addTo(this.controller);

    new ScrollMagic.Scene({
      triggerElement: targetElem,
      triggerHook: 0,
      duration: 150,
      offset: offsetEnd
    })
      .setTween(dataBottomTweenOut)
      .addTo(this.controller);
  }

  /*
   * Public method to run scrollinteractions.
   * Stores all the scenes calls.
   */
  public init() {
    const container: HTMLElement = document.querySelector(
      '.js-scrollcontainer'
    );

    //Set dynamic settings for the component
    this.initSettings();

    //create calculated dynamic Scenes
    this.getAndSetPanelBackgroundScenes(container);

    this.getAndSetMediaFadeOuts(container);

    if (this.windowWidth < this.breakpoint) {
      this.getAndSetPanelFadeOutsForMobile(container);
    } else {
      this.getAndSetPanelFadeOuts(container);
    }

    //These scenes are set in the timeline
    this.createBackgroundPinScene(container);
    this.createMediaLayerPinScene(container);
    this.createMediaLayerFadeOut(container);
    this.createMediaLayerParallaxScene(container);
    this.createMainImageScenes(container);
    this.createDatapointRightScenes(container);
    this.createDatapointBottomScenes(container);
  }
}

$(function () {
  document.querySelectorAll('.js-scrollcontainer').forEach((e) => {
    if (!$(e).hasClass('js-scroll-initialized')) {
      new scrollInteractions(e as HTMLElement);
    }
  });
});
