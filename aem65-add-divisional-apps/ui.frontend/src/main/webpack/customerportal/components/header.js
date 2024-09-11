(function() {
    "use strict";
    const megaMenuNavItemSelectors = {
        labProfile:      '#dropdown_labProfile-options',
        myAbbotTeam:  '#menu_myAbbotTeam',
        myInstruments:   '#menu_myInstruments',
        myDashboard: '#menu_myDashboard',
		distributorAdmin : '#menu_distributorAdmin'
    };

    function addMenuRoot() {
        // propogate ids from selectors up to their nav item
        for (const [key,value] of Object.entries(megaMenuNavItemSelectors)) {
            let el = document.querySelector(value);
            if (el) {
                let menuRoot = el.closest('.m-mega-menu__mobile-item-wrapper');
                menuRoot.classList.add(`menu-root-${key}`);
            }
        }
    }

    addMenuRoot();
}());
