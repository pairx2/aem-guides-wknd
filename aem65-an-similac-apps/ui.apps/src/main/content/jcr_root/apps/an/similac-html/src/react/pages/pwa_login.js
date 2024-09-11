import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import PwaLogin from "../container/pwa_login"

var data = window.jsonData;
var pwaKey = true;

const divForPage = document.getElementById('pwa-login');
if (divForPage) {
  ReactDOM.render(
    <PwaLogin data={data} pwaKey={pwaKey} />,
    divForPage
  );
}

