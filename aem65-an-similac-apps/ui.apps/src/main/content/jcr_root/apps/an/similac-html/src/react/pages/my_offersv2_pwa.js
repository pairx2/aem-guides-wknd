import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import MyOffers from "../container/my_offers_v2_pwa";

// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('my_offers_pwa');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <MyOffers aemData={myOffers_label} />,
      divForPage
    );
  }
}