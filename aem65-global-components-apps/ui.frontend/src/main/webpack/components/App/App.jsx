import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import i18n from './i18n';
import partialConfig from './config';
import '../../site/main.scss';
import { SiteProvider } from './context/SiteContext';
import { AuthProvider } from './context/AuthContext';
import { CommerceProvider } from './context/CommerceContext';
import ProductPrice from './components/atoms/ProductPrice';
import PortalWithDataSet from './components/common/PortalWithDataSet';
import AddToCart from './components/atoms/AddToCart';
import FormData from './components/atoms/FormData';
import MiniCart from './components/organisms/MiniCart';
import MiniCartButton from './components/organisms/MiniCartButton';
import CheckoutFormController from './components/common/CheckoutFormController/FormController';
import SimplifiedCheckoutFormController from './components/common/SimplifiedCheckoutFormController/SimplifiedFormController';
import OrderSummaryController from './components/common/CheckoutFormController/OrderSummaryController';
import GuestOrderSummaryController from './components/common/CheckoutFormController/GuestOrderSummaryController';
import ShippingMethods from './components/molecules/ShippingMethods';
import PayOnForm from './components/molecules/PayOnForm';
import LoadingIndicator from './components/common/LoadingIndicator';
import OrderDetailsSummary from './components/molecules/OrderDetailsSummary';
import OrderDetailsShipmentTracking from './components/molecules/OrderDetailsShipmentTracking';
import OrderDetailsItemList from './components/molecules/OrderDetailsItemList';
import OrderDetailsDataDisplay from './components/molecules/OrderDetailsDataDisplay';
import ProductTileInclude from './components/atoms/ProductTileInclude';
import AccountNavigation from './components/molecules/AccountNavigation';
import MyAccountOverview from './components/common/MyAccountOverview';
import MyAccountDetailsForm from './components/common/MyAccountDetailsForm';
import MyAccountAddressForm from './components/common/MyAccountAddressForm';
import OrderHistory from './components/molecules/OrderHistory';
import SubscriptionHistory from './components/molecules/SubscriptionHistory';
import LogInLink from './components/atoms/LogInLink';
import ReturnLabel from './components/atoms/ReturnLabel';
import AutoSubmitForm from './components/common/AutoSubmitForm';
import UnsubscribeForm from './components/common/UnsubscribeForm';
import UpdateConsents from './components/common/UpdateConsents';
import PlaceOrder from './components/molecules/PlaceOrder';
import SessionExpiredModal from './components/atoms/SessionExpiredModal';
import ColumnControlCarousel from './components/atoms/ColumnControlCarousel';
import ArticleList from './components/molecules/ArticleList';
import { isCommerceEnabled } from './utils/common';
import GoBackArrow from './components/atoms/GoBackArrow';
import MyAccountCardsForm from './components/common/MyAccountCardsForm';
import AddCardModal from './components/common/AddCardModal';
import MyAccountSubscriptions from './components/common/MyAccountSubscriptions';
import OrderReturnForm from './components/molecules/OrderReturnForm';
import SubscriptionDetailsDataDisplay from './components/molecules/SubscriptionDetailsDataDisplay';
import SubscriptionDetailsSummary from './components/molecules/SubscriptionDetailsSummary';
import ProductSubscriptionOptions from './components/atoms/ProductSubscriptionOptions';
import CancelActiveSubscription from './components/common/CancelActiveSubscription';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { mountingPoints } = partialConfig;
  const commerceIsEnabled = isCommerceEnabled();

  return (
    <I18nextProvider i18n={i18n} defaultNS="common">
      <SiteProvider>
        {commerceIsEnabled && (
          <AuthProvider>
            <CommerceProvider>
              <PortalWithDataSet selector={mountingPoints.productPrice}>
                <ProductPrice />
              </PortalWithDataSet>              
              <PortalWithDataSet selector={mountingPoints.productSubscriptionOptions}>
                <ProductSubscriptionOptions />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.productAddToCart}>
                <AddToCart />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.cartTrigger}>
                <MiniCartButton />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.cancelActiveSubscription}>
                <CancelActiveSubscription />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.miniCart}>
                <MiniCart />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.checkoutFormData}>
                <FormData />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.checkoutForm}>
                <CheckoutFormController />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.simplifiedCheckoutForm}>
                <SimplifiedCheckoutFormController />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.orderSummary}>
                <MiniCart />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.orderSummaryPage}>
                <OrderSummaryController />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.guestOrderSummaryPage}>
                <GuestOrderSummaryController />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.shoppingCart}>
                <MiniCart />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.shippingMethods}>
                <ShippingMethods />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.payOnForm}>
                <PayOnForm />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.paymentTabs}>
                <LoadingIndicator />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.producTileInclude}>
                <ProductTileInclude />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.accountNavigation}>
                <AccountNavigation />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.myAccountOverview}>
                <MyAccountOverview />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.myAccountDetailsForm}>
                <MyAccountDetailsForm />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.myAccountAddressForm}>
                <MyAccountAddressForm />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.myAccountCardsForm}>
                <MyAccountCardsForm />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.orderHistory}>
                <OrderHistory />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.subscriptionHistory}>
                <SubscriptionHistory />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.loadingSpinner}>
                <LoadingIndicator />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.orderDetailsItemList}>
                <OrderDetailsItemList />
              </PortalWithDataSet>
              <PortalWithDataSet
                selector={mountingPoints.orderDetailsDataDisplay}
              >
                <OrderDetailsDataDisplay />
              </PortalWithDataSet>
              <PortalWithDataSet
                selector={mountingPoints.orderDetailsShipmentTracking}
              >
                <OrderDetailsShipmentTracking />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.orderDetailsSummary}>
                <OrderDetailsSummary />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.orderReturnForm}>
                <OrderReturnForm />
              </PortalWithDataSet>
              <PortalWithDataSet
                selector={mountingPoints.subscriptionDetailsDataDisplay}
              >
                <SubscriptionDetailsDataDisplay />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.subscriptionDetailsSummary}>
                <SubscriptionDetailsSummary />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.logInLink}>
                <LogInLink />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.ReturnLabel}>
                <ReturnLabel />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.placeOrder}>
                <PlaceOrder />
              </PortalWithDataSet>
              <PortalWithDataSet selector={mountingPoints.body}>
                <SessionExpiredModal />
              </PortalWithDataSet>

              <PortalWithDataSet selector={mountingPoints.myAccountCardsModal}>
                <AddCardModal />
              </PortalWithDataSet>
              <PortalWithDataSet
                selector={mountingPoints.myAccountSubscriptions}
              >
                <MyAccountSubscriptions />
              </PortalWithDataSet>
            </CommerceProvider>
          </AuthProvider>
        )}
        <PortalWithDataSet selector={mountingPoints.autoSubmitForm}>
          <AutoSubmitForm />
        </PortalWithDataSet>
        <PortalWithDataSet selector={mountingPoints.unsubscribeForm}>
          <UnsubscribeForm />
        </PortalWithDataSet>
        <PortalWithDataSet selector={mountingPoints.updateConsents}>
          <UpdateConsents />
        </PortalWithDataSet>
        <PortalWithDataSet selector={mountingPoints.columnControlCarousel}>
          <ColumnControlCarousel />
        </PortalWithDataSet>
        <PortalWithDataSet selector={mountingPoints.articleList}>
          <ArticleList />
        </PortalWithDataSet>
        <PortalWithDataSet selector={mountingPoints.mobileApp}>
          <GoBackArrow />
        </PortalWithDataSet>
      </SiteProvider>
    </I18nextProvider>
  );
};

window.onload = () => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
    root
  );
};

export default App;
