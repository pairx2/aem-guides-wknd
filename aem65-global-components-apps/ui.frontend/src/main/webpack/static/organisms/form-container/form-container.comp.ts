import 'jquery.easing';
/**
 * Form  Container
 */

import { FormMessage } from './form-container.utils/form-message.utils';
import { FormUtils } from './form-container.utils/form-container.utils';
import { HiddenFields } from './form-container.utils/hidden-fields.utils';
import { FormInputPasswordField } from '../../common/form-input-password-field';

declare var window: any;
declare var grecaptcha: any;
declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}

export class FormContainer {
    private static readonly validationRegex: {
        [key: string]: RegExp;
    } = {
        email: /^([\w]+[\w\.-]*@([\w-]{2,}\.)+[a-zA-Z]{2,})$/,
        // eslint-disable-next-line max-len
        text: /^[\p{L} ,.'-]+$/u,
        tel: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        date: /^([\d]{2}|[\d]{4})\-([\d]{2})\-([\d]{4}|[\d]{2})$/
    }

    private static readonly validationClasses: {
        [key: string]: string;
    } = {
        required: 'validation-require',
        error: 'validation-error',
        regex: 'validation-regex'
    }

    private static readonly passwordClasses: {
        [key: string]: string;
    } = {
        weak: 'password-weak',
        ok: 'password-ok',
        medium: 'password-medium',
        strong: 'password-strong'
    }

    private container: HTMLElement;
    private formId: string;
    private callbackList: any = {};
    private form: HTMLFormElement;
    private inputFields: NodeListOf < HTMLInputElement > ;
    private dateFields: NodeListOf < HTMLInputElement >;
    private headers: NodeListOf < HTMLInputElement > ;
    private hiddenFields: NodeListOf < HTMLInputElement > ;
    private actionUrl: string;
	private actionMethod: string;
    private isRecaptchaEnabled: any = false;
    private isEnterpriseRecaptchaEnabled: any = false;
    private recaptchaSiteKey: string;
    private recaptchaScriptSrc: string;
    private recaptchToken: string;

	private isEventTrackingEnabled: boolean = false;
    private eventTrackingType: string;
	private formName: string;

    private isWizardEventTrackingEnabled: boolean;
    private wizardEventTrackingType: string;
    private wizardFormName: string;
	
    private btnSubmit: HTMLButtonElement; 
    private btnReset: HTMLButtonElement;

    private authoredSuccessMsg: string;
    private authoredFailureMsg: string;
    private wizardValidate: HTMLFieldSetElement;
    private wizardNextBtn: HTMLButtonElement;
    private wizardSubmit: HTMLButtonElement
    private isFormValid: any;
    private isDateValid: boolean;

    private btnSpinner: HTMLElement;
    private thankyouPage: HTMLElement;
    private formMessage: FormMessage;
    private utils: FormUtils;
    private primaryPasswordValue: string;
    private passwordMatchStatus: boolean = false;
    private confirmPasswordValue: string;
    private passwordStrength: any;

    private updateRequestFn: string;
    private onBeforeCallFn: string;
    private onSuccessFn: string;
    private onErrorFn: string;
    private onCompleteFn: string;

    /**
     *
     * @param formContainer
     * @this FormContainer
     */
    constructor(formContainer: HTMLElement) {
        this.utils = new FormUtils();
        this.container = formContainer;
        this.formId = formContainer.getAttribute('id');

        this.cacheElements();
        this.createRecaptha();
        this.attachEvents();
        this.setDateRange();
        FormContainer.setFormContainerCallbacks(this.formId, this.updateRequestFn, this.onBeforeCallFn, this.onSuccessFn, this.onErrorFn, this.onCompleteFn);
        this.setCallbackBucket(this.formId);
        this.formMessage = new FormMessage(this.container);
        new HiddenFields(this.hiddenFields); // initialize hidden fields
    }

    /**
     * @function
     * @desc Adds FormContainerCallbacks container to public namespace
     */
    static setFormContainerCallbacks(formId, updateRequestFn, onBeforeCallFn, onSuccessFn, onErrorFn, onCompleteFn) {
        window.formContainerCallbacks = window.formContainerCallbacks || {};

        const id = formId;

        if (!formId) {
            return;
        }

        if (!window.formContainerCallbacks[id]) {
            window.formContainerCallbacks[id] = {};
        }

        const callbackList = window.formContainerCallbacks[id];

        if (updateRequestFn) { callbackList.updateRequest = updateRequestFn; }
        if (onBeforeCallFn) { callbackList.onBeforeCall = onBeforeCallFn; }
        if (onSuccessFn) { callbackList.onSuccess = onSuccessFn; }
        if (onErrorFn) { callbackList.onError = onErrorFn; }
        if (onCompleteFn) { callbackList.onComplete = onCompleteFn; }
    }

    /**
     * @function
     * @desc fetches callbacks for the current form instance from the callback-bucket
     * @param {String} formId form ID
     */
    public setCallbackBucket(formId: string) {

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
     * @desc formData
     * @param {any} formData form data object containing headers and body
     */
    private updateRequest(formData: any) {
        /**
         * @function updateRequest
         * @desc inner function
         * @return {Object} object with optional headers and body keys
         */
        const updateRequestFn: Function = window[this.callbackList.updateRequest];
        if(!this.isFunction(updateRequestFn)) {
            return;
        }

        const newFormData = updateRequestFn(formData);

        // if returned value is not as expected, do nothing
        if(!newFormData || !(newFormData instanceof Object)) {
            return;
        }

        // update request headers
        if(newFormData.headers && newFormData.headers instanceof Object) {
            for (const header in newFormData.headers) {

                // Do NOT modify keys which are already there in original request headers
                if(!formData.headers[header]) {
                    formData.headers[header] = newFormData.headers[header];
                }
            }
        }

        // update request body params
        if(newFormData.body && newFormData.body instanceof Object) {
            for (const param in newFormData.body) {

                // If object type, extend
                if(newFormData.body[param] instanceof Object) {
                    if(formData.body[param]) {
                        Object.assign(formData.body[param], newFormData.body[param]);
                    } else {
                        formData.body[param] = newFormData.body[param];
                    }
                } else if(!formData.body[param]) {

                    // Do NOT modify keys which are already there in original request body
                    formData.body[param] = newFormData.body[param];
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
        if (this.isFunction(onBeforeCallFn)) {
            onBeforeCallFn();
        }
    }

    private async onSuccess(response: any) {
        /**
         * @function onSuccess
         * @desc inner function - handles response object
         * @param {Object} respObj Reponse JSON to be handled/proccessed further
         */
		if(this.isEventTrackingEnabled){
			let formSuccessData = FormContainer.getDataLayer("form_complete", "form", "complete", this.formName);
	    	window.dataLayer.push(formSuccessData);			
		}
        const onSuccessFn: Function = window[this.callbackList.onSuccess];
        if(!this.isFunction(onSuccessFn)) {
            return;
        }

        await onSuccessFn(response);
		
    }

    private onError(error: any) {
        /**
         * @function onError
         * @desc inner function - handles response error
         * @param {Error} error
         */
		let statusReason: any = 'Something went wrong';
		if (!(typeof error === undefined || typeof error === null)) {
			if (error?.response && error?.response?.statusReason) {
			    statusReason = error.response.statusReason;
			}
		}		
		let eventLabel = this.formName + "|" + statusReason;
     	if(this.isEventTrackingEnabled){
			let formErrorData = FormContainer.getDataLayer("form_error", "form", "error", eventLabel);
	    	window.dataLayer.push(formErrorData);			
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
    * @desc Setting Min and Max allowed Date to HTML5 Date picket

    */
    public setDateRange() {
      let minYear = '1920-01-01',
          maxYear = '2120-12-31';
      this.container.querySelectorAll('input[type="date"]').forEach(function (ele) {
        ele.setAttribute('min', minYear);
        ele.setAttribute('max', maxYear);
        ele.closest('.a-input-grp').classList.add('a-input-date-group');
      });
    }

     /**
    * @function
    * @desc Reading and then validating Date value using different scenarios and then passing down for further checks.
    * @param {object} event field value
    */
    public checkDate(ele: HTMLInputElement) {
        let value: string = ele.value,
          isBadDate: boolean = ele.validity.badInput === true,
          isValidDate: boolean = ele.validity.valid === true,
          isDateBlank: boolean = value === "";
        let invalidDate: boolean = isBadDate && !isValidDate && isDateBlank,
          blankDate: boolean = !isBadDate && isValidDate && isDateBlank,
          outOfRangeDate: boolean = !isBadDate && !isValidDate && !isDateBlank,
          validDate: boolean = !isBadDate && isValidDate && !isDateBlank;
        if (invalidDate || outOfRangeDate) {
          value = "not valid";
        } else if (blankDate || validDate) {
          value = ele.value;
        }
        return value;
    }

    public createRecaptha() {
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
        * @desc Fetch the hidden elements and headers from  the form
        * @param {Object} event
        */

    public cacheElements() {

        const container = this.container;
        const form = container.querySelector('form');
        const contData = container.dataset;
        // eslint-disable-next-line max-len
        const selector = 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([readonly]):not([name="filepond"])';
        const notDate = ':not([class="hidden-start-date"]):not([class="hidden-end-date"]):not([class*="a-date-picker__input-start"]):not([class*="a-date-picker__input-end"]):not([class*="a-date-picker__single-date"])';
        this.inputFields = form.querySelectorAll(selector + notDate +', textarea, [data-js-component="form-dropdown"]');
        const dateSelector = 'input[class="hidden-start-date"],input[class="hidden-end-date"],input[class*="a-date-picker__input-start"],input[class*="a-date-picker__input-end"],input[class*="a-date-picker__single-date"]';
        this.dateFields = form.querySelectorAll(dateSelector);
        this.hiddenFields = container.querySelectorAll('input[type="hidden"]');
        this.headers = document.querySelectorAll('input[data-header="true"]');
        this.btnSubmit = container.querySelector('button[type="submit"]');
        this.btnReset = container.querySelector('button[type="reset"]');		
        this.authoredSuccessMsg = container.querySelector('[name="successMessage"]').getAttribute('value');
        this.authoredFailureMsg = container.querySelector('[name="failureMessage"]').getAttribute('value');
        this.wizardValidate = container.closest('fieldset');
        this.wizardNextBtn = this.wizardValidate?.querySelector('.o-wizard__btn .button-div:not(.o-wizard__btn--back) button:not([type="submit"])');
        this.wizardSubmit = this.wizardValidate?.querySelector('.o-wizard__btn .button-div:not(.o-wizard__btn--back) button[type="submit"]');
        this.actionUrl = form.action;
		this.actionMethod = form.getAttribute('data-ajax-method');
        this.isRecaptchaEnabled = (contData.recaptcha === 'true');
        this.isEnterpriseRecaptchaEnabled = document.getElementsByName("enterpriseRecaptcha").length ? document.getElementsByName("enterpriseRecaptcha")[0].value : false;
		this.isEventTrackingEnabled = (contData.eventTracking === 'true');
        this.eventTrackingType = contData.eventTrackingType;
        this.isWizardEventTrackingEnabled = (container.closest('.o-wizard')?.getAttribute('data-event-tracking') === "true");
        this.wizardEventTrackingType = container.closest('.o-wizard')?.getAttribute('data-event-tracking-type');
        this.wizardFormName = container.closest('.o-wizard')?.getAttribute('data-form-name');
        this.formName = contData.formName;	
        this.recaptchaScriptSrc = contData.captchaScriptSrc;
        this.recaptchaSiteKey = contData.siteKey;
        this.thankyouPage = container.querySelector('[name="thankyouPage"]');
        if(this.btnSubmit) {
            this.btnSpinner = this.btnSubmit.closest('.a-button');
        }
        this.form = form;

        this.updateRequestFn = container.querySelector('input[name="updateRequest"]')?.getAttribute('value');
        this.onBeforeCallFn = container.querySelector('input[name="onBeforeCall"]')?.getAttribute('value');
        this.onSuccessFn = container.querySelector('input[name="onSuccess"]')?.getAttribute('value');
        this.onErrorFn = container.querySelector('input[name="onError"]')?.getAttribute('value');
        this.onCompleteFn = container.querySelector('input[name="onComplete"]')?.getAttribute('value');
    }

    /**
     * @function
     * @desc Attach eventhandlers with the respective event on click or change etc
     * @param {Object} event
     */

    private attachEvents() {
		
        this.btnReset && this.btnReset.addEventListener('click', this.onResetClick.bind(this));
        this.btnSubmit && this.btnSubmit.addEventListener('click', function(evt: MouseEvent) {
            evt.stopImmediatePropagation();
            this.onSubmitClick(evt);
        }.bind(this));

        this.btnSubmit && this.form && this.form.addEventListener('submit', function(evt: Event) {
            evt.stopImmediatePropagation();
            this.onSubmitClick(evt);
        }.bind(this));

        this.isFormValid = true;

        /** If date picker is present, then listen for change in datepicker value 
        * when input looses focus
        */
         this.isDateValid = true;
         if(this.dateFields?.length > 0){
             this.dateFields?.forEach(function(ele: HTMLInputElement){
                 ele.addEventListener('focusout', this.onValueChange.bind(this));
                 this.checkRequired(ele);
             }.bind(this));
         }

        this.inputFields.forEach(function(ele: HTMLInputElement) {
            ele.addEventListener('change', this.onValueChange.bind(this));
            ele.addEventListener('keyup', this.onValueChange.bind(this));
            ele.addEventListener(ele?.classList.contains('a-dropdown') ? 'focusout' : 'blur', function(evt: FocusEvent) {
                this.validateInputField(evt.currentTarget as HTMLInputElement);
            }.bind(this));
            this.checkRequired(ele);
        }.bind(this));
        

   }

    /**
     * @function
     * @desc handles input value change and updates the form error & submit button status
     * @param evt {Event} Input Event Object
     */
    private onValueChange(evt: Event) {
        let inputElement = evt?.currentTarget as HTMLInputElement;

		if(window[this.formId].isFormInitiated !== true && this.isEventTrackingEnabled) {
            if(this.eventTrackingType == 'gtm') {
                // GTM
                let formInitiateData = FormContainer.getDataLayer("form_initiate","form","initiate",this.formName);
                window.dataLayer.push(formInitiateData);
                window[this.formId].isFormInitiated = true;
            } else if(this.eventTrackingType == 'aa' && window.__satelliteLoaded == true) {
                // AA
                window._satellite.track('formStart',{'formName': this.formName,'formType': this.formName});
                window[this.formId].isFormInitiated = true;
            }
		}

        if(this.isWizardEventTrackingEnabled) {
            // GTM
            let parentFieldSet = $(evt.target).parents('.o-wizard__content');
            if (!parentFieldSet.hasClass('o-wizard-form--init') && this.wizardEventTrackingType == 'gtm') {
                let wizardInitiateData = FormContainer.getDataLayer('form_initiate', 'form', 'initiate', FormContainer.getCurrentFormLabel($(evt.target), this.wizardFormName));
                parentFieldSet.addClass('o-wizard-form--init');
                window.dataLayer.push(wizardInitiateData);
            }

            // AA
            let wizContainer = $(evt.target).parents('.o-wizard');
            if(!wizContainer.hasClass('o-wizard-form--init') && this.wizardEventTrackingType == 'aa' && window.__satelliteLoaded == true) {
                window._satellite.track('formStart',{'formName': this.wizardFormName,'formType': this.wizardFormName});
                wizContainer.addClass('o-wizard-form--init');
            }
        }

        this.isFormValid = true;
        this.isDateValid = true;
        // Event attached on keyup tab focus is aslo considered as keyup
        // to skip validation on tab focus added condition to check
        // For tab out event we already have blur event
        if (!(evt['which'] === 9 || evt['keyCode'] === 9)) {
            this.validateInputField(inputElement);
        }

        this.inputFields.forEach(function(inp: HTMLInputElement) {
            if (!this.checkError(inp)) {
                this.isFormValid = false;
            }
        }.bind(this));

        if(this.dateFields?.length > 0){
            this.dateFields?.forEach(function(inp: HTMLInputElement) {
                if(!this.checkError(inp)) {
                    this.isDateValid = false;
                }
            }.bind(this));
        }

        if(this.btnSubmit) {
            this.btnSubmit.disabled = !(this.isFormValid && this.isDateValid);
        }

        if(this.wizardNextBtn) {
            this.wizardNextBtn.disabled = !(this.isFormValid && this.isDateValid);
        }
        if(this.wizardSubmit) {
            this.wizardSubmit.disabled = !(this.isFormValid && this.isDateValid);
        }
    }


    /**
     * @function
     * @desc Check if the current input field (text, textarea, checkboxes etc) is having valid data or not
     * @param {Object} event
     */
    private checkRequired(ele: HTMLInputElement) {
        if(ele.dataset.required === 'true' || ele.closest('.a-input-field')?.getAttribute('data-required') === 'true'
           || ele.closest('.a-dropdown')?.getAttribute('data-required') === 'true') {
               if(this.dateFields?.length > 0) {
                   this.isFormValid = false;
                   this.isDateValid = false;
               } else {
                   this.isFormValid = false;
               }
           
        }

        if (this.dateFields?.length > 0){
            if(this.btnSubmit) {
                this.btnSubmit.disabled = !(this.isFormValid && this.isDateValid);
              }
              if(this.wizardNextBtn) {
                  this.wizardNextBtn.disabled = !(this.isFormValid && this.isDateValid);
              }
              if(this.wizardSubmit) {
                  this.wizardSubmit.disabled = !(this.isFormValid && this.isDateValid);
              }

        } else {
            if(this.btnSubmit) {
              this.btnSubmit.disabled = !this.isFormValid;
            }
            if(this.wizardNextBtn) {
                this.wizardNextBtn.disabled = !this.isFormValid;
            }
            if(this.wizardSubmit) {
                this.wizardSubmit.disabled = !this.isFormValid;
            }
        }

    }

    /**
     * @function
     * @desc convert string to regex Obj
     * @param {String} regexPattern
     */
    public getRegExpObjFromString(regexPattern) {
        if(!regexPattern) {
            return;
        }

        let flags: any = /(?!^)[^\/]+$/gi.exec(regexPattern);

        if (flags && flags.length) {
            flags = flags[0];
        } else {
            flags = '';
        }

        regexPattern = /[^\/].+(?=\/)/.exec(regexPattern)[0];

        return new RegExp(regexPattern, flags);
    }
     /**
     * @function
     * @desc Check if the current input field (radio) is selected or not
     * @param {Object} event
     */

    public validateRadioInput(ele: HTMLInputElement) {
        const radioElems = document.querySelectorAll(`[name="${ele.name}"]`);
        var isSelected = false;
        let hasError: any = false;
        radioElems.forEach((item: HTMLInputElement) => {
            if (item.checked) {
                isSelected = true;
            }
        });
        if (!isSelected) {
           return hasError = true;
        }
    }
    /**
     * @function
     * @desc Check if the current input field (text, textarea, checkboxes etc) is having valid data or not
     * @param {Object} event
     */
    public validateInputField(ele: HTMLInputElement) {
        let isRequired = false;
        if(ele.dataset.required === 'true' || ele.closest('.a-input-field')?.getAttribute('data-required') === 'true'
            || ele.closest('.a-dropdown')?.getAttribute('data-required') === 'true') {
            isRequired = true;
        }
        let value: string;
        //  To manage the value in case the element is a custom dropdown component
        if (ele.classList.contains('multi-drop') || ele.getAttribute('data-select')=='multi') {
            value = (ele.querySelectorAll('.cmp-form-multi-option.selected').length>0 || ((ele.querySelector('select')?.value)?.length > 0) || (ele.value?.length > 0))? "true": '';
        }
        else if(ele.classList.contains('a-dropdown')) {
            value = (ele.querySelector('.a-dropdown-selected')) ?
              ele.querySelector('.a-dropdown-selected').textContent : '';
        } else if (ele.type == 'date') {
            value = this.checkDate(ele);
        } else {
            value = ele.value;
        }

        //getting custom regex
        let customRegexpVal = ele.getAttribute('data-regex');
        customRegexpVal = customRegexpVal ? customRegexpVal.trim() : '';
        let customRegexp = this.getRegExpObjFromString(customRegexpVal);

        const classes: DOMTokenList = ele.closest('.form-group, .checkbox, .radio, .a-dropdown').classList;
        const type: string = ele.type;
        let isValid: boolean = false;

        //check if input is password field
        const inputFieldPassword : HTMLElement = ele.closest('.a-input-field[data-component-type="input-field-password"]');
        const isInputFieldPassword : boolean = inputFieldPassword ? true : false;
        const isPasswordStrengthRequired: boolean = (inputFieldPassword?.getAttribute('data-password-policy') === 'true') ? true : false;
        const isConfirmPassword: boolean = (inputFieldPassword?.getAttribute('data-confirm-password') === 'true') ? true : false;

        const isInputDatePicker : boolean = ele.closest('.a-date-picker[data-js-component="date-picker"]') ? true : false; //check if input is date-picker field

        let regexp: RegExp;
        if (!isPasswordStrengthRequired && !isInputFieldPassword && !isInputDatePicker) {
            regexp = customRegexp || FormContainer.validationRegex[type];
        } else if (isInputFieldPassword) {
            regexp = customRegexp || FormContainer.validationRegex['password'];
        }

        if (regexp) {
            // check for standard regex
            isValid = (!isRequired && value.trim() === '') ? true : regexp.test(value);
        } else {
            isValid = true;
        }

        //check password strength for password field
        const progressClasses: DOMTokenList = inputFieldPassword?.querySelector('.a-input-password-strength')?.classList;
        const passwordStrengthType: string = inputFieldPassword?.querySelector('.a-input-password-strength')?.getAttribute('data-password-type');

        let inputPasswordMinLength: number;
        let inputPasswordFieldTooltip: any;
        let inputPasswordFieldTooltipTitle: string;


        if(isInputFieldPassword && isPasswordStrengthRequired) {
            const passMinLen = inputFieldPassword?.querySelector('.a-input-password-strength')?.getAttribute('data-password-minlength');
            const passSplCharRegex = inputFieldPassword?.querySelector('.a-input-password-strength')?.getAttribute('data-password-splchar-regex');
            inputPasswordMinLength = passMinLen ? parseInt(passMinLen) : 8;

            //password strength tooltip
            inputPasswordFieldTooltip = $(inputFieldPassword).find('.tooltip-pwd .a-tooltilp__wrapper');
            inputPasswordFieldTooltipTitle = inputPasswordFieldTooltip?.attr('data-original-title');

            this.passwordStrength = value !== '' ? FormInputPasswordField.checkPasswordStrength(value.trim(), inputPasswordMinLength, passSplCharRegex) : null;
        }


        if(isInputFieldPassword && !isConfirmPassword) {
            this.primaryPasswordValue = ele.value;
        }
        else if(isInputFieldPassword && isConfirmPassword) {
            this.confirmPasswordValue = ele.value;
        }

        //confirm password field validation
        if (this.primaryPasswordValue && this.primaryPasswordValue !== "" && this.confirmPasswordValue && this.confirmPasswordValue !== "") {
          this.passwordMatchStatus = FormInputPasswordField.checkPasswordMatch(this.primaryPasswordValue,this.confirmPasswordValue);
        }

        let hasError: any = false;
        if (type === 'checkbox' && isRequired && !ele.checked) {
            classes.add(FormContainer.validationClasses.required);
            ele.nextElementSibling.setAttribute("aria-checked", "false");
            hasError = true;
		}else if(type === 'checkbox' && ele.checked){
            ele.nextElementSibling.setAttribute("aria-checked", "true");
            classes.remove(FormContainer.validationClasses.required);        
        }else if ((type === 'radio' && isRequired)) {
            hasError = this.validateRadioInput(ele);
            if (hasError) {
                classes.add(FormContainer.validationClasses.required);
            }
            else {
                classes.remove(FormContainer.validationClasses.required);
            }
        } else if (isPasswordStrengthRequired && isRequired && this.passwordStrength !== null && value.trim() !== '') {

            if(inputPasswordFieldTooltipTitle && inputPasswordFieldTooltipTitle !== "") {
                //update tooltip content based on password strength
                let updatedTooltip = FormInputPasswordField.setPasswordStrengthTooltip(this.passwordStrength, inputPasswordFieldTooltipTitle);
                inputPasswordFieldTooltip?.attr('data-original-title', updatedTooltip);
            }

            switch (this.passwordStrength.pwdStrength) {
                case FormContainer.passwordClasses.weak:
                    progressClasses.remove(FormInputPasswordField.passwordClasses.ok);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.medium);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.strong);
                    progressClasses.add(FormInputPasswordField.passwordClasses.weak);
                    hasError = true;
                    break;
                case FormContainer.passwordClasses.ok :
                    progressClasses.remove(FormInputPasswordField.passwordClasses.weak);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.medium);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.strong);
                    progressClasses.add(FormInputPasswordField.passwordClasses.ok);
                    hasError = true;
                    break;
                case FormContainer.passwordClasses.medium :
                    progressClasses.remove(FormInputPasswordField.passwordClasses.weak);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.ok);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.strong);
                    progressClasses.add(FormInputPasswordField.passwordClasses.medium);
                    hasError = (passwordStrengthType === 'moderate' && isValid) ? false : true;
                    break;
                case FormContainer.passwordClasses.strong :
                    progressClasses.remove(FormInputPasswordField.passwordClasses.weak);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.ok);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.medium);
                    progressClasses.add(FormInputPasswordField.passwordClasses.strong);
                    hasError = isValid ? false : true;
                    break;
                default:
                    progressClasses.remove(FormInputPasswordField.passwordClasses.weak);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.ok);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.medium);
                    progressClasses.remove(FormInputPasswordField.passwordClasses.strong);
                    hasError = isValid ? false : true;
                    break;
            }

            if (customRegexp && !isValid) {
                //show message for custom regex
                classes.remove(FormContainer.validationClasses.required,
                    FormContainer.validationClasses.error);
                classes.add(FormContainer.validationClasses.regex);
            } else {
                classes.remove(FormContainer.validationClasses.required,
                    FormContainer.validationClasses.error,
                    FormContainer.validationClasses.regex);
            }

        } else if(isConfirmPassword && value.trim() !== '' && !this.passwordMatchStatus){
            classes.remove(FormContainer.validationClasses.required);
            classes.remove(FormContainer.validationClasses.regex);
            classes.add(FormContainer.validationClasses.error);
            hasError = true;
        } else {

            if ((isRequired && value.trim().length < 1)) {
                //show message for empty field
                classes.remove(FormContainer.validationClasses.error);
                classes.remove(FormContainer.validationClasses.regex);
                classes.add(FormContainer.validationClasses.required);
                hasError = true;
            } else if (customRegexp && !isValid) {
                //show message for custom regex
                classes.remove(FormContainer.validationClasses.required);
                classes.remove(FormContainer.validationClasses.error);
                classes.add(FormContainer.validationClasses.regex);
                hasError = true;
            } else if (!customRegexp && !isValid) {
                //show message for standard regex
                classes.remove(FormContainer.validationClasses.required);
                classes.remove(FormContainer.validationClasses.regex);
                classes.add(FormContainer.validationClasses.error);
                hasError = true;
            }

            if (!hasError) {
                classes.remove(FormContainer.validationClasses.required);
                classes.remove(FormContainer.validationClasses.error);
                classes.remove(FormContainer.validationClasses.regex);
            } else {
                progressClasses?.remove(FormContainer.passwordClasses.weak,
                    FormContainer.passwordClasses.ok,
                    FormContainer.passwordClasses.medium,
                    FormContainer.passwordClasses.strong);
            }
        }
        return !hasError;
    }


    /**
     * @function
     * @desc Check if there is any error in the form for enabling/disabling the submit button
     * @param {Object} event
     */
    public checkError(ele: HTMLInputElement) {
        let isRequired = false;
        if(ele.dataset.required === 'true' || ele.closest('.a-input-field')?.getAttribute('data-required') === 'true'
           || ele.closest('.a-dropdown')?.getAttribute('data-required') === 'true') {
            isRequired = true;
        }
        let value: any;
        //  To manage the value in case the element is a custom dropdown component
        if (ele.classList.contains('multi-drop') || ele.getAttribute('data-select')=='multi') {
            value = (ele.querySelectorAll('.cmp-form-multi-option.selected').length>0 || ((ele.querySelector('select')?.value)?.length > 0) || (ele.value?.length > 0))? "true": '';
        }
        else if(ele.classList.contains('a-dropdown')) {
            value = (ele.querySelector('.a-dropdown-selected')) ?
              ele.querySelector('.a-dropdown-selected').textContent : '';
        } else if (ele.type == 'date') {
            value = this.checkDate(ele);
        } else {
            value = ele.value;
        }

        //getting custom regex
        let customRegexpVal = ele.getAttribute('data-regex');
        customRegexpVal = customRegexpVal ? customRegexpVal.trim() : '';
        let customRegexp = this.getRegExpObjFromString(customRegexpVal);

        const type: string = ele.type;
        let isValid: boolean = false;

        //check if input is password field
        const inputFieldPassword : HTMLElement = ele.closest('.a-input-field[data-component-type="input-field-password"]');
        const isInputFieldPassword : boolean = inputFieldPassword ? true : false;
        const isPasswordStrengthRequired: boolean = (inputFieldPassword?.getAttribute('data-password-policy') === 'true') ? true : false;
        const isConfirmPassword: boolean = (inputFieldPassword?.getAttribute('data-confirm-password') === 'true') ? true : false;
        const passwordStrengthType: string = inputFieldPassword?.querySelector('.a-input-password-strength')?.getAttribute('data-password-type');

        const isInputDatePicker : boolean = ele.closest('.a-date-picker[data-js-component="date-picker"]') ? true : false; //check if input is date-picker field

        let regexp: RegExp;
        if (!isPasswordStrengthRequired && !isInputFieldPassword && !isInputDatePicker) {
            regexp = customRegexp || FormContainer.validationRegex[type];
        } else if (isInputFieldPassword) {
            regexp = customRegexp || FormContainer.validationRegex['password'];
        }

        if (regexp) {
            isValid = (!isRequired && value.trim() == '') ? true : regexp.test(value);
        } else {
            isValid = true;
        }

        let hasError: any = false;

        if (type === 'checkbox' && isRequired && !ele.checked) {
            hasError = true;
        } else if ((type === 'radio' && isRequired)) {
            const radioElems = document.querySelectorAll(`[name="${ele.name}"]`);
            var isSelected = false;
            radioElems.forEach((item: HTMLInputElement) => {
                if (item.checked) {
                    isSelected = true;
                }
            });
            if (!isSelected) {
                hasError = true;
            }
        } else if(isInputFieldPassword && isPasswordStrengthRequired && isRequired && value.trim() !== '') {
            //check errors in password field with strength indicator
            switch (this.passwordStrength.pwdStrength) {
                case FormContainer.passwordClasses.weak:
                case FormContainer.passwordClasses.ok:
                    hasError = true;
                    break;
                case FormContainer.passwordClasses.medium:
                    hasError = (passwordStrengthType === 'moderate' && isValid) ? false : true;
                    break;
                case FormContainer.passwordClasses.strong:
                    hasError = isValid ? false : true;
                    break;
            }

            // check error if confirmPassword field
            if(this.primaryPasswordValue && this.confirmPasswordValue && !this.passwordMatchStatus) {
                hasError = true;
            }

        } else if(isInputFieldPassword && isConfirmPassword && !this.passwordMatchStatus) {
            hasError = true;
        } else if((isRequired && value.trim().length < 1) || (!isValid)) {
            hasError = true;
        } else if (isInputDatePicker && ele.closest('.form-group.a-form-grp.validation-error-msg')){
			hasError = true;
        }
        return !hasError;
    }

	 /**
     * @function
     * @desc Push form data to datalayer
     * @param {Object} event
     */
	  static getDataLayer(evt_value: any, evt_category: any, evt_action: any, evt_label: any){	
			let obj = {
				event: evt_value,
				event_category: evt_category,
				event_action: evt_action,
				event_label: evt_label
			}
			return obj;
	  }

    /**
     * @function
     * @desc Create a formatted form label to push into data layer for multistep / wizard
     * @param {Object} event
     */
      static getCurrentFormLabel(ele, formName) {
        const form_step = Number(ele.parents('.o-wizard__content').attr('data-wizarditem')) + 1;
        const step_name = ele.parents('.o-wizard__container').find('.a-wizard-step--active').find('.a-wizard__label').text().trim(); 
        const total_step = ele.parents('.o-wizard__container').find('.o-wizard__content').length;
        return form_step + "/" + total_step + "-" + step_name + "|" + formName;
      }
    
    private onSubmitClick(e: Event) {
        e?.preventDefault();
        // Check if the form is valid or not
        if (!this.validateForm()) {
            return;
        }
        
        this.btnSubmit.disabled = true;
        this.recaptchToken = '';
        if(this.isRecaptchaEnabled) {
            if(this.isEnterpriseRecaptchaEnabled) {
                grecaptcha.enterprise.ready(function() {
                    grecaptcha.enterprise.execute(this.recaptchaSiteKey, {
                        action: 'submit'
                    })
                        .then(function(token: string) {
                            this.recaptchToken = token;
                            this.makeAjaxCall(); // Call respective api on form submit
                        }.bind(this));
                }.bind(this));
            } else {
                grecaptcha.ready(function() {
                    grecaptcha.execute(this.recaptchaSiteKey, {
                        action: 'submit'
                    })
                        .then(function(token: string) {
                            this.recaptchToken = token;
                            this.makeAjaxCall(); // Call respective api on form submit
                        }.bind(this));
                }.bind(this));
            }
        }else {
            this.makeAjaxCall();
        }
		if(window[this.formId].isFormSubmitted !== true && this.isEventTrackingEnabled) { 
            if(this.eventTrackingType == 'gtm') {
                let formSubmitData = FormContainer.getDataLayer("form_submit","form","submit",this.formName);
                window.dataLayer.push(formSubmitData);
                window[this.formId].isFormSubmitted = true;
            } else if (this.eventTrackingType == 'aa' && window.__satelliteLoaded == true) {
                window._satellite.track('formSubmitSuccess',{'formName': this.formName,'formType': this.formName});
                window[this.formId].isFormSubmitted = true;
            }
		}
    }

    public resetForm() {
        this.form.reset(); //  Reset the form on click of reset button
        this.form.querySelectorAll('.a-dropdown-selected').forEach(function(ele: HTMLInputElement){
            ele.textContent = '';
        });
        this.form.querySelectorAll('.a-dropdown__menu li.selected').forEach(function(ele: HTMLInputElement){
            ele.classList.remove('selected');
        });
        this.inputFields.forEach(function(ele: HTMLInputElement) {
            this.checkRequired(ele);
        }.bind(this));
        

        if(this.dateFields?.length > 0){
            this.dateFields.forEach(function(ele: HTMLInputElement){
                // added new para to check and enable disable required date felid "true"
                this.checkRequired(ele);
            }.bind(this));
        }
    }

    private onResetClick() {
        this.resetForm();
    }

    public validateForm(): boolean {
        let valid = true;
        this.inputFields.forEach(function(ele: HTMLInputElement) {
            if (!this.validateInputField(ele)) {
                valid = false;
            }
        }.bind(this));

        if(this.dateFields?.length > 0) {
            this.dateFields.forEach(function(ele: HTMLInputElement) {
                if (!this.validateInputField(ele)) {
                    valid = false;
                }
            }.bind(this));
           
        }
  
        return valid;
    }

    /**
     * @function
     * @desc Generate the form body if the form has valid data
     * @param {Object} event
     */

    public getFormData(): any {
        const finalData = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {},
            queryParam: ''
        };
        finalData.body = this.getFormBody();

        // reserved field-names for the other functionalities, and these should not be sent in request
        const reservedFieldNames = ['formMode', 'successMessage', 'failureMessage', 'thankyouPage', 'updateRequest', 'onBeforeCall', 'onSuccess', 'onError', 'onComplete'];

        this.hiddenFields.forEach(function(ele: HTMLInputElement) {
            const { name: fieldName, value } = ele;

            // Do not add fields having reserved names
            if(!reservedFieldNames.includes(fieldName)) {

                // based on field config from dialog, add it to request header or body
                if(this.utils.isHeaderField(ele)) {
                    finalData.headers[fieldName] = value;
                } else {
                    this.setFieldValue(finalData.body, fieldName, value);
                }
            }
        }.bind(this));

        this.headers.forEach(function(ele: HTMLInputElement) {
            const isHeader: boolean = ele.dataset.header ? true : false;
            if (isHeader) {
                finalData.headers[ele.name] = ele.value;
            }
        });
        return finalData;
    }

    /**
     * @function
     * @desc set the field value to formBody Object
     * @param {Object} data form body object reference
     * @param {String} fieldName field-name
     * @param {String} value field value
     */
    public setFieldValue(data, fieldName, value) {
        // if field name does not contain period, set it directly to formBody(data) object
        if(!fieldName.includes('.')) {
            data[fieldName] = value;
            return;
        }

        // Split field name by `.` and create a nested object with those keys
        const keys = fieldName.split('.');
        const lastKey = keys?.pop();
        const lastObj = keys?.reduce((obj, key) =>
        obj[key] = obj[key] || {},
        data);
        lastObj[lastKey] = value;
    }


    /**
     * @function
     * @desc Generate the form body if the form has valid data
     * @param {Object} event
     */

    public getFormBody() {
        const finalData: any = {};
        this.inputFields.forEach(function (ele: HTMLInputElement) {
            if (!(/checkbox|radio/gi.test(ele.type)) && ele.name && ele.value) {
                this.setFieldValue(finalData, ele.name, ele.value);
            }
        }.bind(this));

        if(this.dateFields?.length > 0){
            this.dateFields.forEach(function(ele: HTMLInputElement){
                if (ele.name && ( ele.value || ele.value == '')) {
                    this.setFieldValue(finalData, ele.name, ele.value);
                }
            }.bind(this));
        }

        this.container.querySelectorAll('.options').forEach(function(ele) {
            const inputs = ele.querySelectorAll('input');
            const len = inputs.length;

            inputs.forEach(function(input) {
                const name = input.name;
                let inputValue = input.value;
                let consentVersion: string | null;

                if (len > 1) {
                    // get array reference from finalData
                    let optionKey = finalData[name];

                    // if not found, set it as empty array
                    if (!optionKey) {
                        this.setFieldValue(finalData, name, []);

                        //find the reference of it based on the field name
                        if (name.includes('.')) {
                            const [rootKey, fieldKey] = name.split('.');
                            optionKey = finalData[rootKey][fieldKey];
                        } else {
                            this.setFieldValue(finalData, name, []);
                            optionKey = finalData[name];
                        }
                    }

                    // Parse out the consent version if present:
                    if (inputValue.includes('|')) {
                      const tokens = inputValue.split('|');
                      inputValue = tokens[0];
                      consentVersion = tokens[1];
                    }

                    optionKey.push({
                        'consentName': inputValue,
                        'consentValue': input.checked,
                        ...(consentVersion?.length) && {
                          'consentVersion': consentVersion
                        }
                    });

                } else {
                    this.setFieldValue(finalData, name, input.checked);
                }
            }.bind(this));
        }.bind(this));

        this.container.querySelectorAll('.a-dropdown__menu li.selected').forEach(function (ele: HTMLInputElement) {
            const name = ele.closest('ul').getAttribute('name');
            //in-case if name doesn't exist
            if (name) {
                this.setFieldValue(finalData, name, ele.dataset.optionvalue);
            }
        }.bind(this));

        return finalData;
    }

    /**
     * @function
     * @desc Methods to show/hide spinner in  form  button
     * @param {Object} event
     */

    public showBtnSpinner() {
        if(this.btnSpinner) {
            this.btnSpinner.classList.add('a-button--spinner');
        }
    }
    public hideBtnSpinner() {
        if(this.btnSpinner) {
            this.btnSpinner.classList.remove('a-button--spinner');
        }
    }


    /**
     * @function
     * @desc Call subsequent API on form submit action
     * @param {Object} event
     */

    private makeAjaxCall() {
        const formData: any = this.getFormData();
        if (this.isRecaptchaEnabled && this.recaptchToken) {
            formData.body['g-recaptcha-response'] = this.recaptchToken;
        }
        this.showBtnSpinner();
        this.btnSubmit.disabled = true;

        // onBefore callback
        this.onBeforeCall();

        // updateRequest callback execution to make any changes to Request boyd or headers
        this.updateRequest(formData);

        let endpointUrl = this.actionUrl;
        if(formData.queryParam && formData.queryParam !== '') {
            endpointUrl = this.actionUrl + "?" + formData.queryParam;
        }
        fetch(endpointUrl, {
            method: this.actionMethod,
            mode: 'cors',
            cache: 'no-cache',
            headers: formData.headers,
            body: JSON.stringify(formData.body) // body data type must match "Content-Type" header
        })
        .then((resp) => resp.json())
        .then(async function(data: any) {

            this.hideBtnSpinner();

            // handle API response
            if( data.status === false) {
                // handle error
                this.formMessage.apiError(data.response, this.authoredFailureMsg);
                this.btnSubmit.disabled = false;

                // onError callback
                this.onError(data);

            } else if(data.errorCode === 0 || data.errorCode === 1003) {
                // handle success
                if(this.thankyouPage && this.thankyouPage.value) {
                    await this.onSuccess(data);
                    window.location.replace(this.thankyouPage.value);
                } else {
                    this.formMessage.success(this.authoredSuccessMsg);
                    await this.onSuccess(data);
                }

                // reset the form
                this.resetForm();

            } else {
                // handle error
                this.formMessage.apiError(data.response, this.authoredFailureMsg);
                this.btnSubmit.disabled = false;

                // onError callback
                this.onError(data);
            }

        }.bind(this))
        .catch(function(this: FormContainer, error: any) {

            this.hideBtnSpinner();
            this.formMessage.error(this.authoredFailureMsg);
            this.resetForm();
            this.btnSubmit.disabled = true;

            // onError callback
            this.onError(error);

        }.bind(this))
        .then(function() {

            // onComplete callback
            this.onComplete();

        }.bind(this));
    }
}

(function() {
    function initFormContainers(ele) {
        if (ele.closest('.o-wizard') === null ||
            ele.closest('.o-wizard')?.getAttribute('data-js-component') != 'wizard') {
              new FormContainer(ele as HTMLElement);
        }
    };

    $(function() {
        document.querySelectorAll('[data-js-component="formcontainer"]').forEach(function(ele) {
            initFormContainers(ele);
        });
        document.addEventListener('modal:content-updated', function() {
            document.querySelectorAll('.modal.generic-modal [data-js-component="formcontainer"]').forEach(function(ele) {
                initFormContainers(ele);
            });
        }, false);
    });
})();