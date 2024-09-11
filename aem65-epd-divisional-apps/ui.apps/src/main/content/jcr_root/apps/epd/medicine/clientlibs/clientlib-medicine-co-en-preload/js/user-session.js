$(document).ready(function() {    


    var headerLanguage = document.querySelector('input[name="x-preferred-language"]').value;
	var headerCountryCode = document.querySelector('input[name="x-country-code"]').value;
	var headerApplicationId = document.querySelector('input[name="x-application-id"]').value;
    setTimeout(function(){
		if(getCookie("id.token").length>0){
           if(localStorage?.getItem('firstName')){	
                var profileName = localStorage?.getItem('firstName').toUpperCase();
                $('.myprofile-linkstack .a-link--icon-right .a-link__text').text(profileName)
                $('.myprofile-linkstack .a-link--icon-right .a-link__text').append("<em class='abt-icon abt-icon-down-arrow' aria-hidden='true'></em>");
                $('.myprofile-linkstack').show();
            }
		}
		var currenturlSso = window.location.href;
		if(getCookie("id.token").length>0 && currenturlSso.includes("profile.html")){
            var token = decodeJWT(getCookie("id.token"));
			var timeDiff = new Date(token.payload.exp * 1000) - new Date();
			var remainingMinutes = (Math.floor(timeDiff / 60)) / 1000;

            if(remainingMinutes > 0 && remainingMinutes <= 60){
				$.ajax({			
                    url: '/api/private/profile/extend-session',
                    type: "POST",
                    dataType: 'json',
                    contentType: "application/json;charset=UTF-8",
        
                    "headers": {
                    'x-id-token':  getCookie('id.token'),
                    'x-application-id': headerApplicationId,
                    'x-country-code': headerCountryCode,
                    'x-preferred-language': headerLanguage,
    
                    },
                    success: function(data) {
                        if (data.errorCode == 0) {
                        let jwtToken = data.response.response.id_token;
                        setCookie('id.token', jwtToken, ''); 
                      }
                    },
                    error: function(error) {  

                    }
                });
            }

            var current_time = new Date().getTime() / 1000;
			if (current_time > token.payload.exp) { 
              window.location.href =  window.location.origin + "/co/en/login.html";
            }			
        }
    },500)		

});
function decodeJWT(string){
    var arr = string.split('.');
    return { header: JSON.parse(atob(arr[0])), payload: JSON.parse(atob(arr[1])), secret: arr[2] }
}