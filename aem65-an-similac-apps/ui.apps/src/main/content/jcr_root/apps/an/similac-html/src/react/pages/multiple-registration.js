import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
// import Registration from "../container/registration_v3"
import MultipleRegistration from "../container/multiple-registration"
// import Portal from '../Components/Portal';

var data = window.jsonData;


const divForPage = document.getElementById('multipleregistration');
if (divForPage) {
  ReactDOM.render(
    <MultipleRegistration data={data} />,
    divForPage
  );
}
