(function(){
    document.addEventListener('DOMContentLoaded', function() {
        const $formContainers = document.querySelectorAll('.o-form-container');

        // Move form mesage elements to top
        $formContainers.forEach(function($formContainer) {
            EPD.Utils.moveFormMessageElm($formContainer);
        })
    });
})();