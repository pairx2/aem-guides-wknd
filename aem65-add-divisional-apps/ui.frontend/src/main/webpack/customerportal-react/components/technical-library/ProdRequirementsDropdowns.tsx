import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {InputField} from "@abbott/add-platform";
import {useSharedFilters} from "../shared/Filters";
import {getProductRequirementsEnglishDisplayKeyFromLanguageCode} from "../shared/Utils";
import {useSharedOUS} from "../shared/OutsideUS";
import {useSharedLabProfiles} from "../shared/LabProfiles";
import {useSharedResults} from "../shared/Results";

export const ProdRequirementsDropdowns = () => {
    const { t, i18n } = useTranslation();
    const [isProdReady, setIsProdReady] = useState(true);
    const [isTitleReady, setIsTitleReady] = useState(false);
    const [isLanguageReady, setIsLanguageReady] = useState(false);

    const { handleListNumOnInput, resetFacets, formatPrefixedFacet} = useSharedFilters();
    const {preferredLanguage,isOutsideUs} = useSharedOUS();
    const {userRole} = useSharedLabProfiles();
    const {setHasSearched, setIsDisabled} = useSharedResults();

    const handleInputs = (e) => {
        resetFacets();
        setHasSearched(false);
    }

    const isEmployee = useMemo(() => {return userRole == "employee"}, [userRole]);
    const dropDownsDisabled = useMemo(() => {
        const isReady = (isLanguageReady && isProdReady && isTitleReady);
        return !isReady;
    }, [isLanguageReady, isProdReady, isTitleReady]);

    const [prodReqInitialLanguageOption, setProdReqInitialLanguageOption] = useState({});

    React.useEffect(() => {
        // init
        const langCode = preferredLanguage.split("_")[0]; // truncate after the underscore
        const engDisplayKey = getProductRequirementsEnglishDisplayKeyFromLanguageCode(langCode);
        const initialLangOption = {
            label: engDisplayKey,
            value: engDisplayKey
        }
        setProdReqInitialLanguageOption(initialLangOption);
    }, []);

    const childFirstOption = {
        label: t('all'),
        value: ""
    };

    const onTitleReady = () => {
        setIsTitleReady(true);
    }
    const onProdReady = () => {
        setIsProdReady(true);
    }

    const onLangReady = () => {
        setIsLanguageReady(true);
    }

    const onProductSelect = (item) => {
        resetFacets();
        if (item) {
            setIsProdReady(false);
        }
    }

    return (<>
        <HierarchicalFacetDropdowns
            parentClassName={"col-6 col-md-3"}
            parentLabel={t('product')}
            parentPlaceholder={t('select')}
            parentFilter={"title"}
            facetType={"hierarchical"}
            parentFirstOption={childFirstOption}
            onParentLoaded={onTitleReady}
            facetName={"cpfacethierarchy"}
            onParentSelectionCallback={onProductSelect}
            parentFormatLabelsFn={formatPrefixedFacet}
            childLabel={t('assay-name')}
            childPlaceholder={t('select')}
            childFilter={"cpproductname"}
            childClassName={"flex-2 col-6 col-md-3"}
            onChildLoaded={onProdReady}
            isRequired={true}
            isDisabled={dropDownsDisabled}
            childFirstOption={childFirstOption}
            onChildSelectionCallback={handleInputs}/>
        <HierarchicalFacetDropdowns
            parentClassName={'col-6 col-md-3'}
            parentLabel={t('language')}
            parentPlaceholder={t('select')}
            parentFilter={"cplanguage"}
            parentSelectedOverride={prodReqInitialLanguageOption}
            facetName={"cplanguage"}
            facetType={"specific"}
            isRequired={false}
            onParentLoaded={onLangReady}
            isDisabled={dropDownsDisabled || !(isOutsideUs || isEmployee)}
            onParentSelectionCallback={handleInputs}/>
        <InputField placeholder={t('enter-list-num')}
            className={"col-6 col-md-3"}
            label={t('list-number')}
            name={"cplistnumber"}
            onInput={(ev) => handleListNumOnInput("cplistnumber", ev)}
            isDisabled={dropDownsDisabled}/>
    </>)
}