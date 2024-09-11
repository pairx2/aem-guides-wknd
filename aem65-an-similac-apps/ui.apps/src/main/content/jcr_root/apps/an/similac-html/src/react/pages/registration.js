import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Registration from "../container/registration.v2"

var data = window.jsonData;


const divForPage = document.getElementById('registration');
if (divForPage) {
  ReactDOM.render(
    <Registration data={data} />,
    divForPage
  );
}
