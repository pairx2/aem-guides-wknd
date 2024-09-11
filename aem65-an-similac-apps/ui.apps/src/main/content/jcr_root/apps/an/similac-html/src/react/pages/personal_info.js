import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import PersonalInfo from "../container/personal_info"


// Load Components on DOM-Ready
document.addEventListener("DOMContentLoaded", renderComponents, false);
const divForPage = document.getElementById('personalInfo');

function renderComponents() {
  if (divForPage) {
    ReactDOM.render(
      <PersonalInfo aemData = {personalInfo_label} />,
      divForPage
    );
  }
  
}


