(function(){
    'use-strict';
    class AssetGallery{
        public elem: HTMLElement;
        constructor(elem: HTMLElement) {
            let _this = this;
            this.elem = elem;
            this.init(_this,elem);
        }
       public init(_this, elem) {
            setTimeout(function(){
                let slickDots = elem.querySelectorAll('.slick-dots li');
                slickDots.forEach(function (dot, index) {
                    dot.setAttribute('tabindex','0');
                })
                slickDots.forEach(function (dot, index) {
                    dot.addEventListener('keypress',function(e){
                        if (e.keyCode === 13){
                            dot.click();
                        };
                    }, false);
                })
                let thumbsList = elem.querySelectorAll('.product-thumbnail-wrapper .product-thumbnail');
                
                thumbsList.forEach(function(thumb, index){
                    let curSrc:any = thumb.querySelector('img')?.src;
                    if(thumb.classList.contains('wistiaVideo')){
                        (slickDots[index] as HTMLElement).classList.add('wistia-video__has-image');
                    }
                    (slickDots[index] as HTMLElement).style.backgroundImage = 'url('+curSrc+')';
                })
                if(elem.querySelector('.assetsgallery-left-thumb') || elem.querySelector('.assetsgallery-right-thumb')){
                    if(window.innerWidth > 1024){
                        elem.querySelector('.slick-dots').style.height = `${elem.querySelector('.slick-slide').clientHeight}px`;
                    }
                    if(window.innerWidth <= 1024){
                        if(elem?.querySelector('.carousel-inner').classList.contains('assetsgallery-left-thumb')){
                            elem?.querySelector('.carousel-inner')?.classList?.remove('assetsgallery-left-thumb'); 
                        }
                        if(elem?.querySelector('.carousel-inner').classList.contains('assetsgallery-right-thumb')){
                            elem?.querySelector('.carousel-inner')?.classList?.remove('assetsgallery-right-thumb'); 
                        }               
                        elem?.querySelector('.carousel-inner')?.classList.add('assetsgallery-bottom-thumb');
                    }
                }
            },500);
        }
    }
    (function(){
        document.querySelectorAll('.assetsgallery').forEach(function (elem) {
              new AssetGallery(elem as HTMLElement);
          });
    })();
})();