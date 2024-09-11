/**
 * @module
 * @desc Search Results Module
 */

(function () {

    document.addEventListener('DOMContentLoaded', function () {
        const $resultsWrapper = document.querySelector('.search-results-wrapper');
        const $cardtemplateElm = document.getElementById("product-card-template");
        const $loadingScreen = document.querySelector('.loading-screen.search-results-loader');
        const $noResultScreen = document.querySelector('.no-result-screen.search-results-loader');
        const $countWrapper = document.querySelector('.search-results__count');
        const $searchBtnWrapper = document.querySelector('.m-search-bar__button');
        const $viewButtons = document.querySelectorAll('.search-results__buttons button');
         
        
        /**
         * @method
         * @desc switch list/grid view for product cards 
         */
        function toggleView(event) {
            const $target = event.target;
            //if target is em, goto parent else it is a button
            const $viewButton = $target.tagName === 'EM' ? $target.parentElement : $target;
            const isListView = $viewButton.classList.contains('search-results-btn__list');
            const $cards = $resultsWrapper.querySelectorAll(isListView ? '.product-card__grid-view' : '.product-card__list-view');

            //click on list view button
            if(isListView) {
                $cards.forEach(function(card) {
                    card.classList.remove('product-card__grid-view','col-md-4', 'col-lg-3');
                    card.classList.add('product-card__list-view','col-lg-9', 'col-md-12');
                });
            } else {
                //click on grid view button
                $cards.forEach(function(card) {
                    card.classList.remove('product-card__list-view','col-lg-9', 'col-md-12');
                    card.classList.add('product-card__grid-view','col-md-4', 'col-lg-3');
                });
            }

            
            $viewButtons.forEach(function(ele) {
                ele.classList.remove('active');
            });
            
            $viewButton.classList.add('active');
        }

        /**
         * @method
         * @desc handle products json response
         * @param {Object} response response object from products json
         */
        function handleProducts(response) {
          
            response = response.response;
            
            ABT.productCards.init({
                wrapper: $resultsWrapper, 
                templateEle: $cardtemplateElm,
                products: response.results || [],
                loadingScreen: $loadingScreen,
                noResultScreen: $noResultScreen
            });

            setProductsCount(response.totalCount);
        }

        /**
         * @method
         * @desc set product count in UI
         * @param {Number} count count of products
         */
        function setProductsCount(count) {
            $countWrapper.innerText = `Showing ${count} result${count > 1 ? 's' : ''}`;
        }

        /**
         * @method
         * @desc getfavorite products list json from API 
         */
        function getProductsList() {

            //make wrapper empty and show loading screen
            $resultsWrapper.innerHTML = '';
            $noResultScreen.classList.add('d-none');
            $loadingScreen.classList.remove('d-none');
            
            //Make API call
            ABT.Http({
                url: $searchBtnWrapper.dataset.api,
                method: 'POST',
                headers: {
                    'x-id-token': ABT.Utils.getUser('token')
                },
                params: {
                    q: ABT.Utils.getQueryParam('q') || '', // query from Url
                    firstresult: 1, // value will come from variable once pagination logic is applied
                    // numberofresults: 100, // value will come from variable once pagination logic is applied
                    autocorrect: true,
                    searchtype: 'sitesearch',
                    sort: "ASC"
                }

            }).then(handleProducts);
        }

        /**
         * @method
         * @desc initiate js 
         */
        function init() {

          // now onwards is only for search page
            if(!$viewButtons || !$resultsWrapper){
                return;
            }

            getProductsList();
            $viewButtons.forEach(function(switchButton) {
                switchButton.addEventListener('click', toggleView);
            });
        }

        init();
    });

})();
