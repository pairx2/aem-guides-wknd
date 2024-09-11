import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {ComboBox} from "@abbott/add-platform";
import {useSharedFilters} from "../shared/Filters";
import {useSharedResults} from "../shared/Results";
import { searchService } from "../services/SearchService";

export const HierarchicalFacetDropdowns = (props) => {
  const {
    parentLabel,
    parentPlaceholder,
    parentFilter,
    parentFirstOption,
    parentAdditionalOptions, // insert additional options on top of the facets
    onParentSelectionCallback,
    parentClassName,
    parentSelectedOverride, // initial selection
    parentFormatLabelsFn,
    parentFormatValuesFn,
    parentFormatValuesQueryOnlyFn, // only format values on outgoing search queries, not facet requests
    childLabel,
    childClassName,
    childPlaceholder,
    childFilter,
    childFirstOption,
    childAdditionalOptions, // insert additional options on top of the facets
    childSelectedOverride, // initial selection
    childFormatLabelsFn,
    childFormatValuesFn,
    childFormatValuesQueryOnlyFn, // only format values on outgoing search queries, not facet requests
    onChildSelectionCallback,
    isRequired,
    isDisabled,
    isHidden,
    facetName,
    facetType,
    parentSortCriteria, // coveo properties for sorting facet results https://coveo.github.io/search-ui/enums/facetsortcriteria.html
    parentPostSortFn, // additional sort predicates for the parent options
    childSortCriteria, // coveo properties for sorting facet results https://coveo.github.io/search-ui/enums/facetsortcriteria.html
    childPostSortFn, // additional sort predicates for the parent options
    onParentLoaded,
    onChildLoaded
  } = props; // The ORDER object is managed by another parent component.

  const {getFacets, resetPageNumOnSearch} = searchService();

  const [parentOptions, setParentOptions] = useState([]);
  const [childOptions, setChildOptions] = useState([]);
  const [parentDisabled, setParentDisabled] = useState(true);
  const [childDisabled, setChildDisabled] = useState(true);
  const [parentLoading, setParentLoading] = useState(true);
  const [childLoading, setChildLoading] = useState(false);

  const { filters, setSearchFilters } = useSharedFilters();
  const { setIsDisabled } = useSharedResults();
  
  /*
   * Parent Facets
   */
  const onSuccessParentFacets = (response) => {
    const facets = response?.data?.response?.facets;
    let options = [];
    if (facets && facets.length >= 0) {
      options = facets[0].values;
    }
    if (options) {
      if (parentAdditionalOptions) {
        options = [...parentAdditionalOptions, ...options];
      }
      // format parent options if the format options function exists
      options = options.map(option => {
        let label = option.label ? option.label : option.value;
        let value = option.value;
        if (parentFormatLabelsFn && typeof parentFormatLabelsFn == 'function') {
          label = parentFormatLabelsFn(label) ?? label;
        }
        if (parentFormatValuesFn && typeof parentFormatValuesFn == 'function') {
          value = parentFormatValuesFn(option.value) ?? value
        }
        return {label: label, value: value}
      })
      // additional sort predicates
      if (parentPostSortFn && typeof parentPostSortFn == 'function') {
        options = parentPostSortFn(options);
      }
  
      // insert first option
      if (parentFirstOption) {
        options.unshift(parentFirstOption);
      }
      setParentOptions(options);
      setParentDisabled(false);
      setParentLoading(false);
      if (onParentLoaded && typeof onParentLoaded == "function") {
        onParentLoaded();
      }
      setChildDisabled(true);
      
      // set filter based on selectedOverride
      if (parentSelectedOverride?.value) {
        onParentSelect(parentSelectedOverride);
      }
    }
  };

  const onFailureParentFacets = (error) => {
    console.error("Failed to get hierarchical parent facets", error);
  };
  
  const getParentFacets = () => {
    const facets = {
      "delimitingCharacter": "|",
      "filterFacetCount": false,
      "injectionDepth": 100,
      "numberOfValues": 100,
      "sortCriteria": parentSortCriteria,
      "filterByBasePath": true,
      "currentValues": [],
      "preventAutoSelect": false,
      "type": facetType,
      "facetId": facetName,
      "field": facetName
    };

    getFacets(facets, onSuccessParentFacets, onFailureParentFacets);
  };

  const onParentSelect = (item) => {
    setChildDisabled(true);
    setChildLoading(true);
    const newFilters = filters.currentFilters;
    if (newFilters[0][childFilter]) {
      delete newFilters[0][childFilter];
    }
    // only format the values before sending them off on search queries, not when getting facets
    if (parentFormatValuesQueryOnlyFn && typeof parentFormatValuesQueryOnlyFn == "function") {
      newFilters[0][parentFilter] = parentFormatValuesQueryOnlyFn(item.value);
    } else {
      newFilters[0][parentFilter] = item.value;
    }
    setSearchFilters({currentFilters: newFilters, isSearching: false});
    if (isRequired && childFilter) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    
    if (childFilter) {
      getChildFacets(item);
    }
    if (onParentSelectionCallback) {
      onParentSelectionCallback(item)
    }
  };

  /*
   * Child Facets
   */
  const onSuccessChildFacets = (response) => {
    let options = response?.data?.response?.facets[0]?.values[0]?.children;
    
    if (options) {
      if (childAdditionalOptions) {
        options.concat(childAdditionalOptions);
      }
      // format child options if the format options function exists
      options = options.map(option => {
        let label = option.label ? option.label : option.value;
        let value = option.value;
        if (childFormatLabelsFn && typeof childFormatLabelsFn == 'function') {
          label = childFormatLabelsFn(option.value) ?? label;
        }
        if (childFormatValuesFn && typeof childFormatValuesFn == 'function') {
          value = childFormatValuesFn(option.value) ?? value
        }
        return {label: label, value: value}
      })
      
      setChildDisabled(false);
      setChildLoading(false);
      if (onChildLoaded && typeof onChildLoaded == "function") {
        onChildLoaded();
      }
      // additional sort predicates
      if (childPostSortFn && typeof childPostSortFn == 'function') {
        options = parentPostSortFn(options);
      }
      // insert first option
      if (childFirstOption) {
        options.unshift(childFirstOption);
      }
      
      setChildOptions(options);
  
      // set filter based on selectedOverride
      if (childSelectedOverride?.value) {
        onChildSelect(childSelectedOverride);
      }
    }
  };

  const onFailureChildFacets = (error) => {
    console.error("Failed to get hierarchical child facets", error);
  };

  const getChildFacets = (item) => {
    const currentValues = item;
    currentValues["state"] = "selected";
    currentValues["retrieveChildren"] = true;
    currentValues["retrieveCount"] = 100;

    const facets = {
      "delimitingCharacter": "|",
      "filterFacetCount": false,
      "injectionDepth": 100,
      "numberOfValues": 100,
      "sortCriteria": childSortCriteria,
      "filterByBasePath": true,
      "currentValues": [currentValues],
      "preventAutoSelect": false,
      "type": "hierarchical",
      "facetId": facetName,
      "field": facetName
    };

    getFacets(facets, onSuccessChildFacets, onFailureChildFacets);
  };

  const onChildSelect = (item) => {
    const newFilters = filters.currentFilters;
    // only format the values before sending them off on search queries
    if (childFormatValuesQueryOnlyFn && typeof childFormatValuesQueryOnlyFn == "function") {
      newFilters[0][childFilter] = childFormatValuesQueryOnlyFn(item.value);
    } else {
      newFilters[0][childFilter] = item.value;
    }
    setSearchFilters({currentFilters: newFilters, isSearching: false});
    resetPageNumOnSearch();
    if (isRequired) {
      setIsDisabled(false);
    }
  
    if (onChildSelectionCallback) {
      onChildSelectionCallback(item)
    }
  };

  // component initialization
  useEffect(() => {
    getParentFacets();
    if (isRequired) {
      setIsDisabled(true);
    }
  }, []);
  
  return (
    <>
      <ComboBox
        className={`${parentClassName} ${isHidden ? 'hidden' : ''}`}
        options={parentOptions}
        label={parentLabel}
        placeholder={parentPlaceholder}
        isLoading={parentLoading}
        isDisabled={isDisabled == true || parentDisabled}
        selectedOverride={parentSelectedOverride}
        onChange={onParentSelect} />
  
      {(childFilter && childOptions && childLabel) && (<ComboBox
        className={`${childClassName} ${isHidden ? 'hidden' : ''}`}
        options={childOptions}
        label={childLabel}
        placeholder={childPlaceholder}
        isLoading={childLoading}
        isDisabled={childDisabled}
        selectedOverride={childSelectedOverride}
        onChange={onChildSelect}/>)}
    </>
  );
};

HierarchicalFacetDropdowns.defaultProps = {
  parentLabel: "Parent",
  parentPlaceholder : "",
  parentFilter: "",
  parentClassName: "",
  childLabel: "Child",
  childClassName: "",
  childFilter: "",
  facetName: "cpfacethierarchy",
  isDisabled: false,
  isRequired: false,
  facetType : "hierarchical",
  isHidden: false,
  parentSortCriteria: "alphanumeric",
  childSortCriteria: "alphanumeric"
};

HierarchicalFacetDropdowns.propTypes = {
  parentLabel: PropTypes.string.isRequired,
  parentFilter: PropTypes.string.isRequired,
  parentPlaceholder: PropTypes.string.isRequired,
  parentAdditionalOptions: PropTypes.array,
  parentClassName: PropTypes.string,
  parentSelectedOverride: PropTypes.any,
  parentFormatLabelsFn: PropTypes.func,
  parentFirstOption: PropTypes.object,
  childLabel: PropTypes.string.isRequired,
  childClassName:PropTypes.string,
  childFilter: PropTypes.string,
  childPlaceholder: PropTypes.string,
  childSelectedOverride: PropTypes.any,
  childFormatLabelsFn: PropTypes.func,
  childAdditionalOptions: PropTypes.array,
  facetName: PropTypes.string.isRequired,
  childFirstOption: PropTypes.object,
  onParentSelectionCallback: PropTypes.func,
  onChildSelectionCallback: PropTypes.func,
  facetType: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  isHidden: PropTypes.bool,
  parentSortCriteria: PropTypes.string,
  parentPostSortFn: PropTypes.func,
  childSortCriteria: PropTypes.string,
  childPostSortFn: PropTypes.func,
  parentFormatValuesFn: PropTypes.func,
  parentFormatValuesQueryOnlyFn: PropTypes.func,
  childFormatValuesFn: PropTypes.func,
  childFormatValuesQueryOnlyFn: PropTypes.func,
  onParentLoaded: PropTypes.func,
  onChildLoaded: PropTypes.func
};

export default HierarchicalFacetDropdowns;
