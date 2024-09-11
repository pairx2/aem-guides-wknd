import React, { Component } from "react";
import SearchBar from "./SearchBar.jsx";
import PopularSuggestions from "./PopularSuggestions.jsx";
import Product from "./Product.jsx";
import ProductCount from "./ProductCount.jsx";

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      term: '',
      searchResultMessage: '',
      totalCount: 0,
      isLoading: false,
      popularSuggestions: [],
      noResults: true,
      searchPage: jQuery('#aem-base-url').val() + '/search.html'
    };

    this.generateQuery = this.generateQuery.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  generateQuery(term) {
    term = escape(term);
    console.log("searchTerm in Search Modal::{}",term);
    let query = `{
      products(
        search: "${term}"
        pageSize: 10
        currentPage: 1
      )
      {
        total_count
        search_result_message
        search_suggestion {
          queryText
          resultsCount
        }
        items {
          id
          sku
          name
          canonical_url
          stockdata {
            status
            custom_order_on_call
          }
          image{
            url
            label
          }
          aem_url
          dam_images
          order_on_call
          price
          special_price
          tier_prices{
            customer_group_id
            value
          }
          categories{
            name
          }
          brand
          product_form
          case_of_product
          product_flavor
          ... on CustomizableProductInterface {
            options {
              required
            }
          }
        }
      }
    }`;

    return ABBOTT.utils.formatGraphQLQuery(query);
  }

  getResults(searchTerm) {
    if (searchTerm.length < 2) {
      return;
    }

    this.setState({
      term: searchTerm,
      isLoading: true
    });

    let ajaxConfig = {
      url: `${ABBOTT.config.getEndpointUrl('GRAPH_QL')}?query=${this.generateQuery(searchTerm)}`,
      method: "get",
      headers: {
        "Authorization": "Bearer " + ABBOTT.utils.getSessionToken()
      }
    };

    ABBOTT.http.makeAjaxCall(ajaxConfig)
      .done(res => {
        let results = res.data.products;

        // Get Actual Search Keyword
        const actualSearchKeyword = (results.search_result_message != '') ? results.search_result_message.slice(results.search_result_message.indexOf(':') + 1) : "";

        this.setState({
          items: results.items,
          searchResultMessage: results.search_result_message,
          actualSearchKeyword: actualSearchKeyword,
          totalCount: results.total_count,
          isLoading: false,
          popularSuggestions: results.search_suggestion || [],
          noResults: false
        });

        if (this.state.items.length === 0) {
          this.setState({
            noResults: true,
            popularSuggestions: []
          });
        }

        if (results.items.length) {
          ABBOTT.gtm.buildAndPush.listing(this.state.items, 'Search Modal', 'impressions');
        }
      })
      .fail(e => {
        this.setState({
          isLoading: false,
          noResults: true
        });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <>
        <SearchBar
          onInputChange={ABBOTT.utils.delayEventTrack((searchTerm) => {
            this.getResults(searchTerm);
          }, 500)}
          onPrevCall={this.getComments}
          isLoading={this.state.isLoading}
          searchPageUrl={this.state.searchPage}
          noResults={this.state.noResults}
        />
        {this.state.searchResultMessage!="" &&  <div className="p-2">Your search for <u>{this.state.term}</u> did not match any products. Showing results for: <u>{this.state.actualSearchKeyword}</u></div>}
        {!this.state.noResults && <div className="row">
          <div className="col-md-3 col-12">
            <PopularSuggestions items={this.state.popularSuggestions} searchPageUrl={this.state.searchPage} />
          </div>
          <div className="col-12 col-md-9">
            <ProductCount totalCount={this.state.totalCount} term={this.state.term} />
            <Product items={items} />
          </div>
        </div>
        }
      </>
    );
  }
}

export default SearchModal;
