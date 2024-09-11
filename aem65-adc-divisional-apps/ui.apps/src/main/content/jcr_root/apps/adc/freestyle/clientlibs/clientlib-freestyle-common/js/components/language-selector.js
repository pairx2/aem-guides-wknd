$(() => {
  const pathLangRegex = /\/([a-z]{2}-[a-z]{2})\//i;
  const cookiePreferredLanguage = getCookie('x-preferred-language');
  const pagePreferredLanguage = $('[name="x-preferred-language"]').val()?.slice(0, 2)?.toLowerCase();
  const pageCountryCode = $('[name="x-country-code"]').val()?.toLowerCase();
  const availableLanguages = new Set();
  const browserLanguage = navigator.language?.slice(0, 2);

  const $languageSelectors = $('#languageSelectorMobile, #languageSelectorSticky, #languageSelectorTop');
  const $mobileLanguageSelector = $('#languageSelectorMobile').find('.m-link-stack');
  const $navbar = $('.o-header-v2-global .navbar-nav');

  const getPathLanguage = (path) => pathLangRegex.exec(path)?.[1];
  const getPreferredLanguageFromPath = (path) => getPathLanguage(path)?.split('-').reverse().join('_');
  const currentPathLanguage = getPathLanguage(window.location.pathname);
  const getLoginstate = isUserInLogedInState();

  const getLanguageRedirect = (preferredLanguageCode) => {
    const pathname = window.location.pathname;
    const newPathLanguage = preferredLanguageCode.split('_').reverse().join('-');
    const languageIndex = pathname.indexOf(currentPathLanguage);

    const pageRedirectURL = $(`link[hreflang=${newPathLanguage}]`).attr('href');

    if (currentPathLanguage != newPathLanguage && pageRedirectURL) {
      return pageRedirectURL
    } else {
      return `${(pathname.substring(0, languageIndex) || '/') +
        newPathLanguage +
        pathname.substring(languageIndex + currentPathLanguage?.length) +
        window.location.search
        }`;

    }
  };

  const isAvailableLanguage = (preferredLanguageCode) =>
    [...availableLanguages].some((availableLanguage) => availableLanguage === preferredLanguageCode);

  $languageSelectors.each((selectorIndex, languageSelector) => {
    const $languageSelector = $(languageSelector);
    const $countryDropdownLink = $languageSelector.find('.m-link-stack__link .a-link');
    const $countryListItemAnchors = $languageSelector.find('.m-link-stack__list-item .a-link__text');

    //remove duplicate id
    const $countrySelectDropdown = $(languageSelector).find('.languagenavigation > .m-link-stack__country-select');
    $countrySelectDropdown.removeAttr('id');

    if ($countryDropdownLink) {
      const $globeIcon = $('<span></span>');

      $globeIcon.addClass('abt-icon abt-icon-light-globe');
      $countryDropdownLink.prepend($globeIcon);
    }

    $countryListItemAnchors.each((anchorIndex, anchor) => {
      const anchorPathLanguage = getPathLanguage(anchor.pathname);
      const anchorPreferredLanguage = getPreferredLanguageFromPath(anchor.pathname);

      if (!!anchorPreferredLanguage) {
        anchor.setAttribute('lang', anchorPreferredLanguage);
        anchor.setAttribute('hreflang', anchorPreferredLanguage);
        anchor.parentElement.setAttribute('lang', anchorPreferredLanguage);

        availableLanguages.add(anchorPreferredLanguage);
      }

      if (anchorPathLanguage === currentPathLanguage) {
        $(anchor).addClass('active');
      }
    });
  });

  if ($mobileLanguageSelector.length > 0 && $navbar.length > 0) {
    $mobileLanguageSelector
      .clone()
      .appendTo($navbar)
      .wrap('<li class="m-mega-menu__mobile-item-wrapper languagenavigation"></li>');
  }

  const changePreferredLangugage = async (link) => {
    const authContext = getLocalAuthContext();
    const idToken = authContext?.jwtToken?.id_token;
    const ecomToken = authContext?.accountInfo?.userInfo?.additionalProperties?.ecommToken;

    setCookie('x-preferred-language', link.getAttribute('lang'));

    //set preferred language for logged in user
    if (idToken && ecomToken) {
      $('#page-spinner').show();

      const { eslEndpoint } = eslConfigDatasets();
      const url = `${eslEndpoint + ESL_EPT?.UPDATE_PROFILE}`;
      const headers = { ...getPageDataAttributes() };
      headers['x-id-token'] = idToken;
      headers['x-ecom-token'] = ecomToken;

      const requestOptions = {
        method: 'POST',
        headers: {
          ...headers,
        },
        body: JSON.stringify({
          userInfo: {
            preferredLanguage: link.getAttribute('lang'),
          },
        }),
      };

      const data = await fetch(url, requestOptions);
      const response = await data.json();

      if (response?.data?.errorCode) {
        console.error(response?.data?.errorCode);
        return;
      }
    }
  };

  /* 
  * Method: redirectNewPath
  * Description: Added common method for diff between authored redirect URL and Language Nav URL
  * Param: {lanlink} each node of Lanuage Nav Dropdown
  */
 
  const redirectNewPath = (langlink) => {

    //extracting path from domain
    const _extractURL = (url) => {
      try {
        let newExtractPath = new URL(url);
        return newExtractPath.pathname;
        } catch (error) {
        return null
      }
    } 

    let linkLangcode = langlink.getAttribute('hreflang').split('_').join('-').toLowerCase();
    let newRedirectPath = $(`link[hreflang|='${linkLangcode}']`).attr('href');
    let newRedirectLangCode  = $(`link[hreflang|='${linkLangcode}']`).attr('hreflang');

    if(!!newRedirectPath && newRedirectLangCode === linkLangcode && _extractURL(newRedirectPath)) {
        let extractedPath = window.location.origin+ _extractURL(newRedirectPath);
        window.location.href =  extractedPath
      } else {
        window.location = langlink.getAttribute('href');
    }
  }

  document.querySelectorAll('.a-link__text[lang]').forEach((languageLink) => {
    languageLink.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (getLoginstate) {
        changePreferredLangugage(languageLink).then(() => {
          redirectNewPath(languageLink);
        });
      } else {
        redirectNewPath(languageLink)
      }
    });
  });

  /*
   *  For Page redirection based on the cookie x-preferred-language - Language Selector
   *  On page load read cookie and match it to the current page reference to
   *  decide if redirect should occur.
   */
  if (!!cookiePreferredLanguage) {
    const cookieLanguageCode = cookiePreferredLanguage.split('_')[0];
    const cookieCountryCode = cookiePreferredLanguage.split('_')[1];

    if (
      !!pageCountryCode &&
      !!pagePreferredLanguage &&
      !!cookieCountryCode &&
      !!cookieLanguageCode &&
      (pageCountryCode === cookieCountryCode.toLowerCase() &&
        pagePreferredLanguage !== cookieLanguageCode.toLowerCase()) &&
      isAvailableLanguage(cookiePreferredLanguage)
    ) {
      window.location.href = getLanguageRedirect(cookiePreferredLanguage);
    }
  } else if (!!browserLanguage && !!pagePreferredLanguage && browserLanguage !== pagePreferredLanguage) {
    const preferredLanguageCode = `${browserLanguage}_${pageCountryCode}`;

    if (isAvailableLanguage(preferredLanguageCode)) {
      window.location.href = getLanguageRedirect(preferredLanguageCode);
    }
  }
});
