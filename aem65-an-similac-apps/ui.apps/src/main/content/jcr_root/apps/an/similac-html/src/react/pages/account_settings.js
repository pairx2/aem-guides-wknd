import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import AccountSettings from "../container/account_settings";

var data = window.jsonData;

const divForPage = document.getElementById('account-settings');
if (divForPage) {
  ReactDOM.render(
    <AccountSettings data={data}/>,
    divForPage
  );
}
