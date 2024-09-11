import { FormContainer } from '../form-container/form-container.comp';
//import {Common} from '../../common';

declare var window: any;
declare var grecaptcha: any;
class Wizard {

    private container: HTMLElement;
    private wizardId: string;
    private callbackList: any = {};
    private formContainers: Array<any> = [];
    private allForms: Array<any> = [];
    private wizardActionUrl: string;
	private wizardActionMethod: string;
    private wizardSubmit: HTMLButtonElement;
    private nextBtn: NodeListOf<Element>;
    private backBtn: NodeListOf<Element>;
    private wizardListItems: NodeListOf<Element>;
    private fieldSet: NodeListOf<Element>;


    private static readonly validationClasses: {
        [key: string]: string
    } = {
            incomplete: 'a-wizard__step--incomplete',
            complete: 'a-wizard__step--complete',
            active: 'a-wizard-step--active',
            inactive: 'a-wizard-step--inactive'
        }      

    private hiddenFields: NodeListOf<Element>;
    private headers: NodeListOf<HTMLInputElement>;
    private successElement: any;
    private failureElement: any;
    private authoredSuccessMsg: string;
    private authoredFailureMsg: string;
    private isRecaptchaEnabled: any = false;
    private isEnterpriseRecaptchaEnabled: any = false;
    private recaptchaSiteKey: string;
    private recaptchaScriptSrc: string;
    private recaptchToken: string;
    private thankyouPage: HTMLElement;

    private isWizardEventTrackingEnabled: boolean;
    private wizardEventTrackingType: string;
    private wizardFormName: string;

    private wizardSpinner: HTMLElement;

    private updateRequestFn: string;
    private onBeforeCallFn: string;
    private onSuccessFn: string;
    private onErrorFn: string;
    private onCompleteFn: string;

    constructor(ele: HTMLElement) {
        this.container = ele;
        this.initFormContainers();
        this.wizardElements();
        this.createRecaptcha();
        this.wizardEvents();

        this.wizardId = ele.getAttribute('id');
        FormContainer.setFormContainerCallbacks(this.wizardId, this.updateRequestFn, this.onBeforeCallFn, this.onSuccessFn, this.onErrorFn, this.onCompleteFn);
        this.setCallbackBucket(this.wizardId);

    }

    public initFormContainers() {
        this.container.querySelectorAll('[data-js-component="formcontainer"]').forEach(function (form: HTMLElement) {
            let formIndex = form.closest('fieldset').dataset.wizarditem;
            let formInstance = new FormContainer(form as HTMLElement);
            this.formContainers.push(formInstance);
            this.allForms[formIndex] = formInstance;
        }.bind(this));
    }

    public getFormsBodyWizardData() {
        let wizardData: any;
        this.formContainers.forEach(function (formInstance: FormContainer) {
            const formData = formInstance.getFormBody();
            wizardData = $.extend(true, {}, wizardData, formData);
        });
        return wizardData;
    }


    public createRecaptcha() {
        if (document.querySelector('#recaptcha') || !this.isRecaptchaEnabled) {
            return;
        }
        const script = document.createElement('script');
        script.src = this.recaptchaScriptSrc;
        script.id = 'recaptcha';
        document.head.appendChild(script);
    }

    /**
     * @function
     * @desc fetches callbacks for the current form instance from the callback-bucket
     * @param {String} formId form ID
     */
    private setCallbackBucket(formId: string) {

        // if formId not given, do nothing
        if(!formId) {
            return;
        }

        const callbackBucket = window.formContainerCallbacks;
        this.callbackList = callbackBucket[formId];
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
     * @desc wizardFinalData
     * @param {any} wizardFinalData form data object containing headers and body
     */
    private updateRequest(wizardFinalData: any) {
        /**
         * @function updateRequest
         * @desc inner function
         * @return {Object} object with optional headers and body keys
         */
        const updateRequestFn: Function = window[this.callbackList.updateRequest];
        if(!this.isFunction(updateRequestFn)) {
            return;
        }

        const newFormData = updateRequestFn(wizardFinalData);

        // if returned value is not as expected, do nothing
        if(!newFormData || !(newFormData instanceof Object)) {
            return;
        }

        // update request headers
        if(newFormData.headers && newFormData.headers instanceof Object) {
            for (const header in newFormData.headers) {

                // Do NOT modify keys which are already there in original request headers
                if(!wizardFinalData.headers[header]) {
                    wizardFinalData.headers[header] = newFormData.headers[header];
                }
            }
        }

        // update request body params
        if(newFormData.body && newFormData.body instanceof Object) {
            for (const param in newFormData.body) {

                // If object type, extend
                if(newFormData.body[param] instanceof Object) {
                    if(wizardFinalData.body[param]) {
                        Object.assign(wizardFinalData.body[param], newFormData.body[param]);
                    } else {
                        wizardFinalData.body[param] = newFormData.body[param];
                    }
                } else if(!wizardFinalData.body[param]) {

                    // Do NOT modify keys which are already there in original request body
                    wizardFinalData.body[param] = newFormData.body[param];
                }
            }
        }
    }

    private onBeforeCall() {
        /**
         * @function onBeforeCall
         * @desc inner function - to be used mostly to validate user rights, sign in status and redirect
         *       to other page if required
         */
        const onBeforeCallFn: Function = window[this.callbackList.onBeforeCall];
        if(this.isFunction(onBeforeCallFn)) {
            onBeforeCallFn();
        }
    }

    private onSuccess(response: any) {
        /**
         * @function onSuccess
         * @desc inner function - handles response object
         * @param {Object} respObj Reponse JSON to be handled/proccessed further
         */

        // DATA LAYER PUSH
        if(this.isWizardEventTrackingEnabled) {
            let wizardSuccessData = FormContainer.getDataLayer('form_complete', 'form', 'complete', this.wizardFormName);
            window.dataLayer.push(wizardSuccessData);	
        }

        const onSuccessFn: Function = window[this.callbackList.onSuccess];
        if(!this.isFunction(onSuccessFn)) {
            return;
        }

        onSuccessFn(response);
    }

    private onError(error: any) {
        /**
         * @function onError
         * @desc inner function - handles response error
         * @param {Error} error
         */

        // DATA LAYER PUSH
        let statusReason: any = 'Something went wrong';
		if (!(typeof error === undefined || typeof error === null)) {
			if (error?.response && error?.response?.statusReason) {
			    statusReason = error.response.statusReason;
			}
		}		
        let eventLabel = statusReason + "|" + this.wizardFormName;
         if(this.isWizardEventTrackingEnabled) {
            let wizardErrorData = FormContainer.getDataLayer('form_error', 'form', 'error', eventLabel);
            window.dataLayer.push(wizardErrorData);
        }

        const onErrorFn: Function = window[this.callbackList.onError];
        if (this.isFunction(onErrorFn)) {
            onErrorFn(error);
        }
    }

    private onComplete() {
        /**
         * @function onComplete
         * @desc inner function - executes after the ajax is completed with error or success
         */
        const onCompleteFn: Function = window[this.callbackList.onComplete];
        if (this.isFunction(onCompleteFn)) {
            onCompleteFn();
        }
    }

    /**
     * @function
     * @desc Fetch the hidden elements and headers from the wizard
     * @param {Object} event
     */

    private wizardElements() {
        const container = this.container;
        const wizardCont = container.querySelector('.o-wizard__container');
        const contData = container.dataset;
        this.wizardActionUrl = wizardCont.getAttribute('data-action');
		this.wizardActionMethod = wizardCont.getAttribute('data-ajax-method');
        this.hiddenFields = container.querySelectorAll('[data-form-mode="wizard"]');
        this.headers = document.querySelectorAll('input[data-header="true"]');
        this.isRecaptchaEnabled = (contData.recaptcha === 'true');
        this.isEnterpriseRecaptchaEnabled = document.getElementsByName("enterpriseRecaptcha").length ? document.getElementsByName("enterpriseRecaptcha")[0].value : false;
        this.recaptchaScriptSrc = contData.captchaScriptSrc;
        this.recaptchaSiteKey = contData.siteKey;
        this.fieldSet = wizardCont.querySelectorAll('.o-wizard__content');
        this.wizardListItems = wizardCont.querySelectorAll('.a-wizard__steps li');
        this.nextBtn = container.querySelectorAll('.o-wizard__btn .button-div:not(.o-wizard__btn--back) button:not([type="submit"])');
        this.backBtn = container.querySelectorAll('.o-wizard__btn .button-div.o-wizard__btn--back');
        this.wizardSubmit = container.querySelector('.o-wizard__btn .button-div:not(.o-wizard__btn--back) button[type="submit"]');
        this.successElement = container.querySelector('[class*="o-wizard-container__success-msg"]');
        this.failureElement = container.querySelector('[class*="o-wizard-container__error-msg"]');
        this.authoredSuccessMsg = $('[name="successMessage"]').attr('value');
        this.authoredFailureMsg = $('[name="failureMessage"]').attr('value');
        this.thankyouPage = container.querySelector('[name="thankyouPage"]');

        this.isWizardEventTrackingEnabled = (contData.eventTracking === 'true');
        this.wizardEventTrackingType = container.closest('.o-wizard')?.getAttribute('data-event-tracking-type');
        this.wizardFormName = contData.formName;

        if(this.wizardSubmit) {
            this.wizardSpinner = this.wizardSubmit.closest('.a-button');
        }

        this.updateRequestFn = container.querySelector('input[name="updateRequest"]')?.getAttribute('value');
        this.onBeforeCallFn = container.querySelector('input[name="onBeforeCall"]')?.getAttribute('value');
        this.onSuccessFn = container.querySelector('input[name="onSuccess"]')?.getAttribute('value');
        this.onErrorFn = container.querySelector('input[name="onError"]')?.getAttribute('value');
        this.onCompleteFn = container.querySelector('input[name="onComplete"]')?.getAttribute('value');

    }

    /**
     * @function
     * @desc Next button click of Wizard
     * @param {Object} event
     */

    private nextButtonClick(evt: JQueryEventObject, animating, wLeft, wOpacity) {
        const currentFieldsetCont = $(evt.currentTarget)?.closest('fieldset'); //current fs

        const nextFieldsetCont = currentFieldsetCont.next(); //nextFs
        let currentIndex = currentFieldsetCont?.data('wizarditem');
        const currentListItem = this.wizardListItems[currentIndex]; //currentLi
        const formContainerSubmit = this.allForms[currentIndex]?.isFormValid;
        this.allForms[currentIndex]?.validateForm();
        const nextListItem = this.wizardListItems[++currentIndex]; //nextLi

        if (animating || formContainerSubmit === false) {
            return false; //on change disable wizard btn
        }
        animating = true;
        nextFieldsetCont.show(); //show the next fieldset

        //hide the current fieldset with style
        currentFieldsetCont.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of currentFs reduces to 0 - stored in "now"
                //1. bring nextFs from the right(50%)
                wLeft = (now * 50) + "%";
                //2. increase opacity of nextFs to 1 as it moves in
                wOpacity = 1 - now;

                currentFieldsetCont.css({
                    'position': 'absolute'
                });
                nextFieldsetCont.css({
                    'left': wLeft,
                    'opacity': wOpacity
                });
            },
            duration: 800,
            complete: function () {
                currentFieldsetCont.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });

        // DATA LAYER PUSH
        if(this.isWizardEventTrackingEnabled) {
            let wizardSubmitData = FormContainer.getDataLayer('form_submit', 'form', 'submit', FormContainer.getCurrentFormLabel($(evt.target), this.wizardFormName));
            window.dataLayer.push(wizardSubmitData);
        }

        this.wizardClickEvent('next', currentListItem, nextListItem, currentIndex);
    }

    /**
     * @function
     * @desc back button click of Wizard
     * @param {Object} event
     */

    private backButtonClick(evt: JQueryEventObject, animating, wLeft, wOpacity) {
        const currentFieldsetCont = $(evt.currentTarget)?.closest('fieldset'); //current fs
        const prevFieldsetCont = currentFieldsetCont.prev(); //nextFs
        let currentIndex = currentFieldsetCont?.data('wizarditem');
        const currentListItem = this.wizardListItems[currentIndex]; //currentLi
        const prevListItem = this.wizardListItems[--currentIndex]; //nextLi

        if (animating) {
            return false;
        }//on change disable wizard btn
        animating = true;
        prevFieldsetCont.show(); //show the next fieldset

        //hide the current fieldset with style
        currentFieldsetCont.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. take current_fs to the right(50%) - from 0%
                wLeft = ((1 - now) * 50) + "%";
                //2. increase opacity of previous_fs to 1 as it moves in
                wOpacity = 1 - now;

                currentFieldsetCont.css({
                    'left': wLeft
                });
                prevFieldsetCont.css({
                    'opacity': wOpacity
                });
            },
            duration: 800,
            complete: function () {
                currentFieldsetCont.hide();
                prevFieldsetCont.css({
                    'position': 'relative'
                });
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });

        this.wizardClickEvent('previous', currentListItem, prevListItem, '');
    }

    /**
     * @function
     * @desc Attach eventhandlers with the respective event on click or change etc
     * @param {Object} event
     */

    private wizardEvents() {
        let animating, wLeft, wOpacity;
        this.nextBtn?.forEach(function (ele: HTMLInputElement) {
            ele.addEventListener('click', function (evt: JQueryEventObject) {
                this.nextButtonClick(evt, animating, wLeft, wOpacity);
            }.bind(this));
        }.bind(this));

        this.backBtn?.forEach(function (ele: HTMLInputElement) {
            ele.addEventListener('click', function (evt: JQueryEventObject) {
                this.backButtonClick(evt, animating, wLeft, wOpacity);
            }.bind(this));
        }.bind(this));

        this.wizardSubmit?.addEventListener('click', this.wizardSubmitClick.bind(this));

    }


    /**
     * @function
     * @desc Add/remove class on the click of back/next buttons
     * @param {Object} event
     */

    private wizardClickEvent(btnClick, currentListItem, listItem, currentIndex) {
        if (btnClick === 'next') {
            currentListItem.classList.remove(Wizard.validationClasses.incomplete, Wizard.validationClasses.active);
            currentListItem.classList.add(Wizard.validationClasses.complete, Wizard.validationClasses.inactive);
            listItem.classList.remove(Wizard.validationClasses.inactive);
            listItem.classList.add(Wizard.validationClasses.active);
            if (this.wizardListItems.length - 1 == currentIndex) {
                listItem.classList.remove(Wizard.validationClasses.incomplete);
                listItem.classList.add(Wizard.validationClasses.complete);
            }
        } else if (btnClick === 'previous') {
            currentListItem.classList.remove(Wizard.validationClasses.complete);
            currentListItem.classList.add(Wizard.validationClasses.incomplete);
            listItem.classList.remove(Wizard.validationClasses.inactive);
            listItem.classList.add(Wizard.validationClasses.active);

            listItem.classList.add(Wizard.validationClasses.incomplete, Wizard.validationClasses.inactive);
            $(listItem).nextAll().removeClass('a-wizard__step--complete a-wizard-step--active');
        }

    }

    public wizardReset() {
        this.allForms.forEach(element => {
            element?.resetForm();
        });
    }

    public wizardSubmitClick(e: Event) {
        e?.preventDefault;
        const currentFieldsetCont = $(e.currentTarget)?.closest('fieldset');
        let currentIndex = currentFieldsetCont?.data('wizarditem');
        const formContainerSubmit = this.allForms[currentIndex]?.isFormValid;
        if (formContainerSubmit == false) {
            return;
        }
        this.showWizardSpinner();
        this.wizardSubmit.disabled = true;
        this.recaptchToken = '';
        if(this.isRecaptchaEnabled) {
            if(this.isEnterpriseRecaptchaEnabled) {
                grecaptcha.enterprise.ready(function () {
                    grecaptcha.enterprise.execute(this.recaptchaSiteKey, {
                        action: 'submit'
                    })
                    .then(function (token: string) {
                        this.recaptchToken = token;
                        this.wizardAjaxCall();// Call respective api on submit
                    }.bind(this));
                }.bind(this));
            } else {
                grecaptcha.ready(function () {
                    grecaptcha.execute(this.recaptchaSiteKey, {
                        action: 'submit'
                    })
                    .then(function (token: string) {
                        this.recaptchToken = token;
                        this.wizardAjaxCall();// Call respective api on submit
                    }.bind(this));
                }.bind(this));
            }
        } else {
            this.wizardAjaxCall();
        }

        // DATA LAYER PUSH
        if(window[this.wizardId].isFormSubmitted !== true && this.isWizardEventTrackingEnabled) {
            if(this.wizardEventTrackingType == 'gtm') {
                let wizardSubmitData = FormContainer.getDataLayer('form_submit', 'form', 'submit', FormContainer.getCurrentFormLabel($(e.target), this.wizardFormName));
                window.dataLayer.push(wizardSubmitData);
                window[this.wizardId].isFormSubmitted = true;
            } else if (this.wizardEventTrackingType == 'aa' && window.__satelliteLoaded == true) {
                window._satellite.track('formSubmitSuccess',{'formName': this.wizardFormName,'formType': this.wizardFormName});
                window[this.wizardId].isFormSubmitted = true;
            }
        }

        return false;
    }

    /**
     * @function
     * @desc Generate the form body if the form has valid data
     * @param {Object} event
     */

    public getWizardData(): any {

        const finalData = {
            headers: {},
            body: {}
        };

        finalData.body = this.getFormsBodyWizardData(); //all form inputs

        this.headers.forEach(function (ele: HTMLInputElement) {
            const isHeader: boolean = ele.dataset.header ? true : false;
            if (isHeader) {
                finalData.headers[ele.name] = ele.value;
            }
        });
        //const headers = Common.getPageHeaders();

        const reservedFieldNames = ['formMode', 'successMessage', 'failureMessage', 'thankyouPage', 'updateRequest', 'onBeforeCall', 'onSuccess', 'onError', 'onComplete'];

        this.hiddenFields.forEach(function (ele: HTMLInputElement) {
            if(!reservedFieldNames.includes(ele.name)) {
                finalData.body[ele.name] = ele.value;
            }
        });
        return finalData;
    }

    public showWizardSpinner() {
        if(this.wizardSpinner) {
            this.wizardSpinner.classList.add('a-button--spinner');
        }
    }

    public hideWizardSpinner() {
        if(this.wizardSpinner) {
            this.wizardSpinner.classList.remove('a-button--spinner');
        }
    }

    /**
     * @function
     * @desc Call subsequent API on form submit action
     * @param {Object} event
     */

    private wizardAjaxCall() {
        const wizardFinalData: any = this.getWizardData(); //all form inputs

        if (this.isRecaptchaEnabled && this.recaptchToken) {
            wizardFinalData['g-recaptcha-response'] = this.recaptchToken;
        }

        // onBefore callback
        this.onBeforeCall();

        // updateRequest callback execution to make any changes to Request body or headers
        this.updateRequest(wizardFinalData);

        fetch(this.wizardActionUrl, {
            method: this.wizardActionMethod,
            mode: 'cors',
            cache: 'no-cache',
            headers: wizardFinalData.headers,
            body: JSON.stringify(wizardFinalData.body) // body data type must match "Content-Type" header
        })
        .then((resp) => resp.json())
        .then(function (data: any) {

            this.hideWizardSpinner();
            
            // handle API response
            if(data.status === false) {
                // handle error
                let errorRes = data.response.i18nMessageKey, 
                    i18Msg = window.Granite.I18n.get(errorRes);  //  Get the i18message
                
                if(i18Msg != errorRes) { 
                    this.failureElement.innerText = i18Msg;     // show the returned msg 
                } else {
                    this.failureElement.innerText = this.authoredFailureMsg;    // show the failure msg if there  is no i18msg msg
                }
                this.wizardSubmit.disabled = false;

                // onError callback
                this.onError(data);

            } else if(data.errorCode === 0 || data.errorCode === 1003) {
                // handle success
                if(this.thankyouPage && this.thankyouPage.value) {
                    this.onSuccess(data);
                    window.location.replace(this.thankyouPage.value);
                } else {
                    this.successElement.innerText = this.authoredSuccessMsg;
                    this.onSuccess(data);
                }
                
                // reset the form
                this.wizardReset();

            } else {
                // handle error
                let errorRes = data.response.i18nMessageKey, 
                    i18Msg = window.Granite.I18n.get(errorRes);  //  Get the i18message
                
                if(i18Msg != errorRes) { 
                    this.failureElement.innerText = i18Msg;     // show the returned msg 
                } else {
                    this.failureElement.innerText = this.authoredFailureMsg;    // show the failure msg if there  is no i18msg msg
                }
                this.wizardSubmit.disabled = false;

                // onError callback
                this.onError(data);
            }
            
            setTimeout(function() {
                this.successElement.innerText = '';
            }.bind(this),(5000));

        }.bind(this))
        .catch(function (this: Wizard, error: any) {
            
            this.hideWizardSpinner();
            this.failureElement.innerText = this.authoredFailureMsg;
            setTimeout(function() {
                this.failureElement.innerText = '';
            }.bind(this),(5000));

            this.wizardSubmit.disabled = false;

            // onError callback
            this.onError(error);

        }.bind(this))
        .then(function() {

            // onComplete callback
            this.onComplete();

        }.bind(this));
    }

}

$(document).ready(function () {
    var wizard = document.querySelectorAll('[data-js-component="wizard"]');
    wizard.forEach(function (ele) {
        new Wizard(ele as HTMLElement);
    });
});

//to fix safari cache issue on browser back

window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};