import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import DigitalOfferSignIn from "../container/digital-offer-signin";


var doCreatePassword = window.doCreatePassword;
var doSignIn = window.doSignIn;

const divForPage = document.getElementById('digitalOfferSignIn');
if (divForPage) {
  ReactDOM.render(
    <DigitalOfferSignIn doCreatePassword={doCreatePassword} doSignIn={doSignIn}/>,
    divForPage
  );
}
