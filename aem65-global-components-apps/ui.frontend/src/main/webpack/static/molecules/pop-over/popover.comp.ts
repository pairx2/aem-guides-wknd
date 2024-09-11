import 'bootstrap';
(function () {
    'use strict';
    class PopOver {
        private ele: HTMLElement;
        private _popOverContentDivId: string;
        private _popOverContentDiv: HTMLElement;
        private popoverAction: any;
        private popoverWrapper: any;

        constructor(ele) {
            this.ele = ele;
            this._popOverContentDivId = this.ele.getAttribute('data-target');
            this._popOverContentDiv = document.querySelector('#' + this._popOverContentDivId);

            // Popover content
            const content = this._popOverContentDiv.innerHTML;

            $(this.ele).popover({
                html: true,
                content: content,
                delay:{ "show": 0, "hide": 250 },
                container: this.ele,
                offset: "10%"
            });

          
            this.popoverWrapper = this.ele.closest('.m-popover-wrapper');
            this.popoverAction = this.popoverWrapper.querySelector('.m-popover__action .a-link a');
            $(this.ele).on('shown.bs.popover', function (event) {
                const externalLinkPop = (event.currentTarget.querySelector('.a-link a'));
                externalLinkPop?.addEventListener('click',function() {
                    this.popoverAction.click();
                }.bind(this));
            }.bind(this));           
        }
    }

    $(function () {
        document.querySelectorAll('[data-js-component="popover"]').forEach(function (ele) {
            new PopOver(ele);
        });
    });

})();
