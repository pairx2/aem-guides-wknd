import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Products from "../container/products"



// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('productsLanding');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <Products data={products_label} />,
      divForPage
    );
  }
}