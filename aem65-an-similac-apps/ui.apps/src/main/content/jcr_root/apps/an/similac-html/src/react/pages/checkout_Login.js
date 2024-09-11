import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutLogin from "../container/checkout-login";

var data = window.jsonData;

const divForPage = document.getElementById('checkoutLogin');
if (divForPage) {
  ReactDOM.render(
    <CheckoutLogin data={data} />,
    divForPage
  );
}
