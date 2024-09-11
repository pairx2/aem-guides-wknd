import { getNestedObject } from './common';

// Assigning global variable to be called in react
window.onAccountNavigationLoad = (data) => {
  if (data) {
    for (const prop in data) {
      const response = data[prop];
      if (getNestedObject(response, 'status')) {
        // Check for orders in custom responses array
        if (
          prop === 'accountOrders' &&
          getNestedObject(
            response,
            'response.data.customer.orders.items.length'
          ) > 0
        ) {
          const navigationItem = document.querySelector(
            `.js-account-navigation-item[data-customer-attribute='${prop}']`
          );
          if (navigationItem) {
            navigationItem.classList.remove('d-none');
          }
        }
      }
    }
  }
};
