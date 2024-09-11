$(() => {
  let metaElement = document.querySelector('meta[name="viewport"]')
  
  if(metaElement){
    metaElement.setAttribute('content','width=device-width, initial-scale=1, maximum-scale=1')
  }
  
  const isLoggedIn = !!getLocalAuthContext()?.jwtToken?.id_token;

  window.addEventListener('header-v2.mounted', ({ detail: header }) => header.authenticate(isLoggedIn));
  window.addEventListener('header-v2.logout', OnNaveCommLogoutSuccess);

  if (isLoggedIn) {
    const $myAccountMenus = $('#myAccountMobile, #myAccountSticky, #myAccountTop');

    $myAccountMenus.find('.m-link-stack__list .a-link .a-link__text').removeAttr('target');

    const userInitial = getLocalAuthContext()?.accountInfo?.userInfo?.firstName?.charAt(0).toUpperCase() || '?';
    const $myAccountButtons = $myAccountMenus.find('.m-link-stack__link .a-link__text');
    const $userCircleIconHTML = $(`<span>${userInitial}</span>`).addClass('user-circle-icon');

    $myAccountButtons.each((index, button) => $(button).prepend($userCircleIconHTML.clone()));
  }
});
