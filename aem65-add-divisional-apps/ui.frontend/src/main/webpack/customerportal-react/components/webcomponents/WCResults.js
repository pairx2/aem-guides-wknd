import React, { Component, Suspense } from 'react';
import { createCustomElement, DOMModel, byContentVal, registerEvent } from "@adobe/react-webcomponent";
import {SearchResults} from '../search-components/SearchResults';

export class WCResults extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // TODO: ADD Download URIs to config
    return (
      <Suspense fallback={<div>...</div>}>
        <SearchResults
          valueAssignmentsDownloadURI={'https://downloadhost.com/download'}></SearchResults>
      </Suspense>
    );
  }
}
class ResultsModel extends DOMModel {
  @byContentVal text = "something";
  @registerEvent("change") change;
}
const ButtonCustomElement = createCustomElement(WCResults, ResultsModel, "element");

window.customElements.define("wc-results", ButtonCustomElement);

export default {ButtonCustomElement};
