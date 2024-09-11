import 'paginationjs';
(function () {
    class Paginationstatic {
        private container: HTMLElement;
        private paginationContent: HTMLElement;
        private authoredComponents: HTMLElement;
        private previousIcon: string;
        private nextIcon: string;
        private paginationLinks: HTMLElement;
        private componentArray: HTMLElement[] = [];
        private autoHideNext: Boolean;
        private autoHidePrevious: Boolean;
        private pageSize: Number;

        constructor(ele: HTMLElement) {
            this.container = ele;
            this.cacheElements();
            this.generateArray();
        }

        /**
        * @function
        * @desc Fetch the elements of pagination
        * @param {Object} event
        */

        private cacheElements() {
            const container = this.container;
            this.authoredComponents = container?.querySelector('.m-pagination-static__components');
            this.previousIcon = '<em class="abt-icon abt-icon-left-arrow"></em>';
            this.nextIcon = '<em class="abt-icon abt-icon-right-arrow"></em>';
            this.paginationContent = container?.querySelector('.m-pagination-static__content');
            this.paginationLinks = container?.querySelector('.m-pagination-static__links');
            this.autoHideNext = (container?.getAttribute('auto-hide-next').toLowerCase() === 'true') ? true : false;
            this.autoHidePrevious = (container?.getAttribute('auto-hide-previous').toLowerCase() === 'true') ? true : false;
            this.pageSize = +(container?.getAttribute('page-size'));
        }

        /**
        * @function
        * @desc Generate an array for the components added inside pagination
        * @param {Object} event
        */

        private generateArray() {
            const contentFragmentCheck: NodeListOf<Element> = this.authoredComponents?.querySelectorAll('.contentfragmentlist');
            let childElements: JQuery<HTMLElement>;
            let contentFragmentStructureElements: JQuery<HTMLElement>;
            if (contentFragmentCheck && contentFragmentCheck.length) {
                childElements = $(contentFragmentCheck).find('.cmp-contentfragmentlist').children().clone(true);
                contentFragmentStructureElements = $(contentFragmentCheck).find('.cmp-contentfragmentlist').parent().clone(true);
                $(contentFragmentStructureElements).find('.cmp-contentfragmentlist').empty();
                $(contentFragmentStructureElements).find('.pagination').remove();
            } else {
                childElements = $(this.authoredComponents).children().clone(true);
            }
            Array.from(childElements).forEach((ele: HTMLElement) => {
                this.componentArray.push(ele);
            });
            this.generatePagination(contentFragmentStructureElements);
        }

        /**
        * @function
        * @desc Generate pagination on the componentArray elements/components
        * @param {Object} event
        */

        private generatePagination(contentFragmentStructureElements: JQuery<HTMLElement>) {
            (<any>$(this.paginationLinks)).pagination({
                dataSource: this.componentArray,
                pageSize: this.pageSize,
                autoHideNext: this.autoHideNext,
                autoHidePrevious: this.autoHidePrevious,
                callback: (components, _) => {
                    $(this.paginationContent).empty();
                    $.each(components, (_, component) => {
                        if (contentFragmentStructureElements && contentFragmentStructureElements.length) {
                            if (this.paginationContent.querySelector('.cmp-contentfragmentlist') == null) {
                                let contentFragmentStructure = $(contentFragmentStructureElements[0]).clone(true);
                                $(contentFragmentStructure).appendTo(this.paginationContent);
                            }
                            $(component).appendTo(this.paginationContent.querySelector('.cmp-contentfragmentlist'));
                        } else {
                            $(component).appendTo(this.paginationContent);
                        }
                    });
                    this.updateIcons();
                    this.focusOnClick();
                }
            });
            if ($('#wcmMode').val() === 'false') {
                this.authoredComponents.style.display = 'none';
            }
        }

        /**
        * @function
        * @desc Update previous and next icons to the content authored icons
        * @param {Object} event
        */

        private updateIcons() {
            this.paginationLinks.querySelector('.paginationjs-prev a').innerHTML = this.previousIcon;
            this.paginationLinks.querySelector('.paginationjs-next a').innerHTML = this.nextIcon;
        }

        /**
        * @function
        * @desc Shift the focus to the top of pagination component when a pagination number/arrow is clicked
        * @param {Object} event
        */

        private focusOnClick() {
            this.paginationLinks.querySelectorAll('li').forEach(ele => {
                !(ele.classList.contains('disabled') || ele.classList.contains('active')) &&
                    ele.addEventListener('click', function () {
                        $('html,body').animate({ scrollTop: this.container.offsetTop }, 400);
                    }.bind(this));
            });
        }
    }

    $(function () {
        const paginationstatic = document.querySelectorAll('[data-js-component="pagination-static"]');
        paginationstatic.forEach((ele) => {
            new Paginationstatic(ele as HTMLElement);
        });
    });
}());
