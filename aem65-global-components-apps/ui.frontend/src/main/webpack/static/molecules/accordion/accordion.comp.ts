import 'bootstrap';
(function () {
    class Accordion {
        private container: HTMLElement;
        private accordionCont: any;
        private expandAll: any;
        private collapseAll: any;
        private contentIcon: HTMLElement;
        private accordionExpansionType: string;
        private contentBody: HTMLElement;
        private accordionHeader: HTMLElement;
        private iconShowHide: NodeListOf<HTMLElement>;
        private allAccordions: NodeListOf<HTMLElement>;

        constructor(ele: HTMLElement) {
            this.container = ele;
            this.cacheElements();
            this.attachEvents();
        }

        /**
        * @function
        * @desc Fetch the elements of accordion
        * @param {Object} event
        */

        private cacheElements() {
            const container = this.container;
            this.accordionCont = this.container.closest('.m-accordion');
            this.accordionExpansionType = this.container.closest('.m-accordion__content')?.getAttribute('data-expansion');
            this.accordionHeader = this.container.querySelector('.m-accordion__header');
            this.expandAll = this.accordionCont?.querySelector('.m-accordion__expand-title');
            this.collapseAll = this.accordionCont?.querySelector('.m-accordion__collapse-title');
            this.contentIcon = container.querySelector('.m-accordion__icon-wrapper span');
            this.contentWrapper = container.querySelector('.m-accordion__icon-wrapper');
            this.iconShowHide = this.contentIcon?.querySelectorAll('.m-accordion-icon');
            this.contentBody = container.querySelector('.m-accordion__body');
        }

        /**
         * @function
         * @desc Attach eventhandlers with the respective event on click etc
         * @param {Object} event
         */

        private attachEvents() {
            this.expandAll.addEventListener('click', this.onExpandAllClick.bind(this));
            this.collapseAll.addEventListener('click', this.onCollapseAllClick.bind(this));
            this.accordionHeader.addEventListener('click', this.onIconToggle.bind(this));
            this.allAccordionCheck();
        }

        /**
         * @function
         * @desc when expand all accordion is clicked
         * @param {Object} event
         */

        private onExpandAllClick() {
            this.expandAll.classList.remove('show');
            this.collapseAll.classList.add('show');
            $(this.contentBody).collapse('show');
            this.contentIcon.setAttribute('data-toggle', 'expand');
            this.contentWrapper.setAttribute('aria-expanded', 'true');
            this.iconShowHide.forEach(function (ele) {
                ele.getAttribute('data-icon') === 'expand' ? ele.classList.remove('icon-visible') : ele.classList.add('icon-visible');

            }.bind(this));
        }

        /**
         * @function
         * @desc When collapse all for the accordion is clicked
         * @param {Object} event
         */

        private onCollapseAllClick() {
            this.expandAll.classList.add('show');
            this.collapseAll.classList.remove('show');
            $(this.contentBody).collapse('hide');
            this.contentIcon.setAttribute('data-toggle', 'collapse');
            this.contentWrapper.setAttribute('aria-expanded', 'false');
            this.iconShowHide.forEach(function (ele) {
                ele.getAttribute('data-icon') === 'collapse' ? ele.classList.remove('icon-visible') : ele.classList.add('icon-visible');

            }.bind(this));
        }

        /**
         * @function
         * @desc When all the accordion panels are toggled manually change the expand/collapse all text
         * @param {Object} event
         */

        private allAccordionCheck() {
            let expand = 0, collapse = 0;
            const allAccord = this.accordionCont.querySelectorAll('.m-accordion-toggle');
            allAccord.forEach(function (ele) {
                ele.dataset.toggle== 'collapse' ? expand++ : collapse++;
            });
            if (expand === allAccord.length) {
                this.expandAll.classList.remove('show');
                this.collapseAll.classList.add('show');
            } else if (collapse === allAccord.length) {
                this.expandAll.classList.add('show');
                this.collapseAll.classList.remove('show');
            }
        }

        /**
         * @function
         * @desc When each icon of accordion panel is toggled
         * @param {Object} event
         */

        private onIconToggle(evt: MouseEvent) {
            evt?.stopImmediatePropagation();
           var callback =  function() {
                if (this.accordionExpansionType !== 'single') {
                    this.allAccordionCheck();
                }
            }.bind(this);
            this.iconShowHide.forEach(function (ele) {
                ele.classList.contains('icon-visible') ? this.onPlusClick(ele, callback) : this.onMinusClick(ele, callback);
            }.bind(this));

        }

        /**
         * @function
         * @desc When plus icon to expand one accordion is clicked + single item expansion code
         * @param {Object} event
         */

        private onPlusClick(ele, callback) {
            if (this.accordionExpansionType === 'single') {
                this.collapseAll.click();
            }
            ele.classList.remove('icon-visible');
            $(this.contentBody).collapse('show');
            $(this.contentBody).on('shown.bs.collapse', () => {
              document.dispatchEvent(new Event('accordion:expanded'));
              $(this.contentBody).off('shown.bs.collapse');
            });
            this.contentIcon.setAttribute('data-toggle', 'expand');
            this.contentWrapper.setAttribute('aria-expanded', 'false');
            callback();
        }

        /**
         * @function
         * @desc When minus icon to collapse one accordion is clicked
         * @param {Object} event
         */

        private onMinusClick(ele, callback) {
            $(this.contentBody).collapse('hide');
            this.contentIcon.setAttribute('data-toggle', 'collapse');
            this.contentWrapper.setAttribute('aria-expanded', 'true');
            ele.classList.add('icon-visible');
            callback();
        }

    }

    $(function () {
        const allAccordion = document.querySelectorAll('[data-js-component="accordion"]');
        allAccordion.forEach((ele) => {
            new Accordion(ele as HTMLElement);
        });
    });
}());
