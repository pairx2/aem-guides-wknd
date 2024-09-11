(function(){
  'use strict';
    class BackToTopButton {
        private  backToTopBtn: JQuery<any>;
        private showIfPageLongerThen: number;
        private footerHeight: number;
        private showClassName = 'show';
        private footerClass = 'footer';
        private minScrollShow = 300;

        constructor(elements) {
            this.backToTopBtn = $(elements);
            this.afterWindowLoad();
           
        }

        
        /*
            @function
            @desc Initialize after window load 
            get component dynamic value 
            only progress if content of the page longer then authored value 
            add even on click events lister 
        */
        private afterWindowLoad(): any | void {
            this.showIfPageLongerThen = +this.backToTopBtn.attr('data-page-longer-then') ?? 0; 
            if (!this.showIfPageLongerThen || this.showIfPageLongerThen == 0) {
                return;
            }

            this.backToTopBtn.on('click', this.scrollToTop);
            this.footerHeight =  document.getElementsByClassName(this.footerClass)[0]?.clientHeight ?? 0;
            this.buttonWillShow();
            
        }

        /*
            @function
            @desc on click scroll to top of page
        */
        private scrollToTop(e) {
            e?.preventDefault();
            $('html, body').animate({scrollTop:0}, 500);
        }
        
        /*
            @function
            @desc check is page grater then author value
        */
        private  buttonWillShow() : void  {
            const screenHeight = window?.screen?.height;
            const contentHeight = document.body.clientHeight;
            const willShow =  contentHeight  >= screenHeight * this.showIfPageLongerThen;

            if (willShow){
                window.addEventListener("scroll", () =>{
                    this.stopOverlayFooter();
                })
            }

        }

         /*
            @function
            @desc on scroll call for show/hide till user reaches footer section of page
        */
        private stopOverlayFooter() : void | any {
            const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;;
            const scrollHeight = (document.documentElement.scrollHeight - document.documentElement.clientHeight) - this.footerHeight;
            if (scrollPosition > this.minScrollShow && scrollHeight >= scrollPosition)  {
                !this.backToTopBtn?.hasClass(this.showClassName) && this.backToTopBtn?.addClass(this.showClassName);
            } else if (this.backToTopBtn?.hasClass(this.showClassName)){ 
                this.backToTopBtn?.removeClass(this.showClassName);
            }

        }

    }


    $(document).ready(function () {
        document.querySelectorAll('[data-js-component="back-to-top"]').forEach(function(ele) {
            new BackToTopButton(ele);
        });
      });
      


})();