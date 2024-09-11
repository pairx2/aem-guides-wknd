const ESL_EPT = {
  accessCodeStatus: {
    method: 'GET',
    url: '/api/public/profile/access-code-status',
  },
  accountOrders: {
    method: 'GET',
    url: '/api/private/order/orders',
  },
  changePassword: {
    method: 'POST',
    url: '/api/private/profile/change-password',
  },
  checkAddress: {
    method: 'POST',
    url: '/api/public/lookup/checkaddress',
  },
  combinePublicPayment: {
    method: 'POST',
    url: '/api/public/order/cart'
  },
  combinePrivatePayment: {
    method: 'POST',
    url: '/api/private/order/cart'
  },
  confirmChannel: {
    method: 'POST',
    url: '/api/private/notification/confirm-channel',
  },
  contactRequest: {
    method: '',
    url: '/api/public/profile/contact-request',
  },
  createCartAddItem: {
    method: 'POST',
    url: '/api/public/order/cart',
  },
  createCartAddItemAuth: {
    method: 'POST',
    url: '/api/private/order/cart',
  },
  formattedAddress: {
    method: 'POST',
    url: '/api/public/lookup/formatted-address',
  },
  geolocation: {
    method: 'GET',
    url: '/api/public/lookup/geolocation',
  },
  getProfile: {
    method: 'GET',
    url: '/api/private/profile/profile-info',
  },
  getProfileAddress: {
    method: 'GET',
    url: '/api/private/profile/address',
  },
  editProfileAddress: {
    method: 'POST',
    url: '/api/private/profile/address',
  },
  deleteProfileAddress: {
    method: 'DELETE',
    url: '/api/private/profile/address',
  },
  i18n: {
    method: 'GET',
    url: '/api/public/lookup/referencedata',
    queryParams: {
      referenceType: 'i18Message',
    },
  },
  manageSubscription: {
    method: 'POST',
    url: '/api/public/profile/manage-subscription',
  },
  orders: {
    method: 'POST',
    url: '/api/public/order/orders',
  },
  ordersAuth: {
    method: 'POST',
    url: '/api/private/order/orders',
  },
  payment: {
    method: 'POST',
    url: '/api/public/order/payment',
  },
  paymentAuth: {
    method: 'POST',
    url: '/api/private/order/payment',
  },
  products: {
    method: 'POST',
    url: '/api/public/products',
  },
  productsSubscriptionsCancel: {
    method: 'DELETE',
    url: '/api/private/ecommerce/subscriptions',
  },
  productsSubscriptionsList: {
    method: 'GET',
    url: '/api/private/ecommerce/subscriptions',
  },
  productsSubscriptionsUpdate: {
    method: 'PUT',
    url: '/api/private/ecommerce/subscriptions',
  },
  registerUser: {
    method: 'POST',
    url: '/api/public/registration/register-user',
  },
  retrieveCart: {
    method: 'GET',
    url: '/api/public/order/cart',
  },
  retrieveCartAuth: {
    method: 'GET',
    url: '/api/private/order/cart',
  },
  billing: {
    method: 'POST',
    url: '/api/public/order/billing',
  },
  billingAuth: {
    method: 'POST',
    url: '/api/private/order/billing',
  },
  shipping: {
    method: 'POST',
    url: '/api/public/order/shipping',
  },
  shippingAuth: {
    method: 'POST',
    url: '/api/private/order/shipping',
  },
  shippingMethodsAuth: {
    method: 'POST',
    url: '/api/private/order/shipping-methods',
  },
  shippingMethods: {
    method: 'POST',
    url: '/api/public/order/shipping-methods',
  },
  paymentMethodsAuth: {
    method: 'POST',
    url: '/api/private/order/cart/paymentmethods',
  },
  paymentMethods: {
    method: 'POST',
    url: '/api/public/order/cart/paymentmethods',
  },
  siteSearch: {
    method: 'POST',
    url: '/api/public/search/sitesearch',
  },
  siteSearchGET: {
    method: 'GET',
    url: '/api/public/search/sitesearch',
  },
  storedPaymentsAddCard: {
    method: 'POST',
    url: '/api/private/ecommerce/storedpayments',
  },
  storedPaymentsDeleteCard: {
    method: 'DELETE',
    url: '/api/private/ecommerce/storedpayments',
  },
  storedPaymentsGetList: {
    method: 'GET',
    url: '/api/private/ecommerce/storedpayments',
  },
  storedPaymentsSetDefault: {
    method: 'PUT',
    url: '/api/private/ecommerce/storedpayments',
  },
  temporaryCartKey: {
    method: 'POST',
    url: '/api/system/order/cart',
  },
  updateRequest: {
    method: 'POST',
    url: '/api/private/profile/admin/update-requests',
  },
  updateUser: {
    method: 'POST',
    url: '/api/private/profile/admin/update-user',
  },
  user: {
    method: 'POST',
    url: '/api/public/lookup/user',
  },
  userInfo: {
    method: '',
    url: '/api/private/profile/admin/user-info',
  },
  verifyEmailExists: {
    method: 'POST',
    url: '/api/public/registration/verify-email-exists',
  },
  orderHistory: {
    method: 'GET',
    url: '/api/private/order/orders',
  },
  subscriptionHistory: {
    method: 'GET',
    url: '/api/private/ecommerce/subscriptions',
  },
  getDocument: {
    method: 'POST',
    url: '/api/private/lookup/getdocument',
  },
  login: {
    method: 'POST',
    url: '/api/public/profile/login',
  },
  stockAlertSubscribe: {
    method: 'POST',
    url: '/api/private/ecommerce/graphql',
  },
  submitOrderReturn: {
    method: 'POST',
    url: '/api/private/ecommerce/returns'
  },
  cities: {
    method: 'GET',
    url: '/api/public/lookup/referencedata?parentType=country&parentValue=${countryCode}&language=en&referenceType=city',
  },
  districts: {
    method: 'GET',
    url: '/api/public/lookup/referencedata?parentType=city&parentValue=${city}&language=en&referenceType=district',
  },
  neighborhoods: {
    method: 'GET',
    url: '/api/public/lookup/referencedata?parentType=district&parentValue=${district}&language=en&referenceType=neighborhood',
  },
  postcodes: {
    method: 'GET',
    url: '/api/public/lookup/referencedata?parentType=neighborhood&parentValue=${neighborhood}&language=en&referenceType=zipcode',
  }
};

export default ESL_EPT;
