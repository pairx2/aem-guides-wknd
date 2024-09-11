import axios, {AxiosResponse} from 'axios';
import {useSharedResults} from "../shared/Results";
import {useSharedFilters} from "../shared/Filters";
import {ESL_EPT} from "../../../customerportal/forms/commonContants";
import {getPageDataAttributes,eslConfigDatasets} from "../../../customerportal/forms/common";
import {useSharedFacet} from '../shared/Facet';
import {useSharedSort} from "../shared/Sort";
import {useAnalyticsUtils} from "../shared/AnalyticsUtils";

const JWT_TOKEN_KEY = "jwtToken";

export const searchService = () => {
  const {
      setSearchResults,
      setSearchResultsFacets,
      setIsLoading,
      setResultCount,
      setPageCount,
      setCurrentPage,
      currentPage,
      numPerPage,
      setResultsSearchType,
      setSearchError,
      setResultDocumentLanguage
    } = useSharedResults(),
    {filters,filterSearchType,documentLanguage} = useSharedFilters(),
    {sort} = useSharedSort(),
    {facets}= useSharedFacet();

  const {formatAnalyticsSearchObject, analyticsUserAndLabObject, fireAnalyticsEvent} = useAnalyticsUtils();

  const getFacets = (facets: any, success: any, failure: any) => {

    const data = {
      "q": "*",
      "filters": filters.currentFilters,
      "facets": [facets],
      "firstresult": 1,
      "numberofresults": 0,
      "autocorrect": "true",
      "searchtype": filterSearchType
    };

    doSearchRequest(data, success, failure);
  };

  const onSearchSuccess = (response : AxiosResponse<any>) => {
    // get results from response
    const results = response?.data?.response?.results;
    const resultsFacets = response?.data?.response?.facets;
    const resultCount = response?.data?.response?.totalCount;

    if (resultCount > numPerPage) {
      setPageCount(Math.ceil(resultCount / numPerPage));
    } else {
      setPageCount(1);
    }

    setResultCount(resultCount ?? 0);

    if (!currentPage.isSearching) {
        setResultsSearchType(filterSearchType);
    }

    setSearchResults(results ?? []);
    setSearchResultsFacets(resultsFacets ?? []);
    setResultDocumentLanguage(documentLanguage);
    setIsLoading(false);


    const analyticsObj = formatAnalyticsSearchObject();
    analyticsObj["searchType"] = filterSearchType;
    analyticsObj["searchResultsCount"] = (resultCount ?? 0);
    const eventObj = {
        search:analyticsObj,
        lab: analyticsUserAndLabObject.lab,
        user: analyticsUserAndLabObject.user
    };
    // fire analytics event
    fireAnalyticsEvent("search_results_displayed", eventObj);
  };

  const onSearchFailure = (error: any) => {
    setIsLoading(false);
  };

  const doSearch = (resetPage) => {

      // sort is expecting an array of objects
      const sortArr = [];
      Object.keys(sort.fields).forEach(key => {
          const obj = {};
          obj[key] = sort.fields[key];
          sortArr.push(obj);
      });

      let currentPageNum = currentPage.pageNum;
      if (currentPage.pageWillReset || resetPage) {
          currentPageNum = 1;
          setCurrentPage({pageNum : 1, isSearching : false, pageWillReset: false});
      }

      const firstResult = (currentPageNum > 1) ? (currentPageNum-1) * numPerPage + 1 : 1;

      const data = {
          "q": "*",
          "filters": filters.currentFilters,
          "sort": sortArr,
          "facets": facets.currentFacets,
          "firstresult": firstResult,
          "numberofresults": numPerPage,
          "autocorrect": "true",
          "searchtype": filterSearchType
      };

      setIsLoading(true);
      doSearchRequest(data, onSearchSuccess, onSearchFailure);
  };

  const doSearchRequest = (data: any, onSuccess: any, onFailure: any) => {

    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.SEARCH;

    const headers = getPageDataAttributes();

    const token = window.getCookie(JWT_TOKEN_KEY);
    headers["x-id-token"] = token;

    const config = {
      url : url,
      headers: headers,
    };

    axios.post(url, data, config)
        .then(function (response) {
       
          onSuccess(response);
        })
        .catch(function (error) {
          onFailure(error);

          const eventObj = {
              error: {
                  errorCode: error.code,
                  errorMessage: error.message
              },
              user:analyticsUserAndLabObject.user,
              lab: analyticsUserAndLabObject.lab
            };
          // fire analytics event
          fireAnalyticsEvent("func_error", eventObj);

          setSearchError(true);
        });

  };

  const resetPageNumOnSearch = () => {
    // Disable the Search to prevent cascading searches while state is reset
      // if pageWillReset == true, the pagenumber will go back to zero on the next search
    setCurrentPage({pageNum:currentPage.pageNum, isSearching: false, pageWillReset: true});
  }

  return {
    doSearch,
    getFacets,
    resetPageNumOnSearch,
  }
}
