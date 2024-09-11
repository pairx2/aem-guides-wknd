import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import FastRegistration from "../container/fast-registration"

var data = window.jsonData;

const divForPage = document.getElementById('fastRegistration');
if (divForPage) {
  ReactDOM.render(
    <FastRegistration data={data} />,
    divForPage
  );
}
