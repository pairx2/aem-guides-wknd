let resizeTimer;
const debounceTime = 250; //debouncing time for browser resize event

function updateFeatureCardTitleHeight() {
    document.querySelectorAll(".container .row").forEach((elm: HTMLDivElement) => {
        let maxHeight = 0;
        const featureCard = elm.querySelectorAll(".o-features-card__block .o-features-card__title");
        if(!featureCard.length) return;
        featureCard.forEach((elem: HTMLDivElement) => {
            elem.style.height = "auto";
            if (elem.clientHeight > maxHeight) {
                maxHeight = elem.clientHeight;
            }
        });
        featureCard.forEach((elem: HTMLDivElement) => {
            if (maxHeight > 0) {
                elem.style.height = `${maxHeight}px`;
            }else{
                elem.style.height = "auto";
            }
        });
    });
}

updateFeatureCardTitleHeight();

window.onresize = function () {

    clearInterval(resizeTimer); //clearing timer if browser resized before debounce time

    resizeTimer = setTimeout(updateFeatureCardTitleHeight, debounceTime);
}
