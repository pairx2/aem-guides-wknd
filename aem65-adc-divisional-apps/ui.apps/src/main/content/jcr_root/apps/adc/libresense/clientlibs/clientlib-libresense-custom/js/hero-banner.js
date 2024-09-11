function prepareHeroBanner(){
  const mediaQueryExtraSmallScreen = window.matchMedia('(max-width:576px)');

    if (mediaQueryExtraSmallScreen.matches) {
        document.querySelectorAll(".m-hero .m-hero__media .cmp-teaser__image div").forEach(function (element) {
            const imageVal = element.getAttribute("data-asset").split('.');
            const extentionVal = imageVal.pop();
            const finalVal = `${imageVal[0]}-mobile.${extentionVal}`;
            element.querySelector("img").src = finalVal;
        })
    }else{
        document.querySelectorAll(".m-hero .m-hero__media .cmp-teaser__image div").forEach(function (element) {
            element.querySelector("img").src = element.getAttribute("data-asset");
        })
    }
}
