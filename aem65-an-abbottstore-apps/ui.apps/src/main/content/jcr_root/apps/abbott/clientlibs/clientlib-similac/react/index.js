import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducers/rootReducer'

// Components
import MiniCart from './MiniCart/MiniCart.jsx';

// Create Store
const store = createStore(rootReducer);

// Load Components on DOM-Ready
// document.addEventListener('DOMContentLoaded', renderComponents, false);
renderComponents();

/**
 * @function
 * @desc loads all the component on page via ReatDOM.render
 */
function renderComponents() {
  var miniCartEl = document.getElementById('mini-cart__comp');
  var miniCartElMob = document.getElementById('mini-cart__comp--mobile');

  if(miniCartEl){
    ReactDOM.render(React.createElement(Provider, { store: store } ,React.createElement(MiniCart, null)), miniCartEl);
  }
  if(miniCartElMob) {
    ReactDOM.render(React.createElement(Provider, { store: store },React.createElement(MiniCart, null)), miniCartElMob);
  }
}
