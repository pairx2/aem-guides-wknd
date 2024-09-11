import React from 'react';
import ReactDOM from 'react-dom';
import LogoutPopup from "../container/logoutPopup";

let divForPage = document.getElementById('popup-container');
if (!divForPage) {
    const popup = document.createElement("div");
    popup.id = "popup-container";
    document.body.appendChild(popup);
    divForPage = document.getElementById('popup-container');
}
try {
    ReactDOM.render(<LogoutPopup />, divForPage);
} catch (error) {
    console.log(error, "error in LogoutPopup");
}