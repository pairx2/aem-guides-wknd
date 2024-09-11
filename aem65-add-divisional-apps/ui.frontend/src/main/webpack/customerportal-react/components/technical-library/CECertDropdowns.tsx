import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import {InputField} from "@abbott/add-platform";
import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSharedFilters} from "../shared/Filters";
import {useSharedFacet} from "../shared/Facet";
import {useSharedResults} from "../shared/Results";

export const CECertDropdowns = (props) => {
    const { t, i18n } = useTranslation();
    const {handleListNumOnInput, resetFacets, formatPrefixedFacet} = useSharedFilters();
    const [parentSelectedOverride, setParentSelectedOverride] = useState({});
    const [isManSiteReady, setIsManSiteReady] = useState(false);
    const {setHasSearched} = useSharedResults();
    const dropDownsDisabled = useMemo(() => {return !(isManSiteReady)}, [isManSiteReady]);

    const onMansiteReady = () => {
        setIsManSiteReady(true);
    }

    const handleInputs = (e) => {
        setHasSearched(false);
        resetFacets();
    }

    const parentFirstOption = {
        label: t('all'),
        value: ""
    };

    React.useEffect(() => {
        // init
        setParentSelectedOverride(parentFirstOption);
    }, [])

    const CEManValueFormat = (value) => {
        return value.replace(",", "");
    }

    return (<>
        <InputField placeholder={t('search-by-list-number')}
                    className={"col-12 col-md-5"}
                    label={t('list-number')}
                    name={"cplistnumber"}
                    onInput={(ev) => handleListNumOnInput("cplistnumber", ev)}
                    maxLength={12}
                    isDisabled={dropDownsDisabled}/>
        <HierarchicalFacetDropdowns
            parentClassName={'col-12 col-md-4'}
            parentLabel={t('manufacturing-site')}
            parentPlaceholder={t('select')}
            parentFirstOption={parentFirstOption}
            parentSelectedOverride={parentSelectedOverride}
            parentFilter={"cpmansite"}
            parentFormatLabelsFn={formatPrefixedFacet}
            parentFormatValuesFn={CEManValueFormat}
            onParentLoaded={onMansiteReady}
            facetName={"cpmansite"}
            facetType={"specific"}
            parentSortCriteria={"alphanumeric"}
            isRequired={true}
            onParentSelectionCallback={handleInputs}
        />
    </>)
}