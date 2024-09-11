import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import EcommerceRegistration from "../container/ecommerce-registration"

var data = window.jsonData;


const divForPage = document.getElementById('ecommerceRegistration');
if (divForPage) {
  ReactDOM.render(
    <EcommerceRegistration data={data} />,
    divForPage
  );
}
