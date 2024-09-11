import React from "react";
import HTML from "../HTML";
import Knobs from "../Knobs";
import Validator from "../Validator";

const defaultTabs = ['HTML','Knobs','Validator'];

const TabComponents = {
  'HTML': HTML,
  'Knobs': Knobs,
  'Validator': Validator
};

export const getAvailableTabs = (props) => {
  const tabs = [...defaultTabs];
  if (props.hideHTMLTab) {
    tabs.splice(tabs.indexOf('HTML'), 1);
  }

  if (props.hideKnobsTab) {
    tabs.splice(tabs.indexOf('Knobs'), 1);
  }

  if (props.hideValidatorTab) {
    tabs.splice(tabs.indexOf('Validator'), 1);
  }
  return tabs;
}

export const getTabPanel = (tabName) => {
  const Item = TabComponents[tabName];
  return <Item />
}

