import * as React from "react";
import ReactPaginate from 'react-paginate';

import Dropdown from "../components/Dropdown";
import Search from "../components/Search";
import Filter from "../components/Filter";
import SelectedFilters from "../components/SelectedFilters";
import { sendFormData, getErrorMessage, getMessageForReg } from "../common/api";
import globalSearchService from "../services/global-search.service.js";

class GlobalSearch extends React.Component {

    constructor(props) {
        super(props);
        this.aemData = props.data;
        this.defaultCategory = props.data.searchFilters.defaultValue;
        // Set default state
        this.state = {
            isLoading: true,
            searchResults: [],
            filters: [],
            selectedFilters: [],
            openFilter: true,
            searchTerm: "",
            category: this.defaultCategory,
            language: "",
            sortType: props.data.sortBy.defaultValue,
            pageSize: props.data.pageSize.defaultValue,
            currentPage: 0,
            totalCount: 0,
            totalPages: 0,
            forcePage: 0,
            noResults: false

        };
    }
    // Renders onload
    componentDidMount() {
        const URL = "?" + window.location.href.split("?")[1];
        let q = "";
        if (URL) {
            const urlParams = new URLSearchParams(URL);
            q = urlParams.get("q");
        }
        const { searchTerm, category, sortType, pageSize, currentPage } = this.state;

        this.fetchData({
            searchTerm: q,
            category: category,
            sortType: sortType,
            currentPage: 1,
            pageSize: pageSize
        });

        this.aemData.searchFilters.filterOptions.forEach(filter => {
            filter.isVisible = true;
            filter.isExpanded = false;
            filter.initialFilters = 10;

        });

        this.setState({
            filters: this.aemData.searchFilters.filterOptions,
            searchTerm: q
        });
    }
    calculatePageNumber = (currentPage, pageSize) => {
       return  currentPage > 0 ? (pageSize * currentPage) + 1 : currentPage + 1;
    }
    /**
   * @function
   * @desc Make an AJAX call to fetch search term data
   * @param {Object} data passing dynamic data through states
   */
    fetchData = (data) => {
        const { pageSize } = this.state;
        this.setState({
            isLoading: true
        });
        let actionPath = this.aemData.actionPath;
        if(!data.category){
            data.category = this.defaultCategory;
        }
        let formData = globalSearchService.siteSearch(data);

        sendFormData(actionPath, formData).then(results => {
            if(results.errorCode===500 || results.errorCode===404){
				$('#template.global-error p').html( getMessageForReg("GEN_ERR"));                      
				$('#template').show();

			}
            ABBOTT.gtm.buildAndPush.formTracking('search', 'submit', 'search-submit');
            if (results.status) {
                this.setState({
                    searchResults: results.response.results,
                    totalCount: results.response.totalCount,
                    totalPages: Math.ceil(results.response.totalCount / pageSize),
                    noResults: false,
                    isLoading: false
                }, () => {
                    // high light search term
                    let term = this.state.searchTerm;
                    if (term) {
                        jQuery(".globalSearch__items").show(term).unmark();
                        jQuery(".globalSearch__items").mark(term, { "caseSensitive": false });
                    }
                });
            } else {
                this.setState({
                    searchResults: [],
                    totalCount: 0,
                    totalPages: 0,
                    noResults: true,
                    isLoading: false

                });
            }
            ABBOTT.main.setSocialIcons();

        }, (fail) => {
            console.log(fail);
        });

    }
    /**
	 * @function
	 * @desc get the selected sort otpion and form a query
	 * @param {Object} selectedOption selected sort option
	 */
    sortByHandleChange = (selectedOption) => {
        this.aemData.sortBy.defaultLabel = selectedOption.label;
        const { searchTerm, category, sortType, currentPage, pageSize, language } = this.state;
        this.setState({
            sortType: selectedOption.value,
            currentPage: 0,
            forcePage: 0
        }, () => {
            this.fetchData({
                searchTerm: searchTerm,
                category: category,
                language: language,
                sortType: selectedOption.value,
                currentPage: 1,
                pageSize: pageSize

            });
        });
    }
    /**
	 * @function
	 * @desc get the selected show no of items otpion and form a query
	 * @param {Object} selectedOption selected sortType option
	 */
    pageSizeHandleChange = (selectedOption) => {
        const { searchTerm, category, sortType, currentPage, pageSize, language } = this.state;
        this.setState({
            pageSize: selectedOption.value,
            currentPage: 0,
            forcePage: 0
        }, () => {
            this.fetchData({
                searchTerm: searchTerm,
                category: category,
                language: language,
                sortType: sortType,
                currentPage: 1,
                pageSize: selectedOption.value
            });
        });
    }
    /**
	 * @function
	 * @desc get the selected page number from pagination and form a query
	 * @param {number} value selected page number
	 */
    pageClickHandleChange = (value) => {
        const { searchTerm, category, sortType, currentPage, pageSize, language } = this.state;
        this.setState({
            currentPage: value.selected,
            forcePage: value.selected
        }, () => {
            this.fetchData({
                searchTerm: searchTerm,
                category: category,
                language: language,
                sortType: sortType,
                currentPage: this.calculatePageNumber(value.selected, pageSize),
                pageSize: pageSize
            });
        });

    }
    /**
 * @function
 * @desc on search submit and form a query with search value
 */
    handleSearchTermSubmit = (value) => {
        const { searchTerm, category, sortType, currentPage, pageSize, language } = this.state;
        this.setState({
            searchTerm: value,
            currentPage: 0
        }, () => {
            this.fetchData({
                searchTerm: value,
                category: category,
                language: language,
                sortType: sortType,
                currentPage: 1,
                pageSize: pageSize
            });
        });

    }

    /**
	* @function
	* @desc on click show more filters
	* @param {Object} selectedFilter - gets selected filter properties
	*/
    handleShowMoreFilters = (selectedFilter) => {
    }

    /**
	* @function
	* @desc on click show less filters
	* @param {Object} selectedFilter - gets selected filter properties
	*/
    handleShowLessFilters = (selectedFilter) => {
    }

    /**
 * @function
 * @desc event handler to toggle the filter individually
 * @param {Object} selectedFilter - gets selected filter properties
 */
    handleFilterToggle = (selectedFilter) => {
        selectedFilter.isVisible = !selectedFilter.isVisible;
        // create copy of all filters with updated one
        this.setState({
            filters: [...this.state.filters.filter(filter => {
                if (filter.label !== selectedFilter.label) {
                    return filter;
                } else {
                    return { ...selectedFilter }
                }
            })]
        })
    }

    /**
* @function
* @desc event handler to get the selected filters
* @param {String} filter Capturing the filter category
* @param {String} item Capturing the filter item
*/
    handleSelectFilter = (item, filter) => {
        const { searchTerm, category, sortType, currentPage, pageSize } = this.state;
        let updatedFilters = [...this.state.selectedFilters];
        let categoryObj = {
            type: filter.attribute_code,
            value: item.value,
            label: item.label
        };
        item.isItemChecked = !item.isItemChecked;
        if (item.isItemChecked) {
            updatedFilters = [...updatedFilters, categoryObj];
        }
        else {
            updatedFilters = updatedFilters.filter(select => select.value !== item.value);
        }
        let filters = "";
        if(filter.attribute_code == "category" && filter.options.length === updatedFilters.length && updatedFilters.length === 0){
             filters = this.defaultCategory;
        } else {
            updatedFilters.filter(x => x.type == filter.attribute_code).forEach(item => {
                filters = filters !== "" ?  filters + ',' + item.value : item.value;
            });
        }
        let stateFilters = {
            selectedFilters: updatedFilters,
            currentPage: 0
        }
        stateFilters[filter.attribute_code] = filters;

        this.setState(stateFilters, () => {
            this.fetchData({
                searchTerm: searchTerm,
                category: this.state.category,
                language: this.state.language,
                sortType: sortType,
                currentPage: 1,
                pageSize: pageSize
            });
        });
    }

    /**
	* @function
	* @desc event handler to clear single filtered option
	* @param {String} filterName getting the name of the filter
	* @param {Object} selectedArr getting the selected filters
	* @param {Object} filters getting all the filters
	*/
    handleClearSingleFilterOption = (filterName, selectedArr, selectedLabel, filters) => {
        const { searchTerm, category, sortType, currentPage, pageSize } = this.state;
        // remove filter to be cleared from the selected filters
        let updatedSelectedArr = selectedArr.filter(select => select.label !== selectedLabel);
        this.state.filters.map(item => {
            // check selected items
            item.options.map(filterItem => {
                filterItem.isItemChecked = false;
                updatedSelectedArr.forEach(selected => {
                    if (filterItem.value === selected.value) {
                        return filterItem.isItemChecked = true;
                    }
                })
            });
        });
        let selectedFilters = "";
        updatedSelectedArr.filter(x => x.type == filterName).forEach(item => {
                    selectedFilters = selectedFilters !== "" ?  selectedFilters + ',' + item.value : item.value;
                });
        let stateFilters = {
            selectedFilters: updatedSelectedArr,
            currentPage: 0,
            filters: [...this.state.filters],
        }
        stateFilters[filterName] = selectedFilters;
        this.setState(stateFilters, () => {
            this.fetchData({
                searchTerm: searchTerm,
                category: this.state.category,
                language: this.state.language,
                sortType: sortType,
                currentPage: 1,
                pageSize: pageSize
            });
        });
    }
    /**
	 * @function
	 * @desc event handler to clear all the filtered options
	 * @param {Object} filters getting all the filters
	 */
    handleClearAllFilters = (filters) => {
        const { searchTerm, category, sortType, currentPage, pageSize } = this.state;
        this.state.filters.map(item => {
            // check selected items
            item.options.map(filterItem => {
                filterItem.isItemChecked = false;
            });
        });
        this.setState({
            selectedFilters: [],
            filters: [...this.state.filters],
            category: this.defaultCategory,
            language: "",
            currentPage: 0
        }, () => {
            this.fetchData({
                searchTerm: searchTerm,
                category: this.defaultCategory,
                sortType: sortType,
                currentPage: 1, 
                pageSize: pageSize
            });
        });
    }
    render() {
        let { isLoading, noResults, searchResults, searchTerm, filters, selectedFilters, totalCount, totalPages, forcePage, pageSize } = this.state;
        return (
            <div className="row">

                {!isLoading && <>

                    <div className="col-lg-3 col-md-4">
                        <div className="globalSearch__search mb-4">
                            <Search labels={this.aemData} searchTerm={searchTerm} setSuggestions={false}
                                handleSearchTermSubmit={this.handleSearchTermSubmit} />
                        </div>
                        <div className="row globalSearch__sort-wrapper d-flex d-md-none">
                            {/* Search results message - tablet and above */}
                            <div className="col-6 globalSearch__results my-auto">
                                    ({totalCount} Results)
                            </div>
                            {/* sort results */}

                            <div className="col-6 col-lg-2 col-md-5 ml-auto">
                                <Dropdown key={1}
                                    label={this.aemData.sortBy.label}
                                    options={this.aemData.sortBy.options}
                                    placeholder={this.aemData.sortBy.label + ' ' + this.aemData.sortBy.defaultLabel}
                                    isSearchable={false}
                                    handleChange={this.sortByHandleChange}
                                />
                            </div>
                        </div>
                        <div className="filters">
                            <h3 className="filters__title1 d-none d-md-block">{this.aemData.filtersLabel}</h3>
                            <h3 className="filters__title1  d-md-none text-uppercase"
                                onClick={(e) => this.setState({ openFilter: !this.state.openFilter })} >
                                {this.aemData.filtersLabel} <span className={` sim-icons float-right ${this.state.openFilter ? "" : "d-none"}`} data-icon="add-white"></span>
                                <span className={` sim-icons float-right ${this.state.openFilter ? "d-none" : ""}`}
                                    data-icon="minus-white"></span>
                            </h3>
                            <div className={`${this.state.openFilter ? "collapse in" : ""}`}>
                                <SelectedFilters
                                    filters={filters}
                                    selectedFilters={selectedFilters}
                                    onClearAllFilter={this.handleClearAllFilters}
                                    onClearSingleFilterOption={this.handleClearSingleFilterOption}
                                    variation="mobile" labels={this.aemData}
                                    showCategory={false}
                                />
                                <div className="d-md-none">
                                    {filters.map(filter => (
                                        <Filter
                                            key={filter.attribute_code}
                                            filter={filter}
                                            onShowMoreFilters={this.handleShowMoreFilters}
                                            onShowLessFilters={this.handleShowLessFilters}
                                            onToggle={this.handleFilterToggle}
                                            onSelectFilter={this.handleSelectFilter}
                                            labels={this.aemData}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="d-none d-md-block">
                                {filters.map(filter => (
                                    <Filter
                                        key={filter.attribute_code}
                                        filter={filter}
                                        onShowMoreFilters={this.handleShowMoreFilters}
                                        onShowLessFilters={this.handleShowLessFilters}
                                        onToggle={this.handleFilterToggle}
                                        onSelectFilter={this.handleSelectFilter}
                                        labels={this.aemData}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 mt-4 mt-md-0">
                        <div className="row globalSearch__sort-wrapper d-none d-md-flex">
                            {/* Search results message - tablet and above */}
                            <div className="col-6 col-lg-7 col-md-7 globalSearch__results my-auto">
                                ({totalCount} Results)
                        </div>
                            {/* sort results */}

                            <div className="col-6 col-lg-3 col-md-5 ml-auto">
                                <Dropdown key={1}
                                    label={this.aemData.sortBy.label}
                                    options={this.aemData.sortBy.options}
                                    placeholder={this.aemData.sortBy.label + ' ' + this.aemData.sortBy.defaultLabel}
                                    isSearchable={false}
                                    handleChange={this.sortByHandleChange}
                                />
                            </div>

                        </div>
                        <div className="row">
                            <SelectedFilters
                                filters={filters}
                                selectedFilters={selectedFilters}
                                onClearAllFilter={this.handleClearAllFilters}
                                onClearSingleFilterOption={this.handleClearSingleFilterOption}
                                variation="desktop" labels={this.aemData}
                                showCategory={false}
                            />
                        </div>
                        {noResults || totalCount === 0 && <h5>No results found.</h5>}
                        {!noResults && searchResults.length > 0 && searchResults?.map((res) =>
                            <div className="globalSearch__items">
                                <a href={res.uri}>{res.title}</a>
                                <p>{res.description}</p>
                            </div>
                        )
                        }
                        {totalCount > 0 &&
                            <div className="row justify-content-between globalSearch__pagination-wrapper">
                                {/* pagination */}
                                <div className={`${totalPages > 3 ? "col-12 d-flex justify-content-center justify-content-lg-start" : "col-7"} col-lg-5 pl-0`}>
                                    <ReactPaginate
                                        previousLabel={<span className="sim-icons" data-icon="arrow-left"></span>}
                                        nextLabel={<span className="sim-icons" data-icon="arrow-right"></span>}
                                        previousLinkClassName={'btn icon-only'}
                                        nextLinkClassName={'btn icon-only'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={totalPages}
                                        marginPagesDisplayed={3}
                                        pageRangeDisplayed={2}
                                        forcePage={forcePage}
                                        onPageChange={this.pageClickHandleChange}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />

                                </div>


                                {/* show items per page */}
                                <div className={`${totalPages > 3 ? "col-12 d-flex d-lg-block justify-content-center justify-content-lg-start align-items-center" : "col-5"} col-lg-3 px-0 pt-2`}>
                                    <label className="globalSearch__show-items-label">
                                        {this.aemData.pageSize.label}:</label>
                                    <div className="globalSearch__show-items">
                                        <Dropdown key={2}
                                            label={this.aemData.pageSize.label}
                                            options={this.aemData.pageSize.options}
                                            placeholder={pageSize}
                                            isSearchable={false}
                                            handleChange={this.pageSizeHandleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </>
                }
            </div>
        );
    }

}
export default GlobalSearch;