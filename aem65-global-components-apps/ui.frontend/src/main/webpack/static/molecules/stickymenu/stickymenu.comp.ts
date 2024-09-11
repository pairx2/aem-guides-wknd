(function(){
    'use-strict';
    class StickyMenu{
        public elem: HTMLElement;
        constructor(elem: HTMLElement) {
            let _this = this; 
            this.elem = elem;
            this.init(_this, elem); 
        }

        public init(_this:any, elem:any) {
                let productTitleHeight:any = 0;
                setTimeout(function(){
                if(elem.querySelector('.stickyMenu .m-link-stack__title')){
                    let clonnedTitle = elem.querySelector('.stickyMenu .m-link-stack__title').outerHTML?.replace('h4','h2');
                    let temp = document.createElement('div');
                    temp.innerHTML = clonnedTitle;
                    productTitleHeight = elem.querySelector('.stickyMenu .m-link-stack__title').clientHeight + 30;
                    document.querySelectorAll('.stickyMenu .m-link-stack__title').forEach(element => {
                        element.remove();
                    });
                     elem.querySelector('.stickyMenu').insertBefore(temp, document.querySelector('.stickyMenu .m-link-stack'));
                     elem.querySelector('.stickyMenu > div > .m-link-stack__title').classList.add('container')
                     elem.querySelector('.stickyMenu > div > .m-link-stack__title').classList.add('product-title')
                     elem.querySelector('.stickyMenu > div > .m-link-stack__title').classList.add('d-none');
                }
                function isHidden(el) {
                    return (el?.offsetParent === null)
                }
               
                elem.querySelectorAll('.m-link-stack__list a[href^="#"]').forEach(function(link){
                   let faqLink = link?.closest('.faq-link');
                   if(!faqLink){
                        link?.addEventListener('click', function (event) {
                            event.preventDefault();
                            let stickyMenuTop:any = ($(elem).offset().top);
                            let offsetTop;
                            let href = link.getAttribute('href');
                            if (document.querySelector(href)) {
                                if (document.querySelector(href).closest('.devicespecific')) {
                                    document.querySelectorAll(href).forEach(function (section) {
                                        if (!isHidden(section)) {
                                            offsetTop =  $(section).offset().top;
                                        }
                                    });
                                }
                                else {
                                    offsetTop =  $(href).offset().top;
                                }
                            }
                            else {
                                href = "#section_" + href.replace('#', '');
                                if (document.querySelector(href).closest('.devicespecific')) {
                                    document.querySelectorAll(href).forEach(function (section) {
                                        if (!isHidden(elem)) {
                                            offsetTop = $(section).offset().top;
                                        }
                                    });
                                }
                                else {
                                    offsetTop = $(href).offset().top;
                                }
                            }
                            let menuHeight:any = 0;
                            let headerHeight:any = 0;
                            if(((document.documentElement.scrollTop) < stickyMenuTop) && (window.innerWidth < 991)){ 
                                productTitleHeight = 100;
                            }
                            if(((document.documentElement.scrollTop) < stickyMenuTop) && (document.querySelector('.product-title') as HTMLElement)?.innerText.length > 33 && (window.innerWidth > 767 && window.innerWidth < 991)){ 
                                productTitleHeight = 140;
                            }
                            if (document.querySelector('.o-header__sticky-section') ) {
                                headerHeight = document.querySelector('.o-header__sticky-section').clientHeight;
                            }
                            if (document.querySelector('.o-header-v2-global__sticky-section') ) {
                                headerHeight = document.querySelector('.o-header-v2-global__sticky-section').clientHeight;
                            }
                            menuHeight = elem.querySelector('.stickyMenu')?.clientHeight + headerHeight;
                            let updatedOffset = offsetTop;
                            let currScrollPos:any = document.documentElement.scrollTop;
                            if (window.innerWidth > 767 && parseInt(currScrollPos) > stickyMenuTop) {
                                updatedOffset = parseInt(updatedOffset) + 50;
                            }
                            if (window.innerWidth > 767 && parseInt(currScrollPos) < stickyMenuTop) {
                                updatedOffset = parseInt(updatedOffset) - 70;
                            }
                            if (parseInt(offsetTop) > stickyMenuTop) {
                                updatedOffset = (updatedOffset - (menuHeight + (productTitleHeight ? productTitleHeight : 0))) + 40;
                                if (window.innerWidth > 991){
                                    updatedOffset = (updatedOffset - 70);
                                }
                            }
                            if (parseInt(offsetTop) <= stickyMenuTop) {
                                updatedOffset = (updatedOffset - (menuHeight)) + 40;
                            }
                            if (window.innerWidth < 767 && parseInt(currScrollPos) > stickyMenuTop) {
                                updatedOffset = parseInt(updatedOffset) + 192;
                            }
                            if (window.innerWidth < 767 && parseInt(currScrollPos) < stickyMenuTop) {
                                updatedOffset = parseInt(updatedOffset) - 70;
                            }
                            if (parseInt(currScrollPos) < stickyMenuTop) {
                                if (document.documentElement.scrollTop == 0 && parseInt(offsetTop) > stickyMenuTop && window.innerWidth > 767) {
                                    updatedOffset = updatedOffset - (menuHeight - 40);
                                }
                            }
                            if (document.documentElement.scrollTop == 0 && parseInt(offsetTop) > stickyMenuTop && window.innerWidth <= 767) {
                                updatedOffset = updatedOffset - (menuHeight - 20);
                            }
                            _this.smoothScrollTo((updatedOffset), 1000);
                            if(!link.classList.contains('clickedLink')){
                                link.classList.add('clickedLink');
                            };
                        });
                    }
                })
            },500);
            if(elem.querySelector('.stickyMenu .m-link-stack__dropdown-wrapper')?.classList.contains('d-none') && window.innerWidth > 767){
                elem.querySelector('.stickyMenu .m-link-stack__dropdown-wrapper')?.classList.remove('d-none')
            }
            window.addEventListener('scroll',function() {
                let stickyMenuHeight = elem.querySelector('.stickyMenu .m-link-stack__dropdown-wrapper').clientHeight + 20;
                let headerTop = (elem as HTMLElement)?.offsetTop - stickyMenuHeight;
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let wrapperTop = scrollTop;
                if (wrapperTop > headerTop){
                    elem.querySelector('.stickyMenu')?.classList.add('sticky')
                    elem.querySelector('.stickyMenu .product-title')?.classList.remove('d-none')
                }
                    else{
                    elem.querySelector('.stickyMenu')?.classList.remove('sticky')
                    elem.querySelector('.stickyMenu .product-title')?.classList.add('d-none')
                }
                let menuTop:any = 0;
                 if (document.querySelector('.o-header__sticky-section') && getComputedStyle(document.querySelector('.o-header__sticky-section')).position == 'fixed') {
                    menuTop = document.querySelector('.o-header__sticky-section').clientHeight;
                    menuTop = menuTop - 1;
                }
                if (document.querySelector('.o-header-v2-global__sticky-section') && getComputedStyle(document.querySelector('.o-header-v2-global__sticky-section')).position == 'fixed' && getComputedStyle(document.querySelector('.o-header-v2-global__section--utility-top')).position == 'fixed') {
                    menuTop = document.querySelector('.o-header-v2-global__sticky-section')?.clientHeight +  document.querySelector('.o-header-v2-global__section--utility-top')?.clientHeight;
                    menuTop = menuTop - 1;
                }
                elem.querySelector('.stickyMenu')?.setAttribute('style', 'top:' + menuTop + 'px');
            });
        }
        public findPosY(obj:any) {
            let curtop = 0;
            if (obj.offsetParent) {
               while (obj.offsetParent) {
                  curtop += obj.offsetTop
                  obj = obj.offsetParent;
               }
            }
            else if (obj.y)
              curtop += obj.y;
            return curtop;
         }
         public smoothScrollTo = function (pos, time) {
            let currentPos = window.pageYOffset;
            let start = null;
            if (time == null) time = 500;
            pos = +pos, time = +time;
            window.requestAnimationFrame(function step(currentTime) {
                start = !start ? currentTime : start;
                let progress = currentTime - start;
                if (currentPos < pos) {
                    window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
                } else {
                    window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
                }
                if (progress < time) {
                    window.requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, pos);
                }
            });
        };
    }
    (function(){
        function isHidden(el) {
            return (el?.offsetParent === null)
        }
        document.querySelectorAll('.stickymenu').forEach(function (elem) {
            if(!isHidden(elem)){
                new StickyMenu(elem as HTMLElement);
            }
        });
    })();
})();
