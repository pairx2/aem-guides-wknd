import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Registration from "../container/registration.v2";
import MailingAddress from "../container/mailing-address";


const divForPage = document.getElementById('mailing-address');
if (divForPage) {
  ReactDOM.render(
    <MailingAddress />,
    divForPage
  );
}
