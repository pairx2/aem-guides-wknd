/**********************************
Mega Menu Component
**********************************/

let megaMenuSection = $('.header').find('[data-js-component="mega-menu"]');
let hamburgerIcon = megaMenuSection.find(('.navbar-toggler')),
    mobileMenu = megaMenuSection.find('#navbarNavAltMarkup').get(0);

// Mobile menu functionalities
hamburgerIcon.off('click').on('click', function () {
    toggleMegaMenu(hamburgerIcon, mobileMenu);
});

/**
    * @function
    * @desc Show/hide mobile menu on hamburger click
    * @param {Object} event
**/

function toggleMegaMenu(hamIcon, mobMenu) {
    if (hamIcon.length) {
        hamIcon.toggleClass('abt-icon-cancel');
        if (mobMenu.style.display === "block") {
            mobMenu.style.display = "none";
        } else {
            mobMenu.style.display = "block";
        }
    }
}