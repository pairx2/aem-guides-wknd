import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';
import { useSharedSort } from "./Sort";

const searchResults = () => {
  const [results, setResults] = useState([]);
  const [currentFields, setCurrentFields] = useState([]);
  const {setSearchSort, sort} = useSharedSort();
  const [resultsFacets, setResultsFacets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [hasSearched, setHasSearchedState] = useState(false);
  const [resultCount, setResultCountState] = useState(0);
  const [pageCount, setPageCountState] = useState(0);
  const [currentPage, setCurrentPageState] = useState({pageNum : 1, isSearching : false, pageWillReset: false});
  const [numPerPage, setNumPerPageState] = useState(10);
  // there's a filter search type and a results search type. We want to be able to update the filter search type without changing the display of the current search results
  const [resultsSearchType, setResultsSearchTypeState] = useState(null);
  const [resultDocumentLanguage, setResultDocumentLanguageState] = useState(null);
  const [displayResultsOverride, setDisplayResultsOverride] = useState(null);
  /***
   * selectedDownloadRows
   * each key is the coveo urihash field of a row. Example:
   * 54MpñxLnZixNMzoA : {
   *     documents: [
   *         {
*                 "searchType": "IFU",
*                 "documentId": "cal_SP_37001M800"
*             },
*             {
*                 "searchType": "IFU",
*                 "documentId": "cal_TDMMCC_03294FD01"
*             },
   *     ]
   * }
   */
  const [selectedDownloadRows, setSelectedDownloadRowsState] = useState({});
  const setSearchResults = useCallback((r) => {
    // loop through all current results and pull out the valid fields of the current results set
    const fields = [];

    // loop through the search results and collect all of the fields returned by the search index
    r?.forEach(result => {
      Object.keys(result).map((key, index) => {
        if (fields.indexOf(key) == -1) {
          if (result[key]) {
            fields.push(key); // add the key if not already present
          }
        }
      })
    });

    setCurrentFields(fields);
    setResults(r ? r : []);
    setHasSearchedState(true);
  }, []);

  const setHasSearched = useCallback((f) => {
    setHasSearchedState(f);
  }, []);

  const setSearchResultsFacets = useCallback((r) => {
    setResultsFacets(r);
  }, []);

  const setIsLoading = useCallback((f) => {
    setLoading(f);
  }, []);

  const setIsDisabled = useCallback((f) => {
    setDisabled(f);
  }, []);

  const setCurrentPage = useCallback((f) => {
    setCurrentPageState(f);
  }, []);

  const setNumPerPage = useCallback((f) => {
    setNumPerPageState(f);
  }, []);

  const setResultCount = useCallback((f) => {
    setResultCountState(f);
  }, []);

  const setPageCount = useCallback((f) => {
    setPageCountState(f);
  }, []);

  const setResultsSearchType = useCallback((f) => {
    setResultsSearchTypeState(f);
  }, []);

  const setDisplayResultsOverrideID = useCallback((f) => {
    setDisplayResultsOverride(f);
  }, []);

  const setSearchError = useCallback((f) => {
    setError(f);
  }, []);

  const setSelectedDownloadRows = useCallback((f) => {
    setSelectedDownloadRowsState(f);
  }, []);

  // listen to changes to the sort's state
  React.useEffect( () => {
    const newSort = {fields : {}, isSearching : false}
    // clean up sort by removing any sort objects for fields that aren't in the current results set
    Object.keys(sort.fields).map((key) => {
      if (currentFields.some((field) => {
        return field == key;
      })) {
        // if the current results set contains the current sort's field, add it back in
        newSort.fields[key] = sort.fields[key];
      }
    });

    setSearchSort(newSort);
  }, [currentFields]);

  const setResultDocumentLanguage = useCallback((f) => setResultDocumentLanguageState(f), []);

  return {
    results,
    currentFields,
    setSearchResults,
    setSearchResultsFacets,
    resultsFacets,
    isLoading,
    setIsLoading,
    isDisabled,
    setIsDisabled,
    hasSearched,
    setHasSearched,
    resultCount,
    setResultCount,
    pageCount,
    setPageCount,
    currentPage,
    setCurrentPage,
    numPerPage,
    setNumPerPage,
    resultsSearchType,
    setResultsSearchType,
    displayResultsOverride,
    setDisplayResultsOverrideID,
    isError,
    setSearchError,
    selectedDownloadRows,
    setSelectedDownloadRows,
    resultDocumentLanguage,
    setResultDocumentLanguage

  };
}

export const useSharedResults = () => useBetween(searchResults);