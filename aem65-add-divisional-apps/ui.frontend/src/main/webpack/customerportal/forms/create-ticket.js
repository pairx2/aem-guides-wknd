$(document).ready(function () {
    let hasContact = false;
    let validUploads = true;

    const nameInput = $("[name='Name']");
    const emailInput = $("[name='Email']");
    const phoneInput = $("[name='Phone']");

    const requireField = (field) => {
        field.attr('required', true);
        field.closest('.a-input-field').attr('data-required', true);
        field.closest(".form-group").addClass("validation-require");
    };

    const optionalField = (field) => {
        field.attr('required', false);
        field.closest('.a-input-field').attr('data-required', false);
        field.closest(".form-group").removeClass("validation-require");
    };

    const requireCreateContact = () => {
        requireField(nameInput);
        requireField(emailInput);
        requireField(phoneInput);
    };

    const optionalCreateContact = () => {
        optionalField(nameInput);
        optionalField(emailInput);
        optionalField(phoneInput);
    };

    const showField = (field) => {
        field.closest('.fields').removeClass("d-none");
    };

    const hideField = (field) => {
        field.closest('.fields').addClass("d-none");
    };

    const enableField = (field) => {
        field.attr('readonly', false);
    };

    const disableField = (field) => {
        field.attr('readonly', true);
    };

    const changeField = (field) => {
        field[0].dispatchEvent(new Event("change"));
    };

    const enableCreateContact = () => {
        showField(nameInput);
        showField(emailInput);
        showField(phoneInput);
        enableField(nameInput);
        enableField(emailInput);
        enableField(phoneInput);
        requireCreateContact();
    };

    const disableCreateContact = () => {
        optionalCreateContact();
        hideField(nameInput);
        hideField(emailInput);
        hideField(phoneInput);
    };

    let createForm = $("#formCreateTicket");
    if (createForm && createForm.length > 0 && (typeof Granite === 'undefined' || typeof Granite.author === 'undefined')) {
        //&sn=AC01555&pn=Alinity%20c&ii=C4AC730B-E3E6-E811-BCF9-80C16E222732&ci=null&ln=LABORATORIOS%20BIOMEDICOS%20SA%20DE

        let labInfo = window.addAnalytics.getAnalyticsLabProfileObj()
        let userInfo = window.addAnalytics.getAnalyticsUserObj()
        let serviceRequestStartsObj = {
            "event": "service_request_start",
            "lab": {
                "labType": labInfo.lab.labType,
                "labId": labInfo.lab.labId
            },
            "user": {
                "userRole": userInfo.user.userRole,
                "userLoginStatus": userInfo.user.userLoginStatus
            },
            "siteLanguage": window.getLanguage()
        }
        window.addAnalytics.fireAnalyticsEvent('service_request_start', serviceRequestStartsObj)

        let serialNumber = getUrlParameter('sn');
        if (serialNumber && serialNumber != '') {
            $("[name='SerialNumber']").val(serialNumber);
        }

        let productName = getUrlParameter('pn');
        if (productName && productName != '') {
            $("[name='ProductName']").val(productName);
        }

        let customerId = getUrlParameter('ci');
        if (customerId && customerId != '') {
            $("[name='CmsNextCustomerId']").val(customerId);
        }

        let labName = getUrlParameter('ln');
        if (labName && labName != '') {
            $("[name='LabName']").val(labName);
        }

        let instrumentId = getUrlParameter('ii');
        if (instrumentId && instrumentId != '') {
            $("[name='CmsNextInstrumentId']").val(instrumentId);
        }

        $("[name='ShortDescription']").attr("maxlength", 50);
        $("[name='DetailedDescription']").attr("maxlength", 6000);

        // Disable Contact Form until a contact is selected
        createForm.addClass('validation-error');
        disableCreateContact();

        // Override form when there is a file upload error.
        $(document).on('file-uploader-invalid', function () {
            validUploads = false;
            createForm.addClass('validation-error');
        });

        $(document).on('file-uploader-valid', function () {
            if (hasContact) {
                createForm.removeClass('validation-error');
            }
        });

        $(document).on('contact-selected', function () {
            setTimeout(function () {
                hasContact = true;
                if (validUploads) {
                    createForm.removeClass('validation-error');
                }
                const contactName = $("[name='contactName']").val();
                const contactEmail = $("[name='contactEmail']").val();
                const contactPhone = $("[name='contactPhone']").val();

                if (contactName) {
                    showField(nameInput);
                    nameInput.val('');
                    optionalField(nameInput);
                    changeField(nameInput);
                    disableField(nameInput);
                    nameInput.val(contactName);
                } else {
                    hideField(nameInput);
                }

                if (contactEmail) {
                    showField(emailInput);
                    emailInput.val('');
                    optionalField(emailInput);
                    changeField(emailInput);
                    disableField(emailInput);
                    emailInput.val(contactEmail);
                } else {
                    hideField(emailInput);
                }

                if (contactPhone) {
                    showField(phoneInput);
                    phoneInput.val('');
                    requireField(phoneInput);
                    enableField(phoneInput);
                    phoneInput.val(contactPhone);
                    changeField(phoneInput);
                } else {
                    hideField(phoneInput);
                }

                nameInput[0].dispatchEvent(new Event("change"));
            }, 100);
        });

        $(document).on('contact-deselected', function () {
            hasContact = false;
            createForm.addClass('validation-error');
            disableCreateContact();
        });

        $(document).on('contact-create-selected', function () {
            hasContact = true;
            if (validUploads) {
                createForm.removeClass('validation-error');
            }
            setTimeout(function () {
                enableCreateContact();
                const createContactName = $("[name='createContactName']").val();
                nameInput.val(createContactName);
                changeField(nameInput);
                emailInput.val('');
                changeField(emailInput);
                phoneInput.val('');
                changeField(phoneInput);
            }, 100);
        });
    }
});