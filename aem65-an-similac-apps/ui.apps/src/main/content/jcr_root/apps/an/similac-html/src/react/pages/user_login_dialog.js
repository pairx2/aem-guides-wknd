import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Login from "../container/user-login-dialog/index";

var data = window.jsonLoginMenuData || {};
var jsonProfileNavData = window.jsonProfileNavData || {};

// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
document.addEventListener('re-build-menu', renderComponents, false);
const divForPage = document.getElementById('user-Interact');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <Login data={data} cartLabel={miniCart_label} userProfile={window.jsonProfileNavData || {}}/>,
      divForPage
    );
  }

}


