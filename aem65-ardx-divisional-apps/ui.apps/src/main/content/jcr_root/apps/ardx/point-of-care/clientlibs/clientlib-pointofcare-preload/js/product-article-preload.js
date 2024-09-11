/**
Due to 'WW' not being a valid country-code,
For ESL integrations, 'US' country-code will be re-purposed ,
and filteration will happen on search-type '<search-type>global'.
*/

let isWWSite = false;
updateCountryCodeForWorldwideSite();
function updateCountryCodeForWorldwideSite(){	
	let countryCodeField = document.querySelector("input[name=x-country-code]");
	let countryCode = countryCodeField?.value;
	if (countryCode === "WW") {
		isWWSite = true;
		document.querySelector("input[name=x-country-code]").value = "US";
	} else if(!countryCodeField) {
		setTimeout(function () {
		  updateCountryCodeForWorldwideSite();
		}, 0);		
	}
}
bindSiteSpecificDynamicProps();
function bindSiteSpecificDynamicProps() {
  let searchFilters = document.querySelector('[data-js-component="search-results-with-filters"]');
  let searchResultFilters = document.querySelector('[data-js-component="search-results"]');  
  if (searchFilters || searchResultFilters) {
    updateSiteSpecificDynamicProps();
  } else {
	  if (document.readyState !="complete") {
			setTimeout(function () {
			  bindSiteSpecificDynamicProps();
			}, 0);		  
	  }
  }
}

function updateSiteSpecificDynamicProps() {
  let searchFilterAtrributes = document.querySelector(
    '[data-js-component="search-results-with-filters"]'
  );
  let searchResultAtrributes = document.querySelector(
    '[data-js-component="search-results"]'
  );  
  if (searchFilterAtrributes || searchResultAtrributes){	  
	  if (isWWSite) {
		/**
		Due to 'WW' not being a valid country-code,
		For ESL integrations, 'US' country-code will be re-purposed ,
		and filteration will happen on search-type '<search-type>global'.
		*/
		callSearchFilter(searchFilterAtrributes, searchResultAtrributes);
			
	  }
	  let allTagsValue = document.querySelector("meta[name=meta-page-tags-id]")?.content;
	  let brandTagsValue = document.querySelector("meta[name=meta-page-brand-tags-id]")?.content;
	  let str_value = searchFilterAtrributes.getAttribute("data-search-filters");
	  str_value = str_value.replace("categorytagfacets","tags");
	  if (str_value.indexOf("CURRENT_PAGE_BRAND_TAGS") >= 0 && brandTagsValue) {
		  let brandTagsValForSearch = joinMultipleTagsForSearch(brandTagsValue)
		  str_value = str_value.replace("CURRENT_PAGE_BRAND_TAGS", brandTagsValForSearch);
		  /**
		  Apply additional filtering based on tag title to avoid matches due to substring match in tag-ids.
		  Append, tag-title name filter based on 'categorytagfacets' field in Coveo.
		  */
		  str_value = str_value.replace("]",',{"categorytagfacets":"'+joinMultipleTagsForSearch(document.querySelector("meta[name=meta-page-brand-tags]")?.content)+'"}]');		  
	  }	  
	  if (str_value.indexOf("CURRENT_PAGE_TAGS") >= 0 && allTagsValue) {
		  let allTagsValForSearch = joinMultipleTagsForSearch(allTagsValue)
		  str_value = str_value.replace("CURRENT_PAGE_TAGS", allTagsValForSearch);
		  /**
		  Apply additional filtering based on tag title to avoid matches due to substring match in tag-ids.
		  Append, tag-title name filter based on 'categorytagfacets' field in Coveo.
		  */
		  str_value = str_value.replace("]",',{"categorytagfacets":"'+joinMultipleTagsForSearch(document.querySelector("meta[name=meta-page-tags]")?.content)+'"}]');
	  }		  
	  let lang = document.querySelector('[name="x-preferred-language"]').value;
	  str_value = str_value.replace("CURRENT_PAGE_LANGUAGE", lang);
	  //add current page url as filter to exclude it for related products/articles.	  
	  let currentPagePath = document.location.pathname.split(".html")[0];
	  let application = document.querySelector('[name="x-application-id"]').value;
	  let divisionalSitePath = "/content/ardx/"+application;
	  //construct aemPagePath on author and short url appropriately.
	  let aemPagePath = currentPagePath.indexOf(divisionalSitePath) <0 ? divisionalSitePath+currentPagePath: currentPagePath;	  
	  let parentPath = aemPagePath.substring(0,aemPagePath.lastIndexOf("/"));
	  str_value = str_value.replaceAll("CURRENT_PAGE_URL", aemPagePath);
	  str_value = str_value.replace("CURRENT_PAGE_PARENT_URL", parentPath);
	  searchFilterAtrributes.setAttribute("data-search-filters", str_value);	  
  }	  
}

function joinMultipleTagsForSearch(tagValueStr){
	let tagValueForSearch = tagValueStr;
	let tagStr = tagValueStr?.split(",");
	if (tagStr.length > 1) {
	  for (let i in tagStr) {
		  tagStr[i] = '\\"' + tagStr[i] + '\\"';
	  }
	  tagValueForSearch = tagStr.join(",");
	} 
	return tagValueForSearch;		
}
function callSearchFilter(searchFilterAtrributes, searchResultAtrributes){
	let searchType;
		if (searchFilterAtrributes) {
			searchType = searchFilterAtrributes.getAttribute("data-search-type");
			searchFilterAtrributes.setAttribute("data-search-type", searchType+"global");
			document.querySelector('.faqsearch-temp')?.classList.add('faqsearchglobal-temp');
			document.querySelector('.getfaqsearch-temp')?.classList.add('getfaqsearchglobal-temp');
		}
		if (searchResultAtrributes) {
			searchType = searchResultAtrributes.getAttribute("data-search-type");
			searchResultAtrributes.setAttribute("data-search-type", searchType+"global");
			document.querySelector('.faqsearch-temp')?.classList.add('faqsearchglobal-temp');
			document.querySelector('.getfaqsearch-temp')?.classList.add('getfaqsearchglobal-temp');
		}	
}