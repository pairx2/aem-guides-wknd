/**
 * Adding conditional to display passport number based on citizenship selection
 */
(function ($, document) {
    /* init */
    $(document).ready(() => init());

    const init = () => {
        $(`input[name = "citizenshipQuestion"]`)?.on('change', () => {
            window.dispatchEvent(createConditionalEvent(!$(`input[name = "citizenshipQuestion"]`)
                .prop("checked"), 'enterPassportNumber'));
        });
    }

    /* Auto-fill remover for dob field */

    var dobField = document.getElementById("dateOfBirth_Id")
    if (dobField) {
        dobField.setAttribute("readonly", 'true');
        dobField.setAttribute('style', 'background-color:#fff !important');
        dobField.style.setProperty('border-color', '#000', 'important');


        document.getElementById('dateOfBirth_Id').addEventListener('click', function () {
            this.removeAttribute('readonly');
        });
    }

})(jQuery, document);
