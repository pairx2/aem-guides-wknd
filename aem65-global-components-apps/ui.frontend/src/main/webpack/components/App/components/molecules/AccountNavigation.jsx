import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ESL_EPT from '../../data/eslEndpoints';
import { fetchESLservice, getToken } from '../../services/eslService';
import { cleanDisplayString } from '../../utils/common';

const AccountNavigation = () => {
  const [authContext, setAuthContext] = useContext(AuthContext);

  useEffect(async () => {
    // if data is alreay set in context, run callback function to avoid multiple calls
    if (
      authContext?.accountData &&
      Object.keys(authContext?.accountData).length !== 0
    ) {
      // Call callback
      if (typeof window.onAccountNavigationLoad === 'function') {
        window.onAccountNavigationLoad(authContext?.accountData);
      }
      return;
    }

    const accountNavigationItems = document.querySelectorAll(
      '.js-account-navigation-item'
    );
    let customerAttributes = [...accountNavigationItems].map((item) =>
      item?.getAttribute('data-customer-attribute')
    );

    // if there is at least one menu item with customer-attribute dataset
    if (customerAttributes?.length > 0) {
      // Prevent account navigation making {order} calls if OrderHistory component present
      // to avoid multiple order calls
      const orderHistoryComponent = document.querySelector('.js-order-history');
      if (orderHistoryComponent) {
        customerAttributes = customerAttributes.filter(
          (item) => item !== 'accountOrders'
        );
      }

      Promise.all(
        customerAttributes?.map((customerAtribute) => {
          const params = {
            service: ESL_EPT[customerAtribute],
            addAuthHeaders: true,
          };

          if (ESL_EPT[customerAtribute]) {
            return fetchESLservice(params);
          }
          return false;
        })
      )
        .then((responses) => {
          const accountData = responses?.reduce((prev, current, index) => {
            const map = prev;
            map[customerAttributes[index]] = current?.data || null;
            return map;
          }, {});

          const newAccountData = {
            ...authContext?.accountData,
            ...accountData,
          };

          setAuthContext({
            ...authContext,
            accountData: newAccountData,
          });

          // Call callback
          if (typeof window.onAccountNavigationLoad === 'function') {
            window.onAccountNavigationLoad(newAccountData);
          }
        })
        .catch((errors) => {
          throw new Error('account navigation error', errors);
        });
    }
  }, []);

  useEffect(() => {
    // Display name on account navigation header
    const header = document.querySelector('.js-account-navigation-header');
    const headerText = header.innerHTML;
    const firstName = cleanDisplayString(
      authContext?.accountInfo?.userInfo?.firstName || ''
    );
    const headerName = header.querySelector(
      '.js-account-navigation-header__name'
    );
    if (headerName) {
      headerName.innerHTML = firstName;
    } else {
      header.innerHTML = headerText.replace(
        '${firstName}',
        `<span class="js-account-navigation-header__name">${firstName}</span>`
      );
      header.classList.remove('d-none');
    }
  }, [authContext]);

  return <></>;
};

export default AccountNavigation;
