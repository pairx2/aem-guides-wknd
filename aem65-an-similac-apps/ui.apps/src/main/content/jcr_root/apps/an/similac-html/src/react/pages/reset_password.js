import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import ResetPassword from "../container/reset-password"

var data = window.jsonData;

const divForPage = document.getElementById('resetPassword');
if (divForPage) {
ReactDOM.render(
  <ResetPassword data={data}/>,
  divForPage
);

}
