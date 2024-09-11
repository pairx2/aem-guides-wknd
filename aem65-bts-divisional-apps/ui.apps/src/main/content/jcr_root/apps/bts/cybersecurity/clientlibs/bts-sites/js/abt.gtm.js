/**
 * @module
 * @desc GTM Datalayer Module
 */

(function(ABT){

    ABT.gtm = (function(){
        const onLoadConfig = {
            'signin': {
                siteSection: 'user auth',
                pageName: 'sign in'
            },
            'register': {
                siteSection: 'user auth',
                pageName: 'register'
            },
            'password.reset': {
                siteSection: 'user auth',
                pageName: 'reset password'
            },
            'password.forgot': {
                siteSection: 'user auth',
                pageName: 'forgot password'
            },
            'home': {
                siteSection: 'home',
                pageName: 'home'
            },
            'product.list': {
                siteSection: 'products',
                pageName: 'products'
            },
            'product.info': {
                siteSection: 'info',
                pageName: ''
            },
            'product.vsi': {
                siteSection: 'vsi',
                pageName: ''
            },
            'search': {
                siteSection: 'search',
                pageName: 'search results'
            },
            'favorites': {
                siteSection: 'favorites',
                pageName: 'favorites'
            },
            'terms': {
                siteSection: 'terms',
                pageName: 'terms'
            },
            'error.404': {
                siteSection: 'error',
                pageName: '404 error page'
            },
            'error.500': {
                siteSection: 'error',
                pageName: '500 error page'
            }
        };

        const downloadConfig = {
            event: 'downloadEvent',
            eventCategory: 'Download',
            eventAction: '',
            eventLabel: ''
        }; 

        /**
         * @function
         * @desc identifies page type for on-load datalayer push
         * @return {String} pagetype
         */
        function identifyPage() {
            const path = location.pathname.toLowerCase();
            const pageUrlName = path.split('/').slice(-1)[0].replace('.html', '');
            const pageTypeMap = {
                'sign-in'           : 'signin',
                'register'          : 'register',
                'resetpassword'     : 'password.reset',
                'forgotpassword'    : 'password.forgot',
                'home'              : 'home',
                'products'          : 'product.list',
                'vsi'               : 'product.vsi',
                'info'              : 'product.info',
                'search'            : 'search',
                'favorites'         : 'favorites',
                'terms'             : 'terms',
                'notifications'     : 'notifications'
            };
            const defaultPageType = pageTypeMap['sign-in']; // for the main landing page of the site

            // get page type from the page URL map
            let pageType = pageTypeMap[pageUrlName];

            // When custom use-cases
            if(pageUrlName === '') {
                pageType = defaultPageType;
            } else if(path.includes('/secure/products/vsi')) {
                pageType = 'product.vsi';
                //this page will come from page url dynamically
                onLoadConfig[pageType].pageName = pageUrlName.replace(/-/g, ' '); //all '-' sign should replace with space
            } else if(path.includes('/secure/products/info')) {
                pageType = 'product.info';
                onLoadConfig[pageType].pageName = pageUrlName.replace(/-/g, ' '); //all '-' sign should replace with space
            }
            
            //incase page is not found or having 500 error
            if(document.title === '404') {
                pageType = 'error.404';
            } else if(document.title === '500') {
                pageType = 'error.500';
            } else if (document.title === 'sign-in') {
                pageType = defaultPageType; // incase user try to access secure pages without login
            }

            // final page type
            return pageType;
        }

        /**
         * @function
         * @desc pushes the datalayer to GTM
         * @param {String} event event on which data get pushed in layer 
         * @param {Object} dataObj dataObj to be pushed in layer 
         */
        function push(event, dataObj) {
            let data = {};
            
            if(event === 'pageLoad') {
                data = dataObj;
            } else if(event === 'download') {
                Object.assign(data, downloadConfig, dataObj);
            }
         
            // validation
            if(!data) { 
                return;
            }

            // add the datalayer Array fallback
            window.dataLayer = window.dataLayer || [];

            // push
            dataLayer.push(data);
        }

        // on load push datalayer based on page type
        (function(){
            const pageType = identifyPage();
            push('pageLoad', onLoadConfig[pageType]);
        })();

        // make the push method public
        return push;
    })();

})(window.ABT || (window.ABT = {}));

