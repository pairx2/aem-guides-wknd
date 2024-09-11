declare var window: any;
declare var ContextHub: any;

export class HiddenFields {

    /**
     * @constructor
     * @desc initialized each field
     * @param fields 
     */
    constructor (fields: NodeListOf < HTMLInputElement >) {
        fields.forEach(function(field: HTMLInputElement) {
            this.init(field);
        }.bind(this));
    }

    /**
     * @method
     * @desc initializes hidden field functinality from dialog inputs
     * @param { HTMLInputElement } ele hidden-field
     */
    private init(ele: HTMLInputElement) {
        const type = ele.dataset.hiddenType;
        const keyName = ele.dataset.keyName;

        // validation
        if(!type || !keyName) {
            return;
        }

        // call handles based on type
        switch (type) {
            case 'request':
                this.fromQueryString(ele, keyName);
                break;

            case 'jsVariable':
                this.fromJsVariable(ele, keyName);
                break;

            case 'localStorage':
                this.fromLocalStorage(ele, keyName);
                break;

            case 'sessionStorage':
                this.fromSessionStorage(ele, keyName);
                break;

            case 'cookie':
                this.fromCookie(ele, keyName);
                break;

            case 'contextHub':
                this.fromContextHub(ele, keyName);
        }

    }

    /**
     * @method
     * @desc handles hidden field functionality from query string
     * @param { HTMLInputElement } elm Hidden Field reference
     * @param {String} keyName query-string key name
     */
    private fromQueryString(elm: HTMLInputElement, keyName: string) {
        if(!elm.dataset.keepInSession) {
            return elm.value;
        }

        const value = elm.value;

        if(value) {
            // save value in session storage for future use
            window.sessionStorage.setItem(keyName, value);
        } else {
            // if not found in query string, try looking for it into session storage
            elm.value = window.sessionStorage.getItem(keyName);
        }

        return elm.value;
    }

    /**
     * @method
     * @desc handles hidden field functionality from JavaScript variables (from window scope)
     * @param { HTMLInputElement } elm Hidden Field reference
     * @param {String} keyName query-string key name
     */
    private fromJsVariable(elm: HTMLInputElement, keyName: string) {
        const value = window[keyName];

        // prevent putting undefined in the Field Value
        if(value) {
            elm.value = value;
        }

        return value;
    }

    /**
     * @method
     * @desc handles hidden field functionality from local-storage
     * @param { HTMLInputElement } elm Hidden Field reference
     * @param {String} keyName query-string key name
     */
    private fromLocalStorage(elm: HTMLInputElement, keyName: string) {
        const value = window.localStorage.getItem(keyName);
        elm.value = value;

        return value;
    }

    /**
     * @method
     * @desc handles hidden field functionality from session-storage
     * @param { HTMLInputElement } elm Hidden Field reference
     * @param {String} keyName query-string key name
     */
    private fromSessionStorage(elm: HTMLInputElement, keyName: string) {
        const value = window.sessionStorage.getItem(keyName);
        elm.value = value;

        return value;
    }

    /**
     * @method
     * @desc handles hidden field functionality from cookie
     * @param { HTMLInputElement } elm Hidden Field reference
     * @param {String} keyName query-string key name
     */
    private fromCookie(elm: HTMLInputElement, keyName: string) {
        const value = this.getCookie(keyName);
        elm.value = value;

        return value;
    }

    private fromContextHub(elm: HTMLInputElement, keyName: string) {
        if(typeof ContextHub === undefined) {
            return '';
        }

        const value = ContextHub.get(keyName);
        elm.value = value;

        return value;
    }

    /**
     * @method
     * @desc utility method to get document cookie
     * @param {string} name cookie name
     * @return {string} cookie value
     */
    private getCookie(name: string): string {
        // Split cookie string and get all individual name=value pairs in an array
        let cookieArr = document.cookie.split(";");
    
        // Loop through the array elements
        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
    
            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if(name == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
    
        // Return null if not found
        return null;
    }
}