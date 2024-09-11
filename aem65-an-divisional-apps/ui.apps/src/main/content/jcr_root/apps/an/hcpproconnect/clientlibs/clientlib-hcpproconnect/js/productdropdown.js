if (($('#sampleFormContainer').length != 0) && ($("input[name=x-country-code]").val() == "TH")){

let prdData = "";

let dropdownMenu = `<ul class="a-dropdown__menu" name="sample"></ul>`;
$('#productDropdown-options').find('.a-dropdown__field').append(dropdownMenu);

let sitesearchAPI = $('#headerSearchSuggestApi').attr('data-api');
let domainName = sitesearchAPI.split('api')[0];
let productApi = "api/public/products";
let fetchProduct = domainName.concat(productApi);

let prdHeaders = new Headers();
prdHeaders.append("x-application-id", $("input[name=x-application-id]").val());
prdHeaders.append("x-country-code", $("input[name=x-country-code]").val());
prdHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
prdHeaders.append("Content-Type", "application/json");

let raw = "";

let requestOptions = {
  method: 'POST',
  headers: prdHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(fetchProduct, requestOptions)
  .then(response => response.text())
  .then(function (result) {
      if(result){
          let jsonResult = JSON.parse(result);
          let productsResult = jsonResult.response;
            productsResult.forEach(function(item) {
            prdData = `<li data-optionvalue="${item.productId}"><span>${item.productName}</span></li>`;
                $('#productDropdown-options').find('.a-dropdown__menu').append(prdData);
                    });
              }
              })
  .catch(error => console.log('error', error));
}