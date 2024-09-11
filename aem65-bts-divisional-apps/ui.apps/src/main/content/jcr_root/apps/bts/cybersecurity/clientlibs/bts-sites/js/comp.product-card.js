/**
 * @module
 * @desc Product-card Module
 */


(function () {

    ABT.productCards = (function () {

        let $wrapper;
        let products;
        let viewClassName;
        let $loadingScreen;
        let $noResultScreen;
        const templates = {};

        /**
         * @method
         * @desc get document from api
         * @param {String} id 
         * @param {String} _controller controller
         * @return {Object} Object having file value and name 
         */
        function getDocument(id, _controller) {
            // Make the HTTP call
            return ABT.Http({
                url: ABT.Config.endpoints.GET_DOCUMENT_DETAILS,
                method: 'POST',
                params: {
                    action: 'downloadDocument',
                    documentId: id
                },
                signal: _controller.signal
            }).then(function (resp) {
                const response = resp.response;
                const downloadi18Key = response.i18nMessageKey;
                if (typeof downloadi18Key !== 'undefined' && downloadi18Key == 'GETDOC-1003') {

                    throw new Error("Document does not exist");
                } else if (Object.keys(response).length == 0) {
                    throw new Error("No doc response");
                } else {
                    const bytes = response.attachmentBytes;
                    const name = response.attachmentName;
                    return { bytes, name };
                }

            });
        }



        /**
         * @method
         * @desc create and save document to disc from bytestream
         * @param {Object} doc having document data and name 
         * @param {String} type document type pdf/xml 
         * @param {Object} button ele - default undefined
         */
        function saveDocument(doc, type, button = undefined) {
            const linkSource = `data:application/${type};base64,${doc.bytes}`;
            const downloadLink = document.createElement("a");
            const fileName = doc.name || `document.${type}`;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            if (button) {
                button.disabled = false;
                button.classList.remove("btn-spinner__custom");
                $(button).parents('tbody').find('.link .a-link .a-link__text').removeClass('disabled');
            }
        }

        /**
         * @method
         * @desc pass gtm layer data
         * @param {HTML_ELEMENT} button 
         */
        function triggerGtmEvent(button) {
            const dataSet = button.dataset;
            const gtmEventData = {
                eventAction: dataSet.gtmEventaction,
                eventLabel: dataSet.gtmEventlabel
            };

            //calling datalayer event
            ABT.gtm('download', gtmEventData);
        }

        /**
         * @method
         * @desc generate dynamic html for product Cards
         * @param {Object} productObj product object
         * @returns {Object} html for dynamic product cards 
         */
        function generateCards(productObj) {
            const template = templates.card.innerHTML;
            const isFavorite = ABT.favorites.is(productObj.fieldId);
            const productUrl = productObj.productUrl ? ABT.Config.aemConfig['PRODUCT_PAGE_URL'].replace('.html', '') + '/' + productObj.productUrl + '.html' : ABT.Config.aemConfig['PRODUCT_PAGE_URL'];

            return ABT.Utils.generateTemplate(template, {
                VIEWCLASS: viewClassName,
                TITLE: productObj.productName,
                TYPE: productObj.productType,
                PRODUCT_ID: productObj.fieldId,
                LINK_PATH: productUrl,
                IMAGE: '/content/dam/bts/cybersecurity/us/en/images/product-tile/' + productObj.fieldId + '.jpeg',
                HEART_ICON: isFavorite ? 'abt-icon-heart-fill' : 'abt-icon-heart'
            }, true);
        }

        /**
         * @method
         * @desc append dynamic product cards to product card wrapper 
         * @param { Array } products list of products
         */
        function addCards(prodList) {
            let productcards = '';

            // if no template or wrapper found, do nothing
            if (!templates.card || !$wrapper) {
                return;
            }

            // create product cards from the response
            prodList.forEach(function (product) {
                if (product.productName) {
                    productcards += generateCards(product);
                }
            });

            $loadingScreen.classList.add('d-none');
            !productcards && ($noResultScreen.classList.remove('d-none'));
            $wrapper.innerHTML = productcards;

            // attach click events to fav-icon for toggle favorite selection
            const $favoriteLinks = document.querySelectorAll('.m-card__btn--favourite button');
            ABT.Utils.attachEventToElementList($favoriteLinks, 'click', toggleFavorite);
        }

        /**
         * @method
         * @desc toggle favorite product
         * @param {Object} event  
         */
        function toggleFavorite(event) {
            const $button = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentElement;
            const $heartIcon = $button.querySelector('.abt-icon');
            const productId = $button.dataset.id;

            //check if product is favorite on basis of icon class
            $heartIcon.classList.contains('abt-icon-heart') ? ABT.favorites.add(productId, $button) : ABT.favorites.remove(productId, $button);
        }

        /**
         * @method
         * @desc render product cards in DOM
         * @param {Object} params Object containing card wrapper, mds2 wrapper, sbom wrapper in modal, static tabs, template for cards, template for versions and projects list
         */
        function init(params) {
            $wrapper = params.wrapper;
            templates.card = params.templateEle;
            products = params.products;
            viewClassName = params.viewClassName;
            $loadingScreen = params.loadingScreen;
            $noResultScreen = params.noResultScreen;

            addCards(products);
        }

        /**
         * @method
         * @desc get contact portal modal
         * @param {Object} button and event 
         */
        function getContactPortalModal(btn, event) {

            const getModal = document.querySelector('#need-help-modal');
            const closeModal = document.querySelector('#need-help-modal .generic-modal--close');
            const bodyTag = document.getElementsByTagName('body')[0];
            var modalBackdrop = document.createElement('div');
            modalBackdrop.className = 'modal-backdrop show contact__portal-link';

            btn && btn.addEventListener("click", function (e) {
                const downloadErrorModal = $('#document-error-modal');
                downloadErrorModal.find('.generic-modal--close').trigger('click');
                getModal.classList.add("show", "modal-contact__portal");
                getModal.style.display = "block";
                bodyTag.appendChild(modalBackdrop);
                modalBackdrop.style.display = 'block';
            })

            closeModal && closeModal.addEventListener("click", function (e) {
                getModal.classList.remove("show", "modal-contact__portal");
                getModal.style.display = "none";
                bodyTag.removeChild(modalBackdrop);
            })

        }

        // Exposed methods
        return {
            init: init,
            getDocument: getDocument,
            saveDocument: saveDocument,
            triggerGtmEvent: triggerGtmEvent,
            getContactPortalModal: getContactPortalModal
        }

    })();

})();