/**
 * @module
 * @desc Product-List Module
 */


(function () {
    
    document.addEventListener('DOMContentLoaded', function () {
        const $wrapper = document.getElementById('product-card__wrapper');
        const $sortToggleBtn = document.querySelectorAll('.productsortoptionbtn');
        const $showAsBtn = document.querySelectorAll('.productspagesizebtn');
        const $viewSwitchButton = document.querySelectorAll('.product-card__view span');
        const $sortByLink = document.querySelectorAll('.product-card__sort-option .dropdown-item');
        const $sortByButton = document.querySelector('.product-card__sort-option .dropdown-toggle');
        const $categoryCheks = document.querySelectorAll('#product-filter-category__wrapper .a-checkbox__input'); 
        const $productTypeCheks = document.querySelectorAll('#product-filter-type__wrapper .a-checkbox__input'); 
        const gridCssClass = 'product-card__grid-view col-md-4';
        const listCssClass = 'product-card__list-view col-12';
        const $loadingScreen = document.querySelector('.loading-screen.screen-loader');
        const $noResultScreen = document.querySelector('.no-result-screen.screen-loader');
        let $cardtemplateElm = document.getElementById("product-card-template");
        const $searchBtnWrapper = document.querySelector('.m-search-bar__button');
        const $pagesizeByLink = document.querySelectorAll('.product-card__pagesize-option .dropdown-item');
        const $pagesizeByButton = document.querySelector('.product-card__pagesize-option .dropdown-toggle');
        let $pageSizeDiv = document.getElementById('product-card_pagesize');
        const $paginationList = document.getElementById('product-card_pagination');
        let $paginationWrapper = document.getElementById('pagination-wrapper');
        const $pageCntMsg = document.getElementById('product-card__page-count'); 

        
        let str = ['<nav class="a-pagination">'];
        
        let totalNumberOfProducts = 0;
        let numberPerPage = 12; // default multiples of 12
        const DEFAULT_PAGE_SIZE = 12; // This is used  only to handle All selection when totalNumberOfProducts > 12

        let firstResultParamForAPI = 1;

        let firstResultStr = firstResultParamForAPI.toString();
        let numberOfResultsStr = numberPerPage.toString();


        let totalPages = 1; 
        let currentPage = 1;
        let clickedPageNumber = 0;

        let isPrevClick = false;
        let isFirstPage = false;
        let isLastPage = false;
        let isNextClick = false;
        let minSizeForElipse = 5;
        let isAllSelected = false;

        let isPrevElipseShown = false;

        let isFromPaginationClick = false;
        let requiredTopScroll = false;
       
        
        /**
         * @method
         * @desc handle products json response
         * @param {Object} response response object from products json
         */
        function handleProducts(response) {
            let results = [];
            $wrapper.innerHTML = '';
            $paginationList.innerHTML = '';

            if(response && response["response"]) {
                response = response.response;
            }

            if(response && response["totalCount"]) {
                totalNumberOfProducts = response["totalCount"];

                if(totalNumberOfProducts > numberPerPage){
                    $paginationWrapper.classList.remove('hide');
                    $pageSizeDiv.classList.remove('hide');
                } else if(totalNumberOfProducts > DEFAULT_PAGE_SIZE) {
                    // This is to handle All selection in the dropdown.
                    // Because  when All is selected numberPerPage is made equal to totalNumberOfProducts
                    $pageSizeDiv.classList.remove('hide');
                }
            } else {
                 totalNumberOfProducts = 0;
                 $paginationWrapper.classList.add('hide');
                 $pageSizeDiv.classList.add('hide');
            }

            if(response && response["results"]){
                results = response["results"];
            } else {
               results = [];
               totalNumberOfProducts = 0;
               $paginationWrapper.classList.add('hide');
               $pageSizeDiv.classList.add('hide');
            }
            $pageCntMsg.classList.remove('hide');
            let countPlaceholder = $pageCntMsg.dataset.label;
            let  totalText = ""
            totalText = (countPlaceholder.replace("{displayCnt}", results.length)).replace("{totalResultCnt}", totalNumberOfProducts);
            $pageCntMsg.innerText = totalText;

            if(results.length === 0) {
                $paginationWrapper.classList.add('hide');
                $pageSizeDiv.classList.add('hide');
            }
            let isGridView = ABT.Utils.userPreference.get('preference') === 'grid';

            if(requiredTopScroll) { 
                window.scrollTo(0, 0);
                requiredTopScroll = false;
            }
            
            ABT.productCards.init({
                wrapper: $wrapper, 
                templateEle: $cardtemplateElm,
                viewClassName: isGridView ? gridCssClass : listCssClass,
                products: results,
                loadingScreen: $loadingScreen,
                noResultScreen: $noResultScreen
            });
        }

        /**
         * @method
         * @desc handle pagination for the products
         */
        function handlePagination() {
           totalPages = Math.ceil(totalNumberOfProducts / numberPerPage);
           drawPagesListModified();
        }

        /**
         * @method
         * @desc draw pagination list for the products
         */
        function drawPagesListModified()  {
            
            isPrevClick = false;
            isFirstPage = false;
            isLastPage = false;
            isNextClick = false;
            $paginationList.innerHTML = "";
            str = ['<nav class="a-pagination">']; 

            str.push('<ul class="a-pagination__pages">');

            let beforePage = +currentPage - 1;
            let afterPage = +currentPage + 1;

            if (currentPage == totalPages) {
                beforePage = beforePage - 2;
            } else if (currentPage == totalPages - 1) {
                beforePage = beforePage - 1;
            }

            if (currentPage == 1) {
                afterPage = afterPage + 2;
            } else if (currentPage == 2) {
                afterPage  = afterPage + 1;
            }

            if(totalPages === 1) {
                beforePage = 1;
                afterPage = 1;
            }

            if(totalPages === 2) {
                beforePage = 1;
            }

            
            if ((currentPage > 1) && (totalPages > 1) ) { 
                str.push('<li class="a-pagination__page a-pagination--previous">');
                str.push('<a class="a-pagination__link"  data-page="-1" href="#" >');
                str.push('<em class="abt-icon abt-icon-left-arrow u-ltr"></em>');
                str.push('</a></li>');
            }

            if ((currentPage === 1) && (totalPages > 1)){ 
                str.push('<li class="a-pagination__page a-pagination--previous">');
                str.push('<a class="a-pagination__link disabled-link" data-page="-1">');
                str.push('<em class="abt-icon abt-icon-left-arrow u-ltr"></em>');
                str.push('</a></li>');
            }

            isPrevElipseShown = false;
            if ( (currentPage > 2) && (beforePage > 1) ){ 
                str.push('<li class="a-pagination__page">');
                str.push('<a class="a-pagination__link" data-page=1 href="#">' + 1 + '</a>');
                str.push('</li>');

                if((currentPage > minSizeForElipse )) {
                    str.push('<li class="a-pagination__page a-pagination--out-of-range">');
                    str.push('<a class="a-pagination__link disabled-link__ellipse" href="#">...</a>');
                    str.push('</li>');
                    isPrevElipseShown = true;
                } 

            }

            if(!isPrevElipseShown && (beforePage > 2 )) {
                str.push('<li class="a-pagination__page a-pagination--out-of-range">');
                str.push('<a class="a-pagination__link disabled-link__ellipse" href="#">...</a>');
                str.push('</li>');
                isPrevElipseShown = true;
            } 

            for (let plengthMn = beforePage; plengthMn <= afterPage; plengthMn++) {
                if (plengthMn > totalPages) { 
                    continue;
                }
                if (plengthMn == 0) { 
                    plengthMn = plengthMn + 1;
                }
                const activeClass = (currentPage === plengthMn) ? ' a-pagination--active' : '';

                if(totalPages  > 1)  {
                    str.push('<li class="a-pagination__page' + activeClass + '">');
                    str.push('<a class="a-pagination__link" data-page="' + plengthMn + '" href="#">' + plengthMn + '</a>');
                    str.push('</li>');
                }
            }

            if((currentPage < totalPages - 1)  && (totalPages >= minSizeForElipse)){

                if((totalPages > minSizeForElipse) && (currentPage < totalPages - 2)){ 
                    str.push('<li class="a-pagination__page a-pagination--out-of-range">');
                    str.push('<a class="a-pagination__link disabled-link__ellipse"  href="#">...</a>');
                    str.push('</li>');     

                }
                str.push('<li class="a-pagination__page">');
                str.push('<a class="a-pagination__link" data-page="' + (totalPages) + '" href="#">' + totalPages + '</a>');
                str.push('</li>');
            }

            if ((totalPages > 1) && (currentPage < totalPages)) { 
                str.push('<li class="a-pagination__page a-pagination--next">');
                str.push('<a class="a-pagination__link" data-page="-2" href="#">');
                str.push('<em class="abt-icon abt-icon-right-arrow u-ltr"></em>');
                str.push('</a></li>');
            }

            if ((totalPages > 1) && (currentPage === totalPages) ){ 
                str.push('<li class="a-pagination__page a-pagination--next">');
                str.push('<a class="a-pagination__link disabled-link" data-page="-2" href="#">');
                str.push('<em class="abt-icon abt-icon-right-arrow u-ltr"></em>');
                str.push('</a></li>');
            }

           
            str.push('</ul>');
            str.push('</nav>');

         $paginationList.innerHTML =  "";
          if(totalPages  > 1) {
            $paginationList.innerHTML  = str.join('');
          }

         const $paginationLinkMn = document.querySelectorAll('.a-pagination__pages .a-pagination__link');
         ABT.Utils.attachEventToElementList($paginationLinkMn, 'click', goToPage);     

        }

        /**
         * @method
         * @desc go to the specific page
         */
           function goToPage(event) {
                event.preventDefault();
                const $clickedPageLink = event.target;
                clickedPageNumber = +($clickedPageLink.dataset.page);
                isFromPaginationClick = true;
                requiredTopScroll = true;
                if (clickedPageNumber === -1) { 
                    currentPage = (currentPage - 1);
                    isPrevClick = true;
                }

                if (clickedPageNumber === -2) { 
                    currentPage = (currentPage + 1);
                    isNextClick = true;
                }

                if(clickedPageNumber === 1) {
                    currentPage = 1;
                    isFirstPage = true; 
                }
                
                if(clickedPageNumber === totalPages) {
                    currentPage = totalPages;
                    isLastPage = true; 
                }

                if(!isFirstPage && !isLastPage && !isPrevClick && !isNextClick) {
                    currentPage = clickedPageNumber;
                    

                }
                getFilters();
    
        }
        
        /**
         * @method
         * @desc switch list/grid view for product cards 
         */
        function toggleView(event) {
            const $target = event.target;
            //if target is em, goto parent else it is a button
            const $viewButton = $target.tagName === 'EM' ? $target.parentElement : $target;
            const isListView = $viewButton.classList.contains('product-card__list-button');
            const $cards = $wrapper.querySelectorAll(isListView ? '.product-card__grid-view' : '.product-card__list-view');

            //click on list view button
            if(isListView) {
                $cards.forEach(function(card) {
                    card.classList.remove('product-card__grid-view','col-md-4');
                    card.classList.add('product-card__list-view','col-12');
                });
            }else {
            //click on grid view button
                $cards.forEach(function(card) {
                    card.classList.remove('product-card__list-view','col-12');
                    card.classList.add('product-card__grid-view','col-md-4');
                });
            }

            $viewSwitchButton.forEach(function(ele) {
                ele.classList.remove('active');
            });

            // set active
            $viewButton.classList.add('active'); 
            
            // save preference
            ABT.Utils.userPreference.set('preference', isListView ? 'list' : 'grid');
        }

        /**
         * @method
         * @desc getproducts list json from API 
         * @param {String} categoryFilter checked category value
         * @param {String} productTypeFilter checked product type value
         * @param {String} sortByVal sorting value for product list
         */


        var controller;
        var signal;

        function getProductsList(categoryFilter, productTypeFilter, sortByVal) {

            //make wrapper empty and show loading screen
            $wrapper.innerHTML = '';
            $paginationList.innerHTML = ""; 
            $noResultScreen.classList.add('d-none');
            $loadingScreen.classList.remove('d-none');
            $pageCntMsg.classList.add('hide');
            //abort last hit
            if(controller) {
                controller.abort();
            }
            controller = new AbortController();
            signal = controller.signal;

            firstResultParamForAPI = ( ((currentPage-1) * numberPerPage) + 1);
            firstResultStr = firstResultParamForAPI.toString();
            numberOfResultsStr = numberPerPage.toString();

            if(isAllSelected) {
                numberOfResultsStr = "";
            }
            
            //Make API call
            ABT.Http({
                //url: ABT.Config.endpoints.GET_PRODUCTS_LIST,
                url: $searchBtnWrapper.dataset.api,
                method: 'POST',
                headers: {
                    'x-id-token': ABT.Utils.getUser('token')
                },
                params: {
                    q: ABT.Utils.getQueryParam('q') || '', // query from Url
                    filters: [{category: categoryFilter || '', producttype: productTypeFilter || ''}],
                    firstresult: firstResultStr, // value will come from variable once pagination logic is applied
                    numberofresults: numberOfResultsStr,
                    autocorrect: true,
                    searchtype: 'sitesearch',
                    sort: sortByVal || "ASC",
                    
                },
                signal: signal
            }).then(handleProducts)
              .then(handlePagination);
         // handlePagination();
        }


        /**
         * @method
         * @desc get filter values 
         */
        function getFilters() {
            const sortVal = $sortByButton.dataset.value;
            //get category filters as a comma separated string
            let categoryFilter =  formatFilters($categoryCheks);
            
            //get product type filters as a comma separated string
            let productTypeFilter =  formatFilters($productTypeCheks);

            if(!isFromPaginationClick) {
                currentPage = 1;
            } else {
                isFromPaginationClick = false;
            }


           $pageSizeDiv.classList.add('hide');
           $pageCntMsg.classList.add('hide');
           getProductsList(categoryFilter, productTypeFilter, sortVal);                       
        }

        /**
         * @method
         * @desc format filters to comman separated string
         * @param {HTML_ELEMENT} checkElement 
         * @return {String} comma separated filter gstring
         */
        function formatFilters(checkElement) {
            
            //getting checked elements
            let selectedItems = Array.from(checkElement).filter( check => check.checked );

            //getting value of checked elements
            selectedItems = selectedItems.map( check => check.dataset.value)
            
            //adding escape charatcter if more that one filter
            if( selectedItems.length > 1 ) {
                selectedItems = selectedItems.map(check => `"${check}"`).join();
            } else {
                selectedItems = selectedItems.join();
            }
            
            return selectedItems;
        }

        /**
         * @method
         * @desc sort the product list on page 
         */
        function changeSortView(event) {
            const $link = event.target;
            const sortValue = $link.dataset.value;
            
            $link.previousElementSibling && $link.previousElementSibling.classList.remove('selected');
            $link.nextElementSibling && $link.nextElementSibling.classList.remove('selected');
            $link.classList.add('selected');
            $sortByButton.innerText = $link.innerText;
            $sortByButton.dataset.value = sortValue;

            getFilters();
        }

        /**
         * @function
         * @desc handles default category selection from query string in URL
         */
        function getDefaultCategory() {
            let categoryQuery = ABT.Utils.getQueryParam('category').toLowerCase();
            let didDefaultCategoryMatched = false;

            if(categoryQuery) {
                $categoryCheks.forEach(function(catCheckbox) {
                    if(catCheckbox.dataset.value.toLowerCase() === categoryQuery) {
                        catCheckbox.checked = true;
                        categoryQuery = catCheckbox.dataset.value;
                        didDefaultCategoryMatched = true;
                    }
                });
                
                if(!didDefaultCategoryMatched) {
                    categoryQuery = '';
                }
            }

            return categoryQuery;
        }

        /**
         * @method
         * @desc set the pagesize on the page 
         */
           function setPagesize(event) {
            event.preventDefault();
            $pageSizeDiv.classList.add('hide');
            isAllSelected =  false;
            const $sizelink = event.target;
            const sizeValue = $sizelink.dataset.value;
            requiredTopScroll = true;

            if($pagesizeByLink.length  >  0) {
                for(let elm =  0; elm < $pagesizeByLink.length; elm++){
                    $pagesizeByLink[elm].classList.remove('selected');
                }
            }
            
            $sizelink.classList.add('selected');
            $pagesizeByButton.innerText = $sizelink.innerText;
            $pagesizeByButton.dataset.value = sizeValue;
            if(sizeValue === "All") {
                numberPerPage =  +totalNumberOfProducts;
                isAllSelected = true;
            } else {
                numberPerPage = +sizeValue;
            }
           
            $paginationList.innerHTML= "";
            currentPage = 1;
            getFilters();

        }

        /**
         * @method
         * @desc Toggle Sort menu js 
         */
        function toggleSortMenu(event){
            event.stopPropagation();
            event.target.parentElement.classList.toggle('show');
            event.target.nextElementSibling.classList.toggle('show');
        }
            

        /**
         * @method
         * @desc initiate js 
         */
        function init() {
            if(!$wrapper) {
                return;
            }
            
            ABT.Utils.attachEventToElementList($sortToggleBtn,'click',toggleSortMenu);
            ABT.Utils.attachEventToElementList($showAsBtn,'click',toggleSortMenu);
            ABT.Utils.attachEventToElementList($viewSwitchButton, 'click', toggleView);
            ABT.Utils.attachEventToElementList($sortByLink, 'click', changeSortView);
            ABT.Utils.attachEventToElementList($categoryCheks, 'change', getFilters);
            ABT.Utils.attachEventToElementList($productTypeCheks, 'change', getFilters);
            ABT.Utils.attachEventToElementList($pagesizeByLink, 'click', setPagesize); 
            // set view-type
            const userPreference = ABT.Utils.userPreference.get('preference');
            const $viewByElm = document.querySelector(`.product-card__view span[data-type=${userPreference}]`);

            $viewByElm.click();
            const defaultCategory = getDefaultCategory();
            getProductsList(defaultCategory); 
        }

        init();

        window.addEventListener('click', function(event){   
            event.stopPropagation();
            try{
                if (!document.getElementById('sortbtn_cnt').contains(event.target)){
                    $sortToggleBtn[0].parentElement.classList.remove('show');
                    $sortToggleBtn[0].nextElementSibling.classList.remove('show');
                } 
                if (!document.getElementById('pagerbtn_cnt').contains(event.target)){
                    $showAsBtn[0].parentElement.classList.remove('show');
                    $showAsBtn[0].nextElementSibling.classList.remove('show');
                } 
            }catch(err){
                
            }
           
          });
    });
})();
