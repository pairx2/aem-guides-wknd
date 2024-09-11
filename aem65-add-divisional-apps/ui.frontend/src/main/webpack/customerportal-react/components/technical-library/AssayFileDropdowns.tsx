import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import HierarchicalFacetDropdowns from "../search-components/HierarchicalFacetDropdowns";
import {InputField, ComboBox} from "@abbott/add-platform";
import {useSharedFilters} from "../shared/Filters";
import {getLanguage, getLocalizedNameFromLblFileLanguageCode, getLocalizedNameFromLocaleCode} from "../shared/Utils";
import {getLanguageListForType, languagesConfig, listOfCountryCodes} from "../configs";
import {useSharedOUS} from "../shared/OutsideUS";
import {useSharedLabProfiles} from "../shared/LabProfiles";
import {useSharedResults} from "../shared/Results";

export const AssayFileDropdowns = (props) => {
    const {t, i18n} = useTranslation();
    const {filters, setSearchFilters, documentLanguage, setDocumentLanguage, filterSearchType, handleWildcardInput, handleListNumOnInput, resetFacets, formatPrefixedFacet} = useSharedFilters();
    const {preferredLanguage, countryDisplayName, isOutsideUs} = useSharedOUS();
    const {setHasSearched} = useSharedResults();
    const [isLanguageReady, setIsLanguageReady] = useState(true);
    const [isProductReady, setIsProductReady] = useState(false);

    const {isDisabled} = props;
    const [selectedAssayProd, setSelectedAssayProd] = useState("");
    const [areAssayInputsDisabled, setAreAssayInputsDisabled] = useState(false);
    const [assayLanguageOptions, setAssayAssayLanguageOptions] = useState([]);
    const [preferredLanguageOption, setPreferredLanguageOption] = useState({});
    const [profileCountryOption, setProfileCountryOption] = useState({});
    const {userRole, profileCountry} = useSharedLabProfiles();

    const isEmployee = useMemo(() => {return userRole == "employee"}, [userRole]);
    const dropDownsDisabled = useMemo(() => {return !(isLanguageReady && isProductReady)}, [isLanguageReady, isProductReady]);

    const assayCountryOptions = useMemo(() => {
        const countryOptions = [{label: t('none'), value: ""}];
        for (let i=0; i < listOfCountryCodes.length; i++) {
            const countryName = countryDisplayName(listOfCountryCodes[i]);
            if (countryName) {
                countryOptions.push({
                    label : countryName,
                    value : listOfCountryCodes[i]
                })
            }
        }
        return countryOptions;
    }, [countryDisplayName]);

    // Handle selection of the assay file product type
    const onAssayProdSelected = (item) => {
        resetFacets();
        setHasSearched(false);
        setSelectedAssayProd(item.value);
    }

    const assayProdTypeWhitelist = ["ALINITY I", "ALINITY C", "ALINITY S"];

    const getInitialAssayLangOption = () => {
        return {
            label: getLocalizedNameFromLocaleCode(getLanguage(), "assayFileLanguage"),
            value: getLanguage()
        };
    }
    const getInitialAssayCountryOption = () => {
        const ProfileCOUNTRY = profileCountry?.toUpperCase();
        if (ProfileCOUNTRY && ProfileCOUNTRY != "US") {
            return {
                label: countryDisplayName(ProfileCOUNTRY),
                value: ProfileCOUNTRY
            };
        } else {
            // don't set a default country if the user's profile country is US
            return null;
        }

    }

    const getInitialArchitectLanguageOption = () => {
        const langCode = preferredLanguage.split("_")[0]; // truncate after the underscore
        return {
            label: getLocalizedNameFromLblFileLanguageCode(preferredLanguage),
            value: langCode
        }
    }


    React.useEffect(() => {
        const _languageOptions = [];
        // component initialization
        setDocumentLanguage(getInitialAssayLangOption());
        // init assayLanguageOptions
        const configs = languagesConfig["_value"].filter(config => config?.assayFileLanguage);
        configs.forEach(config => {
            // convert the first two characters of locale to lowercase
            const codes = config.locale.split("_");
            const locale = `${codes[0].toLowerCase()}_${codes[1]}`;
            // only push one english option
            if (location.pathname.indexOf("/us/en") == -1) {
                // don't push en_US if on british site
                if (locale == "en_US") {
                    return;
                }
            } else {
                // don't push en_GB if on us site
                if (locale == "en_GB") {
                    return;
                }
            }
            _languageOptions.push({
                label: config.displayValue,
                value: locale
            });
        });

        setAssayAssayLanguageOptions(_languageOptions);

        // get the current language for the language non-alinity dropdown
        setPreferredLanguageOption(getInitialArchitectLanguageOption());
    }, []);

    React.useEffect(() => {
        // exclude user's country if they are in a restricted country
        if (profileCountry && !isEmployee) {
            setProfileCountryOption(getInitialAssayCountryOption());
            if (isOutsideUs) {
                const newFilter = filters.currentFilters;
                newFilter[0]["cpexcountry"] = profileCountry;
                setSearchFilters({currentFilters: newFilter, isSearching: false})
            }
        } else {
            setProfileCountryOption( {label: t('none'), value: ""})
        }
    }, [profileCountry]);

    // listen to changes to the isAssayNameDisabled
    React.useEffect(() => {
        let _disabled = isDisabled;
        const strippedSelectedAssayProd = formatPrefixedFacet(selectedAssayProd)?.toUpperCase();
        if (assayProdTypeWhitelist.indexOf(strippedSelectedAssayProd) == -1) {
            // we disabled the inputs if one of the products in the whitelist isn't selected
            _disabled = true;
            // reset the cplistnumner and cpfilename fields if not alinity
            const newFilters = filters.currentFilters;
            delete newFilters[0]['cplistnumber'];
            delete newFilters[0]['cpfilename'];
            setSearchFilters({currentFilters: newFilters, isSearching: false})
            // set lang to initial
            setDocumentLanguage(getInitialAssayLangOption());
            if (!areAssayInputsDisabled) {
                setIsLanguageReady(false);
            }
        } else {
            // reset the cplanguage field if assay alinity
            const newFilters = filters.currentFilters;
            delete newFilters[0]['cplanguage'];
            setSearchFilters({currentFilters: newFilters, isSearching: false})
        }
        setAreAssayInputsDisabled(_disabled);
    }, [selectedAssayProd]);

    // reset documentLanguage on searchtype change
    React.useEffect(() => {
        setDocumentLanguage(getInitialAssayLangOption());
    }, [filterSearchType]);

    const onAssayLanguageSelect = (item) => {
        resetFacets();
        setHasSearched(false);
        setDocumentLanguage(item);
    }

    const onAssayCountrySelect = (item) => {
        resetFacets();
        setHasSearched(false);
        if (item.value) {
            const newFilter = filters.currentFilters;
            newFilter[0]["cpexcountry"] = item.value;
            setSearchFilters({currentFilters: newFilter, isSearching: false})
        } else {
            // delete excluded country
            const newFilter = filters.currentFilters;
            delete newFilter[0]["cpexcountry"];
            setSearchFilters({currentFilters: newFilter, isSearching: false})
        }
    }

    const AssayLanguageFormat = (value) => {
        return getLocalizedNameFromLblFileLanguageCode(value);
    }

    const onProductLoaded = () => {
        setIsProductReady(true);
    }
    const onLanguageLoaded = () => {
        setIsLanguageReady(true);
    }

    return (<>
        <HierarchicalFacetDropdowns
            parentClassName={'col-12 col-md-3'}
            parentLabel={t('product')}
            parentPlaceholder={t('select')}
            parentFilter={"cpproduct"}
            facetName={"cpproduct"}
            facetType={"specific"}
            isRequired={true}
            isDisabled={dropDownsDisabled}
            onParentSelectionCallback={onAssayProdSelected}
            parentFormatLabelsFn={formatPrefixedFacet}
            onParentLoaded={onProductLoaded}/>
        {areAssayInputsDisabled && (<HierarchicalFacetDropdowns
            parentClassName={'col-6 col-md-3'}
            parentLabel={t('language')}
            parentPlaceholder={t('select')}
            parentFilter={"cplanguage"}
            facetName={"cplanguage"}
            facetType={"specific"}
            isDisabled={!(isOutsideUs || isEmployee)}
            parentSelectedOverride={preferredLanguageOption}
            onParentLoaded={onLanguageLoaded}
            parentFormatLabelsFn={AssayLanguageFormat}/>)}
        {!areAssayInputsDisabled && (<ComboBox
            className={'col-6 col-md-3'}
            options={assayLanguageOptions}
            label={t('language')}
            placeholder={t('select')}
            isLoading={false}
            isDisabled={dropDownsDisabled || !(isOutsideUs || isEmployee)}
            selectedOverride={documentLanguage}
            onChange={onAssayLanguageSelect}/>)}
        <ComboBox
            className={'col-6 col-md-3'}
            options={assayCountryOptions}
            label={t('exclude-country')}
            placeholder={t('select')}
            isLoading={false}
            isHidden={!isEmployee}
            isDisabled={dropDownsDisabled || !isOutsideUs}
            selectedOverride={profileCountryOption}
            onChange={onAssayCountrySelect}/>
        <InputField
            placeholder={t('search-by-name')}
            className={"col-12 col-md-3"}
            label={t('assay-name')}
            name={"cpfilename"}
            onInput={(ev) => handleWildcardInput("cpfilename", ev)}
            isDisabled={dropDownsDisabled || areAssayInputsDisabled}/>
        <InputField
            placeholder={t('search-by-list-num')}
            className={"col-12 col-md-3"}
            label={t('list-number')}
            name={"cplistnumber"}
            onInput={(ev) => handleListNumOnInput("cplistnumber", ev)}
            isDisabled={dropDownsDisabled || areAssayInputsDisabled}/>
    </>);
}
