import React, {useRef, useState, useMemo} from 'react';
import {useTranslation} from "react-i18next";
import {useSharedResults} from "../shared/Results";
import {DocumentsList} from "../cell-components/DocumentsList";
import {DateCell} from "../cell-components/DateCell";
import {ConditionPills} from '../cell-components/ConditionPills'
import {DocumentItem} from '../cell-components/DocumentItem';
import {
    Accordion,
    Checkbox,
    LoadingIndicator,
    ResultsTable,
    SortableColumnHeader,
    XFDisplay
} from '@abbott/add-platform';
import {searchService} from "../services/SearchService";
import {useSharedSort} from "../shared/Sort";
import SearchPagination from "../search-components/SearchPagination";
import SearchFacets from "./SearchFacets";
import {useSharedFilters} from "../shared/Filters";
import {useSharedFacet} from "../shared/Facet";
import {CellText} from "../cell-components/CellText";
import {DownloadModal} from "./DownloadModal";
import {languagesConfig, getLanguageListForType, labCentralConfig, SEARCH_TYPES} from "../configs";
import {useAnalyticsUtils} from "../shared/AnalyticsUtils";
import {PrefixedFacetText} from "../cell-components/PrefixedFacetText";
import {SearchResultsConfig} from "./SearchResultsConfig";

export const SearchResults = (props) => {
    // these hooks can only be called in functional components, not class components
    const { t, i18n } = useTranslation();
    const {results, currentFields, isError, hasSearched, isLoading, currentPage, resultCount, setCurrentPage, resultsSearchType, displayResultsOverride, selectedDownloadRows, setSelectedDownloadRows, resultDocumentLanguage} = useSharedResults();
    const { filters, filterSearchType, formatPrefixedFacet, isExactMatchFilter, stripExactMatchRegex} = useSharedFilters();
    const {doSearch} = searchService();
    const {setSearchSort,sort} = useSharedSort();
    const {facets,setSearchFacet} = useSharedFacet();
    const [useFacets, setUseFacets] = useState(false);
    const [hasBulkDownload, setHasBulkDownload] = useState(false);
    const [instructionContentXFId, setInstructionContentXFId] = useState(null);
    const [facetLayout, setFacetLayout] = useState("side");
    const [areAllDownloadsSelected, setAreAllDownloadsSelectedState] = useState(false);
    const downloadModal = useRef();
    const {analyticsUserAndLabObject,
        fireAnalyticsEvent,
        analyticsActiveDownloads,
        setAnalyticsActiveDownloads,
        formatAnalyticsFileObject} = useAnalyticsUtils();
    const {searchType} = labCentralConfig();
    const {searchTypesDisplayConfig, initiateDownload} = SearchResultsConfig(downloadModal);

    const Components = {
        "text" : CellText,
        "DateCell" : DateCell,
        "DocumentsList" : DocumentsList,
        "ConditionPills" : ConditionPills,
        "DocumentItem": DocumentItem,
        "PrefixedFacetText" : PrefixedFacetText
    }
    
    const initiateBulkDownload = () => {        
        let downloadDocuments = [];
        Object.keys(selectedDownloadRows).forEach(key => {
            const docs = selectedDownloadRows[key].documents;
            downloadDocuments = downloadDocuments.concat(docs);
        });
        initiateDownload(downloadDocuments);
    }
    
    function handleSortChange(e) {
        // set sort state
        const newSortItem = e.detail,
            newSort = { isSearching : true, fields : {}};

        // add the new sort item if not "none"
        if (newSortItem.order != 'none') {
            newSort.fields[newSortItem.field] = newSortItem.order;
        }
        
        setSearchSort(newSort);
    }
    
    const formatFilterValueForWhitelist = (filterValue) => {
        let value = filterValue;
        // is the filterValue an exact match jquery?
        const isExactMatch = isExactMatchFilter(filterValue);
        if (isExactMatch) {
            value = stripExactMatchRegex(filterValue);
        }
        const strippedFilterVal = formatPrefixedFacet(value)?.toUpperCase();
        return strippedFilterVal
    }
    
    const checkUseFacets = () => {
        let useFacets = searchTypesDisplayConfig[resultsSearchType]?.useFacets ?? false;
        const facetLayout = searchTypesDisplayConfig[resultsSearchType]?.facetLayout ?? "side";
        const facetsOverrides = searchTypesDisplayConfig[resultsSearchType]?.facetsOverrides;
        // loop through each key in the results override and compare it to the current key in the filters
        Object.keys(filters.currentFilters[0])?.some((filterKey) => {
            // loop through each key in the results override and compare it to the current key in the filters
            return facetsOverrides?.some((facetOR) => {
                // we have a match if the filter key matches a field & value in the facets override.
                const strippedFilterVal = formatFilterValueForWhitelist(filters.currentFilters[0][filterKey]);
                
                if (facetOR.field == filterKey && ( facetOR.values?.indexOf(strippedFilterVal) != -1 ) ) {
                    useFacets = facetOR.useFacets;
                    return true;
                }
                return false;
            });
        });

        setUseFacets(useFacets);
        setFacetLayout(facetLayout);
    }
    
    const resetSelectedDownloads = () => {
        setSelectedDownloadRows({});
        setAreAllDownloadsSelectedState(false);
        setAnalyticsActiveDownloads({
            fileLanguage: [], // if applicable
            fileName: [],
            fileType: []});
        
    }

    // component initialization
    React.useEffect(() => {
        document.addEventListener('sortChanged', handleSortChange);

        return () => document.removeEventListener('sortChanged', handleSortChange);
    }, []);

    // listen to changes to the sort's state
    React.useEffect( () => {
        if (sort.isSearching) {
            const newSort = {fields : sort.fields, isSearching : false}
            setSearchSort(newSort);
            resetSelectedDownloads();
            doSearch(true);
        }
    }, [sort]);

    React.useEffect( () => {
        if (currentPage.isSearching) {
            resetSelectedDownloads();
            doSearch(false);
            setCurrentPage({pageNum : currentPage.pageNum, isSearching: false, pageWillReset: false});
        }
    }, [currentPage]);

    // listen to changes to the facet's state
    React.useEffect( () => {
        if (facets.isSearching) {
            facets.isSearching = false;
            setSearchFacet(facets);
            resetSelectedDownloads();
            setCurrentPage({pageNum : currentPage.pageNum, isSearching: false, pageWillReset: true});
            doSearch(true);
        }
    }, [facets]);

    React.useEffect(() => {
        checkUseFacets();
        checkHasBulkDownloads();
        resetSelectedDownloads();
        getInstructionContent();
    }, [currentFields]);
    
    React.useEffect(() => {
        resetSelectedDownloads();
    }, [resultsSearchType]);

    const getAppliedColumns = () => {
        return searchTypesDisplayConfig[resultsSearchType]?.resultsFields?.filter(column => currentFields.indexOf(column.field) != -1);
    }
    
    // tests the configs for bulk download
    const checkHasBulkDownloads = () => {
        let bulkDownload = searchTypesDisplayConfig[resultsSearchType]?.hasBulkDownload ?? false;
        const bulkDownloadOverrides = searchTypesDisplayConfig[filterSearchType]?.bulkDownloadOverrides;
        // loop through each key in the results override and compare it to the current key in the filters
        Object.keys(filters.currentFilters[0])?.some((filterKey) => {
            // loop through each key in the results override and compare it to the current key in the filters
            return bulkDownloadOverrides?.some((bulkDownloadOR) => {
                // we have a match if the filter key matches a field & value in the bulk download override
                const strippedFilterVal = formatFilterValueForWhitelist(filters.currentFilters[0][filterKey]);
                if (bulkDownloadOR.field == filterKey && ( bulkDownloadOR.values?.indexOf(strippedFilterVal?.toUpperCase()) != -1 ) ) {
                    bulkDownload = bulkDownloadOR.hasBulkDownload;
                    return true;
                }
                return false;
            });
        });
        setHasBulkDownload(bulkDownload);
    }
    // get instruction content XF Id
    const getInstructionContent = () => {
        let instructionContent = searchTypesDisplayConfig[resultsSearchType]?.instructionContent;
        const instructionContentOverrides = searchTypesDisplayConfig[filterSearchType]?.instructionContentOverrides;
        // loop through each key in the results override and compare it to the current key in the filters
        Object.keys(filters.currentFilters[0])?.some((filterKey) => {
            // loop through each key in the results override and compare it to the current key in the filters
            return instructionContentOverrides?.some((instructionContentOR) => {
                // we have a match if the filter key matches a field & value in the bulk download override
                const strippedFilterVal = formatFilterValueForWhitelist(filters.currentFilters[0][filterKey]);
                if (instructionContentOR.field == filterKey && ( instructionContentOR.values?.indexOf(strippedFilterVal) != -1 ) ) {
                    instructionContent = instructionContentOR.instructionContent;
                    return true;
                }
                return false;
            });
        });
        setInstructionContentXFId(instructionContent);
    }

    const renderHeadersMobile =() =>{
        return (
            <>
                {getAppliedColumns()?.map((column, index) => (
                    <React.Fragment key={`column_header_${index}`}>
                        {column.sortable == true &&
                            (<SortableColumnHeader
                                name={column.name}
                                field={column.field}
                                order={sort.fields[column.field]}
                                />)
                        }

                    </React.Fragment>
                ))}
            </>

        );
    }
    
    const onAllCheckboxesSelect = (state) => {
        if (areAllDownloadsSelected === true) {
            setSelectedDownloadRows({});
        } else {
            // add all result rows to selectedDownloadRows
            // loop through each result row, and add selected rows
            const _selectedRows = {};
            results?.forEach((result) => {
                _selectedRows[result["urihash"]] = getNewDownloadRow(result);
            });
            
            setSelectedDownloadRows(_selectedRows);
        }
        setAreAllDownloadsSelectedState(!areAllDownloadsSelected)
    }
    
    const isRowSelected = (result) => {
        return selectedDownloadRows.hasOwnProperty(result?.urihash);
    }
    
    const addRowDownload = (result) => {
        const newDownloadRow = getNewDownloadRow(result);
        const _selectedRows = {...selectedDownloadRows};
        _selectedRows[result["urihash"]] = newDownloadRow;
        setSelectedDownloadRows(_selectedRows);
        if (Object.keys(_selectedRows).length == results.length) {
            setAreAllDownloadsSelectedState(true);
        }
    }
    
    const getNewDownloadRow = (result) => {
        // get doc item function
        const downloadColumns = searchTypesDisplayConfig[resultsSearchType].resultsFields.filter((column) => {
            return column?.isDownload ?? false;
        });
    
        /***
         * want to return this object
         * {
         *     documents: [
         *         {
         *                 "searchType": "IFU",
         *                 "documentId": "cal_SP_37001M800"
         *             },
         *             {
         *                 "searchType": "IFU",
         *                 "documentId": "cal_TDMMCC_03294FD01"
         *             },
         *     ]
         * }
         */
        let downloadItems = [];
        downloadColumns.forEach(column => {
            if (typeof column.valueFn == "function") {
                const items = column.valueFn(result, column?.field)?.docsCollection;
                downloadItems = downloadItems.concat(items);
            }
        })
        return {
            documents : downloadItems
        };
    }
    
    const removeRowDownloads = (result) => {
        const _selectedRows = {...selectedDownloadRows};
        delete _selectedRows[result["urihash"]];
        setSelectedDownloadRows(_selectedRows);
        setAreAllDownloadsSelectedState(false);
    }
    
    const onCheckboxSelect = (state, result) => {
        const checked = isRowSelected(result);
        if (checked !== true) {
            addRowDownload(result);
        } else {
            removeRowDownloads(result);
        }
    }
    
    const renderFirstColumnHeader = () => {
        return (
            <Checkbox id={'header_download_all_checkbox'}
                      onChange={onAllCheckboxesSelect}
                      parentControl={true}
                      checked={areAllDownloadsSelected}
                      text={''}/>);
    }
    
    const renderFirstColumn = (result) => {
        return (
            <Checkbox text={result.field}
                      id={`options_${result.urihash}`}
                      parentControl={true}
                      checked={isRowSelected(result)}
                      onChange={(state) => {
                          onCheckboxSelect(state, result);
                      }}
                      className={"desktop"} />
        );
    }

    const renderFirstColumnMobile = (result, field) => {
        return (
            <Checkbox text={''}
                      id={`options_${result.urihash}`}
                      parentControl={true}
                      checked={isRowSelected(result)}
                      onChange={(state) => {
                          onCheckboxSelect(state, result);
                      }}
                      className={"mobile"}/>
        );
    }

    const renderTextPreSearch = () => {
        switch(filterSearchType){
            case SEARCH_TYPES.ACCREDITATION_SH_FORMS:
                return(
                    <div className={'sh-43-form-text'}>
                         <XFDisplay
                          xfid={'sh-43-form-text'}/>
                    </div>)
                break;
            case SEARCH_TYPES.PACKAGE_INSERTS:
                return(
                    <div className={'search-instructional-use'}>
                         <XFDisplay
                          xfid={'search-instructional-use'}/>
                    </div>)
                break;
            case SEARCH_TYPES.PRODUCT_REQUIREMENTS:
                    return(
                        <div className={'product-requirements-text'}>
                             <XFDisplay
                              xfid={'product-requirements-text'}/>
                        </div>)
                    break;
            case SEARCH_TYPES.CE_CERTIFICATES:
                        return(
                            <div className={'CE-certificates-text'}>
                                 <XFDisplay
                                  xfid={'CE-certificates-text'}/>
                            </div>)
                        break;
            case SEARCH_TYPES.COA_BATCH_VERIFICATIONS:
                return(
                    <div className={'COA-Batch-Verifications-text'}>
                         <XFDisplay
                          xfid={'COA-Batch-Verifications-text'}/>
                    </div>)
                break;
            case SEARCH_TYPES.OPERATIONS_MANUALS:
                return(
                  <div className={'OPERATIONS-MANUALS-pre-text'}>
                      <XFDisplay
                        xfid={'OPERATIONS-MANUALS-pre-text'}/>
                  </div>)
                break;
            case SEARCH_TYPES.ASSAY_FILES:
                return(
                  <div className={'ASSAY-FILES-pre-text'}>
                      <XFDisplay
                        xfid={'ASSAY-FILES-pre-text'}/>
                  </div>)
                break;
            case SEARCH_TYPES.VALUE_ASSIGNMENTS:
                return(
                  <div className={'VALUE-ASSIGNMENTS-pre-text'}>
                      <XFDisplay
                        xfid={'VALUE-ASSIGNMENTS-pre-text'}/>
                  </div>)
                break;
            default:
            return(            
                <div className={'no-search-selected'}>
                    <XFDisplay
                        xfid={'apiError_searchNoSearchSelected'}/>
            </div>);
        }
    }

    const renderNoResults = () => {
        let facetClasses = "";
        if (useFacets) {
            facetClasses = (facetLayout != "top") ? "facets" : "facets-top";
        }
        return (
            <div className={`no-results custom-search-results ${facetClasses}`}>
                { (filterSearchType && useFacets) && (
                  <SearchFacets />
                )}
                <XFDisplay
                    xfid={'apiError_searchNoResult'}/>
            </div>
        )
    }
    
    const positionPostText = () => {
        if(filterSearchType==SEARCH_TYPES.ASSAY_FILES){
            return true;
        }
        return false;
    }

    const getResultsSearchTypeLabel = () => {
        return searchType.find(st => st.searchtype === resultsSearchType)?.label;
    }

    if (hasSearched && displayResultsOverride == null && !isError) {
        if (results && results.length > 0 ) {
            let facetClasses = "";
            if (useFacets) {
                facetClasses = (facetLayout != "top") ? "facets" : "facets-top";
            }
            return (
                <>
                 {instructionContentXFId && (<XFDisplay xfid={instructionContentXFId} />)}
                <div className={`custom-search-results  ${isLoading ? 'loading' : ''} ${facetClasses}`}>
                    {isLoading && (
                      <div className="custom-search-results__loading-mask">
                          <LoadingIndicator/>
                      </div>
                    )}
                    <div className={`title a-title--fg a-title--fg-secondary__ mobile-title`}>
                        <h4>{resultCount} {t('results')}</h4>
                    </div>

                          <Accordion
                        text={t('sort-by')}
                        items={renderHeadersMobile()}
                        className={"first-row"}
                    />

                    { (filterSearchType && useFacets) && (
                        <SearchFacets />
                    )}

                    <div className={`custom-search-results__results`}>
                    <div className={`title a-title--fg a-title--fg-secondary desktop-title`}>
                        <h4>{resultCount} {t('results')}</h4>
                    </div>
                        <h3>{getResultsSearchTypeLabel()}</h3>
                    {Object.keys(selectedDownloadRows).length > 0 && (
                      <div className="a-button a-button--md a-button--primary button">
                          <button className={"btn"} onClick={initiateBulkDownload}>{`${t('download-selected')} (${Object.keys(selectedDownloadRows).length})`}</button>
                      </div>
                    )}
                    <div className={"results-table"}>
                        <ResultsTable
                            appliedColumns={getAppliedColumns()}
                            Components={Components}
                            results={results}
                            sort={sort}
                            resultKeyName={'urihash'}
                            hasFirstColumn={hasBulkDownload}
                            renderFirstColumnHeader={renderFirstColumnHeader}
                            renderFirstColumn={renderFirstColumn}
                            renderFirstColumnMobile={renderFirstColumnMobile}/></div>
                        <SearchPagination/>
                    </div>
                    <DownloadModal id={"search-results-dl-modal"}
                                   ref={downloadModal} />
                </div>
                </>);
            
        } else {
            return (<div className={`custom-search-results ${isLoading ? 'loading' : ''}`}>
                {isLoading && (
                    <div className="custom-search-results__loading-mask">
                        <LoadingIndicator />
                    </div>
                )}
                {renderNoResults()}
            </div>);
        }
    } else if (displayResultsOverride != null && !isError && hasSearched) {
        return (<div className={'results-override'}>
            <XFDisplay
                xfid={displayResultsOverride}/>
        </div>)
    } else if (isError) {
        // Display Authored Instructional Text
        return (<div className={`custom-search-results ${isLoading ? 'loading' : ''}`}>
            {isLoading && (
              <div className="custom-search-results__loading-mask">
                  <LoadingIndicator />
              </div>
            )}
            <div className={'no-search-selected'}>
                <XFDisplay
                    xfid={'apiError_searchServiceError'}/>
            </div>
        </div>);
    } else {
        // Display Authored Instructional Text
        return (<div className={`custom-search-results ${isLoading ? 'loading' : ''}`}>
            {isLoading && (
              <div className="custom-search-results__loading-mask">
                  <LoadingIndicator />
              </div>
            )}
                {renderTextPreSearch()}
        </div>);
    }
};