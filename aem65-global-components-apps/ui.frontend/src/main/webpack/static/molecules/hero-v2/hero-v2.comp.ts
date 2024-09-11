(function () {

    class HeroV2 {
        private elem: any;
        constructor(elem: any) {
            this.elem = elem;
            this.init();
        }

        public init() {
            var imageHeroHeight = this.elem.querySelector(".m-hero__content")?.clientHeight;
            var imageHeroPaddingTop = this.elem.querySelector(".m-hero__content")?.style.paddingTop;
            var imageHeroPaddingBottom = this.elem.querySelector(".m-hero__content")?.style.paddingBottom;
            
				if(this.elem.closest('.m-hero').classList.contains("m-hero--auto-height")) {
                    var imageRemoveMinHeight;
                    imageRemoveMinHeight = (imageHeroHeight + imageHeroPaddingTop + imageHeroPaddingBottom);
            		if(imageRemoveMinHeight){
                        this.elem.querySelector('.m-hero__media').style.height = imageRemoveMinHeight + "px";
                        this.elem.closest('.m-hero').style.height = imageRemoveMinHeight + "px";
                     }
                }
            
        }
    }

    (function () {

        document.querySelectorAll('[data-js-component="hero-v2"]').forEach(function (elem) {
            new HeroV2(elem as any);
        });
        
    })();
})();
