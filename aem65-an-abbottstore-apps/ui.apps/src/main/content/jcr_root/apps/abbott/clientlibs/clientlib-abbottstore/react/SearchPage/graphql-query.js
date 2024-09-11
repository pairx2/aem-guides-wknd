/**
 * @function
 * @desc generates formated GraphQL query for search term
 * @param {Object} data passing dynamic data through states
 */
function generateQuery(data) {
  let searchTermQuery = '';

  if(!data.isCategoryPage) {
    searchTermQuery = `search: "${escape(data.searchTerm)}"`;
  }
  
  let query = `
                  {
                  products(
                    ${searchTermQuery}
                    ${data.sortBy && `sort: {${data.sortBy}: ${data.sortOrder}}`}
                    pageSize: 12
                    currentPage: ${data.current_page}
                    ${data.filtersQuery}
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
                      name
                      sku
                      price
                      categories {
                        name
                      }
                      brand
                      product_sold_qty
                      product_flavor
                      case_of_product
                      product_form
                      canonical_url
                      image {
                        url
                        label
                      }
                      stockdata {
                        qty
                        backorder
                        status
                        custom_order_on_call
                      }
                      aem_url
                      dam_images
                      order_on_call
                      tier_prices {
                        customer_group_id
                        qty
                        value
                      }
                      special_price
                      special_from_date
                      special_to_date
                      ... on CustomizableProductInterface {
                        options {
                          required
                        }
                      }
                    }
                    aggregations {
                      attribute_code
                      count
                      label
                      options {
                        label
                        value
                        count
                      }
                    }
                    page_info {
                      page_size
                      current_page
                      total_pages
                    }
                  }
              }`;

  return ABBOTT.utils.formatGraphQLQuery(query);
}

let graphQLQuery = {
  generateQuery
};

export default graphQLQuery;