import {useSharedFilters} from "../shared/Filters";
import React from "react";
import {useTranslation} from "react-i18next";
import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import {useSharedResults} from "../shared/Results";

export const OpsManualsDropdowns = () => {
    const { t, i18n } = useTranslation();
    const {resetFacets, formatPrefixedFacet, formatValueExactMatch} = useSharedFilters();
    const {setHasSearched} = useSharedResults();

    const handleInputs = (e) => {
        resetFacets();
        setHasSearched(false);
    }

    const childFirstOption = {
        label: t('all'),
        value: ""
    };

    return (<HierarchicalFacetDropdowns
        parentClassName={"col-12 col-md-5"}
        parentLabel={t('product')}
        parentPlaceholder={t('select')}
        parentFilter={"cpproductname"}
        onParentSelectionCallback={handleInputs}
        parentFormatLabelsFn={formatPrefixedFacet}
        parentFormatValuesQueryOnlyFn={formatValueExactMatch}
        childLabel={t('version')}
        childPlaceholder={t('select')}
        childFilter={"cpversion"}
        childClassName={"flex-2 col-12 col-md-4"}
        childFirstOption={childFirstOption}
        childFormatValuesQueryOnlyFn={formatValueExactMatch}
        onChildSelectionCallback={handleInputs}
        facetName={"cpfacethierarchy"}
        isRequired={true} />);
}