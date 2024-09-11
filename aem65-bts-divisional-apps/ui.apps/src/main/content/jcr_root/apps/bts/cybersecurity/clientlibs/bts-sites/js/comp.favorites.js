/**
 * @module
 * @desc Favorite Products Module
 */

(function () {

    document.addEventListener('DOMContentLoaded', function () {
        const $favoritesWrapper = document.getElementById('favorites-products-wrapper');
        const $cardtemplateElm = document.getElementById("product-card-template");
        const $loadingScreen = document.querySelector('.fav-loading-screen.screen-loader');
        const $noResultScreen = document.querySelector('.fav-no-result-screen.screen-loader');
        
        const $viewButtons = document.querySelectorAll('.favorites-header__buttons button');
         
        
        
        /**
         * @method
         * @desc switch list/grid view for product cards 
         */
        function toggleView(event) {
            const $target = event.target;
            //if target is em, goto parent else it is a button
            const $viewButton = $target.tagName === 'EM' ? $target.parentElement : $target;
            const isListView = $viewButton.classList.contains('favorites-btn__list');
            const $cards = $favoritesWrapper.querySelectorAll(isListView ? '.product-card__grid-view' : '.product-card__list-view');

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

            // save preference
            ABT.Utils.userPreference.set('preference', isListView ? 'list' : 'grid');
        }

        /**
         * @method
         * @desc handle products json response
         * @param {Object} response response object from products json
         */
        function handleProducts(response) {
            

            response = response.response;
            ABT.productCards.init({
                wrapper: $favoritesWrapper, 
                templateEle: $cardtemplateElm, 
                products: response.products || [],
                loadingScreen: $loadingScreen,
                noResultScreen: $noResultScreen
            });

            // set view-type
            activateViewType();

        }

        /**
         * @method
         * @desc getfavorite products list json from API 
         */
        function getProductsList() {

            //make wrapper empty and show loading screen
            $favoritesWrapper.innerHTML = '';
            $noResultScreen.classList.add('d-none');
            $loadingScreen.classList.remove('d-none');

            // get favorites from localstorage
            let products = ABT.favorites.get() || [];

            // map to have Array of IDs
            products = products.map(function(prod) { 
                return prod.id;
            });

            // Make API call
            ABT.Http({
                url: ABT.Config.endpoints.GET_DOCUMENT_DETAILS,
                method: 'POST',
                headers: {
                    'x-id-token': ABT.Utils.getUser('token')
                },
                params: {
                    "action":"getMetadata",
                    "sortType":"ASC",
                    "referenceIds": products
                }
            }).then(handleProducts);
        }

        function activateViewType() {
            const userPreference = ABT.Utils.userPreference.get('preference');
            const $viewByElm = document.querySelector(`.favorites-header__buttons [data-type=${userPreference}]`);

            $viewByElm.click();
        }

        /**
         * @method
         * @desc initiate js 
         */
        function init() {
            if(!$viewButtons || !$favoritesWrapper){
                return;
            }

            
            $viewButtons.forEach(function(switchButton) {
                switchButton.addEventListener('click', toggleView);
            });

            // set view-type
            activateViewType();

            //
            getProductsList();
        }

        init();
    });

    //
    ABT.favorites = (function(){
        /**
         * @function
         * @desc gets user favorite products from local storage
         * @return {Array} list of favorite products
         */
        function getFavorites() {
            const favoritesStr = localStorage.getItem('favorites');

            // return empty array if no favorite items found
            if(!favoritesStr) {
                return [];
            }

            const favorites = JSON.parse(favoritesStr);
            return favorites;
        }

        /**
         * @function
         * @desc sets/update favorite products in localStorage
         * @param {Array} products list of products
         * @return {Array} list of products
         */
        function setFavorites(products) {
            // if not found, set as empty array
            if(!products || !(products instanceof Array)) {
                products = [];
            }

            // save to local storage in browser
            localStorage.setItem('favorites', JSON.stringify(products));

            return products;
        }

        /**
         * @function
         * @desc adds item to favorite list
         * @param {String} productId product ID
         * @param {HTML_ELEMENT} button 
         */
        function addFavorite(productId, button) {

            const favoriteItems = getFavorites();
            
			//Fix -BTSAPSP-937: Code to remove duplicate favorite items
			let skipFavItm = false;
        	favoriteItems.forEach((element) => {          	  
              if (element.id === productId) {                
                skipFavItm = true;
              }
            });       

			if (!skipFavItm) {          
			  favoriteItems.push({id: productId});
			}            
            //api call to update user profile
            updateFavorites(favoriteItems, button)
                .then(function(resp) {
                    if(resp.errorCode === 0) {
                        //toggle heart icon UI
                        toggleHeartIcon(button);
                        // update favorite list in localstorage
                        setFavorites(favoriteItems);
                    } else {
                        throw new Error('Could not update favorites');
                    }
                })
                .catch(err => {
                    throw new Error(err); 
                });
        }

        /**
         * @function
         * @desc removes item to favorite list
         * @param {String} productId product ID
         * @param {HTML_ELEMENT} button 
         */
        function removeFavorite(productId, button) {
            const favoriteItems = getFavorites();
            const updatedFavoriteItems = favoriteItems.filter(function(item) {
                return item.id !== productId;
            });

            //
            updateFavorites(updatedFavoriteItems, button)
                .then(function(resp) {
                    if(resp.errorCode === 0) {
                        //toggle heart icon UI
                        toggleHeartIcon(button);
                        // update favorite list in localstorage
                        setFavorites(updatedFavoriteItems);
                    } else {
                        throw new Error('Could not update favorites');
                    }
                })
                .catch(err => {
                    throw new Error(err);
                });
        }

        /**
         * @function
         * @desc toggle heart icon fill class
         * @param {HTML_ELEMENT} button 
         */
        function toggleHeartIcon(button){
            const $heartIcon = button.querySelector('.abt-icon');

            $heartIcon.classList.toggle('abt-icon-heart');
            $heartIcon.classList.toggle('abt-icon-heart-fill');
        }

        /**
         * @function
         * @desc makes the Ajax Call to udpate the favorite items list
         * @param {String} productId product ID
         * @param {HTML_ELEMENT} button 
         */
        function updateFavorites(products, button) {

            // Make ajax call to update favorites in backend
            return ABT.Http({
                url: ABT.Config.endpoints.UPDATE_PROFILE,
                params: {
                    userInfo: {
                        additionalProperties : {
                            data: {
                                favorites: products
                            }
                        }
                    }
                } 
            }, button);
        }

        /**
         * @desc return true if product is in favorite list
         * @param {String} productID id of product 
         */
        function isFavorite(productID) {
            const favProducts = getFavorites();

            return favProducts.some(function(prod) {
                return prod.id === productID;
            });
        }

        // Exposed methods
        return {
            get: getFavorites,
            set: setFavorites,
            add: addFavorite,
            remove: removeFavorite,
            is: isFavorite
        }
    })();
})();
