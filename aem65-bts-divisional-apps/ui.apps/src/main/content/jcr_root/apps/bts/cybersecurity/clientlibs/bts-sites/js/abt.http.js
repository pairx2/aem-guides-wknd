/**
 * @module
 * @desc HTTP Module
 */

(function (ABT) {

    /**
     * @function
     * @desc prepares headers for the specific request
     * @param {Object} headers Plain Object containing header values in key-pair
     * @return {Headers} header object
     */
    function getHeaders(headers) {
        let requestHeaders = new Headers();
        const apiHeaders = ABT.Config.getRequestHeader();

        // Add app specific configured API headers to request
        for (const header in apiHeaders) {
            requestHeaders.set(header, apiHeaders[header]);
        }
       
        // Add token if available
        let token;

        if(sessionStorage.getItem('id.token') || localStorage.getItem('id.token')){
                token = sessionStorage.getItem('id.token') || localStorage.getItem('id.token');
        }else{
			
			 if(getCookie('id.token')){
				token = getCookie('id.token');
            }
         }

        if(token) {
            requestHeaders.set('x-id-token', token);
        }

        // Extend Headers from options
        for (let header in headers) {
            requestHeaders.set(header, headers[header]);
        }

        //
        return requestHeaders;
    }

    /**
     * @function
     * @desc converts object to query string
     * @param {Object} paramObj plain object containing key-value pair of params
     * @return {String} encoded query string 
     */
    function convertParams(paramObj) {
        if(!paramObj) {
            return '';
        }
        const keys = Object.keys(paramObj);
        let queryStringArr = keys.map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(paramObj[key]);
        });

        return queryStringArr.join('&');
    }

    /**
     * @function
     * @desc enables the event element button/link, mostly to be used for buttons/links
     * @param {HTML_ELEMENT} buttonElm button or link element
     */
    function enableButton(buttonElm) {
        if(!buttonElm) {
            return;
        }

        if(buttonElm.tagName === 'BUTTON'){
            buttonElm.disabled = false;
        } else if(buttonElm.tagName === 'A') {
            buttonElm.classList.remove('disabled');
        }
        
    }

    /**
     * @function
     * @desc disables the event element button/link, mostly to be used for buttons/links
     * @param {HTML_ELEMENT} buttonElm button or link element
     */
    function disableButton(buttonElm) {
        if(!buttonElm) {
            return;
        }

        if(buttonElm.tagName === 'BUTTON'){
            buttonElm.disabled = true;
        } else if(buttonElm.tagName === 'A') {
            buttonElm.classList.add('disabled');
        }
    }

    /**
     * @function
     * @desc Ajax call wrapper functions
     * @param {Object} options options object containing URL, method, headers etc... 
     * @param {HTML_ELEMENT} eventElement even occuring element (optional)
     * @return {PROMISE_OBJECT} Fetch promise
     */
    function makeAjax(options, eventElement) {
        let URL = options.url;
        let requestOptions = {
            method: options.method || 'POST',
            headers: getHeaders(options.headers),
            mode: 'cors',
            cache: 'no-cache'
        };

        //if we have to abort last service
        if(options.signal) {
            requestOptions.signal = options.signal;
        }

        // Disable Button
        disableButton(eventElement);

        // Add request params
        if(options.method === 'GET' && options.params) {
            URL += '?' + convertParams(options.params);
        } else {
            requestOptions.body = JSON.stringify(options.params);
        }

        // Makes the call and return the promise
        return fetch(URL, requestOptions)
            .then(function(response) {

                enableButton(eventElement);

                // on API success response
                if(response.ok) {
                    return response.json();
                }

                // return entire response in case of error
                return response;
            })
            .catch(function(error) {

                enableButton(eventElement);
                console.log('ERROR:', error);
            });
    }

    ABT.Http = makeAjax;

})(window.ABT || (window.ABT = {}));

