    
	function searchfiltercheck(filterSearch){
		if(filterSearch.has("filter")) {
			let filterSearchValue = filterSearch.get("filter").toLowerCase();
			$(".a-checkbox__input:not([name='RememberMyChoice'])").each(function(){
				if($(this).attr("data-checkbox-name").toLowerCase() === filterSearchValue) {
					if($(this).closest(".a-checkbox").parent().hasClass("collapse") && !$(this).closest(".a-checkbox").parent().hasClass("show")){
						$(this).closest(".a-checkbox").parent().addClass("show");
						if($(this).closest(".options").next(".button.link").find("a").is(":visible")) {
							$(this).closest(".options").next().find("a").attr("aria-expanded","true");
							$(this).closest(".options").next().find("a .downIcon").addClass("d-none");
							$(this).closest(".options").next().find("a .upIcon").addClass("d-inline");
						}
						else if($(this).closest(".options").next(".button.link").next(".button.link").find("a").is(":visible")) {
							$(this).closest(".options").next().next().find("a").attr("aria-expanded","true");
							$(this).closest(".options").next().next().find("a .downIcon").addClass("d-none");
							$(this).closest(".options").next().next().find("a .upIcon").addClass("d-inline");
						}
					}
					$(this).trigger("click");
				}
			});
		}
	}
	function callSearchApi(contenttype){
		let query = "";
		let isQueryPresent = hasUrlParameter("q");
		
	    let currentUrl = window.location.href;
        let practice = currentUrl.substring(currentUrl.indexOf("/home")+6, currentUrl.indexOf("/"+contenttype));
        let aplicationId = $("input[name=x-application-id]").val();
        let countryCode = $("input[name=x-country-code]").val();
        let countryCodelowercase = countryCode.toLowerCase();
        let division = aplicationId.slice(0,2);
        let sitename = aplicationId.slice(2);
        let tagToBeApplied = "";

		
		if(practice.length>1)
			{
				tagToBeApplied = division + ":" + sitename + "/"+ countryCodelowercase + "/"+ contenttype + "/" + practice;
			}
		if (isQueryPresent) {
		 query = getUrlParameter("q");
		}
		if(!contenttype){
			 contenttype="";
	}

		let myHeaders = new Headers();
		myHeaders.append("x-application-id", $("input[name=x-application-id]").val());
		myHeaders.append("x-country-code", $("input[name=x-country-code]").val());
		myHeaders.append("x-preferred-language", $("input[name=x-preferred-language]").val());
		myHeaders.append("Content-Type", "application/json");

		let sitesearchAPI = $('.cmp-contentfragmentlist').attr('searchapiendpoint');
		if(sitesearchAPI != null && sitesearchAPI != undefined) {
			let raw = JSON.stringify({
				"q": query,
				"filters": [{"contenttype":contenttype,
							"tags": tagToBeApplied
				}],
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
			showLoading();
			fetch(sitesearchAPI, requestOptions)
				.then(response => response.text())
				.then(function(result) {
					if (result) {
						let jsonResult = JSON.parse(result);
						let searchResultJson = jsonResult;
						localStorage.setItem("response",JSON.stringify(searchResultJson));
						if (currentUrl.indexOf("resources") >= 0) {
							resourceResponseFilters();
							$("#beforeAPICall").hide();
							let filterSearch = new URLSearchParams(window.location.search);
							searchfiltercheck(filterSearch);
						}
						else if (currentUrl.indexOf("products") >= 0) {
							productResponseFilter();
							$("#beforeAPICall").hide();
						}
						
						
					}
				});
		}
	}

