import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import Code from "./Code";
import './HTML.scss';

const HTML = (props) => {
  const {appState} = useContext(AppContext);
  let formattedHTML;

  const formatHTML = (html) => {
    if (!html) {
      return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    html = (doc.querySelector('.stg-code') || doc.body).innerHTML ;
    html = html.trim();

    const tab = '\t';
    let result = '';
    let indent = '';

    html.split(/>\s*</).forEach(function (element) {
        if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
        }

        result += indent + '<' + element + '>\r\n';

        if (element.match(/^<?\w[^>]*[^\/]$/)) {
            indent += tab;
        }
    });

    result = result.replace(/\"+\s+/g,'" ').trim();
    formattedHTML = result;

    return result.substring(1, result.length - 1);
  }

  let compHTML;

  try{
    if (appState.component.type !== 'custom') {
      compHTML=appState.component.getDefaultHTML();
    }
  } catch(e) {
    console.log(e.message);
  }


  return (
    <div className="stb-html">
      {appState.component && <Code code={formatHTML(compHTML)} language="markup" />}
    </div>
  );
}

export default HTML;
