(function () {

    class Spacer {
        private elem: any;
        constructor(elem: any) {
            this.elem = elem;
            this.init();
        }

        public init() {
            if(window.outerWidth < 768) {
                this.elem.style.marginTop = this.elem.getAttribute("data-spacer-mob-pixels") + "px";
            } else if (window.outerWidth < 991) {
                this.elem.style.marginTop = this.elem.getAttribute("data-spacer-tab-pixels") + "px";
            } else {
                this.elem.style.marginTop = this.elem.getAttribute("data-spacer-desk-pixels") + "px";
            }

        }
    }

    (function () {

        document.querySelectorAll('[data-js-component="spacer"]').forEach(function (elem) {
            new Spacer(elem as any);
        });
        window.onresize = function() {
            document.querySelectorAll('[data-js-component="spacer"]').forEach(function (elem) {
                new Spacer(elem as any);
            });
        };
    })();
})();
