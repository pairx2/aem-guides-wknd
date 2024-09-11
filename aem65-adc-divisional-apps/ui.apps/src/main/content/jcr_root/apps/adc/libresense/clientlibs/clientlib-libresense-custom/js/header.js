let sidebarMenuOpen = false;
//Fetching element references
const headerStickySection = document.querySelector(".o-header__sticky-section");
const navbarCollapseWrapper = document.querySelector("#navbarCollapseWrapper"),
    navbarCollapseWrapperUl = navbarCollapseWrapper.querySelector(".navbar-nav"),
    countrySelectorElement = document.querySelector(".o-header__utility-nav .m-link-stack__country-select");
const headerLogoLeft = document.querySelector(".o-header__logo-left");
const libresenseLogoWrapper = headerLogoLeft.querySelector(".a-logo-comp");
const libresenseLogoImg = libresenseLogoWrapper.querySelector(".a-logo-comp--image"),
    navbarNavAltMarkup = document.querySelector("#navbarNavAltMarkup");
const countrySelectorChildElement = countrySelectorElement ? countrySelectorElement.querySelector(".m-link-stack__link") : null;
const menuLinkitems = document.querySelectorAll('.m-mega-menu__mobile-item-wrapper .a-link');

//function to create nodes
function createNode(tag, template, attrs) {
    const elem = document.createElement(tag);
    attrs.forEach(function (attr) {
        elem.setAttribute(attr.name, attr.value)
    })
    elem.innerHTML = template;
    return elem;
}
//Creating necessary elements
const mobileSideNav = createNode("div",
    `<span class="menulogo">
        <img src="${libresenseLogoImg.src}">
    </span>`,
    [{
        name: "id", value: "mobilesidenav"
    }, {
        name: "class", value: "mobilesidenav"
    }]);
const backdrop = createNode("span", "", [{ name: "class", value: "backdropChangeMob" }])
const SliderBtnCloseSpan = createNode("span", `
                <img src="/content/dam/adc/libresense/global/images/Close.svg">
        `, [{ name: "class", value: "closebtn" }]);
const SidebarBtnImg = createNode("img", "", [
    {
        name: "class", value: "mobileNavIcon"
    }, {
        name: "src", value: "/content/dam/adc/libresense/global/images/Menu.svg"
    }
])
//Adding necessary classes to add specic default styles to header
headerStickySection.classList.add("headermenu-wrapper")
if (countrySelectorElement) {
    countrySelectorElement.classList.add("m-mega-menu__mobile-item-wrapper");
    //Appending the country selector from top left to navbar
    navbarCollapseWrapperUl.appendChild(countrySelectorElement);
}
headerLogoLeft.style.width = "200px";//adjust header logo styles in one line
//media query to toggle between mobile mode and desktop mode
const mediaQueryLargeScreen = window.matchMedia('(max-width:992px)');

function removeElement(element) {
    if(element.parentNode) {
        element.parentNode.removeChild(element)
    }
}
function prepareHeader() {
    if (mediaQueryLargeScreen.matches) {
        //moving the navbar elements to sidebar for mobile
        mobileSideNav.appendChild(navbarCollapseWrapper);
        headerStickySection.insertBefore(mobileSideNav, headerStickySection.firstChild);
        //Adding a backdrop which opens when  mobile side bar is openned
        headerStickySection.insertBefore(backdrop, headerStickySection.firstChild);
        //Adding a close button when sidebar is opened
        headerStickySection.insertBefore(SliderBtnCloseSpan, headerStickySection.firstChild);
        //Adding the open button for sidebar in mobile mode
        libresenseLogoWrapper.insertBefore(SidebarBtnImg, libresenseLogoWrapper.firstChild);
        toggleSideBarMenu();//Seting up default position for sidebarmenu in mobile mode
        SidebarBtnImg.addEventListener("click", function () {
            toggleSideBarMenu('inline', 310, 'inline', true);
        })
        SliderBtnCloseSpan.addEventListener("click", function () {
            toggleSideBarMenu();
        })
        menuLinkitems.forEach( function(element) {
            element.addEventListener("click", function () {
                toggleSideBarMenu();
            })
        });

        /*In mobile mode when clicking the country selector it scrolls a bit to show the contents*/
        if (countrySelectorChildElement) {
            const countrySelectDropdownScrollOffset = 300; //country selector scroll offset for mobile
            const countrySelectDropdownScrollDelay = 250;//country selector scroll delay for mobile

            countrySelectorChildElement.addEventListener("click", function () {
                setTimeout(function () {
                    mobileSideNav.scroll({
                        top: countrySelectDropdownScrollOffset,
                        behaviour: 'smooth'
                    })
                }, countrySelectDropdownScrollDelay)
            })
        }
    } else {
        //removing the elements added in mobile mode if user resizes the window
        navbarNavAltMarkup.appendChild(navbarCollapseWrapper);
        removeElement(mobileSideNav)
        removeElement(SidebarBtnImg)
        removeElement(SliderBtnCloseSpan)
        removeElement(mobileSideNav)
        removeElement(backdrop)
    }
}

//toggling the sidebar menu
function toggleSideBarMenu(btnDisp = '', navWidth = 0, dropDisp = '', isMenuOpen = false) {
    SliderBtnCloseSpan.style.display = btnDisp;
    mobileSideNav.style.width = `${navWidth}px`;
    backdrop.style.display = dropDisp;
    sidebarMenuOpen = isMenuOpen;
}
prepareHeader();
