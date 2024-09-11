import {useCallback, useState} from 'react';
import {useBetween} from 'use-between';
import {formatListNumber, getProductRequirementsEnglishDisplayKeyFromLanguageCode} from "./Utils";
import {facetsConfigs, OUS_Filters, SEARCH_TYPES} from "../configs";
import {useSharedOUS} from "./OutsideUS";
import {useSharedFacet} from "./Facet";
import {useSharedResults} from "./Results";

const searchFilters = () => {
  const {isOutsideUs, preferredLanguage} = useSharedOUS();
  const {setSearchFacet} = useSharedFacet();
  const {setHasSearched} = useSharedResults();
  const [filters, setFilters] = useState({
    currentFilters: [{}],
    isSearching: false
  }),
  [filterSearchType , setSearchType] = useState("none");

  // { label : [localized language name], value : [language code] }
  const [documentLanguage, setDocumentLanguageState] = useState(null);

  const setSearchFilters = useCallback( (f) => {
    setFilters(f);
  }, []);
  const setFilterSearchType = useCallback((f) => setSearchType(f), []);
  const setDocumentLanguage = useCallback((f) => setDocumentLanguageState(f), []);

  const defaultFacetCurrentValues = useCallback((currValues) => {
    // TODO : If other search types need to do this, test the facet id for cplanguage, and format the value based on search type
    if (filterSearchType == SEARCH_TYPES.OPERATIONS_MANUALS) {
      // init
      const langCode = preferredLanguage.split("_")[0]; // truncate after the underscore
      const engDisplayKey = getProductRequirementsEnglishDisplayKeyFromLanguageCode(langCode);

      return [{
        "value": engDisplayKey,
        "state": "selected"
      }];
    } else {
      return currValues;
    }
  }, [filterSearchType]
  );

  const resetFacets = useCallback(() => {
    // set preferred language as currentFacet
    let newCurFacet = [];
    if (filterSearchType != "none") {
      newCurFacet = facetsConfigs[filterSearchType];
      if (newCurFacet) {
        // it seems the facetsConfig objects persists in memory, so on reset we want to remove all current values
        newCurFacet.forEach(facetCollection => {
          facetCollection.currentValues = [];
          facetCollection.freezeCurrentValues = false;
        });


        newCurFacet[0].currentValues = defaultFacetCurrentValues(newCurFacet[0].currentValues);
      }
    }

    setSearchFacet( {isSearching: false,
      currentFacets : newCurFacet});
  },[filterSearchType]);

  const handleWildcardInput = useCallback((fieldName, ev) => {
    resetFacets();
    setHasSearched(false);
    const newFilter = [];
    // clone filters
    filters.currentFilters.forEach(val => newFilter.push(Object.assign({}, val)));

    if (ev?.target?.value) {
      // Add wildcards
      newFilter[0][fieldName] = `*${ev.target.value.trim()}*`;
    } else {
      // reset search filter
      delete newFilter[0][fieldName];
    }

    setSearchFilters({currentFilters: newFilter, isSearching: false});
  }, [filters])

  const handleListNumOnInput = useCallback((fieldName, ev) => {
    resetFacets();
    setHasSearched(false);
    const newFilter = [];
    // clone filters
    filters.currentFilters.forEach(val => newFilter.push(Object.assign({}, val))); // typescript kept throwing errors when i tried doing newFilter = [...filters.currentFilters]

    if (ev?.target?.value) {
      newFilter[0][fieldName] = formatListNumber(ev.target.value.trim());
    } else {
      // reset search filter
      delete newFilter[0][fieldName];
    }

    setSearchFilters({currentFilters: newFilter, isSearching: false});
  }, [filters]);

  const formatValueExactMatch = useCallback((value) => {
    // transform "[OM] CELL DYN EMERALD" to "^\\[OM\\] CELL DYN EMERALD$"
    // adds regex to get exact matches
    if (value) {
      value = value.replace(/[.*+?^$&{}()|[\]\\]/g, '\\\$&');
      value = `^${value}$`

      return value;
    }
  }, []);

  const isExactMatchFilter = useCallback((value) => {
    // is this value formatted by the formatValueExactMatch method?
    let isExactMatch = false;
    if (value) {
      if (value.indexOf("^") == 0 && value.indexOf("$") == value.length - 1) {
        isExactMatch = true;
      }
    }
    return isExactMatch;
  }, []);

  const stripExactMatchRegex = useCallback((value) => {
    if (value) {
      // replace escaping slashes, and remove first and last character
      // transform "^\\[OM\\] CELL DYN EMERALD$" to "[OM] CELL DYN EMERALD"
      return value.slice(1, value.length-1).replaceAll("\\",'');
    }
  }, []);

  const applyOUSFilters = (searchType) => {
    const appliedOUSFilters = []
    // inject any additional filters based on search type. Mostly for OUS
    const ousFilter = OUS_Filters[searchType];

    ousFilter?.forEach(filter => {
      if ((isOutsideUs && filter.isOUS) || (isOutsideUs == false && filter.isUS)) {
        const filterVal = Object.assign({},filter);
        delete filterVal.isOUS;
        delete filterVal.isUS;
        Object.keys(filterVal).forEach(key => {
          appliedOUSFilters[key] = filterVal[key];
        });
      }
    });
    return appliedOUSFilters
  };

  const formatPrefixedFacet = (facetValue) => {
    // replace [PREFIX] on values
    if (facetValue) {
      return facetValue.replaceAll(/^\[\w{2,}\]/g, '').trim();
    }
  }

  const alphaNumericSortByLabel = (options) => {
    // options is a collection of {label : "", value: ""}
    const sortedOptions = options.sort((optionA, optionB)=> {
      const labelA = optionA.label;
      const labelB = optionB.label;
      if (labelA && labelB) {
        return labelA.localeCompare(labelB);
      } else {
        return 0;
      }
    })
    return sortedOptions;
  }

  return {
    filters,
    setSearchFilters,
    filterSearchType,
    setFilterSearchType,
    documentLanguage,
    setDocumentLanguage,
    handleWildcardInput,
    handleListNumOnInput,
    applyOUSFilters,
    resetFacets, // here to prevent circular references
    formatPrefixedFacet,
    formatValueExactMatch,
    isExactMatchFilter,
    stripExactMatchRegex,
    alphaNumericSortByLabel
  };
}

export const useSharedFilters = () => useBetween(searchFilters);