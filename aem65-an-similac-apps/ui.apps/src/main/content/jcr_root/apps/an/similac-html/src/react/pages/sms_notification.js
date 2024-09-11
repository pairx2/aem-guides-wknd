import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import SMSNotification from "../container/sms_notification"

var data = window.jsonData;

const divForPage = document.getElementById('sms-notification');
if (divForPage) {
  ReactDOM.render(
    <SMSNotification data={data} />,
    divForPage
  );
}
