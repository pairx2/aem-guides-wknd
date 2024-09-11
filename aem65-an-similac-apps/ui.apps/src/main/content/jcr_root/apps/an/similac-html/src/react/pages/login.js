import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Login from "../container/login"

var data = window.jsonData;


const divForPage = document.getElementById('login');
if (divForPage) {
  ReactDOM.render(
    <Login data={data} />,
    divForPage
  );
}
