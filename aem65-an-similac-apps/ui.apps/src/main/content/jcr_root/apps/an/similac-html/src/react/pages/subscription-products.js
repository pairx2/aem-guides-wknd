import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import SubscriptionProducts from "../container/subscription-products"



// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('subscriptionProducts');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <SubscriptionProducts data={subscriptionProducts_label} />,
      divForPage
    );
  }
}