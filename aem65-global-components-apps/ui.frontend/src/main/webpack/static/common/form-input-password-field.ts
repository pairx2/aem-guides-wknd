export class FormInputPasswordField {

    formInputField: JQuery<any>;
    icon: JQuery<any>;
    eyeIcon: JQuery<any>;
    inputPasswordField: JQuery<any>;
    inputPasswordFieldStrength: string;
    inputPasswordProgress: JQuery<any>;
    inputPasswordFieldTooltip: JQuery<any>;
    inputPasswordFieldTooltipTitle: string;
    inputPasswordPolicyType: string;
    inputPasswordMinLength: number;

    public static readonly passwordClasses: {
        [key: string]: string;
    } = {
        weak: 'password-weak',
        ok: 'password-ok',
        medium: 'password-medium',
        strong: 'password-strong'
    }

    constructor(elements) {
        this.formInputField = $(elements);
        this.inputElements();
    }

    public inputElements() {

        this.inputPasswordField = this.formInputField.find('input.a-input-control');

        this.icon = this.inputPasswordField.parents('.a-input-grp').find('.icon');
        this.eyeIcon = this.icon?.find('.abt-icon.abt-icon-eye');

        this.eyeIcon?.on('click', this.togglePasswordVisibility.bind(this));

        //password strength progress
        this.inputPasswordFieldStrength = this.formInputField.attr('data-password-policy')? this.formInputField.attr('data-password-policy') : null;
        this.inputPasswordProgress = this.inputPasswordField?.parents('.a-form-grp').find('.a-input-password-strength');

        this.inputPasswordPolicyType = this.inputPasswordProgress?.attr('data-password-type');
        this.inputPasswordMinLength = this.inputPasswordProgress ? parseInt(this.inputPasswordProgress.attr('data-password-minlength')) : null;

        //password strength tooltip
        this.inputPasswordFieldTooltip = this.inputPasswordField?.parents('.a-form-grp').find('.a-input-password-strength .tooltip-pwd .a-tooltilp__wrapper');
        this.inputPasswordFieldTooltipTitle = this.inputPasswordFieldTooltip?.attr('data-original-title');

    }

    /**
     * @method
     * @desc toggle between password and text field
     */
    public togglePasswordVisibility(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const fieldType = this.eyeIcon.parent().siblings('input').attr('type');
        const newType = fieldType === 'password' ? 'text' : 'password';
        this.inputPasswordField.attr('type', newType);
    }

      /**
   * @function
   * @desc check password strength
   * @param {String} pwdVal
  */
    public static checkPasswordStrength(pwdVal: string, pwdMinlenReq: number, splCharRegex: string) {

        // Regex to check for a common password string
        let commonPasswordPatterns = /passw.*|word.*|12345.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/i;
        let isPasswordCommon: boolean;
        isPasswordCommon = commonPasswordPatterns.test(pwdVal);

        // initial password status
        let currentPasswordStrength = {
            pwdStrength : FormInputPasswordField.passwordClasses.weak,
            pwdMinlen : false,
            pwdLower : false,
            pwdUpper : false,
            pwdNum  : false,
            pwdSpChar : false
        };

        let passwordSplCharRegex = new RegExp(splCharRegex ? splCharRegex : "(?=.*[!@#\$%\^&\*])");
        // Build up the strenth of password
        let pwdScore = 0;
        // Lowercase letters
        /(?=.*[a-z])/.test(pwdVal) ? (pwdScore = ++pwdScore, currentPasswordStrength.pwdLower = true)  : (pwdScore = pwdScore, currentPasswordStrength.pwdLower = false);

        // Uppercase letters
        /(?=.*[A-Z])/.test(pwdVal) ? (pwdScore = ++pwdScore, currentPasswordStrength.pwdUpper = true) : (pwdScore = pwdScore, currentPasswordStrength.pwdUpper = false);

        // Numbers
        /(?=.*[0-9])/.test(pwdVal) ? (pwdScore = ++pwdScore, currentPasswordStrength.pwdNum = true) : (pwdScore = pwdScore, currentPasswordStrength.pwdNum = false);

        // Special characters (excl. space)
        passwordSplCharRegex.test(pwdVal) ? (pwdScore = ++pwdScore, currentPasswordStrength.pwdSpChar = true) : (pwdScore = pwdScore, currentPasswordStrength.pwdSpChar = false);

        // Minimum 8
        let pwdMinLenRegex = new RegExp('(?=.{'+pwdMinlenReq+',})', 'g');;
        pwdMinLenRegex.test(pwdVal) ? (currentPasswordStrength.pwdMinlen = true) : (currentPasswordStrength.pwdMinlen = false);

        if (!currentPasswordStrength.pwdMinlen || pwdScore === 0 || pwdScore === 1) {
            currentPasswordStrength.pwdStrength = FormInputPasswordField.passwordClasses.weak;
        } else if ((pwdScore === 2 && currentPasswordStrength.pwdMinlen) || isPasswordCommon === true) {
            currentPasswordStrength.pwdStrength = FormInputPasswordField.passwordClasses.ok;
        } else if (pwdScore === 3 && currentPasswordStrength.pwdMinlen) {
            currentPasswordStrength.pwdStrength = FormInputPasswordField.passwordClasses.medium;
        } else if (pwdScore === 4 && currentPasswordStrength.pwdMinlen) {
            currentPasswordStrength.pwdStrength = FormInputPasswordField.passwordClasses.strong;
        } else {
            currentPasswordStrength.pwdStrength = FormInputPasswordField.passwordClasses.weak;
        };

        // Return the strength of this password
        return currentPasswordStrength;
    }

    /**
     * @function
     * @desc set password strength tooltip
     * @param {String} pwdStrength
    */
   public static setPasswordStrengthTooltip(pwdStrength, inputPasswordFieldTooltipTitle) {

        if (pwdStrength.pwdLower === true && pwdStrength.pwdUpper === true) {
            inputPasswordFieldTooltipTitle = (inputPasswordFieldTooltipTitle.search('indicator--alpha abt-icon-tick') === -1) ? inputPasswordFieldTooltipTitle.replace('indicator--alpha', 'indicator--alpha abt-icon-tick') : inputPasswordFieldTooltipTitle;
        } else {
            inputPasswordFieldTooltipTitle = inputPasswordFieldTooltipTitle.replace('indicator--alpha abt-icon-tick', 'indicator--alpha');
        }

        if(pwdStrength.pwdMinlen === true) {
            inputPasswordFieldTooltipTitle = (inputPasswordFieldTooltipTitle.search('indicator--minlen abt-icon-tick') === -1) ? inputPasswordFieldTooltipTitle.replace('indicator--minlen', 'indicator--minlen abt-icon-tick') : inputPasswordFieldTooltipTitle;
        } else {
            inputPasswordFieldTooltipTitle = inputPasswordFieldTooltipTitle.replace('indicator--minlen abt-icon-tick', 'indicator--minlen');
        }

        if(pwdStrength.pwdNum === true) {
            inputPasswordFieldTooltipTitle = (inputPasswordFieldTooltipTitle.search('indicator--number abt-icon-tick') === -1) ? inputPasswordFieldTooltipTitle.replace('indicator--number', 'indicator--number abt-icon-tick') : inputPasswordFieldTooltipTitle;
        } else {
            inputPasswordFieldTooltipTitle = inputPasswordFieldTooltipTitle.replace('indicator--number abt-icon-tick', 'indicator--number');
        }

        if(pwdStrength.pwdSpChar === true) {
            inputPasswordFieldTooltipTitle = (inputPasswordFieldTooltipTitle.search('indicator--spchar abt-icon-tick') === -1) ? inputPasswordFieldTooltipTitle.replace('indicator--spchar', 'indicator--spchar abt-icon-tick') : inputPasswordFieldTooltipTitle;
        } else {
            inputPasswordFieldTooltipTitle = inputPasswordFieldTooltipTitle.replace('indicator--spchar abt-icon-tick', 'indicator--spchar');
        }

        return inputPasswordFieldTooltipTitle;
    }


	/**
     * @function
     * @desc compare the password and confirm password values
     * @param {String} password and confirmPassword
    */
	public static checkPasswordMatch(password, confirmPassword) {

		let passwordMatchStatus: boolean;

		// Show Error
		if (password != confirmPassword) {
			passwordMatchStatus = false;
		} else {
			passwordMatchStatus = true;
		}

		return passwordMatchStatus;
	}

}

$(document).ready(function () {
    document.querySelectorAll('.a-input-field[data-component-type="input-field-password"]').forEach(function (ele) {
        new FormInputPasswordField(ele);
    });
});
