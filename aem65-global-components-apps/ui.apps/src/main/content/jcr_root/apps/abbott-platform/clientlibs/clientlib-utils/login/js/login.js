/**
 * 
 * Scripts for login functionality that are to be preloaded come here.
 * Embed this category in site-specific clientlibrary.
 */
       
        
        const REQUEST_HEADERS = {
				'Content-Type': 'application/json'
            };

		/** 
        	Query parameter function that allows + symbol to be accepted in the query parameter without replacing it with space.
        **/
		function getUrlParameter(name) {
            name = name.replace(/\[/, '\\[').replace(/\]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1]);
        }


		/**
         * Summary: Update form body with token value. 
         * Description: Use this function in Form container's "Update Request Function" field 
         * 				to pass the token query parameter via the form body.
         * 
         */ 
        function updateOnResetRequest(){

            const tokenValue = getUrlParameter("token");

            return {
                body: {
                    'resetToken': tokenValue
                }
            };
			
	    }
		
       /**
		* Summary: Set request headers. Configurations fetched from site level settings.
		* 
		*/ 
        function setApiHeaders() {
			const headerElms = document.querySelectorAll('input[data-header][type=hidden]');
            headerElms.forEach(function(headerElm) {
                const name = headerElm.getAttribute('name');
                const value = headerElm.value;
                REQUEST_HEADERS[name] = value;
            });
        }
        
       /**
		* Summary: Returns header value for key. 
		* 
		*/ 
        function getRequestHeader(key) {
            if(key) {
                return REQUEST_HEADERS[key] || '';
            }


            return REQUEST_HEADERS;
        }

        /**
         * @function
		 * Summary: Called on successful login to drop cookies at browser. 
		 * Description: Use this function in Form container's "On Success Function" field to
		 * the update session cookie.
		 * 
		 */ 
		function onSuccessUserLogin(data) {
			$('#user-login').find('.o-form-container__success-msg').html('');

			if (data.errorCode == 0) {
				let jwtToken = data.response.jwtToken.id_token;
		        let sessionApiUrl=$('#session-api-url').val();
		        localStorage.setItem('id.token', jwtToken);
				localStorage.setItem('dynamicEmail', $('input[type=email]').val());
				setApiHeaders();
				updateSessionCookie(sessionApiUrl,true);
		
			} 
		}

		 /**
		 * @function
		 * Summary: Update session cookie. 
		 * Parameters :  apiEndpoint is the end-point for session API.
		 *               enableValue if session cookie has to be created or removed. 
		 * 
		 */
		 function updateSessionCookie(apiEndpoint,enableValue) {
			 
	     let onSuccessRedirectLink;

            if(enableValue){
                const wcmmodeChk = getCookie("cq-authoring-mode");
                if (!wcmmodeChk){
                    onSuccessRedirectLink =	$('.hidden input[name="loginRedirectLink"]').val();

                }else{
                    onSuccessRedirectLink = $('.hidden input[name="loginRedirectLinkAuthor"]').val();

                }

             }else{
                 onSuccessRedirectLink= $('.login-link a').attr('href');

             }
			 
		 const requestOptions = {
		  method: 'GET',
		  headers: {
			'Content-Type': getRequestHeader('Content-Type'),
			'x-id-token':  localStorage.getItem('id.token'),
			'x-application-id' : getRequestHeader('x-application-id'),
			'x-country-code': getRequestHeader('x-country-code'),
			'x-preferred-language': getRequestHeader('x-preferred-language'),
		  },
		 mode: 'cors',
		 cache: 'no-cache',

		};
		fetch(apiEndpoint+"?enable="+enableValue, requestOptions)
		.then(function(response) {

			// on API success response
			if(response.status === 200){
				window.location.href=onSuccessRedirectLink;
            }



			return response;
		})
		.catch(function(error) {

			console.log('ERROR in session API :', error);
		});
		       
		
		
		
		}
