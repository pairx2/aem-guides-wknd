$(function() {
  const countrySelectorElement = document.querySelector(".o-header__utility-nav .m-link-stack__country-select");
  const navbarCollapseWrapperList = document.querySelector("#navbarCollapseWrapper .navbar-nav");

  const classes = {
    active: 'active',
    displayLgNone: "d-lg-none",
    megaMenuMobileItemWrapper: "m-mega-menu__mobile-item-wrapper",
    megaMenuMobileItemWrapperCountrySelector: "m-mega-menu__mobile-item-wrapper--country-selector",
    menuActive: "menu-active"
  }

  if (countrySelectorElement) {
    const countrySelectorElementMobileItemWrapper = document.createElement("li");
    const countrySelectorElementClone = countrySelectorElement.cloneNode(true);

    countrySelectorElementMobileItemWrapper.classList.add(
      classes.megaMenuMobileItemWrapper,
      classes.megaMenuMobileItemWrapperCountrySelector,
      classes.displayLgNone,
    );
    countrySelectorElementMobileItemWrapper.appendChild(countrySelectorElementClone);
    navbarCollapseWrapperList.appendChild(countrySelectorElementMobileItemWrapper);

    // Logic for yellow indicator line visibility on country selector opening/closing
    const countrySelectorDropdownLink = countrySelectorElementMobileItemWrapper.querySelector(".m-link-stack__link a");

    if (countrySelectorDropdownLink) {
      const handleClassChange = function (mutations) {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const { target } = mutation;
            const action = target.classList.contains(classes.active) ? "add" : "remove";
            const countrySelectorWrapper = target.closest(`.${classes.megaMenuMobileItemWrapperCountrySelector}`);

            countrySelectorWrapper.classList[action](classes.menuActive);
          }
        });
      };
      const observer = new MutationObserver(handleClassChange);
      const observerConfig = {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"]
      };

      observer.observe(countrySelectorDropdownLink, observerConfig);
    }
  }
});
