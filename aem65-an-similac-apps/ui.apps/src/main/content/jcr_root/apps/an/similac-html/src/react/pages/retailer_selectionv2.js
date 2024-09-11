import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import SelectRetailer from "../container/select_retailerv2";


// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('select_retailer');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <SelectRetailer aemData={retailerSelection_label} />,
      divForPage
    );
  }
  
}


