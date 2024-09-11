import 'core-js/features/url';
import 'core-js/features/url-search-params';
import React from 'react';
import ReactDOM from 'react-dom';
import LeftMenu from '../container/left-menu';


const divForPage = document.getElementById('left-side-menu-container');
if (divForPage) {
  const data = window.jsonLeftNavData || {};
  ReactDOM.render(
    <LeftMenu data={data} />,
    divForPage
  );
}
