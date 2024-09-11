import React, { Component } from "react";

import Filters from "./Filters.jsx";
import ProductList from "./ProductList.jsx";
import SearchTermEmpty from "./SearchTermEmpty.jsx";
import SortOptions from "./SortOptions.jsx";
import SelectedFilters from "./SelectedFilters.jsx";

import graphQLQuery from './graphql-query.js';

class SearchPage extends Component {

  constructor(props) {
    super(props);

    //get the AEM inputs
    this.aemInputs = document.getElementById("search-page-aem-inputs").dataset;
    this.isCategoryPage = !!this.aemInputs.categoryId;
	let search = window.location.search;
    let param = new URLSearchParams(search);
    let queryParam = param.get('q');
	this.aemInputs.query = queryParam;

    // Set default state
    this.state = {
      isLoading: true,
      isFilterVisibleOnMobile: false,
      products: [],
      filters: [],
      relatedSearch: [],
      totalCount: 0,
      searchTerm: `${this.aemInputs.query || this.aemInputs.plpName}`,
      current_page: 1,
      total_pages: null,
      selectedFilters: [],
      optionTerms: [
        "relevance", "product name", "price", "bestseller"
      ],
      selectedOption: '',
      sortBy: 'relevance',
      sortOrder: 'DESC',
      toggleSortOption: false,
      afterClickProductsVisible: 8,
      searchPageUrl: '/search.html'
    };

    //bindings
    this.fetchData = this.fetchData.bind(this);
    this.getFilterQuery = this.getFilterQuery.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleMobileClose = this.handleMobileClose.bind(this);
    this.handleFilterToggle = this.handleFilterToggle.bind(this);
    this.handleSelectFilter = this.handleSelectFilter.bind(this);
    this.handleSortOption = this.handleSortOption.bind(this);
    this.selectSortOption = this.selectSortOption.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleClearAllFilters = this.handleClearAllFilters.bind(this);
    this.handleClearSingleFilterOption = this.handleClearSingleFilterOption.bind(this);
    this.handleShowMoreFilters = this.handleShowMoreFilters.bind(this);
    this.handleShowLessFilters = this.handleShowLessFilters.bind(this);
  }

  /**
   * @function
   * @desc Make an AJAX call to fetch search term data
   * @param {Object} data passing dynamic data through states
   */
  fetchData(data) {
    const searchParam = data.searchTerm;
    this.setState({
      isLoading: true
    });

    let ajaxConfig = {
      url: `${ABBOTT.config.getEndpointUrl('GRAPH_QL')}?query=${graphQLQuery.generateQuery(data)}`,
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + ABBOTT.utils.getSessionToken()
      }
    }
    ABBOTT.http.makeAjaxCall(ajaxConfig).done(res => {

      let { items, aggregations, search_suggestion } = res.data.products;
      let totalCount = res.data.products.total_count;
      let searchMessage = res.data.products.search_result_message;
      let paging = res.data.products.page_info;

      // Get Actual Search Keyword
      const actualSearchKeyword = (searchMessage != '') ? searchMessage.slice(searchMessage.indexOf(':') + 1) : "";

      // Set isVisible property to each filter item by default
      aggregations.forEach(item => {
        item.isVisible = true;
        item.isExpanded = false;
        item.initialFilters = 10;
      });
      let gropedSelectedFilters = this.groupFilters(this.state.selectedFilters);

      // persist filter selection before setting it to state
      this.mergeFilterSelection(aggregations, gropedSelectedFilters);

      this.setState({
        products: paging.current_page > 1 ? [...this.state.products, ...items] : items,
        filters: aggregations || [],
        relatedSearch: search_suggestion || [],
        totalCount: totalCount,
        searchMessage: searchMessage,
        actualSearchKeyword: actualSearchKeyword,
        searchParam: searchParam,
        current_page: paging.current_page,
        total_pages: paging.total_pages,
        isLoading: false
      });

      if(items.length) {
        if(paging.current_page > 1) {
          ABBOTT.gtm.buildAndPush.listing(res.data.products.items, 'Search Page', 'impressions');
        } else {
          ABBOTT.gtm.buildAndPush.listing(res.data.products.items, 'Search Page');
        }
      }
    });
  }

  /**
   * @function
   * @desc Check if selected filters are rendered before iteration
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
   * @desc groups filters based on type
   * @param {Object} selectedFilters 
   * @return {Object} grouped filter object
   */
  groupFilters(selectedFilters) {
    let groupedFilters = {};
    if (!selectedFilters) {
      return '';
    }

    // Group by filters by name
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
   * @desc get the selected filters and form a query
   * @param {Object} selectedFilters stored all selected filters in an array
   * @return {String} GraphQL query string
   */
  getFilterQuery(selectedFilters) {
	let filtersQuery = [];
    let fitlersQueryObj = this.groupFilters(selectedFilters);
    // Generating GraphQL query based on filter types
    for (let type in fitlersQueryObj) {
      if (type === 'category_id') {
        filtersQuery.push(`${type}: {eq: "${fitlersQueryObj[type][fitlersQueryObj[type].length-1]}"}`);
      } else if (type === 'price') {
        let selectedValue = fitlersQueryObj[type][fitlersQueryObj[type].length-1];
        let priceRange = selectedValue.replace('*', '').split('_');
        filtersQuery.push(`${type}: { from: "${priceRange[0]}" to: "${priceRange[1]}" }`);
      } else {
        if (type === 'flavors' || type === 'cases' || type === 'forms')
            filtersQuery.push(`${type}: { in: [${fitlersQueryObj[type].map(v => `"${v}"`)}] }`);
	  }
    }
    return `filter: { ${filtersQuery.join(' ')} } `;
  }

  // Renders onload
  componentDidMount() {
    const { searchTerm, sortBy, sortOrder, current_page } = this.state;
    let filtersQuery = this.getFilterQuery(this.state.selectedFilters);
    let sortOption = sortBy;
    if(this.isCategoryPage) {
		
      let defaultFilter = [{
        label: '',
        type: 'category_id',
        value: this.aemInputs.categoryId
      }];

      this.setState({
        selectedFilters: defaultFilter,
        selectedOption: 'bestseller',
        sortBy: 'product_sold_qty'
      });
      sortOption = 'product_sold_qty';
      filtersQuery = this.getFilterQuery(defaultFilter);
    }

    this.fetchData({
      searchTerm,
      sortBy: sortOption,
      sortOrder,
      current_page,
      filtersQuery,
      isCategoryPage: this.isCategoryPage
    });
  }

  /**
   * @function
   * @desc on click show the filter options in small devices
   */
  handleFilterClick() {
    this.setState({
      isFilterVisibleOnMobile: true
    });
  }

  /**
   * @function
   * @desc on click hide the filter options in small devices
   */
  handleMobileClose() {
    this.setState({
      isFilterVisibleOnMobile: false
    });
  }

  /**
   * @function
   * @desc event handler to toggle the filter individually
   * @param {Object} filter filter object
   */
  handleFilterToggle(filter) {
    filter.isVisible = !filter.isVisible;
    
    // create copy of all filters with updated one
    let updatedFilters = this.state.filters.map(item => {
      if (item.label === filter.label) {
        item = filter;
      }
      return item;
    });

    // update filters state
    this.setState({
      filters: updatedFilters
    });
  }

  /**
   * @function
   * @desc event handler to get the selected filters
   * @param {String} type Capturing the filter category
   * @param {String} item Capturing the filter item
   */
  handleSelectFilter(item, filter) {
    let updatedFilters = [...this.state.selectedFilters];
    let categoryObj = {
      type: filter.attribute_code,
      value: item.value,
      label: item.label
    };

    console.log('handle select filter: init', JSON.stringify({
      stateSelectedFilter: this.state.selectedFilters,
      updatedFilters
    }));

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

    const { searchTerm, sortBy, sortOrder } = this.state;

    this.setState({
      selectedFilters: updatedFilters,
      products: [],
      isLoading: true,
      isFilterVisibleOnMobile: true
    }, () => {
      const filtersQuery = this.getFilterQuery(this.state.selectedFilters);
      this.fetchData({
        searchTerm,
        sortBy,
        sortOrder,
        current_page: 1,
        filtersQuery,
        isCategoryPage: this.isCategoryPage
      });
    })
  }

  /**
   * @function
   * @desc event handler to get sort by and sort order
   */
  handleSortOption() {
    const { searchTerm, sortBy, selectedOption } = this.state;
    const sortOrder = this.state.sortOrder === 'ASC' ? 'DESC' : 'ASC';

    this.setState({
      toggleSortOption: !this.state.toggleSortOption,
      sortOrder: sortOrder
    }, () => {
      const filtersQuery = this.getFilterQuery(this.state.selectedFilters);
      let sortOption = sortBy;

      if(selectedOption === '') {
        if(this.isCategoryPage) {
          sortOption = 'product_sold_qty';
          this.setState(
            {selectedOption: 'bestseller'}
          );
        }else {
          sortOption = 'relevance';
        }
      }

      this.fetchData({
        searchTerm,
        sortBy: sortOption,
        sortOrder,
        current_page: 1,
        filtersQuery,
        isCategoryPage: this.isCategoryPage
      });
    })
  }

  /**
   * @function
   * @desc event handler to capture the sort option on change of dropdown
   */
  selectSortOption(e) {
    const { searchTerm, sortOrder } = this.state;
    let sortBy = e.target.value;

    if(e.target.value === "product name") {
      sortBy = "name";
    }else if(e.target.value === "bestseller") {
      sortBy = "product_sold_qty";
    }

    this.setState({
      selectedOption: e.target.value,
      sortBy: sortBy
    }, () => {
      const filtersQuery = this.getFilterQuery(this.state.selectedFilters);
      this.fetchData({
        searchTerm,
        sortBy,
        sortOrder,
        current_page: 1,
        filtersQuery,
        isCategoryPage: this.isCategoryPage
      });
    })
  }

  /**
  * @function
  * @desc event handler to load products on clicking the button
  */
  loadMore() {
    let newPageNumber = this.state.current_page + 1;

    const { searchTerm, sortBy, sortOrder, selectedFilters } = this.state;
    const filtersQuery = this.getFilterQuery(selectedFilters);
    this.fetchData({
      searchTerm,
      sortBy,
      sortOrder,
      current_page: newPageNumber,
      filtersQuery,
      isCategoryPage: this.isCategoryPage
    });
  }

  /**
  * @function
  * @desc event handler to clear all the filtered options
  * @param {Object} filters getting all the filters
  */
  handleClearAllFilters(filters, variation) {
    const { searchTerm, sortBy, sortOrder } = this.state;
    let categoryObj = {
      type: '',
      value: '',
      label: ''
    };

    //Reset the isChecked property to each filter item 
    filters.forEach((item) => {
      if (item.attribute_code.toLowerCase() !== 'category_id') {
        item.options.forEach(items => (items.isItemChecked = false))
      } else if (item.attribute_code.toLowerCase() === 'category_id'){
        categoryObj.type = item.attribute_code;
        for(let i = 0 ; i < item.options.length; i++) {
          if (item.options[i] && item.options[i].isItemChecked === true) {
			  item.options[i].isItemChecked = false
            categoryObj.value =  this.aemInputs.categoryId;
          }
        }
      }
    });
    this.setState({
     selectedFilters: [ (this.isCategoryPage) ? categoryObj : '' ]
    }, () => {
      const filtersQuery = this.getFilterQuery(this.state.selectedFilters);
      this.fetchData({
        searchTerm,
        sortBy,
        sortOrder,
        current_page: 1,
        filtersQuery,
        isCategoryPage: this.isCategoryPage
      });
    });
    if(variation == "mobile"){
        this.handleMobileClose();
    }
  }

  /**
  * @function
  * @desc event handler to clear single filtered option
  * @param {String} filterName getting the name of the filter
  * @param {Object} selectedArr getting the selected filters
  * @param {Object} filters getting all the filters
  */
  handleClearSingleFilterOption(filterName, selectedArr, filters) {
    const { searchTerm, sortBy, sortOrder } = this.state;
    let categoryObj = {
      type: '',
      value: '',
      label: ''
    };
    debugger;
    let updatedSelectedArr = selectedArr.filter(select => select.type !== filterName);
    //Reset the isChecked property to each filter item 
   
      filters.forEach((item) => {
        if (item.attribute_code.toLowerCase() !== 'category_id') {
          item.options.forEach(items => (items.isItemChecked = false))
        }
        else if (item.attribute_code.toLowerCase() === 'category_id'){
          categoryObj.type = item.attribute_code;
          for(let i = 0 ; i < item.options.length; i++) {
            if (item.options[i] && item.options[i].isItemChecked === true) {
				item.options[i].isItemChecked = false
              categoryObj.value =  this.aemInputs.categoryId;
            }
          }
        }
      });
   
    if (this.isCategoryPage && filterName === 'category_id' && categoryObj.value !== "") {
          updatedSelectedArr.push(categoryObj);
    }

    this.setState({
      selectedFilters: updatedSelectedArr
    }, () => {
      const filtersQuery = this.getFilterQuery(this.state.selectedFilters);
      this.fetchData({
        searchTerm,
        sortBy,
        sortOrder,
        current_page: 1,
        filtersQuery,
        isCategoryPage: this.isCategoryPage
      });
    })
  }

  /**
  * @function
  * @desc on click show more filters
  * @param {Object} filter - gets each filter properties
  */
  handleShowMoreFilters(filter) {
    filter.isExpanded = true;
    filter.initialFilters = filter.count;
    this.setState({
      filters: [...this.state.filters.filter(each => {
        if (each.attribute_code !== filter.attribute_code) {
          return each;
        } else {
          return { ...filter }
        }
      })]
    })
  }

  /**
  * @function
  * @desc on click show more filters
  * @param {Object} filter - gets each filter properties
  */
  handleShowLessFilters(filter) {
    filter.isExpanded = false;
    filter.initialFilters = 10;
    this.setState({
      filters: [...this.state.filters.filter(each => {
        if (each.attribute_code !== filter.attribute_code) {
          return each;
        } else {
          return { ...filter }
        }
      })]
    })
  }

  render() {
    let { filters, relatedSearch, products } = this.state;

    return (
      <>
        <div className="row">
        {(products && this.state.totalCount > 0)?(
          <div className="col-12 d-block d-md-none">
          <div className="products-toolbar d-block">
              <p className="toolbar-item-count">
              <span className="toolbar-text"> Showing: </span>
              <span className="toolbar-number"> 1-{this.state.products.length}</span> of
              <span className="toolbar-number"> {this.state.totalCount}</span> Results:
              </p>
              
            </div>
          </div>
      ):''}
          {!!filters.length &&
            <div className="col-md-12 d-md-none d-flex justify-content-between pb-md-4">
               <span className="filter-btn" onClick={this.handleFilterClick}>
                <img src={this.aemInputs.searchFilterMobileIcon} /> Filter
              </span>
              <SortOptions
                options={this.state.optionTerms}
                toggle={this.state.toggleSortOption}
                onSelectSortOptions={this.handleSortOption}
                changeOptions={this.selectSortOption}
              />
            </div>
          }
          <aside
            className={`d-md-block filters col-md-3 col-12 ${
              this.state.isFilterVisibleOnMobile ? "" : "d-none"
              } `}
          >
            <Filters
              filters={filters}
              isSearch={!this.isCategoryPage}
              labels={this.aemInputs}
              relatedSearch={relatedSearch}
              totalCount={this.state.totalCount}
              onMobileClose={this.handleMobileClose}
              onFilterToggle={this.handleFilterToggle}
              onSelectFilter={this.handleSelectFilter}
              selectedFilters={this.state.selectedFilters}
              onClearAllFilter={this.handleClearAllFilters}
              onClearSingleFilterOption={this.handleClearSingleFilterOption}
              onShowMoreFilters={this.handleShowMoreFilters}
              onShowLessFilters={this.handleShowLessFilters}
              searchPageUrl={this.state.searchPageUrl}
            />
          </aside>
          {(products && this.state.totalCount > 0) ? (
            <section className="col-md-9 col-sm-12 col-12">
            {this.state.searchMessage!="" && <div><b> Your search for <u>{this.state.searchTerm}</u> did not match any products. Showing results for: <u>{this.state.actualSearchKeyword}</u></b></div>}
              <hr className="divider d-block d-md-none"/>
              <div className="products-toolbar">
                <p className="toolbar-item-count">
                <span className="toolbar-text"> Showing: </span>
                <span className="toolbar-number"> 1-{this.state.products.length}</span> of
                <span className="toolbar-number"> {this.state.totalCount}</span> Results:
                </p>
                <SortOptions
                  options={this.state.optionTerms}
                  toggle={this.state.toggleSortOption}
                  selectedOption={this.state.selectedOption}
                  onSelectSortOptions={this.handleSortOption}
                  changeOptions={this.selectSortOption}
                />
              </div>
              <SelectedFilters
                filters={filters}
                selectedFilters={this.state.selectedFilters}
                isSearch={!this.isCategoryPage}
                onClearAllFilter={this.handleClearAllFilters}
                onClearSingleFilterOption={this.handleClearSingleFilterOption}
                variation="desktop"
              />
              <ProductList products={products} labels={this.aemInputs} />

              {this.state.total_pages > this.state.current_page &&
                <div className="text-center p-3">
                  <button className="btn btn-outline-primary load-more" onClick={this.loadMore} id="loadMore" disabled={this.state.isLoading}>
                    {this.state.isLoading ? 'Loading products...' : 'Load More'}
                  </button>
                </div>
              }
            </section>
          )
            // if - true condition ends
            :

            (this.state.isLoading ?
              <div className="col-md-12 loader">Loading...</div> :
              (products && this.state.totalCount > 0) ? "" : <SearchTermEmpty emptyMessage="Your search returned no results." />
            )
          }
        </div>
      </>
    );
  }
}

export default SearchPage;
