declare var window: any;

export class FormMessage {
    private successElement: HTMLElement;
    private failureElement: HTMLElement;

    /**
     * @constructor
     * @desc creates reference of Message Elements
     * @param { HTMLElement } form Form Element
     */
    constructor (form: HTMLElement) {
        this.successElement = form.querySelector('[class*="o-form-container__success-msg"]');
        this.failureElement = form.querySelector('[class*="o-form-container__error-msg"]');
    }

    /**
     * @method
     * @desc clears all form messages
     */
    clear() {
        this.successElement.innerText = '';
        this.failureElement.innerText = '';
    }

    /**
     * @method
     * @desc sets success form message
     * @param {String} messageText success message to be displayed on UI
     */
    success(messageText: string) {
        this.clear();
        this.successElement.innerText = messageText;
    }

    /**
     * @method
     * @desc sets error form message
     * @param {String} messageText error message to be displayed on UI
     */
    error (messageText: string) {
        this.clear();
        this.failureElement.innerText = messageText;
    }

    /**
     * @method
     * @desc displays API responsed based i18n message on UI
     * @param { any } response Response object
     * @param { string } authoredFailureMsg default message in case of nothing configured against API i18n key
     */
    apiError (response: any, authoredFailureMsg: string) {
        const i18Key = response.i18nMessageKey;
        const i18Msg = window.Granite.I18n.get(i18Key);
        const errorMessage = i18Msg !== i18Key ? i18Msg : authoredFailureMsg;
		this.clear();
        this.failureElement.innerText = errorMessage;
    }
}