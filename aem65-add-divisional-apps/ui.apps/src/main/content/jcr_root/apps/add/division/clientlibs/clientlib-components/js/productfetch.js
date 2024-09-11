
var applicationid = "transfusion";


var base_url = document.querySelector('#session-api-url').value;
var temp=document.createElement("a"); 
temp.href = base_url; 
base_url = temp.origin
var productDetails = `${base_url}/quality/api/public/products`;

(function($) {
$(document).ready(function(){

    var selectedprdid = $('input[name="productList"]').val();

	 $.ajax({
            url: productDetails,
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json;charset=UTF-8",
     data: JSON.stringify({ type:"product", productId: selectedprdid }),

            "headers": {
            "x-application-id": "transfusion",
            "x-country-code": "US",
            "x-preferred-language": "en_US"

        },
		success: function(responseVal) {

             if(responseVal){
                var mainTable= responseVal.response.segmentColumns
                var arrayTable = []

                for(var i=0; i<mainTable.length; i++){
                     arrayTable.push(mainTable[i]["segments"])
                }
                
                for(var j=0; j<arrayTable.length; j++){
                    for(var k=0; k<arrayTable[j].length; k++){
                        var table = document.createElement('table');
						var th =  document.createElement('th');

						var header = document.createTextNode(arrayTable[j][k]["name"]);
						th.appendChild(header);
						table.appendChild(th);

                        for (var m = 0; m < arrayTable[j][k]["tests"].length; m++){
    						var tr = document.createElement('tr');   
    						var td1 = document.createElement('td');
    						var rowText = document.createTextNode(arrayTable[j][k]["tests"][m]["name"]);
    
    						td1.appendChild(rowText);
   							tr.appendChild(td1);
    						table.appendChild(tr);

						}

							$('#product-table').append(table)


                    }
                }
            }

		},
		error: function(error) {}
	});
})
})(jQuery);
