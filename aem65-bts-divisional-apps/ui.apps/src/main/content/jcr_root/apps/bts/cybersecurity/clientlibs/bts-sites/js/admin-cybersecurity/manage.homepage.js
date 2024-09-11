/**
 * @module
 * @desc Display Homepage  
 */

 (function (ABT) {

    document.addEventListener('DOMContentLoaded', function () {

    if(document.getElementById('admin-homepage') != null) {
		
		/**
		 * @method
		 * @desc get count of products
		 */
		ABT.Http({
			url: ABT.Config.endpoints.GET_ACTIVE_PROD_LIST,
			method: 'GET',
			params: {
				action: 'summary'
			}
		}).then(function(data) {
			$.map(data.response, function(key, value) {
				document.querySelector('#total-products').innerText = data.response[value].totalProductCount;
				document.querySelector('#enrolled-in-cybersec-count').innerText = data.response[value].enrolledInCyberSecCount;
				document.querySelector('#not-enrolled-in-cybersec-count').innerText = data.response[value].notEnrolledInCyberSecCount;
                                       
			});
		})
      
      	 /**
		 * @method
		 * @desc get count of users
		 */
      
        ABT.Http({
          url: ABT.Config.endpoints.EXPORT_USER_REPORT,
          method: 'POST',
          params: {
              action: 'countUserPermission'
          }
      }).then(function(data) {
          document.querySelector('#total-no-of-users').innerText = data.response.totalNoOfUsers;
          document.querySelector('#active-users').innerText = data.response.activeUsers;
          document.querySelector('#pending-users').innerText = data.response.pendingUsers;
          document.querySelector('#expired-users').innerText = data.response.expiredUsers;
      })
    }

    });

})(window.ABT || (window.ABT = {}));
