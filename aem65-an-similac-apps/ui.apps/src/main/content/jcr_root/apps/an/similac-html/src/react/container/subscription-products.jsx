import * as React from "react";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
import { getMessageForReg, makeCall } from "../common/api";

import ProductList from "../components/ProductList";
import Dropdown from "../components/Dropdown";
import Filter from "../components/Filter";
import SelectedFilters from "../components/SelectedFilters";

import graphQLQuery from '../services/product.service.js';
import Search from "../components/Search";
import SubscriptionPopUp from "../components/SubscriptionPopUp";

class SubscriptionProducts extends React.Component {

	constructor(props) {
		super(props);
		this.aemData = props.data;
		// Set default state
		this.state = {
			isLoading: true,
			products: [],
			filters: [],
			selectedFilters: [],
			totalPages: 0,
			pageSize: this.aemData.pageSize.defaultValue,
			currentPage: 1,
			totalCount: 0,
			forcePage: 0,
			sortType: this.aemData.sortBy.defaultValue,
			filtersQuery: "",
			openFilter: true,
			searchTerm: "",
			searchValue: "",
			profileId: "",
			oldSku: "",
			rpath: ""
		};

		//bindings
		this.fetchData = this.fetchData.bind(this);
		this.getFilterQuery = this.getFilterQuery.bind(this);
		this.sortByHandleChange = this.sortByHandleChange.bind(this);
		this.pageSizeHandleChange = this.pageSizeHandleChange.bind(this);
		this.pageClickHandleChange = this.pageClickHandleChange.bind(this);
		this.handleShowMoreFilters = this.handleShowMoreFilters.bind(this);
		this.handleShowLessFilters = this.handleShowLessFilters.bind(this);
		this.handleFilterToggle = this.handleFilterToggle.bind(this);
		this.handleSelectFilter = this.handleSelectFilter.bind(this);
		this.handleClearAllFilters = this.handleClearAllFilters.bind(this);
		this.handleClearSingleFilterOption = this.handleClearSingleFilterOption.bind(this);
		this.handleSearchTermSubmit = this.handleSearchTermSubmit.bind(this);
		this.handleSearchTermReset = this.handleSearchTermReset.bind(this);
	}

	/**
   * @function
   * @desc Make an AJAX call to fetch search term data
   * @param {Object} data passing dynamic data through states
   */
	fetchData(data) {
		this.setState({
			isLoading: true
		});
		
		let ajaxConfig = {
			url: `${ABBOTT.config.getEndpointUrl('GRAPH_QL')}?query=${graphQLQuery.generateQuery(data)}`,
			method: "get",
			contentType: "application/json",
			headers:
			{
				"Store": ABBOTT.config.storeName
			}
		};
		ABBOTT.http.makeAjaxCall(ajaxConfig).done(res => {

			let { items, page_info, aggregations } = res.data.products;
			let totalCount = res.data.products.total_count;
			let filters = aggregations.filter(itemFilter => this.aemData.filters.includes(itemFilter.attribute_code));
			// Set isVisible property to each filter item by default
			filters.forEach(filter => {
				filter.isVisible = true;
				filter.isExpanded = false;
				filter.initialFilters = 10;
			});
			let gropedSelectedFilters = this.groupFilters(this.state.selectedFilters);
			// persist filter selection before setting it to state
			this.mergeFilterSelection(filters, gropedSelectedFilters);
			this.setState({
				products: items,
				filters: filters,
				totalPages: page_info.total_pages,
				totalCount: totalCount,
				isLoading: false
			});
			ABBOTT.main.setSocialIcons();
			ABBOTT.main.initLazyImgLoad();
		});
	}

	// Renders onload
	componentDidMount() {
		const URL = "?" + window.location.href.split("?")[1];
		const urlParams = new URLSearchParams(URL);

		const { searchTerm, currentPage, pageSize, sortType } = this.state;
		let filtersQuery = 'filter: {is_subscription: { eq: "1" } aw_sarp2_subscription_type: {in: ["2", "3"] }}';
		let profileId = urlParams.get("profile_id");
		
		this.setState({
			profileId: profileId,
			rpath: urlParams.get("rpath"),
			oldSku: urlParams.get("old_sku"),
			filtersQuery
		});
		this.fetchData({
			searchTerm,
			pageSize,
			currentPage,
			sortType,
			filtersQuery,
			profileId
		});
	}


	/**
	 * @function
	 * @desc get the selected filters and form a graph ql query 
	 * @param {Object} selectedFilters stored all selected filters in an array
	 * @return {String} GraphQL query string
	 */
	getFilterQuery(selectedFilters) {
		let fitlersQueryObj = this.groupFilters(selectedFilters);
		let filtersQuery = [];
		// Generating GraphQL query based on filter types
		for (let type in fitlersQueryObj) {
			if (type === 'category_id') {
				filtersQuery.push(`${type}: {eq: "${fitlersQueryObj[type]}"}`);
			} else if (type === 'price') {
				let selectedValue = fitlersQueryObj[type][0];
				let priceRange = selectedValue.replace('*', '').split('_');
				filtersQuery.push(`${type}: { from: "${priceRange[0]}" to: "${priceRange[1]}" }`);
			} else {
				filtersQuery.push(`${type}: { in: [${fitlersQueryObj[type].map(v => `"${v}"`)}] }`);
			}
		}
		return `filter: { ${filtersQuery.join(' ')} } `;
	}
	/**
	 * @function
	 * @desc groups filters based on type and value
	 * @param {Object} selectedFilters 
	 * @return {Object} grouped filter object
	 */
	groupFilters(selectedFilters) {
		let groupedFilters = {};
		if (!selectedFilters) {
			return '';
		}
		// Group by filters by type
		selectedFilters.forEach(item => {
			if (groupedFilters[item.type]) {
				groupedFilters[item.type].push(item.value);
			} else {
				groupedFilters[item.type] = [item.value];
			}
		});
		return groupedFilters;
	}
	/**
	 * @function
	 * @desc Add checked selected filters to the new filter
	 * @param {Object} newFilters 
	 * @param {Object} selectedFiltersGrouped 
	 */
	mergeFilterSelection(newFilters, selectedFiltersGrouped) {
		newFilters.forEach(item => {
			let seletedItems;
			// find selected item from the fetched filters data before iteration
			seletedItems = selectedFiltersGrouped[item.attribute_code];
			// check selected items
			item.options.forEach(filterItem => {
				filterItem.isItemChecked = false;
				if (seletedItems) {
					return filterItem.isItemChecked = seletedItems.indexOf(filterItem.value) !== -1;
				}
			});
		});
	}

	/**
	* @function
	* @desc on click show more filters
	* @param {Object} selectedFilter - gets selected filter properties
	*/
	handleShowMoreFilters(selectedFilter) {
		selectedFilter.isExpanded = true;
		selectedFilter.initialFilters = selectedFilter.count;
		this.setState({
			filters: [...this.state.filters.filter(filter => {
				if (filter.attribute_code !== selectedFilter.attribute_code) {
					return filter;
				} else {
					return { ...selectedFilter }
				}
			})]
		})
	}

	/**
	* @function
	* @desc on click show less filters
	* @param {Object} selectedFilter - gets selected filter properties
	*/
	handleShowLessFilters(selectedFilter) {
		selectedFilter.isExpanded = false;
		selectedFilter.initialFilters = 10;
		this.setState({
			filters: [...this.state.filters.filter(filter => {
				if (filter.attribute_code !== selectedFilter.attribute_code) {
					return filter;
				} else {
					return { ...selectedFilter }
				}
			})]
		})
	}


	/**
	 * @function
	 * @desc event handler to toggle the filter individually
	 * @param {Object} selectedFilter - gets selected filter properties
	 */
	handleFilterToggle(selectedFilter) {
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
	handleSelectFilter(item, filter) {
		let updatedFilters = [...this.state.selectedFilters];
		let categoryObj = {
			type: filter.attribute_code,
			value: item.value,
			label: item.label
		};
		//only link
		if (filter.attribute_code === 'category_id') {
			// remove existing selected categories (as only one category selection is allowed)
			updatedFilters = updatedFilters.filter(itemFilter => itemFilter.type !== 'category_id');
			// add new selected filter
			updatedFilters = [...updatedFilters, categoryObj];

		} else if (filter.attribute_code === 'price') {
			//uncheck the selected checkbox and check only one item
			item.isItemChecked = !item.isItemChecked;
			if (item.isItemChecked) {
				//check if item already exists
				updatedFilters.forEach((element, index) => {
					if (element.value !== item.value && element.type === item.type) {
						//uncheck the previous checked item
						filter.options.forEach((ele) => {
							if (ele.value === element.value) {
								ele.isItemChecked = !ele.isItemChecked;
							}
						});
						//remove the previous item
						updatedFilters.splice(index, 1);
					}
				});
				//update the new item checked
				updatedFilters = [...updatedFilters, categoryObj];
			}
			else {
				updatedFilters.splice(updatedFilters.length - 1);
			}
		}
		//multi check item checkboxes
		else {
			item.isItemChecked = !item.isItemChecked;
			if (item.isItemChecked) {
				updatedFilters = [...updatedFilters, categoryObj];
			}
			else {
				updatedFilters.splice(updatedFilters.length - 1);
			}
		}
		const { searchTerm, sortType, pageSize, profileId } = this.state;
		const filtersQuery = this.getFilterQuery(updatedFilters);
		this.setState({
			selectedFilters: updatedFilters,
			products: [],
			filtersQuery: filtersQuery,
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm,
				sortType,
				currentPage: 1,
				pageSize: pageSize,
				filtersQuery,
				profileId
			});
		})
	}
	/**
	 * @function
	 * @desc event handler to clear all the filtered options
	 * @param {Object} filters getting all the filters
	 */
	handleClearAllFilters(filters) {
		const { searchTerm, sortType, pageSize, profileId } = this.state;

		let selectedFilters = [];
		const filtersQuery = this.getFilterQuery(selectedFilters);

		this.setState({
			selectedFilters: selectedFilters,
			filtersQuery: filtersQuery,
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm,
				sortType,
				currentPage: 1,
				pageSize: pageSize,
				filtersQuery,
				profileId
			});
		})
	}

	/**
	* @function
	* @desc event handler to clear single filtered option
	* @param {String} filterName getting the name of the filter
	* @param {Object} selectedArr getting the selected filters
	* @param {Object} filters getting all the filters
	*/
	handleClearSingleFilterOption(filterName, selectedArr, selectedLabel, filters) {
		const { searchTerm, sortType, pageSize, profileId } = this.state;
		// remove filter to be cleared from the selected filters
		let updatedSelectedArr = selectedArr.filter(select => select.label !== selectedLabel);

		const filtersQuery = this.getFilterQuery(updatedSelectedArr);
		this.setState({
			selectedFilters: updatedSelectedArr,
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm,
				sortType,
				currentPage: 1,
				pageSize: pageSize,
				filtersQuery,
				profileId
			});
		})
	}
	/**
	 * @function
	 * @desc get the selected sort option and form a query
	 * @param {Object} selectedOption selected sort option
	 */
	sortByHandleChange(selectedOption) {
		let sortType = selectedOption.value;
		this.aemData.sortBy.defaultLabel = selectedOption.label;
		let { searchTerm, pageSize, filtersQuery, profileId } = this.state;
		this.setState({
			sortType: sortType,
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage: 1,
				sortType,
				filtersQuery,
				profileId
			});
		});
	}
	/**
	 * @function
	 * @desc get the selected show no of items option and form a query
	 * @param {Object} selectedOption selected sort option
	 */
	pageSizeHandleChange(selectedOption) {
		let pageSize = selectedOption.value;
		let currentPage = 1;
		let { searchTerm, sortType, filtersQuery, profileId } = this.state;
		this.setState({
			pageSize: pageSize,
			currentPage: currentPage,
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage,
				sortType,
				filtersQuery,
				profileId
			});
		});
	}
	/**
	 * @function
	 * @desc get the selected page number from pagination and form a query
	 * @param {number} value selected page number
	 */
	pageClickHandleChange(value) {
		let currentPage = value.selected + 1;
		let { searchTerm, sortType, pageSize, filtersQuery, profileId } = this.state;
		this.setState({
			currentPage: currentPage,
			forcePage: value.selected
		}, () => {
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage,
				sortType,
				filtersQuery,
				profileId
			});
		});
	}

	/**
	 * @function
	 * @desc on search submit and form a query with search value
	 */
	handleSearchTermSubmit(value) {
		let { sortType, pageSize, currentPage, filtersQuery, profileId } = this.state;
		this.setState({
			searchTerm: value,
			forcePage: 0
		}, () => {
			if (value !== "") {
				this.fetchData({
					searchTerm: value,
					pageSize,
					currentPage,
					sortType,
					filtersQuery,
					profileId
				});
			}
		});
	}
	/**
	 * @function
	 * @desc on reset of the search
	 */
	handleSearchTermReset() {
		let { sortType, pageSize, currentPage, filtersQuery, profileId } = this.state;
		this.setState({
			searchTerm: "",
			searchValue: "",
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm: "",
				pageSize,
				currentPage,
				sortType,
				filtersQuery,
				profileId
			});
		});
	}
	
	cancelPopUp = () => {
		ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'click', 'change-subscription_no');
		swal.close();
	}

	onBtnClick = (e, product) => {
		const {profileId, oldSku, rpath} = this.state;
		ABBOTT.gtm.buildAndPush.formTracking('pop-up', 'load', 'change-subscription');
		// We want to retrieve MyInput as a pure DOM node: 
		let wrapper = document.createElement('div');
		ReactDOM.render(<SubscriptionPopUp product={product} aemData={this.aemData}
			 cancelPopUp={this.cancelPopUp}
			profileId={profileId} oldSku={oldSku} rpath={rpath}  />, wrapper);
		let el = wrapper.firstChild;


		swal({
			title: this.aemData.popUp.title,
			content: el,
			className: "similac-modal",
			buttons: false,
			backdrop:false,
			heightAuto: false,

		});
		ABBOTT.main.setSocialIcons();

	}

	render() {
		let { products, totalPages, totalCount, forcePage, filters, selectedFilters, searchTerm,
			pageSize } = this.state;
		return (

			<div className="row">
				{this.state.isLoading &&
					<div className="col-12 loader text-center">Loading...</div>
				}
				{!this.state.isLoading &&
					<>
						<div className="col-12 pb-4 mb-4">
							<span className="sim-icons" data-icon="left-sm"></span>
							<a className="subscription-products__return" href={`${ABBOTT.config.storeSecureUrl}/${this.state.rpath}`}>{this.aemData.returnLabel}</a>
						</div>
						<div className="col-lg-3 col-md-4">

							<div className="products__search mb-4">
								{/* serach product  */}
								<Search labels={this.aemData} queryData={this.state} searchTerm={searchTerm}
									setSuggestions={true} handleSearchTermSubmit={this.handleSearchTermSubmit} />
							</div>
							<div className="row products__sort-wrapper d-flex d-md-none">
								{/* serach results message - mobile */}
								<div className={`${products.length > 0 ? "col-6" : "col-12"} products__results my-auto`}>
									{products.length > 0 && searchTerm === "" && `(${totalCount}
	 							${this.aemData.resultsLabel})`}

									{searchTerm !== "" ? <> <span>{this.aemData.searchResultsLabel}
								"{searchTerm}" {totalCount}  {this.aemData.resultsLabel}
										<a className="products__clear-all"
											onClick={this.handleSearchTermReset}>{this.aemData.resetLabel}
										</a></span><br /><br /></> : ""}

									{!this.state.isLoading && products.length === 0 &&
										<strong>{this.aemData.noResultLabel}</strong>}
								</div>
								{/* sort products */}
								{totalPages > 0 &&
									<div className="col-6 col-lg-2 col-md-5 ml-auto">
										<Dropdown key={1}
											label={this.aemData.sortBy.label}
											options={this.aemData.sortBy.options}
											placeholder={this.aemData.sortBy.defaultLabel}
											isSearchable={false}
											handleChange={this.sortByHandleChange}
										/>
									</div>
								}
							</div>

							{/* filter */}
							{totalPages > 0 &&
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
											showCategory={true}
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
							}
						</div>

						<div className="col-lg-9 col-md-8 mt-4 mt-md-0">
							<div className="row products__sort-wrapper d-none d-md-flex">
								{/* Search results message - tablet and above */}
								<div className="col-6 col-lg-7 col-md-7 products__results my-auto">
									{products.length > 0 && searchTerm === "" && `(${totalCount}
	 							${this.aemData.resultsLabel})`}

									{searchTerm !== "" ? <> <span>{this.aemData.searchResultsLabel}
								"{searchTerm}" {totalCount}  {this.aemData.resultsLabel}
										<a className="products__clear-all"
											onClick={this.handleSearchTermReset}>{this.aemData.resetLabel}</a></span><br /><br /></> : ""}

									{!this.state.isLoading && products.length === 0 &&
										<strong>{this.aemData.noResultLabel}</strong>}
								</div>
								{/* sort products */}
								{totalPages > 0 &&
									<div className="col-6 col-lg-3 col-md-5 ml-auto">
										<Dropdown key={1}
											label={this.aemData.sortBy.label}
											options={this.aemData.sortBy.options}
											placeholder={this.aemData.sortBy.label + ' ' + this.aemData.sortBy.defaultLabel}
											isSearchable={false}
											handleChange={this.sortByHandleChange}
										/>
									</div>
								}
							</div>

							{/* filters selected */}
							{totalPages > 0 &&
								<div className="row">
									<SelectedFilters
										filters={filters}
										selectedFilters={selectedFilters}
										onClearAllFilter={this.handleClearAllFilters}
										onClearSingleFilterOption={this.handleClearSingleFilterOption}
										variation="desktop" labels={this.aemData}
										showCategory={true}
									/>
								</div>
							}
							{/* product list */}

							<ProductList products={products} labels={this.aemData} subscription={true}
								onBtnClick={(e, product) => this.onBtnClick(e, product)} />
							{totalPages > 0 &&
								<div className="row justify-content-between products__pagination-wrapper">
									{/* pagination */}
									<div className={`${totalPages > 3 ? "col-12 d-flex justify-content-center justify-content-md-start" : "col-7"} col-md-8 col-lg-5 pl-0`}>
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
									<div className={`${totalPages > 3 ? "col-12 d-flex d-md-block justify-content-center justify-content-md-start align-items-center" : "col-5"} col-md-4 col-lg-3 px-0 pt-2`}>
										<label className="products__show-items-label">{this.aemData.pageSize.label}:</label>
										<div className="products__show-items">
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

export default SubscriptionProducts;