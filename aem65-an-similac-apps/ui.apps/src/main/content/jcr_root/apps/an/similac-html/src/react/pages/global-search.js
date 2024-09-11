import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalSearch from "../container/global-search"



// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('globalSearch');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <GlobalSearch data={globalSearch_label} />,
      divForPage
    );
  }
}