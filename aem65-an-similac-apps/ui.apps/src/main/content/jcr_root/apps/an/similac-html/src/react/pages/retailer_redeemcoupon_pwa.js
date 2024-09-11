import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import RedeemCouponPwa from "../container/redeem_coupon_pwa";

// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('redeem_coupon_pwa');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <RedeemCouponPwa aemData={redeemCouponPwa_label} />,
      divForPage
    );
  }
}
