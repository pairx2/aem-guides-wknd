let cfpattern=/(<([^>]+)>)/ig;
function user_Login( isLiteUser ){
    if(isUserLoggedIn() || isLiteUser === 'true') {
        $(this).find('.cmp-contentfragment__element--logo').hide();
    }

    if(isLiteUser === 'true') {
        let publicLink = $(this).parent('.article-anchor').attr('href');

        if (publicLink) {
            publicLink = publicLink.replace('/secure/', '/public/');
            $(this).parent('.article-anchor').removeAttr('href');
            $(this).parent('.article-anchor').attr('href', publicLink);
        }
    }
}

function unMatchcards_Flag (unMatchedCards,productTitleContentFragment ){
    if(unMatchedCards.includes(productTitleContentFragment))
    {
       let index = unMatchedCards.indexOf(productTitleContentFragment);
        if (index !== -1) {
            unMatchedCards.splice(index, 1);
        }
    }
    return unMatchedCards;
}

function matchItem(item){
    $('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function()
    {
        let  productTitleContentFragment = $(this).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').text().trim();
        if(item == productTitleContentFragment){
            $(this).hide();
            $(this).removeClass("matched");
        }
    });
}

function postData(result){
    let searchResultJson;

    if(result){
 
        let jsonResult = JSON.parse(result);
        searchResultJson = jsonResult;
        sessionStorage.setItem("searchResults", JSON.stringify(searchResultJson));

        let count = searchResultJson.response.totalCount;

           if(count ==0)
           {
               $('.a-contentfragmentlist--base').hide();
               $("#nosearchresultsfoundtext").show();
               $("#sort-by-options").hide();
               $("#page-sort").css("padding-bottom", "0.5rem");     // HCP-478 to align horizontal line below show results
               $('#showResultCount').hide();
               $('#showZeroResults').show();
               $('#product-resource').show();
               sessionStorage.removeItem("searchResults");
               hideLoading();
           }
           else{
                $("#page-sort").css("padding-bottom", "0");         // HCP-478 to align hroizontal line below show results
                showHideCardsSearch(searchResultJson);
           }
           $("#beforeAPICall").hide();
       }
}
function product_TitleFlag (unMatchedCards,productTitleContentFragment, matchedCards  ){
   let index = unMatchedCards.indexOf(productTitleContentFragment);
    
    if (index == -1 && !matchedCards.includes(productTitleContentFragment)) {
        unMatchedCards.push(productTitleContentFragment);
    }
    return unMatchedCards;
}


function liteUser_Reduce (anchorHref){
    if (anchorHref) {
        $('.a-contentfragmentlist--base article.cmp-contentfragment').each(function(index, value) {
         $(this).wrap(`<a class="article-anchor matched" href=${anchorHref[index]+".html"}></a>`);
         });
     }
  
     let customAnchorHref = [];
     $('#custom-contentFragment article.cmp-contentfragment, #custom-contentFragment1 article.cmp-contentfragment, #custom-contentFragment2 article.cmp-contentfragment, #custom-contentFragment3 article.cmp-contentfragment, #custom-contentFragment4 article.cmp-contentfragment').each(function() {
         customAnchorHref.push($(this).find('.cmp-contentfragment__element--contentReference .cmp-contentfragment__element-value').text().trim());
         $(this).find('.cmp-contentfragment__element--contentReference .cmp-contentfragment__element-value').hide();
     })
     if (customAnchorHref) {
        $('#custom-contentFragment article.cmp-contentfragment, #custom-contentFragment1 article.cmp-contentfragment, #custom-contentFragment2 article.cmp-contentfragment, #custom-contentFragment3 article.cmp-contentfragment, #custom-contentFragment4 article.cmp-contentfragment').each(function(index, value) {
         $(this).wrap(`<a class="article-anchor" href=${customAnchorHref[index]+".html"}></a>`);
         });
     }
  
     // hCP Proconnect Sample Available Change:
     $('article.cmp-contentfragment').each(function() {
         $(this).find('.cmp-contentfragment__element--sampleAvailable').hide();
         let externalLink = $(this).find('.cmp-contentfragment__element--logolink .cmp-contentfragment__element-value').text().trim();
         $(this).find('.cmp-contentfragment__element--logolink .cmp-contentfragment__element-value').hide();
  
         if("" != externalLink) {
             $(this).parent(".article-anchor").attr('data-redirect-confirm',"true");
             $(this).parent(".article-anchor").attr('href', externalLink);
         } else {
             let contentReferrence = $(this).find('.cmp-contentfragment__element--contentReference .cmp-contentfragment__element-value').text().trim();
  
             if(contentReferrence.includes("/secure/")) {
                 let isLiteUser = sessionStorage.getItem('lite-user');
                 $(this).find('.cmp-contentfragment__element--logo').addClass('lockedIconContentFrag');
  
                user_Login(isLiteUser );
             }
             else if(contentReferrence.includes("/public/")){
				let isLiteUser = sessionStorage.getItem('lite-user');
				if(isUserLoggedIn() || isLiteUser === 'true') {
					$(this).find('.cmp-contentfragment__element--logo').hide();
                }
			}
         }
     });
}
 function focusedSearch_flag(filter){
    let focusedSearchOptions = $('#focusedSearchResults-options').find('.a-checkbox');
    let idArray=[];
    $(focusedSearchOptions.find('.a-checkbox__input')).click(function () {
 
        $(this).each(function(i) {
            let id = $(this)[i].getAttribute("id");
            let checked = $("#" + id).prop("checked");
 
            if (checked)
                idArray.push("#"+id);
        });
 
        let currentFilter = $(this).siblings('.a-checkbox__text').text();
 
        if (null != sessionStorage.getItem('searchResults')) {
            let searchResultItems = JSON.parse(sessionStorage.getItem('searchResults'));
 
            if ($(this).prop("checked")) {
               filter.push(currentFilter);
            } else {
               filter.splice(filter.indexOf(currentFilter), 1);
            }
 
            if(filter.length > 0)
                getFocusedSearchResuts(searchResultItems, filter);
            else
                showHideCardsSearch(searchResultItems);
        }
    });
    return idArray;
 }
 function getFocusedSearchResuts(jsonArray, focusedSearchType){
    if(jsonArray)
    {
      let  productResults = jsonArray.response.results;
       let unMatchedCards = [];
       let matchedCards = [];
        $('#sort-by-options').show();
        $('#showResultCount').show();
        $('#showZeroResults').hide();

        $('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function()
        {
            $(this).show();
            $(this).addClass("matched");

        });

        productResults.forEach(function(item) {
        let productTitlefromAPI = item.systitle.trim().replace( cfpattern, '');
        let contentTypefromAPI = item.contenttype;

        $('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function() {
          
            let productTitleContentFragment = $(this).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').text().trim();


                    if(productTitlefromAPI === productTitleContentFragment && focusedSearchType.includes(contentTypefromAPI)){

                    unMatchedCards =    unMatchcards_Flag(unMatchedCards,productTitleContentFragment);

                    matchedCards.push(productTitleContentFragment);
                    }
                    else{
                        unMatchedCards =  product_TitleFlag(unMatchedCards,productTitleContentFragment, matchedCards);
                     }

        });
    });
    unMatchedCards.forEach(function(item) {
        matchItem(item);
    });
    hideLoading();
    showPagination();

}
}
 function numberCardPage(noOfCardsPerPage){
        let pageHTML = `<nav aria-label="Page navigation">
        <ul class="pagination"></ul>
        </nav>`;
    let numberOfItems = $(".article-anchor").length;
    if(numberOfItems > noOfCardsPerPage)
    //$( pageHTML ).insertAfter( ".contentfragmentlist section" ); SB HCP - bugfix-399
    $( pageHTML ).insertAfter("#product-resource");
    else
    {
    $("#startIndex").text(1);
    $("#endIndex").text(numberOfItems);
    $("#totalCount").text(numberOfItems);
    }
 }
 function queryParam_Check(){
    let query = "";
    let isQueryPresent = hasUrlParameter("q");
     console.log("isQuryPresnt: " + isQueryPresent);
     if(isQueryPresent)
     {
       query = getUrlParameter("q");
       }
       return query;
 }
let noOfCardsPerPage = $('#noOfCardsPerPage').val();
    $(document).ready(function() {
      
        $("#nosearchresultsfoundtext").hide();
        $('.contentfragmentlist').addClass("a-contentfragmentlist--expert a-contentfragmentlist--base");
 
    let anchorHref = [];
    $('article.cmp-contentfragment').each(function() {
        anchorHref.push($(this).find('.cmp-contentfragment__element--contentReference .cmp-contentfragment__element-value').text().trim());
        $(this).find('.cmp-contentfragment__element--contentReference .cmp-contentfragment__element-value').hide();
    })
    liteUser_Reduce(anchorHref);
 
    //focusedSearchResults
    let filter = [];
    let idArray = focusedSearch_flag(filter);
     
 
// Get Number of cards per page:
let currentUrl = window.location.href;
if (currentUrl.indexOf("search") >= 0) {
    callSearchResultApi("");
}

 function callSearchResultApi(filterApi) {
    showLoading();
    let  query = queryParam_Check();
 
       let myHeaders = new Headers();
 
        myHeaders.append("x-application-id", $("input[name=x-application-id]").val());
        myHeaders.append("x-country-code", $("input[name=x-country-code]").val());
        myHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
        myHeaders.append("Content-Type", "application/json");
 
        let sitesearchAPI = $('.cmp-contentfragmentlist').attr('searchapiendpoint');
 
 
        let raw = JSON.stringify({
          "q": query,
          "filters": [
              {"contenttype" : filterApi.toString()}
          ],
          "autocorrect": "true",
          "searchtype": "sitesearch",
          "sort": []
        });
 
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch(sitesearchAPI, requestOptions)
          .then(response => response.text())
          .then(function (result) {
 
           postData(result);
          })
          .catch(error => console.log('error', error));
 
    }
 
        $('#reset-filter').click(function(){
            resetFilters(idArray);
        });
 
        function resetFilters(idArrayVal){
            $(idArrayVal).each(function(i){
                $((idArrayVal)[i]).prop("checked",false);
             });
            filter=[];
            let searchResults = JSON.parse(sessionStorage.getItem('searchResults'));
 
            showHideCardsSearch(searchResults);
 
        }
 
       // START SB -HCP - Pagination, appending to HTML
     numberCardPage(noOfCardsPerPage);
       // END
 
});
function showHideCardsSearch(jsonArray){
    if(jsonArray)
    {
        let unMatchedCards = [];
        let matchedCards = [];
        $('#sort-by-options').show();
        $('#showResultCount').show();
        $('#showZeroResults').hide();


        let productResults = jsonArray.response.results;
        $('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function()
        {
            $(this).show();
            $(this).addClass("matched");
        });

        productResults.forEach(function(item) {
            let productTitlefromAPI = item.systitle.trim().replace( cfpattern, '');

            $('.a-contentfragmentlist--expert section.cmp-contentfragmentlist .article-anchor').each(function() {
                let productTitleContentFragment = $(this).find('.cmp-contentfragment__element--heading .cmp-contentfragment__element-value').text().trim();


                        if(productTitlefromAPI == productTitleContentFragment){

                        unMatchedCards =  unMatchcards_Flag(unMatchedCards,productTitleContentFragment);

                        matchedCards.push(productTitleContentFragment);
                        }
                        else{
                        unMatchedCards =  product_TitleFlag(unMatchedCards,productTitleContentFragment, matchedCards);
                        
                        }
            });
        });

        unMatchedCards.forEach(function(item) {
            matchItem(item);
        });
        hideLoading();
        $('#product-resource').show();
        showPagination();

    }
}
