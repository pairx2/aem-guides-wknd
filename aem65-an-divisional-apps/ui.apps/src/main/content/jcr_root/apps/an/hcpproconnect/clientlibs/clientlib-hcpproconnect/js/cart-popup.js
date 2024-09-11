$(document).ready(function(){
    if(isCountryCodeUK() && $("#cart-popup-xf").length > 0) {

        let buttonClose = `<div>
                            <span class="generic-modal--close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <i id="closeCartPopup"
                            aria-hidden="true"
                            class="abt-icon abt-icon-cancel"></i>
                            </span>
                            </div>`;

        $("#cart-popup-xf").append(buttonClose);


        $("#closeCartPopup").click(function() {
            $('#cart-popup-xf').fadeOut();
        });

        $('#cart-popup-btn-continue').click(function(e) {
            e.preventDefault();
        });
    }
});

function addToCart(productDetails) {
    $("#cart-popup-items .image.image--align-center").empty();
    let productName = $('#cart-popup-product-name p');
    let productDesc = $('#cart-popup-product-desc p');
    let productType = $('#cart-popup-product-type p');

    productName.html(productDetails.header);
    productDesc.html(productDetails.productCustomerName);
    productType.html(productDetails.productFlavor);
    $('#cart-popup-items .image').append('<img src="' +productDetails.displayImage + '">');
}
