
$(() => {
  const pathLangRegex = /\/([a-z]{2}-[a-z]{2})\//i;
  const $languageSelectors = $('#languageSelectorMobile, #languageSelectorSticky, #languageSelectorTop, [id^="languageSelector"], [class^="language-selector"]');
  const $mobileLanguageSelector = $('#languageSelectorMobile, [class^="language-selector__mobile"]').find('.m-link-stack');
  const $navbar = $('.o-header-v2-global .navbar-nav');
  const getPathLanguage = (path) => pathLangRegex.exec(path)?.[1];
  const getPreferredLanguageFromPath = (path) => getPathLanguage(path)?.split('-').reverse().join('_');
  const currentPathLanguage = getPathLanguage(window.location.pathname);

  $languageSelectors.each((_selectorIndex, languageSelector) => {

    //remove duplicate id
    const $countrySelectDropdown = $(languageSelector).find('.languagenavigation > .m-link-stack__country-select');
    $countrySelectDropdown.removeAttr('id');

    const $countryListItemAnchors = $(languageSelector).find('.m-link-stack__list-item .a-link__text');

    $countryListItemAnchors.each((_anchorIndex, anchor) => {
      const anchorPathLanguage = getPathLanguage(anchor.pathname);
      const anchorPreferredLanguage = getPreferredLanguageFromPath(anchor.pathname);

      if (!!anchorPreferredLanguage) {
        anchor.setAttribute('lang', anchorPreferredLanguage);
        anchor.setAttribute('hreflang', anchorPreferredLanguage);
        anchor.parentElement.setAttribute('lang', anchorPreferredLanguage);

      }
      if (anchorPathLanguage === currentPathLanguage) {
        $(anchor).addClass('active');
      }
    });
  });

  if ($mobileLanguageSelector.length > 0 && $navbar.length > 0) {
    $mobileLanguageSelector
      .clone()
      .removeAttr('id')
      .appendTo($navbar)
      .wrap('<li class="m-mega-menu__mobile-item-wrapper languagenavigation"></li>');
  }

});