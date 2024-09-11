import * as React from "react";
import ReactPaginate from 'react-paginate';
import {getMessageForReg } from "../common/api";
import ProductList from "../components/ProductList";
import Dropdown from "../components/Dropdown";
import Filter from "../components/Filter";
import SelectedFilters from "../components/SelectedFilters";

import graphQLQuery from '../services/product.service.js';
import Search from "../components/Search";

class Products extends React.Component {

	constructor(props) {
		super(props);
		this.aemData = props.data;
		// Set default state
		this.skuID = document.getElementById("skuId") ? document.getElementById("skuId").value.split(","): [];
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
			skuFindRetailer : this.skuID
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
		this.setLocalStorageFilters = this.setLocalStorageFilters.bind(this);
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
		
		const superScriptPLPStr = document.getElementById('super-script-indicators'); 
		console.log('superScriptString', superScriptPLPStr)
		if(superScriptPLPStr){
		res.data.products.items.forEach((elements)=>{
			const sc=new RegExp("["+superScriptPLPStr.value+"]");
			let output ="";
			const d= elements.meta_title;
			for(let i =0; i<d.length; i++){
				if(sc.test(d[i])){
					output+='<sup>' +d[i]+'</sup>'
				}else {
					output+=d[i]										
				}
			}
			elements.meta_title = output;
		})
	 }
		
		let { items, page_info, aggregations } = res.data.products;
		let totalCount = res.data.products.total_count;
		let filters = aggregations.length > 0 ? 
		aggregations.filter(itemFilter => this.aemData.filters.includes(itemFilter.attribute_code)) : this.state.filters;
		// Set isVisible property to each filter item by default
		let isAboveM =  jQuery(window).width() >= 768;
		let isStateFilters = this.state.filters.length > 0;
		filters.forEach(filter => {
			filter.isVisible = isAboveM ? false : true;
			if(isAboveM && isStateFilters){
				let filterItem = this.state.filters.filter(itemFilter => itemFilter.attribute_code === filter.attribute_code);
				filter.isVisible = filterItem.length > 0 ? filterItem[0].isVisible : false;
			} 
			filter.isExpanded = false;
			filter.initialFilters = 10;
		});
		let gropedSelectedFilters = this.groupFilters(this.state.selectedFilters);
		// persist filter selection before setting it to state
		this.mergeFilterSelection(filters, gropedSelectedFilters);
		// preselected  selected filter value
		this.state.selectedFilters.forEach(filter => {
			if(filter.type !== 'category_id' && filter.label === ''){
				let newFilters = aggregations.length > 0 ? aggregations.filter(itemFilter => itemFilter.attribute_code === filter.type) : this.state.filters;
				if(newFilters.length > 0){
				let newOptions = newFilters[0].options.filter(itemFilter => itemFilter.value === filter.value);
				filter.label = newOptions[0].label;
				}
			}
		});

		this.setState({
			products: items,
			filters: filters,
			totalPages: page_info.total_pages,
			totalCount: totalCount,
			isLoading: false
		});
		if(items.length) {
			  ABBOTT.gtm.buildAndPush.listing(items, 'Search Results', 'view_products_list');
		  }
		ABBOTT.main.setSocialIcons();
		ABBOTT.main.initLazyImgLoad();
	 }).fail(function() {
	window.location=errorCodeData.errorPageURL;
	});
	}

	// Renders onload
	componentDidMount() {

		// on page load check query params for any default filters to be applied
		//eg: ?age=6873 for baby filters
		let URL = window.location.href.split("?")[1];
		let queryFilters=  [];
        if(URL){
			let productFilters = URL.split('&');
			productFilters.forEach(item => {
				let query = item.split('=');
				if(this.aemData.filters.includes(query[0])){
				let filterItem = {
					label: '',
					type: query[0],
					value: query[1]
				}
				queryFilters.push(filterItem);
				}
			});
        }
		let PLPQuery = window.localStorage.getItem("PLP__query");	
		let isPLP = sessionStorage.getItem('isPLP');
			if(PLPQuery !== null && PLPQuery !== undefined && isPLP){	
			let PLPQueryParse = JSON.parse(PLPQuery);
			const { searchTerm, currentPage, pageSize, sortType,filtersQuery } = PLPQueryParse;
			this.setState(PLPQueryParse);
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage,
				sortType,
				filtersQuery
			});
			let sorting = this.aemData.sortBy.options.filter(({value}) =>  value === sortType );
			this.aemData.sortBy.defaultLabel = sorting[0].label;
		} else {
			const { searchTerm, currentPage, pageSize, sortType } = this.state;
			let filtersQuery;
			if(queryFilters.length > 0){
				filtersQuery = this.getFilterQuery(queryFilters);
				this.setState({
					selectedFilters: queryFilters,
					filtersQuery: filtersQuery
				});
			}
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage,
				sortType,
				filtersQuery
			});
		}
		if(PLPQuery !== null && PLPQuery !== undefined){
			window.localStorage.removeItem("PLP__query");
		}
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
		
		//multi check item checkboxes
			item.isItemChecked = !item.isItemChecked;
			if (item.isItemChecked) {
				updatedFilters = [...updatedFilters, categoryObj];
			}
			else {
				updatedFilters = updatedFilters.filter(select => select.label !== categoryObj.label);
			}
			
		const { searchTerm, sortType, pageSize } = this.state;
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
				filtersQuery
			});
		})
	}
	/**
	 * @function
	 * @desc event handler to clear all the filtered options
	 * @param {Object} filters getting all the filters
	 */
	handleClearAllFilters(filters) {
		const { searchTerm, sortType, pageSize } = this.state;

		let selectedFilters = [];
		const filtersQuery = '';

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
				filtersQuery
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
		const { searchTerm, sortType, pageSize } = this.state;
		
		// remove filter to be cleared from the selected filters
		let updatedSelectedArr = selectedArr.filter(select => select.label !== selectedLabel);

		// Update updatedSelectedArr with category if category page.	
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
		let { searchTerm, pageSize, filtersQuery } = this.state;
		this.setState({
			sortType: sortType,
			forcePage: 0
		}, () => {
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage: 1,
				sortType,
				filtersQuery
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
		let { searchTerm, sortType, filtersQuery } = this.state;
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
				filtersQuery
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
		let { searchTerm, sortType, pageSize, filtersQuery } = this.state;
		this.setState({
			currentPage: currentPage,
			forcePage: value.selected
		}, () => {
			this.fetchData({
				searchTerm,
				pageSize,
				currentPage,
				sortType,
				filtersQuery
			});
		});
	}

	/**
	 * @function
	 * @desc on search submit and form a query with search value
	 */
	handleSearchTermSubmit(value) {
		let { sortType, pageSize, currentPage, filtersQuery } = this.state;
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
					filtersQuery
				});
			}
		});
	}
	/**
	 * @function
	 * @desc on reset of the search
	 */
	handleSearchTermReset() {
		let { sortType, pageSize, currentPage, filtersQuery } = this.state;
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
				filtersQuery
			});
		});
	}
	setLocalStorageFilters(){
		window.localStorage.setItem(
			"PLP__query",
			JSON.stringify(this.state)
		  );
		
	}

	render() {
		let { products, totalPages, totalCount, forcePage, filters, selectedFilters, searchTerm,
			pageSize, skuFindRetailer } = this.state;
		return (

			<div className="row">
				
				{!this.state.isLoading &&
					<>
						<div className="col-lg-3 col-md-4">
							<div className="products__search mb-4">
								{/* search product  */}
								<Search labels={this.aemData} queryData={this.state} searchTerm={searchTerm}
									setSuggestions={true} handleSearchTermSubmit={this.handleSearchTermSubmit} />
							</div>
							<div className="row products__sort-wrapper d-flex d-md-none">
								{/* search results message - mobile */}
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
							{/* {totalPages > 0 && */}
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
							{/* } */}
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
							{/* {totalPages > 0 && */}
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
							{/* } */}
							{/* product list */}

							<ProductList skuFindRetailer={skuFindRetailer} products={products} labels={this.aemData} setLocalStorageFilters={this.setLocalStorageFilters} />
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

export default Products;