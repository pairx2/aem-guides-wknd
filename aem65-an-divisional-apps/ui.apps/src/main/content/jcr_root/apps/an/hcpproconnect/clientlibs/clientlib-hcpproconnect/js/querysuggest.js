let querySuggestHTML = `<div class="autocom-box">	</div>`;
$(querySuggestHTML).insertAfter(".a-search__input");

const searchWrapper = document.querySelector(".a-search");
const inputBox = searchWrapper.querySelector(".a-search__input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const mobSearch = document.querySelector('.o-header__mob-search .a-search__input');
const mobSuggBox = $(".o-header__mob-search").find(".autocom-box");
const mobIcon = $(".o-header__mob-search .a-search").find(".icon");

const stickySearch = document.querySelector('.o-header__sticky-search .a-search__input');
const stickySuggBox = $(".o-header__sticky-search").find(".autocom-box");
const stickyIcon = $(".o-header__sticky-search .a-search").find(".icon");

const searchboxForm = $('.a-search').find('form');
const searchResultAction = $(searchboxForm).attr('action');
let controller = new AbortController();
let signal = controller.signal;
let suggestions = [];

let myHeaders = new Headers();
myHeaders.append("x-application-id", $("input[name=x-application-id]").val());
myHeaders.append("x-country-code", $("input[name=x-country-code]").val());
myHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
myHeaders.append("Content-Type", "application/json");
let querySuggestAPI = $('#headerSearchSuggestApi').attr('data-api');

/// Javascript to display the query Suggestions below search Bar
$(inputBox).on('keyup',function(e){
	let userData = e.target.value;
    let emptyArray = [];
	if(controller)
    {
		controller.abort();
        controller = null;
    }
    if(userData){
		callQuerySuggestApi(userData);
        if($(".o-header__search").children().hasClass("a-search--expand")){
            $(".o-header__search").find(".a-search__input").css('border-bottom','1px solid #d9d9d6');
        }

		emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

		emptyArray = emptyArray.slice(0,5).map((data)=>{
            // passing return data inside li tag
            return `<li>${data}</li>`;
        });

		$(".a-search").addClass("active"); //show autocomplete box
        showSuggestions(emptyArray);
		let allList = suggBox.querySelectorAll("li");

		for (let i of allList) {
            //adding onclick attribute in all li tag
            i.setAttribute("onclick", "select(this)");
        }

	}
    else{
       $(".a-search").removeClass("active"); //hide autocomplete box
    }
});

$(mobSearch).on('keyup',function(e){
	let userData = e.target.value;
    let emptyArray = [];
	if(controller)
    {
		controller.abort();
        controller = null;
    }
    if(userData){
		callQuerySuggestApi(userData);
        if($(".o-header__mob-search").children().hasClass("a-search--expand")){
            $(".o-header__mob-search").find(".a-search__input").css('border-bottom','1px solid #d9d9d6');
        }
		emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

		emptyArray = emptyArray.slice(0,5).map((data)=>{
            // passing return data inside li tag
            return `<li>${data}</li>`;
        });

		$(".a-search").addClass("active"); //show autocomplete box
        showMobSuggestions(emptyArray);
		let allList = mobSuggBox.children("li");
		for (let i of allList) {
            //adding onclick attribute in all li tag
            i.setAttribute("onclick", "selectmob(this)");
        }
	}
    else{
       $(".a-search").removeClass("active"); //hide autocomplete box
    }
});


$(stickySearch).on('keyup',function(e){
	let userData = e.target.value;
    let emptyArray = [];
	if(controller)
    {
		controller.abort();
        controller = null;
    }
    if(userData){
		callQuerySuggestApi(userData);
        if($(".o-header__sticky-search").children().hasClass("a-search--expand")){
            $(".o-header__sticky-search").find(".a-search__input").css('border-bottom','1px solid #d9d9d6');
        }
		emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

		emptyArray = emptyArray.slice(0,5).map((data)=>{
            // passing return data inside li tag
            return `<li>${data}</li>`;
        });

		$(".a-search").addClass("active"); //show autocomplete box
        showStickySuggestions(emptyArray);
		let allList = stickySuggBox.children("li");
		for (let i of  allList) {
            //adding onclick attribute in all li tag
            i.setAttribute("onclick", "selectSticky(this)");
        }
	}
    else{
       $(".a-search").removeClass("active"); //hide autocomplete box
    }
});




let closeSearch = $(".o-header__search").find(".a-search--icon-right");
$(closeSearch).click(function () {
    let suggestionList =$(".o-header__search").find(".autocom-box").children();
    suggestionList.remove();
    $(".o-header__search").find(".a-search__input").css('border-bottom','none');
});

$('.o-header__search-overlay').click(function() {
    const suggList =$(".o-header__search").find(".autocom-box").children();
    suggList.remove();
    $(".o-header__search").find(".a-search__input").css('border-bottom','none');
});

function callQuerySuggestApi(queryKeyword){
        let raw = JSON.stringify({
          "q": queryKeyword,
          "suggestionType": "sitesearch",
        });
		controller = new AbortController();
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
		  signal: controller.signal,
          redirect: 'follow'
        };

        fetch(querySuggestAPI, requestOptions)
          .then(response => response.text())
          .then(function (result) {
              if(result){
              		let jsonResult = JSON.parse(result);
                  	let querySuggestion = jsonResult.response.completions;
					suggestions=[];
                  	querySuggestion.forEach(function(item) {
							suggestions.push(item.expression);
                    });
              }
              })
          .catch(error => console.log('error', error));
			//QuerySuggest API Call end
}
function select(element){
    let selectData = element.textContent;
	let url= searchResultAction+"?q="+selectData;
    location.href = url;			
    inputBox.value = selectData;
	$(".a-search").removeClass("active");
}

function selectmob(element){
    let selectData = element.textContent;
	let url= searchResultAction+"?q="+selectData;
	 location.href = url;
    mobSearch.value = selectData;
	$(".a-search").removeClass("active");
}

function selectSticky(element){
    let selectData = element.textContent;
	let url= searchResultAction+"?q="+selectData;
	 location.href = url;
    stickySearch.value = selectData;
	$(".a-search").removeClass("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        let userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

function showMobSuggestions(list){
    let listData;
    if(!list.length){
        let userValue = mobSearch.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    $(mobSuggBox).html(listData);
}

function showStickySuggestions(list){
    let listData;
    if(!list.length){
        let userValue = stickySearch.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    $(stickySuggBox).html(listData);
}
