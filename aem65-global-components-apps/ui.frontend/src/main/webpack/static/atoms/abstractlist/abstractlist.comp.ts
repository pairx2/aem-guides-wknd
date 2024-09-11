import 'jquery.easing';

declare var window: any;

class AbstractList {
    /**
    *Creates an instance of AbstractList.
    * @param {HTMLElement} ele
    */
    private  container: HTMLElement;
    private $container: JQuery<HTMLElement>;
    private filterList: Array<any> = [];
    private listId: string;
    private callbackList: any = {};
    private activeItem: HTMLElement;
    private onElementClickFn: string;

    constructor(ele: HTMLElement) {
        this.container = ele;
        this.$container = $(ele);
        this.onElementClickFn = this.container.querySelector('input[name="functionToCall"]')?.getAttribute('value');
        this.filterList = JSON.parse(ele.dataset.manualData);
        this.listId = ele.getAttribute('id');

        this.setAbstractListCallbacks();
        this.setCallbackBucket(this.listId);

        //check if the list (manual authored) exists
         if (this.filterList.length) {
            this.updateListDOM();
            return;
        }
    }

    /**
    * @function
    * @desc Adds AbstractListCallbacks container to public namespace
    */
    private setAbstractListCallbacks() {
        window.abstractListCallbacks = window.abstractListCallbacks || {};

        const listId = this.listId;

        if (!listId) {
            return;
        }

        if (!window.abstractListCallbacks[listId]) {
            window.abstractListCallbacks[listId] = {};
        }

        const callbackList = window.abstractListCallbacks[listId];

        if (this.onElementClickFn) { callbackList.onElementClick = this.onElementClickFn; }
    }

    /**
    * @function
    * @desc fetches callbacks for the current form instance from the callback-bucket
    * @param {String} listId form ID
    */
    public setCallbackBucket(listId: string) {

        // if listId not given, do nothing
        if(!listId) {
            return;
        }

        const callbackBucket = window.abstractListCallbacks;
        this.callbackList = callbackBucket[listId];
    }

    /**
    * @function
    * @desc checks if passed value is a function
    * @param fn
    * @return {Boolean} validation result if passed value is a function
    */
     private isFunction(fn: any): boolean {
        return fn && typeof fn === 'function';
    }

    /**
    * @function
    * @desc  updates active Filter and adds class active
    * @param event
    */
    private updateActiveFilterTitle (event) {
        const activeItemTitle = this.container.querySelector('.abstractlist-activeItem');
 
        if (activeItemTitle) {
            const clickedEle = event.target;

            //check for existing active item , and toggles classes
            if (this.activeItem) {
                this.activeItem.classList.remove('active');
            }

            clickedEle.classList.add('active');

            activeItemTitle.innerHTML = clickedEle.dataset.title;
            //update active item;
            this.activeItem = clickedEle;
        }
        
    }

    /**
    * @function onElementClick
    * @desc inner function - to be used handle list element on click
    * @param event
    */
    private onElementClick(event) {

        this.updateActiveFilterTitle(event);
    
        //check for JS function defined in dialog
        const onElementClickFn: Function = window[this.callbackList.onElementClick];
        if (this.isFunction(onElementClickFn)) {
            onElementClickFn(event);
        }
    }

    /**
    * @function
    * @desc funtion to append the list of items to DOM
    */
    private updateListDOM () {
        const listContainerEle = this.$container.find('.abstractlist-item-list');

        //check for any catgeory in url as query params if present
        const urlParams = new URLSearchParams(window.location.search);
        const queryCategory = urlParams.get('category');

        if (listContainerEle.length) {
            this.filterList.forEach(({ title, value}) => {
                const linkEle = $(`<a href="javascript:void(0);" class="abstractlist-item-link" data-value="${value}" data-title="${title}">
                ${title} </a>`);
                const listEle = $(`<li class="abstractlist-item"></li>`).append(linkEle);

                //only if JS function defined in dialog attach click event
                const onElementClickFn: Function = window[this.callbackList.onElementClick];
                if (onElementClickFn) {
                    linkEle.on('click', (event) => {
                        this.onElementClick(event);
                    });   
                }

                // query category same as value trigger click
                if (queryCategory === value) {
                    linkEle.trigger('click');
                }

                $(listContainerEle).append(listEle);
            });
        }
    }
};

$(function () {
    document.querySelectorAll('[data-js-component="abstract-list"]').forEach((e) => {
        new AbstractList(e as HTMLElement);
    });
});