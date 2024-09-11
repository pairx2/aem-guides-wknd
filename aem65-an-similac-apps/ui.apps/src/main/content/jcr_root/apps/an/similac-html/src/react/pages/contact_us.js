import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import ContactUs from "../container/contact-us"

var data = window.jsonData;

const divForPage = document.getElementById('contactUs');
if (divForPage) {
  ReactDOM.render(
    <ContactUs data={data} />,
    divForPage
  );
}
