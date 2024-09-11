(function(ABBOTT) {
  ABBOTT.validate = (function() {

    // Regex
    var regex = {
      email: /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i,
      alpha: /^[A-Za-z\s]+$/, // with space
      numeric: /^[0-9]+$/,
      alphanumeric: /^[0-9A-Za-z\s]+$/,
      password: /^.{1,}$/,
      phone: /^[0-9\-\s\+\(\)\.]{6,16}$/,
      address: /^[A-Za-z\d@\,\-\.\s]{6,}$/,
    };

    // Error Messages based on valdiation types
    var errorMessages = {
      'required': 'This is a required field.',
      'email': 'Please enter valid email.',
      'match-value': 'Value does not match.',
      'alphabetic': 'Only alphabets and space allowed.',
      'numeric': 'Only numeric values are allowed.',
      'alphanumeric': 'Only alphabets & numeric values are allowed.',
      'phone': 'This is not a valid phone number.',
      'password': 'Password criteria does not match',
      'address': 'Please enter valid address'
    };

    /**
     * @function
     * @description Validates the email entered by user.
     * @param {string} email
     */
    function validateEmail(email) {
      return regex.email.test(email);
    }

    /**
     * @function
     * @description Validates the password entered by user.
     * @param {string} password
     */
    function validatePassword(password) {
      return regex.password.test(password);
    }

    /**
     * @function
     * @desc checks if the value is truthy
     * @param {string} value field current value to be validated
     * @return {boolean} is the value is truthy
     */
    function hasValue (value) {
      return !!value.length;
    }

    /**
     * @function
     * @desc checks if the field value matched with mapped field value
     * @param {string} value field current value to be validated
     * @param {$element} $el current field (jQueryfied)
     * @return {boolean} is the value is truthy
     */
    function matchValue(value, $el) {
      var $matchField = jQuery($el.data('matchTo'));
      return $matchField && $matchField.val() === value;
    }

    /**
     * @function
     * @desc checks if the field value is alphabetic
     * @param {string} value field current value to be validated
     * @return {boolean} is the value is alphabetic
     */
    function isAlphabetic (value) {
      return regex.alpha.test(value);
    }

    /**
     * @function
     * @desc checks if the field value is numeric
     * @param {string} value field current value to be validated
     * @return {boolean} is the value is numeric
     */
    function isNumeric (value) {
      return regex.numeric.test(value);
    }

    /**
     * @function
     * @desc checks if the field value is alpha-numeric
     * @param {string} value field current value to be validated
     * @return {boolean} is the value is alpha-numeric
     */
    function isAlphaNumeric(value) {
      return regex.alphanumeric.test(value);
    }

    /**
     * @function
     * @desc checks if the field value is a valid phone number
     * @param {string} value field current value to be validated
     * @return {boolean} is the value is a valid phone number
     */
    function isPhone(value) {
      return regex.phone.test(value);
    }

    /**
     * @function
     * @desc checks if the field value is a valid address
     * @param {string} value field current value to be validated
     * @return {boolean} is the value is a valid address
     */
    function isAddress (value) {
      return regex.address.test(value);
    }

    /**
     * @function
     * @desc Validates entire form. Each field with attribute 'data-validation' will be validated
     * Type of validations (or values of the this attribute):
     * --> required
     * --> email
     * --> alphabetic
     * --> match-value
     * --> numeric
     * --> password
     * @param {string} email
     */
    function isFormValid ($form) {
      var $fields = $form.find(':input[data-validation]');
      var isValid = true;
      var fieldValidation = [];

      // Reset existing error state (if any)
      $fields.removeClass('is-invalid');

      // Loop each field in the form which needs to be validate
      $fields.each(validateField);

      /**
       * @function
       * @desc iteration function to validate each fiels from the loop (in local scope)
       *       Also, add valid/invalid class to element and shows error message
       * @param {number} idx iteration index 
       * @param {HTMLElement} el iteration HTML element
       * @return {boolean} returns if field is valid 
       */
      function validateField(idx, el) {
        var $el = jQuery(el);
        var $error = $el.next();
        var validations = $el.data('validation').split(' ');
        var value = $el.val().trim();
        var isValidField;
        var type;
        var errorMessage;

        // Validate each rule on this field
        for (var i in validations) {
            type = validations[i];
            isValidField = validateRule(type, value, $el);

            // check for only one validation rule for any field at one time
            if(!isValidField) {
              errorMessage = $el.data('error-' + type) || errorMessages[type];
              break;
            }
        }

        // Highlight field
        if (isValidField) {
          $el.addClass('is-valid');
          $error.empty().addClass('d-none');
        } else {
          $el.addClass('is-invalid');
          $error.text(errorMessage).removeClass('d-none');
        }

        // Form level validation value
        fieldValidation.push(isValidField);
      }

      // Check if any field any invalid field is there
      isValid = fieldValidation.indexOf(false) === -1;

      return isValid;
    }

    /**
     * @function
     * @desc Validates field by validation rule
     * @param {string} rule : validation rule
     * @param {string} value : fields current value
     * @param {$element} $el : current element (jQueryfied)
     * @return {boolean} : if the field is valid for this rule
     */
    function validateRule (rule, value, $el) {
      var ruleMap = {
        'required': hasValue,
        'email': validateEmail,
        'alphabetic': isAlphabetic,
        'numeric': isNumeric,
        'alphanumeric': isAlphaNumeric,
        'match-value': matchValue,
        'password': validatePassword,
        'phone': isPhone,
        'address': isAddress
      };

      return ruleMap[rule](value, $el);
    }

    // Exosing methods to the Global ABBOTT Object.
    return {
      email: validateEmail,
      password: validatePassword,
      form: isFormValid
    };
  })();
})(window.ABBOTT || (window.ABBOTT = {}));
