
function setHeight(className) {
    let containers = document.querySelectorAll(className);
    let maxHeight = 0;

    for (let i = 0; i < containers.length; i++) {
        containers[i].style.height = 'auto';
    }

    for (let i = 0; i < containers.length; i++) {
        let height = containers[i].offsetHeight;
        maxHeight = height > maxHeight ? height : maxHeight;
    }

    for (let i = 0; i < containers.length; i++) {
        containers[i].style.height = maxHeight + 'px';
    }
}

function checkDeviceAndOrientation() {
    // Typical tablet dimensions
    let minTabletWidth = 600; 
    let maxTabletWidth = 1024;

    let isLandscape = window.matchMedia('(orientation: landscape)').matches;
    let isPortrait = window.matchMedia('(orientation: portrait)').matches;
    let isTablet = window.matchMedia(`(min-width: ${minTabletWidth}px) and (max-width: ${maxTabletWidth}px)`).matches;
    let isDesktop = window.matchMedia(`(min-width: ${maxTabletWidth + 1}px)`).matches;

    return (isLandscape || isPortrait) && (isTablet || isDesktop);
}

if (checkDeviceAndOrientation()) {
    // Initial set height
    setHeight('#nurture-container .m-card__body');
    setHeight('#nurture-container .m-card__title');
    setHeight('#nurture-container .m-card__description p');
}

window.addEventListener('resize', function () {
    if (checkDeviceAndOrientation()) {
        setHeight('#nurture-container .m-card__body');
        setHeight('#nurture-container .m-card__title');
        setHeight('#nurture-container .m-card__description p');
    }
});
