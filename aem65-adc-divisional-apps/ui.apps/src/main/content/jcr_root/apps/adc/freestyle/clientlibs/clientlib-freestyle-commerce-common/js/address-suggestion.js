$(() => {
    const handleAddressScroll = () => {
        let addressAddField = '';

        function addModalOpen() {
            addressAddField = document.querySelector('#my-address-add-modal #enter-address-modal input[name="address.streetLine1"]')
        }
        function editModalOpen() {
            addressAddField = document.querySelector('#my-address-edit-modal #enter-address-modal input[name="address.streetLine1"]')
        }


        $('#my-address-add-modal').on('click', addModalOpen);
        $('#my-address-edit-modal').on('click', editModalOpen);

        $('.modal').scroll(function () {
            if (addressAddField) {
                let elementOffset = $(addressAddField)?.offset().top
                elementOffset += 48;

                let pacCon = document.querySelectorAll('.pac-container')

                if (pacCon) {
                    pacCon?.forEach(element => {
                        element.style.setProperty("top", `${elementOffset}px`, "important");

                    });
                }

            }
        })
    };


    setTimeout(handleAddressScroll, 100);
});