import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import {ComboBox, DropDown, InputField} from "@abbott/add-platform";
import {useSharedResults} from "../shared/Results";
import {useSharedFilters} from "../shared/Filters";
import {getLanguageListForType} from "../configs";
import {
    getCountryCodeFromLanguageCode,
    getLocalizedNameFromLblFileLanguageCode
} from "../shared/Utils";
import {useSharedOUS} from "../shared/OutsideUS";
import {useSharedLabProfiles} from "../shared/LabProfiles";

export const IFUDropdowns = ({checkLotNumberLength, lotSpecificSearch}) => {
    const { t, i18n } = useTranslation();
    const {setHasSearched} = useSharedResults();
    const { filters, setSearchFilters, handleWildcardInput, handleListNumOnInput, resetFacets,formatPrefixedFacet} = useSharedFilters();
    const [queryType, setQueryType] = useState(null);
    const optionsEmployee = useMemo(() => {return [
        {
            value : "general",
            label : t('general-search')
        },
        {
            value : "lotNumber",
            label : t('lot-specific-search')
        }
    ]}, []); 
    // we're using useMemo because for some reason a const keeps re-initializing the dropdown
    const [genProductSelectReady, setGenProductSelectReady] = useState(false);
    const [genLangSelectReady, setGenLangSelectReady] = useState(false);
    const [lotLangSelectReady, setLotLangSelectReady] = useState(false);
    const [isComboBoxDisabled, setIsComboBoxDisabled] = useState(false);

    const {preferredLanguage,isOutsideUs} = useSharedOUS();

    const [IFUInitialLanguageOption, setIFUInitialLanguageOption] = useState({});
    const languageList = useMemo(() => getLanguageListForType("ifuFileLanguage"), []);
    const {userRole} = useSharedLabProfiles();


    const inputLengthCheck = (ev) => {
        checkLotNumberLength(ev);
    }

    const handleInputs = (e) => {
        resetFacets();
        setHasSearched(false);
    }

    const isEmployee = useMemo(() => {return userRole == "employee"}, [userRole]);
    const generalDropDownsDisabled = useMemo(() => {return !(genProductSelectReady && genLangSelectReady)}, [genLangSelectReady, genProductSelectReady]);

    React.useEffect(() => {
        const langCode = preferredLanguage.split("_")[0]; // truncate after the underscore
        const initialLangOption = {
            label: getLocalizedNameFromLblFileLanguageCode(langCode, "ifuFileLanguage"),
            value: getCountryCodeFromLanguageCode(langCode, "ifuFileLanguage")
        }
        setIFUInitialLanguageOption(initialLangOption);
        

    }, []);

    const onParentSelect = (ev) => {
        resetFacets();
        setHasSearched(false);
        setGenLangSelectReady(false);
        setLotLangSelectReady(false);
        setGenProductSelectReady(false);
        setQueryType(ev?.value ?? "none");
        // reset filters
        const newFilters = [{}];

        // if general search, set cpgensearch : Y
        if (ev?.value == "general") {
            newFilters[0]['cpgensearch'] = "Y"
            document.querySelector('body').classList.add("general");
        } else {
            newFilters[0]['cpgensearch'] = "N";
            document.querySelector('body').classList.remove("general");
        }
        // add cpusavail/cpousavail
        if (filters.currentFilters[0]["cpousavail"]) {
            newFilters[0]["cpousavail"] = filters.currentFilters[0]["cpousavail"];
        }
        if (filters.currentFilters[0]["cpusavail"]) {
            newFilters[0]["cpusavail"] = filters.currentFilters[0]["cpusavail"];
        }


        setSearchFilters({currentFilters : newFilters, isSearching: false})
        return ev?.value;
    }
    const onProductLoaded = () => {
        setGenProductSelectReady(true);
    }
    const onLanguageLoaded = () => {
        setGenLangSelectReady(true);
    }
    const onLotLanguageLoaded = () =>  {
        setLotLangSelectReady(true);
    }
    
    const conditionFirstOption = {
        label: t('all'),
        value: ""
    };

    const IFULanguageFormat = (value) => {
        const langConfig = languageList.find(langConf => langConf.countryCode == value);
        if (langConfig) {
            return langConfig.displayValue;
        } else {
            return null;
        }
    }
   
   
    return (<>

                <ComboBox
                    className={"col-12 col-md-3"}
                    options={optionsEmployee}
                    label={t('general-or-lot-specific-search')}
                    placeholder={t('select')}
                    onChange={(ev) => {
                        onParentSelect(ev);
                        lotSpecificSearch(ev?.value);
                    }}
                    isLoading={false}
                    isDisabled={false} />
                

	

        {queryType == "general" && (<>
            <HierarchicalFacetDropdowns
                parentClassName={'col-6 col-md-3'}
                parentLabel={t('product')}
                parentPlaceholder={t('select')}
                parentFilter={"cpproduct"}
                facetName={"cpproduct"}
                facetType={"specific"}
                onParentLoaded={onProductLoaded}
                isRequired={true}
                isDisabled={generalDropDownsDisabled}
                parentFormatLabelsFn={formatPrefixedFacet}
                onParentSelectionCallback={handleInputs}/>
            <HierarchicalFacetDropdowns
                parentClassName={'col-6 col-md-3'}
                parentLabel={t('language')}
                parentPlaceholder={t('select')}
                parentFilter={"cplanguage"}
                parentFirstOption={conditionFirstOption}
                facetName={"cplanguage"}
                facetType={"specific"}
                parentSelectedOverride={IFUInitialLanguageOption}
                onParentLoaded={onLanguageLoaded}
                isRequired={true}
                isDisabled={generalDropDownsDisabled || !(isOutsideUs || isEmployee)}
                parentFormatLabelsFn={IFULanguageFormat}
                onParentSelectionCallback={handleInputs}/>
            <InputField
                placeholder={t('search-by-name')}
                className={"col-12 col-md-3"}
                label={t('product-name')}
                name={"cpproductname"}
                onInput={(ev) => handleWildcardInput("cpproductname", ev)}
                isDisabled={generalDropDownsDisabled}/>
            <InputField
                placeholder={t('enter-list-number')}
                className={"col-12 col-md-3"}
                label={t('product-list-number')}
                name={"cplistnumber"}
                onInput={(ev) => handleListNumOnInput("cplistnumber", ev)}
                isDisabled={generalDropDownsDisabled}/>
            </>
        )}

        {queryType == "lotNumber" && (
            <>
            <HierarchicalFacetDropdowns
                parentClassName={'col-6 col-md-3'}
                parentLabel={t('language')}
                parentPlaceholder={t('select')}
                parentFilter={"cplanguage"}
                parentFirstOption={conditionFirstOption}
                facetName={"cplanguage"}
                facetType={"specific"}
                parentSelectedOverride={IFUInitialLanguageOption}
                onParentLoaded={onLotLanguageLoaded}
                isRequired={true}
                parentFormatLabelsFn={IFULanguageFormat}
                isDisabled={!(isOutsideUs || isEmployee)}
                onParentSelectionCallback={handleInputs}/>
            <InputField
                placeholder={t('enter-lot-number')}
                className={"col-12 col-md-3"}
                label={t('lot-number')}
                name={"cplotnumber"}
                inputType={"alph-number"}
                onInput={(ev) =>  {
                    handleWildcardInput("cplotnumber", ev);
                    inputLengthCheck(ev?.target?.value);
                }}
                isDisabled={!lotLangSelectReady}/>
            </>
        )}
        {queryType == null && (
            <InputField
                placeholder={t('select-query-type')}
                className={"col-12 col-md-6"}
                label={""}
                name={""}
                isDisabled={true}/>
        )}
    </>);
}