/**
 * @module
 * @desc App Init Module
 */

(function(){
    /**
     * @function
     * @desc adds token to searchbar API request
     */
    function addTokenHiddenField() {
        // create hidden field
        const hiddenField = document.createElement('input');

        // add required attributes
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('data-header', 'true');
        hiddenField.setAttribute('name', 'x-id-token');
        hiddenField.value = localStorage.getItem('id.token') || sessionStorage.getItem('id.token');

        // append to document body
        document.body.appendChild(hiddenField);
    }

    //
    document.addEventListener('DOMContentLoaded', function() {
        // Target formcontainer present in XFs/Modals
        const $formContainers = document.querySelectorAll('.xf-content-height .o-form-container');

        // Move form mesage elements to top
        $formContainers.forEach(function($formContainer) {
            ABT.Utils.moveFormMessageElm($formContainer);
            const $form = $formContainer.querySelector('form');
            
            //to stop form to perform default action on submit
            $form.addEventListener('submit', preventSubmission);
        });

        //
        if(document.querySelector('.searchbar')) {
            addTokenHiddenField();
        }
    });

    /**
     * @function
     * @desc prevent default action 
     * @param {Object} event
     */
    function preventSubmission(event) {
        event.preventDefault();
    }

})();