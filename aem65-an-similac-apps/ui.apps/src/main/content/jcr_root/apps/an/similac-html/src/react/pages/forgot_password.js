import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import ForgotPassword from "../container/forgot-password"

var data = window.jsonData;

const divForPage = document.getElementById('forgotPassword');
if (divForPage) {
  ReactDOM.render(
    <ForgotPassword data={data} />,
    divForPage
  );
}
