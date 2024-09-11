import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import RetailerCouponPwa from "../container/retailer_coupon_pwa";


// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('retailer_coupon_pwa');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <RetailerCouponPwa aemData={retailerCouponPwa_label} />,
      divForPage
    );
  }
  
}


