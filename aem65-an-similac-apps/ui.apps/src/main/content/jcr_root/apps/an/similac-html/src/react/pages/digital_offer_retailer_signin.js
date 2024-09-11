import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import DORForm from "../container/digital-offer-retailer-signin/digital_offer_retailer_signin";


var dorLogin = window.dorLogin;
var dorRegistration = window.dorRegistration;

const divForPage = document.getElementById('digitalOfferRetailerSignIn');
if (divForPage) {
  ReactDOM.render(
    <DORForm dorLogin={dorLogin} dorRegistration={dorRegistration}/>,
    divForPage
  );
}
