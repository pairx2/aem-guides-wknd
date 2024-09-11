(function () {

  const scrollElements = document.querySelectorAll('[data-aos-container]');
  scrollElements.forEach((el) => {
    var delay = el.attributes["data-aos-delay"] == null ? 400 : el.attributes["data-aos-delay"].value;
    var duration = el.attributes["data-aos-duration"] == null ? 1200 : el.attributes["data-aos-duration"].value;
    el.style.transitionDelay = delay + "ms";
    el.style.transitionDuration = duration + "ms";
    if (el.attributes["data-aos"] == null) {
      el.setAttribute('data-aos', 'fade-up');
    }
    if (el.attributes["data-aos-easing"] == null) {
      el.setAttribute('data-aos-easing', 'ease');
    }
  });

  var throttleTimer;
  var scroll_position = 0;
  var scroll_direction;

  const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  }

  const elementInView = (el, dividend = 1) => {
    const elementPosition = el.getBoundingClientRect(),
      elementTop = elementPosition.top,
      elementBottom = elementPosition.bottom;

    return (
      (
        (scroll_direction == "down") &&
        (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend)
      ) || (
        (scroll_direction == "up") && (elementBottom > 250)
      )
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("aos-animate");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("aos-animate");
  };

  const handleScrollAnimation = () => {
    scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
    scroll_position = (document.body.getBoundingClientRect()).top;
    scrollElements.forEach((el) => {
      if (elementInView(el, 1)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    })
  }

  window.addEventListener("scroll", () => {
    throttle(() => {
      handleScrollAnimation();
    }, 100);
  });

})();