import {useTranslation} from "react-i18next";
import {searchService} from "../services/SearchService";
import {useSharedFilters} from "../shared/Filters";
import {useSharedResults} from "../shared/Results";
import {Button, ComboBox, DropDown} from "@abbott/add-platform";
import {
    SEARCH_TYPES,
    labCentralConfig,
    searchTypesResultsOverrides,
    searchTypesSortOverrides,
    facetsConfigs,
    OUS_Filters
} from "../configs";
import React, {useMemo, useState} from "react";
import {useSharedFacet} from "../shared/Facet";
import {AssayFileDropdowns} from "../technical-library/AssayFileDropdowns";
import {ValueAssignmentDropdowns} from "../technical-library/ValueAssignmentDropdowns";
import {COADropdowns} from "../technical-library/COADropdowns";
import {OpsManualsDropdowns} from "../technical-library/OpsManualsDropdowns";
import {CECertDropdowns} from "../technical-library/CECertDropdowns";
import {useSharedSort} from "../shared/Sort";
import {ProdRequirementsDropdowns} from "../technical-library/ProdRequirementsDropdowns";
import {IFUDropdowns} from "../technical-library/IFUDropdowns";
import {AccreditationDropdowns} from "../technical-library/AccreditationDropdowns";
import {useSharedOUS} from "../shared/OutsideUS";
import {getProductRequirementsEnglishDisplayKeyFromLanguageCode} from "../shared/Utils";
import {useSharedLabProfiles} from "../shared/LabProfiles";
import {useAnalyticsUtils} from "../shared/AnalyticsUtils";

export const SearchFilters = () => {
    const { t, i18n } = useTranslation();
    // these hooks can only be called in functional components, not class components like WCContainer below
    const { doSearch } = searchService();
    const [isResultOverride, setIsResultOverride] = useState(false);
    const [resultsOverrideXFID, setResultsOverrideXFID] = useState(null);
    const { filters, setSearchFilters, filterSearchType, setFilterSearchType, applyOUSFilters, resetFacets} = useSharedFilters();
    const { isLoading, isDisabled, setIsDisabled, setDisplayResultsOverrideID, isError, currentPage, setCurrentPage, setHasSearched} = useSharedResults();
    const {sort, setSearchSort} = useSharedSort();
    const [initSearchType, setInitSearchType] = useState(null);
    const {isOutsideUs,setIsOutsideUs,preferredLanguage} = useSharedOUS();
    const [searchTypeOptions, setSearchTypeOptions] = useState([]);
    const {userRole, profileCountry} = useSharedLabProfiles();
    const [isSearchButtonDisabled, setIsSearchButtonDisabled]= useState(true);
    const {formatAnalyticsSearchObject, analyticsUserAndLabObject, fireAnalyticsEvent} = useAnalyticsUtils();
    const {searchType} = labCentralConfig();
    const [ isLotSpecfic, setLotSpecfic] = useState("");
    const isEmployee = useMemo(() => {return userRole == "employee"}, [userRole]);
    const OUSOptions = useMemo(() => {return [
        {
            label: "In US",
            value: "inUS",
        },
        {
            label: "Outside US",
            value: "OUS"
        }
    ]}, [])
    const OUSDefaultOptions = useMemo(() => {
        // default selection for OUS dropdown
        if (location.pathname.indexOf("/us/en") != -1) {
            // we are on the US site
            return OUSOptions[0];
        } else {
            return OUSOptions[1];
        }
    }, [])
    const searchButtonCallback = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!isDisabled) {
            // don't do search if we're supposed to do a search result override
            if (isResultOverride) {
                setDisplayResultsOverrideID(resultsOverrideXFID);
                setHasSearched(true);
                return;
            } else {
                setDisplayResultsOverrideID(null);
                resetFacets();
                const analyticsObj = formatAnalyticsSearchObject();
                const eventObj = {search:analyticsObj, ...analyticsUserAndLabObject};
                // fire analytics event
                fireAnalyticsEvent("search_submit", eventObj);

                doSearch(true);
            }
        }
    }

    const presetSort = () => {
        const newSort = { isSearching : false, fields : {}};
        const sortOverride = searchTypesSortOverrides[filterSearchType]?.sortOverrides;
        if (sortOverride) {
            newSort.fields = sortOverride;
        }
        setSearchSort(newSort);
    };

    const onSearchTypeSelect = (item: { label: any; value: string; searchtype: string; isOUS?: undefined; isUS?: undefined; } | { label: any; value: string; searchtype: string; isOUS: boolean; isUS: boolean; } | { value: any; label: string; searchtype: string; isOUS?: undefined; isUS?: undefined; }) => {
        setIsDisabled(true);
        setHasSearched(false);
        setLotSpecfic("");
        // reset filters
        const newFilters = [{}];

        setFilterSearchType(item.searchtype);
        setIsResultOverride(false);
        setCurrentPage({pageNum : currentPage.pageNum, isSearching: false, pageWillReset: true});
        // set fragments
        location.hash = `#${item.searchtype}`;

        // inject ous filters
        const appliedOUSFilters = applyOUSFilters(item.searchtype);
        if (Object.keys(appliedOUSFilters).length > 0) {
            newFilters[0] = Object.assign(newFilters[0],appliedOUSFilters)
        }

        setSearchFilters({currentFilters: newFilters, isSearching: false});
    };

    const postSearchType = <ComboBox
        className={"col-12 col-md-3"}
        options={searchTypeOptions}
        label={t('search-type')}
        placeholder={t('select')}
        selectedOverride={initSearchType}
        onChange={onSearchTypeSelect}
        isSearchable={false}/>

    const emptyDropdown = <ComboBox
        className={"col-12 col-md-9"}
        options={[]}
        label={" "}
        placeholder={t('select')}
        isLoading={false}
        isDisabled={true}
        isSearchable={false}/>

    const onOUSSelect = (item: { value: string; }) => {
        if (filterSearchType != "none") {
            // don't clear search type if it hasn't been initialized yet
            history.pushState("", document.title, window.location.pathname
                + window.location.search); // remove hash
            setFilterSearchType("none");
        }
        if (item.value == "inUS") {
            setIsOutsideUs(false);
        } else {
            setIsOutsideUs(true);
        }
        initializeSearchType();
    }

    const checkLotNumberLength = (lotNumVal) => {
        if(lotNumVal?.length >= 3){
            setIsSearchButtonDisabled(false)
        } else {
            setIsSearchButtonDisabled(true)
        }
    }

    const checkLotSpecific = (ev) => {
        setLotSpecfic(ev);
    }

    var countryCode = JSON.parse(localStorage.getItem('profile')); 
    let searchTypeFilters;
    if(countryCode.country == 'FR'){
        searchTypeFilters = {
            "none" : emptyDropdown,
            "va_search" : <ValueAssignmentDropdowns />,
            "assay_search" : <AssayFileDropdowns isDisabled={isDisabled} />,
            "coa_search" : <COADropdowns/>,
            "opmanual_search" : <OpsManualsDropdowns />,
            "ce_search" : <CECertDropdowns />,
            "prodrequire_search" : <ProdRequirementsDropdowns />,
            "pi_search" : <IFUDropdowns 
            lotSpecificSearch={(ev) => {
                checkLotSpecific(ev);
            }}
            checkLotNumberLength={(ev) => {
                checkLotNumberLength(ev);
            }}/>, 
            "accred_search" : <AccreditationDropdowns /> 
        }
    }
    else{
        searchTypeFilters = {
            "none" : emptyDropdown,
            "va_search" : <ValueAssignmentDropdowns />,
            "assay_search" : <AssayFileDropdowns isDisabled={isDisabled} />,
            "coa_search" : <COADropdowns/>,
            "opmanual_search" : <OpsManualsDropdowns />,
            "ce_search" : <CECertDropdowns />,
            "prodrequire_search" : <ProdRequirementsDropdowns />,
            "pi_search" : <IFUDropdowns 
            lotSpecificSearch={(ev) => {
                checkLotSpecific(ev);
            }} 
            checkLotNumberLength={(ev) => {
                checkLotNumberLength(ev);
            }}/>, 
            "accred_search" : <AccreditationDropdowns />
        }
    }

    const initializeSearchType = () => {
        // initialize initSearchType if there's a fragment
        const hash = location.hash.split("#")[1];
        if (hash) {
            const initialSearchType = searchType.find(s => s.searchtype == hash);
            if (initialSearchType) {
                setInitSearchType(initialSearchType);
                onSearchTypeSelect(initialSearchType)
            }
        } else {
            setInitSearchType(null);
        }
    }

    React.useEffect(() => {
        if (isOutsideUs != null) {
            // hide searchTypes based on if in US or outside US
            const searchTypeOptions = searchType.filter(st => {
                // != false so null or false returns false
                if (isOutsideUs) {
                    return st.isOUS != false;
                } else {
                    return st.isUS != false;
                }
            })
            setSearchTypeOptions(searchTypeOptions);

            initializeSearchType();
        }
    }, [isOutsideUs,userRole]);

    React.useEffect(() => {
        presetSort();
        resetFacets();
    }, [filterSearchType]);

    // listen to changes to the filter's state
    React.useEffect( () => {
        // is this a search result override?
        // loop through filters and compare to resultsoverride for this search type
        const isResultsOverride = Object.keys(filters.currentFilters[0])?.some((filterKey) => {
            const resultsOverrides = searchTypesResultsOverrides[filterSearchType]?.resultsOverrides;
            // loop through each key in the results override and compare it to the current key in the filters
            return resultsOverrides?.some((resultOR: { field: string; values: string | any[]; contentID: any; }) => {
                // we have a match if the filter key matches a field & value in the results override
                let isMatch = false;
                isMatch = (resultOR.field == filterKey && ( resultOR.values?.indexOf(filters.currentFilters[0][filterKey]) != -1 ) );

                if (isMatch) {
                    setResultsOverrideXFID(resultOR.contentID);
                }

                return isMatch;
            });
        });
        setIsResultOverride(isResultsOverride ?? false);

        if (filters.isSearching) {
            setSearchFilters({currentFilters: filters.currentFilters, isSearching: false});
            doSearch(false);
        }
    }, [filters]);

    var buttonDisabled;
        if(isLotSpecfic === "lotNumber") {
            buttonDisabled = isDisabled || isSearchButtonDisabled;
        } else {
            buttonDisabled = isDisabled;
        }


    return (<>
        { !isError &&
    (<div className='search-input-section' onKeyDown={(e) => {
        if (e.key == "Enter") {
            if(!isSearchButtonDisabled) {
                searchButtonCallback(e);
            }
        }
    }}>
        {isEmployee && (
            <div className={"row inputs ous"}>
                <ComboBox
                    className={"col-12 col-md-6"}
                    options={OUSOptions}
                    label={t('location')}
                    placeholder={t('select')}
                    onChange={onOUSSelect}
                    selectedOverride={OUSDefaultOptions}
                    isLoading={false}
                    isDisabled={false}/>
            </div>
        )}
        {isOutsideUs &&
            (<div className={"row inputs"}>
                {postSearchType}
                {searchTypeFilters[filterSearchType]}
            </div>)
        }
        {!isOutsideUs &&
            (<div className={"row inputs"}>
                {postSearchType}
                {searchTypeFilters[filterSearchType]}
            </div>)
        } {/* TODO: Quick and dirty way to re-initialize search on OUS selection */}
        <Button
            onClick={searchButtonCallback}
            buttonClasses={((isLoading || buttonDisabled) ? 'search-input-submit disabled' : 'search-input-submit')}
            text={t('search')}
        />
    </div>)}</>)
}
