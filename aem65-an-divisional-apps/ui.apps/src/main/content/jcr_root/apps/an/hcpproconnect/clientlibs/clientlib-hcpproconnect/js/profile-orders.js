if ($('#ordersTable').length != 0){

	let sitesearchAPI = $('#headerSearchSuggestApi').attr('data-api');
    let domainName = sitesearchAPI.split('api')[0];
    let getordersApi = "api/private/order/orders";
    let getOrders = domainName.concat(getordersApi);

    const idToken = getCookie('jwtToken');

    let orderHeaders = new Headers();
    orderHeaders.append("x-application-id", $("input[name=x-application-id]").val());
    orderHeaders.append("x-country-code", $("input[name=x-country-code]").val());
    orderHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
    orderHeaders.append("x-id-token", idToken);
    orderHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: orderHeaders,
        redirect: 'follow'
    };

    fetch(getOrders, requestOptions)
        .then(response => response.text())
        .then(function (result) {
            if(result){
                let jsonResult = JSON.parse(result);
                let ordersResult = jsonResult.response;

                localStorage.setItem("orderdetails", JSON.stringify(ordersResult));
				let ordersJson = JSON.parse(localStorage.getItem("orderdetails"));

				ordersJson.sort((a, b) => {
                      return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
                    })						   
				for (let i in ordersJson){
                    sessionStorage.setItem("orderincreamnet",i);
                    
                  let tablebody = $('#ordersTable').find('tbody');
                  tablebody.append(`<tr class="dynamicRow" style="display: table-row;">
                                     <td id="sample" style="text-align: left;"></td>
                                     <td id="quantity" style="text-align: center;"></td>
                                     <td id="orderdate"></td>
                                     </tr>`);


                   $('#ordersTable tbody').children('.dynamicRow').each(function(count){
                      $(this).attr("id", "row " + count);
                      $(this).find('#sample').text(ordersJson[count].sample);
                      $(this).find('#quantity').text(ordersJson[count].quantity);
                      $(this).find('#orderdate').text(ordersJson[count].orderDate.substring(0, 10).split("-").reverse().join("-"));
                      
                    });

                    if($('#dashboardOrders').length != 0){
                     	$('#profileoverview #ordersTable tbody').find('tr:nth-child(n+5)').css('display','none');
                    }
                    sessionStorage.removeItem("orderincreamnet");
                }
				orderPagination();
        	}
    	})
    	.catch(error => console.log('error', error));

}

