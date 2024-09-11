const productSubscriptionsQuery = (sku) => {
  return {
    query: `
  {
    products(filter: {subscription_base_sku: { match:"${sku}"}}) {
      total_count
      items {
        __typename
        sku
        name
        product_version
        attribute_set
        stock_status
        is_subscription
        delivery_frequency_label
        sarp2 {
          is_advanced_pricing
          has_plans
          subscription_type {
              value
              label
          }
          plan_options {
              plan_id
              option_id
              website_id
              initial_fee
              trial_price
              regular_price
              is_auto_regular_price
              is_installments_mode
              billing_frequency
              billing_period
              frequency_description
          }
        }
        vat_details {
          including_tax {
            value
            currency
          }
          excluding_tax {
            value
            currency
          }
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        default_quantities {
          min_sale_qty
          max_sale_qty
        }
        productalert {
          stockalert
        }
      }
    }
  }
   `,
  };
};

const productPriceQuery = (sku) => {
  return {
    query: `
  {
    products(filter: { sku: { in: ["${sku}"] } }) {
      items {
        __typename
        sku
        name
        product_version
        attribute_set
        stock_status
        is_subscription
        delivery_frequency_label
        vat_details {
          including_tax {
            value
            currency
          }
          excluding_tax {
            value
            currency
          }
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        default_quantities {
          min_sale_qty
          max_sale_qty
        }
        productalert {
          stockalert
        }
      }
    }
  }
   `,
  };
};

const productImageQuery = (skus) => {
  const skuList = skus.map((sku) => `"${sku}"`).join(',');

  return {
    query: `
    {
      products(filter: { sku: { in: [${skuList}] } }) {
        items {
          sku
          image {
            url
            label
          }
        }
      }
    }
   `,
  };
};

const productAlertSubscriptionQuery = (sku) => ({
  query: `mutation {
      createStockAlertSubscription( input: { sku: "${sku}" }) {
        email
        message
      }
    }`,
});

// eslint-disable-next-line
export { productPriceQuery, productImageQuery, productAlertSubscriptionQuery, productSubscriptionsQuery };
