import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import React from "react";
import {useTranslation} from "react-i18next";
import {searchTypesResultsOverrides} from "../configs";
import {useSharedFilters} from "../shared/Filters";
import {useSharedResults} from "../shared/Results";

export const ValueAssignmentDropdowns = () => {
    const { t, i18n } = useTranslation();
    const {resetFacets,formatPrefixedFacet,alphaNumericSortByLabel} = useSharedFilters();
    const {setHasSearched} = useSharedResults();

    const handleInputs = (e) => {
        resetFacets();
        setHasSearched(false);
    }
    const childFirstOption = {
        label: t('all'),
        value: ""
    };
    const parentAdditionalOptions = [];
    searchTypesResultsOverrides.va_search.resultsOverrides.forEach(resultOverride => {
        resultOverride.values.forEach(val => {
            parentAdditionalOptions.push({value : val, state: "idle"});
        })
    })


    return (<HierarchicalFacetDropdowns
        parentClassName={"col-12 col-md-5"}
        parentLabel={t('product-name')}
        parentPlaceholder={t('select')}
        parentFilter={"title"}
        parentAdditionalOptions={parentAdditionalOptions}
        onParentSelectionCallback={handleInputs}
        parentFormatLabelsFn={formatPrefixedFacet}
        parentPostSortFn={alphaNumericSortByLabel}
        childLabel={t('lot-number')}
        childPlaceholder={t('select')}
        childFilter={"cplotnumber"}
        childClassName={"flex-2 col-12 col-md-4"}
        childFirstOption={childFirstOption}
        onChildSelectionCallback={handleInputs}
        facetName={"cpfacethierarchy"}
        isRequired={true} />);
}