import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import {InputField} from "@abbott/add-platform";
import {useSharedFilters} from "../shared/Filters";
import {useSharedFacet} from "../shared/Facet";
import {useSharedResults} from "../shared/Results";

export const AccreditationDropdowns = () => {
    const { t, i18n } = useTranslation();
    const {handleListNumOnInput, resetFacets, formatPrefixedFacet} = useSharedFilters();
    const {setHasSearched} = useSharedResults();

    const [isProductReady, setIsProductReady] = useState(false);
    const [isReagentReady, setIsReagentReady] = useState(false);

    const dropDownsDisabled = useMemo(() => {return !(isReagentReady && isProductReady)}, [isReagentReady,isProductReady]);

    const onProductReady = () => {
        setIsProductReady(true);
    }

    const onReagentReady = () => {
        setIsReagentReady(true);
    }

    const parentFirstOption = {
        label: t('all'),
        value: ""
    };

    const handleInputs = (e) => {
        setHasSearched(false);
        resetFacets();
    }

    return (<>
        <HierarchicalFacetDropdowns
            parentClassName={"col-12 col-md-3"}
            parentLabel={t('product')}
            parentPlaceholder={t('select')}
            parentFilter={"cpproduct"}
            parentFirstOption={parentFirstOption}
            facetName={"cpproduct"}
            isRequired={true}
            isDisabled={dropDownsDisabled}
            onParentSelectionCallback={handleInputs}
            parentFormatLabelsFn={formatPrefixedFacet}
            onParentLoaded={onProductReady}/>
        <HierarchicalFacetDropdowns
            parentClassName={"col-12 col-md-3"}
            parentLabel={t('reagent')}
            parentPlaceholder={t('select')}
            parentFilter={"cpreagent"}
            parentFirstOption={parentFirstOption}
            facetName={"cpreagent"}
            isRequired={true}
            isDisabled={dropDownsDisabled}
            onParentSelectionCallback={handleInputs}
            onParentLoaded={onReagentReady}/>
        <InputField
            placeholder={t('search-by-list-num')}
            className={"col-12 col-md-3"}
            label={t('list-number')}
            name={"cplistnumber"}
            onInput={(ev) => handleListNumOnInput("cplistnumber", ev)}
            isDisabled={dropDownsDisabled}/>
    </>);
}