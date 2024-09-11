/**
 * @function
 * @desc generates formated GraphQL query for search term
 * @param {Object} data passing dynamic data through states
 */
function generateChangeSubscriptionQuery(data) {
  let query = `mutation {    changeProduct( input: {      profile_id: ${data.profileId} old_sku:"${data.oldSku}" sku: "${data.sku}"  qty: ${data.qty}  }   ) {  status message   } }`;
  query = JSON.stringify({
      query: query,
  });
  return query;
}
function generatePersonalizationQuery(data) {
let query = `{ personalizedProducts{ status aem_url dam_images } }`;

return ABBOTT.utils.formatGraphQLQuery(query);

}


/**
* @function
* @desc generates formated GraphQL query for search term
* @param {Object} data passing dynamic data through states
*/
function generateQuery(data) {
  let hasFilters = false;
  if( data.filtersQuery === undefined ||  
    (data.filtersQuery == "" ) ||  
    data.filtersQuery === null) {
      hasFilters = false;
    } else {
      hasFilters = true;
    }
  let query = `
                  {
                    products(
                      ${data.searchTerm !== "" ? `search:`+encodeURIComponent(`"${data.searchTerm}"`): ``}
                      
                      ${data.sortType !== "" && `sort: {${data.sortType}}`}
                      pageSize:  ${data.pageSize}
                      currentPage: ${data.currentPage}
                      ${hasFilters ? `${data.filtersQuery}`: `filter: {}`}
                     ${data.profileId !== undefined ? `profile_id:${data.profileId}`: ``}
                  )
                  {
                    total_count
                    search_suggestion {
                      queryText
                      resultsCount
                    }
                    items {
                      id
                      name
                      meta_title
                      bazaar_voice 
                      cans_y_min_update
                      cans_x_max_update
                      sku
                      price
                      categories {
                        name
                      }
                      brand
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
                      }
                      amazon_purchase
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

function generateSearchPredictionQuery(data) {
let query = `
                  {
                    products(
                      search: ${
                        data.searchTerm === "" ? `""` :encodeURIComponent( `"${data.searchTerm}"`)
                      } 
                     
                  )
                  {
                    items {
                      id
                      name
                      meta_title
                     
                  }
                }
              }`;
return ABBOTT.utils.formatGraphQLQuery(query);
}
function generateProductVideoQuery(data) {
let query = `{
  products(
    search: ${ `"${data.skuValue}"` }
  ) {
    total_count 
    items {
      name
      sku
      media_gallery { 
        url label ... on ProductVideo { 
          video_content { 
            media_type video_provider video_url 
            video_title video_description video_metadata
                  }
              }
          }
      }
  }
}`;
return ABBOTT.utils.formatGraphQLQuery(query);
}
let graphQLQuery = {
generateQuery,
generateSearchPredictionQuery,
generateChangeSubscriptionQuery,
generateProductVideoQuery,
generatePersonalizationQuery
};

export default graphQLQuery;