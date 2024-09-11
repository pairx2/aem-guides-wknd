(function() {
  var classes = {
    mobileMenuOpen: 'mobile-menu-open',
  };
  var $header = document.querySelector('.o-header');
  var $navbarToggler = $header.querySelector('.navbar-toggler');

  $navbarToggler.addEventListener('click', handleNavbarToggle);

  function handleNavbarToggle() {
    $header.classList.toggle(classes.mobileMenuOpen);
  }
})();
