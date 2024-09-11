/**
 *  HEADER - COMPONENT
 **/

$(() => {
  const isLoggedIn = isUserInLogedInState();

  window.addEventListener('header-v2.mounted', ({ detail: header }) => header.authenticate(isLoggedIn));

  /**
  * Summary: Function to Add User Name Initial into Header My-Account, Logout
  */
  const $myAccountMenus = $('#myAccountMobile, #myAccountSticky, #myAccountTop');
  if (isLoggedIn) {

    $myAccountMenus.find('.m-link-stack__list .a-link .a-link__text').removeAttr('target');

    let userInitial = getCookie('usFn', true) || getItemLocalStorage('usFn', true) || getItemSessionStorage('usFn', true) || '?';

    const $myAccountButtons = $myAccountMenus.find('.m-link-stack__link .a-link__text');
    const $userCircleIconHTML = $(`<span>${userInitial}</span>`).addClass('user-circle-icon');

    $myAccountButtons.each((_index, button) => $(button).prepend($userCircleIconHTML.clone()));
  }


  const $myAccountLogout = $myAccountMenus.find('.m-link-stack__list .a-link [href="#logout"]');
  if ($myAccountLogout.length) {
    $myAccountLogout.addClass('logout-user-link');
  }

  const $myAccountNavLogout = $('.m-account-navigation .m-account-navigation__text[href="#logout"]');
  if ($myAccountNavLogout.length) {
    $myAccountNavLogout.addClass('logout-user-link');
  }

  const $logoutForm = $('#myfreestyle-userLogout-form button[name="logout-submit"], #myfreestyle-userLogout-form button[type="submit"]');
  $(document).on('click','.logout-user-link', function () {
    $logoutForm.length && $logoutForm.trigger('click');
    window.isLogoutCallProgress = true;
  });

});