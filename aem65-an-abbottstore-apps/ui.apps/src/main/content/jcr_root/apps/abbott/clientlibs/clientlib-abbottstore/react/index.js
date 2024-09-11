import React from "react";
import ReactDOM from "react-dom";

// Components

import SearchPage from './SearchPage/SearchPage.jsx';
import SearchModal from './SearchModal/SearchModal.jsx';
import MiniCart from './MiniCart/MiniCart.jsx';

// Load Components on DOM-Ready
// document.addEventListener("DOMContentLoaded", renderComponents, false);
renderComponents();

/**
 * @function
 * @desc loads all the component on page via ReatDOM.render
 */
function renderComponents() {
  var searchPageEl = document.getElementById("search-page__comp");
  var seachModalEl = document.getElementById("search-modal__comp");
  var miniCartEl = document.getElementById("mini-cart__comp");

  if (seachModalEl) {
    ReactDOM.render(React.createElement(SearchModal, null), seachModalEl);
  }

  if (miniCartEl) {
    ReactDOM.render(React.createElement(MiniCart, null), miniCartEl);
  }

  if (searchPageEl) {
    ReactDOM.render(React.createElement(SearchPage, null), searchPageEl);
  }
}
