import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommerceContext } from '../../context/CommerceContext';
import { fetchESLservice } from '../../services/eslService';
import ESL_EPT from '../../data/eslEndpoints';
import getSymbolFromCurrency from 'currency-symbol-map';
import LoadingIndicator from '../common/LoadingIndicator';
import {
  parsePriceString,
  getDateInPreferredLanguage,
  addOrdinalToDate,
  isLoggedIn,
  addEventHandlers,
  downloadDocuments,
} from '../../utils/common';
import { useTranslation } from 'react-i18next';
import createConditionalEvent from '../../utils/conditional';
import { AuthContext } from '../../context/AuthContext';

const OrderDetailsSummary = ({ showSpaceinprice }) => {
  const [commerceContext, setCommerceContext] = useContext(CommerceContext);
  const [invoiceDates, setInvoiceDates] = useState();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [isInvoiceAvailable, setIsInvoiceAvailable] = useState(false);
  const [creditMemos, setCreditMemos] = useState([]);
  const [authContext, setAuthContext] = useContext(AuthContext);
  const { t } = useTranslation();
  const orderId = new URLSearchParams(document.location.search).get('orderId');
  const orderDetailData = commerceContext?.profile?.items?.orderDetail;
  const { total } = orderDetailData || {};
  const userIsLoggedIn = isLoggedIn(authContext);
  const reOrderPayload = {
    orderId: orderId,
    consents: [
      {
        consentValue: true,
        consentName: 'tou',
      },
    ],
  };
  let returnedItems;

  /**
   *
   * @param {array} invoicesArr - array of invoice details
   * @returns Array of all invoice dates
   */
  const getInvoiceDates = (invoicesArr) => {
    if (!invoicesArr) {
      return [];
    }

    return invoicesArr.reduce((acc, currentInvoice) => {
      if (currentInvoice.invoice_creation_date) {
        acc.push(
          addOrdinalToDate(
            getDateInPreferredLanguage(currentInvoice.invoice_creation_date),
            t
          )
        );
      }

      return acc;
    }, []);
  };

  const getItems = async (orderNumber) => {
    try {
      const { data, errorCode } = await fetchESLservice({
        service: {
          method: 'GET',
          url: `/api/private/order/orders/${orderNumber}`,
        },
        withRecaptcha: false,
        addAuthHeaders: true,
      });

      if (!data) {
        throw new Error();
      }

      setCommerceContext({
        ...commerceContext,
        profile: {
          ...commerceContext.profile,
          items: {
            ...commerceContext.profile?.items,
            orderDetail: {
              ...data?.response?.data?.customer?.orders?.items[0],
            },
          },
        },
      });

      if (data?.response?.data?.customer?.orders?.items[0].invoices) {
        setInvoices(data.response.data.customer.orders.items[0].invoices);
      }

      if (data?.response?.data?.customer?.orders?.items[0]?.credit_memos) {
        setCreditMemos(
          data.response.data.customer.orders.items[0].credit_memos
        );
      }

      if (
        data?.response?.data?.customer?.orders?.items[0]?.is_reorder_allowed
      ) {
        window.dispatchEvent(
          createConditionalEvent(true, 'isEligibleForReorder')
        );
      }

      if (
        data?.response.data.customer.orders.items[0].returns.items &&
        data?.response.data.customer.orders.items[0].returns.items.length > 0
      ) {
        window.dispatchEvent(createConditionalEvent(true, 'isReturnLabelAvailable'));
        returnedItems = data?.response.data.customer.orders.items[0].returns.items;
      }

      if (data?.response?.data?.customer?.orders?.items[0]?.is_return_allowed) {
        window.dispatchEvent(createConditionalEvent(true, 'isEligibleForReturn'));
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setLoader = (element, set) =>{
    if (element !== null) {
      if (set) {
        element.classList.remove('abt-icon-download-r');
        element.classList.add('abt-icon-spinner', 'spin');
      }
      else {
        element.classList.remove('abt-icon-spinner', 'spin');
        element.classList.add('abt-icon-download-r');
      }
    }
  };

  useEffect(()=>{
    const clickHandlers = [
    {
      selector: `#product-reorder-block #order-details-reorder`,
      handler: async (e) => {
        e.preventDefault();
        const shoppingCartURL = document.querySelector("#product-reorder-block #order-details-reorder");

        const { data, errorCode } = await fetchESLservice({
          service: userIsLoggedIn ? ESL_EPT.ordersAuth : ESL_EPT.orders,
          data: reOrderPayload,
          addAuthHeaders: userIsLoggedIn,
          withRecaptcha: !userIsLoggedIn,
        });

        if (data?.response) {
          const cart = data.response?.data?.customerCart || data.response?.data?.cart;
          setCommerceContext({
            ...commerceContext,
            cart
          });
          window.location.replace(shoppingCartURL?.getAttribute('href'));
        }
      },
    },
    {
      selector: `#download-return-label`,
      handler: async (e) => {
        e.preventDefault();

        if (returnedItems && returnedItems.length > 0) {
            let downloadIcon = document.querySelector('#download-return-label em');
            setLoader(downloadIcon, true);

            let status = await downloadDocuments([returnedItems[returnedItems.length - 1]], 'returnLabelPDF', 'returnLabelPDF');
            if (status) {
                setLoader(downloadIcon, false);
                return;
            }

            setLoader(downloadIcon, false);
        }

      },
    }
  ]
    addEventHandlers('click', clickHandlers);
  },[])

  useEffect(async () => {
    await getItems(orderId);

    const orderNumberEl = document.querySelector(
      '.m-orderdetailscontainer__title'
    );

    if (orderNumberEl && orderId) {
      orderNumberEl.textContent += ` #${orderId}`;
    }
  }, []);

  useEffect(() => {
    const returnProductLink = document.querySelector('#return-product');

    if (returnProductLink && orderId) {
      let setOrderId = `${returnProductLink.getAttribute(
        'href'
      )}?orderId=${orderId}`;
      returnProductLink.setAttribute('href', setOrderId);
    }
  }, []);

  useEffect(() => {
    if (orderDetailData) {

      const orderStatus = orderDetailData?.status;
      const translatedOrderStatus = orderStatus.replaceAll(' ', '-').toLowerCase();
      document
        .querySelector('.m-orderdetailscontainer__title')
        ?.setAttribute('data-status', t(translatedOrderStatus));

        const invoiceDateList = (getInvoiceDates(orderDetailData.invoices));
        if (invoiceDateList.length > 0) {
          const invoiceOrderDate = invoiceDateList[0]?.split(' ');
          const translatedInvoiceDate = [invoiceOrderDate?.[0] + ' ' + t(invoiceOrderDate?.[1].toLowerCase()) + ' ' + invoiceOrderDate?.[2]];
          setInvoiceDates(translatedInvoiceDate);
        }
        else {
          setInvoiceDates(getInvoiceDates(orderDetailData.invoices));
        }

    }
  }, [orderDetailData]);

  useEffect(() => {
    const invoiceButton = document.querySelector(
      '.m-orderdetailscontainer__button--invoice'
    );
    const creditMemoButton = document.querySelector(
      '.m-orderdetailscontainer__button--credit-memo'
    );

    const downloadInvoicesHandler = () =>
      downloadDocuments(invoices, 'invoice');
    const downloadCreditMemosHandler = () =>
      downloadDocuments(creditMemos, 'creditMemo');

    invoices.forEach((item) => {
      if (item?.is_pdf_available) {
        setIsInvoiceAvailable(true);
        return;
      }
    });

    if (invoices.length && isInvoiceAvailable) {
      invoiceButton.addEventListener('click', downloadInvoicesHandler);
      invoiceButton.style.visibility = 'visible';
    } else {
      // Hide invoice button
      invoiceButton.style.visibility = 'hidden';
    }

    if (creditMemos.length) {
      creditMemos.forEach((item) => {
        if (item['is_pdf_available'] !== undefined && item.is_pdf_available) {
            creditMemoButton.style.visibility = 'visible';
            creditMemoButton.addEventListener('click', downloadCreditMemosHandler);
        }
        else if (item['is_pdf_available'] === undefined || !item.is_pdf_available) {
          creditMemoButton.style.visibility = 'hidden';
          creditMemoButton.removeEventListener('click', downloadCreditMemosHandler);
        }
      });
    } else {
      // Hide credit memo button
      creditMemoButton.style.visibility = 'hidden';
    }

    return () => {
      invoiceButton.removeEventListener('click', downloadInvoicesHandler);
      creditMemoButton.removeEventListener('click', downloadCreditMemosHandler);
    };
  }, [invoices, creditMemos]);

  return loading ? (
    <LoadingIndicator />
  ) : (
    <div className="m-orderdetailssummary__container">
      <div className="m-orderdetailssummary__group">
        <div className="m-orderdetailssummary__title">{t('order-invoice')}</div>
        <strong className="m-orderdetailssummary__value">
          {invoiceDates.length ? invoiceDates.join(', ') : t('pending')}
        </strong>
      </div>
      <div className="m-orderdetailssummary__group">
        <div className="m-orderdetailssummary__title">{t('subtotal')}</div>
        <strong className="m-orderdetailssummary__value">
        <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
          {getSymbolFromCurrency(total?.subtotal?.currency)}</span>
           {parsePriceString(total?.subtotal?.value)}
        </strong>
      </div>
      {total?.discounts?.map((discount) => (
        <div className="m-orderdetailssummary__group">
          <div className="m-orderdetailssummary__title">{discount?.label}</div>
          <strong className="m-orderdetailssummary__value">
            -<span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
              {getSymbolFromCurrency(discount?.amount?.currency)}
              </span>
            {parsePriceString(discount?.amount?.value)}
          </strong>
        </div>
      ))}
      <div className="m-orderdetailssummary__group">
        <div className="m-orderdetailssummary__title">{t('cart-delivery')}</div>
        <strong className="m-orderdetailssummary__value">
        <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
          {getSymbolFromCurrency(total?.total_shipping?.currency)}
          </span>
            {parsePriceString(total?.total_shipping?.value)}
        </strong>
      </div>
      <div className="m-orderdetailssummary__group-bold">
        <div className="m-orderdetailssummary__title">{t('order-total')}</div>
        <strong className="m-orderdetailssummary__value">
        <span className={showSpaceinprice === 'true' ? 'allow-symbol-space' : null}>
          {getSymbolFromCurrency(total?.grand_total?.currency)}
          </span>
            {parsePriceString(total?.grand_total?.value)}
        </strong>
      </div>
    </div>
  );
};

OrderDetailsSummary.defaultProps = {
  showSpaceinprice: 'false',
};

OrderDetailsSummary.PropTypes = {
  showSpaceinprice: PropTypes.string,
};

export default OrderDetailsSummary;