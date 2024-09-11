import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import AccountLinking from "../container/account-linking"

var data = window.jsonData;


const divForPage = document.getElementById('accountLinking');
if (divForPage) {
  ReactDOM.render(
    <AccountLinking data={data} />,
    divForPage
  );
}
